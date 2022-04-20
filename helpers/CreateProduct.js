import authFetch from "../utils/AuthFetch";

// POST to backend route that create product in Shopify admin
export default async function CreateProduct(data) {

    // build product object
    const product = {
      "product": {
          "title": `${data.title} ${data.description} ${data.optionType}`,
          "product_type": `${data.optionType}`,
          "variants": [
            {
              "title": `${data.title} ${data.description} ${data.optionType}`,
              "price": `${data.price}`,
          }
        ],
        "status": "archived",    // make it an archived product so it won't be shown on the store front
    }
  } 

  const response = await authFetch("/api/add-engraving-product-option", {
      method: "POST",
     headers: {
        Accept: "application/json"
      },  
      body: JSON.stringify(product),
    }).then(res => res.text()).then(data => { return JSON.parse(data).product.id }).catch((error) => { console.log(error) })
  
    return response;
    };
