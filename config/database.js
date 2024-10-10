 const mongoose = require("mongoose");

 const connectDb = async () =>{

    await mongoose.connect("mongodb+srv://akamitkumar3030:T8FByYPPkeTQfDaD@namastenode.nx1mj.mongodb.net/");
 };


 module.exports = connectDb;