<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intervention Programs - Student Analysis</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #10B981, #059669);
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
                    <a href="interventions.html" class="text-white hover:text-gray-200">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                    </a>
                    <h1 class="text-2xl font-bold">Active Intervention Programs</h1>
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
                        <p class="text-3xl font-bold text-gray-900">12</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Active Students</p>
                        <p class="text-3xl font-bold text-gray-900">1,284</p>
                    </div>
                    <div class="text-center">
                        <p class="text-gray-500 text-sm uppercase">Success Rate</p>
                        <p class="text-3xl font-bold text-emerald-600">78.5%</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Programs Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php
            $programs = [
                [
                    'name' => 'Remedial Classes',
                    'icon' => '📚',
                    'color' => 'blue',
                    'students' => 245,
                    'description' => 'Extra classes to help students catch up with their academic work'
                ],
                [
                    'name' => 'Peer Tutoring Programs',
                    'icon' => '👥',
                    'color' => 'indigo',
                    'students' => 178,
                    'description' => 'Students helping other students learn and grow'
                ],
                [
                    'name' => 'After-School Study Sessions',
                    'icon' => '⏰',
                    'color' => 'purple',
                    'students' => 156,
                    'description' => 'Supervised study time after regular school hours'
                ],
                [
                    'name' => 'Counseling and Mentorship',
                    'icon' => '🤝',
                    'color' => 'pink',
                    'students' => 312,
                    'description' => 'One-on-one guidance and support for students'
                ],
                [
                    'name' => 'Social-Emotional Learning',
                    'icon' => '❤️',
                    'color' => 'red',
                    'students' => 198,
                    'description' => 'Programs focusing on emotional intelligence and social skills'
                ],
                [
                    'name' => 'Anger Management & Conflict Resolution',
                    'icon' => '🕊️',
                    'color' => 'orange',
                    'students' => 134,
                    'description' => 'Workshops for better emotional control and conflict resolution'
                ],
                [
                    'name' => 'Career Guidance and Counseling',
                    'icon' => '🎯',
                    'color' => 'amber',
                    'students' => 267,
                    'description' => 'Professional guidance for future career paths'
                ],
                [
                    'name' => 'Life Skills Training',
                    'icon' => '🌟',
                    'color' => 'yellow',
                    'students' => 189,
                    'description' => 'Essential skills for personal and professional success'
                ],
                [
                    'name' => 'Parent Engagement Programs',
                    'icon' => '👨‍👩‍👧‍👦',
                    'color' => 'lime',
                    'students' => 145,
                    'description' => 'Involving parents in student education and development'
                ],
                [
                    'name' => 'Community Partnership Programs',
                    'icon' => '🤲',
                    'color' => 'green',
                    'students' => 167,
                    'description' => 'Collaborating with local communities for student success'
                ],
                [
                    'name' => 'Health & Nutrition Awareness',
                    'icon' => '🥗',
                    'color' => 'emerald',
                    'students' => 223,
                    'description' => 'Programs promoting healthy lifestyle choices'
                ],
                [
                    'name' => 'Physical Education & Sports',
                    'icon' => '⚽',
                    'color' => 'teal',
                    'students' => 256,
                    'description' => 'Sports and physical activities for overall development'
                ]
            ];

            foreach ($programs as $program) {
                echo '<div class="program-card bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-4xl">' . $program['icon'] . '</span>
                            <span class="text-sm font-medium px-3 py-1 rounded-full bg-' . $program['color'] . '-100 text-' . $program['color'] . '-800">
                                ' . $program['students'] . ' Students
                            </span>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">' . $program['name'] . '</h3>
                        <p class="text-gray-600 text-sm">' . $program['description'] . '</p>
                        <div class="mt-4 flex justify-between items-center">
                            <button class="text-' . $program['color'] . '-600 hover:text-' . $program['color'] . '-700 text-sm font-medium">
                                View Details →
                            </button>
                            <div class="flex items-center space-x-1">
                                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                                <span class="text-sm font-medium text-gray-600">4.8</span>
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
