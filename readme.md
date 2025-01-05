
# GameFinder

**GameFinder** is a web-based game search engine that leverages the RAWG API to provide users with an intuitive platform to search, filter, and explore video games.

You can access the live version of the project here: [GameFinder](https://users.iee.ihu.gr/~iee2020202/GameFinder/)


---

## Features


1. **Game Search**: Users can search for games based on keywords.
2. **Genre and Platform Filters**: Filter games by genres and platforms.
3. **Pagination**: Display search results with pagination for improved navigation.
4. **Game Details Page**: View detailed information about a selected game, including images and descriptions.
5. **Dynamic Dropdowns**: Year and platform dropdowns are dynamically populated for user convenience.
6. **Autocomplete**: Search bar with autocomplete suggestions.
7. **Responsive Design**: Frontend designed to work well on different screen sizes.
8. **Error Handling**: Displays appropriate messages if API calls fail.


---

## File Structure

```

GameFinder/
├── api/
│   ├── config.php
│   ├── fetchGames.php
│   ├── fetchGameDetails.php
│   ├── autoComplete.php
├── components/
│   ├── filters.php
│   ├── pagesize.php
│   ├── searchBar.php
│   ├── sorting.php
│   ├── header.php
│   ├── footer.php
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── sorting.js
│   │   ├── results.js
│   │   ├── autocomplete.js
│   ├── images/
│       ├── icon.png
│       └── icon.ico
├── archive/
│   └── platforms.js
├── gameDetails.php
├── index.php
├── LICENSE
├── readme.md
└── .env

```

---

## How to Run the Project

1. **Setup RAWG API Key**:
   - Obtain an API key from [RAWG API](https://rawg.io/apidocs).
   - Add the key to the `.env` file under the `RAWG_API_KEY` variable.

2. **Server Configuration**:
   - Host the project on a PHP-enabled server (e.g., XAMPP, WAMP, or a live web host).

3. **Run the Application**:
   - Open `index.php` in your browser.

---

## Limitations

- **Sorting**: The RAWG API free tier does not support server-side sorting. Sorting is implemented client-side but currently archived due to unresolved issues.
- **Free Tier Constraints**: Limited API features due to the free plan.

---

## Technologies Used

- **Frontend**:
  - HTML, CSS, JavaScript (Bootstrap for styling)
- **Backend**:
  - PHP
- **API**:
  - RAWG API

---

## Future Improvements

- Re-enable and improve client-side sorting functionality.
- Add user authentication for personalized features.
- Improve UI responsiveness and accessibility.

---

## Credits

- RAWG API for game data.
- Developed by [Your Name].

---

## License

This project is licensed under the terms of the LICENSE file included.
