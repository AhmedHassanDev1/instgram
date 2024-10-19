import { GraphQLError } from "graphql"
import {DB} from "../../exports.js"
import {user} from './user.js'

export let replayQueries={
   async get_comment_replies(_,{comment_id,commentInput:{offset,limit}}){
    let replies=await DB.replay.findMany({where:{comment_id},take:limit,skip:offset,orderBy:{createdAt:'desc'}})
    
    return replies
   }

} 


export let replayMutations={
   async replay_comment(_,{comment_id,text},{user:{id:user_id}}){
     try {
        let comment = await DB.comment.findUniqueOrThrow({where:{id:comment_id}})
       
            let replay=await DB.replay.create({data:{comment_id,title:text,user_id}})
            await DB.comment.update({where:{id:comment_id},data:{replies_count:{increment:1}}}) 
            return replay 
        
     } catch (error) {
        throw new GraphQLError('The Comment non-existent')
     }

   },

   async add_like_replay(_,{replay_id},{user:{id:user_id}}){
    
    try {
       let replay = await DB.replay.findUniqueOrThrow({where:{id:replay_id}})
        
       await DB.replayLikes.create({data:{replay_id,user_id}})
       await DB.replay.update({where:{id:replay_id},data:{likes_count:{increment:1}}}) 
      return 'add like on replay is done'
       
    } catch (error) {
       throw new GraphQLError('The Comment non-existent')
       
    }

   },
   
   async remove_like_replay(_,{replay_id},{user:{id:user_id}}){
      try {
         let replay = await DB.replay.findUniqueOrThrow({where:{id:replay_id}})
         await DB.replayLikes.deleteMany({where:{replay_id,user_id}})
         await DB.replay.update({where:{id:replay_id},data:{likes_count:Math.max(0,replay.likes_count-1)}}) 
         return 'remove like on replay is done'
     
      } catch (error) {
         throw new GraphQLError('The Comment non-existent')
         
      }
    
   },
}

export let Replay={
  user,
  async isLike({id:replay_id},_,{user:{id:user_id}}){
    let like =await DB.replayLikes.findFirst({where:{replay_id,user_id}})
    return Boolean(like)
 },
}

