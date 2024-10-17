const express = require('express');

const requestRouter = express.Router();

const { userAuth2 } = require("../../middleware/auth");

const {validateEditProfileData} = require("../../middleware/auth");

const bcrypt = require("bcrypt");

const ConnectionRequest = require("../modals/connectionRequest");

const User = require("../modals/user")




requestRouter.post("/request/review/:status/:requestId", userAuth2, async (req, res) => {
    try{
        const loggedInUser = req.user;
    const allowedStatus = ["accepted", "rejected"];
    const{status, requestId} = req.params;


    //validate status
    if(!allowedStatus.includes(status))
    {
        return  res.status(400).json({message:"status not valid"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
    })

    if(!connectionRequest)
    {
        return res
        .status(400)
        .json({message: "not found any user (connection request)"})
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res
    .json({message:"sonnection request" + status,data});
    }
    catch(err)
    {
        res
        .status(400)
        .json({message:"Err"+ err.message,})
    }


})







// ---------------------------------------------------------------------




requestRouter.post( "/request/send/:status/:toUserId",userAuth2,
 async (req, res) => {
    try{
        const fromUser = req.user._id;
        const toUser = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"]
        isStatusValid = allowedStatus.includes(status);

        //cannot contain other then allowedStatus
        if(!isStatusValid)
        {
          return res.status(400).json({message:"not a valid status"});
        };

        const toUserExist = await User.findById({_id: toUser});
        console.log("toUserExist = ",toUserExist);
        
        if(!toUserExist)
        {
       return res.status(400).json({message:"toUser not exixt"});
        }
         
        //or condition to find document from db
        const connectionExist = await ConnectionRequest.findOne( {
            $or: [
            //already send a request to person
                {fromUserId : fromUser, toUserId: toUser },
             //person has already send you a request
                {fromUserId: toUser, toUserId: fromUser}
            ]
         }); 
 
         console.log("connectionExist",connectionExist); 
         

         if(connectionExist) 
         { 
           return  res.status(400).json({message:"user already exist"});
         }

 
        
        
        //making obj instance of ConnectionRequest
        const connectionRequest = new ConnectionRequest({
          fromUserId: fromUser,
          toUserId: toUser,
          status
        })
           //save to db
        const data = await connectionRequest.save();
        //send respose back 
         res.json({
          message: "Connection Request send successfully",
          data
         });
    }
    catch(err)
    {
        res.status(400).send("ERR:"+ err.message);
    }

    }
)






// ****************** EDIT PASSWORD ************

requestRouter.patch("/profile/password",userAuth2, async(req,res) => {
    const user = req.user;
    const password = req.body.password;

    const newpassword = await bcrypt.hash(password, 10);

    user.password = newpassword;

    // const oldPassword= req.user.password;
    // console.log("oldpassword " ,oldPassword);
    // console.log("newpassword " ,newPassword);

    await user.save();

    res.send("got the password");
    
})





// ****************** EDIT PROFILE ************

requestRouter.patch("/profile/edit", userAuth2, async (req, res) => {
 try{
       if(!validateEditProfileData(req)){
        throw new Error("not allow to update")
        // res.status(400).send("invalid edit request")
       }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key])) ;

        console.log(loggedInUser);

        await loggedInUser.save();

        res.send(`${loggedInUser.firstName} is updated successfully `);
        
 }
 catch(err)
 {
     res.status(400).send("invalid edit request")
 }
});








// ****************** LOG-OUT REQUEST  ************

requestRouter.post("/logout", (req, res) => {

    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.send("logout successfully");

})





// ****************** PROFILE VIEW  ************

requestRouter.get("/profile/view", userAuth2, async (req, res) => {

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

    try {

        const user = req.user;
        if (!user) {
            throw new Error("user not found")
        }
        else {
            console.log("user deatails", user);
            //giving profile
            res.send(`${user.firstName}'s profile send successfully `);
        }
    }
    catch (err) {
        throw new Error("something went wrong (during get/profile)");
    }

});







requestRouter.get("/sendConnectionRequest", userAuth2, (req, res) => {

    const user = req.user;

    console.log("sending connection request");

    res.send(`${user.firstName} sends a connection request`);

})



 

module.exports = requestRouter;
