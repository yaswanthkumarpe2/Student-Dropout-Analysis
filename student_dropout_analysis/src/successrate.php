<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Success Rate Analysis - Student Analysis</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #F59E0B, #D97706);
        }
        .metric-card {
            transition: transform 0.2s;
        }
        .metric-card:hover {
            transform: translateY(-5px);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="gradient-bg text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="interventions.html" class="text-white hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                    </a>
                    <h1 class="text-2xl font-bold">Success Rate Analysis</h1>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
        <!-- Overall Success Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow-lg p-6 metric-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-amber-500 bg-amber-50 p-3 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                    </div>
                    <span class="text-green-500 text-sm font-medium">↑ 12%</span>
                </div>
                <h3 class="text-gray-500 text-sm uppercase">Overall Success Rate</h3>
                <p class="text-3xl font-bold text-gray-900">78.5%</p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6 metric-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-emerald-500 bg-emerald-50 p-3 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                    </div>
                    <span class="text-green-500 text-sm font-medium">↑ 8%</span>
                </div>
                <h3 class="text-gray-500 text-sm uppercase">Student Retention</h3>
                <p class="text-3xl font-bold text-gray-900">92%</p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6 metric-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-blue-500 bg-blue-50 p-3 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                        </svg>
                    </div>
                    <span class="text-green-500 text-sm font-medium">↑ 15%</span>
                </div>
                <h3 class="text-gray-500 text-sm uppercase">Academic Progress</h3>
                <p class="text-3xl font-bold text-gray-900">85%</p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6 metric-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-purple-500 bg-purple-50 p-3 rounded-full">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>
                        </svg>
                    </div>
                    <span class="text-green-500 text-sm font-medium">↑ 10%</span>
                </div>
                <h3 class="text-gray-500 text-sm uppercase">Program Completion</h3>
                <p class="text-3xl font-bold text-gray-900">82%</p>
            </div>
        </div>

        <!-- Success Rate by Program -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Success Rate by Program</h2>
                <canvas id="programChart"></canvas>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4">Monthly Progress Trend</h2>
                <canvas id="trendChart"></canvas>
            </div>
        </div>

        <!-- Key Success Factors -->
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Key Success Factors</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-4">
                    <h3 class="font-medium text-gray-800">Student Engagement</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                    High Impact
                                </span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-semibold inline-block text-green-600">
                                    90%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                            <div style="width:90%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-medium text-gray-800">Regular Attendance</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                    Significant
                                </span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-semibold inline-block text-blue-600">
                                    85%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                            <div style="width:85%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="font-medium text-gray-800">Program Participation</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                                    Moderate
                                </span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs font-semibold inline-block text-purple-600">
                                    78%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                            <div style="width:78%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <script>
        // Initialize charts when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Program Success Rate Chart
            const programCtx = document.getElementById('programChart').getContext('2d');
            new Chart(programCtx, {
                type: 'bar',
                data: {
                    labels: ['Remedial', 'Peer Tutoring', 'After-School', 'Counseling', 'SEL', 'Career Guidance'],
                    datasets: [{
                        label: 'Success Rate (%)',
                        data: [85, 82, 78, 88, 75, 80],
                        backgroundColor: 'rgba(245, 158, 11, 0.5)',
                        borderColor: 'rgba(217, 119, 6, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });

            // Monthly Progress Trend Chart
            const trendCtx = document.getElementById('trendChart').getContext('2d');
            new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Success Rate (%)',
                        data: [65, 68, 72, 75, 78, 78.5],
                        borderColor: 'rgba(245, 158, 11, 1)',
                        tension: 0.4,
                        fill: true,
                        backgroundColor: 'rgba(245, 158, 11, 0.1)'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        });
    </script>
</body>
</html>
