<?php include('components/header.php'); ?>

<div class="container-fluid mt-5">
    <div class="row content">
        
        <div class="col-sm-3 sidenav mt-4">
            <!-- Filters Section -->
            <div style="text-align: left;">
                <?php include('components/filters.php'); ?>
            </div>
           
            <!-- Sorting Section -->
            <div style="text-align: left;">
                <?php include('components/sorting.php'); ?>
            </div>
        
            <!-- Page Size Section -->
            <div style="text-align: left;">
                <?php include('components/pagesize.php'); ?>
            </div>
        </div>

        <div class="col-sm-9">
        <h1 class="display-4 text-primary fw-bold text-left">
            <span class="text-secondary">🎮 Search It</span> 
            <span class="text-success">Play It!</span>
        </h1>

            <!-- Search Bar Section -->
            <?php include('components/searchBar.php'); ?>

            <!-- Add spacing -->
            <div style="margin-top: 30px;"></div>

            <!-- Results Info Section -->
            <div id="resultsInfo" class="alert alert-info text-left rounded-pill shadow-sm py-3 my-4">Showing 0 results</div>

            <div id="results" class="row g-4 justify-content-center"></div>


            <!-- Add spacing -->
            <div style="margin-top: 30px;"></div>
            
            <!-- Results Section -->
            <div id="results" class="mp-5"></div>
        </div>
    </div>
    
    <!-- Pagination Section -->
    <div id="pagination" class="mt-4"></div>
</div>

<?php include('components/footer.php'); ?>
