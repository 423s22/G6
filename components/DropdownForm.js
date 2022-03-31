import {Select, Form, FormLayout, TextField, Button, Card} from '@shopify/polaris';
import { useProductContext } from '../context/ProductContext';
import styles from './css/DropdownForm.module.css';
import {
    MobileCancelMajor
  } from '@shopify/polaris-icons';
import AddOptions from './AddOptions';
//const filter = createFilterOptions();
import React, { useState, useCallback } from 'react';
import Creatable from 'react-select/creatable';

function DropdownForm() {

  const [optionInputValue, setOptionInputValue] = useState('')
  const [optionValue, setOptionValue] = useState('')
  const [optionsApplied, setOptionsApplied] = useState(false);

  const options = [{label: "S", value: "S" },
  {label: "M", value: "M" },
  {label: "XL", value: "XL" }]

  const handleChange = (field, value) => {
    switch (field) {
      case 'options':
        setOptionValue(value)
        break

      default:
        break
    }
  }

  const handleKeyDown = event => {
  if (!optionInputValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        setOptionValue([...optionValue, createOption(optionInputValue)])
        setOptionInputValue('')
        event.preventDefault()
        break

      default:
        break
    }
  }

  const createOption = label => ({
    label,
    value: label
  })

  const handleInputChange = (value) => 
  {
    setOptionInputValue(value)
  }

  const [menuTitle, setMenuTitle] = useState('');
  const handleTitleChange = useCallback((value) => setMenuTitle(value), []);
  
  const handleSubmit = () =>
  {
    console.log(optionValue);
    setOptionsApplied(true);
   
  }
 
  if (!optionsApplied) {
  return (
    <div className={styles.EditOptionCard}>
            <Card
                sectioned={true}
            >
<Form onSubmit={handleSubmit}>
<h2><b>Dropdown Menu</b></h2>
<Card.Section>
  <div className={styles.MenuTitle}>
  <TextField 
  value={menuTitle}
  onChange={handleTitleChange}
  label="Title"
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
<div className={styles.input}>
<label>Options(s)</label>
<Creatable
  isClearable
  isMulti
  components={
    { DropdownIndicator: null }
  }
  inputValue={optionInputValue}
  menuIsOpen={false}
  onChange={(value) => handleChange('options', value)}
  placeholder='Type option and press enter...'
  onKeyDown={handleKeyDown}
  onInputChange={handleInputChange}
  value={optionValue}
/>
</div>
<div className={styles.ApplyOptionsBtn}>
<Button submit>Apply Options</Button>
</div>
</Card.Section>
</Form>
</Card>
</div>
);
  }

  if (optionsApplied) {
    console.log(typeof optionInputValue)
    return (
      <Card.Section>
<Select
      label="Date range"
      options={optionInputValue}
      value={optionValue}
    />

</Card.Section>
    )
  }
}

export default DropdownForm;




   ////  const options = ['One', 'Two', 'Three', 'Four'];

  // get product info from context
 /* const {productInfo, setProductInfo} = useProductContext();
  console.log(productInfo)

  const [selectedNumber, setSelectedNumber] = useState('1');
  const [description, setDescription] = useState('description');
  const [price, setPrice] = useState('0');
  const [exitForm, setExitForm] = useState(false); */
 
 // const handleDescriptionChange = useCallback((value) => setDescription(value), []);
//  const handlePriceChange = useCallback((value) => setPrice(value), []);

  // const [item, setItem] = useState('menu item');


   // const [selected, setSelected] = useState('today');
  
   /* const handleSelectChange = useCallback((value) => setSelected(value), []);
    const addItem = () => {
        items.push({label: item, value: item})
        console.log(items)
    }
      /*  function selectedItems() {
        <Select
    label="Items"
    options={items}
    onChange={handleSelectChange}
    value={selected}
  />} */

    
   /* const items = [
      
    ]; */
  
    
  
 
  


 /* const handleItemChange = useCallback((value) => setItem(value), []);
  const handleSubmit = useCallback((_event) => {
    console.log(_event);
  }, []); */

  
    
   /* if (exitForm) {
        return (
            <AddOptions />
        )
    } */

  /*  else {
        console.log(selectedNumber) */

 /*   <div style={{ marginLeft: '40%', marginTop: '60px' }}>
      <h3>Greetings from GeeksforGeeks!</h3>
      <Autocomplete
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push(`Add "${params.inputValue}"`);
          }
          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={options}
        renderOption={(option) => option}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Enter Something"
            variant="outlined" />
        )}
      />
    </div> */
 
  

      //  </div>
        /* <div >
           <Card
                sectioned={true}
            >
                <Form onSubmit={handleSubmit}>
                    <h2><b>Dropdown Menu</b></h2>
                <div className={styles.ExitButton}>
                            <Button icon={MobileCancelMajor}
                            onClick = {() => setExitForm(true)} />
                    </div> 
                    <FormLayout>
                         <Card.Section>  
                            <div className={styles.numLinesDiv}>
                                    <TextField
                                    value = {item}
                                    onChange={handleItemChange}
                                    label="menuItem"
                                    type="text"
                                    readOnly={false}
                                    helpText={
                                        <span>
                                            Please enter a menu item
                                        </span>
                                    }
                                    >

                                    </TextField>
                          
                                    <Button onClick={addItem}>Add Item</Button>

                                    <selectedItems />
                            </div> */
                            
                   /*       </Card.Section>   
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
                                    </Card.Section> */
                ///    </FormLayout>
             //   </Form>
           // </Card>
       // </div>
      //  )
        
  //  )}
                                    
