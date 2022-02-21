import { gql, useQuery } from '@apollo/client';
import {Card, ResourceList, Stack, TextStyle} from '@shopify/polaris';

const GET_PRODUCTS = gql`
  query {
    products(first: 6) {
      edges {
        node {
          title
          description
          id
          variants(first:1)
      {
        edges
      	{
          node
          {
            price
          }
        }
      }
        }
      }
    }
  }
`

export default function ProductList () {

      const { loading, error, data, networkStatus } = useQuery(GET_PRODUCTS)
          if (loading) { return <div>Loading…</div>; }
          if (error) { return <div>{error.message}</div>; }
          console.log(data.products);
          console.log(data.products.edges[4].node.variants.edges[0].node.price);
          return (
            <Card>
               <ResourceList
                showHeader
                resourceName={{ singular: 'Product', plural: 'Products' }}
                items={data.products.edges}
                renderItem={(item) => {
              
                  const price = item.node.variants.edges[0].node.price;

                  return (
                    <ResourceList.Item
                      id={item.node.id}
                      accessibilityLabel={`View details for ${item.node.title}`}
                      onClick={() => {
                        console.log(item.node)
                        
                      }
                      }
                    >
                      <Stack>
                        <Stack.Item fill>
                          <h3>
                            <TextStyle variation="strong">
                              {item.node.title}
                            </TextStyle>
                          </h3>
                        </Stack.Item>
                        <Stack.Item>
                          <p>${price}</p>
                        </Stack.Item>
                      </Stack>
                    </ResourceList.Item>
                  );
                }}
              />
                 </Card>
        );
}
      
     

