import authFetch from "../utils/AuthFetch";

// DELETE to backend route that deletes product in Shopify admin
export default async function DeleteProduct(productId) {

  const response = await authFetch(`/api/delete-product-option/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      },  
    }).then(res => res.text()).then(data => {}).catch((error) => { console.log(error) })
  
    return response;
    };