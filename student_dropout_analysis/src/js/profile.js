document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadUserData();
});

function setupEventListeners() {
    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    profileForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        updateProfile(new FormData(profileForm));
    });

    // Password change form submission
    const passwordForm = document.getElementById('passwordForm');
    passwordForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        updatePassword(new FormData(passwordForm));
    });

    // Avatar upload
    const avatarInput = document.querySelector('input[type="file"]');
    avatarInput?.addEventListener('change', function(e) {
        uploadAvatar(e.target.files[0]);
    });

    // Save button
    const saveBtn = document.getElementById('saveProfileBtn');
    saveBtn?.addEventListener('click', function() {
        saveChanges();
    });
}

function loadUserData() {
    // Sample user data - replace with actual API call
    const userData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234 567 890',
        department: 'Academic',
        notifications: {
            email: true,
            push: false,
            sms: true
        },
        recentActivity: [
            {
                action: 'Viewed Student Report',
                time: '2 hours ago',
                icon: 'document'
            },
            {
                action: 'Updated Profile',
                time: '1 day ago',
                icon: 'user'
            }
        ]
    };

    populateUserData(userData);
}

function populateUserData(data) {
    // Populate form fields
    document.getElementById('fullName').value = data.name;
    document.getElementById('email').value = data.email;
    document.getElementById('phone').value = data.phone;
    document.getElementById('department').value = data.department;

    // Update header
    document.getElementById('userName').textContent = data.name;

    // Update notification toggles
    Object.entries(data.notifications).forEach(([key, value]) => {
        const toggle = document.querySelector(`input[name="${key}Toggle"]`);
        if (toggle) toggle.checked = value;
    });

    // Populate activity timeline
    const timeline = document.querySelector('.activity-timeline');
    if (timeline) {
        timeline.innerHTML = data.recentActivity.map(activity => `
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <span class="inline-block p-2 bg-blue-100 rounded-full">
                        ${getActivityIcon(activity.icon)}
                    </span>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-800">${activity.action}</p>
                    <p class="text-xs text-gray-500">${activity.time}</p>
                </div>
            </div>
        `).join('');
    }
}

function updateProfile(formData) {
    // Implement profile update
    console.log('Updating profile:', Object.fromEntries(formData));
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        showToast('Profile updated successfully');
    }, 1000);
}

function updatePassword(formData) {
    // Implement password update
    const data = Object.fromEntries(formData);
    if (data.newPassword !== data.confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }

    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        showToast('Password updated successfully');
    }, 1000);
}

function uploadAvatar(file) {
    if (!file) return;

    showLoadingState();
    
    // Simulate upload
    setTimeout(() => {
        hideLoadingState();
        showToast('Avatar updated successfully');
        
        // Update avatar preview
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('img[alt="Profile"]').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }, 1000);
}

function saveChanges() {
    showLoadingState();
    
    // Simulate save
    setTimeout(() => {
        hideLoadingState();
        showToast('All changes saved successfully');
    }, 1000);
}

function showLoadingState() {
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) {
        saveBtn.disabled = true;
        saveBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
        `;
    }
}

function hideLoadingState() {
    const saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            Save Changes
        `;
    }
}

function getActivityIcon(type) {
    const icons = {
        document: `<svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>`,
        user: `<svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>`
    };
    return icons[type] || icons.document;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-0 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
