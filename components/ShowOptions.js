import authFetch from "../utils/AuthFetch";
import { useProductContext } from '../context/ProductContext';
import React, {useState} from 'react';
import {Card, Button, Title } from  '@shopify/polaris';
import styles from './css/ShowOptions.module.css';


function ShowOptions() {

   // get product info from context
  const {productInfo, setProductInfo} = useProductContext();
  const [productOptions, setProductOptions] = useState('');
  const [optionsLoaded, setOptionsLoaded] = useState(false);

   // get product options
  async function getOptions() {
    const targetURL = `/api/show-options/${productInfo.id.replace("gid://shopify/Product/", '')}`;
    // console.log(targetURL)
    const response = await authFetch(targetURL,  {
      //mode: "no-cors",
      method: "GET",
      headers: {
        Accept: "application/json"
      }
  }).then(res => {
    if (res.ok) {
      res.json().then(json => {
       // console.log(json);
        const responseData = json;
        if (res.status == 200) {    
          setProductOptions(responseData.productOptions);
          setOptionsLoaded(true);
        }
      });
    }
  })
}
  if (optionsLoaded) {
    console.log(productOptions)
    productOptions.map((item) => (console.log(item.optionType)));
    return(
      <div className={styles.ShowOptionsCard}>
        <Card>
          <h2><b>Applied Options</b></h2>
          {productOptions.map((item) => (
              <div className={styles.optionDiv}>
                  {item.optionType}
              </div>
          ))}
      </Card>
      </div>
    );
  }

else {
  return (
    <div className={styles.ShowOptionsCard}>
      <Card>
        <h2><b>Applied Options</b></h2>
          <Button onClick={getOptions}>
            Show Options 
          </Button>
      </Card>
    </div>
  );
  }
}
export default ShowOptions;
