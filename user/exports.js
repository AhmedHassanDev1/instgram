import { config } from "dotenv";
import {PrismaClient} from "@prisma/client"
import {loadPackageDefinition,credentials} from "@grpc/grpc-js"
import {loadSync} from "@grpc/proto-loader"
export let DB=new PrismaClient()

export let {
           PORT,
           JWT_SECRET,
           Email_GRPC_URL,
           PROTOBUF_PATH,
           USER_GRPC_PORT,
           RABBITMQ_URL,
          }=config({path:"./.env"}).parsed

const packageDefinition = loadSync(PROTOBUF_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }); 


let code_proto=loadPackageDefinition(packageDefinition).verification_code

export let gRPC_client=new code_proto.verification_code(`127.0.0.1:${Email_GRPC_URL}`,credentials.createInsecure())




