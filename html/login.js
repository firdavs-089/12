// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== DOM Elements =====
    // Auth Container
    const authContainer = document.getElementById('authContainer');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    // Form Elements
    const loginFormElement = document.getElementById('loginFormElement');
    const registerFormElement = document.getElementById('registerFormElement');
    const forgotPasswordFormElement = document.getElementById('forgotPasswordFormElement');
    
    // Navigation Buttons
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const backToLoginBtn = document.getElementById('backToLoginBtn');
    
    // Admin Panel
    const adminPanel = document.getElementById('adminPanel');
    const adminMenuItems = document.querySelectorAll('.admin-menu li');
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminLogout = document.getElementById('adminLogout');
    
    // Modals
    const editUserModal = document.getElementById('editUserModal');
    const deleteUserModal = document.getElementById('deleteUserModal');
    const termsModal = document.getElementById('termsModal');
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('overlay');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Modal Buttons
    const termsLink = document.getElementById('termsLink');
    const agreeTermsBtn = document.getElementById('agreeTermsBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const successOkBtn = document.getElementById('successOkBtn');
    
    // User Management
    const refreshUsersBtn = document.getElementById('refreshUsersBtn');
    const usersTableBody = document.getElementById('usersTableBody');
    const totalUsersElement = document.getElementById('totalUsers');
    const activityList = document.getElementById('activityList');
    
    // ===== Global Variables =====
    // Admin credentials
    const ADMIN_EMAIL = 'admin@uz';
    const ADMIN_PASSWORD = 'firdavs-1234';
    
    // Store users in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let activities = JSON.parse(localStorage.getItem('activities')) || [];
    
    // ===== Form Navigation =====
    // Show Register Form
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
    });
    
    // Show Login Form
    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerForm.classList.remove('active');
        loginForm.classList.add('active');
    });
    
    // Show Forgot Password Form
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.remove('active');
        forgotPasswordForm.classList.add('active');
    });
    
    // Back to Login from Forgot Password
    backToLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        forgotPasswordForm.classList.remove('active');
        loginForm.classList.add('active');
    });
    
    // ===== Password Toggle =====
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // ===== Profile Image Upload =====
    const profileImage = document.getElementById('profileImage');
    const profileImagePreview = document.getElementById('profileImagePreview');
    const editProfileImage = document.getElementById('editProfileImage');
    const editProfileImagePreview = document.getElementById('editProfileImagePreview');
    
    // Handle profile image upload for registration
    profileImage.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Image">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle profile image upload for edit user
    editProfileImage.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                editProfileImagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile Image">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // ===== Password Strength Meter =====
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('strengthBar');
    const strengthLabel = document.getElementById('strengthLabel');
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Update strength bar
        strengthBar.style.width = `${strength.score * 25}%`;
        
        // Update color and label based on strength
        if (strength.score === 0) {
            strengthBar.style.backgroundColor = '#e1e5eb';
            strengthLabel.textContent = 'Password Strength';
            strengthLabel.style.color = 'var(--text-lighter)';
        } else if (strength.score === 1) {
            strengthBar.style.backgroundColor = '#e63946';
            strengthLabel.textContent = 'Weak';
            strengthLabel.style.color = '#e63946';
        } else if (strength.score === 2) {
            strengthBar.style.backgroundColor = '#f39c12';
            strengthLabel.textContent = 'Fair';
            strengthLabel.style.color = '#f39c12';
        } else if (strength.score === 3) {
            strengthBar.style.backgroundColor = '#3498db';
            strengthLabel.textContent = 'Good';
            strengthLabel.style.color = '#3498db';
        } else {
            strengthBar.style.backgroundColor = '#2ecc71';
            strengthLabel.textContent = 'Strong';
            strengthLabel.style.color = '#2ecc71';
        }
    });
    
    function calculatePasswordStrength(password) {
        // Simple password strength calculation
        let score = 0;
        
        // Length check
        if (password.length > 0) score += 1;
        if (password.length > 8) score += 1;
        
        // Complexity checks
        if (/[A-Z]/.test(password)) score += 1; // Has uppercase
        if (/[0-9]/.test(password)) score += 1; // Has number
        if (/[^A-Za-z0-9]/.test(password)) score += 1; // Has special char
        
        return {
            score: Math.min(score, 4) // Max score is 4
        };
    }
    
    // ===== Form Validation & Submission =====
    // Login Form Submission
    loginFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const emailError = document.getElementById('loginEmailError');
        const passwordError = document.getElementById('loginPasswordError');
        
        // Reset errors
        emailError.textContent = '';
        passwordError.textContent = '';
        
        // Check if admin login
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Show admin panel
            authContainer.style.display = 'none';
            adminPanel.classList.add('active');
            
            // Load admin panel data
            loadAdminPanelData();
            
            // Add activity
            addActivity('Admin logged in');
            
            return;
        }
        
        // Check if user exists
        const user = users.find(u => u.email === email);
        
        if (!user) {
            emailError.textContent = 'User not found';
            return;
        }
        
        if (user.password !== password) {
            passwordError.textContent = 'Incorrect password';
            return;
        }
        
        // Successful login
        showSuccessModal('Login Successful', 'You have successfully logged in.');
        
        // Add activity
        addActivity(`User ${user.name} logged in`);
        
        // Reset form
        this.reset();
    });
    
    // Register Form Submission
    registerFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsCheckbox = document.getElementById('termsCheckbox');
        
        const fullNameError = document.getElementById('fullNameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        const termsError = document.getElementById('termsError');
        
        // Reset errors
        fullNameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';
        termsError.textContent = '';
        
        // Validate inputs
        let isValid = true;
        
        if (name.trim().length < 3) {
            fullNameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
            emailError.textContent = 'Email already exists';
            isValid = false;
        }
        
        if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            isValid = false;
        }
        
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the terms and conditions';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Get profile image
        const profileImageSrc = profileImagePreview.querySelector('img') ? 
            profileImagePreview.querySelector('img').src : '';
        
        // Create new user
        const newUser = {
            id: generateUserId(),
            name,
            email,
            password,
            profileImage: profileImageSrc,
            registrationDate: new Date().toISOString()
        };
        
        // Add user to array
        users.push(newUser);
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        showSuccessModal('Registration Successful', 'Your account has been created successfully and your information has been sent to the admin panel.');
        
        // Add activity
        addActivity(`New user registered: ${name}`);
        
        // Reset form
        this.reset();
        profileImagePreview.innerHTML = '<i class="fas fa-user"></i>';
    });
    
    // Forgot Password Form Submission
    forgotPasswordFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('resetEmail').value;
        const resetEmailError = document.getElementById('resetEmailError');
        
        // Reset errors
        resetEmailError.textContent = '';
        
        // Check if email exists
        const user = users.find(u => u.email === email);
        
        if (!user) {
            resetEmailError.textContent = 'Email not found';
            return;
        }
        
        // In a real application, you would send a reset link to the user's email
        // For this demo, we'll just show a success message
        showSuccessModal('Password Reset Email Sent', 'Check your email for instructions to reset your password.');
        
        // Add activity
        addActivity(`Password reset requested for: ${email}`);
        
        // Reset form
        this.reset();
    });
    
    // ===== Admin Panel =====
    // Admin Menu Navigation
    adminMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.id === 'adminLogout') return;
            
            // Remove active class from all menu items
            adminMenuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
            });
            
            // Add active class to clicked menu item
            this.classList.add('active');
            
            // Show corresponding tab
            const tabId = this.getAttribute('data-tab');
            adminTabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === `${tabId}Tab`) {
                    tab.classList.add('active');
                }
            });
        });
    });
    
    // Admin Logout
    adminLogout.addEventListener('click', function() {
        adminPanel.classList.remove('active');
        authContainer.style.display = 'block';
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        forgotPasswordForm.classList.remove('active');
        
        // Add activity
        addActivity('Admin logged out');
    });
    
    // Refresh Users Table
    refreshUsersBtn.addEventListener('click', function() {
        loadUsersTable();
        
        // Add activity
        addActivity('Admin refreshed users list');
    });
    
    // ===== Modal Handling =====
    // Show Terms Modal
    termsLink.addEventListener('click', function(e) {
        e.preventDefault();
        showModal(termsModal);
    });
    
    // Agree to Terms
    agreeTermsBtn.addEventListener('click', function() {
        document.getElementById('termsCheckbox').checked = true;
        hideModal(termsModal);
    });
    
    // Cancel Edit User
    cancelEditBtn.addEventListener('click', function() {
        hideModal(editUserModal);
    });
    
    // Cancel Delete User
    cancelDeleteBtn.addEventListener('click', function() {
        hideModal(deleteUserModal);
    });
    
    // Confirm Delete User
    confirmDeleteBtn.addEventListener('click', function() {
        const userId = document.getElementById('deleteUserId').value;
        
        // Find user index
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex !== -1) {
            const deletedUser = users[userIndex];
            
            // Remove user from array
            users.splice(userIndex, 1);
            
            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Reload users table
            loadUsersTable();
            
            // Add activity
            addActivity(`Admin deleted user: ${deletedUser.name}`);
            
            // Show success message
            showSuccessModal('User Deleted', 'The user has been deleted successfully.');
        }
        
        hideModal(deleteUserModal);
    });
    
    // Success OK Button
    successOkBtn.addEventListener('click', function() {
        hideModal(successModal);
    });
    
    // Close Modal Buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            hideModal(modal);
        });
    });
    
    // Close Modal on Overlay Click
    overlay.addEventListener('click', function() {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
            hideModal(modal);
        });
    });
    
    // ===== Edit User Form =====
    const editUserForm = document.getElementById('editUserForm');
    
    editUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userId = document.getElementById('editUserId').value;
        const name = document.getElementById('editFullName').value;
        const email = document.getElementById('editEmail').value;
        const password = document.getElementById('editPassword').value;
        
        const editFullNameError = document.getElementById('editFullNameError');
        const editEmailError = document.getElementById('editEmailError');
        const editPasswordError = document.getElementById('editPasswordError');
        
        // Reset errors
        editFullNameError.textContent = '';
        editEmailError.textContent = '';
        editPasswordError.textContent = '';
        
        // Validate inputs
        let isValid = true;
        
        if (name.trim().length < 3) {
            editFullNameError.textContent = 'Name must be at least 3 characters';
            isValid = false;
        }
        
        if (!validateEmail(email)) {
            editEmailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        // Check if email already exists (excluding current user)
        const emailExists = users.some(user => user.email === email && user.id !== userId);
        if (emailExists) {
            editEmailError.textContent = 'Email already exists';
            isValid = false;
        }
        
        if (password && password.length < 6) {
            editPasswordError.textContent = 'Password must be at least 6 characters';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Find user
        const userIndex = users.findIndex(user => user.id === userId);
        
        if (userIndex !== -1) {
            // Get profile image
            const profileImageSrc = editProfileImagePreview.querySelector('img') ? 
                editProfileImagePreview.querySelector('img').src : users[userIndex].profileImage;
            
            // Update user
            users[userIndex].name = name;
            users[userIndex].email = email;
            users[userIndex].profileImage = profileImageSrc;
            
            // Update password if provided
            if (password) {
                users[userIndex].password = password;
            }
            
            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Reload users table
            loadUsersTable();
            
            // Add activity
            addActivity(`Admin updated user: ${name}`);
            
            // Show success message
            showSuccessModal('User Updated', 'The user has been updated successfully.');
        }
        
        hideModal(editUserModal);
    });
    
    // ===== Admin Settings Form =====
    const adminSettingsForm = document.getElementById('adminSettingsForm');
    
    adminSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        // Validate inputs
        if (currentPassword !== ADMIN_PASSWORD) {
            showSuccessModal('Error', 'Current password is incorrect.', false);
            return;
        }
        
        if (newPassword.length < 6) {
            showSuccessModal('Error', 'New password must be at least 6 characters.', false);
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            showSuccessModal('Error', 'New passwords do not match.', false);
            return;
        }
        
        // In a real application, you would update the admin password in a database
        // For this demo, we'll just show a success message
        showSuccessModal('Password Updated', 'Your admin password has been updated successfully.');
        
        // Add activity
        addActivity('Admin updated password');
        
        // Reset form
        this.reset();
    });
    
    // ===== Helper Functions =====
    // Validate Email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Generate User ID
    function generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }
    
    // Show Modal
    function showModal(modal) {
        modal.classList.add('active');
        overlay.classList.add('active');
    }
    
    // Hide Modal
    function hideModal(modal) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
    
    // Show Success Modal
    function showSuccessModal(title, message, isSuccess = true) {
        document.getElementById('successTitle').textContent = title;
        document.getElementById('successMessage').textContent = message;
        
        const successIcon = document.querySelector('.success-icon i');
        if (isSuccess) {
            successIcon.className = 'fas fa-check-circle';
            successIcon.style.color = 'var(--success-color)';
        } else {
            successIcon.className = 'fas fa-times-circle';
            successIcon.style.color = 'var(--error-color)';
        }
        
        showModal(successModal);
    }
    
    // Add Activity
    function addActivity(description) {
        const activity = {
            id: 'activity_' + Math.random().toString(36).substr(2, 9),
            description,
            timestamp: new Date().toISOString()
        };
        
        // Add to beginning of array
        activities.unshift(activity);
        
        // Limit to 20 activities
        if (activities.length > 20) {
            activities.pop();
        }
        
        // Save to localStorage
        localStorage.setItem('activities', JSON.stringify(activities));
        
        // Update activity list if admin panel is active
        if (adminPanel.classList.contains('active')) {
            loadActivityList();
        }
    }
    
    // Format Date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
    
    // Time Ago
    function timeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        let interval = Math.floor(seconds / 31536000);
        if (interval > 1) return interval + ' years ago';
        if (interval === 1) return '1 year ago';
        
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) return interval + ' months ago';
        if (interval === 1) return '1 month ago';
        
        interval = Math.floor(seconds / 86400);
        if (interval > 1) return interval + ' days ago';
        if (interval === 1) return '1 day ago';
        
        interval = Math.floor(seconds / 3600);
        if (interval > 1) return interval + ' hours ago';
        if (interval === 1) return '1 hour ago';
        
        interval = Math.floor(seconds / 60);
        if (interval > 1) return interval + ' minutes ago';
        if (interval === 1) return '1 minute ago';
        
        if (seconds < 10) return 'just now';
        
        return Math.floor(seconds) + ' seconds ago';
    }
    
    // ===== Admin Panel Data Loading =====
    // Load Admin Panel Data
    function loadAdminPanelData() {
        loadUsersTable();
        loadActivityList();
        updateStats();
    }
    
    // Load Users Table
    function loadUsersTable() {
        usersTableBody.innerHTML = '';
        
        if (users.length === 0) {
            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center;">No users found</td>
                </tr>
            `;
            return;
        }
        
        users.forEach(user => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>
                    <div class="user-profile">
                        <div class="user-avatar">
                            ${user.profileImage ? 
                                `<img src="${user.profileImage}" alt="${user.name}">` : 
                                '<i class="fas fa-user"></i>'}
                        </div>
                    </div>
                </td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${formatDate(user.registrationDate)}</td>
                <td>
                    <div class="user-actions">
                        <button class="action-btn edit-btn" data-id="${user.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-user-btn" data-id="${user.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            usersTableBody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-user-btn');
        
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                openEditUserModal(userId);
            });
        });
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-id');
                openDeleteUserModal(userId);
            });
        });
    }
    
    // Load Activity List
    function loadActivityList() {
        activityList.innerHTML = '';
        
        if (activities.length === 0) {
            activityList.innerHTML = '<div class="no-activity">No recent activity</div>';
            return;
        }
        
        activities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            activityItem.innerHTML = `
                <div class="activity-icon">
                    <i class="fas fa-history"></i>
                </div>
                <div class="activity-info">
                    <p>${activity.description}</p>
                    <span class="time">${timeAgo(activity.timestamp)}</span>
                </div>
            `;
            
            activityList.appendChild(activityItem);
        });
    }
    
    // Update Stats
    function updateStats() {
        totalUsersElement.textContent = users.length;
    }
    
    // Open Edit User Modal
    function openEditUserModal(userId) {
        const user = users.find(u => u.id === userId);
        
        if (user) {
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editFullName').value = user.name;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editPassword').value = '';
            
            if (user.profileImage) {
                editProfileImagePreview.innerHTML = `<img src="${user.profileImage}" alt="${user.name}">`;
            } else {
                editProfileImagePreview.innerHTML = '<i class="fas fa-user"></i>';
            }
            
            showModal(editUserModal);
        }
    }
    
    // Open Delete User Modal
    function openDeleteUserModal(userId) {
        const user = users.find(u => u.id === userId);
        
        if (user) {
            document.getElementById('deleteUserId').value = user.id;
            showModal(deleteUserModal);
        }
    }
    
    // ===== Initialize =====
    // Show login form by default
    loginForm.classList.add('active');
    
    // Add some sample users if none exist
    if (users.length === 0) {
        users = [
            {
                id: 'user_123456789',
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                profileImage: '',
                registrationDate: '2023-01-15T10:30:00.000Z'
            },
            {
                id: 'user_987654321',
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password456',
                profileImage: '',
                registrationDate: '2023-02-20T14:45:00.000Z'
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Add some sample activities if none exist
    if (activities.length === 0) {
        activities = [
            {
                id: 'activity_123456789',
                description: 'System initialized',
                timestamp: new Date().toISOString()
            }
        ];
        
        localStorage.setItem('activities', JSON.stringify(activities));
    }
});