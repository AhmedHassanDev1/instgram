import userRPC from "../../Grpc.js"

export let user=async(parant)=>{
   let user=await new Promise((res,rej)=>{
       userRPC.GetUserById({id:parant.user_id},(err,response)=>{
            if (err) return rej(err)
            else return res(response) 
        })
   })
  
   return user
}

