<?php
header('Content-Type: application/json');

// Load configuration
$config = require 'config.php';

// Access API key and base URL
$apiKey = $config['RAWG_API_KEY'];
$baseUrl = $config['RAWG_BASE_URL'];

// Retrieve query parameters from the request and sanitize them
$query = filter_input(INPUT_GET, 'query', FILTER_SANITIZE_STRING) ?? '';
$genre = filter_input(INPUT_GET, 'genre', FILTER_SANITIZE_STRING) ?? '';
$platform = filter_input(INPUT_GET, 'platform', FILTER_SANITIZE_STRING) ?? '';
$releaseDate = filter_input(INPUT_GET, 'release_date', FILTER_SANITIZE_STRING) ?? '';
$page = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT) ?: 1; // Default to page 1
$pageSize = filter_input(INPUT_GET, 'page_size', FILTER_VALIDATE_INT) ?: 10; // Default to 10 results per page

// Build the RAWG API URL with filters
$filters = [
    "key={$apiKey}",
    !empty($query) ? "search=" . urlencode($query) : null,
    !empty($genre) ? "genres=" . urlencode($genre) : null,
    !empty($platform) ? "platforms=" . urlencode($platform) : null,
    !empty($releaseDate) ? "dates=" . urlencode($releaseDate) : null,
    "page={$page}",
    "page_size={$pageSize}",
];

$filters = array_filter($filters); // Remove null or empty values
$apiUrl = $baseUrl . '?' . implode('&', $filters);

// Fetch data from RAWG API
$data = fetchApiData($apiUrl);

// Handle errors during data fetching
if (isset($data['error'])) {
    http_response_code(500);
    echo json_encode(['error' => $data['error']]);
    exit;
}

// Validate the API response structure
if (!isset($data['results']) || !is_array($data['results'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Invalid API response']);
    exit;
}

// Return results with pagination information
echo json_encode([
    'results' => $data['results'],
    'totalResults' => $data['count'] ?? 0, // Total count from API
    'currentPage' => $page,
    'pageSize' => $pageSize,
]);

/**
 * Function to fetch data from the RAWG API using cURL
 * 
 * @param string $url The API URL to fetch data from
 * @return array The decoded JSON response or an error array
 */
function fetchApiData($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FAILONERROR, true); // Handle HTTP errors

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);
        return ['error' => "Error fetching data: $error"];
    }

    if ($httpCode !== 200) {
        curl_close($ch);
        return ['error' => "HTTP error code: $httpCode"];
    }

    curl_close($ch);
    return json_decode($response, true);
}
?>
