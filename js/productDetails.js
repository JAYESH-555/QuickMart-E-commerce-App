
document.addEventListener("DOMContentLoaded", () => {
    async function populateproduct(){
        const queryParams = getQueryParams();
        if(queryParams[`id`]){
            const productId = queryParams[`id`];
            const product = await fetchProductById(productId);
            // console.log(product);

            const productName = document.getElementById("product-name");
            const productPrice = document.getElementById("product-price");
            const productDescription = document.getElementById("product-description-data");
            const productImage = document.getElementById("product-img");

            productName.textContent = product.title;
            productPrice.textContent = `$${product.price}`;
            productDescription.textContent = product.description;
            productImage.src = product.image;

            removeLoader();
        }
    }

    populateproduct();
});