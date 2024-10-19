import { DB } from "./exports.js"

export let profile_image_consume=async(msg)=>{
   
   if (msg.content.toString()) {
      let {user_id,secure_url}=JSON.parse(msg.content.toString())

      let image=await DB.profileImg.findUnique({where:{user_id}})
      
      if (image) {
         await DB.profileImg.update({where:{user_id},data:{url:secure_url}})  
      }else{
         await DB.profileImg.create({data:{user_id,url:secure_url}})  
      }
   }
}