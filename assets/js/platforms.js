// List of platforms and their corresponding IDs
const platforms = {
    modern: [
        { id: 4, name: "PC" },
        { id: 187, name: "PlayStation 5" },
        { id: 18, name: "PlayStation 4" },
        { id: 1, name: "Xbox One" },
        { id: 186, name: "Xbox Series S/X" },
        { id: 7, name: "Nintendo Switch" },
        { id: 3, name: "iOS" },
        { id: 21, name: "Android" },
    ],
    handheld: [
        { id: 8, name: "Nintendo 3DS" },
        { id: 9, name: "Nintendo DS" },
        { id: 13, name: "Nintendo DSi" },
        { id: 19, name: "PS Vita" },
        { id: 17, name: "PSP" },
        { id: 33, name: "Game Boy Advance" },
        { id: 24, name: "Game Boy Color" },
        { id: 43, name: "Game Boy" },
    ],
    pc_classic: [
        { id: 5, name: "macOS" },
        { id: 6, name: "Linux" },
        { id: 80, name: "Classic Macintosh" },
        { id: 55, name: "Apple II" },
    ],
    retro: [
        { id: 14, name: "Xbox 360" },
        { id: 80, name: "Xbox" },
        { id: 16, name: "PlayStation 3" },
        { id: 15, name: "PlayStation 2" },
        { id: 27, name: "PlayStation" },
        { id: 10, name: "Wii U" },
        { id: 11, name: "Wii" },
        { id: 105, name: "GameCube" },
        { id: 83, name: "Nintendo 64" },
        { id: 24, name: "SNES" },
        { id: 25, name: "NES" },
    ],
    sega_atari: [
        { id: 51, name: "Genesis" },
        { id: 107, name: "SEGA Saturn" },
        { id: 119, name: "SEGA CD" },
        { id: 117, name: "SEGA 32X" },
        { id: 74, name: "SEGA Master System" },
        { id: 106, name: "Dreamcast" },
        { id: 28, name: "Atari 7800" },
        { id: 31, name: "Atari 5200" },
        { id: 23, name: "Atari 2600" },
        { id: 22, name: "Atari Flashback" },
        { id: 50, name: "Atari 8-bit" },
        { id: 112, name: "Atari ST" },
        { id: 146, name: "Atari Lynx" },
        { id: 116, name: "Atari XEGS" },
    ],
    misc: [
        { id: 58, name: "3DO" },
        { id: 64, name: "Jaguar" },
        { id: 83, name: "Game Gear" },
        { id: 105, name: "Neo Geo" },
        { id: 171, name: "Web" },
    ],
};

// Populate the platform filter dynamically
function populatePlatformFilter() {
    const dropdownToggle = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#filtersSection"]');

    if (!dropdownToggle) {
        console.error("Filters dropdown toggle not found.");
        return;
    }

    dropdownToggle.addEventListener('shown.bs.collapse', () => {
        const platformContainer = document.getElementById('platformFilter');
        if (!platformContainer) {
            console.error("Platform container not found.");
            return;
        }

        platformContainer.innerHTML = ""; // Clear existing content
        Object.entries(platforms).forEach(([category, platformList]) => {
            const categoryDiv = document.createElement("div");
            categoryDiv.innerHTML = `<h4>${capitalizeFirstLetter(category.replace("_", " "))}</h4>`;

            platformList.forEach(platform => {
                const label = document.createElement("label");
                label.innerHTML = `
                    <input type="checkbox" value="${platform.id}" /> ${platform.name}
                `;
                categoryDiv.appendChild(label);
                categoryDiv.appendChild(document.createElement("br")); // Line break for readability
            });

            platformContainer.appendChild(categoryDiv);
        });
    });
}


// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Event listener for checkbox changes
function setupPlatformListeners() {
    const checkboxes = document.querySelectorAll('#platformFilter input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", updatePlatformMessage);
    });
}

// Update message based on selected platforms
function updatePlatformMessage() {
    const selectedPlatforms = Array.from(
        document.querySelectorAll('#platformFilter input[type="checkbox"]:checked')
    ).map(checkbox => checkbox.nextSibling.textContent.trim());

    const message = selectedPlatforms.length
        ? `Searching for: ${selectedPlatforms.join(", ")}`
        : "Searching across all platforms";

    const messageContainer = document.getElementById("platformMessage");
    if (messageContainer) {
        messageContainer.textContent = message;
    }
}

// Function to sort the results based on rating or release date
function sortResults(results, sortBy) {
    if (sortBy === 'rating') {
        return results.sort((a, b) => (b.rating || 0) - (a.rating || 0)); // Descending by rating
    } else if (sortBy === 'release_date') {
        return results.sort((a, b) => {
            const dateA = new Date(a.released);
            const dateB = new Date(b.released);
            return dateB - dateA; // Descending by release date
        });
    }
    return results; // Default to original order if no sorting is applied
}

// Event listener for the sorting dropdown
document.addEventListener('DOMContentLoaded', function () {
    const sortByDropdown = document.getElementById('sortBy');
    const dropdownToggle = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="#filtersSection"]');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('shown.bs.collapse', () => {
            if (!sortByDropdown) {
                console.error("SortBy dropdown not found.");
                return;
            }
            sortByDropdown.addEventListener('change', function () {
                const sortBy = this.value;
                const resultsDiv = document.getElementById('results');
                if (!resultsDiv) {
                    console.error("Results container not found.");
                    return;
                }

                const games = Array.from(resultsDiv.children).map(gameDiv => {
                    const nameElement = gameDiv.querySelector('.card-title');
                    const releasedText = gameDiv.querySelector('.card-text')?.textContent || '';
                    const ratingText = gameDiv.querySelector('.card-text:nth-of-type(2)')?.textContent || '';

                    return {
                        name: nameElement ? nameElement.textContent : null,
                        released: releasedText.includes('Released') ? releasedText.replace('Released: ', '').trim() : null,
                        rating: ratingText.includes('Rating') ? parseFloat(ratingText.replace('Rating: ', '').trim()) : null,
                    };
                });

                if (!games.length) {
                    console.warn("No games found to sort.");
                    return;
                }

                const sortedResults = sortResults(games, sortBy);
                renderResults(sortedResults);
            });
        });
    }
});
