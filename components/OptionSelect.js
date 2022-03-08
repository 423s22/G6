import {React, useState, useCallback} from 'react';
import {Select, Form, FormLayout, Checkbox, TextField, Button, Card} from '@shopify/polaris';
import OptionForm from './OptionForm';
import styles from '../components/OptionSelect.module.css'

function OptionSelect() {
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
            title="Options"
            actions={[
              { content: "Add Option", onAction: () => setAddOption(true)}
            ]}
          >
            <p>
              Add variants if this product comes in multiple versions, like
              different sizes or colors.
            </p>
          </Card>
          </div>
         /* <Select
            label="Option Types"
            options={options}
            onChange={displayForm}
            value={selected}
          /> */
        );
      }
    
    else {
        return (
            <OptionForm />
        )
    }
}

export default OptionSelect;