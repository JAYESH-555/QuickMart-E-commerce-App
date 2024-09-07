// console.log("Index.js Loaded");

async function fetchCategories(){
    // This function is marked asyc so this will also return a promise.
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    return data;
}

async function populateCategories(){
    const categories = await fetchCategories();
    
    removeLoader();

    const categoryList = document.getElementById("categoryList");
    categories.forEach(category => {
        const categoryHolder = document.createElement("div");
        const categoryLink = document.createElement("a");

        //Setting query params for url of each category. And with this we can also use this query params to filter out products using specific category in js.
        categoryLink.href = `productList.html?category=${category}`;

        categoryLink.textContent = category; // Setting the category name as the text of anchor tag.
        categoryHolder.classList.add("category-items", "d-flex", "align-items-center", "justify-content-center")
        categoryHolder.appendChild(categoryLink);
        categoryList.appendChild(categoryHolder);
    });
}

populateCategories();