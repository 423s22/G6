<h1> UML Documentation of Shopify App </h1>

<h2> Class Diagram </h2>

![image of Class Diagram](https://github.com/423s22/G6/blob/main/screenshots/classDiagram.png)

<h2> Object Diagram </h2>

![Image of Object Diagram](https://github.com/423s22/G6/blob/main/screenshots/objectDiagram.png)

<h2> Sequence Diagram </h2>

![Image of Sequence Diagram](https://github.com/423s22/G6/blob/main/screenshots/SequenceDiagram.png) 

<h2> UI Wire Frame Diagram </h2>

![Image of UI wireframe diagram](https://github.com/423s22/G6/blob/main/screenshots/UI_Wireframe.png)

<h2> Decorate Pattern </h2>

![Image of Decorator Pattern](https://github.com/423s22/G6/blob/main/screenshots/decoratorDiagram.png)

<h2> Design Decisions </h2> 
<ul>
  <li> When we started designing our classes we thought we would be able to have three main classes (home page, option selections, and FAQ), and we implemented the design features into these classes. As we progressed and tried to work with Shopify’s design features (React in Polaris) it was discovered that only the javascript was able to be written in the classes. In order to have the major design elements we had to import css files into our javascript files.</li>
  <li> Another change we made in the process was creating tabs between the pages of the app. After reading the Shopify Embedded App documentation, we found that it was possible to create tabs within the Shopify partners applications. This design choice allowed us to have code with fewer bugs in it. Since the application is more tested then our buttons that we created. However we do still have promoted navigation buttons between the pages.
</li> 
  <li> We chose to use Polaris React, Shopify’s component library to create a visually familiar experience for the user. This also greatly reduces the amount of custom CSS and custom UI component development needed for the app. Using the shopify component library it will allow the user to access more user documentation outside of ours, if they have issues.
  </li> 
  <li> We chose to develop an embedded app using Shopify App Bridge. An embedded app can have slightly slower performance due to authentication protocols and rendering within an iframe. However, since the app is installed within the user’s Shopify Admin, this creates a seamless experience for the user as they are not required to leave Shopify Admin to use the app.
  </li> 
  <li> We chose to develop a custom app as opposed to a public app since the app is being developed for a specific merchant to meet their unique requirements. This means that the merchant will be able to download our app using our app download link instead of downloading the app from the app store. This also means that our app will be able to bypass Shopify’s app approval process. 
  </li> 
  <li> MySQL was used for the database, and the architecture of the database. Tables based on product options with columns as sub-options (i.e Table Materials will have columns of Gold, Silver, Bronze, etc and a key column with the product’s id.) We have a base price column and row to be populated by the multipliers based on what the user puts in for the price of the feature. 
  </li>
  <li> We chose to use React, Next.js, and Node.js for our application because there are a lot of Shopify resources and documentation related to these technologies. Next.js also allows for server-side rendering, which greatly enhances performance and seamlessly integrates with React. This allows us to import the Shopify features into our code to call certain objects in order to make the design more seamless.  </li> 
  <li> We chose to develop the app from scratch, as opposed to using the Shopify CLI, because we wanted to better understand the structure of our app and its interactions with the Shopify API. We also had problems deploying the CLI app to Heroku, which was solved by choosing different packages for use within our custom app. </li>
  <li> We chose to have three main pages, Homepage, Add Options, and FAQ, and to render components within these pages to avoid full iframe refreshes, which improved the overall performance of our application.  </li> 
</ul>
