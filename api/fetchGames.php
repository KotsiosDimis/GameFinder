<?php
    header('Content-Type: application/json');

    // Load configuration
    $config = require 'config.php';

    // Access API key and base URL
    $apiKey = $config['RAWG_API_KEY'];
    $baseUrl = $config['RAWG_BASE_URL'];

    // Retrieve query parameters from the request
    $query = $_GET['query'] ?? '';
    $genre = $_GET['genre'] ?? '';
    $platform = $_GET['platform'] ?? '';
    $releaseDate = $_GET['release_date'] ?? '';

    // Build the RAWG API URL with filters
    $filters = [
        "key={$apiKey}",
        !empty($query) ? "search=" . urlencode($query) : null,
        !empty($genre) ? "genres=" . urlencode($genre) : null,
        !empty($platform) ? "platforms=" . urlencode($platform) : null,
        !empty($releaseDate) ? "dates=" . urlencode($releaseDate) : null,
    ];

    $filters = array_filter($filters); // Remove null values
    $apiUrl = $baseUrl . '?' . implode('&', $filters);

    // Fetch data from RAWG API
    $response = @file_get_contents($apiUrl); // Suppress warnings with @

    // Handle errors
    if ($response === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch data from RAWG API']);
        exit;
    }

    // Decode and check if results exist
    $data = json_decode($response, true);

    if (isset($data['results'])) {
        echo json_encode(['results' => $data['results']]);
    } else {
        echo json_encode(['results' => []]);
    }
?>