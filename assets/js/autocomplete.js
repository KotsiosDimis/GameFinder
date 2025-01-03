// autocomplete.js

// Function to preprocess queries (tokenization and stop-words removal)
function preprocessQuery(query) {
    const stopWords = ['the', 'is', 'and', 'or', 'not', 'of', 'a', 'an']; // Common stop-words
    const tokens = query.toLowerCase().split(/\s+/);
    return tokens.filter(token => !stopWords.includes(token)).join(' ');
}

// Function to preprocess wildcard queries
function preprocessWildcard(query) {
    return query.replace(/\*/g, '%'); // Replace '*' with '%' for SQL-like queries
}

document.getElementById('searchQuery').addEventListener('input', function () {
    let query = preprocessQuery(this.value); // Preprocess the query
    query = preprocessWildcard(query); // Handle wildcards
    const resultsList = document.getElementById('autocompleteResults');

    if (query.length > 2) { // Only fetch suggestions if query is longer than 2 characters
        fetch(`api/autoComplete.php?query=${query}`)
            .then(response => response.json())
            .then(data => {
                resultsList.innerHTML = ''; // Clear previous suggestions
                if (data.results) {
                    data.results.forEach(game => {
                        const listItem = document.createElement('li');
                        listItem.classList.add('list-group-item');
                        listItem.textContent = game.name;
                        listItem.style.cursor = 'pointer';

                        // Handle click event
                        listItem.addEventListener('click', function () {
                            document.getElementById('searchQuery').value = game.name;
                            resultsList.innerHTML = ''; // Clear suggestions after selection
                        });

                        resultsList.appendChild(listItem);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        resultsList.innerHTML = ''; // Clear suggestions if query is too short
    }
});

// Clear autocomplete suggestions on pressing Enter or clicking search
document.getElementById('searchQuery').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.getElementById('autocompleteResults').innerHTML = ''; // Clear suggestions
    }
});

document.getElementById('searchButton').addEventListener('click', function () {
    document.getElementById('autocompleteResults').innerHTML = ''; // Clear suggestions
});