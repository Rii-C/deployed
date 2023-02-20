const express = require("express")

const userRouter = express.Router()

const {UserModel} =require("../model/user.model")
const bcrypt= require("bcrypt")
const jwt = require('jsonwebtoken');



userRouter.get("/",async(req,res)=>{
    const query = req.query
     try {
        let user = await UserModel.find(query)
        res.send(user)
     } catch (error) {
        res.send({"msg":"some wrong" ,"err":error.message})
     }
})


userRouter.post("/register",async(req,res)=>{
const {name,email,password,age,gender,city} = req.body
try {
    bcrypt.hash(password,5,async(err,hash)=>{
        if(err){
            res.send({"msg":"some thing wrong","err":err.message})
        }else{
            const user = UserModel({name,email,password:hash,age,gender,city})
            await user.save()
            console.log("register")
            res.send({"msg":"user register"})
        }
    })
   
} catch (error) {
     console.log({"msg":"something wrong","err":error.message})
}
})


userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await UserModel.find({email})
    try {
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if(result){
                    var token = jwt.sign({userID :user[0]._id }, 'masai');
                  res.send({"msg":"logined succesfuly","token":token})
                }else{
                  res.send(" something wrong")
                }
              })
        }
    else{
        res.send({"msg":"wrong email password" }) 
    }
    } catch (error) {
         console.log(error)
    }
    })

module.exports=({
    userRouter
})