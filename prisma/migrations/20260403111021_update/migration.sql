/*
  Warnings:

  - You are about to drop the column `githubUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "githubUrl",
DROP COLUMN "isVerified";
