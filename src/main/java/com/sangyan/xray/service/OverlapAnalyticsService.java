package com.sangyan.xray.service;

import com.sangyan.xray.model.MutualFundScheme;
import com.sangyan.xray.model.StockHolding;
import org.jgrapht.Graph;
import org.jgrapht.graph.DefaultWeightedEdge;
import org.jgrapht.graph.SimpleWeightedGraph;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OverlapAnalyticsService {

    public Map<String, Object> analyzePortfolioOverlap(List<MutualFundScheme> funds) {
        Graph<String, DefaultWeightedEdge> portfolioGraph =
                new SimpleWeightedGraph<>(DefaultWeightedEdge.class);

        Map<String, Set<String>> stockToFundsMap = new HashMap<>();
        Map<String, StockHolding> stockMetaMap = new HashMap<>();
        Map<String, Double> sectorWeightMap = new HashMap<>();

        double totalPortfolioValue = funds.stream().mapToDouble(MutualFundScheme::getCurrentInvestmentValue).sum();

        // 1. Build Graph Vertices and Sector Concentration
        for (MutualFundScheme fund : funds) {
            portfolioGraph.addVertex(fund.getSchemeName());

            for (StockHolding stock : fund.getTopHoldings()) {
                portfolioGraph.addVertex(stock.getSymbol());
                stockToFundsMap.computeIfAbsent(stock.getSymbol(), k -> new HashSet<>())
                        .add(fund.getSchemeName());
                stockMetaMap.putIfAbsent(stock.getSymbol(), stock);

                // Aggregate Sector Weights
                String sector = stock.getSector() != null ? stock.getSector() : "Uncategorized";
                double contribution = (stock.getWeightPercentage() / 100.0) * fund.getCurrentInvestmentValue();
                sectorWeightMap.put(sector, sectorWeightMap.getOrDefault(sector, 0.0) + contribution);
            }
        }

        // Convert Sector Weights to Percentages
        Map<String, Double> sectorPercentageMap = new HashMap<>();
        List<String> sectorWarnings = new ArrayList<>();

        if (totalPortfolioValue > 0) {
            for (Map.Entry<String, Double> entry : sectorWeightMap.entrySet()) {
                double pct = Math.round((entry.getValue() / totalPortfolioValue) * 1000.0) / 10.0;
                sectorPercentageMap.put(entry.getKey(), pct);
                if (pct > 35.0) {
                    sectorWarnings.add("⚠️ High Concentration: " + entry.getKey() + " sector accounts for " + pct + "% of your overall portfolio!");
                }
            }
        }

        // 2. Identify Overlapping Stocks
        List<Map<String, Object>> overlappingStocksList = new ArrayList<>();
        int totalUniqueStocks = stockToFundsMap.size();
        int duplicateStockCount = 0;

        for (Map.Entry<String, Set<String>> entry : stockToFundsMap.entrySet()) {
            String stockSymbol = entry.getKey();
            Set<String> holdingFunds = entry.getValue();

            if (holdingFunds.size() > 1) { // Held by 2 or more funds
                duplicateStockCount++;
                Map<String, Object> overlapDetail = new HashMap<>();
                overlapDetail.put("symbol", stockSymbol);
                overlapDetail.put("holdingFundsCount", holdingFunds.size());
                overlapDetail.put("funds", holdingFunds);

                StockHolding stockInfo = stockMetaMap.get(stockSymbol);
                if (stockInfo != null) {
                    overlapDetail.put("companyName", stockInfo.getCompanyName());
                    overlapDetail.put("sector", stockInfo.getSector());
                    overlapDetail.put("healthStatus", stockInfo.getHealthStatus());
                    overlapDetail.put("healthBadge", stockInfo.getHealthBadge());
                    overlapDetail.put("peRatio", stockInfo.getPeRatio());
                    overlapDetail.put("netProfitGrowth", stockInfo.getNetProfitGrowthYr());
                }
                overlappingStocksList.add(overlapDetail);
            }
        }

        double overlapScore = totalUniqueStocks == 0 ? 0.0 : ((double) duplicateStockCount / totalUniqueStocks) * 100.0;

        overlappingStocksList.sort((a, b) -> Integer.compare(
                (int) b.get("holdingFundsCount"),
                (int) a.get("holdingFundsCount")
        ));

        // 3. Compute Portfolio Overall Health Score (0 to 100)
        double healthScore = 100.0 - (overlapScore * 0.4); // Overlap penalty
        String healthLabel = "🟢 EXCELLENT HEALTH";

        if (healthScore >= 80) {
            healthLabel = "🟢 EXCELLENT HEALTH";
        } else if (healthScore >= 60) {
            healthLabel = "🟡 MODERATE OVERLAP RISK";
        } else {
            healthLabel = "🔴 HIGH OVERLAP & COST RISK";
        }

        Map<String, Object> result = new HashMap<>();
        result.put("overlapPercentage", Math.round(overlapScore * 100.0) / 100.0);
        result.put("totalUniqueStocks", totalUniqueStocks);
        result.put("overlappingStocksCount", duplicateStockCount);
        result.put("overlappingStocks", overlappingStocksList);
        result.put("sectorConcentration", sectorPercentageMap);
        result.put("sectorWarnings", sectorWarnings);
        result.put("portfolioHealthScore", Math.round(healthScore));
        result.put("portfolioHealthLabel", healthLabel);

        return result;
    }
}
