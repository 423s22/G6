import React, {useState, useCallback} from 'react';
import {Select, Form, FormLayout, TextField, Button, Card} from '@shopify/polaris';
import { useProductContext } from '../context/ProductContext';
import styles from './css/EngravingForm.module.css';
import {
    MobileCancelMajor
  } from '@shopify/polaris-icons';
import AddOptions from './AddOptions';
import app from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import authFetch from '../utils/AuthFetch';
import SuccessToast from './SuccessToast';


function EngravingForm() {

  // get product info from context
  const {productInfo, setProductInfo} = useProductContext();
  

  const [selectedNumber, setSelectedNumber] = useState('1');
  const [description, setDescription] = useState('description');
  const [price, setPrice] = useState('0');
  const [exitForm, setExitForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleDescriptionChange = useCallback((value) => {setDescription(validateInput(value))}, []);
  const handlePriceChange = useCallback((value) => setPrice(value), []);

  // post form data to the backend
  async function updateDB(engravingInfo) {
    const response = await authFetch("/api/add-options", {
        method: "POST",
       headers: {
          Accept: "application/json"
        },  
        body: JSON.stringify(engravingInfo),
      }).then((res) => {console.log(res.status)
        if (res.status == 200) {
            setSubmitted(true);    
            return (
                <div>
                    <SuccessToast />
                </div>
            );      
        }});
  }

  const validateInput = (value) => {
    return value.replaceAll(/[&/\\#,+()$~%;^'":*?<>{}]/g, "");
  }

  const handleSubmit = () => {
     const engravingInfo = {
         productId: productInfo.id,
         optionType: 'engraving',
         lines: selectedNumber,
         description: description,
         price: price,
     }
     updateDB(engravingInfo)
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
            <div>
            <AddOptions />   
            </div>
        )
    }

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
                            <div className={styles.numLinesDiv}>
                                <Select
                                    label="Number of Lines"
                                    options={numbers}
                                    onChange= {(value) => setSelectedNumber(value)}
                                    value={selectedNumber}
                                />   
                            </div>
                        </Card.Section>   
                        <Card.Section>
                            <div className={styles.descDiv}>
                                <TextField
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    label="Engraving"
                                    type="text"
                                    readOnly={false}
                                    helpText={
                                        <span>
                                            Please enter a description of your engraving option. 
                                        </span>
                                    }
                                />
                            </div>
                        </Card.Section>
                        <Card.Section>
                            <div className={styles.priceDiv}>
                                 <TextField
                                    value={price}
                                    onChange={handlePriceChange}
                                    label="Price"
                                    type="number"
                                    helpText={
                                            "Please enter any additional cost associated with this option"
                                        }
                                    min={0}   
                                />
                            </div>
                            <div className={styles.submitButton}>
                                <Button submit>Submit</Button>
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
