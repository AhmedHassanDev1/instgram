import express from "express"
import {DB} from "../exports.js"
import ErrorHandle from "express-async-handler"
let Router= express.Router()


Router.get('/',ErrorHandle(async(req,res)=>{
   let {id}=req.query
   console.log(id);
   let user=await DB.user.findUnique({where:{id},include:{profileImg:true}})
  if (user) {
    delete user.password

    res.status(200).json(user)  
  }else{
    res.status(404).json({message:'not found user'})
  }
}))

Router.get('/image',ErrorHandle(async(req,res)=>{
    let {id}=req.query

    let image=await DB.profileImg.findUnique({where:{user_id:id}})
   
     res.status(200).json({image})  
 }))


export default Router