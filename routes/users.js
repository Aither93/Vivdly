const express = require("express");
const auth = require("../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const router = express.Router();
const {userSchema, User} = require("../models/users");



router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
})

router.post("/", async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(user){return res.status(400).send("user already registered")}
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    const salt = await bcrypt.genSalt(14);
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash;
    try{
        await user.save();
        const token = user.generateAuth();
        res.header("x-auth-token", token)
        .send(_.pick(user, ["username", "email","_id"]));
    }
    catch(err){
        res.send(err.message);
    }
})




module.exports = router;