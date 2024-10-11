const express = require("express");

const connectDb = require("../config/database")

//importing modal = User
const User = require("../src/modals/user")


const app = express();

//MIDDLEWARE CONVERTING JSON DATA TO JS-OBJ 
// ADDS JS-OBJ TO REQ.BODY
app.use(express.json());






// -------------------------------------------------------------------
// ******** UPDATE THE USER FROM ID ********


app.patch("/update" , async (req, res) => 
{
  //getting data from api
  const userId = req.body.id;
  const data = req.body;
  console.log(data);
  
  try{
     //sending data to DB
     await User.findByIdAndUpdate({_id : userId}, data )

     res.send("successfully updates the user");
  }
  catch(err)
  {
    res.status(404).send("something went wrong (update the user)");
  }
   

})






// -------------------------------------------------------------------
// ******** DELETE THE USER FROM ID ********

app.delete( "/deleteUser" ,async (req, res) => {
    const userId = req.body.id;
    console.log(userId);
    try{
      const user = await User.findByIdAndDelete({_id : userId});
      res.send("delete successfully")
    }
    catch(err)
    {
      res.status(404).send("something went wrong (delete user by id)");
    }
    
  } )







// -------------------------------------------------------------------
// ******** GET USER FROM DB FROM EMAIL ********
// ******** EMAIL SEND FROM POSTMAN ********



app.get("/email" , async (req, res) => {
    //GET EMAIL FROM POSTMAN API
  const userEmailId = req.body.emailId;
  console.log(userEmailId);
  
try{
      //GET USER FROM DB 
    const user = await User.find({emailId : userEmailId});
     res.send(user);
}
catch(err){
    console.log("something went wrong (find user by email)");
    res.status(404).send("something went wrong (find user by email)");
}

});


//-----------------GETTING ALL USER FROM DB----------------------
app.get("/allUser", async (req, res) => 
{
  try{
    const user = await User.find({});
    if(!user) {   
      res.status(404).send("not found"); }
    else{ 
        res.send(user)  }
  }
  catch(err){
    res.status(500).send("something went wrong (finding all user)")
  }

})









// ------------------------------------------------------------------

//adding user dynamically using postman body (raw)
 
app.post("/signUp", async (req, res) => {
   
  const user = new User(req.body);//getting data from api
try{ 
  await user.save(); //saving data to DB
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
      res.send("successfully created user virat!!!")
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

