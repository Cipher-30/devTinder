const express = require('express');

const app = express();





// ------------------------------------------------------
    //  ************ MULTIPLE ROUTE HANDLERS **************

    app.get( "/person" , (req, res, next) => {
       
        console.log("handeling 1 route handler");
        next(); // will move to send route handler
        
        // res.send( "calling response 1") 
        //once res is send tcp connection is lost
    }, 
    (req, res, next) => {
       
        console.log("handeling the 2 route handler");

        // res.send( "calling response 2")

        next(); // move to next route handler
        
    },
    (req, res, next) => {
       
        console.log("handeling the 3 route handler");

        res.send( "calling response 3")

        // next(); // move to next route handler
        
    }
)












// ------------------------------------------------------
    //  ***************** QUERY PARAMETERS ********************


// to get the query param from "/user?userId=101"
// to get the query param from "/user?userId=101&password=1234"
app.get( "/user", (req, res) => {

       //will give the "query" from url (userid and pass)
       console.log(req.query);
       
    res.send({firstname:"amit", lastname:"kumar"});
});


// ----------------------------------------------------------
// ***************** DYNAMIC ROUTES ********************
 
  // /person/007/cypher
  app.get( "/person/:personId/:personName",  (req, res) => {
       
    // will give the dynamic route params (personId , personName)
     console.log(req.params);
     

    res.send("sending the dynamic routes");
  })



// ----------------------------------------------------------

//  "?" -> optional char
//   + -> multiple same char
//   * -> multiple any char
//   /a/ -> if a there with any other char
app.get( "/ab*c", (req, res) => {
    res.send({firstname:"amit", lastname:"kumar"} );
})



// --------------------------------------------------------






//REQUEST HANDLER (DEFAULT ROUTE)
// app.use( (req,res) => {
//     res.send("this is respose for server on 3000")
// });

//".use MATCHES ALL THE HTTP METHOD API CALL TO /hello"
app.use( "/hello" , (req, res) => {
    res.send("this response is for /hello path ")
});


// -------------------------------------------




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