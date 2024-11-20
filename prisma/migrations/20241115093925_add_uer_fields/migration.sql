-- DropIndex
DROP INDEX `Facture_annonceId_fkey` ON `Facture`;

-- CreateTable
CREATE TABLE `Photo` (
    `photo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `annonce_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`photo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_annonce_id_fkey` FOREIGN KEY (`annonce_id`) REFERENCES `Annonce`(`annonce_id`) ON DELETE CASCADE ON UPDATE CASCADE;
