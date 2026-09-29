/* ==========================================================================
   NIVESHRAKSHAK X-RAY - MAIN APPLICATION CONTROLLER (DEFENSIVE SAFE DOM)
   ========================================================================== */

let currentAnalysisData = null;
let networkInstance = null;
let isPhysicsEnabled = true;
let synth = window.speechSynthesis;

// Pagination & Filtering State
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

/**
 * Safe Helper to Set InnerText
 */
function setSafeText(id, text) {
    const el = document.getElementById(id);
    if (el) {
        el.innerText = text;
    }
}

/**
 * Safe Helper to Set HTML
 */
function setSafeHTML(id, html) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = html;
    }
}

async function runDemoAnalysis() {
    showLoading(true);
    try {
        const response = await fetch('/api/v1/xray/analyze', { method: 'POST' });
        const data = await response.json();
        currentAnalysisData = data;
        renderDashboard(data);
        showToast('Demo Portfolio Analysis Loaded Successfully!', 'success');
    } catch (err) {
        showToast('Analysis Error: ' + err.message, 'danger');
    } finally {
        showLoading(false);
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) handleFileUpload(file);
}

async function handleFileUpload(file) {
    showLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/api/v1/xray/analyze', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        currentAnalysisData = data;
        renderDashboard(data);
        showToast(`Successfully analyzed ${file.name}!`, 'success');
    } catch (err) {
        console.error("Upload Error:", err);
        showToast('File Processing Error: ' + err.message, 'danger');
    } finally {
        showLoading(false);
    }
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
    }

    const overlap = data.overlapAnalytics || {};
    const expense = data.expenseAnalytics || {};

    // Portfolio Overall Health Scorecard
    if (overlap.portfolioHealthScore !== undefined) {
        animateCounter('metricHealthScore', 0, overlap.portfolioHealthScore, '/100');
        setSafeText('metricHealthLabel', overlap.portfolioHealthLabel || 'HEALTHY');
    }

    // Animate Key Metrics
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

    // Recommendation Banner
    setSafeText('recText', expense.recommendation || 'Portfolio analysis complete.');

    // Render Sector Warnings
    renderSectorWarnings(overlap.sectorWarnings || []);

    // Render Restructuring Action Plan
    renderActionPlan(data.restructuringActionPlan || []);

    // Update Restructuring Simulator Values
    const slider = document.getElementById('returnSlider');
    if (slider) {
        updateReturnSimulation(slider.value);
    }

    // Render Toxic Stock Alerts
    renderToxicStockAlerts(data.highRiskStockAlerts || []);

    // Render Stock Table & Charts
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

    // Render Mutual Fund Scheme Cards
    renderFundCards(data.funds || []);

    // Render Vis.js Network Graph
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
                <td class="${stock.netProfitGrowthYr >= 0 ? 'text-success' : 'text-danger'} fw-bold">${stock.netProfitGrowthYr}%</td>
                <td>${stock.peRatio}x</td>
                <td class="${stock.oneYrReturnPercentage >= 0 ? 'text-success' : 'text-danger'} fw-bold">${stock.oneYrReturnPercentage}%</td>
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
        <button class="btn btn-sm btn-soft me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">Previous</button>
        <span class="small text-secondary font-monospace">Page ${currentPage} of ${totalPages}</span>
        <button class="btn btn-sm btn-soft ms-2" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Next</button>
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

    const nodes = [];
    const edges = [];

    funds.forEach((fund, index) => {
        nodes.push({ id: 'F_' + index, label: fund.schemeName, shape: 'ellipse', color: '#4F46E5', font: { color: '#FFFFFF', size: 14 } });
        (fund.topHoldings || []).forEach(stock => {
            const stockId = 'S_' + stock.symbol;
            if (!nodes.some(n => n.id === stockId)) {
                const isOverlap = (overlappingStocks || []).some(o => o.symbol === stock.symbol);
                nodes.push({
                    id: stockId,
                    label: stock.symbol,
                    shape: 'box',
                    color: isOverlap ? '#EF4444' : '#10B981',
                    font: { color: '#FFFFFF', size: 12 }
                });
            }
            edges.push({ from: 'F_' + index, to: stockId, color: { color: '#CBD5E1' } });
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
    if (synth.speaking) {
        synth.cancel();
        setSafeText('voiceBtnText', "Voice Audio Summary");
        return;
    }

    if (!currentAnalysisData) {
        showToast("Run an X-Ray analysis first to listen to the audio summary!", "warning");
        return;
    }

    const overlap = (currentAnalysisData.overlapAnalytics || {}).overlapPercentage || 0;
    const regCount = (currentAnalysisData.expenseAnalytics || {}).regularPlansCount || 0;
    const text = `Portfolio X-Ray Summary. Your mutual fund portfolio has a ${overlap} percent overlap score. You hold ${regCount} regular plans incurring distributor commission drag. Switching to direct plans will save your long term wealth.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onend = () => {
        setSafeText('voiceBtnText', "Voice Audio Summary");
    };

    setSafeText('voiceBtnText', "Stop Audio...");
    synth.speak(utterance);
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
