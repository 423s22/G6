<h2> I. Program </h2> 
<p> 
	Over this past semester, our group worked with a client to develop an app for Shopify. Shopify is an eCommerce platform for online stores and creates a point of sales system for many businesses. Our client has their own site to sell their custom products, but they also aid other business owners to set up their own Shopify. However, our client ran into issues when setting up their store that ruined their user experience. The main issue is the client was unable to update the overall price of their products once the user made their modifications to the product. That being said, our client's customers are unable to see the price of the product until they are checking out, it is incredibly frustrating for both the client and the customer. 
	To alleviate these issues we have created a custom app for the user. When the user first opens the app they are directed to the homepage. 
 </p>
<h3> Frontend Code: </h3> 
<p> Homepage code: https://github.com/423s22/G6/blob/main/pages/index.js </p>
<p> Add Product code: https://github.com/423s22/G6/blob/main/pages/add-options.js </p>
<p> .css files that are called in the add-options class </p>
<p> Add Options card: https://github.com/423s22/G6/blob/main/components/AddOptions.js </p>
<p> Engraving Form: https://github.com/423s22/G6/blob/main/components/EngravingForm.js </p>
<p> Product Card: https://github.com/423s22/G6/blob/main/components/ProductCard.js </p>
<p> Drop Down Form: https://github.com/423s22/G6/blob/main/components/DropdownForm.js </p>
<p> FAQ Page Code: https://github.com/423s22/G6/blob/main/pages/FAQ.js </p>
<p> FAQ List Generator: https://github.com/423s22/G6/blob/main/pages/List.js </p>
<p> FAQ list of questions: https://github.com/423s22/G6/blob/main/components/json/ListData.json </p>
<p> FAQ .css Design Elements: https://github.com/423s22/G6/blob/main/components/css/searchBar.module.css </p>

<h3> Backend Code: </h3>
<p> Database Handler: https://github.com/423s22/G6/blob/main/DB/handlerDB.js </p>

<h3> Theme Code: </h3>

<h2> II. Teamwork </h2>
<p> Throughout this project, we have faced many challenges and we have worked together to redesign the project to get the best product for our client. At first, our group was three people, and we found the product would best meet our clients needs if we combined the group previously known as “G7”.  Our decision to expand our team reflects our ability to work together and create the best solution for the client. While stopping for a day to get everyone on the same page for the project seemed taunting, it allowed our group to overcome greater problems in our overall design. </p> 
<h4> Lenin Lewis: </h4>
<p> In the duration of the project, we each took on taks that held interest to us. Since I had little experience with javascript and implentemtning UI design, I wanted to use this semester to expand and hone my skills. First I took on designing and making both the homepage and Frequently Asked Questions (FAQ) pages for our Shopify app. The FAQ page is essential for the user experience, since there will not be a support team in place once the app is released. The FAQ page has design elements, including boxes around each question and a label in the search bar to improve the users experience; it was kept simple to alleviate any future user errors. The homepage followed the same philosophy, keep it a simple and intuitive desgin. The homepage entails of  the appropriate buttons to direct the user to any source they may need. In the coding backlog, the app UI will continue to be refined as user testing is companced, and the backlog entails implementing unit tesitng.  Lastly, once the group completes our product branding we will add the logo and design choices (i.e. color) into the current UI. Outside of the coding portion of the project, I worked on UML documentation, the design pattern, user documentation, and orginizing the portfolio through the semester. At this moment in time the UML documentation (https://github.com/423s22/G6/blob/main/UMLDocumentation.md#-uml-documentation-of-shopify-app-and-design-decisions-made-) shows the frontend code design in a class, object, and sequence diagram, and the backlong task is to complete the UML documentation of our backend code. Next, I worked on the design pattern for the project. A decorator pattern was selected since the price will need to be updated based off how the client wants to change the product they are buying. Thus far you can see the class diagram of the decorator pattern in the UML documention (https://github.com/423s22/G6/blob/main/UMLDocumentation.md#-decorate-pattern-) . The decorator pattern is outlined depth in the section 3 (https://github.com/423s22/G6/blob/main/Portfolio.md#-iii-design-pattern-) of the paper. Lastly, the portfolio and user documentions have been a living documents throughout the semester. This choice was made, so the progression of the app could be recorded and referenced by any user. The workload and hours put into tasks listed above has been tracked through our burndown chart (https://docs.google.com/spreadsheets/d/1qWjqU1w1oxYyYeYFQ7EqP9aI5dt4SIy14x6kxzEHuD4/edit?usp=sharing). The chart currently shows that we are off track from our expected progress. However, the chart does not account for the hours I spent struggling to get through the Shopify documentation, getting ngrok to work on my local machine, and time we spent to reconfigure our group. Since we saw the gap widing between work completed and work we expected to complete, the another group was combined into our group. I believe in the next two weeks will we watch the gap between the workloads narrow as we complete even more of the project.  </p>
<h4> Will Cook: </h4>
<p> </p>
<h4> Riley Slater: </h4>
<p> </p>
<h4> Alyssa Newhart: </h4>
<p> </p>
<h4> James Marsh: </h4>
<p> </p>
<h4> Daniel Vinogradov:  </h4>
<p> Daniel Vinogradov: Our original group G7 merged with G6, which meant we needed to delegate each other new tasks. The work Daniel, I, was delegated to was strictly front end. I developed a mock store, filled it with images, descriptions, created products, collections and incorporated Lenin's menus to design the store. The theme of our store is an outdoors apparel and equipment store known as Eagle Apparel. I also was assigned to create a brand, logo and story for our theme. The store uses the theme Venture, the free version, available from the Shopify Theme store. This theme is great because the theme has constant updates, meaning if we want to change our store to a different theme, we are not restricted sticking to older versions of themes. </p>

<h2> III. Design Pattern </h2>
<p> In the deisgn pattern for the assignment we went with a decorator pattern for our overall desgin. Following our UML documentation 
page, it shows how the design have interacted with each other: https://github.com/423s22/G6/blob/main/UMLDocumentation.md#-decorate-pattern- </p>

<h2> IV. Technical Writing </h2>
<p> Setting up a Shopify app can be difficult to complete if you follow these links it will show you how to set up your own app </p> 
<p> How to set up app: https://github.com/423s22/G6/blob/main/UserDocumentation.md#-documentation-for-users- </p>
<p> How to develop your own Shopify app: https://github.com/423s22/G6#custom-shopify-options-application </p>
<h2> V. UML Documentation </h2>

<h3> Class Diagram </h3>

![image of Class Diagram](https://github.com/423s22/G6/blob/main/screenshots/classDiagram.png)

<h3> Object Diagram </h3>

![Image of Object Diagram](https://github.com/423s22/G6/blob/main/screenshots/objectDiagram.png)

<h3> Sequence Diagram </h3>

![Image of Sequence Diagram](https://github.com/423s22/G6/blob/main/screenshots/SequenceDiagram.png) 

