const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const customEmailVal = [validator, "email is not valid"];

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true,
        required: true,
        validate: customEmailVal},
    password: String,
    isAdmin: Boolean
})
userSchema.methods.generateAuth = function (){
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get("jwtPrivateKey"));
    return token;
}
const User = mongoose.model("User", userSchema);

function validator(val) {
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(val);
}


module.exports = {
    userSchema: userSchema,
    User: User
}