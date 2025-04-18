<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrolled Students - Student Analysis</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Add jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Add DataTables -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.js"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #10B981, #059669);
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
                    <h1 class="text-2xl font-bold">Enrolled Students (248)</h1>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
        <!-- Stats Overview -->
        <div class="mb-8">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Total Enrolled</p>
                        <p class="text-3xl font-bold text-gray-900">248</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Active in Programs</p>
                        <p class="text-3xl font-bold text-emerald-600">186</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Attendance Rate</p>
                        <p class="text-3xl font-bold text-blue-600">92%</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Progress Rate</p>
                        <p class="text-3xl font-bold text-purple-600">85%</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Students Table -->
        <div class="bg-white rounded-lg shadow-lg p-6">
            <table id="studentsTable" class="w-full">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Programs Enrolled</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data will be populated by JavaScript -->
                </tbody>
            </table>
        </div>
    </main>

    <script>
        // First names and last names for random generation
        const firstNames = ['Aarav', 'Aditi', 'Arjun', 'Anaya', 'Dev', 'Diya', 'Ishaan', 'Isha', 'Kabir', 'Kiara', 
                          'Laksh', 'Mira', 'Neil', 'Neha', 'Om', 'Pari', 'Rehan', 'Riya', 'Samar', 'Sara'];
        const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Verma', 'Gupta', 'Shah', 'Mehta', 'Joshi', 'Reddy'];
        const programs = [
            'Remedial Classes',
            'Peer Tutoring',
            'After-School Study',
            'Counseling',
            'SEL Program',
            'Career Guidance',
            'Life Skills',
            'Sports Program'
        ];

        // Generate random student data
        function generateStudents() {
            const students = [];
            for (let i = 0; i < 248; i++) {
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const className = Math.floor(Math.random() * 4) + 9; // Classes 9-12
                const numPrograms = Math.floor(Math.random() * 3) + 1; // 1-3 programs per student
                const attendance = Math.floor(Math.random() * 21) + 80; // 80-100%
                const progress = Math.floor(Math.random() * 31) + 70; // 70-100%

                // Randomly select programs
                const enrolledPrograms = [];
                while (enrolledPrograms.length < numPrograms) {
                    const program = programs[Math.floor(Math.random() * programs.length)];
                    if (!enrolledPrograms.includes(program)) {
                        enrolledPrograms.push(program);
                    }
                }

                students.push({
                    name: `${firstName} ${lastName}`,
                    class: className,
                    programs: enrolledPrograms,
                    attendance: attendance,
                    progress: progress,
                    status: progress >= 85 ? 'Excellent' : progress >= 75 ? 'Good' : 'Needs Attention'
                });
            }
            return students;
        }

        // Initialize DataTable with generated data
        $(document).ready(function() {
            const students = generateStudents();
            $('#studentsTable').DataTable({
                data: students,
                columns: [
                    { 
                        data: 'name',
                        render: function(data) {
                            return `<div class="font-medium text-gray-900">${data}</div>`;
                        }
                    },
                    { 
                        data: 'class',
                        render: function(data) {
                            return `Class ${data}`;
                        }
                    },
                    { 
                        data: 'programs',
                        render: function(data) {
                            return data.map(program => 
                                `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">${program}</span>`
                            ).join('');
                        }
                    },
                    { 
                        data: 'attendance',
                        render: function(data) {
                            const color = data >= 90 ? 'green' : data >= 80 ? 'yellow' : 'red';
                            return `<div class="flex items-center">
                                <div class="w-16">${data}%</div>
                                <div class="w-24 h-2 bg-gray-200 rounded-full ml-2">
                                    <div class="h-2 bg-${color}-500 rounded-full" style="width: ${data}%"></div>
                                </div>
                            </div>`;
                        }
                    },
                    { 
                        data: 'progress',
                        render: function(data) {
                            const color = data >= 85 ? 'green' : data >= 75 ? 'yellow' : 'red';
                            return `<div class="flex items-center">
                                <div class="w-16">${data}%</div>
                                <div class="w-24 h-2 bg-gray-200 rounded-full ml-2">
                                    <div class="h-2 bg-${color}-500 rounded-full" style="width: ${data}%"></div>
                                </div>
                            </div>`;
                        }
                    },
                    { 
                        data: 'status',
                        render: function(data) {
                            const colors = {
                                'Excellent': 'green',
                                'Good': 'yellow',
                                'Needs Attention': 'red'
                            };
                            return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${colors[data]}-100 text-${colors[data]}-800">
                                ${data}
                            </span>`;
                        }
                    }
                ],
                pageLength: 25,
                order: [[4, 'desc']], // Sort by progress by default
                responsive: true,
                language: {
                    search: "Search students:",
                    lengthMenu: "Show _MENU_ students per page",
                    info: "Showing _START_ to _END_ of _TOTAL_ enrolled students"
                }
            });
        });
    </script>
</body>
</html>
