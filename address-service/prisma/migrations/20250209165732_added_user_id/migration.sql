/*
  Warnings:

  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `userId` VARCHAR(191) NOT NULL;
