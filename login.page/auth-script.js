// ClinIQ Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('ClinIQ Authentication System Loading...');

    // Initialize authentication functionality
    initAuthSystem();

    console.log('Authentication system ready!');
});

function initAuthSystem() {
    // Initialize login form
    initLoginForm();

    // Initialize signup form
    initSignupForm();

    // Initialize password toggles
    initPasswordToggles();

    // Initialize form validation
    initFormValidation();

    // Initialize demo functions
    initDemoFunctions();
}

// Login Form Functionality
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin(this);
    });
}

function handleLogin(form) {
    const formData = new FormData(form);
    const loginData = {
        clinicId: formData.get('clinicId'),
        username: formData.get('username'),
        password: formData.get('password'),
        remember: formData.get('remember') === 'on'
    };

    // Show loading state
    showButtonLoading(form.querySelector('button[type="submit"]'));

    // Simulate login API call
    setTimeout(() => {
        if (validateLogin(loginData)) {
            showSuccessMessage('Login successful! Redirecting to dashboard...');

            // Store login data 
            if (loginData.remember) {
                localStorage.setItem('cliniq_remember', 'true');
            }
            sessionStorage.setItem('cliniq_user', JSON.stringify(loginData));

            // Redirect to main platform
            setTimeout(() => {
                window.location.href = 'ClinIQ/main.app/main.html';
            }, 1500);
        } else {
            showErrorMessage('Invalid credentials. Please check your clinic ID, username, and password.');
            hideButtonLoading(form.querySelector('button[type="submit"]'));
        }
    }, 2000);
}

function validateLogin(data) {
    // Demo validation - After Demo validation will checked against backend
    const validCredentials = [
        { clinicId: 'DEMO_CLINIC_001', username: 'dr.smith', password: 'demo123' },
        { clinicId: 'DEMO_CLINIC_001', username: 'nurse.jones', password: 'demo123' },
        { clinicId: 'TEST_CLINIC_002', username: 'admin', password: 'test123' }
    ];

    return validCredentials.some(cred => 
        cred.clinicId === data.clinicId && 
        cred.username === data.username && 
        cred.password === data.password
    );
}

// Signup Form Functionality
function initSignupForm() {
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) return;

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSignup(this);
    });

    // Initialize password strength checker
    const passwordInput = document.getElementById('signup-password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // Initialize password confirmation
    const confirmPasswordInput = document.getElementById('confirm-password');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            checkPasswordMatch();
        });
    }
}

function handleSignup(form) {
    const formData = new FormData(form);
    const signupData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        clinicName: formData.get('clinicName'),
        specialty: formData.get('specialty'),
        clinicSize: formData.get('clinicSize'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        terms: formData.get('terms') === 'on',
        marketing: formData.get('marketing') === 'on'
    };

    // Validate signup data
    if (!validateSignup(signupData)) {
        return;
    }

    // Show loading state
    showButtonLoading(form.querySelector('button[type="submit"]'));

    // Simulate signup API call
    setTimeout(() => {
        // Generate clinic ID
        const clinicId = generateClinicId(signupData.clinicName);

        showSuccessMessage(`Account created successfully! Your Clinic ID is: ${clinicId}`);

        // Store signup data
        const userData = {
            clinicId: clinicId,
            username: signupData.email.split('@')[0],
            ...signupData
        };

        sessionStorage.setItem('cliniq_new_user', JSON.stringify(userData));

        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }, 2500);
}

function validateSignup(data) {
    let isValid = true;

    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'clinicName', 'specialty', 'clinicSize', 'password'];
    requiredFields.forEach(field => {
        if (!data[field]) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });

    // Validate email
    if (data.email && !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (data.password && data.password.length < 8) {
        showFieldError('signup-password', 'Password must be at least 8 characters long');
        isValid = false;
    }

    // Check password match
    if (data.password !== data.confirmPassword) {
        showFieldError('confirm-password', 'Passwords do not match');
        isValid = false;
    }

    // Check terms agreement
    if (!data.terms) {
        showErrorMessage('You must agree to the Terms of Service and Privacy Policy');
        isValid = false;
    }

    return isValid;
}

function generateClinicId(clinicName) {
    const prefix = clinicName.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3);
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}_${suffix}`;
}

// Password Functionality
function initPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const inputId = this.parentElement.querySelector('input').id;
            togglePassword(inputId);
        });
    });
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.password-toggle');

    if (input.type === 'password') {
        input.type = 'text';
        button.innerHTML = `
            <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            </svg>
        `;
    } else {
        input.type = 'password';
        button.innerHTML = `
            <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
        `;
    }
}

function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    if (!strengthBar || !strengthText) return;

    let strength = 0;
    let text = 'Weak';
    let className = 'weak';

    // Check password criteria
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Update strength display
    switch (strength) {
        case 0:
        case 1:
            text = 'Weak';
            className = 'weak';
            break;
        case 2:
        case 3:
            text = 'Fair';
            className = 'fair';
            break;
        case 4:
            text = 'Good';
            className = 'good';
            break;
        case 5:
            text = 'Strong';
            className = 'strong';
            break;
    }

    strengthBar.className = `strength-fill ${className}`;
    strengthText.textContent = `Password strength: ${text}`;
}

function checkPasswordMatch() {
    const password = document.getElementById('signup-password');
    const confirmPassword = document.getElementById('confirm-password');

    if (!password || !confirmPassword) return;

    if (confirmPassword.value && password.value !== confirmPassword.value) {
        showFieldError('confirm-password', 'Passwords do not match');
        confirmPassword.classList.add('error');
    } else {
        clearFieldError('confirm-password');
        confirmPassword.classList.remove('error');
        if (confirmPassword.value) {
            confirmPassword.classList.add('success');
        }
    }
}

// Form Validation
function initFormValidation() {
    // Real-time validation for email fields
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showFieldError(this.id, 'Please enter a valid email address');
                this.classList.add('error');
            } else {
                clearFieldError(this.id);
                this.classList.remove('error');
                if (this.value) this.classList.add('success');
            }
        });
    });

    // Real-time validation for required fields
    document.querySelectorAll('input[required], select[required]').forEach(input => {
        input.addEventListener('blur', function() {
            if (!this.value) {
                showFieldError(this.id, 'This field is required');
                this.classList.add('error');
            } else {
                clearFieldError(this.id);
                this.classList.remove('error');
                this.classList.add('success');
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    // Remove existing error message
    clearFieldError(fieldId);

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        ${message}
    `;

    // Insert error message after the field
    field.parentElement.appendChild(errorElement);
    field.classList.add('error');
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }

    field.classList.remove('error');
}

// Demo Functions
function initDemoFunctions() {
    // Auto-fill demo credentials on page load for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        setTimeout(fillDemoCredentials, 1000);
    }
}

function demoLogin() {
    // Fill demo credentials
    const clinicId = document.getElementById('clinic-id');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (clinicId) clinicId.value = 'DEMO_CLINIC_001';
    if (username) username.value = 'dr.smith';
    if (password) password.value = 'demo123';

    // Show demo info
    showInfoMessage('Demo credentials filled! Click "Sign In" to continue.');
}

function demoSignup() {
    // Fill demo signup data
    const fields = {
        'first-name': 'John',
        'last-name': 'Smith',
        'email': 'john.smith@democlinic.com',
        'clinic-name': 'Demo Medical Center',
        'specialty': 'general',
        'clinic-size': '1-5',
        'signup-password': 'DemoPass123!',
        'confirm-password': 'DemoPass123!'
    };

    Object.entries(fields).forEach(([id, value]) => {
        const field = document.getElementById(id);
        if (field) field.value = value;
    });

    // Check terms
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) termsCheckbox.checked = true;

    showInfoMessage('Demo signup data filled! Review and click "Create Account" to continue.');
}

function fillDemoCredentials() {
    // Only for development environment
    const isLoginPage = document.getElementById('login-form');
    if (isLoginPage) {
        demoLogin();
    }
}

// UI Helper Functions
function showButtonLoading(button) {
    if (!button) return;

    button.classList.add('loading');
    button.disabled = true;
    button.querySelector('.btn-loader').classList.remove('hidden');
}

function hideButtonLoading(button) {
    if (!button) return;

    button.classList.remove('loading');
    button.disabled = false;
    button.querySelector('.btn-loader').classList.add('hidden');
}

function showMessage(message, type = 'info') {
    // Remove existing messages
    document.querySelectorAll('.message-toast').forEach(msg => msg.remove());

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message-toast ${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-icon">
                ${getMessageIcon(type)}
            </div>
            <span>${message}</span>
        </div>
        <button class="message-close" onclick="this.parentElement.remove()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    // Add styles if not exist
    if (!document.querySelector('.message-toast-styles')) {
        const styles = document.createElement('style');
        styles.className = 'message-toast-styles';
        styles.textContent = `
            .message-toast {
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: white;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1rem 1.5rem;
                max-width: 400px;
                z-index: 1000;
                border-left: 4px solid #3b82f6;
                animation: slideIn 0.3s ease-out;
            }

            .message-toast.error { border-left-color: #ef4444; }
            .message-toast.success { border-left-color: #10b981; }
            .message-toast.warning { border-left-color: #f59e0b; }

            .message-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .message-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
            }

            .message-close {
                background: none;
                border: none;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity 0.2s;
            }

            .message-close:hover {
                opacity: 1;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to page
    document.body.appendChild(messageElement);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

function getMessageIcon(type) {
    const icons = {
        info: '<svg width="20" height="20" fill="#3b82f6" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
        success: '<svg width="20" height="20" fill="#10b981" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
        error: '<svg width="20" height="20" fill="#ef4444" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
        warning: '<svg width="20" height="20" fill="#f59e0b" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
    };
    return icons[type] || icons.info;
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

function showWarningMessage(message) {
    showMessage(message, 'warning');
}

// Export functions for global access
window.togglePassword = togglePassword;
window.demoLogin = demoLogin;
window.demoSignup = demoSignup;