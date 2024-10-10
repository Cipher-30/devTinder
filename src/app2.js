const express = require("express");

const connectDb = require("../config/database")


const app = express();



 connectDb()
 .then(() => {
    console.log("database connection established..");

    
  app.listen( 4000, () => {
    console.log("running app2 on port 4000!"); 
  }) 
     
 } )
 .catch( () => {
    console.error("cannot connect to database");
    
 })


// app.get("/user" , (req, res) =>
// {
//     res.send( "working fine !!!")
// })

