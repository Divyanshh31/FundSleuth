package com.sangyan.xray.service;

import com.sangyan.xray.model.StockHolding;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StockHealthService {

    private final Map<String, StockHealthInfo> stockDatabase = new HashMap<>();

    public StockHealthService() {
        // Pre-populate fundamental financial health data for major Indian stocks
        stockDatabase.put("PAYTM", new StockHealthInfo("🔴 HIGH_RISK", "Loss-Making / High Volatility", "Net profit negative (-₹540 Cr), Regulatory pressure", -24.5, -35.2, 0.4, -22.1));
        stockDatabase.put("ZOMATO", new StockHealthInfo("🟡 MODERATE_RISK", "Stagnant / High P/E Valuation", "Turned profitable recently but high P/E ratio (120x)", 12.4, 120.5, 0.1, 45.3));
        stockDatabase.put("IDEA", new StockHealthInfo("🔴 HIGH_RISK", "Heavy Debt & Continuous Loss", "Massive AGR debt, loss-making quarter after quarter", -45.0, -12.0, 8.5, -15.4));
        stockDatabase.put("HDFCBANK", new StockHealthInfo("🟢 STRONG_GROWTH", "Profitable & Stable", "Consistent 15%+ PAT growth, robust capital adequacy", 16.8, 18.5, 0.8, 12.5));
        stockDatabase.put("RELIANCE", new StockHealthInfo("🟢 STRONG_GROWTH", "Profitable Conglomerate", "Strong cash flows from Telecom, Retail & Energy", 14.2, 24.1, 0.45, 18.4));
        stockDatabase.put("ICICIBANK", new StockHealthInfo("🟢 STRONG_GROWTH", "High Profitability", "Industry-leading NIMs and strong credit growth", 21.0, 17.2, 0.65, 22.8));
        stockDatabase.put("INFY", new StockHealthInfo("🟢 STABLE_DIVIDEND", "Profitable IT Leader", "High ROE (30%), strong free cash flows and dividends", 8.5, 23.4, 0.1, 14.2));
        stockDatabase.put("TATAMOTORS", new StockHealthInfo("🟢 STRONG_GROWTH", "Turnaround & EV Leader", "JLR turnaround, strong domestic EV market share", 35.4, 15.6, 0.9, 58.0));
    }

    public StockHolding evaluateStockHealth(StockHolding stock) {
        String symbolKey = stock.getSymbol().toUpperCase();
        if (stockDatabase.containsKey(symbolKey)) {
            StockHealthInfo info = stockDatabase.get(symbolKey);
            stock.setHealthStatus(info.status);
            stock.setHealthBadge(info.badge);
            stock.setRiskDescription(info.description);
            stock.setNetProfitGrowthYr(info.netProfitGrowth);
            stock.setPeRatio(info.peRatio);
            stock.setDebtToEquity(info.debtToEquity);
            stock.setOneYrReturnPercentage(info.oneYrReturn);
        } else {
            // Default baseline fallback for unindexed stocks
            stock.setHealthStatus("🟢 PROFITABLE");
            stock.setHealthBadge("Stable Fundamental Baseline");
            stock.setRiskDescription("Standard market capitalization with steady metrics");
            stock.setNetProfitGrowthYr(10.0);
            stock.setPeRatio(20.0);
            stock.setDebtToEquity(0.5);
            stock.setOneYrReturnPercentage(12.0);
        }
        return stock;
    }

    private static class StockHealthInfo {
        String status;
        String badge;
        String description;
        double netProfitGrowth;
        double peRatio;
        double debtToEquity;
        double oneYrReturn;

        StockHealthInfo(String status, String badge, String description, double netProfitGrowth, double peRatio, double debtToEquity, double oneYrReturn) {
            this.status = status;
            this.badge = badge;
            this.description = description;
            this.netProfitGrowth = netProfitGrowth;
            this.peRatio = peRatio;
            this.debtToEquity = debtToEquity;
            this.oneYrReturn = oneYrReturn;
        }
    }
}
