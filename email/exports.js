import { config } from "dotenv";


export let {GRPC_PORT,PROTOBUF_PATH,FROM_EMAIL,PASSWORD_EMAIL}=config({path:"./.env"}).parsed