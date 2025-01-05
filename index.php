<?php include('components/header.php'); ?>

<div class="container-fluid mt-5">
    <div class="row content">
        <div class="col-sm-3 sidenav mt-4">
            <h3 class="text-center">Filters</h3>
            <!-- Filters Section -->
            <div style="text-align: left;">
                <?php include('components/filters.php'); ?>
            </div>
           
            <h3 class="text-center">Sort By</h3>
            <!-- Sorting Section -->
            <div style="text-align: left;">
                <?php include('components/sorting.php'); ?>
            </div>
            
            <h3 class="text-center">Results Per Page</h3>
            <!-- Page Size Section -->
            <div style="text-align: left;">
                <?php include('components/pagesize.php'); ?>
            </div>
        </div>

        <div class="col-sm-9">
            <h1 class="text-left">Search for Games</h1>
            <!-- Search Bar Section -->
            <?php include('components/searchBar.php'); ?>
            <!-- Results Section -->
            <div id="results" class="mp-5"></div>
        </div>
    </div>
    
    <!-- Pagination Section -->
    <div id="pagination" class="mt-4"></div>
</div>

<?php include('components/footer.php'); ?>
