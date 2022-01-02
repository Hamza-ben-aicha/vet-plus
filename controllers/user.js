import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';


export const signin = async (req,res) =>{
    const {email,password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message :"User doesn't exist. "})
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).jason({message: "Invalid Credentials"});
        const token = jwt.sign({email: existingUser.email, id:existingUser._id},'test',{expiresIn : "1h"}); //json web token(jwt) need to send to our frontend 
        res.status(200).json({result: existingUser, token});
     } catch (error) {
        console.log("sign in");
        res.status(500).json({message: "something went wrong "});
    }
}

export const signup = async (req,res) =>{
    const {email,password, confirmPassword, firstName,lastName} =req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({message :"User already exists. "})
        if(password !== confirmPassword)return res.status(400).jason({message: "Passwords don't match."});
        // before we store the user we first need to hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashedPassword, name:`${firstName} ${lastName}`});
        const token = jwt.sign({email: result.email, id:result._id},'test',{ expiresIn: '1h'}); //json web token(jwt) need to send to our frontend 
        res.status(200).json({result , token});
    } catch (error ) {
        //console.log("here is the error in the controller/user.js/ jwt.sing ");
        console.log(error);
    }
}


export const fetchUsers = async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);      
  
    } catch (error) {
        res.status(404).json({message: error.message})        
    }


}