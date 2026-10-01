/* ==========================================================================
   FUNDSLEUTH QUESTIONNAIRE & TRANSPARENT RECOMMENDATION ENGINE
   Generates explainable, goal-matched fund research suggestions based on
   structured user preferences without black-box AI fabrication.
   ========================================================================== */

const RecommendationEngine = {
    // Generate explainable fund candidates based on questionnaire responses
    generateRecommendations(prefs) {
        if (!prefs || !window.FundDB) return [];

        const allFunds = window.FundDB.funds || [];
        const horizon = prefs.horizon || '5-10 years';
        const risk = prefs.risk || 'High';
        const priority = prefs.priority || 'Growth potential';
        const goal = prefs.goal || 'Wealth creation';

        const scoredFunds = allFunds.map(fund => {
            let score = 70; // Base score
            const matchReasons = [];
            const considerations = [];

            // 1. Horizon & Category Alignment
            if (horizon === '10+ years' || horizon === '5-10 years') {
                if (fund.category === 'Equity') {
                    score += 15;
                    matchReasons.push('✓ High compatibility with 5+ year long-term wealth horizon');
                }
            } else if (horizon === '1-3 years') {
                if (fund.category === 'Hybrid' || fund.subCategory === 'Equity Savings') {
                    score += 20;
                    matchReasons.push('✓ Conservative asset allocation suitable for medium horizon');
                } else if (fund.category === 'Equity') {
                    score -= 20;
                    considerations.push('• High short-term equity market volatility risk for < 3-year horizon');
                }
            }

            // 2. Goal Alignment (Tax Saving -> ELSS)
            if (goal === 'Tax planning' && fund.subCategory === 'ELSS') {
                score += 25;
                matchReasons.push('✓ Qualifies for Section 80C tax deduction with 3-year lock-in');
            }

            // 3. Priority Alignment (Lower Cost -> Direct / Low Expense Ratio)
            if (priority === 'Lower cost') {
                if (fund.expenseRatio < 0.50) {
                    score += 20;
                    matchReasons.push(`✓ Ultra-low expense ratio (${fund.expenseRatio}%) reduces fee drag`);
                } else if (fund.expenseRatio > 1.00) {
                    score -= 10;
                    considerations.push(`• Higher expense ratio (${fund.expenseRatio}%) compared to category index`);
                }
            }

            // 4. Risk Alignment
            if (risk === 'Low' && fund.riskLevel === 'Very High') {
                score -= 30;
                considerations.push('• Risk profile is higher than your selected low risk tolerance');
            } else if (fund.riskLevel === 'Very High' && (risk === 'High' || risk === 'Very high')) {
                score += 10;
                matchReasons.push('✓ Matches selected high risk-reward growth tolerance');
            }

            // 5. Performance & Risk-Adjusted Quality
            if (fund.sharpeRatio >= 1.2) {
                score += 10;
                matchReasons.push(`✓ Strong risk-adjusted performance (Sharpe Ratio: ${fund.sharpeRatio})`);
            }
            if (fund.alpha > 2.0) {
                score += 10;
                matchReasons.push(`✓ Positive alpha generation (${fund.alpha}%) over benchmark`);
            }

            return {
                fund,
                score: Math.min(Math.max(score, 40), 99),
                matchReasons,
                considerations: considerations.length > 0 ? considerations : ['• Past performance is not a guarantee of future returns']
            };
        });

        // Sort by calculated match score descending
        return scoredFunds.sort((a, b) => b.score - a.score);
    }
};

if (typeof window !== 'undefined') {
    window.RecommendationEngine = RecommendationEngine;
}
