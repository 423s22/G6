import React from 'react';
import { Heading, Page, TextStyle, Layout, EmptyState, Form, FormLayout, TextField, Button, Card} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ProductList from '../components/ProductList';
import Router from 'next/router';


class CustomOptions extends React.Component {

  state = { open: false };      // for resource picker

  render() {
    return (

      <Page>
          {/* redirect user to home page */}
          <Button onClick = {() => Router.push('/')}>Homepage</Button>
        <ResourcePicker // Resource picker component to select products
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => this.setState({ open: false })}
        />
        

        <Layout>
          <EmptyState
            heading="Add product options"
            action={{
              content: 'Select products',
              onAction: () => this.setState({ open: true }),
            }}
          >
            <p>Select products to add options.</p>
          </EmptyState>
         {/* <ProductList /> */}
        </Layout> 
      </Page>
    );
  }
  handleSelection = (resources) => {
    this.setState({ open: false });
    console.log(resources);
}
}

export default CustomOptions;