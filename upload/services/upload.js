import {rabbitChannel} from "../server.js"
import fsp from "node:fs/promises"
import fs from "node:fs"
import { uploadSingleFile } from "../utils/upload.js"
import ErrorHandle from "express-async-handler"

let Uploadpost=ErrorHandle( async(req,res)=>{
    
   const queue = 'post'
   let media=[]
   let user_id=req.user.id
   let title=req.body?.title || null
   let files=req.files
   
   for (const file of files) {
       let path=file.path
       let type=file.mimetype.split('/')[0]
     
       if(fs.existsSync(path)){
         
         let {public_id,width,height,resource_type,secure_url} =await uploadSingleFile(path,type)
          media.push({public_id,width,height,resource_type,secure_url})
          fsp.unlink(path)
         
        } else{
          res.status(400).json({message:'can`t post'})
       }
   }
  
   await rabbitChannel.assertQueue(queue)
   rabbitChannel.sendToQueue(queue,Buffer.from(JSON.stringify({user_id,title,media}))) 
   res.status(204).json()
})

let UploadUserImage=ErrorHandle(async(req,res)=>{
    const queue = 'profile-image'
    let user_id=req.user.id
    let public_id,secure_url
    let path=req.file.path
    if(fs.existsSync(path)){
        ( {public_id,secure_url} =await uploadSingleFile(path,'image'))
         fsp.unlink(path)
    } 
   
    await rabbitChannel.assertQueue(queue)
    rabbitChannel.sendToQueue(queue,Buffer.from(JSON.stringify({user_id,secure_url,public_id}))) 
    res.status(201).json({secure_url})
})

export {Uploadpost,UploadUserImage}