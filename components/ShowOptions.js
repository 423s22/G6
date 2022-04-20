import authFetch from "../utils/AuthFetch";
import { useProductContext } from '../context/ProductContext';
import React, {useState} from 'react';
import {Card, Button} from  '@shopify/polaris';
import styles from './css/ShowOptions.module.css';
import {
  DeleteMinor, ViewMinor, HideMinor, RefreshMinor
} from '@shopify/polaris-icons';
import notifyError from "./toasts/ErrorToast";
import notifySuccess from "./toasts/ErrorToast";
import notifyDeleteSuccess from "./toasts/DeleteSuccessToast";
import notifyEmpty from "./toasts/EmptyToast";

function ShowOptions() {

   // get product info from context
  const {productInfo, setProductInfo} = useProductContext() || {};
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
        if (res.status == 204) {
          notifyEmpty();              // if no options are currently applied
        }
        else if (res.status == 200) {
        res.json().then(json => {
          const responseData = json;
              setProductOptions(responseData.productOptions);
              setOptionsLoaded(true);
            //  notifySuccess();
            })
          }
        if (res.status == 500) {
                notifyError();                    // if get unsuccessful
              }
        });
  }
  
  async function deleteOption(productId, optionType) {
    const targetURL = `/api/delete-options/${productId}/${optionType}`;
    const response = await authFetch(targetURL,  {
      method: "DELETE",
        headers: {
          Accept: "application/json",
        }
     }).then(res => {
          if (res.status == 200) {
            notifyDeleteSuccess();
            getOptions();
          }
        });
    }

const hideOptions = () => {
  setOptionsLoaded(false);
}

const handleDropdownDeletion = (productId, optionType) => {
  deleteOption(productId, optionType);
}

const handleEngravingDeletion = (productId, optionType) => {
  deleteOption(productId, optionType);
}

if (optionsLoaded) {
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
                {item.optionType.includes('dropdown') ? (
                <div className={styles.optionDiv} key={index}>
                    <span><b>Option type:</b> Dropdown</span><div className={styles.deleteIcon}><Button icon= {DeleteMinor} onClick={() => handleDropdownDeletion(item.productId, item.optionType)}></Button></div>
                    <p>Menu title: {item.menuTitle} </p>
                    <p>Options: {item.options.map((element) => 
                          <p>&emsp;{element.label}: ${element.value}&nbsp;</p>)}
                    </p>
                </div>
              ) : (
                <div className={styles.optionDiv} key={index}>
                  <span><b>Option type:</b> Engraving</span><div className={styles.deleteIcon}><Button icon= {DeleteMinor} onClick={() => handleEngravingDeletion(item.productId, item.optionType)}></Button></div>                
                  <p>Description: {item.description} </p>
                  <p>Number of lines: {item.lineNum} </p>
                  <p>Price: ${item.price} </p>
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
