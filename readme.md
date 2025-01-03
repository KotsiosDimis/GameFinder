# GameFinder

## Project Features

### Core Functionalities
- **Dynamic game search** using the RAWG API.
- Filtering by:
  - Genre
  - Platform
  - Release date
- **Autocomplete feature** for search queries.
- **Paginated results** with customizable page size.

### Advanced Features
- Support for **logical query operators**:
  - AND, OR, NOT
- Support for **wildcard queries** (* for partial matches).
- **Preprocessing techniques**:
  - Tokenization
  - Stop-words removal
- **Responsive and user-friendly UI.**

### Error Handling
- Graceful handling of API errors.
- Informative error messages for users.

### Detailed Game View
- Includes:
  - Game name
  - Release date
  - Rating

---

## Project Structure

```plaintext
project/
│
├── api/
│   ├── fetchGames.php       # Fetches game data from RAWG API
│   ├── autocomplete.php     # Provides autocomplete suggestions
│
├── js/
│   ├── results.js           # Handles search results and rendering
│   ├── autocomplete.js      # Manages autocomplete functionality
│
├── css/
│   ├── styles.css           # (Optional) Styling for the UI
│
├── index.html               # Main application entry point
├── README.md                # Project documentation
