document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    setupEventListeners();
    loadInterventions();
});

function initializeCharts() {
    // Success Rate Chart
    const successCtx = document.getElementById('successChart').getContext('2d');
    new Chart(successCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Success Rate',
                data: [65, 68, 70, 72, 75, 76],
                borderColor: 'rgb(34, 197, 94)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true
        }
    });

    // Engagement Chart
    const engagementCtx = document.getElementById('engagementChart').getContext('2d');
    new Chart(engagementCtx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Student Engagement',
                data: [85, 82, 88, 90],
                backgroundColor: 'rgb(59, 130, 246)'
            }]
        },
        options: {
            responsive: true
        }
    });
}

function setupEventListeners() {
    // New Intervention Modal
    const modal = document.getElementById('newInterventionModal');
    const openModalBtn = document.getElementById('newInterventionBtn');
    const closeModalBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('interventionForm');

    openModalBtn?.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    });

    closeModalBtn?.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        // Handle form submission
        const formData = new FormData(form);
        createIntervention(Object.fromEntries(formData));
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    // Search functionality
    const searchInput = document.querySelector('input[type="text"]');
    searchInput?.addEventListener('input', (e) => {
        filterInterventions(e.target.value);
    });
}

function loadInterventions() {
    // Sample data - replace with actual API call
    const interventions = [
        {
            name: 'Academic Support Program',
            type: 'academic',
            enrolled: 45,
            progress: 75
        },
        {
            name: 'Financial Aid Program',
            type: 'financial',
            enrolled: 32,
            progress: 60
        }
    ];

    renderInterventions(interventions);
}

function renderInterventions(interventions) {
    const container = document.getElementById('interventionsList');
    if (!container) return;

    container.innerHTML = interventions.map(intervention => `
        <div class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">${intervention.name}</h3>
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    ${intervention.type}
                </span>
            </div>
            <div class="space-y-4">
                <div>
                    <p class="text-sm text-gray-500">Students Enrolled</p>
                    <p class="text-2xl font-bold">${intervention.enrolled}</p>
                </div>
                <div>
                    <div class="flex justify-between mb-1">
                        <span class="text-sm text-gray-500">Progress</span>
                        <span class="text-sm font-medium">${intervention.progress}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-600 h-2 rounded-full" style="width: ${intervention.progress}%"></div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterInterventions(searchTerm) {
    // Implement search/filter functionality
    console.log('Filtering interventions:', searchTerm);
}

function createIntervention(data) {
    // Implement intervention creation
    console.log('Creating intervention:', data);
    // Show success toast
    showToast('Intervention created successfully');
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-0';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('translate-y-full', 'opacity-0');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
