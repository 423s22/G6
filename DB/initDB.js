//creates DB
var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: process.env.MYSQL_KEY 
});  
con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
  con.query("CREATE DATABASE IF NOT EXISTS ShopifyProduct;", function (err, result) {  
    if (err) throw err;  
    console.log("Database created or already exists");  
    }); 
});
