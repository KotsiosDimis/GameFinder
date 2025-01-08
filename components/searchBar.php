<div class="d-flex justify-content-left align-items-center my-4 position-relative">
    <div class="input-group w-75">
        <input 
            type="text" 
            id="searchQuery" 
            class="form-control form-control-lg rounded-start" 
            placeholder="Search for your favorite games..." 
            aria-label="Search">
        <button id="searchButton" class="btn btn-primary btn-lg rounded-end">Search</button>
    </div>
    <ul id="autocompleteResults" class="list-group position-absolute w-75 mt-2" style="z-index: 1000; top: 100%;"></ul>
</div>
