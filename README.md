# G6
Shopify App

### Description 
Shopify app that will allow merchants to add additional options and customization variations to their products, bypassing Shopify’s default option/variant limit. The additional cost of these options will be added dynamically to the product total on the product page. The app will embed directly into the merchant’s Shopify admin for a seamless experience.  

**Members:** William, Lenin, Alyssa

[Burndown Chart](https://docs.google.com/spreadsheets/d/1qWjqU1w1oxYyYeYFQ7EqP9aI5dt4SIy14x6kxzEHuD4/edit#gid=0)<br/> 
[Scrum Board](https://leninlewis.atlassian.net/jira/software/projects/SHOP/boards/1)<br/> 
[Shopify Dev Store + App](https://esof-test-store.myshopify.com/admin/apps/options-2)

## Custom Shopify Options Application

### Frontend Technologies
* React
* Polaris

### Backend Technologies
* Node.js
* Next.js


#### Instructions

* Clone repository
* Verify Node.js is installed on your computer by running `node -v` in the terminal.  
  * Node.js can be downloaded [here](https://nodejs.org/en/download/)
* run `npm install` to install dependencies
* In order to do local development with Shopify you will need an [ngrok](https://ngrok.com/) account. 
* Once you have ngrok setup, run `ngrok http [port number]` to login and get the URL of your tunnel which will look something like this example URL from ngrok's [documentation](https://ngrok.com/docs)` https://92832de0.ngrok.io`
* In the browser, login to your [Shopify Partner's](https://www.shopify.com/partners) account and navigate to the `Apps` section
* Click `Create App`
* Select `Custom App`
* Enter in your application name, and ngrok URL as follows 
![App setup Example](https://github.com/423s22/G6/blob/main/screenshots/example_app_setup.png)
* Retrieve the applications **API key** and **secret API key** from your application's setting page
* Create a `.env` file in the project directory with the following information:<br/>
  `SHOPIFY_API_KEY='your API key'`<br/>  
  `SHOPIFY_API_SECRET='your secret API key'`<br/>  
  `SCOPES=write_products,write_customers,write_draft_orders`<br/>  
  `HOST='your ngrok URL'`<br/><br/>  
* Run `npm run dev` to start the server
* Navigate back to your application's page in Shopify and `Select` a `Development Store` to install your application on
* Once you have installed the application your development store, navigate to the `Apps` section of your Shopify Admin and click on the application
* You should now see the application embedded in your Shopify Admin
![embedded app](https://github.com/423s22/G6/blob/main/screenshots/embedded_app.png)

#### User Documentation 
* Link to User Documentation https://github.com/423s22/G6/blob/main/UserDocumentation.md

#### UML documentation 
* Link to UML documentation https://github.com/423s22/G6/blob/main/UMLDocumentation.md

### Software Architecture and Design
* Link to Software Architecture https://docs.google.com/document/d/1ijhEmUPNIz0jUhGBtdAFtvbeTfbJwBbrt3WQhEURxMo/edit?usp=sharing

