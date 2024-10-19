import express from "express"
import { PORT,RABBITMQ_URL } from "./exports.js" 
import cors from "cors"
import Auth from "./routers/auth.js"
import cookie_parser from "cookie-parser"
import gRPC_Server from "./gRPC.js"
import token_validator from "./middlewares/token_validation.js"
import User from "./routers/user.js"
import amqp from "amqplib"
import {profile_image_consume} from "./consume.js"

let app= express()
let rabbitChannel;


app.use(cors({origin:['http://localhost:3000'],credentials:true}))

app.use(express.json())
app.use(cookie_parser())
app.use('/user/auth',Auth)
app.use(token_validator)
app.use('/user',User)

// not found rout
app.all("*",(req,res)=>{
   res.status(404).json({message:"this rout not found"})
})

app.use((err,req,res,next)=>{
   res.status(err?.status||500).json({message:err?.message})
})


app.listen(PORT,async()=>{
   
   try {
      const connection = await amqp.connect('amqp://localhost');
      rabbitChannel = await connection.createChannel();
      console.log('✅ Connected to RabbitMQ');
      
    } catch (error) {
      console.error('❌ Error connecting to RabbitMQ:', error);
    }
    await gRPC_Server()
    console.log(`✅ server run on ${PORT} name:user`)
    await rabbitChannel.assertQueue('profile-image')
    await rabbitChannel.consume('profile-image',profile_image_consume,{noAck:true})
})




