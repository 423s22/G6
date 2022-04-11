import authFetch from "../../utils/AuthFetch";

function productOptions() {
  // get product options
 async function getOptions() {
   const targetURL = `/api/show-options/${productId.replace("gid://shopify/Product/", '')}`;
   // console.log(targetURL)
   const response = await authFetch(targetURL).then((res) => {console.log(res.status)
     console.log(res.body)
     if (res.status == 200) {     
     }});
   }
}