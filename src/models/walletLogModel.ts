import { Prisma, PrismaClient, wallet_logs } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

const db = new PrismaClient()

export const createWalletLog = async (
    data: Omit<wallet_logs, 'WalletLogId'|'OnCreate'>,
    passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
    return await passDb.wallet_logs.create({
        data: data
    })
}

export const getWalletLogById = async (
    id: number
) => {
    return await db.wallet_logs.findMany({
        where: {
            WalletLogId: id
        },
        include: {
            Protocol: true
        }
    })
}

export const getWalletLogByAddr = async (
    addr: string
) => {
    return await db.wallet_logs.findMany({
        where: {
            Wallet: {
                WalletAddress: addr
            }
        },
        include: {
            Protocol: true
        }
    })
}

export const getWalletLogByWalletId = async (
    id: number
) => {
    return await db.wallet_logs.findMany({
        where: {
            WalletId: id
        },
        include: {
            Protocol: true
        }
    })
}