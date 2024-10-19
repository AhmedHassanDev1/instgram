/*
  Warnings:

  - You are about to drop the column `replaies_count` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "replaies_count",
ADD COLUMN     "replies_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Replay" ADD COLUMN     "replies_count" INTEGER NOT NULL DEFAULT 0;
