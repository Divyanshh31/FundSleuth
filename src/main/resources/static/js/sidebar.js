/* ==========================================================================
   FUNDSLEUTH REUSABLE SIDEBAR COMPONENT (DESKTOP & MOBILE DRAWER)
   Unified architecture for all 12 pages with centered header branding grid
   ========================================================================== */

(function () {
    // Determine active route
    function getActiveRoute() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('funds.html')) return 'funds';
        if (path.includes('compare-funds.html')) return 'compare-funds';
        if (path.includes('compare-platforms.html')) return 'compare-platforms';
        if (path.includes('top-funds.html')) return 'top-funds';
        if (path.includes('news.html')) return 'news';
        if (path.includes('fund-finder.html')) return 'fund-finder';
        if (path.includes('login') || path.includes('signup') || path.includes('forgot')) return 'auth';
        return 'home';
    }

    // Render HTML Component into body
    function renderSidebar() {
        const route = getActiveRoute();

        // Check if sidebar panel already exists
        if (document.getElementById('sidebarPanel')) return;

        // If page has legacy navbar-custom, replace it
        const legacyNav = document.querySelector('.navbar-custom');

        const activeHome = route === 'home' ? 'active' : '';
        const activeFunds = route === 'funds' ? 'active' : '';
        const activeCompareFunds = route === 'compare-funds' ? 'active' : '';
        const activeComparePlatforms = route === 'compare-platforms' ? 'active' : '';
        const activeTopFunds = route === 'top-funds' ? 'active' : '';
        const activeNews = route === 'news' ? 'active' : '';
        const activeFinder = route === 'fund-finder' ? 'active' : '';

        const sidebarHTML = `
            <!-- Mobile Top Header (< 992px) -->
            <header class="mobile-top-header d-lg-none d-flex align-items-center justify-content-between px-3 py-2 border-bottom position-sticky top-0" id="mobileHeader">
                <button class="btn btn-taste-soft btn-sm p-2 rounded-3" id="mobileMenuToggle" aria-label="Open Navigation Drawer">
                    <i class="fa-solid fa-bars fs-5"></i>
                </button>
                <a href="index.html" class="d-flex align-items-center gap-2 text-decoration-none">
                    <div class="brand-icon-box p-1.5 rounded-3 text-white" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
                        <i class="fa-solid fa-chart-pie fs-6"></i>
                    </div>
                    <span class="fs-5 fw-extrabold gradient-text">FundSleuth</span>
                    <span class="badge bg-dark text-white rounded-pill px-2 py-0.5 font-mono x-small">v2.0 AI</span>
                </a>
                <button class="btn btn-taste-soft btn-sm p-2 rounded-circle" onclick="toggleTheme()" title="Toggle Theme">
                    <i class="fa-solid fa-moon" id="mobileThemeIcon"></i>
                </button>
            </header>

            <!-- Mobile Drawer Backdrop Overlay -->
            <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

            <!-- Left Floating Vertical Sidebar Drawer -->
            <aside class="sidebar-panel" id="sidebarPanel" aria-label="Main Navigation Sidebar">
                
                <!-- Header (3-Column Grid: Left Logo, Center Title+Badge, Right Collapse Button) -->
                <div class="sidebar-header-grid">
                    <!-- Left: Logo Box -->
                    <a href="index.html" class="sidebar-logo-box text-decoration-none" title="FundSleuth Home">
                        <div class="brand-icon-box rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm">
                            <i class="fa-solid fa-chart-pie fs-5"></i>
                        </div>
                    </a>

                    <!-- Center: Title & Badge -->
                    <div class="sidebar-center-brand text-center">
                        <a href="index.html" class="text-decoration-none d-block">
                            <span class="brand-title">FundSleuth</span>
                            <span class="brand-badge badge bg-dark text-white rounded-pill font-mono">v2.0 AI</span>
                        </a>
                    </div>

                    <!-- Right: Collapse Button -->
                    <button class="sidebar-collapse-btn d-none d-lg-flex align-items-center justify-content-center" id="sidebarCollapseBtn" title="Toggle Sidebar">
                        <i class="fa-solid fa-chevron-left" id="collapseIcon"></i>
                    </button>
                </div>

                <!-- Navigation Links -->
                <nav class="sidebar-nav py-3 px-2 flex-grow-1 overflow-y-auto">
                    <ul class="nav flex-column list-unstyled m-0" style="gap: 8px;">
                        <li class="nav-item">
                            <a class="nav-link sidebar-link ${activeHome}" href="index.html" title="Home">
                                <i class="fa-solid fa-house nav-icon"></i>
                                <span class="nav-text">Home</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link sidebar-link ${activeFunds}" href="funds.html" title="Explore Funds">
                                <i class="fa-solid fa-magnifying-glass nav-icon"></i>
                                <span class="nav-text">Explore Funds</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link sidebar-link ${activeCompareFunds}" href="compare-funds.html" title="Compare Funds">
                                <i class="fa-solid fa-code-compare nav-icon"></i>
                                <span class="nav-text">Compare Funds</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link sidebar-link ${activeComparePlatforms}" href="compare-platforms.html" title="Compare Platforms">
                                <i class="fa-solid fa-layer-group nav-icon"></i>
                                <span class="nav-text">Compare Platforms</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link sidebar-link ${activeTopFunds}" href="top-funds.html" title="Top Research">
                                <i class="fa-solid fa-award nav-icon"></i>
                                <span class="nav-text">Top Research</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link sidebar-link ${activeNews}" href="news.html" title="News">
                                <i class="fa-solid fa-newspaper nav-icon"></i>
                                <span class="nav-text">News</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link sidebar-link ${activeFinder}" href="fund-finder.html" title="Fund Finder">
                                <i class="fa-solid fa-compass nav-icon"></i>
                                <span class="nav-text">Fund Finder</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                <!-- Bottom Controls & CTA Section -->
                <div class="sidebar-footer p-3 border-top d-flex flex-column gap-2">
                    
                    <!-- Dark Mode Toggle Switch Row -->
                    <div class="sidebar-control-row d-flex align-items-center justify-content-between px-3 py-2 rounded-3" onclick="toggleTheme()" id="themeToggleRow" title="Toggle Dark/Light Mode">
                        <div class="d-flex align-items-center gap-2.5">
                            <i class="fa-solid fa-moon text-primary nav-icon" id="themeToggleIcon"></i>
                            <span class="small font-semibold text-secondary nav-text">Dark Mode</span>
                        </div>
                        <div class="form-check form-switch m-0 pointer-events-none">
                            <input class="form-check-input" type="checkbox" id="themeSwitchCheckbox" role="switch" onclick="event.stopPropagation();">
                        </div>
                    </div>

                    <!-- Audio Overview Control Row -->
                    <div class="sidebar-control-row d-flex align-items-center justify-content-between px-3 py-2 rounded-3" onclick="toggleVoiceSummary()" id="audioToggleRow" title="Toggle Audio Voice Summary">
                        <div class="d-flex align-items-center gap-2.5">
                            <i class="fa-solid fa-volume-high orange-highlight nav-icon"></i>
                            <span class="small font-semibold text-secondary nav-text">Audio Overview</span>
                        </div>
                        <span class="badge bg-secondary bg-opacity-10 text-secondary rounded-pill font-mono x-small nav-text" id="voiceBtnText">OFF</span>
                    </div>

                    <!-- Compact Account Card -->
                    <div class="sidebar-account-card p-2.5 rounded-3 border d-flex align-items-center justify-content-between" id="sidebarAccountCard">
                        <div class="d-flex align-items-center gap-2.5 overflow-hidden">
                            <div class="avatar-circle rounded-circle bg-dark text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 34px; height: 34px; font-size: 13px;">
                                <i class="fa-solid fa-user" id="accountAvatarIcon"></i>
                            </div>
                            <div class="account-info overflow-hidden nav-text">
                                <div class="fw-bold small text-dark text-truncate" id="sidebarAccountName" style="white-space: nowrap;">Google Investor</div>
                                <div class="x-small text-success font-mono d-flex align-items-center gap-1" id="sidebarAccountStatus">
                                    <span class="online-indicator"></span> Signed in
                                </div>
                            </div>
                        </div>
                        <a href="login.html" class="btn btn-link text-muted p-1 rounded-circle hover-bg-subtle nav-text" id="navAuthBtn" title="Account Action">
                            <span id="navAuthText"><i class="fa-solid fa-right-from-bracket small"></i></span>
                        </a>
                    </div>

                    <!-- Launch X-Ray Primary CTA Button -->
                    <a href="index.html#xray-tool-section" class="btn btn-taste-primary w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 btn-xray-cta shadow-sm">
                        <i class="fa-solid fa-bolt orange-highlight"></i>
                        <span class="nav-text">Launch X-Ray</span>
                    </a>

                </div>
            </aside>
        `;

        // Inject sidebar HTML at top of <body>
        if (legacyNav) {
            legacyNav.insertAdjacentHTML('beforebegin', sidebarHTML);
            legacyNav.remove();
        } else {
            document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
        }

        // Initialize event handlers & initial states
        setupSidebarEvents();
        syncSidebarThemeState();
    }

    function setupSidebarEvents() {
        const panel = document.getElementById('sidebarPanel');
        const backdrop = document.getElementById('sidebarBackdrop');
        const collapseBtn = document.getElementById('sidebarCollapseBtn');
        const collapseIcon = document.getElementById('collapseIcon');
        const mobileToggle = document.getElementById('mobileMenuToggle');

        // Check stored desktop collapsed preference
        const isCollapsed = localStorage.getItem('fundsleuth-sidebar-collapsed') === 'true';
        if (isCollapsed && window.innerWidth >= 992 && panel) {
            panel.classList.add('collapsed');
            document.body.classList.add('sidebar-collapsed');
            if (collapseIcon) collapseIcon.className = 'fa-solid fa-chevron-right';
        }

        // Desktop Collapse Button Handler
        if (collapseBtn) {
            collapseBtn.addEventListener('click', () => {
                const nowCollapsed = panel.classList.toggle('collapsed');
                document.body.classList.toggle('sidebar-collapsed', nowCollapsed);
                localStorage.setItem('fundsleuth-sidebar-collapsed', nowCollapsed ? 'true' : 'false');
                if (collapseIcon) {
                    collapseIcon.className = nowCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
                }
            });
        }

        // Mobile Menu Drawer Handler
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                panel.classList.add('show-mobile');
                backdrop.classList.add('show-mobile');
                document.body.style.overflow = 'hidden';
            });
        }

        // Close mobile drawer on backdrop click
        if (backdrop) {
            backdrop.addEventListener('click', closeMobileDrawer);
        }

        // Close mobile drawer on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMobileDrawer();
        });

        function closeMobileDrawer() {
            if (panel) panel.classList.remove('show-mobile');
            if (backdrop) backdrop.classList.remove('show-mobile');
            document.body.style.overflow = '';
        }
    }

    function syncSidebarThemeState() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        const checkbox = document.getElementById('themeSwitchCheckbox');
        if (checkbox) checkbox.checked = (theme === 'dark');
    }

    window.syncSidebarThemeState = syncSidebarThemeState;

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSidebar);
    } else {
        renderSidebar();
    }
})();
