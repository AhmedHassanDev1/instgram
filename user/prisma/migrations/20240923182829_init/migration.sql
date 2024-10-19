-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "account_privacy" AS ENUM ('Private', 'public');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "email" TEXT NOT NULL,
    "passward" TEXT,
    "gender" "gender" NOT NULL DEFAULT 'male',
    "following_count" INTEGER NOT NULL DEFAULT 0,
    "followers_count" INTEGER NOT NULL DEFAULT 0,
    "posts_count" INTEGER NOT NULL DEFAULT 0,
    "account_privacy" "account_privacy" NOT NULL DEFAULT 'public',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileImg" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "profileImg_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profileImg_user_id_key" ON "profileImg"("user_id");

-- AddForeignKey
ALTER TABLE "profileImg" ADD CONSTRAINT "profileImg_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
