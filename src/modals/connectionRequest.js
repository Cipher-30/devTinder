const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema( {
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User" //reference to User Collection in Db
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: "Error: Value is not valid",
        }
    }
},
{
    timestamps:true
});


//indexing the field to make the finding faster for mongoDB
 connectionRequestSchema.index({fromUserId:1, toUserId:1});
 // compound Indexing , ADDING UNIQUE : TRUE IS ALSO A INDEXING



//WILL RUN BEFORE SAVING INTO DB
connectionRequestSchema.pre("save", function (next){ // no arrow function here
       const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId))
    {
        throw new Error("cannot send request to yourself")
    }
    next();
})



const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema); 

module.exports = connectionRequestModel;


