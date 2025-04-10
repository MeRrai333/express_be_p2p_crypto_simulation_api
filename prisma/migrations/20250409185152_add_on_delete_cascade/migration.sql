-- DropForeignKey
ALTER TABLE `p2p_buys` DROP FOREIGN KEY `p2p_buys_CryptoId_fkey`;

-- DropForeignKey
ALTER TABLE `p2p_buys` DROP FOREIGN KEY `p2p_buys_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `p2p_payments` DROP FOREIGN KEY `p2p_payments_UserId_fkey`;

-- DropForeignKey
ALTER TABLE `p2p_sells` DROP FOREIGN KEY `p2p_sells_CryptoId_fkey`;

-- DropForeignKey
ALTER TABLE `p2p_sells` DROP FOREIGN KEY `p2p_sells_UserId_fkey`;

-- DropIndex
DROP INDEX `p2p_buys_CryptoId_fkey` ON `p2p_buys`;

-- DropIndex
DROP INDEX `p2p_buys_UserId_fkey` ON `p2p_buys`;

-- DropIndex
DROP INDEX `p2p_payments_UserId_fkey` ON `p2p_payments`;

-- DropIndex
DROP INDEX `p2p_sells_CryptoId_fkey` ON `p2p_sells`;

-- DropIndex
DROP INDEX `p2p_sells_UserId_fkey` ON `p2p_sells`;

-- AddForeignKey
ALTER TABLE `p2p_payments` ADD CONSTRAINT `p2p_payments_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_buys` ADD CONSTRAINT `p2p_buys_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_buys` ADD CONSTRAINT `p2p_buys_CryptoId_fkey` FOREIGN KEY (`CryptoId`) REFERENCES `cryptos`(`CryptoId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sells` ADD CONSTRAINT `p2p_sells_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sells` ADD CONSTRAINT `p2p_sells_CryptoId_fkey` FOREIGN KEY (`CryptoId`) REFERENCES `cryptos`(`CryptoId`) ON DELETE CASCADE ON UPDATE CASCADE;
