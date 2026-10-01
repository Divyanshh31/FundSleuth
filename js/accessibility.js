/* ==========================================================================
   FUNDSLEUTH UNIVERSAL ACCESSIBILITY TOOLBAR & PERFORMANCE MODES
   Supports Low Bandwidth Mode (Lite Mode), Simple Jargon-Free Mode,
   and Bharat-first accessibility controls across all pages.
   ========================================================================== */

const AccessibilityManager = {
    isLowBandwidth: localStorage.getItem('fundsleuth_low_bandwidth') === 'true',
    isSimpleMode: localStorage.getItem('fundsleuth_simple_mode') === 'true',

    // Toggle Low Bandwidth Mode
    toggleLowBandwidth() {
        this.isLowBandwidth = !this.isLowBandwidth;
        localStorage.setItem('fundsleuth_low_bandwidth', this.isLowBandwidth ? 'true' : 'false');
        this.applyLowBandwidth();

        if (typeof showToast === 'function') {
            showToast(this.isLowBandwidth ? "⚡ Low Bandwidth Mode ON (3D visuals disabled)" : "Low Bandwidth Mode OFF", "info");
        }
    },

    // Apply Low Bandwidth Rules
    applyLowBandwidth() {
        const canvas = document.getElementById('hero-canvas');
        const noise = document.querySelector('.noise-overlay');
        const btn = document.getElementById('liteModeBtn');
        const badge = document.getElementById('liteModeBadge');

        if (this.isLowBandwidth) {
            document.body.classList.add('low-bandwidth-mode');
            if (canvas) canvas.style.display = 'none';
            if (noise) noise.style.display = 'none';
            if (btn) btn.classList.add('active', 'bg-warning', 'text-dark');
            if (badge) badge.classList.remove('d-none');
        } else {
            document.body.classList.remove('low-bandwidth-mode');
            if (canvas) canvas.style.display = 'block';
            if (noise) noise.style.display = 'block';
            if (btn) btn.classList.remove('active', 'bg-warning', 'text-dark');
            if (badge) badge.classList.add('d-none');
        }
    },

    // Toggle Simple Mode (Beginner Jargon-Free Explanations)
    toggleSimpleMode() {
        this.isSimpleMode = !this.isSimpleMode;
        localStorage.setItem('fundsleuth_simple_mode', this.isSimpleMode ? 'true' : 'false');
        this.applySimpleMode();

        if (typeof showToast === 'function') {
            showToast(this.isSimpleMode ? "Aa Simple Mode ON (Beginner explanations active)" : "Simple Mode OFF", "info");
        }
    },

    // Apply Simple Mode Rules
    applySimpleMode() {
        const btn = document.getElementById('simpleModeBtn');
        if (this.isSimpleMode) {
            document.body.classList.add('simple-mode-active');
            if (btn) btn.classList.add('active', 'bg-primary', 'text-white');
        } else {
            document.body.classList.remove('simple-mode-active');
            if (btn) btn.classList.remove('active', 'bg-primary', 'text-white');
        }

        // Simplify metric texts across active page
        const simpleTargets = document.querySelectorAll('[data-simple-text]');
        simpleTargets.forEach(el => {
            const defaultText = el.getAttribute('data-default-text') || el.innerText;
            if (!el.getAttribute('data-default-text')) el.setAttribute('data-default-text', defaultText);

            if (this.isSimpleMode) {
                el.innerText = el.getAttribute('data-simple-text');
            } else {
                el.innerText = defaultText;
            }
        });
    },

    // Inject Universal Floating Accessibility Bar
    renderToolbarHTML() {
        if (document.getElementById('accessibilityBar')) return;

        const currentLangObj = I18nEngine.languages.find(l => l.code === I18nEngine.currentLang) || I18nEngine.languages[0];

        const barHTML = `
            <div id="accessibilityBar" class="position-fixed bottom-0 start-50 translate-middle-x mb-3 px-3 py-2 rounded-pill shadow-lg bg-glass border d-flex align-items-center gap-2" style="z-index: 1080; max-width: 90vw; backdrop-filter: blur(20px);">
                
                <!-- 1. Language Selector -->
                <div class="dropdown">
                    <button class="btn btn-taste-soft btn-xs rounded-pill px-3 py-1 font-semibold d-flex align-items-center gap-1 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="barLangBtn">
                        <span>🌐 ${currentLangObj.native}</span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-start shadow-lg border-0 rounded-4 py-2" style="max-height: 300px; overflow-y: auto;">
                        ${I18nEngine.languages.map(l => `
                            <li>
                                <button class="dropdown-item px-3 py-1.5 small ${l.code === I18nEngine.currentLang ? 'active font-bold' : ''}" onclick="I18nEngine.setLanguage('${l.code}')">
                                    ${l.native} <span class="x-small text-muted font-mono ms-2">(${l.name})</span>
                                </button>
                            </li>
                        `).join('')}
                    </ul>
                </div>

                <div class="vr mx-1 opacity-25"></div>

                <!-- 2. Voice Toggle Button -->
                <button class="btn btn-taste-soft btn-xs rounded-pill px-2.5 py-1 font-semibold d-flex align-items-center gap-1" onclick="toggleVoiceSummary()" title="Listen to Portfolio Summary">
                    <i class="fa-solid fa-volume-high orange-highlight"></i>
                    <span class="d-none d-sm-inline">Voice</span>
                </button>

                <!-- 3. Simple Mode Button -->
                <button class="btn btn-taste-soft btn-xs rounded-pill px-2.5 py-1 font-semibold d-flex align-items-center gap-1" id="simpleModeBtn" onclick="AccessibilityManager.toggleSimpleMode()" title="Toggle Jargon-Free Beginner Mode">
                    <span class="fw-bold font-serif">Aa</span>
                    <span class="d-none d-sm-inline">Simple</span>
                </button>

                <!-- 4. Low Bandwidth Lite Button -->
                <button class="btn btn-taste-soft btn-xs rounded-pill px-2.5 py-1 font-semibold d-flex align-items-center gap-1" id="liteModeBtn" onclick="AccessibilityManager.toggleLowBandwidth()" title="Toggle Low Bandwidth Lite Mode">
                    <i class="fa-solid fa-bolt orange-highlight"></i>
                    <span class="d-none d-sm-inline">Lite Mode</span>
                </button>

                <!-- Low Bandwidth Indicator Badge -->
                <span class="badge bg-warning text-dark font-mono x-small rounded-pill d-none" id="liteModeBadge">⚡ LITE ON</span>

            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', barHTML);
        this.applyLowBandwidth();
        this.applySimpleMode();
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    AccessibilityManager.renderToolbarHTML();
});
