import {React, useState, useCallback} from 'react';
import {Select, Form, FormLayout, Checkbox, TextField, Button, Card} from '@shopify/polaris';
import styles from './css/AddOptions.module.css'
import EngravingForm from './EngravingForm';

function AddOptions() {
        const [selected, setSelected] = useState('engraving');
        const [addOption, setAddOption] = useState(false);
      
        const handleSelectChange = useCallback((value) => setSelected(value), []);;

        const options = [
          {label: 'Engraving', value: 'engraving'},
          {label: 'Radio Button', value: 'radiobutton'},
        ];
      
        if (!addOption) {
          return (
            <div className={styles.optionCard}>
              <Card
                sectioned
                title="Option Selection"
              >
              <p>
                Add Options and Variants if this product comes in multiple versions, like
                different sizes or colors.
              </p>

              <Card.Section>
                <div className = {styles.parentDiv}>
                  <div className={styles.selectionDiv}>
                    <Select
                    label="Option Types"
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                    /> 
                   </div>

                  <div className={styles.addOptionBtn}>
                    <Button
                      onClick={() => setAddOption(true)}
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              </Card.Section>
            </Card>
          </div>   
        );
      }
    
    if (selected == "engraving" && addOption) {
        return (
            <EngravingForm />
        )
    }
}

export default AddOptions;