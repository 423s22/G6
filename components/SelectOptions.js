import React, {useState} from 'react';
import {Page, Layout, EmptyState, Banner} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import ProductCard from '../components/ProductCard';
import AddOptions from '../components/AddOptions';
import styles from './css/SelectOptions.module.css';
import { useProductContext } from '../context/ProductContext';
import ShowOptions from './ShowOptions';

function SelectOptions() {

  const [open, setOpen] = useState(false);
  const [productSelect, setProductSelect] = useState(false);
  const {productInfo, setProductInfo} = useProductContext();
 // console.log(productInfo)

  const handleSelection = (resources) => {
    setOpen(false);
    setProductInfo(resources.selection[0]);
   // console.log(productInfo);
  }

    if (!productSelect || !productInfo) {
    return (
      <Page>
        <ResourcePicker // Resource picker component to select products
          resourceType="Product"
          showVariants={false}
          open={open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => {setOpen(false), setProductSelect(true)}}
          selectMultiple={false}
        />
        <Layout>
          <EmptyState
            heading="Add product options"
            action={{
              content: 'Select products',
              onAction: () => setOpen(true),
            }}
          >
            <p>Select products to add options.</p>
          </EmptyState>
        </Layout> 
      </Page>
    );
  }

  if (productSelect) {
  return (
      <Layout>
         <Layout.Section>
           <div className={styles.Banner}>
              <Banner
                title="Selected Product"
                onDismiss={() => {setProductSelect(false), setProductInfo(null)}}
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
