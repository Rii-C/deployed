const jwt = require("jsonwebtoken")


const authenticate = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decode)=>{
            if(decode){
                console.log(decode.userID)
                req.body.user=decode.userID
              next()
            }else{
                res.send({"msg":"please login"})
            }
        })
    }else{
        res.send({"msg":"please login"})
    }
}

module.exports={
    authenticate
}