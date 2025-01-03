<?php
    header('Content-Type: application/json');

    // Load configuration
    $config = require 'config.php';
    
    // RAWG API Key
    $apiKey = $config['RAWG_API_KEY'];
    

    // Retrieve query parameters
    $query = $_GET['query'] ?? '';
    $genre = $_GET['genre'] ?? '';
    $platform = $_GET['platform'] ?? '';
    $releaseDate = $_GET['release_date'] ?? '';

    // Build the RAWG API URL for autocomplete
    $filters = [
        "key={$apiKey}",
        !empty($query) ? "search=" . urlencode($query) : null,
        !empty($genre) ? "genres=" . urlencode($genre) : null,
        !empty($platform) ? "platforms=" . urlencode($platform) : null,
        !empty($releaseDate) ? "dates=" . urlencode($releaseDate) : null,
        "page_size=5" // Limit results for autocomplete
    ];

    $filters = array_filter($filters); // Remove null values
    $apiUrl = 'https://api.rawg.io/api/games?' . implode('&', $filters);

    // Fetch data from RAWG API
    $response = @file_get_contents($apiUrl); // Suppress warnings with @

    // Handle errors
    if ($response === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch data from RAWG API']);
        exit;
    }

    // Decode and return results
    $data = json_decode($response, true);

    if (isset($data['results'])) {
        $suggestions = array_map(function ($game) {
            return ['name' => $game['name']];
        }, $data['results']);
        echo json_encode(['results' => $suggestions]);
    } else {
        echo json_encode(['results' => []]);
    }
?>