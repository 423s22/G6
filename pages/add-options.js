import React from 'react';
import {Card, Page} from '@shopify/polaris';
import SelectOptions from '../components/SelectOptions';

class CustomOptions extends React.Component {
  render() {
    return (
      <Page
  title="Add Product Options"
>
  <Card>
    <SelectOptions/>
  </Card>
</Page>
    );
  }
}
export default CustomOptions;
