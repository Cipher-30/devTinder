const express = require('express');

const app = express();


// ------------------------------------------------------
    //  ************ HANDELING ERROR ***********


    app.get( "/getUserData" , (req, res) => {

        //THIS IS THE BEST WAY TO HANDLE ERROR 
        //BY USING TRY AND CATCH 
        try{
            
            throw new Error("jfskfj");
            res.send("user data send")
        }
        catch(err)
        {
           res.status(500).send("something went wrong");
        }
    })


 // THIS CODE SHOULD BE PLACED AT END OF THE CODE
 // IF NOTHING RETURN THIS WILL RETURN IF SOMEONE THROW AN ERROR


    app.use( "/", (err,req, res, next) => {
        if(err)
        {
            res.status(500).send("something went wrong");
        }
    })
     
















// ------------------------------------------------------
    //  ************ AUTHENTICATION IN MIDDLEWARE ***********

    // app.use( "/admin" , (req, res, next) => 
    // {
    //     console.log("authenticating admin");
        
    //     const token = "xyz";

    //     const isAutherised = token === "xyz" ? true : false;

    //     if(!isAutherised)
    //     {
    //         res.status(401).send("you are not autherised");
    //     }
    //     else{
    //         next();
    //     }

    // })

    const {adminAuth, userAuth} = require("../middleware/auth.js");

    //CALL AUTH FOR EVERY "/admin" CALL
    app.use("/admin", adminAuth);

    app.get( "/admin/getUser" , (req, res ) => {

        console.log("admin get user");
        
        res.send( "send all user data");
    });

    app.get( "/admin/deleteUser" , (req, res ) => {
        console.log("admin delete user");
        res.send( "delete  user data");
    })


  //AUTH THE USER THEN CALL ROUTE HANDLER
    app.get("/user/getData" , userAuth , (req, res) => {

        console.log("sending the user data");

        res.send( "send user data successfully");
        
    })

  //AUTH THE USER THEN CALL ROUTE HANDLER
    app.get( "/user/info", userAuth, (req, res) => {
        console.log("sending the user info");

        res.send( "send user info successfully ")
    })

//WITHOUT AUTH CALL ROUTE HANDLER 
    app.post( "/user/login" , (req, res) => {

        console.log("logging the user");
        res.send("user logged successfully");
        
    })



    













// ------------------------------------------------------
    //  ************ MULTIPLE ROUTE HANDLERS **************

    app.get( "/person" , (req, res, next) => {
       
      //act as middleware
        console.log("handeling 1 route handler");
        next(); // will move to send route handler
        
        // res.send( "calling response 1") 
        //once res is send tcp connection is lost
    }, 
    (req, res, next) => {
          //act as middleware
        console.log("handeling the 2 route handler");

        res.send( "calling response 2")

        next(); // move to next route handler
        
    },
    (req, res, next) => {
          //act as route handler
        console.log("handeling the 3 route handler");

        res.send( "calling response 3")

        // next(); // move to next route handler
        
    }
)












// ------------------------------------------------------
    //  ***************** QUERY PARAMETERS ********************


// to get the query param from "/user?userId=101"
// to get the query param from "/user?userId=101&password=1234"
// app.get( "/user", (req, res) => {

//        //will give the "query" from url (userid and pass) to auth
//        console.log(req.query);
       
//     res.send({firstname:"amit", lastname:"kumar"});
// });


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
// app.post( "/user", (req, res) => {
//     //saving data to db.....and sending response
//     res.send("data successfully saved on db");
     
// })


// app.use( "/login", (req, res) => {
//     res.send( "login path")
// }) 

// app.use( "/logout", (req, res) => {
//     res.send( "logout path")
// }) 



// --------------------------------------------------


app.listen(3000, () => {
    console.log("listening on 3000!!")
});