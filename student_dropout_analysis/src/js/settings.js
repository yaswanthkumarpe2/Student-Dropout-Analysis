document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadSettings();
    initializeColorPicker();
});

function setupEventListeners() {
    // Settings form submission
    const settingsForm = document.getElementById('settingsForm');
    settingsForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSettings(new FormData(settingsForm));
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle?.addEventListener('change', function(e) {
        toggleDarkMode(e.target.checked);
    });

    // Notification toggles
    document.querySelectorAll('.notification-toggle').forEach(toggle => {
        toggle.addEventListener('change', function(e) {
            updateNotificationSettings(e.target.name, e.target.checked);
        });
    });

    // Save button
    const saveBtn = document.getElementById('saveSettingsBtn');
    saveBtn?.addEventListener('click', function() {
        saveAllSettings();
    });
}

function loadSettings() {
    // Sample settings - replace with actual API call
    const settings = {
        language: 'en',
        timezone: 'UTC+5:30',
        dateFormat: 'DD/MM/YYYY',
        theme: {
            color: '#3B82F6',
            darkMode: false
        },
        notifications: {
            email: true,
            push: true,
            sms: false
        },
        data: {
            retention: '30',
            autoExport: true
        }
    };

    populateSettings(settings);
}

function populateSettings(settings) {
    // Language
    document.getElementById('language').value = settings.language;
    
    // Timezone
    document.getElementById('timezone').value = settings.timezone;
    
    // Date Format
    document.getElementById('dateFormat').value = settings.dateFormat;
    
    // Theme
    document.getElementById('themeColor').value = settings.theme.color;
    document.getElementById('darkModeToggle').checked = settings.theme.darkMode;
    
    // Notifications
    Object.entries(settings.notifications).forEach(([key, value]) => {
        const toggle = document.querySelector(`input[name="${key}Notifications"]`);
        if (toggle) toggle.checked = value;
    });
    
    // Data Settings
    document.getElementById('dataRetention').value = settings.data.retention;
    document.getElementById('autoExport').checked = settings.data.autoExport;

    // Apply dark mode if enabled
    if (settings.theme.darkMode) {
        document.documentElement.classList.add('dark');
    }
}

function initializeColorPicker() {
    const colorPicker = document.getElementById('themeColor');
    if (!colorPicker) return;

    colorPicker.addEventListener('input', function(e) {
        updateThemeColor(e.target.value);
    });
}

function updateThemeColor(color) {
    document.documentElement.style.setProperty('--theme-color', color);
    showToast('Theme color updated');
}

function toggleDarkMode(enabled) {
    if (enabled) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    showToast(`Dark mode ${enabled ? 'enabled' : 'disabled'}`);
}

function updateNotificationSettings(type, enabled) {
    // Implement notification settings update
    console.log('Updating notification settings:', type, enabled);
    showToast(`${type} notifications ${enabled ? 'enabled' : 'disabled'}`);
}

function saveSettings(formData) {
    showLoadingState();
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        const data = Object.fromEntries(formData);
        console.log('Saving settings:', data);
        showToast('Settings saved successfully');
    }, 1000);
}

function saveAllSettings() {
    showLoadingState();
    
    // Collect all settings
    const settings = {
        language: document.getElementById('language').value,
        timezone: document.getElementById('timezone').value,
        dateFormat: document.getElementById('dateFormat').value,
        theme: {
            color: document.getElementById('themeColor').value,
            darkMode: document.getElementById('darkModeToggle').checked
        },
        notifications: {
            email: document.querySelector('input[name="emailNotifications"]').checked,
            push: document.querySelector('input[name="pushNotifications"]').checked,
            sms: document.querySelector('input[name="smsNotifications"]').checked
        },
        data: {
            retention: document.getElementById('dataRetention').value,
            autoExport: document.getElementById('autoExport').checked
        }
    };

    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        console.log('Saving all settings:', settings);
        showToast('All settings saved successfully');
    }, 1000);
}

function showLoadingState() {
    const saveBtn = document.getElementById('saveSettingsBtn');
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
    const saveBtn = document.getElementById('saveSettingsBtn');
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
