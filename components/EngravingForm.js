import {React, useState, useCallback} from 'react';
import {Select, Form, FormLayout, Checkbox, TextField, Button, Card} from '@shopify/polaris';
import { useProductContext } from '../context/ProductContext';
import styles from './css/EngravingForm.module.css'

function EngravingForm() {

  // get product info from context
  const {productInfo, setProductInfo} = useProductContext();
  console.log(productInfo)

  const [selectedOption, setSelectedOption] = useState('Options');
  const [selectedNumber, setSelectedNumber] = useState(1);
  const [description, setDescription] = useState('description');
  const [price, setPrice] = useState('0');

  const handleSelectChange = useCallback((value) => setSelectedOption(value), []);;
  const handleSelectNumber = useCallback((value) => setSelectedNumber(value), []);;
  const handleDescriptionChange = useCallback((value) => setDescription(value), []);
  const handlePriceChange = useCallback((value) => setPrice(value), []);

  const handleSubmit = useCallback((_event) => {
    // to be implemented
  }, []);

  const options = [
    {label: 'Engraving', value: 'engraving'},
    {label: 'Radio Button', value: 'radiobutton'},
    ];

   const numbers = [
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    ];
    
    return (
        <div className={styles.EditOptionCard}>
            <Card
                sectioned={true}>
                <Form onSubmit={handleSubmit}>
                    <FormLayout>
                         <Card.Section>
                            <div className={styles.OptionSelect}>
                                <Select
                                    label="Options"
                                    options={options}
                                    onChange={handleSelectChange}
                                    value={selectedOption}
                                />
                            </div>    
                            <div className={styles.numLinesDiv}>
                                <Select
                                    label="Number of Lines"
                                    options={numbers}
                                    onChange={handleSelectNumber}
                                    value={selectedNumber}
                                    type="number"
                                    min={0}  // not functional, need to set min price value 
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

export default EngravingForm;