
class fetchProductOptions {
    fetchOptions(productID) {
        let productData = fetch(`https://pricing-options-app.herokuapp.com/api/show-options/${productID}`)
            .then(response => response.json())
            .then(data => console.log(data));

        return productData;
    }
}
