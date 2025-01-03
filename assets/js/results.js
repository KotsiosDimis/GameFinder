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


let currentPage = 1; // Track the current page
const resultsPerPage = 10; // Fixed results per page

// Function to fetch and render results for a specific page
function fetchResults(page = 1) {
    currentPage = page; // Update current page
    let query = document.getElementById('searchQuery').value;
    query = preprocessQuery(query); // Preprocess the query
    query = handleLogicalOperators(query); // Handle logical operators

    const genre = document.getElementById('genreFilter').value;
    const platform = document.getElementById('platformFilter').value;
    const releaseDate = document.getElementById('releaseDateFilter').value;

    if (query.length > 2) {
        let url = `api/fetchGames.php?query=${query}&page=${page}`;
        if (genre) url += `&genre=${genre}`;
        if (platform) url += `&platform=${platform}`;
        if (releaseDate) url += `&release_date=${releaseDate}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                renderResults(data.results);
                renderPagination(data.totalResults, resultsPerPage, data.currentPage);
            })
            .catch(error => {
                console.error('Error fetching results:', error);
                document.getElementById('results').innerHTML = '<p>Error fetching results. Please try again later.</p>';
                document.getElementById('pagination').innerHTML = ''; // Clear pagination
            });
    } else {
        document.getElementById('results').innerHTML = '<p>Please enter a search term.</p>';
        document.getElementById('pagination').innerHTML = ''; // Clear pagination
    }
}

// Function to render pagination
function renderPagination(totalResults, resultsPerPage, currentPage) {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = ''; // Clear previous pagination

    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const maxVisiblePages = 10; // Maximum number of visible page links

    if (totalPages > 1) {
        const paginationUl = document.createElement('ul');
        paginationUl.classList.add('pagination', 'justify-content-center');

        // Calculate range of pages to display
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Ensure we always show a consistent range
        const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

        // Add "Previous" button
        const prevItem = document.createElement('li');
        prevItem.classList.add('page-item');
        if (currentPage === 1) {
            prevItem.classList.add('disabled');
        }
        const prevLink = document.createElement('a');
        prevLink.classList.add('page-link');
        prevLink.textContent = 'Previous';
        prevLink.href = '#';
        prevLink.addEventListener('click', function (event) {
            event.preventDefault();
            if (currentPage > 1) fetchResults(currentPage - 1);
        });
        prevItem.appendChild(prevLink);
        paginationUl.appendChild(prevItem);

        // Add page links
        for (let i = adjustedStartPage; i <= endPage; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            if (i === currentPage) {
                pageItem.classList.add('active');
            }

            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;
            pageLink.href = '#';
            pageLink.addEventListener('click', function (event) {
                event.preventDefault();
                fetchResults(i);
            });

            pageItem.appendChild(pageLink);
            paginationUl.appendChild(pageItem);
        }

        // Add "Next" button
        const nextItem = document.createElement('li');
        nextItem.classList.add('page-item');
        if (currentPage === totalPages) {
            nextItem.classList.add('disabled');
        }
        const nextLink = document.createElement('a');
        nextLink.classList.add('page-link');
        nextLink.textContent = 'Next';
        nextLink.href = '#';
        nextLink.addEventListener('click', function (event) {
            event.preventDefault();
            if (currentPage < totalPages) fetchResults(currentPage + 1);
        });
        nextItem.appendChild(nextLink);
        paginationUl.appendChild(nextItem);

        paginationDiv.appendChild(paginationUl);
    }
}


// Attach event listeners
document.getElementById('searchButton').addEventListener('click', () => fetchResults(1));
document.getElementById('searchQuery').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fetchResults(1);
    }
});

