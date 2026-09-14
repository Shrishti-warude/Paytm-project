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
userName: zod.email(),
password: zod.string(),
firstName: zod.string(),
lastName: zod.string()
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
    userName: req.body.userName
    });

    if(existingUser){
        return res.status(411).json({
            error: "Email already exists"
        });
    }

    const user = await User.create({
        userName: req.body.userName,
        password: await bcrypt.hash(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
    userName: zod.string().email(),
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
        userName: req.body.userName
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



// update body
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
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
