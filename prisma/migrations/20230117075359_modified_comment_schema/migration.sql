/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `avatar` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteCount` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "likedBy" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parentId" TEXT,
ADD COLUMN     "voteCount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Like";
