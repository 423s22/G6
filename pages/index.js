import React from 'react';
import {Page, Button, Layout, Banner, EmptyState} from "@shopify/polaris";
//import ProductList from '../components/ProductList';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
/* adding note here */
class Index extends React.Component {

  render() { 
    return (
      <Page>
            {/* redirect user to custom options page */}  
           {/* <Button onClick = {() => Router.push('/add-options')}>Product Selection Page</Button> */}      
         <Layout>
          <EmptyState
            heading="Welcome to your custom options builder"
            action={{
              content: "Products Options",
              onAction: () => (Router.push('/add-options')),
            }}
            >
            <h2>To start creating your options</h2>
          </EmptyState>
          
            <h2>If you get lost along the way visit our FAQ page</h2>
          <EmptyState
          action={{
            content: "FAQ Page",
            onAction: () => (Router.push('/FAQindex')),
          }}
        ></EmptyState>
          </Layout>
      </Page>          
    )
  }
}

export default Index;