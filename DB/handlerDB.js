const { useQuery } = require('@apollo/client');
const mysql = require('mysql-await');
//import _create from "./crud";
var pN = '"Dog Collar' + 'OwnerId"';
const json = '{"productId": '+1+
' , "productName": "Dog Collar" , "tableName": ' + pN +
' "columnNames": ["productId", "productName", "baseCost", "apples", "bananas", "lemons"], "values": ['+
1+', "Dog Collar", 1, ' + Math.random().toFixed(4) + ' ,'+ Math.random().toFixed(4)+', '+Math.random().toFixed(4)+']}';

var isConnected = false;
var con = null;


async function _checkConnect(host, username, password, database) {
    con = mysql.createPool({
        host: host,
        user: username,
        password: password,
    });
    await con.awaitQuery("CREATE DATABASE IF NOT EXISTS " + database + ";");
    
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
        `SELECT * FROM  ` + data.tableName + ` WHERE userId = ` + data.userId + `;`
    );
    return JSON.stringify(results);
}

async function handlePostRequest(ctx) {
    const post = ctx.request.body;
    const data = JSON.parse(ctx.request.body);
    await _createTable(JSON.parse(ctx.request.body));

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
    if(isNaN(data.productId)) {
        let a = await _createHelp(data);
        if(a) {
            queryArr = _createBuilder(data.columnNames, data.values);
            let result = await con.awaitQuery(
                'INSERT INTO ' + data.tableName + '( '+ queryArr[0] + ' ) VALUES ( ' + queryArr[1] + ' );'
            );
            return JSON.stringify({ "insertId": result.insertId });
        }
        else {
            const data = JSON.parse(json);
            var q = _updateBuilder(data.columnNames, data.values, data.id);
            var queryStatement ="UPDATE " + data.tableName + " SET ";
            queryStatement += _updateBuilder(data.columnsTitles, data.values);
            queryStatement += " WHERE ProductId = "+ data.id +";";
            let result = await con.awaitQuery(queryStatement) 
            return JSON.stringify({ "message": "Updated" });
        }
    } else {
        console.log("this is not being inserted" + data.productId);
    }
}

async function _createHelp(data) {
    if(isNaN(data.productId)) {
        queryArr = _createBuilder(data.columnNames, data.values);
        let result = await con.awaitQuery(
            'SElECT * FROM ' + data.tableName + ' WHERE productId = ' + data.productId + ';'
        );
        return true; //JSON.stringify({ "message": 'There is a Product'});
    } else {
        console.log("this is not being inserted" + data.productId);
    }
}


async function _createTable(json) {
    const data = JSON.parse(json);
    var queryStatement = "CREATE TABLE IF NOT EXISTS " + data.tableName + " (";
    console.log("Create check");  
    for(let i = 0; i < data.columnNames.length; i++) {
        if( i == data.columnNames.length-1) {
            queryStatement += data.columnNames[i] + " NUMERIC(10,4)";
        }
        else{
            queryStatement += data.columnNames[i] + " NUMERIC(10,4), ";
        }
    }
    queryStatement += ");";
    ProductId = data.ProductId;
    var query_var = [ProductId];
    return con.awaitQuery(queryStatement);
    
}

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
    if (isNaN(data.productId)) {
        return JSON.stringify({ "message": "Invalid ID" });
    } else {
        let result = await con.awaitQuery(
            "DELETE FROM  " + data.tableName + " WHERE ProductId = "+ data.productId +";"
        );
        return JSON.stringify({ "message": "Successfully deleted" });
    }
}
async function _deleteTable(data) {
    if (isNaN(data.tableName)) {
        let result = await con.awaitQuery(
            "DROP TABLE  " + data.tableName+";"
        );
        return JSON.stringify({ "message": "Successfully deleted" });
    } else {
        return JSON.stringify({ "message": "Table Not Deleted" });
    }
}

function _createBuilder(columnsTitles,values) {
    let colLength = columnsTitles.length;
    if( colLength == values.length ) {
        var query1 = "";
        var query2 = "";
        for (let i = 0; i < colLength; i++) {
            if( i == colLength-1) {
                query1 += columnsTitles[i];
                query2 += values[i];
            }
            else{
                query1 += columnsTitles[i] + ", ";
                query2 += values[i] + ", ";
            }
            
        }
        return [query1, query2]
    }
    else {
        console.log("Columns and tableOptions are not equal");
    }
    
}
function _updateBuilder(columnsTitles,values) {
    let colLength = columnsTitles.length;
    if( colLength == values.length ) {
        var query1 = "";
        for (let i = 0; i < colLength; i++) {
            if( i == colLength-1) {
                query1 += columnsTitles[i] + " = " + values[i];
            }
            else{
                query1 += columnsTitles[i] + " = " + values[i] + ", ";
            }
            
        }
        return query1
    }
    else {
        console.log("Columns and tableOptions are not equal");
    }
}

module.exports = {connect, disconnect, handleGetRequest, handleDeleteRequest, handlePostRequest, _checkConnect, _updateBuilder, _createBuilder, _createHelp,
_deleteProduct, _deleteTable, lastError, isConnected, con};
