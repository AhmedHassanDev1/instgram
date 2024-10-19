import {PostQueries,PostMutations,PostType as Post} from "./post.js"
import { commentQueries,commentMutations,Comment } from "./comment.js"
import { bookmarksQueries ,bookmarksMutations} from "./bookmarks.js"
import { replayQueries ,replayMutations,Replay } from "./replay.js"
let resolvers={
  Query:{
    ...PostQueries,
    ...commentQueries,
    ...bookmarksQueries,
    ...replayQueries,
    
  },
  Mutation:{
    ...PostMutations, 
    ...commentMutations,
    ...bookmarksMutations,
    ...replayMutations,
  },
  Post,
  Comment,
  Replay,
} 

export default resolvers