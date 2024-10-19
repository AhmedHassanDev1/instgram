-- AlterEnum
ALTER TYPE "postType" ADD VALUE 'hybrid';

-- CreateTable
CREATE TABLE "Likes" (
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Likes_post_id_user_id_key" ON "Likes"("post_id", "user_id");

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
