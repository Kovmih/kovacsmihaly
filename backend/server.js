const express = require("express");
const mysql = require("mysql2");
 
const app = express();
app.use(express.json());
 
const connection = mysql.createConnection({
    host:"localhost",
    port: 3307,
    user:"root",
    password:"",
    database:"szerviz_db"
})
 
connection.connect((err)=> {
    if (err) {
        console.error("hiba:", err);
        return;
    }
 
    console.log("van kapcsolat");
 
 
 
});