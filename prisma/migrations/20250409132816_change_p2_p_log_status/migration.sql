/*
  Warnings:

  - The primary key for the `p2p_sell_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `P2PBuyLogId` on the `p2p_sell_logs` table. All the data in the column will be lost.
  - Added the required column `P2PSellLogId` to the `p2p_sell_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `p2p_buy_logs` DROP FOREIGN KEY `p2p_buy_logs_P2PBuyId_fkey`;

-- DropForeignKey
ALTER TABLE `p2p_sell_logs` DROP FOREIGN KEY `p2p_sell_logs_P2PSellId_fkey`;

-- DropIndex
DROP INDEX `p2p_buy_logs_P2PBuyId_fkey` ON `p2p_buy_logs`;

-- DropIndex
DROP INDEX `p2p_sell_logs_P2PSellId_fkey` ON `p2p_sell_logs`;

-- AlterTable
ALTER TABLE `p2p_sell_logs` DROP PRIMARY KEY,
    DROP COLUMN `P2PBuyLogId`,
    ADD COLUMN `P2PSellLogId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`P2PSellLogId`);

-- AddForeignKey
ALTER TABLE `p2p_buy_logs` ADD CONSTRAINT `p2p_buy_logs_P2PBuyId_fkey` FOREIGN KEY (`P2PBuyId`) REFERENCES `p2p_buys`(`P2PBuyId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sell_logs` ADD CONSTRAINT `p2p_sell_logs_P2PSellId_fkey` FOREIGN KEY (`P2PSellId`) REFERENCES `p2p_sells`(`P2PSellId`) ON DELETE CASCADE ON UPDATE CASCADE;
