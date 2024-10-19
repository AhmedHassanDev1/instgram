
import { JWT_SECRET } from "../exports.js"
import  verify from "jsonwebtoken/verify.js"

let token_validator=(req,res,next)=>{
    let token=req.cookies?.token
    if (token) {
       let validToken=verify(token,JWT_SECRET)
       if (validToken) {
          req.user=validToken
          next()
       }else{
         res.status(401).json({message:'invalid token'})

       }
    }else{
        res.status(401).json({message:'not found token pleace login'})
    }
}

export default token_validator