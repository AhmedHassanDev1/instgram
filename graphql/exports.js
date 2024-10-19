import {PrismaClient} from "@prisma/client"
import { config } from "dotenv"
export let DB=new PrismaClient() 

export let {PORT,JWT_SECRET} = config({path:'./.env'}).parsed
