import {CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET} from "../exports.js"
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name:CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET
})

let uploadSingleFile=async(url,type)=>{
   
   try {
    let upload
     if (type==='image') {
      upload=await cloudinary.uploader.upload(url)

     }else if(type==='video'){
      upload=await cloudinary.uploader.upload(url,{resource_type:'video'})
      
     }
    return upload 
   } catch (error) {
     console.log(error);
   }
}

export {uploadSingleFile}