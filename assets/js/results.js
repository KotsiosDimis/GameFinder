// results.js

// Function to preprocess queries (tokenization and stop-words removal)
function preprocessQuery(query) {
    const stopWords = ['the', 'is', 'and', 'or', 'not', 'of', 'a', 'an']; // Common stop-words
    const tokens = query.toLowerCase().split(/\s+/);
    return tokens.filter(token => !stopWords.includes(token)).join(' ');
}

// Function to handle logical operators in queries
function handleLogicalOperators(query) {
    query = query.replace(/\sAND\s/gi, '&&');
    query = query.replace(/\sOR\s/gi, '||');
    query = query.replace(/\sNOT\s/gi, '!');
    return query;
}

// Function to render the sorted results
function renderResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length) {
        results.forEach(game => {
            const gameDiv = document.createElement('div');
            gameDiv.classList.add('card', 'mb-3');
            gameDiv.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${game.name}</h5>
                    <p class="card-text">${game.released ? `Released: ${game.released}` : 'Release date not available'}</p>
                    <p class="card-text">${game.rating ? `Rating: ${game.rating}` : 'Rating not available'}</p>
                </div>
            `;
            resultsDiv.appendChild(gameDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

// Function to perform the search
function performSearch() {
    let query = document.getElementById('searchQuery').value;
    query = preprocessQuery(query); // Preprocess the query
    query = handleLogicalOperators(query); // Handle logical operators

    const genre = document.getElementById('genreFilter').value;
    const platform = document.getElementById('platformFilter').value;
    const releaseDate = document.getElementById('releaseDateFilter').value;

    if (query.length > 2) {
        let url = `api/fetchGames.php?query=${query}`;
        if (genre) url += `&genre=${genre}`;
        if (platform) url += `&platform=${platform}`;
        if (releaseDate) url += `&release_date=${releaseDate}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                renderResults(data.results);
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                document.getElementById('results').innerHTML = '<p>Error fetching results. Please try again later.</p>';
            });
    } else {
        document.getElementById('results').innerHTML = '<p>Please enter a search term.</p>';
    }
}

// Attach event listeners
document.getElementById('searchButton').addEventListener('click', performSearch);
document.getElementById('searchQuery').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});
