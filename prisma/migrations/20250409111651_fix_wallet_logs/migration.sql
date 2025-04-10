/*
  Warnings:

  - You are about to drop the column `ToWalletAddress` on the `wallet_logs` table. All the data in the column will be lost.
  - Added the required column `ToFromWalletAddress` to the `wallet_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `wallet_logs` DROP FOREIGN KEY `wallet_logs_WalletId_fkey`;

-- DropForeignKey
ALTER TABLE `wallets` DROP FOREIGN KEY `wallets_CryptoId_fkey`;

-- DropForeignKey
ALTER TABLE `wallets` DROP FOREIGN KEY `wallets_UserId_fkey`;

-- DropIndex
DROP INDEX `wallet_logs_WalletId_fkey` ON `wallet_logs`;

-- DropIndex
DROP INDEX `wallets_CryptoId_fkey` ON `wallets`;

-- DropIndex
DROP INDEX `wallets_UserId_fkey` ON `wallets`;

-- AlterTable
ALTER TABLE `wallet_logs` DROP COLUMN `ToWalletAddress`,
    ADD COLUMN `ToFromWalletAddress` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `wallets` ADD CONSTRAINT `wallets_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallets` ADD CONSTRAINT `wallets_CryptoId_fkey` FOREIGN KEY (`CryptoId`) REFERENCES `cryptos`(`CryptoId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallet_logs` ADD CONSTRAINT `wallet_logs_WalletId_fkey` FOREIGN KEY (`WalletId`) REFERENCES `wallets`(`WalletId`) ON DELETE CASCADE ON UPDATE CASCADE;
