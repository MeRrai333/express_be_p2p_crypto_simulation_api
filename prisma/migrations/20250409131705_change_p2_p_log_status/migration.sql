/*
  Warnings:

  - You are about to drop the column `IsSucces` on the `p2p_buy_logs` table. All the data in the column will be lost.
  - You are about to drop the column `OnSucces` on the `p2p_buy_logs` table. All the data in the column will be lost.
  - You are about to drop the column `IsSucces` on the `p2p_sell_logs` table. All the data in the column will be lost.
  - You are about to drop the column `OnSucces` on the `p2p_sell_logs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `p2p_buy_logs` DROP COLUMN `IsSucces`,
    DROP COLUMN `OnSucces`,
    ADD COLUMN `OnFinish` DATETIME(3) NULL,
    ADD COLUMN `Status` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `p2p_sell_logs` DROP COLUMN `IsSucces`,
    DROP COLUMN `OnSucces`,
    ADD COLUMN `OnFinish` DATETIME(3) NULL,
    ADD COLUMN `Status` INTEGER NOT NULL DEFAULT 0;
