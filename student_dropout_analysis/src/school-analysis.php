<?php
require_once './config/config.php';
include './components/header.php';

// Fetch school-wise statistics
$query = "SELECT 
            s.name as school_name,
            COUNT(st.id) as total_students,
            SUM(st.dropout_status) as dropout_count,
            (SUM(st.dropout_status) / COUNT(st.id)) * 100 as dropout_rate
          FROM schools s
          LEFT JOIN students st ON s.id = st.school_id
          GROUP BY s.id
          ORDER BY dropout_rate DESC";

$result = $conn->query($query);
$schools = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $schools[] = $row;
    }
}
?>

<main class="container mx-auto px-6 py-8">
    <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">School-wise Dropout Analysis</h1>
        <p class="text-gray-600">Detailed analysis of dropout rates across different schools.</p>
    </div>

    <!-- School Statistics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Dropout Rate Chart -->
        <div class="card">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Dropout Rates by School</h3>
            <canvas id="schoolDropoutChart"></canvas>
        </div>

        <!-- Top Schools with Highest Dropout Rates -->
        <div class="card">
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Schools with Highest Dropout Rates</h3>
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropout Rate</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Dropouts</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <?php foreach (array_slice($schools, 0, 5) as $school): ?>
                        <tr>
                            <td class="px-6 py-4 whitespace-nowrap"><?php echo htmlspecialchars($school['school_name']); ?></td>
                            <td class="px-6 py-4 whitespace-nowrap"><?php echo number_format($school['dropout_rate'], 2); ?>%</td>
                            <td class="px-6 py-4 whitespace-nowrap"><?php echo $school['dropout_count']; ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Detailed School Analysis -->
    <div class="card">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Comprehensive School Analysis</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Students</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropouts</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dropout Rate</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <?php foreach ($schools as $school): ?>
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap"><?php echo htmlspecialchars($school['school_name']); ?></td>
                        <td class="px-6 py-4 whitespace-nowrap"><?php echo $school['total_students']; ?></td>
                        <td class="px-6 py-4 whitespace-nowrap"><?php echo $school['dropout_count']; ?></td>
                        <td class="px-6 py-4 whitespace-nowrap"><?php echo number_format($school['dropout_rate'], 2); ?>%</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button class="text-primary hover:text-primary-dark"
                                    onclick="viewSchoolDetails('<?php echo htmlspecialchars($school['school_name']); ?>')">
                                View Details
                            </button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
</main>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Prepare data for chart
    const schools = <?php echo json_encode($schools); ?>;
    const labels = schools.map(school => school.school_name);
    const dropoutRates = schools.map(school => school.dropout_rate);

    // Create chart
    const ctx = document.getElementById('schoolDropoutChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Dropout Rate (%)',
                data: dropoutRates,
                backgroundColor: 'rgba(26, 86, 219, 0.5)',
                borderColor: 'rgb(26, 86, 219)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'School-wise Dropout Rates'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Dropout Rate (%)'
                    }
                }
            }
        }
    });
});

function viewSchoolDetails(schoolName) {
    // Implement school details view functionality
    alert(`Viewing details for ${schoolName}`);
    // You can implement a modal or redirect to a detailed view page
}
</script>

<?php include './components/footer.php'; ?>
