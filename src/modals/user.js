const mongoose = require("mongoose");

//IT IS JUST LIKE OBJECTS IN CLASS, WE R DEFEING THE CLASS AND WE WILL CREATE ITS OBJECT/INSTANCE OF OBJECT

const userSchema = new mongoose.Schema( {
    firstName : {
        type: String
    }, 
    lastName : {
        type : String
    }, 
    emailId : {
        type : String
    }, 
    password : {
        type : String
    }, 
    age : {
        type : Number
    }, 
    gender : {
        type : String
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;


// --------------------------------------------------------------

//EASY/FAST WAY TO DO THE EXPORT  (DIRECTLY)
// module.exports =  mongoose.model("User", userSchema);




