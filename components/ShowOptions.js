import React from "react";
import authFetch from "../../utils/AuthFetch";
import { useProductContext } from '../context/ProductContext';
import {React} from 'react';

function ShowOptions() {

   // get product info from context
  const {productInfo, setProductInfo} = useProductContext();

   // get product options
  async function getOptions() {
    const targetURL = `/api/show-options/${productInfo.id.replace("gid://shopify/Product/", '')}`;
    // console.log(targetURL)
    const response = await authFetch(targetURL).then((res) => {console.log(res.status)
      console.log(res.body)
      if (res.status == 200) {     
      }});
    }
}
export default ShowOptions;