import React from 'react';
import {Button, Card, Page} from '@shopify/polaris';
import SelectOptions from '../components/SelectOptions';
import Router from 'next/router';

class CustomOptions extends React.Component {
  render() {
    return (
      <Page
  //removing breadcrumb for now, might use an emptystate with an icon to go back, cant seem to find url for homepag
  title="Add Product Options"
>
  <Card title="Select Products to add." sectioned>
    <SelectOptions/>
  </Card>
</Page>
    );
  }
}
export default CustomOptions;
