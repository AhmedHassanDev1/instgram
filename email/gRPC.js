import {loadPackageDefinition,Server,ServerCredentials} from "@grpc/grpc-js"
import {loadSync} from "@grpc/proto-loader"
import { GRPC_PORT,PROTOBUF_PATH } from "./exports.js"
import send_email from "./utils/email.js"  
const packageDefinition =loadSync(PROTOBUF_PATH,{
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

const verification_code_proto=loadPackageDefinition(packageDefinition).verification_code


async function get_verification_code(call, callback) {
    let {floor,random}=Math
    let codeLength=6 
    let initCode=Array(codeLength).fill(0)
    let code=initCode.map(_=>floor(random()*10)).join('')
    const reply = { code };
  
    send_email(call.request.email,code)
    callback(null, reply);
}


function gRPC_server() {
   let server=new Server()
   let service=verification_code_proto.verification_code.service
   server.addService(service,{get_verification_code})
   server.bindAsync(`127.0.0.1:${GRPC_PORT}`,ServerCredentials.createInsecure(),()=>{
      console.log('gRPC Server run on port',GRPC_PORT);
   }) 
}

export default gRPC_server





 
