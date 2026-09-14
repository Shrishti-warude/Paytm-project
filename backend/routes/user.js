const express = require("express");
const zod = require("zod");
// const { User } = require("../db");
const {User, Account} = require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {authMiddleware} = require("../middleware/user");


const router = express.Router();




//SignUp

 const signupBody = zod.object({
UserName: zod.email(),
Password: zod.string(),
FirstName: zod.string(),
LastName: zod.string()
})

router.post("/signup", async (req, res) => {

    console.log("BODY:", req.body);

    const { success } = signupBody.safeParse(req.body);

    console.log("ZOD SUCCESS:", success);

    if (!success) {
        return res.status(411).json({
            error: "Invalid request body/ Email already exists"
        });
    }

 const existingUser = await User.findOne({ 
    UserName: req.body.UserName
    });

    if(existingUser){
        return res.status(411).json({
            error: "Email already exists"
        });
    }

    const user = await User.create({
        UserName: req.body.UserName,
        Password: await bcrypt.hash(req.body.Password, 10),
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
    });
    console.log(user)
    const userId  = user._id;


    await Account.create({
        userId,
        balance : 1+ Math.random() * 10000
    })


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
    UserName: zod.string().email(),
    Password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        UserName: req.body.UserName
    });

    if (!user) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const passwordMatch = await bcrypt.compare(
        req.body.Password,
        user.Password
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



// update body
const updateBody = zod.object({
    Password: zod.string().optional(),
    FirstName: zod.string().optional(),
    LastName: zod.string().optional(),
})

router.put("/update", authMiddleware , async (req , res) => {
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message : "Error while updating information"
        });
    }

    try {
        await User.updateOne(
        {
            _id: req.userId
        }, req.body
    );

    res.json({
        message : "updated successfully"
    });
    } catch (error) {
        console.log(error)
    }
});
    
module.exports = router;
