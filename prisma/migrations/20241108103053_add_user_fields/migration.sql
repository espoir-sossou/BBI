/*
  Warnings:

  - You are about to drop the column `photos` on the `Annonce` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Annonce` DROP COLUMN `photos`;

-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `annonceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_annonceId_fkey` FOREIGN KEY (`annonceId`) REFERENCES `Annonce`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
