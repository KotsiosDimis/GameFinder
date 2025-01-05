document.getElementById('sortBy').addEventListener('change', function () {
    const [sortBy, order] = this.value.split('_'); // Get sorting criteria (e.g., "rating" and "asc")

    // Update the sorting message dynamically
    document.getElementById('sortMessage').textContent = `Sorting by ${sortBy}, ${order === 'asc' ? 'Ascending' : 'Descending'}`;

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

    // Sort the results
    const sortedResults = sortResults(games, sortBy, order);

    // Render the sorted results
    renderResults(sortedResults);
});
