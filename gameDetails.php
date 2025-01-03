<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$config = require 'api/config.php'; // Correctly include and assign the config file

$gameId = $_GET['id'] ?? '';

if (empty($gameId)) {
    echo "<h1>Error: Game ID is required</h1>";
    echo '<a href="index.php">Back to Search</a>';
    exit;
}

// RAWG API Key and Base URL
$apiKey = $config['RAWG_API_KEY'];
$baseUrl = $config['RAWG_BASE_URL']; // Fetch from the config array

// Build the API URL for the game details
$apiUrl = "{$baseUrl}/{$gameId}?key={$apiKey}";

// Fetch data from the API
$response = @file_get_contents($apiUrl);

if ($response === false) {
    echo "<h1>Error: Failed to fetch game details</h1>";
    echo '<a href="index.php">Back to Search</a>';
    exit;
}

// Decode the JSON response
$data = json_decode($response, true);

if (!isset($data['id'])) {
    echo "<h1>Error: Game details not found</h1>";
    echo '<a href="index.php">Back to Search</a>';
    exit;
}

// Render game details
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($data['name']); ?> - Game Details</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="card">
            <img src="<?php echo htmlspecialchars($data['background_image']); ?>" class="card-img-top" alt="<?php echo htmlspecialchars($data['name']); ?>">
            <div class="card-body">
                <h1 class="card-title"><?php echo htmlspecialchars($data['name']); ?></h1>
                <p><strong>Description:</strong> <?php echo htmlspecialchars($data['description_raw'] ?? 'No description available'); ?></p>
                <p><strong>Released:</strong> <?php echo htmlspecialchars($data['released'] ?? 'Unknown'); ?></p>
                <p><strong>Rating:</strong> <?php echo htmlspecialchars($data['rating'] ?? 'Not rated'); ?></p>
                <a href="index.php" class="btn btn-secondary">Back to Search</a>
            </div>
        </div>
    </div>
</body>
</html>
