/*
  Warnings:

  - Made the column `ToWalletAddress` on table `wallet_logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `wallet_logs` MODIFY `ToWalletAddress` VARCHAR(191) NOT NULL;
