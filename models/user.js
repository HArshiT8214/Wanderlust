const mongoose = require("mongoose");
const Schema = mongoose.Schema;
passportLocalMangoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }, 
});

userSchema.plugin(passportLocalMangoose);

module.exports = mongoose.model("User",userSchema)
