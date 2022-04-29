import React, {useState, useCallback} from 'react';
import {Select, Form, FormLayout, TextField, Button, Card} from '@shopify/polaris';
import { useProductContext } from '../context/ProductContext';
import styles from './css/EngravingForm.module.css';
import {
    MobileCancelMajor
  } from '@shopify/polaris-icons';
import AddOptions from './AddOptions';
import authFetch from '../utils/AuthFetch';
import CreateProduct from '../helpers/CreateProduct';
import DeleteProduct from '../helpers/DeleteProduct';
import notifyError from './toasts/ErrorToast';
import notifySuccess from './toasts/PostSuccessToast';
import notifyRefresh from './toasts/RefreshToast';


function EngravingForm() {

  // get product info from context
  const {productInfo, setProductInfo} = useProductContext() || {};

  const [selectedNumber, setSelectedNumber] = useState('1');
  const [description, setDescription] = useState('');  
  const [price, setPrice] = useState('0');
  const [exitForm, setExitForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleDescriptionChange = useCallback((value) => setDescription(validateInput(value)), []);
  const handlePriceChange = useCallback((value) => setPrice(value), []);

  
  // post form data to the backend
  async function updateDB(engravingInfo) {
    const response = await authFetch("/api/add-options", {
        method: "POST",
       headers: {
          Accept: "application/json"
        },  
        body: JSON.stringify(engravingInfo),
      }).then((res) => {
        if (res.status == 200) {
            setSubmitted(true);  
            notifySuccess();
            notifyRefresh();
        }
        else {         
            DeleteProduct(engravingInfo.productOptionId);  // if post is unsuccessful, delete option product
            notifyError();      
        }
    });
  }

  const validateInput = (value) => {
    return value.replaceAll(/[&/\\#,+()$~%;^':*?<>{}]/g, "");
  }

  // create submit object
  async function handleSubmit () {
     const engravingInfo = {
         productId: productInfo.id.replace("gid://shopify/Product/", ''),
         optionType: 'engraving',
         lines: selectedNumber,
         description: description,
         price: price,
         title: productInfo.title,
         variantId: productInfo.options[0].id.replace("gid://shopify/ProductOption/", '')
     }
     let productOptionId = await CreateProduct(engravingInfo);      // create product from option in Shopify and return back its productId
     engravingInfo.productOptionId = productOptionId;               // add ID of product option     
     updateDB(engravingInfo)                                        // call function to add option to DB
     }; 

   const numbers = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    ];
    
    if (submitted) {
        // navigate back to add options form and display success toast
        return (
            <AddOptions />   
        )
    }

    // if user clicked exit, navigate back to add options 
    if (exitForm) {
        return (
            <AddOptions />
        )
    }

    else {
    return (
        <div className={styles.EditOptionCard}>
            <Card
                sectioned={true}
            >
                <Form onSubmit={handleSubmit}>
                    <h2><b>Engraving</b></h2>
                <div className={styles.ExitButton}>
                            <Button icon={MobileCancelMajor}
                            onClick = {() => setExitForm(true)} />
                    </div> 
                    <FormLayout>
                         <Card.Section>  
                         <div className={styles.linesParentDiv}>
                            <div className={styles.numLinesDiv}>
                                <Select
                                    label="Number of Lines"
                                    options={numbers}
                                    onChange= {(value) => setSelectedNumber(value)}
                                    value={selectedNumber}
                                />   
                            </div>
                        </div>
                        </Card.Section>
                        <Card.Section>
                        <div className={styles.parentDiv}>
                            <div className={styles.descDiv}>
                                <TextField
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    label="Description"
                                    requiredIndicator={true}
                                    type="text"
                                    readOnly={false}
                                    helpText={
                                        <span>
                                            Please enter a description for your engraving option 
                                        </span>
                                    }
                                />
                            </div>
                            <div className={styles.priceDiv}>
                                 <TextField
                                    value={price}
                                    onChange={handlePriceChange}
                                    label="Price $"
                                    type="number"
                                    helpText={
                                            "Please enter a price for this option"
                                        }
                                    min={0}   
                                />
                            </div>
                        </div>
                        </Card.Section>
                        <Card.Section>
                        <div className={styles.parentDiv}>
                            <div className={styles.submitButton}>
                                <Button submit>Submit</Button>
                            </div>
                        </div>
                        </Card.Section>
                    </FormLayout>
                </Form>
            </Card>
        </div>
        )
        }
    }
export default EngravingForm;
