import React, {useState, useCallback} from 'react';
import {Select, Form, FormLayout, Checkbox, TextField, Button, Card, Toast, Frame} from '@shopify/polaris';
import styles from './css/AddOptions.module.css'
import EngravingForm from './EngravingForm';
import DropdownForm from './DropdownForm';

/* component that allows a user to select which option, dropdown or engraving, 
  that they would like to add to the selected product */
  
function AddOptions() {
        const [selected, setSelected] = useState('engraving');
        const [addOption, setAddOption] = useState(false);
        const handleSelectChange = useCallback((value) => setSelected(value), []);;
        const handleAddOption = useCallback((value) => {setAddOption(value), []
            if (selected == 'radiobutton') {
               setActive(true)
            }
        })
        ;;

        // option types
        const options = [
          {label: 'Engraving', value: 'engraving'},
          {label: 'Dropdown Menu', value: 'dropdown'},
        ];

        // if the user hasn't added an option, display the option type menu and add button
        if (!addOption) {
          return (
            <div className={styles.optionCard}>
              <Card
                sectioned
                title="Option Selection"
              >
              <p>
                Add options and variants if this product comes in multiple versions, like
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
                      onClick={(value) => handleAddOption(value)}
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
    
    // if the user selects and adds the engraving option, render the EngravingForm component
    if (selected == "engraving" && addOption) {
        return (
            <EngravingForm />
        )
    }

    // temporary usage of a toast component to alert the user that the radio button option is not available
    if (selected == "dropdown" && addOption) {
          return (
            <DropdownForm />
          );

        }
      }

export default AddOptions;
