import { DB } from "./exports.js";

let get_type=(media)=>{

   let hasImage=media.some(el=>el.resource_type=='image')
   let hasVideo=media.some(el=>el.resource_type=='video')
   if (hasImage) {
        if (hasVideo) {
            return 'hybrid'
        } else{
            return 'image'
        }     
   }else{
      return 'video'
   }
}

let consume_tasks_queue=async(msg)=>{
   
   try {
      let {user_id,title,media}=JSON.parse(msg.content.toString())
      
      let mediaLength=media.length 
      let type=get_type(media)
     
      let {id}=await DB.post.create({data:{user_id,title,type,count:mediaLength}})
      for (let i=0; i< media.length; i++ ) {
      await DB.media.create({
             data:{
               Post_id:id,
               width:media[i].width,
               height:media[i].height,
               public_id:media[i].public_id,
               url:media[i].secure_url,
               type:media[i].resource_type,
               index:i
             }
           })
          
      } 
   } catch (error) {
      console.error(error.message);
   }
   
}

export {consume_tasks_queue}