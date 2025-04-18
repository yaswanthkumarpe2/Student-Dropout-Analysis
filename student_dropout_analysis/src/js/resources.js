// Resource Management System
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeResourceForm();
});

// Initialize Charts
function initializeCharts() {
    // Budget Allocation Chart
    const budgetCtx = document.getElementById('budgetChart').getContext('2d');
    new Chart(budgetCtx, {
        type: 'doughnut',
        data: {
            labels: ['Counseling', 'Transportation', 'Academic Support', 'Infrastructure', 'Other'],
            datasets: [{
                data: [30, 25, 20, 15, 10],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Budget Distribution (%)'
                }
            }
        }
    });

    // Resource Effectiveness Chart
    const effectivenessCtx = document.getElementById('effectivenessChart').getContext('2d');
    new Chart(effectivenessCtx, {
        type: 'radar',
        data: {
            labels: ['Impact', 'Cost Efficiency', 'Utilization', 'Satisfaction', 'Sustainability'],
            datasets: [{
                label: 'Counseling Services',
                data: [85, 75, 90, 80, 70],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }, {
                label: 'Transportation',
                data: [75, 85, 65, 75, 80],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Resource Effectiveness Analysis'
                }
            }
        }
    });
}

// Resource Form Handler
function initializeResourceForm() {
    const resourceForm = document.getElementById('resourceForm');
    if (resourceForm) {
        resourceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            addNewResource(Object.fromEntries(formData.entries()));
            e.target.reset();
            showNotification('Resource added successfully!');
        });
    }
}

// Add New Resource
function addNewResource(resourceData) {
    // Add to resource tracking table
    const tableBody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${resourceData.name}</td>
        <td class="px-6 py-4 whitespace-nowrap">₹${resourceData.budget}</td>
        <td class="px-6 py-4 whitespace-nowrap">₹0</td>
        <td class="px-6 py-4 whitespace-nowrap">0%</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                New
            </span>
        </td>
    `;
    
    tableBody.appendChild(newRow);
    updateBudgetAllocation(resourceData);
}

// Update Budget Allocation
function updateBudgetAllocation(newResource) {
    // Update budget chart with new allocation
    const budgetChart = Chart.getChart('budgetChart');
    if (budgetChart) {
        const data = budgetChart.data.datasets[0].data;
        // Update chart data based on new resource
        budgetChart.update();
    }
}

// Resource Effectiveness Tracking
function trackResourceEffectiveness(resourceId, metrics) {
    // Update effectiveness metrics
    const effectivenessChart = Chart.getChart('effectivenessChart');
    if (effectivenessChart) {
        // Update effectiveness data
        effectivenessChart.update();
    }
}

// Budget Management
function manageBudget(allocation) {
    const totalBudget = 5000000; // ₹50,00,000
    let remainingBudget = totalBudget;
    
    // Calculate remaining budget
    Object.values(allocation).forEach(amount => {
        remainingBudget -= amount;
    });
    
    return {
        total: totalBudget,
        allocated: totalBudget - remainingBudget,
        remaining: remainingBudget
    };
}

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export Resource Data
function exportResourceData() {
    const resourceData = {
        budget: manageBudget({}),
        resources: [], // Add resource data
        effectiveness: {} // Add effectiveness metrics
    };
    
    const dataStr = JSON.stringify(resourceData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'resource_data.json');
    linkElement.click();
}
