require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const {default: createShopifyAuth} = require('@shopify/koa-shopify-auth');
const {verifyRequest} = require('@shopify/koa-shopify-auth');
const {default: Shopify, ApiVersion} = require('@shopify/shopify-api');
const Router = require('koa-router');
const koaBody = require('koa-body');
const db = require('./DB/handlerDB');
const mysql = require('mysql-await');

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

let store_access_token = null;

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

app.prepare().then(async () => {
  const server = new Koa();
  server.use(koaBody());
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
      
        store_access_token = accessToken;    // assign store access token

        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );
  
  // route to retrieve options
  router.get(`/api/show-options/:id`, async (ctx) => {  
    try {
    db.connect();
    await db.handleGetRequest(ctx);
    db.disconnect(); 
    console.log("GET response");
    console.log(ctx.body);
    ctx.status = 200;

    if (ctx.body == undefined || ctx.body.productOptions.length < 1) {
      ctx.status = 204;  // no content
    }

    } catch (e) {
      console.log(`GET Error\n ${e}`);
      ctx.status = 500;
    }
  });
  
  router.delete("/api/delete-options/:id/:optionType/:description", async (ctx) => {
       
    try { 
    db.connect();
    await db.handleDeleteRequest(ctx);
    db.disconnect();
    ctx.status = 200;
    } catch (e) {
      ctx.status = 500;
      console.log("error");
      console.log(e);
    }
  });

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  
  
  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  // route to receive submit data from option forms
  router.post("/api/add-options", async (ctx) => {   
    try { 
    db.connect();
    await db.handlePostRequest(ctx);
    db.disconnect(); 
    ctx.status = 200;
    } catch (e) {
      console.log(`POST Error\n ${e}`);
      ctx.status = 500;
    }
  });
  
  // route to receive create a Shopify product for an option from engraving form
  router.post("/api/add-engraving-product-option", async (ctx) => {   
    // create product in Shopify 
     try { 
      const product = JSON.parse(ctx.request.body);
      const targetURL = `https://${process.env.SHOPIFY_API_KEY}${process.env.SHOPIFY_API_SECRET}@${process.env.SHOP_NAME}.myshopify.com/admin/api/2021-10/products.json`;
      var header = {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            "Accept-Charset": "UTF-8",
            'X-Shopify-Access-Token': `${store_access_token}`,
            'Authorization': `Bearer ${store_access_token}`
        },
        body: JSON.stringify(product)
    }
   let results =  await fetch(targetURL, header).then(res => res.text()).then(data => {ctx.response.body = data}).catch((error) => { console.log(error) })
   ctx.status = 200;
    } 
  catch (e) {
      console.log(`Shopify POST Error\n ${e}`);
      ctx.status = 500;
    }
  });

  // route to delete product option 

  router.delete(`/api/delete-product-option/:id`, async (ctx) => {

     // delete product in Shopify 
     try { 
      const productId = ctx.params.id;
      const targetURL = `https://${process.env.SHOPIFY_API_KEY}${process.env.SHOPIFY_API_SECRET}@${process.env.SHOP_NAME}.myshopify.com/admin/api/2021-10/products/${productId}.json`;
      console.log(targetURL);
      var header = {
        method: 'DELETE', 
        headers: {
            "Content-Type": "application/json",
            "Accept-Charset": "UTF-8",
            'X-Shopify-Access-Token': `${store_access_token}`,
            'Authorization': `Bearer ${store_access_token}`
        },
    }
   let results =  await fetch(targetURL, header).then(res => res.text()).then(data => {ctx.response.body = data; console.log(data)}).catch((error) => { console.log(error) })
   ctx.status = 200;
    } 
  catch (e) {
      console.log(`Shopify POST Error\n ${e}`);
      ctx.status = 500;
    }
  });
  
  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
