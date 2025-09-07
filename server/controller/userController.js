import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

//login user

const loginUser = async (req, res) => {
    const {email,password}=req.body
    console.log(email);
    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"invalid credentials"})
        }
        const token=createToken(user._id)
        res.json({success:true,message:"user logged in successfully",token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//register user
const registerUser =async (req,res)=>{
 const {name,password,email}=req.body
 try {
    // checking is user already exist
    const exists=await userModel.findOne({email})
    if(exists){
        return res.json({success:false,message:"user already exist"})
    }
    // validating email format and strong password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:"invalid email"})
    }
    if(!validator.isStrongPassword(password)){
        return res.json({success:false,message:"password should be strong"})
    }
    //hashing password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    //creating user
    const user=new userModel({
        name,
        email,
        password:hashedPassword
    })
    await user.save()
    const token = createToken(user._id)
    res.json({success:true,message:"user created successfully",token})
 } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
 }
}
export{loginUser,registerUser}