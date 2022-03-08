import React from "react";
//import {Card} from "react-bootstrap";
import {Card, ResourceList, Thumbnail, Stack, ResourceItem, TextStyle, CalloutCard}  from '@shopify/polaris';
import styles from './ProductCard.module.css';
import { Router } from "next/router";
function ProductCard({product}) {

    console.log(product)
    console.log(product.selection[0].images[0])
    
return (
   
   // <Card style="width: 400px">
  // <div style="width: 400px">
 // <div className={styles.productCard}>
 //<Card>
      
    <ResourceList
      resourceName={{singular: 'product', plural: 'products'}}
      items={[
        {
          id: product.id,
          name: product.selection[0].title,
        }
      ]}
      renderItem={(item) => {
        const {id, name } = item;
        const media = (
            <Thumbnail
                source={
                    product.selection[0].images[0]
                    ? product.selection[0].images[0].originalSrc
                    : ''
                    }
                alt={
                    product.selection[0].images[0].altText
                      }
                   /> 
        );
  
        return (
            <ResourceItem
                id={id}
                media={media}
                accessibilityLabel={`${name}`}
            >
            <h3>
                <TextStyle variation="strong">{name}</TextStyle>
            </h3>
          </ResourceItem>
        );
      }}
     />
//</Card>
//</div>  
);

} 

export default ProductCard;
