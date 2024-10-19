import {ApolloServer} from "apollo-server-express";
// import {startStandaloneServer} from "@apollo/server/standalone"
import express from "express"
import { PORT } from "./exports.js";
import cors from "cors"
import fs from "node:fs/promises"
import resolvers from "./graphql/resolvers/index.js";
import context from "./graphql/context.js";
import amqp from "amqplib"
import { consume_tasks_queue } from "./consume.js";



async function connectRabbitMQ() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      let rabbitChannel = await connection.createChannel();
    
      console.log('✅ Connected to RabbitMQ');
      return rabbitChannel
    } catch (error) {
      console.error('❌ Error connecting to RabbitMQ:', error);
   }
}

(async()=>{
  let typeDefs =await fs.readFile('./graphql/schema.graphql',{encoding:'utf-8'})
  let server=new ApolloServer({resolvers,typeDefs,context}) 
  let app=express()
  await server.start()
  server.applyMiddleware({app})
  app.listen(PORT,()=>console.log('server run on',PORT))
  let rabbitChannel= await connectRabbitMQ()
  await rabbitChannel.assertQueue('post')
  rabbitChannel.consume('post',consume_tasks_queue,{noAck:true})

})()


