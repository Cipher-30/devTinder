const  express = require("express");

const authRouter = express.Router();

const User = require("../modals/user");

const bcrypt = require("bcrypt")

const {validateSignUpData} = require("../utils/validate")



// ---------------------------------------------------------------
// ******** LOG IN USER ********
// ******** with HASED PASSWORD********
// ******** CREATING JWT TOKEN with  EXPIRING DATE********

authRouter.post( "/login", async (req, res) => {

    //gets the email and pass from postman  
     const {emailId, password} = req.body;
  
     try{
          //find user exist or not
        const user = await User.findOne({emailId : emailId});
        if(!user)
        {
          throw new Error("User not present");
        }
        // ------------------------------------------------
               //pass is valid or not (comparing..)
        // const validPassword = await bcrypt.compare(password, user.password);
  
        const validPassword = await user.validatePassword(password);
        //OFF-LOAD TO USER-SCHEMA
  
  
        // ------------------------------------------------
  
        
        if(validPassword)
        {
          // ---------------------------------------
          //create jwt cookie by encrypting id into token with 
          //secret key "DEV@TINDER$731"
            // const token = await jwt.sign({_id:user._id},"DEV@TINDER$731", {expiresIn: "1d"})
            // console.log("jwt token = ",token);
  
            const token = await user.getJWT(); //OFF-LOAD TO USER-SCHEMA
          //------------------------------------------------
  
             
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
  
  });







// ----------------------------------------------------------------------
  
//adding user dynamically using postman body (raw)
 
authRouter.post("/signUp", async (req, res) => {
   
 
  
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
    



module.exports = authRouter;