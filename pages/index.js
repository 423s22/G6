import React from 'react';
import { Page , Layout , Card, TextStyle, Thumbnail, Button, ButtonGroup, AppProvider, EmptyState, CalloutCard} from "@shopify/polaris";
//import ProductList from '../components/ProductList';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
/* adding note here */
class Index extends React.Component {

  render(){
  return (
    <Page>
    <CalloutCard
  title="Home Page"
  illustration="https://cdn.shopify.com/s/files/1/0626/6771/8904/files/logo_256x256_crop_center.png?v=1649899346"
>
  <p>Welcome to Eagle Apparel </p>
</CalloutCard>
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
                action={{
                content: "Products Options",
                onAction: () => (Router.push('/add-options')),
              }}
              >
             
            </EmptyState>
            
            </Card.Section>
             <Card.Section>
              <TextStyle varation="strong"> To create a product select Product Options, from there you may be able to create a list of products. </TextStyle>
            </Card.Section>
           
          </Card>
        </Layout.Section>

        <Layout.Section oneHalf>
          <Card title="Frequently Asked Questions">
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
    </Page>
  );
};
}

export default Index;
