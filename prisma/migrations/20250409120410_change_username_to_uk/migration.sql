/*
  Warnings:

  - A unique constraint covering the columns `[UserName]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `p2p_payments` DROP FOREIGN KEY `p2p_payments_PaymentTypeId_fkey`;

-- DropIndex
DROP INDEX `p2p_payments_PaymentTypeId_fkey` ON `p2p_payments`;

-- CreateIndex
CREATE UNIQUE INDEX `users_UserName_key` ON `users`(`UserName`);

-- AddForeignKey
ALTER TABLE `p2p_payments` ADD CONSTRAINT `p2p_payments_PaymentTypeId_fkey` FOREIGN KEY (`PaymentTypeId`) REFERENCES `payment_types`(`PaymentTypeId`) ON DELETE CASCADE ON UPDATE CASCADE;
