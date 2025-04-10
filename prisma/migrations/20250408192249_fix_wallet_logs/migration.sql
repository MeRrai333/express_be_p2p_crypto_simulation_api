/*
  Warnings:

  - You are about to drop the `balance_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `balance_logs` DROP FOREIGN KEY `balance_logs_ProtocolId_fkey`;

-- DropForeignKey
ALTER TABLE `balance_logs` DROP FOREIGN KEY `balance_logs_WalletId_fkey`;

-- DropTable
DROP TABLE `balance_logs`;

-- CreateTable
CREATE TABLE `wallet_logs` (
    `WalletLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `WalletId` INTEGER NOT NULL,
    `ChangeQTY` FLOAT NOT NULL,
    `RemainQTY` FLOAT NOT NULL,
    `ToWalletAddress` VARCHAR(191) NULL,
    `ProtocolId` INTEGER NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`WalletLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wallet_logs` ADD CONSTRAINT `wallet_logs_WalletId_fkey` FOREIGN KEY (`WalletId`) REFERENCES `wallets`(`WalletId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wallet_logs` ADD CONSTRAINT `wallet_logs_ProtocolId_fkey` FOREIGN KEY (`ProtocolId`) REFERENCES `protocols`(`ProtocolId`) ON DELETE RESTRICT ON UPDATE CASCADE;
