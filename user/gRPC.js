import {loadPackageDefinition,Server,ServerCredentials} from "@grpc/grpc-js"
import {loadSync} from "@grpc/proto-loader"
import { USER_GRPC_PORT} from "./exports.js"
import {get_user_by_id,get_users_images} from "./services/grpcServices.js"
let packageDefinition =loadSync('./user.proto', {
    keepCase: true,          
    longs: String,            
    enums: String,          
    defaults: true,          
    oneofs: true             
  })

let userProto=loadPackageDefinition(packageDefinition).user

async function gRPC_Server(){
   let server=new Server()
   server.addService(userProto.get_user.service,
      {GetUserById:get_user_by_id,
       GetUsersImage:get_users_images})
       
   server.bindAsync(`127.0.0.1:${USER_GRPC_PORT}`,ServerCredentials.createInsecure(),()=>{
      console.log(`✅ gRPC server run on 127.0.0.1:${USER_GRPC_PORT}`);
      
   })
}  


export default gRPC_Server