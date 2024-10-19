import { DB } from "../../exports.js"
import { GraphQLError } from "graphql"

export let bookmarksQueries={
 async get_user_bookmarks(_,{bookmarksInput:{limit=20,offset=0}},{id:user_id}){
     let bookmarks=await DB.bookmarks.findMany({where:{user_id},take:limit,skip:offset,select:{post:true}})
     return bookmarks.map(el=>el.post)
    }
}


export let bookmarksMutations={
  async add_bookmarks(_,{post_id},{user:{id:user_id}}){
    let bookmark=await DB.bookmarks.findFirst({where:{post_id,user_id}})
    try {
      if (!bookmark) {
         await DB.post.findUniqueOrThrow({where:{id:post_id}})
         await DB.bookmarks.create({data:{user_id,post_id}})
         return 'bookmark succesfull'
      }else{
         return
      }
    } catch (error) {
      throw new GraphQLError('post not found')
    }  
 },
 async remove_bookmarks(_,{post_id},{user:{id:user_id}}){
    let bookmark=await DB.bookmarks.findFirst({where:{post_id,user_id}})
    if (bookmark) {
       await DB.bookmarks.deleteMany({where:{user_id,post_id}})
       return 'remove bookmark succesfull'
    }else{
        throw new GraphQLError('cant remove bookmark this post !!')
    }
 },
}