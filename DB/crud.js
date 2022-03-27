//DB functions: CRUD
// create, read, update, delete
var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: process.env.MYSQL_KEY ,
  database: "ShopifyProduct"
});  
// Required input 2 lists of the same length
// these build the query from the lists and returns a list of 2 string variable [column names, values for table]
_queryBuilder: function _queryBuilder(columnsTitles,values,id) {
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
_view: function _view(data) {
    con.connect(function(err) {  
        console.log("Connected!");  
        var queryStatement = "SELECT * FROM " + data.tableName + ";";
        con.query(queryStatement, function (err, rows) {  
            for (var i in rows) {
                console.log(rows[i]);
            }
        
        if (err) throw err;  
        console.log("Database works");  
        }); 
        
    });
}

_change: function _change(data) { 
        var queryStatement = "DELETE FROM  " + data.tableName + " WHERE ProductId = "+ data.id +";"
        con.query(queryStatement, function (err, result) {  
          if (err) throw err;  
          console.log("Database Table product deleted");  
        });
}

// this creates a table and populates everying with a limited Decimal
const inputTable = {id: 92, tableName: "test", columnNames: ["ProductId" ,"apples", "bananas", "lemons"], values: [92,1,1.05,1.69]}
_create(inputTable);
//_view(inputTable);
//_delete(inputTable);
_create: function _create(data) {   // CREATES a new Table with columnTitles
    console.log(data.tableName);
    con.connect(function(err) {  
        if (err) throw err;  
        console.log("Connected! of create");  
        var queryStatement = "CREATE TABLE IF NOT EXISTS " + data.tableName + " (";
        for(let i = 0; i < data.columnNames.length; i++) {
            if( i == data.columnNames.length-1) {
                queryStatement += data.columnNames[i] + " NUMERIC(10,4)";
            }
            else{
                queryStatement += data.columnNames[i] + " NUMERIC(10,4), ";
            }
        }
        queryStatement += ");";
        con.query(queryStatement, function (err, result) {  
        if (err) throw err;  
        console.log("Database Table Created"); 
        _createNext(data);
        }); 
        
        
    });  
    
    //List [tableName, id, columnsTitles, values]
    

}
// this create is adding to the table just called
_createNext: function _createNext(data) {
    queryArr = _queryBuilder(data.columnNames, data.values, data.id); 
    var queryStatement = "SELECT * FROM " + data.tableName + ";";
    con.query(queryStatement, function (err, rows) {  
        if (err) throw err;  
        for (var i in rows) {
            if( rows[i].ProductId ==  data.id ) {
                console.log("Database create product id taken");
                _change(data);
                break;
            }
        }
        var queryStatement = "INSERT INTO " + data.tableName + "("+ queryArr[0] + ") VALUES (" + queryArr[1] + ");"
                con.query(queryStatement, function (err, result) {  
                if (err) throw err;  
                console.log("Database Table product added");  
                con.end();
            });
    });
    
         
}

_delete: function _delete(data) {
    con.connect(function(err) {  
      if (err) throw err;  
      console.log("Connected! for delte");  
      var queryStatement = "DELETE FROM  " + data.tableName + " WHERE ProductId = "+ data.id +";"
      con.query(queryStatement, function (err, result) {  
        if (err) throw err;  
        console.log("Database Table product deleted");  
        
    });  
    var queryStatement = "SELECT * FROM " + data.tableName + ";";
        connection.query(queryStatement), function selectAll(err, rows, fields) {
            if (err) throw err;
            if ( rows.length == 0 ) {
                _deleteTable(data);
            }
        }
    });
    }

_deleteTable: function _deleteTable(data) {
          var queryStatement = "DROP TABLE " + data.tableName +";"
          con.query(queryStatement, function (err, result) {  
            if (err) throw err;  
            console.log("Database Table deleted");  
            }); 
}
/*
_update: function _update(table, currentColumn, id) {
    console.log(input);
    con.connect(function(err) {  
        if (err) throw err;  
        console.log("Connected!");  
        var queryStatement = "UPDATE " + table + "SET " + currentColumn + " = " +  ";"
        con.query(queryStatement, function (err, result) {  
            if (err) throw err;  
            console.log("Database created or already exists");  
        }); 
});  
}*/
