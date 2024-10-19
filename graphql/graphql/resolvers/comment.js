import { DB } from "../../exports.js"
import { GraphQLError } from "graphql"
import {user} from "./user.js"

export let commentQueries={
  async get_post_comments(_,{post_id,commentInput:{limit=20,offset=0}},{user:{id:user_id}}){
     let comments=await DB.comment.findMany({where:{post_id},take:limit,skip:offset,orderBy:{createdAt:'desc'}})
     return comments
  }   
}
 
export let Comment={
       user, 
 async isLike({id:comment_id},_,{user:{id:user_id}}){
    let like =await DB.commentLikes.findFirst({where:{comment_id,user_id}})
    return Boolean(like)
 },
 
}

export let commentMutations={
   async add_comment(_,{comment:{post_id,text}},{user:{id:user_id}}){
     try {
      await DB.post.findUniqueOrThrow({where:{id:post_id}})
      let comment=await DB.comment.create({data:{user_id,post_id,title:text}})
      await DB.post.update({where:{id:post_id},data:{comments_count:{increment:1}}})
      return comment
     } catch (error) {
       throw new GraphQLError('the Post non-existent')
     }
   },

  async delete_comment(_,{comment_id},{user:{id:user_id}}){

       let comment=await DB.comment.findUnique({where:{id:comment_id}})
       
       if (comment) {
          if(comment.user_id===user_id){
             await DB.comment.delete({where:{id:comment_id}})
             await DB.post.update({where:{id:comment.post_id},data:{comments_count:{decrement:1}}})
             return comment_id
          }
       }else {
          throw new GraphQLError('the Comment non-existent')
       }
     
  },

  async add_like_comment(_,{comment_id},{user:{id:user_id}}){
    let like=await DB.commentLikes.findFirst({where:{user_id,comment_id}})
    try {
      if (!like) {
         await DB.comment.findUniqueOrThrow({where:{id:comment_id}})
         await DB.commentLikes.create({data:{comment_id,user_id}})
         await DB.comment.update({where:{id:comment_id},data:{likes_count:{increment:1}}})
         return "add like on comment"
       }   
    } catch (error) {
      throw new GraphQLError('the Commnet non-existent')
    }
 },

  async remove_like_comment(_,{comment_id},{user:{id:user_id}}){
      let like=await DB.commentLikes.findFirst({where:{user_id,comment_id}})
     
      if (like) {
         await DB.commentLikes.deleteMany({where:{comment_id,user_id}})
         await DB.comment.update({where:{id:comment_id},data:{likes_count:{decrement:1}}})
         return "remove lik on comment"
      }  
  },

}
