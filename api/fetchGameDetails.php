<?php
header('Content-Type: application/json');

// Load configuration
$config = require 'config.php';

// Access API key and base URL
$apiKey = $config['RAWG_API_KEY'];
$baseUrl = 'https://api.rawg.io/api/games'; // Specific endpoint for game details

// Retrieve game ID from the request
$gameId = $_GET['id'] ?? '';

if (empty($gameId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Game ID is required']);
    exit;
}

// Build the RAWG API URL for game details
$apiUrl = "{$baseUrl}/{$gameId}?key={$apiKey}";

// Fetch data from RAWG API
$response = @file_get_contents($apiUrl); // Suppress warnings with @

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch game details from RAWG API']);
    exit;
}

// Decode and return game details
$data = json_decode($response, true);
if (isset($data['id'])) {
    echo json_encode($data);
} else {
    echo json_encode(['error' => 'Game details not found']);
}
?>
