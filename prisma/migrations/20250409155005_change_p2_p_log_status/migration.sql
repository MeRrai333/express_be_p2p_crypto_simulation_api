/*
  Warnings:

  - Added the required column `SumPriec` to the `p2p_buy_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SumPriec` to the `p2p_sell_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `p2p_buy_logs` ADD COLUMN `SumPriec` FLOAT NOT NULL;

-- AlterTable
ALTER TABLE `p2p_sell_logs` ADD COLUMN `SumPriec` FLOAT NOT NULL;
