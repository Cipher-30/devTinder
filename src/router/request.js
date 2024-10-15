 const express = require('express');

 const requestRouter = express.Router();

 const {userAuth2} = require("../../middleware/auth")



 
requestRouter.get("/profile" ,userAuth2, async (req,res) => 
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
      
    });







    requestRouter.get("/sendConnectionRequest",userAuth2, (req, res) => {

        const user = req.user;

        console.log("sending connection request");
          
        res.send(`${user.firstName} sends a connection request`);

    })
    




 module.exports = requestRouter;
