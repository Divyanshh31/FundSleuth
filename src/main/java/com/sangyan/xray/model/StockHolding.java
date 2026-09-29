package com.sangyan.xray.model;

public class StockHolding {
    private String symbol;
    private String companyName;
    private double weightPercentage;
    private String sector;
    
    // Health & Fundamental metrics
    private String healthStatus; // 🟢 PROFITABLE & GROWING, 🟡 STAGNANT, 🔴 UNPROFITABLE / HIGH RISK
    private String healthBadge;
    private String riskDescription;
    private double netProfitGrowthYr;
    private double peRatio;
    private double debtToEquity;
    private double oneYrReturnPercentage;

    public StockHolding() {}

    public StockHolding(String symbol, String companyName, double weightPercentage, String sector) {
        this.symbol = symbol;
        this.companyName = companyName;
        this.weightPercentage = weightPercentage;
        this.sector = sector;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public double getWeightPercentage() {
        return weightPercentage;
    }

    public void setWeightPercentage(double weightPercentage) {
        this.weightPercentage = weightPercentage;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getHealthStatus() {
        return healthStatus;
    }

    public void setHealthStatus(String healthStatus) {
        this.healthStatus = healthStatus;
    }

    public String getHealthBadge() {
        return healthBadge;
    }

    public void setHealthBadge(String healthBadge) {
        this.healthBadge = healthBadge;
    }

    public String getRiskDescription() {
        return riskDescription;
    }

    public void setRiskDescription(String riskDescription) {
        this.riskDescription = riskDescription;
    }

    public double getNetProfitGrowthYr() {
        return netProfitGrowthYr;
    }

    public void setNetProfitGrowthYr(double netProfitGrowthYr) {
        this.netProfitGrowthYr = netProfitGrowthYr;
    }

    public double getPeRatio() {
        return peRatio;
    }

    public void setPeRatio(double peRatio) {
        this.peRatio = peRatio;
    }

    public double getDebtToEquity() {
        return debtToEquity;
    }

    public void setDebtToEquity(double debtToEquity) {
        this.debtToEquity = debtToEquity;
    }

    public double getOneYrReturnPercentage() {
        return oneYrReturnPercentage;
    }

    public void setOneYrReturnPercentage(double oneYrReturnPercentage) {
        this.oneYrReturnPercentage = oneYrReturnPercentage;
    }
}
