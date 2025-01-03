<div class="d-flex justify-content-center position-relative">
            <input 
                type="text" 
                id="searchQuery" 
                class="form-control w-50" 
                placeholder="Search games..." 
                aria-label="Search">
            <button id="searchButton" class="btn btn-primary ms-2">Search</button>
            <ul id="autocompleteResults" class="list-group position-absolute w-50 mt-2" style="z-index: 1000; top: 100%;"></ul> <!-- Ensure this is closed properly -->
        </div>
