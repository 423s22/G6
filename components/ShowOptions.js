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
import DeleteProduct from "../helpers/DeleteProduct";

// component that allows user to view and delete applied options 

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
          setOptionsLoaded(false);
        }
        else if (res.status == 200) {
        res.json().then(json => {
          const responseData = json;
              setProductOptions(responseData.productOptions);
              setOptionsLoaded(true);
            //  notifySuccess();
            })
          }
        else  {
                notifyError();                    // if get unsuccessful
              }
        });
  }
  
  // delete engraving options from DB
  async function deleteEngravingOption(productId, optionType, description, productOptionId) {
    const targetURL = `/api/delete-options/${productId}/${optionType}/${description}`;
    const response = await authFetch(targetURL,  {
      method: "DELETE",
        headers: {
          Accept: "application/json",
        }
     }).then(res => {
          if (res.status == 200) {
            notifyDeleteSuccess();
            getOptions();
            DeleteProduct(productOptionId);     // delete option product in Shopify
          }
          else {
            notifyError();
          }
        });
    }

const hideOptions = () => {
  setOptionsLoaded(false);
}

// delete dropdown options from DB
async function deleteDropdownOption(productId, optionType, menuTitle, options) {
  const targetURL = `/api/delete-options/${productId}/${optionType}/${menuTitle}`;
  const response = await authFetch(targetURL,  {
    method: "DELETE",
      headers: {
        Accept: "application/json",
      }
   }).then(res => {
        if (res.status == 200) {
          notifyDeleteSuccess();
          getOptions();                                     // refresh applied options

          for (var i in options) {                          // delete all products associated with the dropdown menu
            DeleteProduct(options[i].productOptionId);      // delete product in Shopify
          }
        }
        else {
          notifyError();
        }
      });
  } 

// if applied options has been clicked, display them
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
                        <p className = {styles.paragraph}>Hide applied options</p>
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
                    <span><b>Option type:</b> Dropdown</span><div className={styles.deleteIcon}><Button icon= {DeleteMinor} onClick={() => deleteDropdownOption(item.productId, item.optionType, item.menuTitle, item.options)}></Button></div>
                    <p>Menu title: {item.menuTitle} </p>
                    <div>Options: {item.options.map((element) => 
                          <p><span>&emsp;</span>{element.option.replace(/ /g, "")}: ${element.price}</p>)}
                    </div>
                </div>
              ) : (
                <div className={styles.optionDiv} key={index}>
                  <span><b>Option type:</b> Engraving</span><div className={styles.deleteIcon}><Button icon= {DeleteMinor} onClick={() => deleteEngravingOption(item.productId, item.optionType, item.description, item.productOptionId)}></Button></div>                
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

// if applied options have been hidden, display button
else {
  return (
    <div className={styles.ShowOptionsCard}>
      <Card title={<div className={styles.viewBtn}>
                      <Button 
                        icon={ViewMinor}
                        onClick={getOptions}> 
                        Applied Options
                       </Button>
                       <p className = {styles.paragraph}>View applied options</p>
                    </div>}
       >
         </Card>
    </div>
     
  );
  }
}
export default ShowOptions;
