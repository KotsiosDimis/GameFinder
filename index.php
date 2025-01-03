<?php include('components/header.php'); ?>

    
    <div class="container mt-5">
       
        
        <h1 class="text-center">Search for Games</h1>
        <!-- Search Bar Section -->
        <?php include('components/searchBar.php'); ?>

        <h2 class="text-center">Filters</h2>
        <!-- Filters Section -->
        <?php include('components/filters.php'); ?>

        <h3 class="text-right">sort by</h3>
        <!-- Sorting Section -->
        <?php include('components/sorting.php'); ?>

        <!-- Results Section -->
        <div id="results" class="mt-4"></div>

      
        <!-- Pagination Section -->
        <div id="pagination" class="mt-4"></div>

    </div>

<?php include('components/footer.php'); ?>




