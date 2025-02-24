/*
  Warnings:

  - You are about to drop the column `schoolId` on the `schools_teachers` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `schools_teachers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[schoolUuid,teacherUuid]` on the table `schools_teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `schoolUuid` to the `schools_teachers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherUuid` to the `schools_teachers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `schools_teachers` DROP FOREIGN KEY `schools_teachers_schoolId_fkey`;

-- DropForeignKey
ALTER TABLE `schools_teachers` DROP FOREIGN KEY `schools_teachers_teacherId_fkey`;

-- DropIndex
DROP INDEX `schools_teachers_schoolId_teacherId_key` ON `schools_teachers`;

-- DropIndex
DROP INDEX `schools_teachers_teacherId_fkey` ON `schools_teachers`;

-- AlterTable
ALTER TABLE `schools_teachers` DROP COLUMN `schoolId`,
    DROP COLUMN `teacherId`,
    ADD COLUMN `schoolUuid` VARCHAR(191) NOT NULL,
    ADD COLUMN `teacherUuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `schools_teachers_schoolUuid_teacherUuid_key` ON `schools_teachers`(`schoolUuid`, `teacherUuid`);

-- AddForeignKey
ALTER TABLE `schools_teachers` ADD CONSTRAINT `schools_teachers_schoolUuid_fkey` FOREIGN KEY (`schoolUuid`) REFERENCES `School`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `schools_teachers` ADD CONSTRAINT `schools_teachers_teacherUuid_fkey` FOREIGN KEY (`teacherUuid`) REFERENCES `Teacher`(`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;
