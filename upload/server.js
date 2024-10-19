import express from "express"
import { PORT, } from "./exports.js"
import User from "./router/user.js"
import Post from "./router/post.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import amqp from "amqplib"
import token_validator from "./middlewares/token_validation.js"
let app=express()
let rabbitChannel

async function connectRabbitMQ() { 
    try {
      const connection = await amqp.connect('amqp://localhost');
      rabbitChannel = await connection.createChannel();
      
      console.log('✅ Connected to RabbitMQ');
    } catch (error) {
      console.error('❌ Error connecting to RabbitMQ:', error);
    }
  }

app.use(cors({origin:['http://localhost:3000'],credentials:true}))
app.use(cookieParser())
app.use(express.json())
app.use(token_validator)
app.use('/uploads/user-img',User)
app.use('/uploads/post',Post)

app.listen(PORT,()=>{
    console.log('✅ server run on',PORT);
})


connectRabbitMQ()

export {rabbitChannel}
