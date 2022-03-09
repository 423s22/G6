import {React, useState, useCallback} from 'react';
import {Select, Form, FormLayout, Checkbox, TextField, Button, Card} from '@shopify/polaris';
import { useAppContext } from '../context/AppContext';
import styles from '../components/OptionForm.module.css'



function OptionForm() {

  const {productInfo, setProductInfo} = useAppContext();

  const [selectedOption, setSelectedOption] = useState('Options');
        const [addOption, setAddOption] = useState(false);
      
        const handleSelectChange = useCallback((value) => setSelectedOption(value), []);;

        const options = [
          {label: 'Engraving', value: 'engraving'},
          {label: 'Radio Button', value: 'radiobutton'},
        ];
      
            
            
                    const [newsletter, setNewsletter] = useState(false);
                    const [email, setEmail] = useState('');
                    const [price, setPrice] = useState('');

                    const handleSubmit = useCallback((_event) => {
                      setEmail('');
                      setNewsletter(false);
                    }, []);
                  
                    const handleNewsLetterChange = useCallback(
                      (value) => setNewsletter(value),
                      [],
                    );
                  
                    const handleEmailChange = useCallback((value) => setEmail(value), []);
                    const handlePriceChange = useCallback((value) => setEmail(value), []);

                    if (selectedOption == "engraving") {
                      return (
                        <div className={styles.EditOptionCard}>
                      <Card
                      sectioned={true}>
                        <Card.Section>

                        <Form onSubmit={handleSubmit}>
                        <FormLayout>

                        <div className={styles.OptionSelect}>
                        <Select
                          label="Options"
                          options={options}
                          onChange={handleSelectChange}
                          value={selectedOption}
                        />
                        </div>                  
                          <TextField
                            value={'description'}
                            onChange={handleEmailChange}
                            label="Engraving"
                            type="text"
                            helpText={
                              <span>
                                We’ll use this email address to inform you on future changes to
                                Polaris.
                              </span>
                            }
                          />

                          <div className={styles.priceDiv}>
                          <TextField
                            value={price}
                            onChange={handlePriceChange}
                            label="Price"
                            type="text"
                            helpText={
                              "Please enter any additional cost associated with this option"
                            }
                          />
                          </div>
                  
                          <Button submit>Submit</Button>
                        </FormLayout>
                      </Form>
                      </Card.Section>
                      </Card>
                      </div>
                      )
                    }
                  
                    return (
                      <div className={styles.AddOptionCard}>
                      <Card>
                        <div className={styles.OptionSelect}>
                        <Select
                          label="Options"
                          options={options}
                          onChange={handleSelectChange}
                          value={selectedOption}
                        />
                        </div>
                      </Card>
                      </div>
                    );
                  }
                
                export default OptionForm;