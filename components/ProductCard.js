import React from "react";
import {ResourceList, Thumbnail, ResourceItem, TextStyle}  from '@shopify/polaris';
import { useProductContext } from '../context/ProductContext';
import { ProductsMajor} from '@shopify/polaris-icons';

/* component that display the selected product to the user, 
  and allows them to return to product selection */

function ProductCard() {

  const {productInfo, setProductInfo} = useProductContext() || {};
    
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
        console.log(productInfo)
        const media = (
            <Thumbnail
                source={
                    (productInfo.images.length > 0)
                    ? productInfo.images[0].originalSrc
                    : ProductsMajor                         // if no image available, display default product icon
                    }
                alt={
                  (productInfo.images.length > 0) ?
                   productInfo.images[0].altText : "default product image"
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
