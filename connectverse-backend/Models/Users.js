import express from 'express'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required:true,
            unique:true
        },

        email: {
            type : String,
            required: true,
            unique:true,
        },
        password : {
            type  : String,
            required :true
        },
        isVerified : {
            type : Boolean,
            default:false
        },
        verificationToken : {
            type : String
        }
    }
)

const User = mongoose.model('User',UserSchema);

export default User;