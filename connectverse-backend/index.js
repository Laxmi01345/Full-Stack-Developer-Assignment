import express from 'express'
import mongoose from 'mongoose'
import User from './Models/Users.js'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import http from 'http'
import SendMail from './Controller/SendMail.js'

const app = express();
dotenv.config();
const router = express.Router();

const PORT =3000;
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST" , "PATCH"],
    crendentials:true
}));

app.use(cookieParser())
app.use(express.json())


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
});

const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://laxmiray013:706WkyyHXg9iUzgu@cluster0.rawvi.mongodb.net/`);
    console.log(`Database is connected to ${mongoose.connection.host}`);
}

connectDB();

// 706WkyyHXg9iUzgu

app.post('/signup',async(req,res)=>{
    try{
        const {username , email , password } =req.body;
        const existingUser = await User.findOne({email});
        const existUsername = await User.findOne({username});
        

        if (existingUser){
            return res.status(400).json({message:"Email already exists"})
        }

        if (existUsername){
            return res.status(400).json({message:"username already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({username , email , password:hashedPassword});
        await newUser.save();

        const token = jwt.sign({ email : newUser.email} , "jwt-12345",{
            expiresIn:'1d'
        });

        const verificationLink = `http://localhost:3000/auth/verify-email/${token}`;

        await SendMail(email,verificationLink);


        
        res.cookie('token',token, { httpOnly : true});
        res.json({status:"success" , token });

    }
    catch(error){
        res.status(400).json({message :'error while loading'});
        console.log(error)
        
    }
})

app.get('/auth/verify-email/:token' , async (req,res)=>{
    try {
        const {token} = req.params;

        const decoded = jwt.verify(token,"jwt-12345");
        const user = await User.findOne({email: decoded.email});

        if (!user){
            return res.status(404).send('User not found');
        };

        user.isVerified=true;
        await user.save();

        res.send(`
            <h1>Successfully verified!</h1>
            <p>Your email has been verified. You can now close this window and login.</p>
        `);





    }
    catch(error){

        res.send(`
            <h1>Verification error</h1>
            <p>${error}</p>
        `);

    }
})

app.patch('/reset-password', async (req,res) =>{
    const {email ,password} =req.body;
    

    try {

        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({message:'Email is not Registered'})
        }
        const hashedNewPassword = await bcrypt.hash(password, 10);
        user.password = hashedNewPassword;
        await user.save();

        res.json({status : "ok" });


    }
    catch(error){
        res.status(400).json({message :'error while resetting the password'});
        console.log(error)
    }
})

app.post('/login' , async (req,res)=>{
    const {username , password } =req.body;

    try{
        const user = await User.findOne({username});
        if (!user){
            return res.status(400).json({message:'Username is not Registered'})
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if (isMatch){
            const token = jwt.sign({email : user.email} , "jwt-1234" , {
                expiresIn:'1d'
            });

            res.cookie('token',token, {httpOnly : true});

            res.json({status : "success" , token});


        }

        else{
            res.status(400).json({message : 'Password is incorrect !'});
        }


    }
    catch(error){
        res.status(400).json({message : error.message});
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running at Port ${PORT} `)
})

