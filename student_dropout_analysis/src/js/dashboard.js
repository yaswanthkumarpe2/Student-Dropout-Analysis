import { dataService } from './services/data-service.js';

// Dashboard functionality
class Dashboard {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.loadData();
    }

    init() {
        // Initialize Leaflet map
        this.map = L.map('dropoutMap').setView([20.5937, 78.9629], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

        // Initialize charts
        this.initCharts();
    }

    setupEventListeners() {
        // Risk filter
        document.getElementById('riskFilter')?.addEventListener('change', (e) => {
            this.filterRiskStudents(e.target.value);
        });

        // Trend period filter
        document.getElementById('trendPeriod')?.addEventListener('change', (e) => {
            this.updateTrendChart(e.target.value);
        });

        // Map view toggles
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.addEventListener('click', () => this.changeMapView(btn.dataset.view));
        });

        // Export buttons
        document.querySelectorAll('[data-format]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.exportData(btn.dataset.format);
            });
        });

        // Report generation
        document.getElementById('generateReport')?.addEventListener('click', () => {
            this.generateReport();
        });

        // Data import
        document.getElementById('importFile')?.addEventListener('change', (e) => {
            this.handleFileImport(e.target.files[0]);
        });

        // Data sync
        document.getElementById('syncData')?.addEventListener('click', () => {
            this.syncData();
        });
    }

    async loadData() {
        try {
            // Load high-risk students
            const students = await this.fetchHighRiskStudents();
            this.updateRiskList(students);

            // Load active interventions
            const interventions = await this.fetchInterventions();
            this.updateInterventionsList(interventions);

            // Update map data
            this.updateMapData();

            // Update charts
            this.updateAllCharts();
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            this.showNotification('Error loading data', 'error');
        }
    }

    async fetchHighRiskStudents() {
        return await dataService.getHighRiskStudents();
    }

    async fetchInterventions() {
        return await dataService.getActiveInterventions();
    }

    updateRiskList(students) {
        const container = document.getElementById('highRiskList');
        if (!container) return;

        container.innerHTML = students.map(student => `
            <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold">${student.name}</h4>
                        <p class="text-sm text-gray-600">Grade ${student.grade} | ID: ${student.id}</p>
                    </div>
                    <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        ${student.riskLevel.charAt(0).toUpperCase() + student.riskLevel.slice(1)} Risk
                    </span>
                </div>
                <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Attendance: ${student.attendance}%</span>
                    <span>Academic Score: ${student.academicScore}</span>
                    <span>Interventions: ${student.interventions}</span>
                </div>
            </div>
        `).join('');
    }

    updateInterventionsList(interventions) {
        const container = document.getElementById('interventionsList');
        if (!container) return;

        container.innerHTML = interventions.map(intervention => `
            <div class="p-4 border rounded-lg">
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-semibold">${intervention.name}</h4>
                        <p class="text-sm text-gray-600">${intervention.enrolledCount} students enrolled</p>
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        ${intervention.status}
                    </span>
                </div>
                <div class="mt-2">
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${intervention.progress}%"></div>
                    </div>
                    <p class="text-sm text-gray-500 mt-1">Progress: ${intervention.progress}%</p>
                </div>
            </div>
        `).join('');
    }

    initCharts() {
        // Trend Chart
        const trendCtx = document.getElementById('trendChart')?.getContext('2d');
        if (trendCtx) {
            this.trendChart = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Dropout Rate',
                        data: [],
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

        // Success Chart
        const successCtx = document.getElementById('successChart')?.getContext('2d');
        if (successCtx) {
            this.successChart = new Chart(successCtx, {
                type: 'bar',
                data: {
                    labels: ['Academic Support', 'Counseling', 'Financial Aid', 'Mentorship'],
                    datasets: [{
                        label: 'Success Rate',
                        data: [75, 82, 68, 89],
                        backgroundColor: 'rgba(59, 130, 246, 0.5)',
                        borderColor: 'rgb(59, 130, 246)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }

    updateMapData() {
        // Add markers to the map
        const sampleData = [
            { lat: 28.6139, lng: 77.2090, name: 'Delhi', rate: 15 },
            { lat: 19.0760, lng: 72.8777, name: 'Mumbai', rate: 12 },
            { lat: 13.0827, lng: 80.2707, name: 'Chennai', rate: 8 }
        ];

        sampleData.forEach(location => {
            L.marker([location.lat, location.lng])
                .bindPopup(`<b>${location.name}</b><br>Dropout Rate: ${location.rate}%`)
                .addTo(this.map);
        });
    }

    changeMapView(view) {
        // Implementation for switching between district and school view
        console.log('Changing map view to:', view);
        // Update map markers and layers based on view
    }

    filterRiskStudents(risk) {
        // Implementation for filtering students by risk level
        console.log('Filtering students by risk:', risk);
        this.loadData(); // Reload with filter
    }

    updateTrendChart(period) {
        // Update trend chart based on selected period
        const data = this.getTrendData(period);
        this.trendChart.data.labels = data.labels;
        this.trendChart.data.datasets[0].data = data.values;
        this.trendChart.update();
    }

    async getTrendData(period) {
        return await dataService.getTrendData(period);
    }

    async generateReport() {
        try {
            const reportType = document.querySelector('select[name="reportType"]')?.value;
            const timePeriod = document.querySelector('select[name="timePeriod"]')?.value;
            
            // Simulate report generation
            this.showNotification('Generating report...', 'info');
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showNotification('Report generated successfully!', 'success');
            
            // Trigger download
            const blob = new Blob(['Report content'], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dropout_report_${new Date().toISOString().split('T')[0]}.pdf`;
            a.click();
        } catch (error) {
            console.error('Error generating report:', error);
            this.showNotification('Failed to generate report', 'error');
        }
    }

    async handleFileImport(file) {
        if (!file) return;

        try {
            this.showNotification('Importing data...', 'info');
            // Simulate file processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showNotification('Data imported successfully!', 'success');
            this.loadData(); // Reload dashboard data
        } catch (error) {
            console.error('Error importing file:', error);
            this.showNotification('Failed to import data', 'error');
        }
    }

    async syncData() {
        try {
            this.showNotification('Syncing data...', 'info');
            // Simulate sync process
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.showNotification('Data synced successfully!', 'success');
            this.loadData(); // Reload dashboard data
        } catch (error) {
            console.error('Error syncing data:', error);
            this.showNotification('Failed to sync data', 'error');
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `
            fixed bottom-4 right-4 p-4 rounded-lg shadow-lg
            ${type === 'error' ? 'bg-red-500' : type === 'success' ? 'bg-green-500' : 'bg-blue-500'}
            text-white
        `;
        notification.textContent = message;

        container.appendChild(notification);
        setTimeout(() => notification.remove(), 5000);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});
