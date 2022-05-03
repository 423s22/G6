import authFetch from "../utils/AuthFetch";

// POST to backend route that create product in Shopify admin
export default async function CreateProduct(data) {
  var product;
  
  if (data.optionType == "engraving") {
    // build product object
    product = {
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
}

  if (data.optionType == "dropdown") {
  // build product object
    product = {
      "product": {
        "title": `${data.title} ${data.menuTitle} ${data.optionName}`,
        "product_type": `${data.optionType}`,
        "variants": [
          {
            "title": `${data.menuTitle} ${data.optionName}`,
            "price": `${data.price}`,
        }
      ],
      "status": "archived",    // make it an archived product so it won't be shown on the store front
  }
 } 
}

  const response = await authFetch("/api/add-product-option", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },  
      body: JSON.stringify(product),
    }).then(res => res.text()).then(data => { 
        let info = {
          productOptionId:JSON.parse(data).product.id, 
          optionVariantId: JSON.parse(data).product.options[0].id
        }; return info; }).catch((error) => { console.log(error) })
  
    return response;    // productId
  };

