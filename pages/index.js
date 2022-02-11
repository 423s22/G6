import { AppProvider, Card} from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';

function index() {
    return (
        <AppProvider>
        <Card title="Hello World" sectioned>
        <p>Hello Universe</p>
      </Card>
</AppProvider>
    )
}

export default index;