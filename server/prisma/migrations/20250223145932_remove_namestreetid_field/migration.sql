/*
  Warnings:

  - You are about to drop the column `nameStreetId` on the `School` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[schoolCode]` on the table `School` will be added. If there are existing duplicate values, this will fail.
  - The required column `schoolCode` was added to the `School` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `School_nameStreetId_key` ON `School`;

-- AlterTable
ALTER TABLE `School` DROP COLUMN `nameStreetId`,
    ADD COLUMN `schoolCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `School_schoolCode_key` ON `School`(`schoolCode`);
