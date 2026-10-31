const userModel = require ('../models/user.model')
const blacklistToken = require('../models/blacklistToken.model')
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = async(req,res)=>{
    try{
        const {name,email,password}  = req.body
        const user = await userModel.findOne({email})

        if(user) {
            return res.status(400).json({message:"user already exist"})
        }
        const hash = await bycrypt.hash(password,10)
        const newUser = new userModel({name, email, password})
        await newUser.save()
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('token',token)
        res.send({mesage :'user registered successfully'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports.login = async(req,res)=>{
    try{
        const {email,password}  = req.body
        const user = await userModel.findOne({email}).select('+password')

        if(!user) {
            return res.status(400).json({message:"user not found"})
        }
        const isMatched = await bycrypt.compare(password,user.password)
        if(isMatched){
            return res.status(400).json({message:"invalid user and password"})
        }
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie('token',token)
        res.send({mesage :'user Logged in successfully'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports.logout = async(req,res)=>{
    try{
        
        const token = req.cookies.token
        await blacklistToken.create({token})
        res.clearCookie('token')
        res.send({mesage :'user logged out successfully'})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}