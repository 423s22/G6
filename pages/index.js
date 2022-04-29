import React from 'react';
import { Page , Layout , Card, TextStyle, Thumbnail, Button, ButtonGroup, AppProvider, EmptyState, CalloutCard, MediaCard} from "@shopify/polaris";
//import ProductList from '../components/ProductList';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import Router from 'next/router';
/* adding note here */
class Index extends React.Component {

  render(){
 return (
      <Page title="Rival Dynamic Pricing">
        <Card title="About this app" sectioned>
          <p>
            This app focuses on dynamically changing the pricing for each item
            purchased, Shopify does not have a dynamic price change for
            variations of items. Total cost, including hidden variation costs,
            is shown at the cart once you've finalized your purchases but fails
            to show the pricing when you are shopping.
          </p>
        </Card>
        <CalloutCard
          title="Select and Create Products"
          illustration="https://thumbs.dreamstime.com/b/web-186774980.jpg"
          primaryAction={{
            content: "Create Options",
            onAction: () => Router.push("/add-options")
          }}
        >
          <p>
            {" "}
            The button below will lead you to the product management page, where
            you may add products and their respective variations.
          </p>
        </CalloutCard>

        <CalloutCard
          title="Frequently Asked Questions"
          illustration="https://thumbs.dreamstime.com/b/faq-icon-vector-illustration-eps-146073139.jpg"
          primaryAction={{
            content: "FAQ",
            onAction: () => Router.push("/FAQindex")
          }}
        >
          <p>
            If you have any questions on how to use the app please refer to the
            FAQ, there you will help on how to create, delete and modify
            products.
          </p>
        </CalloutCard>

        <MediaCard
          title="About Us"
          description="Rival is a group of MSU students who are enthusiatic about creating a user friendly
    dynamic pricing app for Shopify. The group is made up 
    of six individuals: Daniel Vinogradov (very handsome), Riley Slater,
  James Marsh, Lenin Lewis, Alyssa Newhart, and Will Cook. The project was
 first conceptualized by Tessa who tried to help a client choose variation
 pricing for paintings of different sizes. From there, we have applied ourselves
 to create an app an that can cover all  product variations and their pricing."
        >
          <img
            alt="Rival Logo"
            width="100%"
            height="100%"
            style={{ objectFit: "contain", objectPosition: "center" }}
            src="https://i.ibb.co/qjTQYGt/logo.png"
          /> 
        </MediaCard>
      </Page>
    );
};
}

export default Index;
