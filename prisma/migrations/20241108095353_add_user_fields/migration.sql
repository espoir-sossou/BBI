/*
  Warnings:

  - You are about to drop the column `agentId` on the `Annonce` table. All the data in the column will be lost.
  - You are about to drop the column `dateValidation` on the `Annonce` table. All the data in the column will be lost.
  - Added the required column `created_by` to the `Annonce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video` to the `Annonce` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Annonce` DROP FOREIGN KEY `Annonce_agentId_fkey`;

-- AlterTable
ALTER TABLE `Annonce` DROP COLUMN `agentId`,
    DROP COLUMN `dateValidation`,
    ADD COLUMN `assigned_user_id` INTEGER NULL,
    ADD COLUMN `created_by` INTEGER NOT NULL,
    ADD COLUMN `video` VARCHAR(191) NOT NULL,
    MODIFY `titre` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL,
    MODIFY `typePropriete` VARCHAR(191) NULL,
    MODIFY `montant` DOUBLE NULL,
    MODIFY `superficie` DOUBLE NULL,
    MODIFY `nbChambres` INTEGER NULL,
    MODIFY `nbSalleDeDouche` INTEGER NULL,
    MODIFY `veranda` VARCHAR(191) NULL,
    MODIFY `terrasse` VARCHAR(191) NULL,
    MODIFY `cuisine` VARCHAR(191) NULL,
    MODIFY `dependance` VARCHAR(191) NULL,
    MODIFY `piscine` VARCHAR(191) NULL,
    MODIFY `garage` VARCHAR(191) NULL,
    MODIFY `localite` VARCHAR(191) NULL,
    MODIFY `titreFoncier` VARCHAR(191) NULL,
    MODIFY `localisation` VARCHAR(191) NULL,
    MODIFY `details` VARCHAR(191) NULL,
    MODIFY `typeTransaction` VARCHAR(191) NULL,
    MODIFY `visite360` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Annonce` ADD CONSTRAINT `Annonce_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Annonce` ADD CONSTRAINT `Annonce_assigned_user_id_fkey` FOREIGN KEY (`assigned_user_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
