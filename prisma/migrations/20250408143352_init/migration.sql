-- CreateTable
CREATE TABLE `users` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserName` VARCHAR(48) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_Email_key`(`Email`),
    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cryptos` (
    `CryptoId` INTEGER NOT NULL AUTO_INCREMENT,
    `FullName` VARCHAR(24) NOT NULL,
    `ShortName` VARCHAR(8) NOT NULL,
    `CurrentPrice` FLOAT NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `cryptos_FullName_key`(`FullName`),
    UNIQUE INDEX `cryptos_ShortName_key`(`ShortName`),
    PRIMARY KEY (`CryptoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_types` (
    `PaymentTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(32) NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`PaymentTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `p2p_payments` (
    `P2PPaymentId` INTEGER NOT NULL AUTO_INCREMENT,
    `PaymentFirstName` VARCHAR(32) NOT NULL,
    `PaymentLastName` VARCHAR(32) NOT NULL,
    `PaymentInfo` VARCHAR(24) NOT NULL,
    `UserId` INTEGER NOT NULL,
    `PaymentTypeId` INTEGER NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`P2PPaymentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `balances` (
    `BalanceId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `CryptoId` INTEGER NOT NULL,
    `QTY` FLOAT NOT NULL,
    `WalletAddress` VARCHAR(191) NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`BalanceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `protocols` (
    `ProtocolId` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(24) NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`ProtocolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `balance_logs` (
    `BalanceLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `BalanceId` INTEGER NOT NULL,
    `ChangeQTY` FLOAT NOT NULL,
    `RemainQTY` FLOAT NOT NULL,
    `ToWalletAddress` VARCHAR(191) NULL,
    `ProtocolId` INTEGER NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`BalanceLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `p2p_buys` (
    `P2PBuyId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `CryptoId` INTEGER NOT NULL,
    `PriceRate` FLOAT NOT NULL,
    `MinQTY` FLOAT NOT NULL,
    `MaxQTY` FLOAT NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`P2PBuyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `p2p_sells` (
    `P2PSellId` INTEGER NOT NULL AUTO_INCREMENT,
    `UserId` INTEGER NOT NULL,
    `CryptoId` INTEGER NOT NULL,
    `PriceRate` FLOAT NOT NULL,
    `MinQTY` FLOAT NOT NULL,
    `MaxQTY` FLOAT NOT NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`P2PSellId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `p2p_buy_logs` (
    `P2PBuyLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `P2PBuyId` INTEGER NOT NULL,
    `SellerId` INTEGER NOT NULL,
    `QTY` FLOAT NOT NULL,
    `IsSucces` BOOLEAN NOT NULL DEFAULT false,
    `FeedbackScore` INTEGER NULL,
    `OnSucces` DATETIME(3) NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`P2PBuyLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `p2p_sell_logs` (
    `P2PBuyLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `P2PSellId` INTEGER NOT NULL,
    `BuyerId` INTEGER NOT NULL,
    `QTY` FLOAT NOT NULL,
    `IsSucces` BOOLEAN NOT NULL DEFAULT false,
    `FeedbackScore` INTEGER NULL,
    `OnSucces` DATETIME(3) NULL,
    `OnCreate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`P2PBuyLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `p2p_payments` ADD CONSTRAINT `p2p_payments_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_payments` ADD CONSTRAINT `p2p_payments_PaymentTypeId_fkey` FOREIGN KEY (`PaymentTypeId`) REFERENCES `payment_types`(`PaymentTypeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balances` ADD CONSTRAINT `balances_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balances` ADD CONSTRAINT `balances_CryptoId_fkey` FOREIGN KEY (`CryptoId`) REFERENCES `cryptos`(`CryptoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_logs` ADD CONSTRAINT `balance_logs_BalanceId_fkey` FOREIGN KEY (`BalanceId`) REFERENCES `balances`(`BalanceId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `balance_logs` ADD CONSTRAINT `balance_logs_ProtocolId_fkey` FOREIGN KEY (`ProtocolId`) REFERENCES `protocols`(`ProtocolId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_buys` ADD CONSTRAINT `p2p_buys_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_buys` ADD CONSTRAINT `p2p_buys_CryptoId_fkey` FOREIGN KEY (`CryptoId`) REFERENCES `cryptos`(`CryptoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sells` ADD CONSTRAINT `p2p_sells_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sells` ADD CONSTRAINT `p2p_sells_CryptoId_fkey` FOREIGN KEY (`CryptoId`) REFERENCES `cryptos`(`CryptoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_buy_logs` ADD CONSTRAINT `p2p_buy_logs_P2PBuyId_fkey` FOREIGN KEY (`P2PBuyId`) REFERENCES `p2p_buys`(`P2PBuyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_buy_logs` ADD CONSTRAINT `p2p_buy_logs_SellerId_fkey` FOREIGN KEY (`SellerId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sell_logs` ADD CONSTRAINT `p2p_sell_logs_P2PSellId_fkey` FOREIGN KEY (`P2PSellId`) REFERENCES `p2p_sells`(`P2PSellId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `p2p_sell_logs` ADD CONSTRAINT `p2p_sell_logs_BuyerId_fkey` FOREIGN KEY (`BuyerId`) REFERENCES `users`(`UserId`) ON DELETE RESTRICT ON UPDATE CASCADE;
