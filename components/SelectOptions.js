import React, { useState } from 'react';
import {Page, Layout, Banner, EmptyState} from "@shopify/polaris";
import { ResourcePicker} from '@shopify/app-bridge-react';
import ProductCard from '../components/ProductCard';
import AddOptions from '../components/AddOptions';
import styles from './css/SelectOptions.module.css';
import { useProductContext } from '../context/ProductContext';
import ShowOptions from './ShowOptions';

// component that allows user to select a product to add options to 

function SelectOptions() {

  const [open, setOpen] = useState(false);        // state of product selector
  const {productInfo, setProductInfo} = useProductContext() || {};

  const handleSelection = (resources) => {
    setOpen(false);
    setProductInfo(resources.selection[0]);
  }

  // if product had not been selected
    if (!productInfo) {
    return (
      <Page>
        <ResourcePicker 
          resourceType="Product"
          showVariants={false}
          open={open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => {setOpen(false)}}
          selectMultiple={false}
          showArchived={false}
        />
        <Layout>
        <EmptyState
            heading="Add Product Options"
            action={{
              content: 'Select product',
              onAction: () => setOpen(true),
            }}
         >
            <p>Select a product to add options</p>
          </EmptyState>
        </Layout> 
      </Page>
    );
  }

  // if product selected
  if (productInfo) {
  return (
      <Layout>
         <Layout.Section>
           <div className={styles.Banner}>
              <Banner
                title="Selected Product"
                onDismiss={() => {setProductInfo(null)}}
              >
                <ProductCard />
              </Banner>
            </div>
          </Layout.Section>
          <Layout.Section>
            <AddOptions />
          </Layout.Section>
          <Layout.Section>
            <ShowOptions />
          </Layout.Section>
    </Layout>
    ) 
  } 
}


export default SelectOptions;
