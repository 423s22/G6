import authFetch from "../utils/AuthFetch";
import { useProductContext } from '../context/ProductContext';
import React, {useState} from 'react';
import {Card, Button} from  '@shopify/polaris';
import styles from './css/ShowOptions.module.css';
import {
  DeleteMinor, ViewMinor, HideMinor, RefreshMinor
} from '@shopify/polaris-icons';



function ShowOptions() {

   // get product info from context
  const {productInfo, setProductInfo} = useProductContext();
  const [productOptions, setProductOptions] = useState('');
  const [optionsLoaded, setOptionsLoaded] = useState(false);  


   // get product options
  async function getOptions() {
      const targetURL = `/api/show-options/${productInfo.id.replace("gid://shopify/Product/", '')}`;
      const response = await authFetch(targetURL,  {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          const responseData = json;
            if (res.status == 200) {    
              setProductOptions(responseData.productOptions);
              setOptionsLoaded(true);
            }
        });
      }
    })
  }

const hideOptions = () => {
  setOptionsLoaded(false);
}

const handleDropdownDeletion = (productId, optionType, menuTitle) => {
  const data = {
    productId: productId,
    optionType: optionType[0],
    menuTitle: menuTitle
  }
  console.log(data)
}

const handleEngravingDeletion = (productId, optionType) => {
  
  const data = {
    productId: productId,
    optionType: optionType[0]
  }
  console.log(data)
}

if (optionsLoaded) {
  productOptions.map((item) => (console.log(item.optionType)));
    return(
      <div className={styles.ShowOptionsCard}>
        <Card title={<div>
                      <div className={styles.hideBtn}>
                        <Button 
                          icon={HideMinor}
                          onClick={hideOptions}> 
                          Applied Options
                        </Button>
                      </div>
                      <div className={styles.refreshBtn}>
                        <Button 
                          icon={RefreshMinor}
                          onClick={getOptions}> 
                          Refresh
                        </Button>
                      </div>
                    </div>
                    }
        > 
         {productOptions.map((item, index) => (
            <div className={styles.parentOptionDiv}>
                {item.optionType == 'dropdown' ? (
                <div className={styles.optionDiv} key={index}>
                    <span><b>Option type:</b> Dropdown</span><div className={styles.deleteIcon}><Button icon= {DeleteMinor} onClick={handleDropdownDeletion(item.productId, item.optionType, item.menuTitle)}></Button></div>
                    <p>Menu title: {item.menuTitle} </p>
                    <p>Options: {item.options.map((option) => 
                    <span>{option}&nbsp;</span>
                  )}</p>
                </div>
              ) : (
                <div className={styles.optionDiv} key={index}>
                  <span><b>Option type:</b> Engraving</span><div className={styles.deleteIcon}><Button icon= {DeleteMinor} onClick={handleEngravingDeletion(item.productId, item.optionType)}></Button></div>                
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
      <Card title={<div className={styles.viewBtn}>
                      <Button 
                        icon={ViewMinor}
                        onClick={getOptions}> 
                        Applied Options
                       </Button>
                    </div>}
       >
      </Card>
  </div>
  );
  }
}
export default ShowOptions;
