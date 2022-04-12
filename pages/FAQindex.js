import { AppProvider } from "@shopify/polaris";
import React from "react";
import FAQ from "./FAQ"

class FAQindex extends React.Component {
    render(){
        return(
            <AppProvider>
                <FAQ />
            </AppProvider>
        );
    }
}
export default FAQindex; 