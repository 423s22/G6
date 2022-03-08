import React from 'react';
import { Heading, Page, TextStyle, Layout, EmptyState, Form, FormLayout, TextField, Button, Card} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ProductList from '../components/ProductList';
import Router from 'next/router';

class HomePage extends React.Component {
    state = {open: false};
    render(){
        return (
            <Page>
                <Button onClick={() => Router.push('/optionSelection')}>Option Selection</Button>
                <Button onClick={() => Router.push('/')}>Help</Button>
                {/* I dont think this is nessary 
                <Layout>
                    <EmptyState
                        heading="Home Page"
                        action={{
                            content: 'Option Selection',
                            onAction: () => this.setState({open: true}),
                        }}
                        action={{
                            content: 'Help',
                            onAction: () => this.setState({open: true}),
                        }}
                        >
                    </EmptyState>
                    </Layout> */}
             </Page>
        );
    }
    handleSelection = (resources) => {
        this.setState({open:fasle});
        console.log(resources);
    }
    //directing to options page
}

export default HomePage;