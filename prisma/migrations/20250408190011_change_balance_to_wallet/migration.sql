/*
  Warnings:

  - You are about to drop the column `BalanceId` on the `balance_logs` table. All the data in the column will be lost.
  - You are about to drop the `balances` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `WalletId` to the `balance_logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `balance_logs` DROP FOREIGN KEY `balance_logs_BalanceId_fkey`;

-- DropForeignKey
ALTER TABLE `balances` DROP FOREIGN KEY `balances_CryptoId_fkey`;

-- DropForeignKey
ALTER TABLE `balances` DROP FOREIGN KEY `balances_UserId_fkey`;

-- DropIndex
DROP INDEX `balance_logs_BalanceId_fkey` ON `balance_logs`;

-- AlterTable
ALTER TABLE `balance_logs` DROP COLUMN `BalanceId`,
    ADD COLUMN `WalletId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `balances`;

-- CreateTable
CREATE TABLE `wallets` (
    `WalletId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `CryptoId` INTEGER NOT NULL,
    `QTY` FLOAT NOT NULL,
    `WalletAddress` VARCHAR(191) NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `wallets_WalletAddress_key`(`WalletAddress`),
    PRIMARY KEY (`WalletId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wallets` ADD CONSTRAINT `wallets_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallets` ADD CONSTRAINT `wallets_CryptoId_fkey` FOREIGN KEY (`CryptoId`) REFERENCES `cryptos`(`CryptoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_logs` ADD CONSTRAINT `balance_logs_WalletId_fkey` FOREIGN KEY (`WalletId`) REFERENCES `wallets`(`WalletId`) ON DELETE RESTRICT ON UPDATE CASCADE;
