<?php include('components/header.php'); ?>

    
    <div class="container mt-5">



       
        
        <h1 class="text-center">Search for Games</h1>
        <!-- Search Bar Section -->
        <?php include('components/searchBar.php'); ?>

      

            <div class="container text-center">
        <div class="row align-items-start">
            <div class="col-md-4 ms-auto">
                 <h3 class="text-center">Filters</h3>
                 <!-- Filters Section -->
                 <?php include('components/filters.php'); ?>
            </div>
            <div class="col-md-4 ms-auto">
                <h3 class="text-center">sort by</h3>
                <!-- Sorting Section -->
                <?php include('components/sorting.php'); ?>
            </div>
            <div class="col-md-4 ms-auto">
                <h3 class="text-center">results per page</h3>
                <!-- Page Size Section -->
                <?php include('components/pagesize.php'); ?>
            </div>
        </div>
        </div>

       

        <!-- Results Section -->
        <div id="results" class="mt-4"></div>

      
        <!-- Pagination Section -->
        <div id="pagination" class="mt-4"></div>

    </div>

<?php include('components/footer.php'); ?>




