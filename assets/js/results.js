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

// Test functions
function testTokenization() {
    const query = "The quick brown fox jumps over the lazy dog";
    const tokens = query.toLowerCase().split(/\s+/);
    console.log("Tokenization Test:", tokens);
}

function testStopWordsRemoval() {
    const stopWords = ['the', 'is', 'and', 'or', 'not', 'of', 'a', 'an'];
    const query = "The quick brown fox jumps over the lazy dog";
    const tokens = query.toLowerCase().split(/\s+/).filter(token => !stopWords.includes(token));
    console.log("Stop-Words Removal Test:", tokens);
}

// Function to render the sorted results
function renderResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    if (results.length) {
        results.forEach(game => {
            const platforms = game.platforms
                ? game.platforms.map(p => p.platform.name).join(', ')
                : 'Platforms not available';

            const gameDiv = document.createElement('div');
            gameDiv.classList.add('card', 'mb-3');
            gameDiv.innerHTML = `
                <a href="gameDetails.php?id=${game.id}">
                    <div class="card-body">
                        <h5 class="card-title">${game.name}</h5>
                        <p class="card-text">${game.released ? `Released: ${game.released}` : 'Release date not available'}</p>
                        <p class="card-text">${game.rating ? `Rating: ${game.rating}` : 'Rating not available'}</p>
                        <p class="card-text"><strong>Platforms:</strong> ${platforms}</p>
                    </div>
                </a>
            `;
            resultsDiv.appendChild(gameDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found</p>';
    }
}

// Function to render results info (total results and pages)
function renderResultsInfo(totalResults, pageSize, currentPage) {
    const totalPages = Math.ceil(totalResults / pageSize);
    const resultsInfoDiv = document.getElementById('resultsInfo');
    resultsInfoDiv.textContent = `Showing page ${currentPage} of ${totalPages}. Total results: ${totalResults}.`;
}

// Function to perform the search
function performSearch() {
    let query = document.getElementById('searchQuery').value;
    query = preprocessQuery(query);
    query = handleLogicalOperators(query);

    const genre = document.getElementById('genreFilter').value;
    const platform = document.getElementById('platformFilter').value;
    const releaseDate = document.getElementById('releaseDateFilter').value;

    if (query.length > 2) {
        let url = `api/fetchGames.php?query=${query}`;
        if (genre) url += `&genre=${genre}`;
        if (platform) url += `&platform=${platform}`;
        if (releaseDate) url += `&release_date=${releaseDate}`;

        console.log("Final Query URL:", url);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                renderResults(data.results);
                renderResultsInfo(data.totalResults, data.pageSize, data.currentPage);
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                document.getElementById('results').innerHTML = '<p>Error fetching results. Please try again later.</p>';
                document.getElementById('resultsInfo').textContent = '';
            });
    } else {
        document.getElementById('results').innerHTML = '<p>Please enter a search term.</p>';
        document.getElementById('resultsInfo').textContent = '';
    }
}

let currentPage = 1; // Track the current page
const resultsPerPage = 10; // Fixed results per page

// Function to fetch and render results for a specific page
// Attach event listener for the page size dropdown
document.getElementById('resultsPerPage').addEventListener('change', () => {
    fetchResults(1); // Fetch results for the first page with the new page size
});

// Updated fetchResults function to dynamically update page size
function fetchResults(page = 1) {
    currentPage = page;
    const resultsPerPage = document.getElementById('resultsPerPage').value; // Get selected results per page
    let query = document.getElementById('searchQuery').value;
    query = preprocessQuery(query);
    query = handleLogicalOperators(query);

    const genre = document.getElementById('genreFilter').value;
    const platform = document.getElementById('platformFilter').value;
    const releaseDate = document.getElementById('releaseDateFilter').value;

    if (query.length > 2) {
        let url = `api/fetchGames.php?query=${query}&page=${page}&page_size=${resultsPerPage}`;
        if (genre) url += `&genre=${genre}`;
        if (platform) url += `&platform=${platform}`;
        if (releaseDate) url += `&release_date=${releaseDate}`;

        console.log("Final Query URL:", url);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                renderResults(data.results);
                renderResultsInfo(data.totalResults, parseInt(resultsPerPage), data.currentPage);
                renderPagination(data.totalResults, parseInt(resultsPerPage), data.currentPage);
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                document.getElementById('results').innerHTML = '<p>Error fetching results. Please try again later.</p>';
                document.getElementById('resultsInfo').textContent = '';
                document.getElementById('pagination').innerHTML = '';
            });
    } else {
        document.getElementById('results').innerHTML = '<p>Please enter a search term.</p>';
        document.getElementById('resultsInfo').textContent = '';
        document.getElementById('pagination').innerHTML = '';
    }
}


// Function to render pagination
function renderPagination(totalResults, resultsPerPage, currentPage) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const maxVisiblePages = 10;

    if (totalPages > 1) {
        const paginationUl = document.createElement('ul');
        paginationUl.classList.add('pagination', 'justify-content-center');

        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        if (currentPage === 1) prevItem.classList.add('disabled');
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.textContent = 'Previous';
        prevLink.href = '#';
        prevLink.addEventListener('click', event => {
            event.preventDefault();
            if (currentPage > 1) fetchResults(currentPage - 1);
        });
        prevItem.appendChild(prevLink);
        paginationUl.appendChild(prevItem);

        for (let i = startPage; i <= endPage; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) pageItem.classList.add('active');
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;
            pageLink.href = '#';
            pageLink.addEventListener('click', event => {
                event.preventDefault();
                fetchResults(i);
            });
            pageItem.appendChild(pageLink);
            paginationUl.appendChild(pageItem);
        }

        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        if (currentPage === totalPages) nextItem.classList.add('disabled');
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.textContent = 'Next';
        nextLink.href = '#';
        nextLink.addEventListener('click', event => {
            event.preventDefault();
            if (currentPage < totalPages) fetchResults(currentPage + 1);
        });
        nextItem.appendChild(nextLink);
        paginationUl.appendChild(nextItem);

        paginationDiv.appendChild(paginationUl);
    }
}

// Function to fetch game details
function fetchGameDetails(gameId) {
    const resultsDiv = document.getElementById('results');
    const paginationDiv = document.getElementById('pagination');

    resultsDiv.innerHTML = '<p>Loading game details...</p>';
    paginationDiv.innerHTML = '';

    fetch(`api/fetchGameDetails.php?id=${gameId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                resultsDiv.innerHTML = `<p>Error: ${data.error}</p>`;
                return;
            }

            resultsDiv.innerHTML = `
                <div class="card">
                    <img src="${data.background_image}" class="card-img-top" alt="${data.name}">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text"><strong>Description:</strong> ${data.description_raw || 'No description available'}</p>
                        <p class="card-text"><strong>Released:</strong> ${data.released || 'Unknown'}</p>
                        <p class="card-text"><strong>Rating:</strong> ${data.rating || 'Not rated'}</p>
                        <button class="btn btn-secondary" id="backToSearch">Back to Search</button>
                    </div>
                </div>
            `;

            document.getElementById('backToSearch').addEventListener('click', () => {
                fetchResults(currentPage);
            });
        })
        .catch(error => {
            console.error('Error fetching game details:', error);
            resultsDiv.innerHTML = '<p>Error fetching game details. Please try again later.</p>';
        });
}

// Attach event listeners
document.getElementById('searchButton').addEventListener('click', () => fetchResults(1));
document.getElementById('searchQuery').addEventListener('keydown', event => {
    if (event.key === 'Enter') fetchResults(1);
});
