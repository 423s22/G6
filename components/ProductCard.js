import React from "react";
import {ResourceList, Thumbnail, ResourceItem, TextStyle}  from '@shopify/polaris';
import { useProductContext } from '../context/ProductContext';

function ProductCard() {

    const {productInfo, setProductInfo} = useProductContext();
    
  return (   
    <ResourceList
      resourceName={{singular: 'product', plural: 'products'}}
      items={[
        {
          id: productInfo.id,
          name: productInfo.handle,
        }
      ]}
      renderItem={(item) => {
        const {id, name } = item;
        const media = (
            <Thumbnail
                source={
                    productInfo.images[0]
                    ? productInfo.images[0].originalSrc
                    : ''
                    }
                alt={
                  productInfo.images[0].altText
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
    );  
  } 

export default ProductCard;
