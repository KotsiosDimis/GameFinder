// Function to sort the results based on rating or release date
function sortResults(results, sortBy) {
    if (sortBy === 'rating') {
        return results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'release_date') {
        return results.sort((a, b) => {
            const dateA = new Date(a.released);
            const dateB = new Date(b.released);
            return dateB - dateA;
        });
    }
    return results;
}

// Event listener for the sorting dropdown
document.getElementById('sortBy').addEventListener('change', function () {
    const sortBy = this.value;

    // Use existing results if available
    const resultsDiv = document.getElementById('results');
    const games = Array.from(resultsDiv.children).map(gameDiv => ({
        name: gameDiv.querySelector('.card-title').textContent,
        released: gameDiv.querySelector('.card-text').textContent.includes('Released')
            ? gameDiv.querySelector('.card-text').textContent.replace('Released: ', '').trim()
            : null,
        rating: gameDiv.querySelector('.card-text').textContent.includes('Rating')
            ? parseFloat(gameDiv.querySelector('.card-text').textContent.replace('Rating: ', '').trim())
            : null,
    }));

    const sortedResults = sortResults(games, sortBy);
    renderResults(sortedResults);
});
