package com.sangyan.xray.service;

import com.sangyan.xray.model.MutualFundScheme;
import com.sangyan.xray.model.StockHolding;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RestructuringService {

    public List<Map<String, Object>> generateActionPlan(
            List<MutualFundScheme> funds,
            Map<String, Object> overlapData,
            Map<String, Object> expenseData,
            List<StockHolding> toxicStocks) {

        List<Map<String, Object>> actionPlan = new ArrayList<>();

        // Action 1: Regular to Direct Switch
        int regCount = (int) expenseData.getOrDefault("regularPlansCount", 0);
        double commLoss = (double) expenseData.getOrDefault("fiveYearRegularCommissionLoss", 0.0);

        if (regCount > 0) {
            Map<String, Object> action1 = new HashMap<>();
            action1.put("stepNumber", 1);
            action1.put("category", "COMMISSION_SAVINGS");
            action1.put("title", "Switch " + regCount + " Regular Scheme(s) to Direct Plans");
            action1.put("description", "You are currently losing approximately ₹" + Math.round(commLoss) + 
                    " over 5 years in distributor commissions. Switching to Direct plans via groww, Zerodha Coin, or AMC websites eliminates this fee.");
            action1.put("priority", "HIGH");
            action1.put("financialImpact", "Save ~₹" + Math.round(commLoss) + " in 5 Years");
            actionPlan.add(action1);
        }

        // Action 2: Resolve Stock Overlap
        double overlapPct = (double) overlapData.getOrDefault("overlapPercentage", 0.0);
        if (overlapPct > 30.0) {
            Map<String, Object> action2 = new HashMap<>();
            action2.put("stepNumber", 2);
            action2.put("category", "REDUCE_OVERLAP");
            action2.put("title", "Consolidate Overlapping Large Cap Schemes");
            action2.put("description", "Your portfolio has a high stock overlap of " + overlapPct + 
                    "%. Multiple schemes hold identical bluechip stocks (e.g. HDFC Bank, ICICI Bank). Consider merging 2 Large Cap funds into 1 Index / Flexi Cap fund.");
            action2.put("priority", "MEDIUM");
            action2.put("financialImpact", "Improves True Diversification Score");
            actionPlan.add(action2);
        }

        // Action 3: Exit / Reduce Exposure to Toxic Stocks
        if (toxicStocks != null && !toxicStocks.isEmpty()) {
            Map<String, Object> action3 = new HashMap<>();
            action3.put("stepNumber", 3);
            action3.put("category", "RISK_MITIGATION");
            action3.put("title", "Review Schemes Holding Loss-Making Companies");
            action3.put("description", "Detected " + toxicStocks.size() + 
                    " high-risk or unprofitable stock holding(s) (e.g. " + toxicStocks.get(0).getSymbol() + 
                    ") in your top funds. Re-examine fund manager allocations to these underperforming assets.");
            action3.put("priority", "HIGH");
            action3.put("financialImpact", "Protects Capital against Permanent Loss");
            actionPlan.add(action3);
        }

        return actionPlan;
    }
}
