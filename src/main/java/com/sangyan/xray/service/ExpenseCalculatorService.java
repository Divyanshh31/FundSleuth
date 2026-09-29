package com.sangyan.xray.service;

import com.sangyan.xray.model.MutualFundScheme;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ExpenseCalculatorService {

    public Map<String, Object> calculateExpenseAndCommissionDrag(List<MutualFundScheme> funds, double expectedMarketReturnYr) {
        double totalPortfolioValue = 0.0;
        double totalFiveYrExpenseDrag = 0.0;
        double totalFiveYrRegularCommissionLoss = 0.0;
        int regularPlansCount = 0;
        int directPlansCount = 0;

        for (MutualFundScheme fund : funds) {
            double P = fund.getCurrentInvestmentValue();
            totalPortfolioValue += P;
            double r = expectedMarketReturnYr / 100.0;

            boolean isRegular = fund.getPlanType().equalsIgnoreCase("REGULAR");
            if (isRegular) {
                regularPlansCount++;
            } else {
                directPlansCount++;
            }

            // Regular plans carry ~1.0% to 1.5% extra commission paid out to distributors
            double baseExpenseRatio = fund.getExpenseRatio() / 100.0;
            double distributorCommissionRatio = isRegular ? 0.0125 : 0.0; // 1.25% average extra commission
            double totalEffectiveExpenseRatio = baseExpenseRatio + distributorCommissionRatio;

            // Compound interest math over 5 years
            // Value without any expense vs with expense
            double valueGross = P * Math.pow(1 + r, 5);
            double valueWithExpense = P * Math.pow(1 + (r - totalEffectiveExpenseRatio), 5);
            double valueWithDirectOnly = P * Math.pow(1 + (r - baseExpenseRatio), 5);

            double fundExpenseLoss = valueGross - valueWithExpense;
            double fundCommissionLoss = valueWithDirectOnly - valueWithExpense;

            totalFiveYrExpenseDrag += fundExpenseLoss;
            if (isRegular) {
                totalFiveYrRegularCommissionLoss += fundCommissionLoss;
            }
        }

        Map<String, Object> expenseSummary = new HashMap<>();
        expenseSummary.put("totalPortfolioValue", Math.round(totalPortfolioValue * 100.0) / 100.0);
        expenseSummary.put("fiveYearExpenseCostDrag", Math.round(totalFiveYrExpenseDrag * 100.0) / 100.0);
        expenseSummary.put("fiveYearRegularCommissionLoss", Math.round(totalFiveYrRegularCommissionLoss * 100.0) / 100.0);
        expenseSummary.put("regularPlansCount", regularPlansCount);
        expenseSummary.put("directPlansCount", directPlansCount);
        
        if (regularPlansCount > 0) {
            expenseSummary.put("recommendation", "⚠️ Action Required: You are holding " + regularPlansCount + 
                    " REGULAR plan(s). Switch to DIRECT plans to save approximately ₹" + 
                    Math.round(totalFiveYrRegularCommissionLoss) + " in distributor commissions over 5 years!");
        } else {
            expenseSummary.put("recommendation", "✅ Excellent! All your holdings are DIRECT plans with zero distributor commission leakage.");
        }

        return expenseSummary;
    }
}
