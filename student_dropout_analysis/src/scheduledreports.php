<?php
session_start();
header("Content-Type: text/html; charset=UTF-8");

$scheduledPrograms = [
    ["name" => "Remedial Classes", "students" => 245, "rating" => 4.8, "icon" => "📚", "description" => "Extra classes to help students catch up with their academic work"],
    ["name" => "Peer Tutoring Programs", "students" => 178, "rating" => 4.8, "icon" => "👥", "description" => "Students helping other students learn and grow"],
    ["name" => "After-School Study Sessions", "students" => 156, "rating" => 4.8, "icon" => "⏰", "description" => "Supervised study time after regular school hours"],
    ["name" => "Counseling and Mentorship", "students" => 312, "rating" => 4.8, "icon" => "🤝", "description" => "One-on-one guidance and support for students"],
    ["name" => "Social-Emotional Learning", "students" => 198, "rating" => 4.8, "icon" => "❤️", "description" => "Programs to enhance emotional and social skills"],
    ["name" => "Anger Management & Conflict", "students" => 134, "rating" => 4.8, "icon" => "🕊️", "description" => "Techniques to manage anger and resolve conflicts"],
    ["name" => "Academic Workshops", "students" => 210, "rating" => 4.7, "icon" => "🎓", "description" => "Workshops to improve academic performance"],
    ["name" => "Group Study Circles", "students" => 167, "rating" => 4.7, "icon" => "👥", "description" => "Collaborative study groups for peer learning"]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scheduled Reports</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</head>
<body class="bg-gray-50 min-h-screen">
    <nav class="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Scheduled Programs</h1>
            <a href="http://localhost/INT219&220/student_dropout_analysis/src/reports.html" class="text-white hover:text-gray-200">Back to Dashboard</a>
        </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($scheduledPrograms as $index => $program): ?>
            <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeInUp animate__delay-<?php echo $index * 0.2; ?>s" style="animation-fill-mode: both;">
                <div class="text-4xl mb-4"><?php echo htmlspecialchars($program['icon']); ?></div>
                <h3 class="text-xl font-semibold text-gray-800"><?php echo htmlspecialchars($program['name']); ?></h3>
                <p class="text-gray-600 mb-2"><?php echo htmlspecialchars($program['description']); ?></p>
                <div class="flex justify-between items-center mt-2">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        <?php echo $program['students']; ?> Students
                    </span>
                    <div class="flex items-center">
                        <span class="text-yellow-500">★</span>
                        <span class="ml-1 text-gray-600"><?php echo $program['rating']; ?></span>
                    </div>
                </div>
                <a href="#" class="mt-4 inline-block text-blue-600 hover:text-blue-800">View Details →</a>
            </div>
            <?php endforeach; ?>
        </div>
    </main>

    <script src="https://cdn.tailwindcss.com"></script>
</body>
</html>