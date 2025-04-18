// User Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is logged in
        const token = localStorage.getItem('authToken');
        if (token) {
            this.validateToken(token);
        }

        // Setup event listeners
        document.getElementById('logoutBtn')?.addEventListener('click', (e) => this.handleLogout(e));
        document.getElementById('userMenu')?.addEventListener('click', () => {
            document.getElementById('userDropdown')?.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#userMenu')) {
                document.getElementById('userDropdown')?.classList.add('hidden');
            }
        });
    }

    async validateToken(token) {
        try {
            const response = await fetch('/api/auth/validate', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const userData = await response.json();
                this.setCurrentUser(userData);
            } else {
                this.handleLogout();
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            this.handleLogout();
        }
    }

    setCurrentUser(userData) {
        this.currentUser = userData;
        document.getElementById('userName').textContent = userData.name;
        this.updateUIForRole(userData.role);
    }

    updateUIForRole(role) {
        // Hide/show elements based on user role
        const adminElements = document.querySelectorAll('.admin-only');
        const teacherElements = document.querySelectorAll('.teacher-only');
        const coordinatorElements = document.querySelectorAll('.coordinator-only');

        adminElements.forEach(el => el.style.display = role === 'admin' ? '' : 'none');
        teacherElements.forEach(el => el.style.display = ['admin', 'teacher'].includes(role) ? '' : 'none');
        coordinatorElements.forEach(el => el.style.display = ['admin', 'coordinator'].includes(role) ? '' : 'none');
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const { token, user } = await response.json();
                localStorage.setItem('authToken', token);
                this.setCurrentUser(user);
                window.location.href = '/index.html';
            } else {
                const error = await response.json();
                this.showError(error.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            this.showError('Login failed. Please try again.');
        }
    }

    async handleRegistration(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            role: document.getElementById('role').value
        };

        if (formData.password !== formData.confirmPassword) {
            this.showError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                window.location.href = '/auth/login.html?registered=true';
            } else {
                const error = await response.json();
                this.showError(error.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            this.showError('Registration failed. Please try again.');
        }
    }

    handleLogout(e) {
        e?.preventDefault();
        localStorage.removeItem('authToken');
        this.currentUser = null;
        window.location.href = '/auth/login.html';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative';
        errorDiv.role = 'alert';
        errorDiv.textContent = message;

        const container = document.querySelector('.auth-container');
        container.insertBefore(errorDiv, container.firstChild);

        setTimeout(() => errorDiv.remove(), 5000);
    }
}
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        this.initializeEventListeners();
    }

    // Initialize Event Listeners
    initializeEventListeners() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const forgotPassword = document.getElementById('forgotPassword');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegistration(e));
        }

        if (forgotPassword) {
            forgotPassword.addEventListener('click', (e) => this.handleForgotPassword(e));
        }
    }

    // Handle Login
    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const hashedPassword = await this.hashPassword(password);
            const user = this.users.find(u => u.email === email && u.password === hashedPassword);

            if (user) {
                this.currentUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.showNotification('Login successful!', 'success');
                this.redirectBasedOnRole(user.role);
            } else {
                this.showNotification('Invalid email or password', 'error');
            }
        } catch (error) {
            this.showNotification('An error occurred during login', 'error');
        }
    }

    // Handle Registration
    async handleRegistration(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.getElementById('role').value;

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        try {
            if (this.users.some(u => u.email === email)) {
                this.showNotification('Email already registered', 'error');
                return;
            }

            const hashedPassword = await this.hashPassword(password);
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password: hashedPassword,
                role,
                createdAt: new Date().toISOString()
            };

            this.users.push(newUser);
            localStorage.setItem('users', JSON.stringify(this.users));
            this.showNotification('Registration successful!', 'success');
            window.location.href = 'login.html';
        } catch (error) {
            this.showNotification('An error occurred during registration', 'error');
        }
    }

    // Handle Forgot Password
    handleForgotPassword(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;

        if (!email) {
            this.showNotification('Please enter your email address', 'error');
            return;
        }

        // In a real application, this would send a password reset email
        this.showNotification('Password reset link sent to your email', 'success');
    }

    // Hash Password (in a real application, use a proper hashing library)
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // Role-based Access Control
    redirectBasedOnRole(role) {
        switch (role) {
            case 'admin':
                window.location.href = '../admin/dashboard.html';
                break;
            case 'teacher':
                window.location.href = '../teacher/dashboard.html';
                break;
            case 'coordinator':
                window.location.href = '../coordinator/dashboard.html';
                break;
            default:
                window.location.href = '../index.html';
        }
    }

    // Check User Authorization
    checkAuthorization(requiredRole) {
        if (!this.currentUser) {
            window.location.href = '../auth/login.html';
            return false;
        }

        const roleHierarchy = {
            admin: 3,
            coordinator: 2,
            teacher: 1
        };

        if (roleHierarchy[this.currentUser.role] < roleHierarchy[requiredRole]) {
            this.showNotification('Unauthorized access', 'error');
            window.location.href = '../index.html';
            return false;
        }

        return true;
    }

    // Show Notification
    showNotification(message, type = 'error') {
        const alert = document.getElementById('alert');
        const alertMessage = document.getElementById('alertMessage');
        
        alert.className = `fixed top-4 right-4 ${type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded relative`;
        alertMessage.textContent = message;
        alert.classList.remove('hidden');
        
        setTimeout(() => {
            alert.classList.add('hidden');
        }, 3000);
    }

    // Logout
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = '../auth/login.html';
    }
}

// Initialize Authentication System
const auth = new AuthSystem();

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('../sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
