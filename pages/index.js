import { AppProvider, Card, Page, ResourceList, TextStyle, Avatar} from "@shopify/polaris";
import React from "react";

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