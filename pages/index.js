import React from 'react';
import {Page, Button} from "@shopify/polaris";
//import ProductList from '../components/ProductList';
import Router from 'next/router';

class Index extends React.Component {
  render() {
    return (
      <Page>
            {/* redirect user to custom options page */}  
            <Button onClick = {() => Router.push('/optionSelection')}>Product Selection Page</Button>        
      </Page>          
    )
  }
}


export default Index;