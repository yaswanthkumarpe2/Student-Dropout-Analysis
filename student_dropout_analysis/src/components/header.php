<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dropout Analysis System</title>
    <link href="../public/css/styles.css" rel="stylesheet">
    <script src="../src/js/main.js" defer></script>
</head>
<body class="bg-gray-100">
    <nav class="bg-primary text-white shadow-lg">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="text-xl font-bold">
                    Student Dropout Analysis
                </div>
                <div class="hidden md:flex space-x-6">
                    <a href="index.php" class="hover:text-gray-200">Dashboard</a>
                    <a href="school-analysis.php" class="hover:text-gray-200">School Analysis</a>
                    <a href="area-analysis.php" class="hover:text-gray-200">Area Analysis</a>
                    <a href="gender-analysis.php" class="hover:text-gray-200">Gender Analysis</a>
                    <a href="caste-analysis.php" class="hover:text-gray-200">Caste Analysis</a>
                    <a href="age-analysis.php" class="hover:text-gray-200">Age Analysis</a>
                </div>
                <button id="mobile-menu-button" class="md:hidden">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>
        <div id="mobile-menu" class="hidden md:hidden">
            <div class="px-4 py-3 space-y-2">
                <a href="index.php" class="block hover:text-gray-200">Dashboard</a>
                <a href="school-analysis.php" class="block hover:text-gray-200">School Analysis</a>
                <a href="area-analysis.php" class="block hover:text-gray-200">Area Analysis</a>
                <a href="gender-analysis.php" class="block hover:text-gray-200">Gender Analysis</a>
                <a href="caste-analysis.php" class="block hover:text-gray-200">Caste Analysis</a>
                <a href="age-analysis.php" class="block hover:text-gray-200">Age Analysis</a>
            </div>
        </div>
    </nav>
