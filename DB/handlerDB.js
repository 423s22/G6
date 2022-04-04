const { useQuery } = require('@apollo/client');
const mysql = require('mysql-await');

var isConnected = false;
var con = null;


async function _checkConnect(host, username, password, database) {
    con = mysql.createPool({
        host: host,
        user: username,
        password: password,
        database: database
    });
    
}
async function connect(host, username, password, database) {
    if (isConnected) return true;
    else {
        isConnected = true;
        await _checkConnect(host, username, password, database);
        return isConnected;
    }
}

async function disconnect(host, username, password, database) {
    await _checkConnect(host, username, password, database).awaitEnd();
    isConnected = false;
}




//Get Requests
async function handleGetRequest(ctx) {
    ctx.respond = false;
    const requestedData = ctx.query.request;
    let results;
    switch (requestedData) {
        case "product":
            results = await getUserProducts(parseInt(ctx.query.userID));
            break;
    }
    ctx.res.write(`${results}`);
    ctx.res.end();
    ctx.res.statusCode = 200;
}

async function getUserProducts(data) {
    let results = await con.awaitQuery(
        `SELECT * FROM  ` + data.optionType + ` WHERE productId = ` + data.userId + `;`
    );
    return JSON.stringify(results);
}


//Create Requests
async function handlePostRequest(ctx) {
    const post = ctx.request.body;
    const data = JSON.parse(ctx.request.body);
    await _createTable(data);

    const requestedOperation = post["operation"];
    let results;
    switch (requestedOperation) {
        case "product":
            {
                results = await _createProduct(data);
                break;
            }
    }
    ctx.respond = false;
    ctx.res.statusCode = 200;
    ctx.status = 200;
    ctx.res.write(`${results}`);
    ctx.res.end();
}

async function _createProduct(data) {
    //console.log(tempProductId);
    if(isNaN(data.productId)) {
        let a = await _createSearch(data);
        if(!a) {
            queryStr = _createHelp(data);
            let result = await con.awaitQuery(queryStr);
            return JSON.stringify({ "insertId": result.insertId });
        }
        else {
            var queryStatement = _updateHelp(data);
            
            let result = await con.awaitQuery(queryStatement) 
            return JSON.stringify({ "message": "Updated" });
        }
    } else {
        console.log("this is not being inserted" + data.productId);
    }
}

async function _createSearch(data) {
    if(isNaN(data.productId)) {
        let result = await con.awaitQuery(
            'SElECT * FROM ' + data.optionType + ' WHERE productId = ' + data.productId + ';'
        );
        return true; 
    } else {
        console.log("this is not being inserted" + data.productId);
        return false;
    }
}

function _createHelp(data) {
    //'INSERT INTO ' + data.optionType + '( '+ queryArr[0] + ' ) VALUES ( ' + queryArr[1] + ' );'
    let queryTemp = 'INSERT INTO ' + data.optionType + '( ';
    let queryStr = '';
    if( data.optionType == "dropdown") {
        queryStr = _createBuilderDrop(data);
    }
    else {
        queryStr = _createBuilderEngrave(data);
    }
    queryTemp += queryStr[0] + ' ) VALUES ( ' + queryStr[0] + ' );';
    return queryTemp;
    
}

function _createBuilderDrop(data) {

    let optionsLength = data.options.length;
    
    var query1 = "ProductId, ProductName, ";
    var query2 = "" + data.productId + ", " + data.menuTitle + ", ";
    for (let i = 0; i < optionsLength; i++) {
        if( i == colLength-1) {
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
    var query1 = "ProductId, ProductName, Lines, Price";
    var query2 = "" + data.productId + ", " + data.description + ", " + data.lines + ", " + data.price;
    return [query1, query2]
}

async function _createTable(data) {
    var queryStatement = "CREATE TABLE IF NOT EXISTS " + data.optionType + " (";
    if(data.optionType == "dropdown") { 
        queryStatement += _createTableHelp(data);
    } else {
        queryStatement += "productId NUMERIC(18,2), ProductName VARCHAR(100), Lines NUMERIC(10,0), Price NUMERIC(15,2);";
    }
    return con.awaitQuery(queryStatement);
}

function _createTableHelp(data) {
    let queryStatement = "productId NUMERIC(18,2), productName VARCHAR(100), ";
    for(let i = 0; i < data.options.length; i++) {
        if( i == data.options.length-1) {
            queryStatement += data.options[i]["label"] + " NUMERIC(10,4)";
        }
        else{
            queryStatement += data.options[i]["label"] + " NUMERIC(10,4), ";
        }
    }
    queryStatement += ");";
    return queryStatement;
}


//Upate Requests
function _updateHelp(data) {
    let queryTemp ="UPDATE " + data.optionType + " SET ";

    if( data.optionType == "dropdown") {
        queryTemp += _updateBuilderDrop(data);
    }
    else {
        queryTemp += _updateBuilderEngrave(data);
    }
    
    queryTemp += " WHERE ProductId = "+ data.productId +";";
    return queryTemp;
}

function _updateBuilderDrop(options) {

    let optionsLength = options.length;
    var queryTemp = "";
    for (let i = 0; i < optionsLength; i++) {
        if( i == colLength-1) {
            queryTemp += options[i]["label"] + " = " + options[i]["value"];
        }
        else{
            queryTemp += options[i]["label"] + " = " + options[i]["value"] + ", ";
        }
            
    }
    return queryTemp
    
}

function _updateBuilderEngrave(data) {
    var queryTemp = "ProductId = " + data.productId + ", ProductName = " + data.description + ", Lines = " + data.lines + ", Price = " +  data.price;
    return queryTemp
    
}



//Delete Requests
async function handleDeleteRequest(ctx) {
    const requestedOperation = ctx.query.operation;
    let results;
    switch (requestedOperation) {
        case "product":
            {
                const data = JSON.parse(ctx.request.body);
                results = await _deleteProduct(data.productId);
                break;
            }
        case "table":
            {
                const data =  JSON.parse(ctx.request.body);
                results = await _deleteTable(data.productId);
                break;
            }
    }
    ctx.respond = false;
    ctx.res.statusCode = 200;
    ctx.status = 200;
    ctx.res.write(`${results}`);
    ctx.res.end();
}

async function _deleteProduct(data) {
    let tempNum = data.productId.replace("gid://shopify/Product/", '');
    if (isNaN(tempNum)) {
        return JSON.stringify({ "message": "Invalid ID" });
    } else {
        let result = await con.awaitQuery(
            "DELETE FROM  " + data.optionType + " WHERE ProductId = "+ data.productId +";"
        );
        return JSON.stringify({ "message": "Successfully deleted" });
    }
}

async function _deleteTable(data) {
    let result = await con.awaitQuery(
        "DROP TABLE  " + data.optionType+";"
    );
    return JSON.stringify({ "message": "Successfully deleted" });
}


module.exports = {connect, disconnect, handleGetRequest, handleDeleteRequest, handlePostRequest, _checkConnect, _updateBuilder, _createBuilder, _createHelp,
_deleteProduct, _deleteTable, isConnected, con};
