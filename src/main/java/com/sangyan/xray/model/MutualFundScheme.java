package com.sangyan.xray.model;

import java.util.ArrayList;
import java.util.List;

public class MutualFundScheme {
    private String schemeName;
    private String category; // Large Cap, Mid Cap, Flexi Cap, etc.
    private String planType; // DIRECT or REGULAR
    private double expenseRatio;
    private double currentInvestmentValue;
    private List<StockHolding> topHoldings = new ArrayList<>();

    public MutualFundScheme() {}

    public MutualFundScheme(String schemeName, String category, String planType, double expenseRatio, double currentInvestmentValue) {
        this.schemeName = schemeName;
        this.category = category;
        this.planType = planType;
        this.expenseRatio = expenseRatio;
        this.currentInvestmentValue = currentInvestmentValue;
    }

    public String getSchemeName() {
        return schemeName;
    }

    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPlanType() {
        return planType;
    }

    public void setPlanType(String planType) {
        this.planType = planType;
    }

    public double getExpenseRatio() {
        return expenseRatio;
    }

    public void setExpenseRatio(double expenseRatio) {
        this.expenseRatio = expenseRatio;
    }

    public double getCurrentInvestmentValue() {
        return currentInvestmentValue;
    }

    public void setCurrentInvestmentValue(double currentInvestmentValue) {
        this.currentInvestmentValue = currentInvestmentValue;
    }

    public List<StockHolding> getTopHoldings() {
        return topHoldings;
    }

    public void setTopHoldings(List<StockHolding> topHoldings) {
        this.topHoldings = topHoldings;
    }
}
