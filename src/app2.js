const express = require("express");

const connectDb = require("../config/database")

const User = require("../src/modals/user")


const app = express();

//MIDDLEWARE CONVERTING JSON DATA TO JS-OBJ 
// ADDS JS-OBJ TO REQ.BODY
app.use(express.json());



//adding user dynamically using postman body (raw)
 
app.post("/signUp", async (req, res) => {

  const user = new User(req.body);
try{
  await user.save();
  res.send("added user successfully");
}
catch(err)
{
  res.status(500).send("something went wrong!! ")
}
}); 












// -------------------------------------------------------------
 // ******** POST CALL TO SEND DATA TO DB ********
 //HARDCODING THE USER-OBJ

 app.post("/signup" , async (req, res) => {

  //CREATING OBJ TO SAVE INTO USER INSTANCE/MODAL
  const userObj = {
    firstName: "virat",
    lastName : "kholi", 
    emailId: "vk@gmail.com",
    password:"test@123",
    gender: "male"

  };

  //creating instance of User model/object
  const user = new User(userObj);


  //--------SAVES THE USER TO DB---------------
 try{
      await user.save(); // returns promise
      res.send("successfully created user!!!")
    }
    catch(err)
    {
      res.status(500).send("Error saving the user" + err.message)
    }
// ---------------------------------------------------------

//FAST/EASY TO CREATE OBJ TO SAVE INTO USER INSTANCE/MODAL
//  (DIRECTLY)

  //  const user = new User({
  //   firstName: "amit",
  //   lastName : "kumar", 
  //   emailId: "ak@gmail.com",
  //   password:"test@123",
  //   gender: "male"
  //  });
  
  //--------SAVES THE USER TO DB---------------

    // try{
    //   await user.save(); // returns promise
    //   res.send("successfully created user!!!")
    // }
    // catch(err)
    // {
    //   res.status(500).send("Error saving the user")
    // }

  //-----------------------------------------------------
 });





 // ******** CONNECTING TO DB AND THEN LISTENING ON PORT 4000 ********

 connectDb()
 .then(() => {
    console.log("database connection established..");

    
  app.listen( 4000, () => {
    console.log("running app2 on port 4000!"); 
  }) 
     
 } )
 .catch( () => {
    console.error("cannot connect to database");
    
 });



// app.get("/user" , (req, res) =>
// {
//     res.send( "working fine !!!")
// })

