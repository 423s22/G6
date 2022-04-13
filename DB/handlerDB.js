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
        var results = JSON.parse(JSON.stringify(await con.awaitQuery(`SELECT * FROM ` + tableName + ` WHERE productId = ` + productId + `;`)));
        
        if (tableName.includes('dropdown') && results[0] != undefined) {      // rebuild dropdown object
        var tempResults = {};
        tempResults.productId = results[0].productId;
        tempResults.menuTitle = results[0].productName;
        tempResults.options = [];
       
        delete results[0].productId;        // remove so that the only thing left are the options
        delete results[0].productName;

       // tempResults.options.push(results[0]);  
        const labels = Object.keys(results[0]);
        const values = Object.values(results[0]);
        for (let i = 0; i < labels.length; i++) {
            let obj = {};
            let label = labels[i];
            let value = values[i];
            obj ={label: label, value: value};
            tempResults.options.push(obj);
        }
        results[0] = tempResults;
        }
        
        if (results[0] != undefined) {
            results[0].optionType = tableName;  // add option type to results
            resultsArr.push(results[0]);
        }
    }
    var resultsObj = {                          // add results array to JSON object
        "productOptions" : resultsArr
    }
    return (resultsObj);
}

//Create Requests
async function handlePostRequest(ctx) {
    const data = JSON.parse(ctx.request.body);
    data.productId = data.productId.replace("gid://shopify/Product/", '');
    await _createTable(data);
    
    let results = await _createProduct(data);

    //const requestedOperation = post["operation"];
    //let results;
    /*switch (requestedOperation) {
        case "product":
            {
                results = await _createProduct(data);
                break;
            }
    }*/
    ctx.respond = false;
    ctx.res.statusCode = 200;
    ctx.status = 200;
    ctx.res.write(`${results}`);
    ctx.res.end(); 
}

async function _createProduct(data) {
        let a = await _createSearch(data);
        if (!a) {
            queryStatement = _createHelp(data);
            console.log("insert")
            //console.log(queryStatement)
            let result = await con.awaitQuery(queryStatement);
            return JSON.stringify({ "insertId": result.insertId });
        }
        if (a) {
            var queryStatement = _updateHelp(data);
            console.log("update")
            //console.log(queryStatement)
            let result = await con.awaitQuery(queryStatement) 
            return JSON.stringify({ "Upate insertId": result.insertId });
        }
        else {
            console.log("this is not being inserted" + data.productId);
        }
}

async function _createSearch(data) {
    let result;
    if( data.optionType == "dropdown") {
        result = await con.awaitQuery(
            'SElECT * FROM ' + data.optionType + data.menuTitle + ' WHERE productId = ' + data.productId + ';'
        );
    }
    else {
        result = await con.awaitQuery(
            'SElECT * FROM ' + data.optionType + ' WHERE productId = ' + data.productId + ';'
        );
    }
    if (result.length > 0) {
        return true; 
        }
     else {
        return false;
    }
}

function _createHelp(data) {
    let queryTemp = '';
    let queryStr = '';
    if( data.optionType == "dropdown") {
        queryTemp += 'INSERT INTO ' + data.optionType + data.menuTitle + '( ';
        queryStr = _createBuilderDrop(data);
    }
    else {
        queryTemp += 'INSERT INTO ' + data.optionType + '( ';
        queryStr = _createBuilderEngrave(data);
    }
    queryTemp += queryStr[0] + ' ) VALUES ( ' + queryStr[1] + ' );';
    return queryTemp;
}

function _createBuilderDrop(data) {

    let optionsLength = data.options.length;
    
    var query1 = "productId, productName, ";
    var query2 = "" + data.productId + ", '" + data.menuTitle + "', ";
    for (let i = 0; i < optionsLength; i++) {
        if( i == optionsLength-1) {
            query1 += data.options[i]["label"];
            query2 += data.options[i]["value"];
        }
        else{
            query1 += data.options[i]["label"] + ", ";
            query2 += data.options[i]["value"] + ", ";
        }
            
    }
    return [query1, query2]
}

function _createBuilderEngrave(data) {
    console.log("Engrave Builder")
    var query1 = "productId, description, lineNum, price";
    var query2 = "" + data.productId + ", '" + data.description + "', " + data.lines + ", " + data.price;
    return [query1, query2]
}

async function _createTable(data) {
    console.log(data.optionType);
    var queryStatement = "";
    if(data.optionType == "dropdown") { 
        queryStatement +=  "CREATE TABLE IF NOT EXISTS " + data.optionType + data.menuTitle + " ( ";
        queryStatement += _createTableHelp(data);
    } else {
        queryStatement +=  "CREATE TABLE IF NOT EXISTS " + data.optionType +  " ( ";
        queryStatement += "productId NUMERIC(18,2), description VARCHAR(100), lineNum SMALLINT, price NUMERIC(15,2) );";
    }
    //console.log(queryStatement);
    return con.awaitQuery(queryStatement);
}

function _createTableHelp(data) {
    let queryStatement = 'productId NUMERIC(18,2), productName VARCHAR(100), ';
    for(let i = 0; i < data.options.length; i++) {
        if( i == data.options.length-1) {
            queryStatement += data.options[i]["label"] + ' NUMERIC(10,4)';
        }
        else{
            queryStatement += data.options[i]["label"] + ' NUMERIC(10,4), ';
        }
    }
    queryStatement += ');';
    return queryStatement;
}

//Upate Requests
function _updateHelp(data) {
    let queryTemp ='';
    if( data.optionType == "dropdown") {
        queryTemp += "UPDATE " + data.optionType + data.menuTitle + " SET " +_updateBuilderDrop(data);
    }
    else {
        queryTemp += "UPDATE " + data.optionType + " SET " + _updateBuilderEngrave(data);
    }
    queryTemp += " WHERE productId = "+ data.productId +";";
    return queryTemp;
}

function _updateBuilderDrop(data) {
    options = data.options
    let optionsLength = options.length;
    var queryTemp = "";
    for (let i = 0; i < optionsLength; i++) {
        if( i == optionsLength-1) {
            queryTemp += options[i]["label"] + " = " + options[i]["value"];
        }
        else{
            queryTemp += options[i]["label"] + " = " + options[i]["value"] + ", ";
        }  
    }
    return queryTemp
    
}

function _updateBuilderEngrave(data) {
    var queryTemp = "productId = " + data.productId + ", description = " + "'" + data.description + "'," + "lineNum = " + data.lines + ", price = " +  data.price;
    return queryTemp
}



//Delete Requests
async function handleDeleteRequest(ctx) {
    let productId = ctx.params.id;
    let optionType = ctx.params.optionType;
    
    await con.awaitQuery("DELETE FROM " + optionType + " WHERE productID=" + productId + ";");
    
}

async function _deleteTable(data) {
    if( data.optionType == "dropdown") {
        let result = await con.awaitQuery(
            "DROP TABLE  " + data.optionType + data.menuTitle +";"
        );
    }
    else {
        let result = await con.awaitQuery(
            "DROP TABLE  " + data.optionType +";"
        );
    }
    
    return JSON.stringify({ "message": "Successfully deleted" });
}

module.exports = {connect, disconnect, _checkConnect, handleGetRequest, getProducts, handleDeleteRequest, handlePostRequest,  _updateHelp, _createProduct, _createSearch,
_createHelp, _createBuilderDrop, _createBuilderEngrave, _createTable, _createTableHelp,_updateBuilderDrop, _updateBuilderEngrave, _deleteTable, isConnected, con};
