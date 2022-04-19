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
        
        if (tableName == 'dropdown' && results[0] != undefined) {      // rebuild dropdown object
        var tempResults = {};
        tempResults.productId = results[0].productId;
        tempResults.menuTitle = results[0].menuTitle;
        

        
        tempResults.options = [];
       
        delete results[0].productId;        // remove so that the only thing left are the options
        delete results[0].menuTitle;

       // tempResults.options.push(results[0]);  
        const labels = Object.keys(results[0]);
        const values = Object.values(results[0]);
        for (let i = 0; i < labels.length; i++) {
            let obj = {};
            let label = labels[i];
            let value = values[i];
            obj ={label: label, value: value};
            if (obj.label != "_iter") {
                tempResults.options.push(obj);
            }
            
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

async function handleGetAllRequest(ctx) {
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
        var queryStatement = `SELECT * FROM ` + process.env.MYSQL_DB + `.` + temp[i][`table${i}`][0] + ` WHERE productId = ` + productId + `;`;
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
        let alreadyExists = await _createSearch(data);

        if (!alreadyExists[0]) {  
            queryStatement = _createHelp(data);
            console.log("insert")
            //console.log(queryStatement)
            let result = await con.awaitQuery(queryStatement);
            return JSON.stringify({ "insertId": result.insertId });
        }
        if (alreadyExists[0]) {
            data._iter = alreadyExists[1]._iter;
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
    let result = await con.awaitQuery('SElECT * FROM ' + data.optionType + ' WHERE productId = ' + data.productId + ';');

    if( result != undefined && result.length > 0) {
        for(let i = 0; i < result.length; i++) 
        {
            if(data.optionType == "dropdown") {
                data.description = data.menuTitle;
            }
            console.log(result[i].description);
            console.log("atat" + data.description)
            if(result[i].description == data.description) {
                return [true, result[i]]; // Yes update
            }
        }
        return [false, undefined];
    }
    else {
        return [false, undefined];
    }
}

function _createHelp(data) {
    let queryTemp = '';
    let queryStr = '';
    if( data.optionType == "dropdown") {
        queryTemp += 'INSERT INTO ' + data.optionType + '( ';
        queryStr = _createBuilderDrop(data);
    }
    else {
        queryTemp += 'INSERT INTO ' + data.optionType + '( ';
        queryStr = _createBuilderEngrave(data);
    }
    queryTemp += queryStr[0] + ' ) VALUES ( ' + queryStr[1] + ' );';
    console.log(queryTemp);
    return queryTemp;
}
function _createBuilderDrop(data) {

    let optionsLength = data.options.length;
    
    var query1 = "productId, menuTitle, dataInfo";
    var query2 = "" + data.productId + ", '" + data.menuTitle + "', ";
    query2 += "'{";

    for (let i = 0; i < optionsLength; i++) {
        if( i == optionsLength-1) {
            query2 += data.options[i]["label"] + ":" + data.options[i]["value"] + "}'";
        }
        else{
            query2 += data.options[i]["label"] + ":" + data.options[i]["value"] + ", ";
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
    var queryStatement = "CREATE TABLE IF NOT EXISTS " + data.optionType + " ( _iter INT primary key AUTO_INCREMENT, ";
    if(data.optionType == "dropdown") { 
        queryStatement += 'productId NUMERIC(18,2), menuTitle VARCHAR(100), dataInfo VARCHAR(700) );';
    } else {
        queryStatement += "productId NUMERIC(18,2), description VARCHAR(100), lineNum SMALLINT, price NUMERIC(15,2) );";
    }
    //console.log(queryStatement);
    return con.awaitQuery(queryStatement);
}

//Upate Requests
function _updateHelp(data) {
    let queryTemp ='';
    if( data.optionType == "dropdown") {
        queryTemp += "UPDATE " + data.optionType + " SET " + _updateBuilderDrop(data);
    }
    else {
        queryTemp += "UPDATE " + data.optionType + " SET " + _updateBuilderEngrave(data);
    }
    queryTemp += " WHERE productId = "+ data.productId + " AND _iter = " + data._iter+";";
    return queryTemp;
}

function _updateBuilderDrop(data) {
    options = data.options
    let optionsLength = options.length;
    var queryTemp = "";
    queryTemp += " dataInfo = '{" ;
    console.log(options);
    for (let i = 0; i < optionsLength; i++) {
        if( i == optionsLength-1) {
            queryTemp += options[i]["label"] + ":" + options[i]["value"] + "}'";
        }
        else{
            queryTemp += options[i]["label"] + ":" + options[i]["value"] + ", ";
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
    let description = ctx.params.description;
    
    
    await con.awaitQuery("DELETE FROM " + optionType + " WHERE productID = " + productId + " AND menuTitle = '" + description +"';");
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
        var queryStatement = `SELECT * FROM ` + process.env.MYSQL_DB + `.` + temp[i][`table${i}`][0] + ` WHERE productId = ` + productId + `;`;
        optionType = temp[i][`table${i}`][0];

        results = await con.awaitQuery(queryStatement);
        if(results[0] != undefined) {
            if(optionType.includes("dropdown")) {
                //console.log(optionType)
                results2 = con.awaitQuery(
                    "DELETE FROM "+ optionType +" WHERE ProductId = "+ productId +";"
                );
            } else {
                //console.log(optionType)
                results2 = con.awaitQuery(
                    "DELETE FROM engraving WHERE ProductId = "+ productId +";"
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

module.exports = {connect, disconnect, _checkConnect, handleGetAllRequest, handleGetRequest, /*getProducts,*/ handleDeleteRequest, handlePostRequest,  _updateHelp, _createProduct, _createSearch,
_createHelp, _createBuilderDrop, _createBuilderEngrave, _createTable, _updateBuilderDrop, _updateBuilderEngrave, _checkEmpty, _deleteTable, handleDeleteAllRequest, isConnected, con};

