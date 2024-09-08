// Old code

// document.addEventListener("DOMContentLoaded", async () => {
//     async function fetchProducts(){
//         const response = await axios.get("https://fakestoreapi.com/products");
//         console.log(response.data);
//         return response.data;
//     }



//     async function fetchProductsByCategory(category){
//         // Just changing the API and customizing towards category
//         const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
//         console.log(response.data);
//         return response.data;
//     }

//     async function fetchCategories(){
//         // This function is marked asyc so this will also return a promise.
//         const response = await fetch("https://fakestoreapi.com/products/categories");
//         const data = await response.json();
//         return data;
//     }


    
//     const downloadedProducts = await fetchProducts();


//     async function populateProducts(flag, customProducts){
//         let products = customProducts;
        
//         const queryParamsObject = getQueryParams();

        
//         if(flag == false){
            
//             if(queryParamsObject[`category`]){
//                 products = await fetchProductsByCategory(queryParamsObject[`category`]);
//             }else{
//                 // If it is not present download/fetch all the products.
//                 products = await fetchProducts();
//             }
//         }

//         const productList = document.getElementById("product-list");
//         products.forEach(product => {
//             // Creating <a> tag element of product.
//             const productItem = document.createElement("a");
//             productItem.target = "_blank";
//             productItem.classList.add("product-item", "text-decoration-none", "d-inline-block")
//             productItem.href = `productDetails.html?id=${product.id}`;

//             // Creating the 3 divs of <a> tag
//             const productImage = document.createElement("div");
//             const productName = document.createElement("div");
//             const productPrice = document.createElement("div");

//             productImage.classList.add("product-img");
//             productName.classList.add("product-name", "text-center");
//             productPrice.classList.add("product-price", "text-center");

//             productName.textContent = product.title.substring(0, 12) + "...";
//             productPrice.innerHTML = `&#x24; ${product.price}`; //Set to dollar bcoz of API prices. Rupee -> &#8377;

//             const imageInsideProductImage = document.createElement("img");
//             imageInsideProductImage.src = product.image;


//             // Appending the divs 
//             productImage.appendChild(imageInsideProductImage);
//             productItem.appendChild(productImage);
//             productItem.appendChild(productName);
//             productItem.appendChild(productPrice);


//             productList.appendChild(productItem);

//         });

//     }

//     // Creating Categories dynamically wrt api 
//     async function populateCategories(){
//         const categories = await fetchCategories();
//         const categoryList = document.getElementById("categoryList");
//         categories.forEach(category => {
//             const categoryLink = document.createElement("a");
//             categoryLink.classList.add("d-flex", "text-decoration-none");
//             categoryLink.textContent = category;
//             categoryLink.href = `productList.html?category=${category}`;

//             categoryList.appendChild(categoryLink);
//         });
//     }

//     async function downloadContentAndPopulate(){
//         // Here we have optimized that we can load both the functions parallely
//         Promise.all([populateProducts(false), populateCategories()])
//         .then(() => {
            
//             removeLoader();
//         });
        
//     }

//     downloadContentAndPopulate();
    

//     // Adding filters by price implementation
//     const filterSearch = document.getElementById("search");
//     filterSearch.addEventListener("click", async () => {
//         const productList = document.getElementById("product-list");
//         const minPrice =  Number(document.getElementById("minPrice").value);
//         const maxPrice =  Number(document.getElementById("maxPrice").value);
//         const products =  downloadedProducts;
//         filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
//         productList.innerHTML = "";
//         populateProducts(true, filteredProducts);
//     });

//     // Adding Clear filter implementation
//     const resetFilter = document.getElementById("clear");
//     resetFilter.addEventListener("click", () => {
//         window.location.reload();
//     })

// });


// Update code for heading updation accoridng to categories

document.addEventListener("DOMContentLoaded", async () => {
    async function fetchProducts(){
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        return response.data;
    }

    async function fetchProductsByCategory(category){
        // Just changing the API and customizing towards category
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log(response.data);
        return response.data;
    }

    async function fetchCategories(){
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        return data;
    }

    const downloadedProducts = await fetchProducts();

    // Function to dynamically update the heading
    function updatePageHeading() {
        const queryParamsObject = getQueryParams();
        const productListTitle = document.querySelector(".product-list-title");
        
        // If a category is selected, update the heading accordingly
        if(queryParamsObject[`category`]){
            const selectedCategory = queryParamsObject[`category`];
            productListTitle.textContent = `Products in Category: ${selectedCategory}`;
        } else {
            productListTitle.textContent = "All Products";
        }
    }

    async function populateProducts(flag, customProducts){
        let products = customProducts;
        
        const queryParamsObject = getQueryParams();

        if(flag == false){
            if(queryParamsObject[`category`]){
                products = await fetchProductsByCategory(queryParamsObject[`category`]);
            }else{
                products = await fetchProducts();
            }
        }

        const productList = document.getElementById("product-list");
        productList.innerHTML = ""; // Clear product list before populating

        products.forEach(product => {
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block")
            productItem.href = `productDetails.html?id=${product.id}`;

            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");

            productImage.classList.add("product-img");
            productName.classList.add("product-name", "text-center");
            productPrice.classList.add("product-price", "text-center");

            productName.textContent = product.title.substring(0, 12) + "...";
            productPrice.innerHTML = `&#x24; ${product.price}`;

            const imageInsideProductImage = document.createElement("img");
            imageInsideProductImage.src = product.image;

            productImage.appendChild(imageInsideProductImage);
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);

            productList.appendChild(productItem);
        });
    }

    async function populateCategories(){
        const categories = await fetchCategories();
        const categoryList = document.getElementById("categoryList");
        categories.forEach(category => {
            const categoryLink = document.createElement("a");
            categoryLink.classList.add("d-flex", "text-decoration-none");
            categoryLink.textContent = category;
            categoryLink.href = `productList.html?category=${category}`;
            categoryList.appendChild(categoryLink);
        });
    }

    async function downloadContentAndPopulate(){
        // Load both products and categories in parallel
        Promise.all([populateProducts(false), populateCategories()])
        .then(() => {
            removeLoader();
            updatePageHeading(); // Update the heading after loading content
        });
    }

    downloadContentAndPopulate();

    // Adding filters by price
    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {
        const productList = document.getElementById("product-list");
        const minPrice =  Number(document.getElementById("minPrice").value);
        const maxPrice =  Number(document.getElementById("maxPrice").value);
        const products =  downloadedProducts;
        const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        productList.innerHTML = ""; // Clear the product list before filtering
        populateProducts(true, filteredProducts);
    });

    // Adding Clear filter implementation
    const resetFilter = document.getElementById("clear");
    resetFilter.addEventListener("click", () => {
        window.location.reload();
    });

    // Helper function to get query parameters
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        const queryParams = {};
        for (const [key, value] of params.entries()) {
            queryParams[key] = value;
        }
        return queryParams;
    }
});
