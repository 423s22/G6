const dotenv = require('dotenv');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const db = require('../DB/handlerDB');

dotenv.config();

module.exports = function publicServer() {
    const server = new Koa();
    server.use(koaBody());
    const router = new Router();

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

    server.use(router.allowedMethods());
    server.use(router.routes());

    return server;
};