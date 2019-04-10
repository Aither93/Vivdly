const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const {userSchema, User} = require("../models/users");

router.post("/", async(req, res) => {
    try{
        const user = await User.findOne({email: req.body.email });
        if(!user){throw new Error("Invalid email or password")};
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if(!isValid){throw new Error("Invalid email or password")}
        const token =user.generateAuth();
        res.send(token);
        
    }
    catch(err){
       return res.send(err.message)
    }

})



module.exports = router;
