const express = require('express');

const app = express();

//REQUEST HANDLER (DEFAULT ROUTE)
// app.use( (req,res) => {
//     res.send("this is respose for server on 3000")
// });


app.use( "/hello" , (req, res) => {
    res.send("this response is for /hello path ")
});


app.use( "/login", (req, res) => {
    res.send( "login path")
}) 

app.use( "/logout", (req, res) => {
    res.send( "logout path")
}) 



app.listen(3000, () => {
    console.log("listening on 3000!!")
});