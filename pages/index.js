import React from 'react';
import {Page, Button, Layout, Banner, EmptyState, AppProvider} from "@shopify/polaris";
//import ProductList from '../components/ProductList';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
/* adding note here */
class Index extends React.Component {

  render(){
  return (
    <Page title="Home Page">
      <Layout>
        <Layout.Section oneHalf>
          <Card title="Create Products">
            <Card.Section>
              <Thumbnail
                source="https://thumbs.dreamstime.com/b/web-186774980.jpg"
                size="large"
                alt="Click"
              />
              
              <EmptyState
              heading="Welcome to your custom options builder"
              action={{
                content: "Products Options",
                onAction: () => (Router.push('/add-options')),
              }}
              >
              <h2>To start creating your options</h2>
            </EmptyState>
            
            </Card.Section>

           
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="Samurai Shirt">
            <Card.Section>
              <Thumbnail
                source="https://thumbs.dreamstime.com/b/faq-icon-vector-illustration-eps-146073139.jpg"
                size="large"
                alt="Samurai Shirt"
              />

<EmptyState
            action={{
              content: "FAQ Page",
              onAction: () => (Router.push('/FAQindex')),
            }}
          ></EmptyState>
            </Card.Section>
            
            <Card.Section>
              <TextStyle varation="strong"> To view our most frequently asked questions press on the button above. </TextStyle>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
      ;
    </Page>
  );
};
}

export default Index;
