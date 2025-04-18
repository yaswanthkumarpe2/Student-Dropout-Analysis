// Initialize all charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTrendChart();
    initializeDemographicsChart();
    initializeRiskFactorsChart();
    initializeGeographicMap();
    setupEventListeners();
});

function initializeTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Dropout Rate',
                data: [12, 11, 10, 9, 8.5, 8],
                borderColor: 'rgb(59, 130, 246)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Dropout Trend Analysis'
                }
            }
        }
    });
}

function initializeDemographicsChart() {
    const ctx = document.getElementById('demographicsChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Male', 'Female', 'Other'],
            datasets: [{
                data: [55, 40, 5],
                backgroundColor: [
                    'rgb(59, 130, 246)',
                    'rgb(236, 72, 153)',
                    'rgb(168, 85, 247)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Student Demographics'
                }
            }
        }
    });
}

function initializeRiskFactorsChart() {
    const ctx = document.getElementById('riskChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Academic', 'Financial', 'Personal', 'Social'],
            datasets: [{
                label: 'Risk Level',
                data: [75, 60, 45, 30],
                backgroundColor: 'rgb(59, 130, 246)'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Risk Factors Analysis'
                }
            }
        }
    });
}

function initializeGeographicMap() {
    // Initialize map using Leaflet.js
    const map = L.map('map').setView([20.5937, 78.9629], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
}

function setupEventListeners() {
    // Filter button functionality
    document.getElementById('filterBtn')?.addEventListener('click', function() {
        // Implement filter functionality
    });

    // Export button functionality
    document.getElementById('exportBtn')?.addEventListener('click', function() {
        // Implement export functionality
    });

    // Time range selector functionality
    document.getElementById('timeRange')?.addEventListener('change', function(e) {
        updateCharts(e.target.value);
    });
}

function updateCharts(timeRange) {
    // Update charts based on selected time range
    console.log('Updating charts for time range:', timeRange);
}
