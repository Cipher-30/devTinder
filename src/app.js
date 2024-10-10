const express = require('express');

const app = express();

//REQUEST HANDLER (DEFAULT ROUTE)
// app.use( (req,res) => {
//     res.send("this is respose for server on 3000")
// });

//".use MATCHES ALL THE HTTP METHOD API CALL TO /hello"
app.use( "/hello" , (req, res) => {
    res.send("this response is for /hello path ")
});


app.get( "/user", (req, res) => {
    res.send({firstname:"amit", lastname:"kumar"});
});


//CALLING POST API METHOD ON "/user"
app.post( "/user", (req, res) => {
    //saving data to db.....and sending response
    res.send("data successfully saved on db");
     
})


app.use( "/login", (req, res) => {
    res.send( "login path")
}) 

app.use( "/logout", (req, res) => {
    res.send( "logout path")
}) 



app.listen(4000, () => {
    console.log("listening on 4000!!")
});