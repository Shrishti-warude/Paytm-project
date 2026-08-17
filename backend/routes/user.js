const express = require("express");
const zod = require("zod");
// const { User } = require("../db");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const router = express.Router();

//SignUp
 const signupBody = zod.object({
username: zod.email(),
firstName: zod.string(),
lastName: zod.string(),
password: zod.string()
})

router.post("/signup", async (req, res) => {
 const{success} = signupBody.safeParse(req.body);
 if(!success){
    return res.status(411).json({
        error: "Invalid request body/ Email already exists"
    });
 } 

 const existingUser = await User.findOne({ 
    username: req.body.username
    });

    if(existingUser){
        return res.status(411).json({
            error: "Email already exists"
        });
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: await bcrypt.hash(req.body.password, 10),
    });
    console.log(user)
    const userId  = user._id;
     const token = jwt.sign({ 
        userId
     }, process.env.JWT_SECRET);

     res.json({
        message : "User created successfully",
        token : token
        });
     })

     router.get("/" , (req , res) =>{
        res.send("Working")
     })


     //SignIn
    const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username
    });

    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!passwordMatch) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET
    );

    res.json({
        token: token
    });
});
    
module.exports = router;
