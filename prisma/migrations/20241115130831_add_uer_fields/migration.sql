/*
  Warnings:

  - You are about to drop the column `created_by` on the `Annonce` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Annonce` DROP FOREIGN KEY `Annonce_created_by_fkey`;

-- AlterTable
ALTER TABLE `Annonce` DROP COLUMN `created_by`;
