/*
  Warnings:

  - You are about to drop the column `Name` on the `protocols` table. All the data in the column will be lost.
  - Added the required column `FullName` to the `protocols` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ShortName` to the `protocols` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cryptos` MODIFY `FullName` VARCHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE `protocols` DROP COLUMN `Name`,
    ADD COLUMN `FullName` VARCHAR(32) NOT NULL,
    ADD COLUMN `ShortName` VARCHAR(8) NOT NULL;
