// Data Service for handling API calls and data management
class DataService {
    constructor() {
        this.baseUrl = '/api';
        this.mockData = {
            students: [
                {
                    id: 'ST2025001',
                    name: 'John Doe',
                    grade: '10',
                    attendance: 65,
                    academicScore: 'D',
                    interventions: 2,
                    riskLevel: 'high'
                },
                {
                    id: 'ST2025002',
                    name: 'Jane Smith',
                    grade: '11',
                    attendance: 78,
                    academicScore: 'C',
                    interventions: 1,
                    riskLevel: 'medium'
                }
            ],
            interventions: [
                {
                    id: 'INT001',
                    name: 'Academic Support Program',
                    enrolledCount: 5,
                    progress: 45,
                    status: 'In Progress'
                },
                {
                    id: 'INT002',
                    name: 'Counseling Sessions',
                    enrolledCount: 3,
                    progress: 75,
                    status: 'Active'
                }
            ],
            dropoutData: {
                trends: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    values: [12, 11, 14, 13, 9, 8]
                },
                regions: [
                    { id: 'R1', name: 'North', rate: 15 },
                    { id: 'R2', name: 'South', rate: 12 },
                    { id: 'R3', name: 'East', rate: 10 },
                    { id: 'R4', name: 'West', rate: 8 }
                ]
            }
        };
    }

    // Student related methods
    async getHighRiskStudents() {
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockData.students.filter(s => s.riskLevel === 'high'));
            }, 500);
        });
    }

    async getAllStudents() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockData.students);
            }, 500);
        });
    }

    // Intervention related methods
    async getActiveInterventions() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockData.interventions);
            }, 500);
        });
    }

    async createIntervention(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newIntervention = {
                    id: `INT${Math.floor(Math.random() * 1000)}`,
                    ...data,
                    status: 'Active',
                    progress: 0
                };
                this.mockData.interventions.push(newIntervention);
                resolve(newIntervention);
            }, 500);
        });
    }

    // Analytics related methods
    async getTrendData(period = '6months') {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockData.dropoutData.trends);
            }, 500);
        });
    }

    async getRegionalData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.mockData.dropoutData.regions);
            }, 500);
        });
    }

    // Report generation
    async generateReport(options) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    url: 'data:application/pdf;base64,mockedPdfContent',
                    filename: `dropout_report_${new Date().toISOString().split('T')[0]}.pdf`
                });
            }, 1500);
        });
    }

    // Data import/export
    async importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    // Validate and process data
                    this.mockData = { ...this.mockData, ...data };
                    resolve({ success: true, message: 'Data imported successfully' });
                } catch (error) {
                    reject(new Error('Invalid file format'));
                }
            };
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsText(file);
        });
    }

    async exportData(format = 'json') {
        return new Promise((resolve) => {
            setTimeout(() => {
                let content;
                let mimeType;
                let filename;

                switch (format) {
                    case 'csv':
                        content = this.convertToCSV(this.mockData);
                        mimeType = 'text/csv';
                        filename = 'dropout_data.csv';
                        break;
                    case 'excel':
                        content = this.convertToExcel(this.mockData);
                        mimeType = 'application/vnd.ms-excel';
                        filename = 'dropout_data.xlsx';
                        break;
                    default:
                        content = JSON.stringify(this.mockData, null, 2);
                        mimeType = 'application/json';
                        filename = 'dropout_data.json';
                }

                resolve({
                    content,
                    mimeType,
                    filename
                });
            }, 1000);
        });
    }

    // Utility methods
    convertToCSV(data) {
        // Implementation for converting data to CSV format
        return 'mock,csv,data';
    }

    convertToExcel(data) {
        // Implementation for converting data to Excel format
        return 'mock excel data';
    }
}

// Export as singleton
export const dataService = new DataService();
