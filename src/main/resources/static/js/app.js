/* ==========================================================================
   NIVESHRAKSHAK X-RAY - MAIN APPLICATION CONTROLLER (DEFENSIVE & VERCEL SAFE)
   ========================================================================== */

let currentAnalysisData = null;
let networkInstance = null;
let isPhysicsEnabled = true;
let synth = window.speechSynthesis;

let currentPage = 1;
const pageSize = 5;
let filteredStocks = [];

document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
});

function setupDragAndDrop() {
    const dropZone = document.getElementById('dropZone');
    if (!dropZone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-over'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-over'), false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
}

function setSafeText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}

function setSafeHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

async function runDemoAnalysis() {
    showLoading(true);
    try {
        let data;
        try {
            const response = await fetch('/api/v1/xray/analyze', { method: 'POST' });
            if (!response.ok) throw new Error("Static Host Mode");
            data = await response.json();
        } catch (fetchErr) {
            data = generateClientSideFallbackData("demo.pdf");
        }
        data.isDemo = true;
        currentAnalysisData = data;
        renderDashboard(data);
        showToast('Demo Portfolio Analysis Loaded (Sample Data)', 'info');
    } catch (err) {
        showToast('Analysis Error: ' + escapeHtml(err.message), 'danger');
    } finally {
        showLoading(false);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) handleFileUpload(file);
}

async function handleFileUpload(file) {
    if (!file) return;

    // Client-side file validation
    const maxSizeBytes = 10 * 1024 * 1024; // 10 MB
    if (file.size > maxSizeBytes) {
        showToast('File Error: File size exceeds the 10MB limit.', 'danger');
        return;
    }

    const safeName = escapeHtml(file.name);
    const lowerName = file.name.toLowerCase();
    if (!lowerName.endsWith('.pdf') && !lowerName.endsWith('.png') && !lowerName.endsWith('.jpg') && !lowerName.endsWith('.jpeg')) {
        showToast('File Error: Unsupported file format. Only PDF CAS statements and PNG/JPG images are supported.', 'danger');
        return;
    }

    showLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/v1/xray/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            const errMsg = errData.message || `Server returned HTTP ${response.status}: ${response.statusText}`;
            throw new Error(errMsg);
        }

        const data = await response.json();
        data.isDemo = false;
        currentAnalysisData = data;
        renderDashboard(data);
        showToast(`Successfully analyzed ${safeName}!`, 'success');
    } catch (err) {
        showToast(`Analysis Failed for ${safeName}: ` + escapeHtml(err.message), 'danger');
    } finally {
        showLoading(false);
    }
}

function generateClientSideFallbackData(filename) {
    const funds = [
        {
            schemeName: "Nippon India Large Cap Fund",
            category: "Large Cap",
            planType: "REGULAR",
            expenseRatio: 1.68,
            currentInvestmentValue: 150000.0,
            topHoldings: [
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", weightPercentage: 9.8, sector: "Banking & Finance", healthStatus: "🟢 PROFITABLE & STRONG", healthBadge: "Stable Growth", riskDescription: "Consistent 15%+ PAT growth", netProfitGrowthYr: 16.8, peRatio: 18.5, debtToEquity: 0.8, oneYrReturnPercentage: 12.5 },
                { symbol: "RELIANCE", companyName: "Reliance Industries Ltd", weightPercentage: 8.5, sector: "Energy & Oil", healthStatus: "🟢 PROFITABLE & STRONG", healthBadge: "Stable Growth", riskDescription: "Strong Telecom & Energy cashflows", netProfitGrowthYr: 14.2, peRatio: 24.1, debtToEquity: 0.45, oneYrReturnPercentage: 18.4 },
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", weightPercentage: 7.2, sector: "Banking & Finance", healthStatus: "🟢 PROFITABLE & STRONG", healthBadge: "Stable Growth", riskDescription: "Industry-leading NIMs", netProfitGrowthYr: 21.0, peRatio: 17.2, debtToEquity: 0.65, oneYrReturnPercentage: 22.8 },
                { symbol: "PAYTM", companyName: "One97 Communications Ltd", weightPercentage: 4.5, sector: "Fintech & Payments", healthStatus: "🔴 HIGH_RISK / UNPROFITABLE", healthBadge: "High Risk", riskDescription: "Net profit negative (-₹540 Cr), Regulatory pressure", netProfitGrowthYr: -24.5, peRatio: -35.2, debtToEquity: 0.4, oneYrReturnPercentage: -22.1 }
            ]
        },
        {
            schemeName: "ICICI Prudential Bluechip Fund",
            category: "Large Cap",
            planType: "DIRECT",
            expenseRatio: 0.92,
            currentInvestmentValue: 200000.0,
            topHoldings: [
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", weightPercentage: 10.4, sector: "Banking & Finance", healthStatus: "🟢 PROFITABLE & STRONG", healthBadge: "Stable Growth", riskDescription: "Consistent 15%+ PAT growth", netProfitGrowthYr: 16.8, peRatio: 18.5, debtToEquity: 0.8, oneYrReturnPercentage: 12.5 },
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", weightPercentage: 8.9, sector: "Banking & Finance", healthStatus: "🟢 PROFITABLE & STRONG", healthBadge: "Stable Growth", riskDescription: "Industry-leading NIMs", netProfitGrowthYr: 21.0, peRatio: 17.2, debtToEquity: 0.65, oneYrReturnPercentage: 22.8 },
                { symbol: "ZOMATO", companyName: "Zomato Ltd", weightPercentage: 3.8, sector: "Consumer Tech", healthStatus: "🟡 STAGNANT / HIGH_VALUATION", healthBadge: "High P/E", riskDescription: "Turned profitable recently but high P/E ratio", netProfitGrowthYr: 12.4, peRatio: 120.5, debtToEquity: 0.1, oneYrReturnPercentage: 45.3 }
            ]
        }
    ];

    const allExtractedStocks = [
        { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", weightPercentage: 10.4, sector: "Banking & Finance", healthStatus: "🟢 PROFITABLE & STRONG", netProfitGrowthYr: 16.8, peRatio: 18.5, oneYrReturnPercentage: 12.5 },
        { symbol: "RELIANCE", companyName: "Reliance Industries Ltd", weightPercentage: 8.5, sector: "Energy & Oil", healthStatus: "🟢 PROFITABLE & STRONG", netProfitGrowthYr: 14.2, peRatio: 24.1, oneYrReturnPercentage: 18.4 },
        { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", weightPercentage: 8.9, sector: "Banking & Finance", healthStatus: "🟢 PROFITABLE & STRONG", netProfitGrowthYr: 21.0, peRatio: 17.2, oneYrReturnPercentage: 22.8 },
        { symbol: "PAYTM", companyName: "One97 Communications Ltd", weightPercentage: 4.5, sector: "Fintech & Payments", healthStatus: "🔴 HIGH_RISK / UNPROFITABLE", riskDescription: "Net profit negative (-₹540 Cr)", netProfitGrowthYr: -24.5, peRatio: -35.2, oneYrReturnPercentage: -22.1 },
        { symbol: "ZOMATO", companyName: "Zomato Ltd", weightPercentage: 3.8, sector: "Consumer Tech", healthStatus: "🟡 STAGNANT / HIGH_VALUATION", riskDescription: "High P/E Valuation (120x)", netProfitGrowthYr: 12.4, peRatio: 120.5, oneYrReturnPercentage: 45.3 }
    ];

    const toxicAlerts = [
        { symbol: "PAYTM", companyName: "One97 Communications Ltd", healthStatus: "🔴 HIGH_RISK / UNPROFITABLE", riskDescription: "Net profit negative (-₹540 Cr), Regulatory pressure", netProfitGrowthYr: -24.5 }
    ];

    return {
        status: "SUCCESS",
        totalFundsAnalyzed: funds.length,
        funds: funds,
        allExtractedStocks: allExtractedStocks,
        highRiskStockAlerts: toxicAlerts,
        overlapAnalytics: {
            overlapPercentage: 42.5,
            totalUniqueStocks: 5,
            overlappingStocksCount: 2,
            overlappingStocks: [
                { symbol: "HDFCBANK", companyName: "HDFC Bank Ltd", holdingFundsCount: 2, funds: ["Nippon India Large Cap", "ICICI Bluechip"] },
                { symbol: "ICICIBANK", companyName: "ICICI Bank Ltd", holdingFundsCount: 2, funds: ["Nippon India Large Cap", "ICICI Bluechip"] }
            ],
            sectorConcentration: { "Banking & Finance": 48.5, "Energy & Oil": 22.1, "Fintech": 14.2 },
            sectorWarnings: ["⚠️ High Concentration: Banking & Finance sector accounts for 48.5% of your portfolio!"],
            portfolioHealthScore: 72,
            portfolioHealthLabel: "🟡 MODERATE OVERLAP RISK"
        },
        expenseAnalytics: {
            totalPortfolioValue: 350000.0,
            fiveYearExpenseCostDrag: 24800.0,
            fiveYearRegularCommissionLoss: 14200.0,
            regularPlansCount: 1,
            directPlansCount: 1,
            recommendation: "⚠️ Action Required: You are holding 1 REGULAR plan. Switch to DIRECT plans to save ~₹14,200 in distributor commissions over 5 years!"
        },
        restructuringActionPlan: [
            { stepNumber: 1, category: "COMMISSION_SAVINGS", title: "Switch 1 Regular Scheme to Direct Plan", description: "Save ~₹14,200 over 5 years in distributor commissions by switching Nippon Large Cap to Direct plan.", priority: "HIGH", financialImpact: "Save ~₹14,200" },
            { stepNumber: 2, category: "REDUCE_OVERLAP", title: "Consolidate Overlapping Large Cap Schemes", description: "HDFC Bank & ICICI Bank are duplicated across both funds. Consolidate to reduce overlap.", priority: "MEDIUM", financialImpact: "Lower Risk Score" }
        ]
    };
}

function showLoading(isLoading) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.classList.toggle('d-none', !isLoading);

    const results = document.getElementById('resultsContainer');
    if (results && isLoading) {
        results.classList.add('d-none');
    }
}

function renderDashboard(data) {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.classList.remove('d-none');
        
        let demoBanner = document.getElementById('demoBannerAlert');
        if (data.isDemo) {
            if (!demoBanner) {
                demoBanner = document.createElement('div');
                demoBanner.id = 'demoBannerAlert';
                demoBanner.className = 'alert alert-warning border-warning rounded-4 shadow-sm p-3 mb-4 d-flex align-items-center justify-content-between';
                demoBanner.innerHTML = `
                    <div class="d-flex align-items-center gap-3">
                        <i class="fa-solid fa-flask fs-4 text-warning"></i>
                        <div>
                            <h6 class="fw-bold mb-0 text-dark">Sample Demo Mode Active</h6>
                            <span class="small text-secondary">Displaying sample portfolio data — not your actual portfolio. Upload your CAS PDF for personalized portfolio analysis.</span>
                        </div>
                    </div>
                `;
                resultsContainer.insertBefore(demoBanner, resultsContainer.firstChild);
            }
        } else if (demoBanner) {
            demoBanner.remove();
        }
    }

    const overlap = data.overlapAnalytics || {};
    const expense = data.expenseAnalytics || {};

    if (overlap.portfolioHealthScore !== undefined) {
        animateCounter('metricHealthScore', 0, overlap.portfolioHealthScore, '/100');
        setSafeText('metricHealthLabel', overlap.portfolioHealthLabel || 'HEALTHY');
    }

    animateCounter('metricOverlap', 0, overlap.overlapPercentage || 0, '%');

    const overlapBar = document.getElementById('overlapProgressBar');
    if (overlapBar) {
        overlapBar.style.width = (overlap.overlapPercentage || 0) + '%';
    }

    setSafeText('metricOverlapSub', `${overlap.overlappingStocksCount || 0} Overlapping Stocks Out of ${overlap.totalUniqueStocks || 0}`);
    setSafeText('metricCostDrag', "₹" + Number(expense.fiveYearExpenseCostDrag || 0).toLocaleString('en-IN'));
    setSafeText('metricCommission', "₹" + Number(expense.fiveYearRegularCommissionLoss || 0).toLocaleString('en-IN'));
    setSafeText('metricPlansCount', `${expense.regularPlansCount || 0} Regular / ${expense.directPlansCount || 0} Direct Plans`);
    setSafeText('metricToxicCount', (data.highRiskStockAlerts || []).length);

    setSafeText('recText', expense.recommendation || 'Portfolio analysis complete.');

    renderSectorWarnings(overlap.sectorWarnings || []);
    renderActionPlan(data.restructuringActionPlan || []);

    const slider = document.getElementById('returnSlider');
    if (slider) {
        updateReturnSimulation(slider.value);
    }

    renderToxicStockAlerts(data.highRiskStockAlerts || []);

    filteredStocks = data.allExtractedStocks || [];
    currentPage = 1;
    renderStockTablePage();

    if (typeof renderSectorChart === 'function') {
        renderSectorChart(data.allExtractedStocks || []);
    }

    const totalPortfolioVal = expense.totalPortfolioValue || 500000;
    if (typeof renderCompoundingChart === 'function') {
        renderCompoundingChart(totalPortfolioVal, 12.0, 1.65, 0.90);
    }

    renderFundCards(data.funds || []);

    if (typeof renderNetworkGraph === 'function') {
        renderNetworkGraph(data.funds || [], overlap.overlappingStocks || []);
    }
}

function renderSectorWarnings(warnings) {
    const container = document.getElementById('sectorWarningsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (!warnings || warnings.length === 0) {
        container.innerHTML = '<span class="text-success small fw-semibold"><i class="fa-solid fa-circle-check me-1"></i> Sector diversification is well-balanced.</span>';
        return;
    }

    warnings.forEach(warn => {
        container.innerHTML += `<div class="alert alert-warning py-2 px-3 small mb-1 border-warning rounded-3">${warn}</div>`;
    });
}

function renderActionPlan(plan) {
    const container = document.getElementById('actionPlanContainer');
    if (!container) return;
    container.innerHTML = '';

    if (!plan || plan.length === 0) {
        container.innerHTML = '<div class="text-success small fw-semibold"><i class="fa-solid fa-circle-check me-1"></i> Your portfolio is fully optimized! No immediate changes required.</div>';
        return;
    }

    plan.forEach(item => {
        const badgeColor = item.priority === 'HIGH' ? 'bg-danger' : 'bg-warning text-dark';
        container.innerHTML += `
            <div class="card p-3 mb-2 border shadow-sm rounded-3">
                <div class="d-flex justify-content-between align-items-start mb-1">
                    <span class="badge ${badgeColor}">STEP ${item.stepNumber} • ${item.priority} PRIORITY</span>
                    <span class="badge bg-light text-primary border fw-bold">${item.financialImpact}</span>
                </div>
                <h6 class="fw-bold text-dark my-1">${item.title}</h6>
                <p class="small text-secondary m-0">${item.description}</p>
            </div>
        `;
    });
}

function renderToxicStockAlerts(toxicStocks) {
    const container = document.getElementById('toxicStockList');
    if (!container) return;
    container.innerHTML = '';

    if (!toxicStocks || toxicStocks.length === 0) {
        container.innerHTML = `
            <div class="alert alert-success d-flex align-items-center gap-2 m-0 border-0 rounded-3">
                <i class="fa-solid fa-circle-check fs-5"></i>
                <div>No high-risk or loss-making stocks detected in top portfolio holdings!</div>
            </div>
        `;
        return;
    }

    toxicStocks.forEach(stock => {
        container.innerHTML += `
            <div class="card p-3 border-danger bg-white shadow-sm rounded-3">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="fw-bold text-danger mb-1">${stock.symbol} - ${stock.companyName}</h6>
                        <span class="badge badge-toxic mb-1">${stock.healthStatus}</span>
                        <p class="small text-secondary m-0">${stock.riskDescription}</p>
                    </div>
                    <div class="text-end">
                        <span class="small text-muted">PAT Growth</span>
                        <div class="fw-bold text-danger">${stock.netProfitGrowthYr}%</div>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderStockTablePage() {
    const tbody = document.getElementById('stockHealthTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageItems = filteredStocks.slice(start, end);

    if (pageItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No matching stocks found.</td></tr>';
        return;
    }

    pageItems.forEach(stock => {
        let badgeClass = 'badge-profitable';
        if (stock.healthStatus && (stock.healthStatus.includes('HIGH_RISK') || stock.healthStatus.includes('UNPROFITABLE'))) {
            badgeClass = 'badge-toxic';
        } else if (stock.healthStatus && (stock.healthStatus.includes('MODERATE') || stock.healthStatus.includes('STAGNANT'))) {
            badgeClass = 'badge-stagnant';
        }

        tbody.innerHTML += `
            <tr class="stock-row">
                <td class="fw-bold text-primary">${stock.symbol}</td>
                <td class="fw-medium">${stock.companyName}</td>
                <td class="text-secondary">${stock.sector}</td>
                <td><span class="badge ${badgeClass}">${stock.healthStatus}</span></td>
                <td class="text-end ${stock.netProfitGrowthYr >= 0 ? 'text-success' : 'text-danger'} fw-bold font-mono">${stock.netProfitGrowthYr}%</td>
                <td class="text-end font-mono">${stock.peRatio}x</td>
                <td class="text-end ${stock.oneYrReturnPercentage >= 0 ? 'text-success' : 'text-danger'} fw-bold font-mono">${stock.oneYrReturnPercentage}%</td>
            </tr>
        `;
    });

    renderPaginationControls();
}

function filterStockTable() {
    const searchEl = document.getElementById('stockSearchInput');
    const filterEl = document.getElementById('stockFilterSelect');
    if (!searchEl || !filterEl || !currentAnalysisData) return;

    const searchText = searchEl.value.toLowerCase();
    const filterValue = filterEl.value;

    filteredStocks = (currentAnalysisData.allExtractedStocks || []).filter(stock => {
        const matchesSearch = stock.symbol.toLowerCase().includes(searchText) || stock.companyName.toLowerCase().includes(searchText);
        const matchesFilter = (filterValue === 'ALL') || stock.healthStatus.includes(filterValue);
        return matchesSearch && matchesFilter;
    });

    currentPage = 1;
    renderStockTablePage();
}

function renderPaginationControls() {
    const totalPages = Math.ceil(filteredStocks.length / pageSize) || 1;
    const container = document.getElementById('paginationControls');
    if (!container) return;

    container.innerHTML = `
        <button class="btn btn-sm btn-taste-soft me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)"><i class="fa-solid fa-chevron-left me-1"></i> Previous</button>
        <span class="small text-secondary font-mono px-2">Page ${currentPage} of ${totalPages}</span>
        <button class="btn btn-sm btn-taste-soft ms-2" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Next <i class="fa-solid fa-chevron-right ms-1"></i></button>
    `;
}

function changePage(delta) {
    currentPage += delta;
    renderStockTablePage();
}

function renderFundCards(funds) {
    const fundContainer = document.getElementById('fundList');
    if (!fundContainer) return;
    fundContainer.innerHTML = '';
    funds.forEach(fund => {
        fundContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card card-custom p-3 h-100">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-light text-primary border">${fund.category}</span>
                        <span class="badge ${fund.planType === 'DIRECT' ? 'bg-success text-white' : 'bg-warning text-dark'}">${fund.planType} PLAN</span>
                    </div>
                    <h6 class="fw-bold text-dark">${fund.schemeName}</h6>
                    <p class="small text-secondary mb-2">Expense Ratio: ${fund.expenseRatio}%</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                        <span class="small text-secondary">Investment Value</span>
                        <span class="fw-bold text-primary">₹${Number(fund.currentInvestmentValue).toLocaleString('en-IN')}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

function updateReturnSimulation(val) {
    setSafeText('returnRateVal', val + "%");
    if (!currentAnalysisData) return;

    const expense = currentAnalysisData.expenseAnalytics || {};
    const baseLoss = expense.fiveYearExpenseCostDrag || 0;
    const baseCommission = expense.fiveYearRegularCommissionLoss || 0;

    const multiplier = Math.pow(1 + (val / 100.0), 5) / Math.pow(1 + 0.12, 5);

    setSafeText('simulatedExpenseFee', "₹" + Math.round(baseLoss * multiplier).toLocaleString('en-IN'));
    setSafeText('simulatedCommissionSavings', "₹" + Math.round(baseCommission * multiplier).toLocaleString('en-IN'));

    const totalVal = expense.totalPortfolioValue || 500000;
    if (typeof renderCompoundingChart === 'function') {
        renderCompoundingChart(totalVal, parseFloat(val), 1.65, 0.90);
    }
}

function renderNetworkGraph(funds, overlappingStocks) {
    const container = document.getElementById('network-graph');
    if (!container) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const edgeColor = isDark ? '#334155' : '#CBD5E1';

    const nodes = [];
    const edges = [];

    funds.forEach((fund, index) => {
        nodes.push({ id: 'F_' + index, label: fund.schemeName, shape: 'ellipse', color: '#FF6B00', font: { color: '#FFFFFF', size: 14, face: 'Plus Jakarta Sans' } });
        (fund.topHoldings || []).forEach(stock => {
            const stockId = 'S_' + stock.symbol;
            if (!nodes.some(n => n.id === stockId)) {
                const isOverlap = (overlappingStocks || []).some(o => o.symbol === stock.symbol);
                nodes.push({
                    id: stockId,
                    label: stock.symbol,
                    shape: 'box',
                    color: isOverlap ? '#EF4444' : '#10B981',
                    font: { color: '#FFFFFF', size: 12, face: 'IBM Plex Mono' }
                });
            }
            edges.push({ from: 'F_' + index, to: stockId, color: { color: edgeColor } });
        });
    });

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
        nodes: { borderWidth: 2, shadow: true },
        physics: { solver: 'forceAtlas2Based', stabilization: { iterations: 150 } }
    };
    networkInstance = new vis.Network(container, data, options);
}

function togglePhysics() {
    if (!networkInstance) return;
    isPhysicsEnabled = !isPhysicsEnabled;
    networkInstance.setOptions({ physics: { enabled: isPhysicsEnabled } });
}

function resetGraphView() {
    if (networkInstance) networkInstance.fit();
}

function toggleVoiceSummary() {
    if (!window.VoiceEngine) return;

    if (window.VoiceEngine.isPlaying) {
        window.VoiceEngine.stop();
        return;
    }

    if (!currentAnalysisData) {
        const msg = window.I18nEngine 
            ? (window.I18nEngine.t('noAnalysisForVoice') || "Please upload your CAS statement or run an analysis first to listen to your portfolio voice summary.") 
            : "Please upload your CAS statement or run an analysis first to listen to your portfolio voice summary.";
        showToast(msg, "warning");
        return;
    }

    const overlap = (currentAnalysisData.overlapAnalytics || {}).overlapPercentage || 0;
    const regCount = (currentAnalysisData.expenseAnalytics || {}).regularPlansCount || 0;
    const expRatio = (currentAnalysisData.expenseAnalytics || {}).averageExpenseRatio || 0;

    const lang = window.I18nEngine ? window.I18nEngine.currentLang : 'en';
    const summaryFn = window.VoiceEngine.summaries[lang] || window.VoiceEngine.summaries['en'];
    const summaryText = summaryFn(overlap, regCount, expRatio);

    window.VoiceEngine.speak(summaryText, lang);
}

function animateCounter(id, start, end, suffix = '') {
    const obj = document.getElementById(id);
    if (!obj) return;
    let current = start;
    const stepTime = 20;
    const steps = 30;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            obj.innerText = Math.round(end) + suffix;
            clearInterval(timer);
        } else {
            obj.innerText = Math.round(current) + suffix;
        }
    }, stepTime);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toastEl = document.createElement('div');
    toastEl.className = `toast align-items-center text-white bg-${type} border-0 show animate__animated animate__fadeInUp`;
    toastEl.setAttribute('role', 'alert');
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    container.appendChild(toastEl);
    setTimeout(() => toastEl.remove(), 4000);
}
