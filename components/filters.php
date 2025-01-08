<div class="container">
    <div class="card shadow-lg mb-4">
        <div class="card-body">
            <h5 class="card-title text-center text-primary fw-bold mb-4">
                🛠️ Filters
            </h5>
            <div class="row g-4">
                <!-- Genre Section -->
                <div class="col-12">
                    <label for="genreFilter" class="form-label fw-bold text-secondary">Select Genre:</label>
                    <select id="genreFilter" class="form-select form-select-lg">
                        <option value="">All Genres</option>
                        <option value="action">Action</option>
                        <option value="indie">Indie</option>
                        <option value="adventure">Adventure</option>
                        <option value="rpg">RPG</option>
                        <option value="strategy">Strategy</option>
                        <option value="shooter">Shooter</option>
                        <option value="casual">Casual</option>
                        <option value="simulation">Simulation</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="arcade">Arcade</option>
                        <option value="platformer">Platformer</option>
                        <option value="racing">Racing</option>
                        <option value="sports">Sports</option>
                        <option value="fighting">Fighting</option>
                        <option value="family">Family</option>
                        <option value="board-games">Board Games</option>
                        <option value="educational">Educational</option>
                        <option value="card">Card</option>
                    </select>
                </div>

                <!-- Platform Section -->
                <div class="col-12">
                    <label for="platformFilter" class="form-label fw-bold text-secondary">Select Platform:</label>
                    <select id="platformFilter" class="form-select form-select-lg">
                        <option value="">All Platforms</option>
                        <option value="4">PC</option>
                        <option value="187">PlayStation 5</option>
                        <option value="18">PlayStation 4</option>
                        <option value="1">Xbox One</option>
                        <option value="186">Xbox Series S/X</option>
                        <option value="7">Nintendo Switch</option>
                        <option value="3">iOS</option>
                        <option value="21">Android</option>
                        <option value="8">Nintendo 3DS</option>
                        <option value="9">Nintendo DS</option>
                        <option value="13">Nintendo DSi</option>
                        <option value="5">macOS</option>
                        <option value="6">Linux</option>
                        <option value="14">Xbox 360</option>
                        <option value="80">Xbox</option>
                        <option value="16">PlayStation 3</option>
                        <option value="15">PlayStation 2</option>
                        <option value="27">PlayStation</option>
                        <option value="19">PS Vita</option>
                        <option value="17">PSP</option>
                        <option value="10">Wii U</option>
                        <option value="11">Wii</option>
                        <option value="105">GameCube</option>
                        <option value="83">Nintendo 64</option>
                        <option value="24">Game Boy Advance</option>
                        <option value="43">Game Boy Color</option>
                        <option value="26">Game Boy</option>
                        <option value="79">SNES</option>
                        <option value="49">NES</option>
                        <option value="55">Classic Macintosh</option>
                        <option value="41">Apple II</option>
                        <option value="166">Commodore / Amiga</option>
                        <option value="28">Atari 7800</option>
                        <option value="31">Atari 5200</option>
                        <option value="23">Atari 2600</option>
                        <option value="22">Atari Flashback</option>
                        <option value="25">Atari 8-bit</option>
                        <option value="34">Atari ST</option>
                        <option value="46">Atari Lynx</option>
                        <option value="50">Atari XEGS</option>
                        <option value="167">Genesis</option>
                        <option value="107">SEGA Saturn</option>
                        <option value="119">SEGA CD</option>
                        <option value="117">SEGA 32X</option>
                        <option value="74">SEGA Master System</option>
                        <option value="106">Dreamcast</option>
                        <option value="111">3DO</option>
                        <option value="112">Jaguar</option>
                        <option value="77">Game Gear</option>
                        <option value="12">Neo Geo</option>
                        <option value="171">Web</option>
                    </select>
                </div>

                <!-- Release Date Section -->
                <div class="col-12">
                    <label for="releaseDateFilter" class="form-label fw-bold text-secondary">Select Release Year:</label>
                    <select id="releaseDateFilter" class="form-select form-select-lg">
                        <option value="">All Years</option>
                        <!-- Dynamically generate years -->
                        <script>
                            const currentYear = new Date().getFullYear();
                            const startYear = 1980; // Adjust the starting year if needed
                            const releaseDateFilter = document.getElementById('releaseDateFilter');
                            for (let year = currentYear; year >= startYear; year--) {
                                const option = document.createElement('option');
                                option.value = `${year}-01-01,${year}-12-31`; // RAWG API date range format
                                option.textContent = year;
                                releaseDateFilter.appendChild(option);
                            }
                        </script>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
