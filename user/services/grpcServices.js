import {DB } from "../exports.js"
export let get_user_by_id=async(call,callback)=>{
    let id=call.request.id
    let user =await DB.user.findUnique({where:{id},select:{id:true,name:true, profileImg:true}})

    if(user) callback(null,{id:user.id,name:user.name,image:user.profileImg.url})
    else callback(null,{})
 }
 
export let get_users_images=async(call,callback)=>{
    let uniqueIds=[... new Set(call.request.ids)]
    let images=await DB.profileImg.findMany({where:{user_id:{in:uniqueIds}}}) 
    if (images) {
       
       callback(null,{resultes:images})
    } else{
       callback(null,{})
    }
   
 }
 