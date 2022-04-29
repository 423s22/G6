import {Select, TextField, Button, Card, Icon} from '@shopify/polaris';
import { useProductContext } from '../context/ProductContext';
import styles from './css/DropdownForm.module.css';
import { MobileCancelMajor, MobileBackArrowMajor} from '@shopify/polaris-icons';
import AddOptions from './AddOptions';
import React, { useState, useCallback} from 'react';
import Creatable from 'react-select/creatable';
import authFetch from '../utils/AuthFetch';
import notifyError from './toasts/ErrorToast';
import notifySuccess from './toasts/PostSuccessToast';
import BuildOptions from '../helpers/BuildOptions';
import DeleteProduct from '../helpers/DeleteProduct';
import notifyRefresh from './toasts/RefreshToast';
import notifyPriceSuccess from './toasts/PriceSuccessToast'

/* component that allows a user to customize and add 
   a dropdown menut to their product */

function DropdownForm() {

  const [optionInputValue, setOptionInputValue] = useState('')      // user input into options textfield
  const [optionValues, setOptionValues] = useState('')              // user entered option values 
  const [optionsApplied, setOptionsApplied] = useState(false);    
  const [selectValue, setSelectValue] = useState('');             
  const [exitForm, setExitForm] = useState(false);
  const [price, setPrice] = useState('0');
  const [menuTitle, setMenuTitle] = useState('');                 // dropdown menu title
  const [submitted, setSubmitted] = useState(false);
  const [addOptionVal, setAddOptionVal] = useState('');           // copy of optionsInputValue

  // get product info from context
  const {productInfo, setProductInfo} = useProductContext() || {};

  const handlePriceChange = useCallback((value) => setPrice(value), []);   // update price 
  const handleTitleChange = useCallback((value) => setMenuTitle(validateInput(value)), []);   // update title 
  const handleSelectChange = useCallback((value) => {setSelectValue(value)}, []);       // update selected option
  const handleInputChange = (value) => {setOptionInputValue(validateInput(value)); setAddOptionVal(optionInputValue)};       // update selected option

  // post form data to the backend
  async function updateDB(dropdownInfo) {
    const response = await authFetch("/api/add-options", {
        method: "POST",
       headers: {
          Accept: "application/json"
        },  
        body: JSON.stringify(dropdownInfo),
      }).then((res) => {
        if (res.status == 200) {
            setSubmitted(true);    
            notifySuccess();      
            notifyRefresh();
        }

        else {
          notifyError();
          dropdownInfo.options.forEach(option => {    // delete created option products 
            DeleteProduct(option.productOptionId); 
          }); 
        }});
      }

   // create submit object 
   const handleSubmit = async () => {
    checkPrices();
     const dropdownInfo = {
         productId: productInfo.id.replace("gid://shopify/Product/", ''),
         optionType: 'dropdown',
         menuTitle: menuTitle,
         options: await BuildOptions(productInfo.title, menuTitle, optionValues)

     }
     updateDB(dropdownInfo)               // call function to add option to DB
    }; 

  
  const handleChange = (field, value) => {      // used to clear user inputed options
    switch (field) {
      case 'options':
        setOptionValues(value)
        break

      default:
        break
    }
  }

  // add option after pressing enter or tab
  const handleKeyDown = event => {   
  if (!optionInputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab': 
        setOptionValues([...optionValues, createOption(optionInputValue)])
        setOptionInputValue('')
        event.preventDefault()
        break

      default:
        break
    }
  }

  // used to create an option
  const createOption = label => ({
    label,
    value: label
  }); 

  const validateInput = (value) => {
    return value.replaceAll(/[&/\\#,+()$~%!;^':*?<>{}]/g, "");
  }

  // applies options
  const handleApplyOptions = () =>
  {
    if (menuTitle == '' || optionValues == '') {     // if user hasn't entered a title or any option values, return
      return;
    }
    setOptionsApplied(true);
    setSelectValue(optionValues[0].value)
  }

  // check that additional prices were applied, otherwise, apply default
  const checkPrices = () => {
    optionValues.forEach(element => {
      if (element.label === element.value) {     // if label and value are equal, no additional price was entered 
        element.value = "0";                       // set price to 0
      }
    });
  }

  const handleBackBtn = () => {
    setOptionsApplied(false);
  }

  // add option after clicking button
  const handleAddOption = () => {
    if (addOptionVal !== '') {
      setOptionValues([...optionValues, createOption(addOptionVal)])
      setOptionInputValue('')
    } 
  }

  // apply individual price to selected option
  const handleApplyPrice = () => {
    for (const option in optionValues) {
      if (optionValues[option].label == selectValue) {
        optionValues[option].value = price;
      }
    }
    notifyPriceSuccess();
      
    }

  // apply selected price to all options
  const handleApplyAllPrice = () => {
    for (const option in optionValues) {
        optionValues[option].value = price;   
    }
    notifyPriceSuccess();
  }

  // is user clicked exit button
  if (exitForm) {
    return (
        <AddOptions />
    )
  }
 
  // if user hasn't applied options
  if (!optionsApplied) {
  return (
    <div className={styles.EditOptionCard}>
        <Card
          sectioned={true}
        >
          <h2><b>Dropdown Menu</b></h2>
            <div className={styles.ExitButton}>
               <Button 
                  icon={MobileCancelMajor}
                  onClick = {() => setExitForm(true)} 
               />
            </div> 
            <Card.Section>
              <div className={styles.MenuTitle}>
                <TextField 
                value={menuTitle}
                onChange={handleTitleChange}
                label="Menu Title"
                type="text"
                requiredIndicator
                readOnly={false}
                helpText={
                 <span>
                    Please enter a menu title.
                </span>
                }
                />
              </div>
            </Card.Section>
            <Card.Section>
              <div className={styles.parentDiv}>
                <div className={styles.input}>
                  <label>Options(s)</label>
                    <Creatable
                      isClearable
                      isMulti
                      components={
                        { DropdownIndicator: null
                          }
                      }
                      inputValue={optionInputValue}
                      menuIsOpen={false}
                      onChange={(value) => handleChange('options', value)}
                      onKeyDown={handleKeyDown}
                      onInputChange={handleInputChange}
                      value={optionValues}
                    />
                    <p>Type option and press enter...</p>
                </div>
                <div className={styles.addOptionButton}>
                  <Button onClick={handleAddOption}>Add</Button>
                </div>
              </div>
              <div className={styles.ApplyOptionsBtn}>
                <Button onClick={handleApplyOptions}>Apply Options</Button>
              </div>
            </Card.Section>
          </Card>
      </div>
      );
   }

  if (optionsApplied) {
    if (submitted) {
      // navigate back to add options form and display success toast
      return (
        <div>
          <AddOptions />   
        </div>
      )
  }

  else {
    return (
      <div className={styles.EditPriceCard}>
        <Card
          sectioned={true}
        >
        <h2><b>Dropdown Menu</b></h2>
          <div className={styles.ExitButton}>
                            <Button icon={MobileCancelMajor}
                             onClick = {() => setExitForm(true)} />
          </div> 
          <Card.Section>
            <div className={styles.parentDiv}>
              <div className={styles.selectDiv}>
                <Select
                  label={`Menu Title: ${menuTitle}`}
                  options={optionValues}
                  value={selectValue}
                  onChange={handleSelectChange}
                  helpText={
                    "Select an option"
                  }
                />
               </div>
               <div className={styles.priceDiv}>
                <TextField               
                  value={price}
                  label="Price $"
                  type="number"
                  helpText={
                           "Please enter any additional cost associated with this option"
                           }
                  min={0}  
                  onChange={handlePriceChange}
                />
              </div>
                <div className={styles.ApplyPriceBtn}>
                  <Button
                    onClick={handleApplyPrice}>Apply</Button>
                    <p>Click here to apply price to selected option</p>
                    <div className={styles.ApplyAllBtn}>
                    <Button
                    onClick={handleApplyAllPrice}>Apply All</Button>
                    <p>Click here to apply price to all options</p>
                </div>
              </div> 
              </div>
              <div className={styles.backBtn}>
                <Button onClick={handleBackBtn}>
                <Icon
                  source={MobileBackArrowMajor}
                  color="base"
                  onCl 
                  />
                </Button>
              </div>
              <div className={styles.submitButton}>
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
          </Card.Section>
        </Card>
      </div>
      )
    }
  }
}

export default DropdownForm;
