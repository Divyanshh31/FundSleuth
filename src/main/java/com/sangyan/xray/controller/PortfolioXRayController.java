package com.sangyan.xray.controller;

import com.sangyan.xray.model.MutualFundScheme;
import com.sangyan.xray.model.StockHolding;
import com.sangyan.xray.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/v1/xray")
@CrossOrigin(origins = "${cors.allowed-origins:*}")
public class PortfolioXRayController {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB limit

    @Autowired
    private PdfParsingService pdfParsingService;

    @Autowired
    private OverlapAnalyticsService overlapAnalyticsService;

    @Autowired
    private StockHealthService stockHealthService;

    @Autowired
    private ExpenseCalculatorService expenseCalculatorService;

    @Autowired
    private RestructuringService restructuringService;

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Object>> analyzePortfolio(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "expectedReturn", defaultValue = "12.0") double expectedReturn) {

        Map<String, Object> response = new HashMap<>();

        try {
            List<MutualFundScheme> funds;
            boolean isDemoMode = false;

            if (file != null && !file.isEmpty()) {
                // Validate File Size
                if (file.getSize() > MAX_FILE_SIZE) {
                    response.put("status", "ERROR");
                    response.put("message", "File size exceeds maximum allowed limit of 10MB.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
                }

                // Validate File Extension / Media Type
                String filename = file.getOriginalFilename() != null ? file.getOriginalFilename().toLowerCase() : "";
                if (!filename.endsWith(".pdf") && !filename.endsWith(".png") && !filename.endsWith(".jpg") && !filename.endsWith(".jpeg")) {
                    response.put("status", "ERROR");
                    response.put("message", "Unsupported file format. Only CAMS/KFintech CAS PDFs and PNG/JPG screenshots are supported.");
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(response);
                }

                funds = pdfParsingService.parsePortfolioDocument(file.getInputStream(), file.getOriginalFilename());
            } else {
                // Explicit Demo flow
                funds = pdfParsingService.parsePortfolioDocument(null, "demo.pdf");
                isDemoMode = true;
            }

            if (funds == null || funds.isEmpty()) {
                response.put("status", "ERROR");
                response.put("message", "Failed to extract mutual fund schemes from the provided document.");
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(response);
            }

            // Run Stock Health & Profitability Inspection
            List<StockHolding> highRiskOrLossMakingStocks = new ArrayList<>();
            List<StockHolding> allExtractedStocks = new ArrayList<>();
            Set<String> processedStockSymbols = new HashSet<>();

            for (MutualFundScheme fund : funds) {
                if (fund.getTopHoldings() != null) {
                    for (StockHolding stock : fund.getTopHoldings()) {
                        stockHealthService.evaluateStockHealth(stock);
                        if (!processedStockSymbols.contains(stock.getSymbol())) {
                            processedStockSymbols.add(stock.getSymbol());
                            allExtractedStocks.add(stock);
                            if (stock.getHealthStatus() != null &&
                               (stock.getHealthStatus().contains("HIGH_RISK") || stock.getHealthStatus().contains("UNPROFITABLE"))) {
                                highRiskOrLossMakingStocks.add(stock);
                            }
                        }
                    }
                }
            }

            // Analyze Overlap, Expense Drag & Restructuring
            Map<String, Object> overlapResults = overlapAnalyticsService.analyzePortfolioOverlap(funds);
            Map<String, Object> expenseResults = expenseCalculatorService.calculateExpenseAndCommissionDrag(funds, expectedReturn);
            List<Map<String, Object>> actionPlan = restructuringService.generateActionPlan(
                    funds, overlapResults, expenseResults, highRiskOrLossMakingStocks);

            // Response Payload
            response.put("status", "SUCCESS");
            response.put("timestamp", new Date());
            response.put("isDemo", isDemoMode);
            response.put("totalFundsAnalyzed", funds.size());
            response.put("funds", funds);
            response.put("allExtractedStocks", allExtractedStocks);
            response.put("highRiskStockAlerts", highRiskOrLossMakingStocks);
            response.put("overlapAnalytics", overlapResults);
            response.put("expenseAnalytics", expenseResults);
            response.put("restructuringActionPlan", actionPlan);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("status", "ERROR");
            response.put("message", "Portfolio Analysis Failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
