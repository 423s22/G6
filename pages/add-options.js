import React from 'react';
import {Button, Card, Page} from '@shopify/polaris';
import SelectOptions from '../components/SelectOptions';
import Router from 'next/router';

class CustomOptions extends React.Component {
  render() {
    return (
      <Page
  breadcrumbs={[{content: 'Homepage',  onAction: () => (Router.push('/index'))}]}
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
