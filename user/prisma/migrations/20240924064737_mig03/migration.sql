/*
  Warnings:

  - You are about to drop the column `passward` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passward",
ADD COLUMN     "password" TEXT;
