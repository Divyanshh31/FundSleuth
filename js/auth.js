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
            if (window.location.pathname.includes('login') || window.location.pathname.includes('signup')) {
                window.location.href = 'index.html';
            } else {
                window.location.reload();
            }
        }, 800);
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

document.addEventListener('DOMContentLoaded', () => {
    AuthManager.updateNavUI();
});
