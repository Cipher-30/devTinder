const express = require("express");

const connectDb = require("../config/database")

//importing modal = User
const User = require("../src/modals/user")

const {validateSignUpData} = require("./utils/validate")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

//DONT FROGET TO EXTRACT/DESTRUCTURE DURING IMPORTING
const {userAuth2} = require('../middleware/auth')


const app = express();

//MIDDLEWARE CONVERTING JSON DATA TO JS-OBJ 
// ADDS JS-OBJ TO REQ.BODY
app.use(express.json());
app.use(cookieParser());




app.get("/profile" ,userAuth2, async (req,res) => 
{

  //-----------------BEFORE USER-AUTH WAS THERE-----------------
  //getting the cookie from the req send
//   const cookie = req.cookies;
//   const {token} = cookie; //extract token

  //verify token with secret key ans get id from it
//   const decodeData = jwt.verify(token,"DEV@TINDER$731");
//   const {_id} = decodeData;// extract id
   
    //find user from id
//   const user = await User.findById({_id});
  //------------------------------------------------------

try{
  
  const user = req.user ;
  if(!user)
  {
    throw new Error("user not found")
  }
  else{
    console.log("user deatails",user);
     //giving profile
    res.send(`${user.firstName}'s profile send successfully `);
  }  
}
catch(err)
{
  throw new Error("something went wrong (during get/profile)");
}
  
 
  
})


// ---------------------------------------------------------------
// ******** LOG IN USER ********
// ******** with HASED PASSWORD********
// ******** CREATING JWT TOKEN with  EXPIRING DATE********




app.get( "/login", async (req, res) => {

  //gets the email and pass from postman  
   const {emailId, password} = req.body;

   try{
        //find user exist or not
      const user = await User.findOne({emailId : emailId});
      if(!user)
      {
        throw new Error("User not present");
      }
             //pass is valid or not (comparing..)
      const validPassword = await bcrypt.compare(password, user.password);
      
      if(validPassword)
      {
        //create jwt cookie by encrypting id into token with 
        //secret key "DEV@TINDER$731"
          const token = await jwt.sign({_id:user._id},"DEV@TINDER$731", {expiresIn: "1d"})
          console.log("jwt token = ",token);
           
          // ADD THE JWT TOKEN TO COOKIE TO SAVE AT BROWSER
          res.cookie("token", token);


        res.send("login successfully");
      }
      else{
        throw new Error("not a valid password enter");
      }

   }catch(err)
   {
      throw new Error("password not valid" + err.message);
   }

})















// -------------------------------------------------------------------
// ******** UPDATE THE USER FROM ID ********
// ******** with restricted permission ********


app.patch("/updateUser/:userId" , async (req, res) => {
  const userId = req.params?.userId; 
  const data = req.body; 
  // console.log( userId);
  // console.log(data);
  
   
  try{ 
    const ALLOWED_UPDATES = ["lastName","gender","about","skill" ];

    const isUpdateAllowed = Object.keys(data).every( (k) => { 
      return  ALLOWED_UPDATES.includes(k)
    });

    console.log("isupdate " + isUpdateAllowed);
    
    if(!isUpdateAllowed )
    { 
     throw new Error("UPDATE  NOT ALLOWED");
    }else
    {
      await User.findByIdAndUpdate({_id: userId}, data);   
      res.send("updated user Successfully ");
    }



  }catch(err) 
  {
    res.status(404).send("something went wrong (update the user)"+ err.message);
  } 

}) 














// -------------------------------------------------------------------
// ******** UPDATE THE USER FROM ID ********


// app.patch("/update" , async (req, res) => 
// {
//   //getting data from api
//   const userId = req.body.id;
//   const data = req.body;
//   console.log(data);
  
//   try{
//      //sending data to DB              {}     ,    {}   
//      await User.findByIdAndUpdate({_id : userId}, data )

//      res.send("successfully updates the user");
//   }
//   catch(err)
//   {
//     res.status(404).send("something went wrong (update the user)");
//   }
   

// })






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
   
 
  
try{ 
  //VALIDATING AT BACKED-END BEFORE SIGN-UP USER
  validateSignUpData(req);

  
  const {firstName, lastName, emailId, password, age} = req.body;

  const passwordHash = await bcrypt.hash(password,10);

  const user = new User({
   firstName,
   lastName,
   emailId,
   password: passwordHash, 
   age
  });//getting data from api
  console.log(user);

  await user.save(); //saving data to DB
  res.send("added user successfully");
}
catch(err)
{
  res.status(500).send("something went wrong!!"+ err.message)
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

