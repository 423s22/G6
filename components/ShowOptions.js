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
  console.log(productOptions.options)
  productOptions.map((item) => (console.log(item.optionType)));
  return(
    <div className={styles.ShowOptionsCard}>
      <Card>
        <h2 className={styles.h2}><b>Applied Options</b></h2>
        {productOptions.map((item, index) => (
          <div>
              {item.optionType == 'dropdown' ? (
               <div className={styles.optionDiv} key={index}>
                <p><b>Option type:</b> Dropdown</p>
                <p>Menu title: {item.menuTitle} </p>
                <p>Options: {item.options.map((option) => 
                <span>{option}&nbsp;</span>
                  )}</p>
              {/* <span key={index}>Options: {item.options[0]} </span> */}
               </div>
              ) : (
                <div className={styles.optionDiv} key={index}>
                  <p><b>Option type:</b> Engraving</p>                
                  <p>Description: {item.description} </p>
                  <p>Number of lines: {item.lineNum} </p>
                  <p>Price: {item.price} </p>
                </div>
              )}
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
