import {DB} from "../../exports.js"
import { GraphQLError } from "graphql"
import {user} from "./user.js"
export let PostQueries={
    
    async get_post_by_id(_,{post_id}){
        let Post=await DB.post.findUnique({where:{id:post_id}})
        return Post
    },   

    async get_user_posts(_,{user_id,postInput:{limit=20,offset=0}}){
        let Posts=await DB.post.findMany({where:{user_id},orderBy:{createdAt:'desc'},take:limit,skip:offset})
        return Posts 
        
    }  
}


export let PostType={
 user,
 async isLike({id},_,{user:{id:user_id}}){
       let like=await DB.likes.findFirst({where:{user_id,post_id:id}})
       return Boolean(like) 
    },

 async isBookmark({id},_,{user:{id:user_id}}){
    let bookmarks=await DB.bookmarks.findFirst({where:{user_id,post_id:id}})
       
    return Boolean(bookmarks) 
    },
 
 async media({id:Post_id}){
        let mediaList=await DB.media.findMany({where:{Post_id}})
        return mediaList
    } ,
   
 
}

export let PostMutations={

  async add_like_post(_,{post_id},{user:{id:user_id}}){
    console.log(post_id);
    let like=await DB.likes.findFirst({where:{post_id,user_id}})
    try {
        if (!like) {
            let post=await DB.post.findUniqueOrThrow({where:{id:post_id}})  
            if (!post) throw new GraphQLError('Identify a problem not found post!!')
            await DB.likes.create({data:{post_id,user_id}})
            await DB.post.update({where:{id:post_id},data:{likes_count:{increment:1}}}) 
            return 'add like succesfull'
         }else{
            return;
         }
    } catch (error) {
        throw new GraphQLError(error.message)
    }
  },
  
  async remove_like_post(_,{post_id},{user:{id:user_id}}){
    let like=await DB.likes.findFirst({where:{post_id,user_id}})
     
    try {
        if (like) {
            
           await DB.likes.deleteMany({where:{user_id,post_id}})
           await DB.post.update({where:{id:post_id},data:{likes_count:{decrement:1}}}) 
           return 'remove like succesfull'
        }else{
            throw new GraphQLError('cant remove like on this post !!')
        }
    
    } catch (error) {
        
    }

 },

 async delete_post(_,{post_id}){
   if (post_id) {
      try {
        let post=await DB.post.findFirstOrThrow({where:{id:post_id}}) 
        await DB.post.delete({where:{id:post_id}})
        return 'delete post'
      } catch (error) {
        throw new GraphQLError('the Post non-existent')
      }
        
   }else{
     throw new GraphQLError('not found id')
   }
 }
 
}