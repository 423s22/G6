import {React, useState, useCallback} from "react";
import {Toast, Frame} from '@shopify/polaris';

function SuccessToast() {
    const [active, setActive] = useState(true);
  
    const toggleActive = useCallback(() => setActive((active) => !active), []);
  
    const toastMarkup = active ? (
      <Toast content="Option Added Successfully" onDismiss={toggleActive} duration={4500} />
    ) : null;
  
    return (
      <div style={{height: '250px'}}>  
      <Frame>
            {toastMarkup}
        </Frame>
      </div>
    );
  }

  export default SuccessToast;