document.addEventListener('DOMContentLoaded', function() {
    // Chart instances
    let dropoutChart, demographicsChart;

    // Sample data for different time ranges
    const timeRangeData = {
        '7days': {
            dropout: [10, 12, 8, 15, 9, 11, 7],
            demographics: [30, 50, 20]
        },
        '30days': {
            dropout: [65, 59, 80, 81, 56, 55, 60],
            demographics: [45, 40, 15]
        },
        '90days': {
            dropout: [100, 95, 110, 120, 90, 85, 88],
            demographics: [50, 35, 15]
        },
        '1year': {
            dropout: [300, 280, 320, 310, 290, 270, 260],
            demographics: [48, 38, 14]
        }
    };

    // Initialize Dropout Trends Chart
    function initDropoutChart(data) {
        const dropoutCtx = document.getElementById('dropoutTrend').getContext('2d');
        if (dropoutChart) dropoutChart.destroy();
        dropoutChart = new Chart(dropoutCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Dropouts',
                    data: data,
                    fill: false,
                    borderColor: '#4F46E5',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initialize Demographics Chart
    function initDemographicsChart(data) {
        const demoCtx = document.getElementById('demographics').getContext('2d');
        if (demographicsChart) demographicsChart.destroy();
        demographicsChart = new Chart(demoCtx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female', 'Others'],
                datasets: [{
                    data: data,
                    backgroundColor: ['#4F46E5', '#EC4899', '#8B5CF6']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Filter function
    function applyFilters() {
        // Placeholder for filter logic
        console.log('Applying filters...');
        // Example: Could filter data based on user-selected criteria
        alert('Filter applied! Implement your filter logic here.');
    }

    // Export function
    function exportData() {
        // Placeholder for export logic
        console.log('Exporting data...');
        // Example: Could generate a CSV or PDF
        const data = {
            dropouts: dropoutChart.data.datasets[0].data,
            demographics: demographicsChart.data.datasets[0].data
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'analytics-data.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Time range change function
    function updateTimeRange(value) {
        console.log(`Time range changed to: ${value}`);
        const data = timeRangeData[value] || timeRangeData['30days'];
        initDropoutChart(data.dropout);
        initDemographicsChart(data.demographics);
    }

    // Initialize charts with default data (30 days)
    initDropoutChart(timeRangeData['30days'].dropout);
    initDemographicsChart(timeRangeData['30days'].demographics);

    // Event listeners
    document.getElementById('filterBtn').addEventListener('click', applyFilters);
    document.getElementById('exportBtn').addEventListener('click', exportData);
    document.getElementById('timeRange').querySelector('select').addEventListener('change', function() {
        updateTimeRange(this.value);
    });

    // Add hover effects to chart containers
    document.querySelectorAll('.chart-container').forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});