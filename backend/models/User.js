// const mongoose =require('mongoose');
 
// const userSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         phone: {
//             type: String,
//             required: true,
//             unique: true,
//         },
//         password: {
//             type: String,
//             required: true,
//         },
//         balance: {
//             type: Number,
//             default: 0,
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// const User = mongoose.model('User', userSchema);
// module.exports = User;



// backend/db.js
    const mongoose = require('mongoose');
const { required } = require('zod/mini');

    // Create a Schema for Users
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minLength: 3,
            maxLength: 30
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        }
    });

    const accountSchema  = new mongoose.Schema({
        userId: {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        balance :{
            type : Number,
            required : true
        }
    });

    // Create a model from the schema
    const User = mongoose.model('User', userSchema);
    const Account = mongoose.model('Account' , accountSchema);
    console.log("Schema created")
    module.exports = {
        User,
        Account
    };