<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Active Programs - Student Analysis</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #6366F1, #4F46E5);
        }
        .program-card {
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .program-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="gradient-bg text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <a href="analytics.html" class="text-white hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                    </a>
                    <h1 class="text-2xl font-bold">Active Programs</h1>
                </div>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-8">
        <!-- Stats Overview -->
        <div class="mb-8">
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Total Programs</p>
                        <p class="text-3xl font-bold text-gray-900">8</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Active Students</p>
                        <p class="text-3xl font-bold text-gray-900">1,284</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Average Success Rate</p>
                        <p class="text-3xl font-bold text-gray-900">73.2%</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Programs Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php
            $programs = [
                [
                    'name' => 'Python',
                    'icon' => '🐍',
                    'students' => 245,
                    'success_rate' => 65,
                    'color' => 'blue'
                ],
                [
                    'name' => 'Java',
                    'icon' => '☕',
                    'students' => 198,
                    'success_rate' => 78,
                    'color' => 'red'
                ],
                [
                    'name' => 'C++',
                    'icon' => '⚡',
                    'students' => 156,
                    'success_rate' => 77,
                    'color' => 'purple'
                ],
                [
                    'name' => 'HTML',
                    'icon' => '🌐',
                    'students' => 312,
                    'success_rate' => 90,
                    'color' => 'orange'
                ],
                [
                    'name' => 'R Language',
                    'icon' => '📊',
                    'students' => 89,
                    'success_rate' => 88,
                    'color' => 'blue'
                ],
                [
                    'name' => 'MySQL',
                    'icon' => '🗄️',
                    'students' => 134,
                    'success_rate' => 62,
                    'color' => 'indigo'
                ],
                [
                    'name' => 'DSA',
                    'icon' => '🔍',
                    'students' => 267,
                    'success_rate' => 52,
                    'color' => 'green'
                ],
                [
                    'name' => 'C',
                    'icon' => '⚙️',
                    'students' => 178,
                    'success_rate' => 78,
                    'color' => 'gray'
                ]
            ];

            foreach ($programs as $program) {
                echo '<div class="program-card bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-4xl">' . $program['icon'] . '</span>
                            <span class="text-sm font-medium px-2.5 py-0.5 rounded-full bg-' . $program['color'] . '-100 text-' . $program['color'] . '-800">
                                ' . $program['success_rate'] . '% Success
                            </span>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">' . $program['name'] . '</h3>
                        <p class="text-gray-500 text-sm">
                            ' . $program['students'] . ' Active Students
                        </p>
                        <div class="mt-4">
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-' . $program['color'] . '-500 h-2 rounded-full" style="width: ' . $program['success_rate'] . '%"></div>
                            </div>
                        </div>
                    </div>
                </div>';
            }
            ?>
        </div>
    </main>
</body>
</html>
