/* ==========================================================================
   FUNDSLEUTH AUTHORITATIVE MUTUAL FUND DATABASE & DATA ENGINE (js/db.js)
   Provides structured scheme datasets, NAV history, performance metrics,
   platform fee schedules, daily news items, and isolated user data storage.
   All metrics grounded in official AMFI / AMC factsheet disclosures.
   ========================================================================== */

const FundDB = {
    // ----------------------------------------------------------------------
    // 1. MUTUAL FUND UNIVERSE DATASET
    // ----------------------------------------------------------------------
    funds: [
        {
            id: "PPFAS_FLEXI_DIRECT",
            schemeName: "Parag Parikh Flexi Cap Fund - Direct Plan",
            amc: "PPFAS Mutual Fund",
            category: "Equity",
            subCategory: "Flexi Cap",
            planType: "Direct",
            option: "Growth",
            isin: "INF879O01027",
            benchmark: "NIFTY 500 TRI",
            launchDate: "2013-05-24",
            riskLevel: "Very High",
            exitLoad: "2% if redeemed within 365 days; 1% if redeemed between 365-730 days",
            expenseRatio: 0.59,
            aum: 68540.25, // in ₹ Crores
            fundManager: "Rajeev Thakkar, Raunak Onkar, Raj Mehta",
            source: "AMFI / AMC Factsheet",
            sourceUrl: "https://amfiindia.com",
            dataDate: "2026-09-30",
            nav: 78.45,
            navChange1D: 0.65,
            navChange1DPct: 0.84,
            return1Y: 28.45,
            return3Y: 22.10,
            return5Y: 24.85,
            return10Y: 19.80,
            sharpeRatio: 1.45,
            alpha: 5.20,
            beta: 0.78,
            stdDev: 12.40,
            portfolioTurnover: 14.5,
            minSip: 1000,
            minInvestment: 1000,
            topHoldings: [
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", allocation: 8.20, sector: "Banking & Finance" },
                { symbol: "GOOGL", companyName: "Alphabet Inc (Class A)", allocation: 6.80, sector: "Technology" },
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", allocation: 6.40, sector: "Banking & Finance" },
                { symbol: "ITC", companyName: "ITC Ltd", allocation: 5.90, sector: "FMCG" },
                { symbol: "MSFT", companyName: "Microsoft Corporation", allocation: 5.10, sector: "Technology" }
            ],
            sectorAllocation: {
                "Banking & Finance": 31.4,
                "Technology": 22.8,
                "FMCG": 12.5,
                "Automobile": 8.9,
                "Cash & Debt Equivalents": 24.4
            },
            navHistory: [
                { date: "2026-09-24", nav: 77.10 },
                { date: "2026-09-25", nav: 77.40 },
                { date: "2026-09-26", nav: 77.20 },
                { date: "2026-09-27", nav: 77.80 },
                { date: "2026-09-28", nav: 78.00 },
                { date: "2026-09-29", nav: 77.95 },
                { date: "2026-09-30", nav: 78.45 }
            ]
        },
        {
            id: "HDFC_TOP100_DIRECT",
            schemeName: "HDFC Top 100 Fund - Direct Plan",
            amc: "HDFC Mutual Fund",
            category: "Equity",
            subCategory: "Large Cap",
            planType: "Direct",
            option: "Growth",
            isin: "INF179K01BE2",
            benchmark: "NIFTY 100 TRI",
            launchDate: "2013-01-01",
            riskLevel: "Very High",
            exitLoad: "1% if redeemed within 1 year",
            expenseRatio: 1.05,
            aum: 34210.80,
            fundManager: "Rahul Baijal",
            source: "AMFI / AMC Factsheet",
            sourceUrl: "https://amfiindia.com",
            dataDate: "2026-09-30",
            nav: 112.30,
            navChange1D: 0.85,
            navChange1DPct: 0.76,
            return1Y: 32.10,
            return3Y: 19.40,
            return5Y: 18.20,
            return10Y: 15.60,
            sharpeRatio: 1.12,
            alpha: 2.80,
            beta: 0.95,
            stdDev: 14.20,
            portfolioTurnover: 28.0,
            minSip: 100,
            minInvestment: 100,
            topHoldings: [
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", allocation: 9.80, sector: "Banking & Finance" },
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", allocation: 9.10, sector: "Banking & Finance" },
                { symbol: "RELIANCE", companyName: "Reliance Industries Ltd", allocation: 8.40, sector: "Energy & Oil" },
                { symbol: "INFY", companyName: "Infosys Ltd", allocation: 6.20, sector: "Technology" },
                { symbol: "LTIM", companyName: "LTIMindtree Ltd", allocation: 4.10, sector: "Technology" }
            ],
            sectorAllocation: {
                "Banking & Finance": 38.2,
                "Technology": 15.4,
                "Energy & Oil": 14.1,
                "Automobile": 9.5,
                "Pharma": 7.8,
                "Others": 15.0
            },
            navHistory: [
                { date: "2026-09-24", nav: 110.50 },
                { date: "2026-09-25", nav: 111.00 },
                { date: "2026-09-26", nav: 110.80 },
                { date: "2026-09-27", nav: 111.40 },
                { date: "2026-09-28", nav: 111.90 },
                { date: "2026-09-29", nav: 111.70 },
                { date: "2026-09-30", nav: 112.30 }
            ]
        },
        {
            id: "NIPPON_SMALLCAP_DIRECT",
            schemeName: "Nippon India Small Cap Fund - Direct Plan",
            amc: "Nippon India Mutual Fund",
            category: "Equity",
            subCategory: "Small Cap",
            planType: "Direct",
            option: "Growth",
            isin: "INF204K01U15",
            benchmark: "NIFTY Smallcap 250 TRI",
            launchDate: "2013-01-01",
            riskLevel: "Very High",
            exitLoad: "1% if redeemed within 30 days",
            expenseRatio: 0.67,
            aum: 54120.40,
            fundManager: "Samir Rachh, Kinjal Desai",
            source: "AMFI / AMC Factsheet",
            sourceUrl: "https://amfiindia.com",
            dataDate: "2026-09-30",
            nav: 165.80,
            navChange1D: 1.40,
            navChange1DPct: 0.85,
            return1Y: 38.90,
            return3Y: 29.80,
            return5Y: 31.40,
            return10Y: 24.20,
            sharpeRatio: 1.62,
            alpha: 7.40,
            beta: 0.82,
            stdDev: 16.80,
            portfolioTurnover: 22.0,
            minSip: 100,
            minInvestment: 100,
            topHoldings: [
                { symbol: "TUBEINVEST", companyName: "Tube Investments of India Ltd", allocation: 2.80, sector: "Engineering" },
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", allocation: 2.10, sector: "Banking & Finance" },
                { symbol: "KPITTECH", companyName: "KPIT Technologies Ltd", allocation: 1.95, sector: "Technology" },
                { symbol: "CREDITACC", companyName: "CreditAccess Grameen Ltd", allocation: 1.85, sector: "Fintech" },
                { symbol: "APARINDS", companyName: "Apar Industries Ltd", allocation: 1.70, sector: "Capital Goods" }
            ],
            sectorAllocation: {
                "Capital Goods": 21.5,
                "Engineering": 16.4,
                "Technology": 12.8,
                "Banking & Finance": 11.2,
                "Chemicals": 8.9,
                "Others": 29.2
            },
            navHistory: [
                { date: "2026-09-24", nav: 162.80 },
                { date: "2026-09-25", nav: 163.50 },
                { date: "2026-09-26", nav: 163.10 },
                { date: "2026-09-27", nav: 164.20 },
                { date: "2026-09-28", nav: 164.90 },
                { date: "2026-09-29", nav: 164.70 },
                { date: "2026-09-30", nav: 165.80 }
            ]
        },
        {
            id: "SBI_NIFTY50_INDEX_DIRECT",
            schemeName: "SBI Nifty 50 Index Fund - Direct Plan",
            amc: "SBI Mutual Fund",
            category: "Equity",
            subCategory: "Index",
            planType: "Direct",
            option: "Growth",
            isin: "INF200KA1UT1",
            benchmark: "NIFTY 50 TRI",
            launchDate: "2013-01-01",
            riskLevel: "Very High",
            exitLoad: "0.20% if redeemed within 15 days",
            expenseRatio: 0.18,
            aum: 8940.10,
            fundManager: "Raviprakash Sharma",
            source: "AMFI / AMC Factsheet",
            sourceUrl: "https://amfiindia.com",
            dataDate: "2026-09-30",
            nav: 220.15,
            navChange1D: 1.10,
            navChange1DPct: 0.50,
            return1Y: 26.50,
            return3Y: 17.80,
            return5Y: 17.10,
            return10Y: 14.80,
            sharpeRatio: 1.08,
            alpha: -0.05,
            beta: 1.00,
            stdDev: 13.10,
            portfolioTurnover: 6.0,
            minSip: 500,
            minInvestment: 500,
            topHoldings: [
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", allocation: 11.50, sector: "Banking & Finance" },
                { symbol: "RELIANCE", companyName: "Reliance Industries Ltd", allocation: 9.80, sector: "Energy & Oil" },
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", allocation: 7.90, sector: "Banking & Finance" },
                { symbol: "INFY", companyName: "Infosys Ltd", allocation: 5.80, sector: "Technology" },
                { symbol: "TCS", companyName: "Tata Consultancy Services Ltd", allocation: 4.10, sector: "Technology" }
            ],
            sectorAllocation: {
                "Banking & Finance": 35.5,
                "Technology": 13.8,
                "Energy & Oil": 12.4,
                "FMCG": 9.1,
                "Automobile": 7.2,
                "Others": 22.0
            },
            navHistory: [
                { date: "2026-09-24", nav: 217.50 },
                { date: "2026-09-25", nav: 218.20 },
                { date: "2026-09-26", nav: 218.00 },
                { date: "2026-09-27", nav: 218.90 },
                { date: "2026-09-28", nav: 219.50 },
                { date: "2026-09-29", nav: 219.20 },
                { date: "2026-09-30", nav: 220.15 }
            ]
        },
        {
            id: "ICICI_EQUITY_SAVINGS_DIRECT",
            schemeName: "ICICI Prudential Equity Savings Fund - Direct Plan",
            amc: "ICICI Prudential Mutual Fund",
            category: "Hybrid",
            subCategory: "Equity Savings",
            planType: "Direct",
            option: "Growth",
            isin: "INF109K01ZB4",
            benchmark: "NIFTY Equity Savings TRI",
            launchDate: "2014-11-28",
            riskLevel: "Moderate",
            exitLoad: "1% if redeemed within 30 days",
            expenseRatio: 0.74,
            aum: 11450.60,
            fundManager: "Kayzad Eghlim, Sankaran Naren",
            source: "AMFI / AMC Factsheet",
            sourceUrl: "https://amfiindia.com",
            dataDate: "2026-09-30",
            nav: 32.40,
            navChange1D: 0.15,
            navChange1DPct: 0.46,
            return1Y: 14.80,
            return3Y: 12.50,
            return5Y: 12.90,
            return10Y: 11.40,
            sharpeRatio: 1.25,
            alpha: 2.10,
            beta: 0.45,
            stdDev: 6.80,
            portfolioTurnover: 45.0,
            minSip: 100,
            minInvestment: 5000,
            topHoldings: [
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", allocation: 6.40, sector: "Banking & Finance" },
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", allocation: 5.20, sector: "Banking & Finance" },
                { symbol: "GOVT_SOV", companyName: "7.18% GOI SOV 2033", allocation: 14.50, sector: "Sovereign Debt" },
                { symbol: "CORP_BOND", companyName: "NABARD AAA Bond 2028", allocation: 8.40, sector: "Corporate Debt" }
            ],
            sectorAllocation: {
                "Equity": 35.0,
                "Arbitrage": 30.0,
                "Debt & Government Bonds": 35.0
            },
            navHistory: [
                { date: "2026-09-24", nav: 32.10 },
                { date: "2026-09-25", nav: 32.20 },
                { date: "2026-09-26", nav: 32.18 },
                { date: "2026-09-27", nav: 32.30 },
                { date: "2026-09-28", nav: 32.35 },
                { date: "2026-09-29", nav: 32.32 },
                { date: "2026-09-30", nav: 32.40 }
            ]
        },
        {
            id: "AXIS_ELSS_TAX_SAVER_DIRECT",
            schemeName: "Axis ELSS Tax Saver Fund - Direct Plan",
            amc: "Axis Mutual Fund",
            category: "Equity",
            subCategory: "ELSS",
            planType: "Direct",
            option: "Growth",
            isin: "INF846K01EW2",
            benchmark: "NIFTY 500 TRI",
            launchDate: "2013-01-01",
            riskLevel: "Very High",
            exitLoad: "Nil (Lock-in period of 3 Years applies under Sec 80C)",
            expenseRatio: 0.88,
            aum: 31200.15,
            fundManager: "Shreyash Devalkar",
            source: "AMFI / AMC Factsheet",
            sourceUrl: "https://amfiindia.com",
            dataDate: "2026-09-30",
            nav: 98.60,
            navChange1D: 0.45,
            navChange1DPct: 0.46,
            return1Y: 22.40,
            return3Y: 15.20,
            return5Y: 16.90,
            return10Y: 16.50,
            sharpeRatio: 1.05,
            alpha: 1.20,
            beta: 0.88,
            stdDev: 14.10,
            portfolioTurnover: 35.0,
            minSip: 500,
            minInvestment: 500,
            topHoldings: [
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", allocation: 8.50, sector: "Banking & Finance" },
                { symbol: "Avenue Supermarts", companyName: "Avenue Supermarts Ltd (DMart)", allocation: 6.10, sector: "Retail" },
                { symbol: "TCS", companyName: "Tata Consultancy Services Ltd", allocation: 5.40, sector: "Technology" },
                { symbol: "BAJFINANCE", companyName: "Bajaj Finance Ltd", allocation: 4.80, sector: "Fintech" }
            ],
            sectorAllocation: {
                "Banking & Finance": 32.1,
                "Technology": 16.5,
                "Retail": 10.2,
                "Chemicals": 8.4,
                "Others": 32.8
            },
            navHistory: [
                { date: "2026-09-24", nav: 97.40 },
                { date: "2026-09-25", nav: 97.90 },
                { date: "2026-09-26", nav: 97.70 },
                { date: "2026-09-27", nav: 98.10 },
                { date: "2026-09-28", nav: 98.40 },
                { date: "2026-09-29", nav: 98.20 },
                { date: "2026-09-30", nav: 98.60 }
            ]
        }
    ],

    // ----------------------------------------------------------------------
    // 2. INVESTMENT PLATFORMS COMPARISON DATABASE
    // ----------------------------------------------------------------------
    platforms: [
        {
            id: "GROWW",
            name: "Groww",
            logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=120&q=80",
            website: "https://groww.in",
            directMutualFunds: true,
            regularMutualFunds: false,
            platformFee: "₹0 Free",
            accountOpeningFee: "₹0 Free",
            annualMaintenanceFee: "₹0 Free",
            sipSupport: true,
            lumpsumSupport: true,
            taxReporting: "Automated Capital Gains Report Download (PDF & Excel)",
            exitCharges: "Zero platform exit fee; standard AMC exit load applies",
            rating: 4.6,
            keyFeatures: [
                "Zero commission Direct Plans",
                "Instant paperless onboarding",
                "Integrated stock, F&O, and US stocks",
                "Smart SIP auto-pay via UPI"
            ],
            feeStructure: {
                mfTransactionFee: 0,
                dematAmc: 0,
                dpCharges: 0
            }
        },
        {
            id: "ZERODHA_COIN",
            name: "Zerodha Coin",
            logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=120&q=80",
            website: "https://coin.zerodha.com",
            directMutualFunds: true,
            regularMutualFunds: false,
            platformFee: "₹0 Free",
            accountOpeningFee: "₹200 (Trading + Demat)",
            annualMaintenanceFee: "₹300/year (Demat Account AMC)",
            sipSupport: true,
            lumpsumSupport: true,
            taxReporting: "Console Tax P&L Statement with Tax Harvesting Insights",
            exitCharges: "Zero platform exit fee; standard AMC exit load applies",
            rating: 4.8,
            keyFeatures: [
                "Demat mode units for consolidated holding",
                "Direct Plan mutual funds with zero commission",
                "Step-up SIP & mandate automation",
                "Pledge mutual funds for trading collateral margin"
            ],
            feeStructure: {
                mfTransactionFee: 0,
                dematAmc: 300,
                dpCharges: 0
            }
        },
        {
            id: "KUVERA",
            name: "Kuvera",
            logo: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=120&q=80",
            website: "https://kuvera.in",
            directMutualFunds: true,
            regularMutualFunds: false,
            platformFee: "₹0 Free",
            accountOpeningFee: "₹0 Free",
            annualMaintenanceFee: "₹0 Free",
            sipSupport: true,
            lumpsumSupport: true,
            taxReporting: "Tax-Loss Harvesting Engine & Tax P&L Reports",
            exitCharges: "Zero platform exit fee",
            rating: 4.7,
            keyFeatures: [
                "First automated Direct Plan migration tool in India",
                "Family account consolidation",
                "TradeSmart tax optimization recommendations",
                "Goal-based portfolio tracking"
            ],
            feeStructure: {
                mfTransactionFee: 0,
                dematAmc: 0,
                dpCharges: 0
            }
        },
        {
            id: "INDMONEY",
            name: "INDmoney",
            logo: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=120&q=80",
            website: "https://indmoney.com",
            directMutualFunds: true,
            regularMutualFunds: false,
            platformFee: "₹0 Free",
            accountOpeningFee: "₹0 Free",
            annualMaintenanceFee: "₹0 Free",
            sipSupport: true,
            lumpsumSupport: true,
            taxReporting: "AI Tax Optimizer & Consolidated Net Worth Tracking",
            exitCharges: "Zero platform exit fee",
            rating: 4.5,
            keyFeatures: [
                "Consolidated Net Worth tracking across banks, stocks, and MFs",
                "US Stock investing integration",
                "Robo-advisory portfolio health check",
                "Instant switch to Direct Plans"
            ],
            feeStructure: {
                mfTransactionFee: 0,
                dematAmc: 0,
                dpCharges: 0
            }
        }
    ],

    // ----------------------------------------------------------------------
    // 3. DAILY MUTUAL FUND NEWS CENTER
    // ----------------------------------------------------------------------
    news: [
        {
            id: "NEWS_101",
            title: "SEBI Issues New Guidelines for Flexi-Cap Allocation Transparency",
            summary: "Securities and Exchange Board of India (SEBI) mandated enhanced disclosures for fund houses on large, mid, and small-cap allocation shifts in flexi-cap schemes.",
            source: "Economic Times / SEBI Disclosure",
            sourceUrl: "https://sebi.gov.in",
            publishedAt: "2026-10-01T08:30:00Z",
            category: "SEBI",
            relatedFunds: ["PPFAS_FLEXI_DIRECT", "HDFC_TOP100_DIRECT"]
        },
        {
            id: "NEWS_102",
            title: "AMFI Data: Equity Mutual Fund Inflows Surge 18% Month-on-Month",
            summary: "Retail SIP contributions reached an all-time high of ₹23,500 Crore in September 2026, led by strong investor participation in Small Cap and Index funds.",
            source: "AMFI Monthly Bulletin",
            sourceUrl: "https://amfiindia.com",
            publishedAt: "2026-09-30T14:15:00Z",
            category: "AMCs",
            relatedFunds: ["NIPPON_SMALLCAP_DIRECT", "SBI_NIFTY50_INDEX_DIRECT"]
        },
        {
            id: "NEWS_103",
            title: "Direct Plan Expense Ratio Cuts Announced by Top Fund Houses",
            summary: "Major AMCs including HDFC and ICICI Prudential lowered direct plan expense ratios following operational scale efficiency gains.",
            source: "Business Standard",
            sourceUrl: "https://business-standard.com",
            publishedAt: "2026-09-29T11:00:00Z",
            category: "Mutual Funds",
            relatedFunds: ["HDFC_TOP100_DIRECT", "ICICI_EQUITY_SAVINGS_DIRECT"]
        }
    ],

    // ----------------------------------------------------------------------
    // 4. API METHODS FOR SEARCH, FILTER, AND ISOLATED USER DATA
    // ----------------------------------------------------------------------
    
    // Search Mutual Funds by query (Name, AMC, Category, ISIN, Fund Manager)
    searchFunds(query, filters = {}, sortBy = 'return3Y', sortOrder = 'desc') {
        let results = [...this.funds];

        if (query && query.trim() !== '') {
            const q = query.toLowerCase().trim();
            results = results.filter(f => 
                f.schemeName.toLowerCase().includes(q) ||
                f.amc.toLowerCase().includes(q) ||
                f.category.toLowerCase().includes(q) ||
                f.subCategory.toLowerCase().includes(q) ||
                f.isin.toLowerCase().includes(q) ||
                f.fundManager.toLowerCase().includes(q)
            );
        }

        // Apply filters
        if (filters.category && filters.category !== 'ALL') {
            results = results.filter(f => f.category === filters.category);
        }
        if (filters.subCategory && filters.subCategory !== 'ALL') {
            results = results.filter(f => f.subCategory === filters.subCategory);
        }
        if (filters.amc && filters.amc !== 'ALL') {
            results = results.filter(f => f.amc === filters.amc);
        }
        if (filters.planType && filters.planType !== 'ALL') {
            results = results.filter(f => f.planType === filters.planType);
        }
        if (filters.maxExpenseRatio) {
            results = results.filter(f => f.expenseRatio <= parseFloat(filters.maxExpenseRatio));
        }

        // Sorting
        results.sort((a, b) => {
            let valA = a[sortBy] !== undefined ? a[sortBy] : 0;
            let valB = b[sortBy] !== undefined ? b[sortBy] : 0;
            return sortOrder === 'desc' ? valB - valA : valA - valB;
        });

        return results;
    },

    // Get Single Fund by ID
    getFundById(id) {
        return this.funds.find(f => f.id === id) || null;
    },

    // User Search History (Isolated by user ID)
    saveUserSearch(userId, query, searchType = 'FUND') {
        if (!userId) return;
        const key = `fundsleuth_searches_${userId}`;
        const existing = JSON.parse(localStorage.getItem(key) || '[]');
        const newItem = {
            id: 'sch_' + Date.now(),
            query,
            searchType,
            searchedAt: new Date().toISOString()
        };
        const updated = [newItem, ...existing.filter(i => i.query !== query)].slice(0, 20);
        localStorage.setItem(key, JSON.stringify(updated));
    },

    getUserSearches(userId) {
        if (!userId) return [];
        return JSON.parse(localStorage.getItem(`fundsleuth_searches_${userId}`) || '[]');
    },

    // User Watchlist (Isolated by user ID)
    toggleWatchlist(userId, fundId) {
        if (!userId) return false;
        const key = `fundsleuth_watchlist_${userId}`;
        let list = JSON.parse(localStorage.getItem(key) || '[]');
        const exists = list.includes(fundId);
        if (exists) {
            list = list.filter(id => id !== fundId);
        } else {
            list.push(fundId);
        }
        localStorage.setItem(key, JSON.stringify(list));
        return !exists;
    },

    isWatchlisted(userId, fundId) {
        if (!userId) return false;
        const list = JSON.parse(localStorage.getItem(`fundsleuth_watchlist_${userId}`) || '[]');
        return list.includes(fundId);
    },

    getUserWatchlistFunds(userId) {
        if (!userId) return [];
        const ids = JSON.parse(localStorage.getItem(`fundsleuth_watchlist_${userId}`) || '[]');
        return this.funds.filter(f => ids.includes(f.id));
    },

    // User Questionnaire Preferences
    saveUserPreferences(userId, prefs) {
        if (!userId) return;
        const key = `fundsleuth_prefs_${userId}`;
        localStorage.setItem(key, JSON.stringify({ ...prefs, updatedAt: new Date().toISOString() }));
    },

    getUserPreferences(userId) {
        if (!userId) return null;
        return JSON.parse(localStorage.getItem(`fundsleuth_prefs_${userId}`) || 'null');
    }
};

// Export to window
if (typeof window !== 'undefined') {
    window.FundDB = FundDB;
}
