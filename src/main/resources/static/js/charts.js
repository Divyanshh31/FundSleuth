/* ==========================================================================
   NIVESHRAKSHAK X-RAY - FINANCIAL CHARTS & VISUALIZATION ENGINE
   ========================================================================== */

let sectorChartInstance = null;
let compoundingChartInstance = null;

/**
 * Render Sector Allocation Donut/Bar Chart
 */
function renderSectorChart(stocks) {
    const ctx = document.getElementById('sectorChart');
    if (!ctx) return;

    // Aggregate holdings by sector
    const sectorWeights = {};
    stocks.forEach(stock => {
        const sector = stock.sector || 'Uncategorized';
        sectorWeights[sector] = (sectorWeights[sector] || 0) + (stock.weightPercentage || 5.0);
    });

    const labels = Object.keys(sectorWeights);
    const data = Object.values(sectorWeights);

    if (sectorChartInstance) {
        sectorChartInstance.destroy();
    }

    const colorPalette = [
        '#4F46E5', '#2563EB', '#0D9488', '#7C3AED', 
        '#F59E0B', '#EC4899', '#6366F1', '#14B8A6'
    ];

    sectorChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colorPalette.slice(0, labels.length),
                borderWidth: 2,
                borderColor: '#FFFFFF',
                hoverOffset: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        font: { family: 'Plus Jakarta Sans', size: 12 },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: '#0F172A',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: function(context) {
                            return ` ${context.label}: ${context.raw.toFixed(1)}% Weight`;
                        }
                    }
                }
            },
            cutout: '70%',
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1000
            }
        }
    });
}

/**
 * Render 10-Year Compounding Expense Drag & Direct Plan Savings Area Chart
 */
function renderCompoundingChart(initialInvestment, assumedReturnRate, regularExpenseRatio, directExpenseRatio) {
    const ctx = document.getElementById('compoundingChart');
    if (!ctx) return;

    const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const r = assumedReturnRate / 100.0;
    const regFee = regularExpenseRatio / 100.0;
    const dirFee = directExpenseRatio / 100.0;

    const grossValue = [];
    const directPlanValue = [];
    const regularPlanValue = [];

    years.forEach(year => {
        grossValue.push(Math.round(initialInvestment * Math.pow(1 + r, year)));
        directPlanValue.push(Math.round(initialInvestment * Math.pow(1 + (r - dirFee), year)));
        regularPlanValue.push(Math.round(initialInvestment * Math.pow(1 + (r - regFee), year)));
    });

    if (compoundingChartInstance) {
        compoundingChartInstance.destroy();
    }

    compoundingChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years.map(y => `Year ${y}`),
            datasets: [
                {
                    label: 'Gross Portfolio Growth (0% Fee)',
                    data: grossValue,
                    borderColor: '#94A3B8',
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false,
                    tension: 0.3
                },
                {
                    label: 'Direct Plan Growth',
                    data: directPlanValue,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.35
                },
                {
                    label: 'Regular Plan Growth (Commission Drag)',
                    data: regularPlanValue,
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.35
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        font: { family: 'Plus Jakarta Sans', size: 12 }
                    }
                },
                tooltip: {
                    backgroundColor: '#0F172A',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return ` ${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    grid: { color: '#F1F5F9' },
                    ticks: {
                        callback: function(value) {
                            return '₹' + (value / 1000).toFixed(0) + 'k';
                        }
                    }
                }
            }
        }
    });
}
