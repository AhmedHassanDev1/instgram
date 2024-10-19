import {JWT_SECRET} from "../exports.js"
import  verify  from "jsonwebtoken/verify.js" 
let context=async({req})=>{
  let Authorization=req.headers.authorization
 
  if (Authorization) {
      
     let validToken=verify(Authorization,JWT_SECRET)
     if (validToken) {
       
         return {user:validToken}
     }
  } 
 
}

export default context