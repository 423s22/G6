import React from 'react';
import { Heading, Page, TextStyle, Layout, EmptyState} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ProductList from '../components/ProductList';

class Index extends React.Component {
  state = { open: false };
  render() {
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true }),
          }}
        />
        <ResourcePicker // Resource picker component
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
            <p>Select products to add more options.</p>
          </EmptyState>
          <ProductList />
        </Layout>
    
      </Page>
    );
  }
  handleSelection = (resources) => {
    this.setState({ open: false });
    console.log(resources);
    return (
<div></div>
    );
  };
}
export default Index;