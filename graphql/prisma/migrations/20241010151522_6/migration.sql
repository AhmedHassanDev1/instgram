-- DropForeignKey
ALTER TABLE "Bookmarks" DROP CONSTRAINT "Bookmarks_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentLikes" DROP CONSTRAINT "CommentLikes_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_Post_id_fkey";

-- DropForeignKey
ALTER TABLE "Replay" DROP CONSTRAINT "Replay_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "ReplayLikes" DROP CONSTRAINT "ReplayLikes_replay_id_fkey";

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_Post_id_fkey" FOREIGN KEY ("Post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Replay" ADD CONSTRAINT "Replay_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentLikes" ADD CONSTRAINT "CommentLikes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplayLikes" ADD CONSTRAINT "ReplayLikes_replay_id_fkey" FOREIGN KEY ("replay_id") REFERENCES "Replay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
