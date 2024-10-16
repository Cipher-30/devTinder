 
 const jwt = require("jsonwebtoken");
 const User = require("../src/modals/user")
 
 
 //HERE WE ARE JUST DEFINING THE CALLBACK FUNCTION AND EXPORTING IT FOR THE USE IN (MIDDLEWARE OR ROUTE HANDLER)
 
 const adminAuth = (req, res, next) => 
    {
        console.log("authenticating admin");
        
        const token = "xyz";

        const isAutherised = token === "xyz" ? true : false;

        if(!isAutherised)
        {
            res.status(401).send("you are not autherised");
        }
        else{
            next();
        }

    };

 const userAuth =  (req, res, next) => 
    {
        console.log("authenticating user");
        
        const token = "xyz";

        const isAutherised = token === "xyz" ? true : false;

        if(!isAutherised)
        {
            res.status(401).send("you are not autherised");
        }
        else{
            next();
        }
    };


    // --------------------------------------------------------------
    //************** USER AUTH FOR APP2******************** 


    const userAuth2 = async (req, res, next) => 
    {
        try{
            //get token from req
            const {token} = req.cookies; 

            if(!token)
            {
                throw new Error("token not found!!");
            }
          
            //verify token
            const decodeData = jwt.verify( token , "DEV@TINDER$731");
            const{_id }=  decodeData;

             //find user by id
            const user = await User.findById({_id});

            // console.log(User);
            
   
            if(!user)
            {
               throw new Error("USER NOT FOUND IN THE DB");
            }

            req.user = user; // assign/attach user to request call
            
            next(); 
        }
        catch(err)
        {
            throw new Error("ERROR:" + err.message);
        }  
    }
// -------------------------------------------------------


const validateEditProfileData = async (req) => {
  
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).forEach( (field) => { return ALLOWED_UPDATES.includes(field); })

    return isEditAllowed;

}

    

    module.exports = {

        adminAuth,
        userAuth,
        userAuth2,
        validateEditProfileData,
 

    };


 