/*
  Warnings:

  - The primary key for the `Annonce` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assigned_user_id` on the `Annonce` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Annonce` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `annonce_id` to the `Annonce` table without a default value. This is not possible if the table is not empty.
  - Made the column `titre` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typePropriete` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `montant` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `superficie` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nbChambres` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nbSalleDeDouche` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `veranda` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `terrasse` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cuisine` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dependance` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `piscine` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `garage` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localite` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `titreFoncier` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `localisation` on table `Annonce` required. This step will fail if there are existing NULL values in that column.
  - Made the column `typeTransaction` on table `Annonce` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Annonce` DROP FOREIGN KEY `Annonce_assigned_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Annonce` DROP FOREIGN KEY `Annonce_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `Facture` DROP FOREIGN KEY `Facture_annonceId_fkey`;

-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_annonceId_fkey`;

-- AlterTable
ALTER TABLE `Annonce` DROP PRIMARY KEY,
    DROP COLUMN `assigned_user_id`,
    DROP COLUMN `id`,
    ADD COLUMN `annonce_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `assigned_admin_id` INTEGER NULL,
    MODIFY `titre` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL,
    MODIFY `typePropriete` VARCHAR(191) NOT NULL,
    MODIFY `montant` DOUBLE NOT NULL,
    MODIFY `superficie` DOUBLE NOT NULL,
    MODIFY `nbChambres` INTEGER NOT NULL,
    MODIFY `nbSalleDeDouche` INTEGER NOT NULL,
    MODIFY `veranda` BOOLEAN NOT NULL,
    MODIFY `terrasse` BOOLEAN NOT NULL,
    MODIFY `cuisine` BOOLEAN NOT NULL,
    MODIFY `dependance` BOOLEAN NOT NULL,
    MODIFY `piscine` BOOLEAN NOT NULL,
    MODIFY `garage` BOOLEAN NOT NULL,
    MODIFY `localite` VARCHAR(191) NOT NULL,
    MODIFY `titreFoncier` BOOLEAN NOT NULL,
    MODIFY `localisation` VARCHAR(191) NOT NULL,
    MODIFY `typeTransaction` VARCHAR(191) NOT NULL,
    MODIFY `video` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`annonce_id`);

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `url`;

-- DropTable
DROP TABLE `Photo`;

-- AddForeignKey
ALTER TABLE `Annonce` ADD CONSTRAINT `Annonce_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Annonce` ADD CONSTRAINT `Annonce_assigned_admin_id_fkey` FOREIGN KEY (`assigned_admin_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
