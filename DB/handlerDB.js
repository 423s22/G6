const { useQuery } = require('@apollo/client');
const mysql = require('mysql-await');
//import _create from "./crud";
var pN = '"Dog Collar' + 'OwnerId"';
const json = '{"productId": '+1+
' , "productName": "Dog Collar" , "tableName": ' + pN +
' "columnNames": ["productId", "productName", "baseCost", "apples", "bananas", "lemons"], "values": ['+
1+', "Dog Collar", 1, ' + Math.random().toFixed(4) + ' ,'+ Math.random().toFixed(4)+', '+Math.random().toFixed(4)+']}';


class DBConnection{
    constructor(host, username, password, database) {
        this._connection = mysql.createConnection({
            host: host,
            user: username,
            password: password,
            database: database,
        });
    }

    async connect() {
        if (this._isConnected) return true;
        let err = await this._connection.awaitConnect();

        if (err) {
            this._lastError = err;
            this._isConnected = false;
        } else {
            this._lastError = null;
            this._isConnected = true;
        }
        return this._isConnected;
    }

    async disconnect() {
        await this._connection.awaitEnd();
        this._isConnected = false;
    }
    async handleGetRequest(ctx) {
        ctx.respond = false;
        const requestedData = ctx.query.request;
        let results;
        switch (requestedData) {
            case "product":
                results = await this.getUserProducts(parseInt(ctx.query.userID));
                break;
        }
        ctx.res.write(`${results}`);
        ctx.res.end();
        ctx.res.statusCode = 200;
    }

    async getUserProducts(data) {
        let results = await this._connection.awaitQuery(
            `SELECT * FROM  ` + data.tableName + ` WHERE userId = ` + data.userId + `;`
        );
        return JSON.stringify(results);
    }

    async handlePostRequest(ctx) {
        const post = ctx.request.body;
        const data = JSON.parse(ctx.request.body);
        await this._createTable(JSON.parse(ctx.request.body));

        const requestedOperation = post["operation"];
        let results;
        switch (requestedOperation) {
            case "product":
                {
                    results = await this._postProduct(data);
                    break;
                }
        }
        ctx.respond = false;
        ctx.res.statusCode = 200;
        ctx.status = 200;
        ctx.res.write(`${results}`);
        ctx.res.end();
    }


    async _createProduct(data) {
        if(isNaN(data.productId)) {
            let a = await this._createHelp(data);
            if(a) {
                queryArr = _createBuilder(data.columnNames, data.values);
                let result = await this._connection.awaitQuery(
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
                let result = await this._connection.awaitQuery(queryStatement) 
                return JSON.stringify({ "message": "Updated" });
            }
        } else {
            console.log("this is not being inserted" + data.productId);
        }
    }
    async _createHelp(data) {
        if(isNaN(data.productId)) {
            queryArr = _createBuilder(data.columnNames, data.values);
            let result = await this._connection.awaitQuery(
                'SElECT * FROM ' + data.tableName + ' WHERE productId = ' + data.productId + ';'
            );
            return true; //JSON.stringify({ "message": 'There is a Product'});
        } else {
            console.log("this is not being inserted" + data.productId);
        }
    }
    
    async _createTable(json) {
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
        return this._connection.awaitQuery(queryStatement);
        
    }

    async handleDeleteRequest(ctx) {
        const requestedOperation = ctx.query.operation;
        let results;
        switch (requestedOperation) {
            case "product":
                {
                    const data = JSON.parse(ctx.request.body);
                    results = await this._deleteProduct(data.productId);
                    break;
                }
            case "table":
                {
                    const data = JSON.parse(ctx.request.body);
                    results = await this._deleteTable(data.productId);
                    break;
                }
        }
        ctx.respond = false;
        ctx.res.statusCode = 200;
        ctx.status = 200;
        ctx.res.write(`${results}`);
        ctx.res.end();
    }

    async _deleteProduct(data) {
        if (isNaN(data.productId)) {
            return JSON.stringify({ "message": "Invalid ID" });
        } else {
            let result = await this._connection.awaitQuery(
                "DELETE FROM  " + data.tableName + " WHERE ProductId = "+ data.productId +";"
            );
            return JSON.stringify({ "message": "Successfully deleted" });
        }
    }
    async _deleteTable(data) {
        if (isNaN(data.tableName)) {
            let result = await this._connection.awaitQuery(
                "DROP TABLE  " + data.tableName+";"
            );
            return JSON.stringify({ "message": "Successfully deleted" });
        } else {
            return JSON.stringify({ "message": "Table Not Deleted" });
        }
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
