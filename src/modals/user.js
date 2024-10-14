const mongoose = require("mongoose");

const validator = require("validator");
//IT IS JUST LIKE OBJECTS IN CLASS, WE R DEFEING THE CLASS AND WE WILL CREATE ITS OBJECT/INSTANCE OF OBJECT

const userSchema = new mongoose.Schema( {
    firstName : {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
    }, 
    lastName : {
        type : String
    }, 
    emailId : {
        type : String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value))
            {
                throw new Error( "not a valid email")
            }
        }
    }, 
    password : {
        type : String,
        required: true,
        trim:true,
        validate(value) //will run on every value input
        {
            if(value.length < 8 || !/[a-zA-Z]/.test(value) || !/\d/.test(value))
            {
                throw new Error("password weak");
            }
        }


    }, 
    age : {
        type : Number,
        min: 18,
        required:true,
    }, 
    gender : {
        type : String,
        validate(value) //will run on every value input
        {
            if(!["male", "female", "other"].includes(value))
            {
                throw new Error("gender is not valid from the data set");
            }
        }

    },
    about : {
        type: String,
        default: "this is default text"
    },
    skill : {
        type: [String],
    },
},
{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
module.exports = User;


// --------------------------------------------------------------

//EASY/FAST WAY TO DO THE EXPORT  (DIRECTLY)
// module.exports =  mongoose.model("User", userSchema);




