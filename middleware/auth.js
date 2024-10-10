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

    module.exports = {
        adminAuth,
        userAuth,

    };


