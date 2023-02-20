const express = require("express")
require("dotenv").config()
const {PostModel} = require("../model/post.model")


const postRouter = express.Router()


postRouter.get("/",async(req,res)=>{

    try {
        let post = await PostModel.find({user:req.body.user})
        res.send(post)
    } catch (error) {
        res.send({"msg":"can not post","err":error.message})
    }
})



postRouter.get("/:id",async(req,res)=>{

    const ID = req.params.id
    try {

        let post = await PostModel.find({_id:ID})

        res.send(post)

    } catch (error) {
        res.send({"msg":"cant get the post", "Err":error.message})
    }
})


postRouter.post("/add",async(req,res)=>{
    const payload = req.body
    try {
      const post = new PostModel(payload)
      await post.save()
      res.send({"msg":" post is added"})
    } catch (error) {
        res.send({"msg":"cant get ","err":error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const ID = req.params.id
    try {
      await PostModel.findByIdAndUpdate({_id:ID},payload)
     
      res.send({"msg": `post is update whose id is ${ID}`})
    } catch (error) {
        res.send({"msg":"cant update ", "err":error.message})
    }
})



postRouter.delete("/delete/:id",async(req,res)=>{
    
    const ID = req.params.id
    try {
      await PostModel.findByIdAndDelete({_id:ID})
      
      res.send({"msg": `post is delete whose id is ${ID}`})
    } catch (error) {
        res.send({"msg":"cant delete ", "Err":error.message})
    }
})



module.exports={
    postRouter
}