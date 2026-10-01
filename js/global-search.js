/* ==========================================================================
   FUNDSLEUTH GLOBAL SEARCH & AUTOCOMPLETE CONTROLLER (js/global-search.js)
   Supports instant live search across funds, AMCs, categories, ISINs, and platforms
   with keyboard navigation (Up, Down, Enter, Esc) and user search history tracking.
   ========================================================================== */

const GlobalSearch = {
    selectedIndex: -1,

    init() {
        const inputs = document.querySelectorAll('.global-search-input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleTyping(e.target));
            input.addEventListener('keydown', (e) => this.handleKeydown(e, e.target));
            input.addEventListener('focus', (e) => this.handleTyping(e.target));
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.global-search-container')) {
                this.closeAllDropdowns();
            }
        });
    },

    handleTyping(input) {
        const query = input.value.trim();
        const container = input.closest('.global-search-container');
        if (!container) return;

        let dropdown = container.querySelector('.global-search-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'global-search-dropdown card card-custom shadow-lg position-absolute w-100 mt-1 p-2 border overflow-hidden backdrop-blur';
            dropdown.style.zIndex = '1080';
            dropdown.style.maxHeight = '420px';
            dropdown.style.overflowY = 'auto';
            container.appendChild(dropdown);
        }

        if (query.length === 0) {
            // Show User Recent Searches if logged in
            const user = window.AuthManager ? window.AuthManager.getUser() : null;
            const recent = user && window.FundDB ? window.FundDB.getUserSearches(user.id) : [];
            const t = (k, fb) => (window.I18nEngine ? window.I18nEngine.t(k) : fb);

            if (recent.length > 0) {
                dropdown.innerHTML = `
                    <div class="px-3 py-2 small text-muted font-mono fw-bold text-uppercase border-bottom">${t('recentSearches', 'Recent Searches')}</div>
                    <div class="list-group list-group-flush">
                        ${recent.map(item => `
                            <a href="funds.html?search=${encodeURIComponent(item.query)}" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-2 border-0 rounded-2">
                                <span class="small text-dark"><i class="fa-solid fa-clock-rotate-left text-muted me-2"></i> ${item.query}</span>
                                <span class="badge bg-light text-secondary border font-mono small">Recent</span>
                            </a>
                        `).join('')}
                    </div>
                `;
                dropdown.style.display = 'block';
            } else {
                dropdown.style.display = 'none';
            }
            return;
        }

        // Search Funds and Platforms
        const funds = window.FundDB ? window.FundDB.searchFunds(query).slice(0, 5) : [];
        const platforms = window.FundDB ? (window.FundDB.platforms || []).filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2) : [];
        const t = (k, fb, opts) => (window.I18nEngine ? window.I18nEngine.t(k, opts) : fb);

        if (funds.length === 0 && platforms.length === 0) {
            dropdown.innerHTML = `
                <div class="p-3 text-center text-muted small">
                    <i class="fa-solid fa-magnifying-glass me-1"></i> ${t('noSearchResults', `No matching funds or platforms found for "${query}".`, { query })}
                </div>
            `;
            dropdown.style.display = 'block';
            return;
        }

        let html = '';

        if (funds.length > 0) {
            html += `<div class="px-3 py-1 small text-muted font-mono fw-bold text-uppercase border-bottom">${t('navFunds', 'Mutual Funds')}</div><div class="list-group list-group-flush mb-2">`;
            funds.forEach(f => {
                html += `
                    <a href="fund-detail.html?id=${f.id}" class="list-group-item list-group-item-action border-0 rounded-2 py-2 px-3 search-result-item" onclick="GlobalSearch.recordSearch('${query}')">
                        <div class="d-flex justify-content-between align-items-center mb-1">
                            <span class="fw-bold text-dark small">${f.schemeName}</span>
                            <span class="badge bg-light text-primary border font-mono small">${f.subCategory}</span>
                        </div>
                        <div class="d-flex justify-content-between small text-secondary">
                            <span>${f.amc} • Expense: ${f.expenseRatio}%</span>
                            <span class="fw-bold text-success">3Y: +${f.return3Y}%</span>
                        </div>
                    </a>
                `;
            });
            html += `</div>`;
        }

        if (platforms.length > 0) {
            html += `<div class="px-3 py-1 small text-muted font-mono fw-bold text-uppercase border-bottom border-top">${t('platformsHeader', 'Platforms')}</div><div class="list-group list-group-flush">`;
            platforms.forEach(p => {
                html += `
                    <a href="compare-platforms.html" class="list-group-item list-group-item-action border-0 rounded-2 py-2 px-3 search-result-item">
                        <div class="d-flex align-items-center justify-content-between">
                            <span class="fw-bold text-dark small"><i class="fa-solid fa-wallet text-primary me-2"></i> ${p.name}</span>
                            <span class="badge bg-success-subtle text-success border rounded-pill small">${p.platformFee}</span>
                        </div>
                    </a>
                `;
            });
            html += `</div>`;
        }

        dropdown.innerHTML = html;
        dropdown.style.display = 'block';
    },

    handleKeydown(e, input) {
        const container = input.closest('.global-search-container');
        if (!container) return;
        const dropdown = container.querySelector('.global-search-dropdown');
        if (!dropdown || dropdown.style.display === 'none') return;

        const items = dropdown.querySelectorAll('.search-result-item');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
            this.highlightItem(items);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
            this.highlightItem(items);
        } else if (e.key === 'Enter') {
            if (this.selectedIndex >= 0 && items[this.selectedIndex]) {
                e.preventDefault();
                items[this.selectedIndex].click();
            }
        } else if (e.key === 'Escape') {
            this.closeAllDropdowns();
        }
    },

    highlightItem(items) {
        items.forEach((item, idx) => {
            if (idx === this.selectedIndex) {
                item.classList.add('bg-light', 'border-primary');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('bg-light', 'border-primary');
            }
        });
    },

    recordSearch(query) {
        const user = window.AuthManager ? window.AuthManager.getUser() : null;
        if (user && window.FundDB) {
            window.FundDB.saveUserSearch(user.id, query);
        }
    },

    closeAllDropdowns() {
        document.querySelectorAll('.global-search-dropdown').forEach(d => d.style.display = 'none');
        this.selectedIndex = -1;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    GlobalSearch.init();
});
