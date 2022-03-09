import React from 'react';
import {Page, Layout, EmptyState, Banner} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
import ProductCard from '../components/ProductCard';
import AddOptions from '../components/AddOptions';
import styles from '../css/add-options.module.css';

class CustomOptions extends React.Component {

  state = { open: false };      // for resource picker
  state = {productSelect: false};  // for display of resource picker
  state = {product: null};

  handleSelection = (resources) => {
    this.setState({ open: false });
   /* console.log(resources);
    console.log(resources.selection[0].title)
    console.log(resources.selection[0].images[0]) */
    this.setState({product: resources})
  }

  render() {

    if (!this.state.productSelect) {
    return (
      <Page>
          {/* redirect user to home page */}
       {/* <Button onClick = {() => Router.push('/')}>Homepage</Button> */}
        <ResourcePicker // Resource picker component to select products
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={(resources) => this.handleSelection(resources)}
          onCancel={() => {this.setState({ open: false }), this.setState({productSelect: true})}}
          selectMultiple={false}
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
        </Layout> 
      </Page>
    );
  }

  else {
    return (
      <Layout>
         <Layout.Section>
           <div className={styles.Banner}>
              <Banner
                title="Selected Product"
                onDismiss={() => this.setState({productSelect: false})}
              >
                <ProductCard product = {this.state.product} />
              </Banner>
            </div>
          </Layout.Section>
          <Layout.Section>
            <AddOptions />
          </Layout.Section>
    </Layout>
    )
  }
  }
}

export default CustomOptions;