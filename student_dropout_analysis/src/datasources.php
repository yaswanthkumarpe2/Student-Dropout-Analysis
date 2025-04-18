<?php
session_start();
header("Content-Type: text/html; charset=UTF-8");

$datasources = [
    ["name" => "Student Records DB", "type" => "database", "status" => "connected"],
    ["name" => "Attendance API", "type" => "api", "status" => "connected"],
    ["name" => "Demographic Data", "type" => "file", "status" => "connected"],
    ["name" => "Intervention Logs", "type" => "log", "status" => "connected"],
    ["name" => "Engagement Metrics", "type" => "api", "status" => "connected"]
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Sources</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
</head>
<body class="bg-gray-50 min-h-screen">
    <nav class="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Data Sources</h1>
            <a href="http://localhost/INT219&220/student_dropout_analysis/src/reports.html" class="text-white hover:text-gray-200">Back to Dashboard</a>
        </div>
    </nav>

    <main class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($datasources as $index => $source): ?>
            <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300 animate__animated animate__fadeIn animate__delay-<?php echo $index * 0.2; ?>s" style="animation-fill-mode: both;">
                <h3 class="text-xl font-semibold text-gray-800"><?php echo htmlspecialchars($source['name']); ?></h3>
                <p class="text-gray-600 mb-2">Type: <?php echo htmlspecialchars($source['type']); ?></p>
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    <?php echo htmlspecialchars($source['status']); ?>
                </span>
                <div class="mt-4">
                    <a href="#" class="text-blue-600 hover:text-blue-800 mr-3">View</a>
                    <a href="#" class="text-blue-600 hover:text-blue-800">Manage</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </main>

    <script src="https://cdn.tailwindcss.com"></script>
</body>
</html>