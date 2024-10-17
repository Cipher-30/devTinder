const express = require("express");
const userRouter = express.Router();
const ConnectionRequest = require("../modals/connectionRequest")

const {userAuth2} = require("../../middleware/auth");



//get all connection that are accepted
userRouter.get("/user/connections", userAuth2, async (req, res) => {
    
    try{
        const SAFE_DATA ="firstName lastName age";
        const loggedInUser = req.user;

        const allConnection = await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id, status:"accepted" },
                {fromUserId:loggedInUser._id, status:"accepted" },
            ]
        })
        .populate("fromUserId", SAFE_DATA);

        if(!allConnection)
        {
            return res.status(400).send("not found any request i the db");
        }

        const data = allConnection.map( (field) => {
            return field.fromUserId;
        })

        res
        .json({
            message:"found the all the connection",
            data,
        });

    }
    catch(err){
        res
        .status(400)
        .json({
            message:"in the catch "+ err.message,
        });
    }
})

















//get all the pending request for loggedIn user
userRouter.get("/user/requests/received", userAuth2 ,async (req, res) => {
    try{
        const loggedInUser = req.user;
        console.log(loggedInUser); 
        

        const data  = await ConnectionRequest.find({
            toUserId: loggedInUser._id
        }).populate("fromUserId", ["firstName", "lastName"]) 
//      also getting data from User collection 

        if(!data)
        {
            return res.status(400).send("not found any request for the user");   
        }

        res
        .json({
            message:"found the users",
            data 
        })
        

    }catch(err)
    {
           res
           .status(400)
           .json({
            message:"not found anything"+err.message,
           })
    }
}) 


module.exports = userRouter;


