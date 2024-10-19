import {DB,gRPC_client,JWT_SECRET} from "../exports.js"
import { hash,genSalt } from "bcrypt"
import sign from "jsonwebtoken/sign.js"
import ErrorHandle from "express-async-handler"

let SignUp=ErrorHandle(async(req,res)=>{
  try {
    let {name,email,password,gender='male'}=req.body  
    let salt=await genSalt()
    password=await hash(password,salt) 
    await DB.user.create({data:{name,password,email,gender}})
    res.status(201).json({message:"A new account has been created."})
  } catch (error) {
     throw new Error(error.message)
  }
})


let Login=ErrorHandle(async(req,res,next)=>{
 
       
    let {email}=req.body
    let {id,name,is_verified}=await DB.user.findUnique({where:{email},select:{id:true,is_verified:true}})
    if (!is_verified){
        gRPC_client.get_verification_code({ email }, (error, response) => {
           if (!error) res.json({id,is_verified,verification_code: response.code});
           else res.status(400).json(error);
        })
    }else{   
      let payload={id,name}
      let token=sign(payload,JWT_SECRET,{expiresIn:'30d'})

      res.cookie('token',token,{httpOnly:true,secure:false,maxAge:(1000*60*60*24*30)})
      res.status(200).json({id,is_verified});
   }
})


let Get_token=ErrorHandle(async(req,res)=>{
   let {id}=req.query
   let {name}=await DB.user.findUnique({where:{id},select:{id:true,name:true}})
   await DB.user.update({where:{id},data:{is_verified:true}})
   let payload={id,name}
   let token=sign(payload,JWT_SECRET,{expiresIn:'30d'})
   res.cookie('token',token,{httpOnly:true,secure:false,maxAge:1000*60*60*24*30,sameSite:'none', domain:'localhost'})
   res.status(200).json({message:""})
})

let Get_cookies=ErrorHandle((req,res)=>{
    
    res.status(201).json({cookies:req.cookies})  
})

export {SignUp,Login,Get_token,Get_cookies}