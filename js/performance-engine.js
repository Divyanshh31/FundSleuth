/* ==========================================================================
   FUNDSLEUTH AUTOMATIC ADAPTIVE LITE MODE & DEVICE CAPABILITY ENGINE
   Guarantees 100% app usability on budget phones, weak GPUs, and 2G/3G networks.
   ========================================================================== */

(function () {
    class DeviceCapabilityDetector {
        static checkWebGLSupport() {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
            } catch (e) {
                return false;
            }
        }

        static checkWebGL2Support() {
            try {
                const canvas = document.createElement('canvas');
                return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
            } catch (e) {
                return false;
            }
        }

        static getDeviceMemory() {
            return navigator.deviceMemory || 4; // Default assumption 4GB if unsupported
        }

        static getHardwareConcurrency() {
            return navigator.hardwareConcurrency || 4; // Default assumption 4 cores
        }

        static getNetworkQuality() {
            if (navigator.connection) {
                const conn = navigator.connection;
                return {
                    effectiveType: conn.effectiveType || '4g',
                    saveData: !!conn.saveData,
                    downlink: conn.downlink || 10
                };
            }
            return { effectiveType: '4g', saveData: false, downlink: 10 };
        }

        static prefersReducedMotion() {
            return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }

        static calculateCapabilityScore() {
            let score = 100;

            const hasWebGL = this.checkWebGLSupport();
            const hasWebGL2 = this.checkWebGL2Support();
            const memory = this.getDeviceMemory();
            const cores = this.getHardwareConcurrency();
            const network = this.getNetworkQuality();
            const reducedMotion = this.prefersReducedMotion();

            if (!hasWebGL) score -= 50;
            else if (!hasWebGL2) score -= 15;

            if (memory <= 2) score -= 30;
            else if (memory < 4) score -= 15;

            if (cores <= 2) score -= 20;
            else if (cores < 4) score -= 10;

            if (network.saveData) score -= 25;
            if (network.effectiveType === '2g' || network.effectiveType === 'slow-2g') score -= 35;
            else if (network.effectiveType === '3g') score -= 20;

            if (reducedMotion) score -= 30;

            // Check previous crash memory
            const crashCount = parseInt(localStorage.getItem('fundsleuth_render_crashes') || '0');
            if (crashCount > 0) score -= (crashCount * 25);

            return Math.max(0, Math.min(100, score));
        }
    }

    class PerformanceEngine {
        constructor() {
            this.mode = localStorage.getItem('fundsleuth_pref_performance_mode') || 'AUTO';
            this.activeMode = 'FULL'; // 'FULL' or 'LITE'
            this.score = DeviceCapabilityDetector.calculateCapabilityScore();
            this.init();
        }

        init() {
            this.evaluateActiveMode();
            this.applyPerformanceMode();
            this.setupCrashGuard();
            this.setupNetworkListener();
        }

        evaluateActiveMode() {
            if (this.mode === 'FULL') {
                this.activeMode = 'FULL';
            } else if (this.mode === 'LITE') {
                this.activeMode = 'LITE';
            } else {
                // AUTO Mode
                this.activeMode = (this.score < 45) ? 'LITE' : 'FULL';
            }
        }

        applyPerformanceMode() {
            const isLite = (this.activeMode === 'LITE');
            document.documentElement.setAttribute('data-performance-mode', this.activeMode.toLowerCase());

            if (isLite) {
                document.body.classList.add('low-bandwidth-mode');
                document.body.classList.add('lite-performance');
                
                // Hide heavy canvas if present
                const canvas = document.getElementById('hero-canvas');
                if (canvas) canvas.style.display = 'none';

                const noise = document.querySelector('.noise-overlay');
                if (noise) noise.style.display = 'none';

                // Stop Three.js animation loops if running
                if (window.stopCanvasAnimation) window.stopCanvasAnimation();
            } else {
                document.body.classList.remove('low-bandwidth-mode');
                document.body.classList.remove('lite-performance');

                const canvas = document.getElementById('hero-canvas');
                if (canvas) canvas.style.display = 'block';

                const noise = document.querySelector('.noise-overlay');
                if (noise) noise.style.display = 'block';

                if (window.startCanvasAnimation) window.startCanvasAnimation();
            }

            this.updateUIBadges();
        }

        setMode(newMode) {
            if (!['AUTO', 'FULL', 'LITE'].includes(newMode)) return;
            this.mode = newMode;
            localStorage.setItem('fundsleuth_pref_performance_mode', newMode);
            this.evaluateActiveMode();
            this.applyPerformanceMode();

            if (window.showToast) {
                const label = newMode === 'AUTO' ? `AUTO (${this.activeMode} Mode Active)` : `${newMode} Mode`;
                window.showToast(`Performance mode set to ${label}`, 'info');
            }
        }

        updateUIBadges() {
            const badge = document.getElementById('performanceModeBadge');
            if (badge) {
                if (this.mode === 'AUTO') {
                    badge.innerText = `⚡ AUTO (${this.activeMode})`;
                    badge.className = 'badge bg-primary text-white font-mono rounded-pill';
                } else if (this.activeMode === 'LITE') {
                    badge.innerText = '⚡ LITE MODE';
                    badge.className = 'badge bg-warning text-dark font-mono rounded-pill';
                } else {
                    badge.innerText = '✨ FULL MODE';
                    badge.className = 'badge bg-success text-white font-mono rounded-pill';
                }
            }
        }

        setupCrashGuard() {
            window.addEventListener('error', (e) => {
                if (e.message && (e.message.includes('WebGL') || e.message.includes('THREE') || e.message.includes('out of memory'))) {
                    console.warn('[PerformanceEngine] WebGL/Graphics crash detected. Automatically downgrading to LITE mode.');
                    const crashes = parseInt(localStorage.getItem('fundsleuth_render_crashes') || '0') + 1;
                    localStorage.setItem('fundsleuth_render_crashes', crashes.toString());
                    this.setMode('LITE');
                }
            });
        }

        setupNetworkListener() {
            if (navigator.connection) {
                navigator.connection.addEventListener('change', () => {
                    this.score = DeviceCapabilityDetector.calculateCapabilityScore();
                    if (this.mode === 'AUTO') {
                        this.evaluateActiveMode();
                        this.applyPerformanceMode();
                    }
                });
            }
        }
    }

    // Initialize globally on load
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceEngine = new PerformanceEngine();
    });
})();
