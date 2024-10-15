const express = require('express');

const requestRouter = express.Router();

const { userAuth2 } = require("../../middleware/auth");

const {validateEditProfileData} = require("../../middleware/auth");



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








//LOG-OUT REQUEST 

requestRouter.post("/logout", (req, res) => {

    res.cookie("token", null, { expires: new Date(Date.now()) });

    res.send("logout successfully");

})






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
