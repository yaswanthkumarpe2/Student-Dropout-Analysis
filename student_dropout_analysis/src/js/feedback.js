// Feedback Data Storage
let feedbackData = {
    teacher: [],
    student: [],
    parent: []
};

// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize feedback chart
    const ctx = document.getElementById('feedbackChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Academic', 'Financial', 'Transportation', 'Family', 'Health'],
            datasets: [{
                label: 'Issues Reported',
                data: [12, 19, 8, 15, 10],
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
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Feedback Analysis'
                }
            }
        }
    });

    // Initialize form handlers
    initializeForms();
    updateInsights();
});

// Dialog Functions
function showDialog(title, content) {
    const dialog = document.getElementById('feedbackDialog');
    const dialogTitle = document.getElementById('dialogTitle');
    const dialogContent = document.getElementById('dialogContent');

    dialogTitle.textContent = title;
    dialogContent.innerHTML = content;
    dialog.classList.remove('hidden');
    dialog.classList.add('flex');
}

function closeDialog() {
    const dialog = document.getElementById('feedbackDialog');
    dialog.classList.remove('flex');
    dialog.classList.add('hidden');
}

// Display Feedback
function displayFeedback(type, data) {
    const listId = `${type}FeedbackList`;
    const list = document.getElementById(listId);
    if (!list) return;

    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'bg-gray-50 p-3 rounded border border-l-4 transform transition-all duration-300 hover:scale-102';

    // Add appropriate border color based on type
    switch(type) {
        case 'teacher':
            feedbackItem.className += ' border-l-blue-500';
            break;
        case 'student':
            feedbackItem.className += ' border-l-green-500';
            break;
        case 'parent':
            feedbackItem.className += ' border-l-purple-500';
            break;
    }

    const timestamp = new Date().toLocaleString();
    let content = '';
    
    switch(type) {
        case 'teacher':
            content = `
                <div class="flex justify-between items-start mb-2">
                    <p class="font-medium text-blue-600">Student: ${data.studentName || 'N/A'}</p>
                    <span class="text-xs text-gray-500">${timestamp}</span>
                </div>
                <p><span class="font-medium">Performance:</span> ${data.academicPerformance || 'N/A'}</p>
                <p><span class="font-medium">Attendance:</span> ${data.attendance || 0}%</p>
                <p class="text-sm text-gray-600 mt-2 italic">${data.recommendations || 'No recommendations provided'}</p>
            `;
            break;
        case 'student':
            const challengesList = Array.isArray(data.challenges) ? 
                data.challenges.map(c => `<span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">${c}</span>`).join('') :
                '<span class="text-gray-500">No challenges selected</span>';

            content = `
                <div class="flex justify-between items-start mb-2">
                    <p class="font-medium text-green-600">Student Survey</p>
                    <span class="text-xs text-gray-500">${timestamp}</span>
                </div>
                <div class="mb-2">
                    <p class="font-medium mb-1">Challenges:</p>
                    <div class="flex flex-wrap">${challengesList}</div>
                </div>
                <p class="mb-2"><span class="font-medium">Support Needed:</span> ${data.supportNeeded || 'N/A'}</p>
                <div class="flex items-center">
                    <span class="font-medium mr-2">Satisfaction:</span>
                    <div class="flex items-center">
                        ${"★".repeat(data.satisfaction)}${"☆".repeat(5-data.satisfaction)}
                        <span class="ml-1 text-sm text-gray-600">(${data.satisfaction}/5)</span>
                    </div>
                </div>
            `;
            break;
        case 'parent':
            content = `
                <div class="flex justify-between items-start mb-2">
                    <p class="font-medium text-purple-600">Student: ${data.studentName || 'N/A'}</p>
                    <span class="text-xs text-gray-500">${timestamp}</span>
                </div>
                <div class="bg-purple-50 p-2 rounded mb-2">
                    <p class="font-medium">Concerns:</p>
                    <p class="text-sm text-gray-600">${data.concerns || 'No concerns provided'}</p>
                </div>
                <div class="bg-purple-50 p-2 rounded">
                    <p class="font-medium">Suggestions:</p>
                    <p class="text-sm text-gray-600">${data.suggestions || 'No suggestions provided'}</p>
                </div>
            `;
            break;
    }

    feedbackItem.innerHTML = content;

    // Add with fade-in animation
    feedbackItem.style.opacity = '0';
    list.insertBefore(feedbackItem, list.firstChild);
    
    // Trigger animation
    setTimeout(() => {
        feedbackItem.style.opacity = '1';
    }, 10);

    // Limit displayed items with fade-out animation
    if (list.children.length > 5) {
        const lastChild = list.lastChild;
        lastChild.style.opacity = '0';
        setTimeout(() => {
            list.removeChild(lastChild);
        }, 300);
    }
}

// Form Handlers
function initializeForms() {
    // Teacher Feedback Form
    document.getElementById('teacherFeedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const feedback = {
            timestamp: new Date(),
            type: 'teacher',
            data: data
        };
        feedbackData.teacher.push(feedback);
        updateAnalysis();
        displayFeedback('teacher', data);
        showDialog('Teacher Feedback Submitted', `
            <p>Thank you for submitting feedback for ${data.studentName}.</p>
            <p class="mt-2">Your recommendations have been recorded and will be reviewed by the administration.</p>
        `);
        e.target.reset();
    });

    // Student Survey Form
    document.getElementById('studentSurveyForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {};
        
        // Handle multiple select values
        const challenges = Array.from(e.target.querySelector('[name="challenges"]').selectedOptions)
            .map(option => option.value);
        
        // Build data object
        formData.forEach((value, key) => {
            if (key !== 'challenges') {
                data[key] = value;
            }
        });
        data.challenges = challenges;

        const feedback = {
            timestamp: new Date(),
            type: 'student',
            data: data
        };
        feedbackData.student.push(feedback);
        updateAnalysis();
        displayFeedback('student', data);
        showDialog('Student Survey Submitted', `
            <p>Thank you for completing the survey.</p>
            <p class="mt-2">Your feedback will help us improve our support services.</p>
        `);
        e.target.reset();
    });

    // Parent Feedback Form
    document.getElementById('parentFeedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const feedback = {
            timestamp: new Date(),
            type: 'parent',
            data: data
        };
        feedbackData.parent.push(feedback);
        updateAnalysis();
        displayFeedback('parent', data);
        showDialog('Parent Feedback Submitted', `
            <p>Thank you for submitting feedback for ${data.studentName}.</p>
            <p class="mt-2">Your concerns and suggestions have been recorded.</p>
        `);
        e.target.reset();
    });
}

// Update Analysis
function updateAnalysis() {
    // Update charts and insights based on new data
    updateCharts();
    updateInsights();
}

// Update Insights
function updateInsights() {
    const insightsList = document.getElementById('feedbackInsights');
    const insights = generateInsights();
    
    insightsList.innerHTML = insights.map(insight => 
        `<li class="flex items-center">
            <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            ${insight}
        </li>`
    ).join('');
}

// Generate Insights
function generateInsights() {
    return [
        'Most common issues: Financial and Transportation',
        'Teacher satisfaction rate: 85%',
        'Parent engagement increased by 25%',
        'Student feedback shows improvement in support services',
        'Areas needing attention: Academic support and counseling'
    ];
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

// Export Data
function exportFeedbackData() {
    const dataStr = JSON.stringify(feedbackData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'feedback_data.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
