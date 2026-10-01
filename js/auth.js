/* ==========================================================================
   FUNDSLEUTH AUTHENTICATION SERVICE CONTROLLER (MODULAR AUTH ABSTRACTION)
   Handles session management, validation, login, signup, password reset,
   and dynamic navbar state updates.
   ========================================================================== */

const AuthManager = {
    // Retrieve current logged in user from localStorage
    getUser() {
        try {
            const raw = localStorage.getItem('fundsleuth_user');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            console.error('Error reading user session:', e);
            return null;
        }
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.getUser();
    },

    // Set user session
    setUser(user) {
        localStorage.setItem('fundsleuth_user', JSON.stringify(user));
        this.updateNavUI();
    },

    // Clear session
    logout() {
        localStorage.removeItem('fundsleuth_user');
        this.updateNavUI();
        if (typeof showToast === 'function') {
            showToast('Logged out successfully.', 'info');
        }
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 500);
    },

    // Check route authorization state
    checkRouteGuard() {
        const path = window.location.pathname.toLowerCase();
        const isAuthPage = path.includes('login') || path.includes('signup') || path.includes('forgot-password');
        const user = this.getUser();

        // 1. If unauthenticated user tries to view home/app pages -> redirect to login.html
        if (!user && !isAuthPage) {
            window.location.href = 'login.html';
            return;
        }

        // 2. If authenticated user tries to view login/signup -> redirect to index.html
        if (user && isAuthPage && !path.includes('forgot-password')) {
            window.location.href = 'index.html';
            return;
        }
    },

    // Update Navbar UI across pages based on auth state
    updateNavUI() {
        const navAuthBtn = document.getElementById('navAuthBtn');
        const navAuthText = document.getElementById('navAuthText');
        const user = this.getUser();

        if (!navAuthBtn) return;

        if (user) {
            const displayName = user.name || user.email.split('@')[0];
            navAuthBtn.href = '#';
            navAuthBtn.onclick = (e) => {
                e.preventDefault();
                this.logout();
            };
            if (navAuthText) {
                navAuthText.innerHTML = `<i class="fa-solid fa-circle-user text-success me-1"></i> ${displayName} (Sign Out)`;
            }
        } else {
            navAuthBtn.href = 'login.html';
            navAuthBtn.onclick = null;
            if (navAuthText) {
                navAuthText.innerHTML = '<i class="fa-solid fa-right-to-bracket text-primary me-1"></i> Sign In';
            }
        }
    },

    // Validate email format
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    },

    // Login action handler
    async login(email, password) {
        if (!email || !password) {
            throw new Error('Please enter both email and password.');
        }
        if (!this.isValidEmail(email)) {
            throw new Error('Please enter a valid email address.');
        }
        if (password.length < 4) {
            throw new Error('Password must be at least 4 characters long.');
        }

        // Simulate backend authentication response (or connect to backend provider)
        await new Promise(resolve => setTimeout(resolve, 1000));

        const user = {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            email: email.trim(),
            name: email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()),
            loginTime: new Date().toISOString()
        };

        this.setUser(user);
        return user;
    },

    // Signup action handler
    async signup(fullName, email, password, confirmPassword, termsAgreed) {
        if (!fullName || !email || !password || !confirmPassword) {
            throw new Error('Please fill in all required fields.');
        }
        if (!this.isValidEmail(email)) {
            throw new Error('Please enter a valid email address.');
        }
        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match.');
        }
        if (!termsAgreed) {
            throw new Error('You must accept the Terms of Service & Privacy Policy.');
        }

        // Simulate registration API call
        await new Promise(resolve => setTimeout(resolve, 1200));

        const user = {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            email: email.trim(),
            name: fullName.trim(),
            loginTime: new Date().toISOString()
        };

        this.setUser(user);
        return user;
    },

    // Forgot password handler
    async forgotPassword(email) {
        if (!email) {
            throw new Error('Please enter your email address.');
        }
        if (!this.isValidEmail(email)) {
            throw new Error('Please enter a valid email address.');
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    },

    // Social login simulation (Google)
    async loginWithGoogle() {
        await new Promise(resolve => setTimeout(resolve, 1200));
        const user = {
            id: 'goog_' + Math.random().toString(36).substring(2, 9),
            email: 'user.google@fundsleuth.ai',
            name: 'Google Investor',
            loginTime: new Date().toISOString(),
            provider: 'google'
        };
        this.setUser(user);
        return user;
    }
};

// GLOBAL THEME CONTROLLER
function initTheme() {
    const savedTheme = localStorage.getItem('fundsleuth-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fundsleuth-theme', theme);

    const btnText = document.getElementById('themeToggleText');
    const btnIcon = document.getElementById('themeToggleIcon');

    if (theme === 'dark') {
        if (btnText) btnText.innerText = 'Light';
        if (btnIcon) btnIcon.className = 'fa-solid fa-sun orange-highlight';
    } else {
        if (btnText) btnText.innerText = 'Dark';
        if (btnIcon) btnIcon.className = 'fa-solid fa-moon';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Immediately set attribute on parse to avoid flash
initTheme();

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    AuthManager.checkRouteGuard();
    AuthManager.updateNavUI();
});
