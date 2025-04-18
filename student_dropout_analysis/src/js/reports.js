document.addEventListener('DOMContentLoaded', function() {
    loadReports();
    setupEventListeners();
});

function setupEventListeners() {
    // Generate Report Modal
    const modal = document.getElementById('reportModal');
    const openModalBtn = document.getElementById('generateReportBtn');
    const closeModalBtn = document.getElementById('cancelBtn');
    const form = document.getElementById('reportForm');

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
        generateReport(Object.fromEntries(formData));
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    // Export buttons
    document.getElementById('exportPDF')?.addEventListener('click', () => {
        exportReport('pdf');
    });

    document.getElementById('exportExcel')?.addEventListener('click', () => {
        exportReport('excel');
    });

    // Filter functionality
    const filterSelect = document.querySelector('select[name="filter"]');
    filterSelect?.addEventListener('change', (e) => {
        filterReports(e.target.value);
    });
}

function loadReports() {
    // Sample data - replace with actual API call
    const reports = [
        {
            name: 'Weekly Dropout Analysis',
            type: 'weekly',
            date: '2025-04-15',
            status: 'completed'
        },
        {
            name: 'Monthly Progress Report',
            type: 'monthly',
            date: '2025-04-01',
            status: 'completed'
        },
        {
            name: 'Risk Assessment Report',
            type: 'weekly',
            date: '2025-04-14',
            status: 'processing'
        }
    ];

    renderReports(reports);
}

function renderReports(reports) {
    const container = document.getElementById('reportsTable');
    if (!container) return;

    container.innerHTML = reports.map(report => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${report.name}</div>
                <div class="text-sm text-gray-500">${report.type}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    ${report.status}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${report.date}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-4">View</button>
                <button class="text-red-600 hover:text-red-900">Delete</button>
            </td>
        </tr>
    `).join('');
}

function generateReport(data) {
    // Implement report generation
    console.log('Generating report:', data);
    showToast('Report generation started');
}

function exportReport(format) {
    // Implement export functionality
    console.log('Exporting report as:', format);
    showToast(`Report exported as ${format.toUpperCase()}`);
}

function filterReports(filter) {
    // Implement filter functionality
    console.log('Filtering reports by:', filter);
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
