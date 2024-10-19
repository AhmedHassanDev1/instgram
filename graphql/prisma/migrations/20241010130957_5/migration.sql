/*
  Warnings:

  - You are about to drop the column `replies_count` on the `Replay` table. All the data in the column will be lost.
  - You are about to drop the `Followers` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Replay" DROP COLUMN "replies_count";

-- DropTable
DROP TABLE "Followers";

-- CreateTable
CREATE TABLE "CommentLikes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "comment_id" TEXT NOT NULL,

    CONSTRAINT "CommentLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReplayLikes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "replay_id" TEXT NOT NULL,

    CONSTRAINT "ReplayLikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentLikes" ADD CONSTRAINT "CommentLikes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReplayLikes" ADD CONSTRAINT "ReplayLikes_replay_id_fkey" FOREIGN KEY ("replay_id") REFERENCES "Replay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
