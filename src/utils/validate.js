const validator = require('validator');

const validateSignUpData = (req) => {
       const{ firstName, lastName, emailId, password, age} = req.body;
        
       if(!firstName || !lastName )
       {
        throw new Error("name is not valid");
       }
       else if(! validator.isEmail(emailId))
       {
        throw new Error("email id not valid")
       }
       else if(!validator.isStrongPassword(password))
       {
        throw new Error("please enter strong password");
       }

};


module.exports = {
    validateSignUpData,
};