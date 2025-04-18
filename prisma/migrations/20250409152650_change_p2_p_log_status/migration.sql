/*
  Warnings:

  - You are about to drop the column `BuyerId` on the `p2p_buy_logs` table. All the data in the column will be lost.
  - You are about to drop the column `SellerId` on the `p2p_sell_logs` table. All the data in the column will be lost.
  - Added the required column `CustomerId` to the `p2p_buy_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerId` to the `p2p_sell_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `p2p_buy_logs` DROP FOREIGN KEY `p2p_buy_logs_BuyerId_fkey`;

-- DropForeignKey
ALTER TABLE `p2p_sell_logs` DROP FOREIGN KEY `p2p_sell_logs_SellerId_fkey`;

-- DropIndex
DROP INDEX `p2p_buy_logs_BuyerId_fkey` ON `p2p_buy_logs`;

-- DropIndex
DROP INDEX `p2p_sell_logs_SellerId_fkey` ON `p2p_sell_logs`;

-- AlterTable
ALTER TABLE `p2p_buy_logs` DROP COLUMN `BuyerId`,
    ADD COLUMN `CustomerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `p2p_sell_logs` DROP COLUMN `SellerId`,
    ADD COLUMN `CustomerId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `p2p_buy_logs` ADD CONSTRAINT `p2p_buy_logs_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sell_logs` ADD CONSTRAINT `p2p_sell_logs_CustomerId_fkey` FOREIGN KEY (`CustomerId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;
