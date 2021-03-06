const { useQuery } = require('@apollo/client');
const mysql = require('mysql-await');

var isConnected = false;
var con = null;



async function _checkConnect() {
    //process.env.MYSQL_HOST,process.env.MYSQL_USER, process.env.MYSQL_KEY,process.env.MYSQL_DB
    con = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_KEY,
        database: process.env.MYSQL_DB
    }); 
}

async function connect() {
    if (isConnected) return true;
    else {
        isConnected = true;
        await _checkConnect();
        return isConnected;
    }
}

async function disconnect() {
    await con.end;
    isConnected = false;
}

// Get Requests
async function handleGetRequest(ctx) {
    const productId = ctx.params.id;
    //console.log(productId);
    let results = await getProducts(productId);
    ctx.body = results;
}

async function getProducts(productId) {
    let arr = JSON.parse(JSON.stringify(await con.awaitQuery(`SHOW TABLES;`)));
    let tablesArr = [];

    arr.forEach(element => {
        var tableVal = String(Object.values(element));  // get table name
        tablesArr.push(tableVal);   
    });
    
    let resultsArr = [];
    for (const i in tablesArr) {
        var tableName = tablesArr[i];
        var results = JSON.parse(JSON.stringify(await con.awaitQuery(`SELECT * FROM ` + tableName + ` WHERE productId = '` + productId + `';`)));
        
        //console.log("IMPORTANT : " + results)
        for(const curr in results) {
            if(tableName == 'dropdown' && results[curr] != undefined) {
                let tempOptions = results[curr].options.replace('{','').replace('}','').split(',');
                let objFull = [];
                for(var currOption in tempOptions) {
                    let byColon = tempOptions[currOption].split(':');
                    let obj = {option: byColon[0], price: byColon[1], productOptionId: byColon[2], optionVariantId: byColon[3]};
                    objFull.push(obj);
                }
                results[curr].options = objFull;
            }
            if (results[curr] != undefined) {
                results[curr].optionType = tableName;  // add option type to results
                resultsArr.push(results[curr]);
            }
        }
    }
    var resultsObj = {                          // add results array to JSON object
        "productOptions" : resultsArr
    }
    return (resultsObj);
}
async function handleGetAllRequest(ctx) {  //not really needed anymore, use getProucts() for the unAuth GET request
    let productId = ctx.params.id;
    let popArr = [];

    let arr = await con.awaitQuery(`SHOW TABLES;`);
    let temp = [];
    var i = 0;
    arr.forEach(element => {
        var tableKey = `table${i}`;     // unique key
        var tableVal = Object.values(element);  // table name
        var item = {};
        item[tableKey] = tableVal;
        temp.push(item)
        i++;
    });
    var results;
    for(var i in temp ) {
        var queryStatement = `SELECT * FROM ` + process.env.MYSQL_DB + `.` + temp[i][`table${i}`][0] + ` WHERE productId = '` + productId + `';`;
        optionType = temp[i][`table${i}`][0];
        results = await con.awaitQuery(queryStatement);
        for(var i in results) {
            if(results[i] != undefined) {
                popArr.push(results[i]);
            }
        }
    }
    return popArr;
}

//Create Requests
async function handlePostRequest(ctx) {
    const data = JSON.parse(ctx.request.body);
    data.productId = data.productId.replace("gid://shopify/Product/", '');
    await _createTable(data);
    
    let results = await _createProduct(data);

    ctx.respond = false;
    ctx.res.statusCode = 200;
    ctx.status = 200;
    ctx.res.write(`${results}`);
    ctx.res.end(); 
}

async function _createProduct(data) {
        queryStatement = _createHelp(data);
        console.log("insert")
        //console.log(queryStatement)
        let result = await con.awaitQuery(queryStatement);
        return JSON.stringify({ "insertId": result.insertId });
}

function _createHelp(data) {
    let queryTemp = "";
    let queryStr = "";
    if( data.optionType == "dropdown") {
        queryTemp += "INSERT INTO " + data.optionType + "( ";
        queryStr = _createBuilderDrop(data);
    }
    else {
        queryTemp += "INSERT INTO " + data.optionType + "( ";
        queryStr = _createBuilderEngrave(data);
    }
    queryTemp += queryStr[0] + " ) VALUES ( " + queryStr[1] + " );";
    console.log(queryTemp);
    return queryTemp;
}
function _createBuilderDrop(data) {
    let optionsLength = data.options.length;
    
    var query1 = "productId, variantId, menuTitle, options";
    var query2 = "'" + data.productId + "', '" + data.variantId + "', '" + data.menuTitle + "', ";
    query2 += "'{";

    for (let i = 0; i < optionsLength; i++) {
        if( i == optionsLength-1) {
            query2 += "" +data.options[i].option + ":" + data.options[i].price + ":" + data.options[i].productOptionId + ":" + data.options[i].optionVariantId + "}'";
        }
        else{
            query2 += "" +data.options[i].option + ":" + data.options[i].price + ":" + data.options[i].productOptionId + ":" + data.options[i].optionVariantId + ", ";
        }
    }
    return [query1, query2]
}

function _createBuilderEngrave(data) {
    console.log("Engrave Builder")
    var query1 = "productId, variantId, description, lineNum, price, productOptionId, optionVariantId";
    var query2 = "'" + data.productId + "', '" + data.variantId + "', '" + data.description + "', '" + data.lines + "', '" + data.price + "', '" + data.productOptionId + "', '" + data.optionVariantId + "'";
    return [query1, query2]
}

async function _createTable(data) {
    //console.log(data.optionType);
    var queryStatement = "CREATE TABLE IF NOT EXISTS " + data.optionType + " ( _iter INT primary key AUTO_INCREMENT, ";
    if(data.optionType == "dropdown") { 
        queryStatement += 'productId NUMERIC(18,2), variantId NUMERIC(18,2), menuTitle VARCHAR(100), options VARCHAR(700) );';
    } else {
        queryStatement += "productId NUMERIC(18,2), variantId NUMERIC(18,2), description VARCHAR(100), lineNum SMALLINT, price NUMERIC(15,2), productOptionId VARCHAR(700), optionVariantId VARCHAR(700) );";
    }
    //console.log(queryStatement);
    return con.awaitQuery(queryStatement);
}

//Delete Requests
async function handleDeleteRequest(ctx) {
    let productId = ctx.params.id;
    let optionType = ctx.params.optionType;
    let description = ctx.params.description;
    if ( optionType == 'dropdown') {
        await con.awaitQuery("DELETE FROM " + optionType + " WHERE productID = '" + productId + "' AND menuTitle = '" + description +"';");
    }
    else {
        await con.awaitQuery("DELETE FROM " + optionType + " WHERE productID = '" + productId + "' AND description = '" + description +"';");
    }
    
    await _checkEmpty(optionType);
}

async function _checkEmpty(optionType) {
    let results = await con.awaitQuery("SELECT * FROM " + optionType + ";");

    if (results.length == 0) {
        "DROP TABLE  " + optionType + ";";
    }
}


async function handleDeleteAllRequest(ctx) {
    let productId = ctx.request.url.replace("/api/delete-options/", '');

    let arr = await con.awaitQuery(`SHOW TABLES;`);
    let temp = [];
    var i = 0;
    arr.forEach(element => {
        var tableKey = `table${i}`;     // unique key
        var tableVal = Object.values(element);  // table name
        var item = {};
        item[tableKey] = tableVal;
        temp.push(item)
        i++;
    });
    var results;
    var results2;
    for (var i = 0; i < temp.length; i++) {
        var queryStatement = `SELECT * FROM ` + process.env.MYSQL_DB + `.` + temp[i][`table${i}`][0] + ` WHERE productId = '` + productId + `';`;
        optionType = temp[i][`table${i}`][0];

        results = await con.awaitQuery(queryStatement);
        if(results[0] != undefined) {
            if(optionType.includes("dropdown")) {
                //console.log(optionType)
                results2 = con.awaitQuery(
                    "DELETE FROM "+ optionType +" WHERE ProductId = '"+ productId +"';"
                );
            } else {
                //console.log(optionType)
                results2 = con.awaitQuery(
                    "DELETE FROM engraving WHERE ProductId = '"+ productId +"';"
                );
            }
        }
        
    }
    ctx.respond = false;
    ctx.res.statusCode = 200;
    ctx.status = 200;
    ctx.res.write(`${results}`);
    ctx.body = results;
    ctx.res.end();
    
}

module.exports = {connect, disconnect, _checkConnect, handleGetAllRequest, handleGetRequest, getProducts, handleDeleteRequest, handlePostRequest,  _createProduct,
_createHelp, _createBuilderDrop, _createBuilderEngrave, _createTable, _checkEmpty, handleDeleteAllRequest, isConnected, con};
