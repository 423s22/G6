import CreateProduct from "./CreateProduct";

// function for building options array for a dropdown menu
export default async function BuildOptions(title, menuTitle, optionValues) {
    let options = [];
    const productData = {
        title: title,
        menuTitle: menuTitle,
        optionType: "dropdown",
    }
  
    // process all dropdown options
     for (const i in optionValues) {
        productData.optionName = optionValues[i].label;         
        productData.price = optionValues[i].value;

        let productOptionId =  await CreateProduct(productData);        // create a Shopify product for the option
        options.push({option: productData.optionName, price: productData.price, productOptionId: productOptionId}); // add the option to the options array
        
    };
    return options;
}