package com.sangyan.xray.controller;

import com.sangyan.xray.model.MutualFundScheme;
import com.sangyan.xray.model.StockHolding;
import com.sangyan.xray.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/v1/xray")
@CrossOrigin(origins = "*")
public class PortfolioXRayController {

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
            // 1. Parse File / Load Portfolio
            List<MutualFundScheme> funds;
            if (file != null && !file.isEmpty()) {
                funds = pdfParsingService.parsePortfolioDocument(file.getInputStream(), file.getOriginalFilename());
            } else {
                funds = pdfParsingService.parsePortfolioDocument(null, "demo.pdf");
            }

            // 2. Run Stock Health & Profitability Inspection
            List<StockHolding> highRiskOrLossMakingStocks = new ArrayList<>();
            List<StockHolding> allExtractedStocks = new ArrayList<>();
            Set<String> processedStockSymbols = new HashSet<>();

            for (MutualFundScheme fund : funds) {
                for (StockHolding stock : fund.getTopHoldings()) {
                    stockHealthService.evaluateStockHealth(stock);
                    if (!processedStockSymbols.contains(stock.getSymbol())) {
                        processedStockSymbols.add(stock.getSymbol());
                        allExtractedStocks.add(stock);
                        if (stock.getHealthStatus().contains("HIGH_RISK") || stock.getHealthStatus().contains("UNPROFITABLE")) {
                            highRiskOrLossMakingStocks.add(stock);
                        }
                    }
                }
            }

            // 3. Analyze Mutual Fund Overlap Analytics & Health Score
            Map<String, Object> overlapResults = overlapAnalyticsService.analyzePortfolioOverlap(funds);

            // 4. Calculate 5-Year Cost Drag & Commission Leakage
            Map<String, Object> expenseResults = expenseCalculatorService.calculateExpenseAndCommissionDrag(funds, expectedReturn);

            // 5. Generate Step-by-Step Restructuring Action Plan
            List<Map<String, Object>> actionPlan = restructuringService.generateActionPlan(
                    funds, overlapResults, expenseResults, highRiskOrLossMakingStocks);

            // 6. Construct Final Response Payload
            response.put("status", "SUCCESS");
            response.put("timestamp", new Date());
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
            return ResponseEntity.badRequest().body(response);
        }
    }
}
