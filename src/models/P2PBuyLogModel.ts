import { p2p_buy_logs, Prisma, PrismaClient} from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import * as P2PBuyModel from './P2PBuyModel'
import { AppError } from '../middlewares/errorHandler';

const db = new PrismaClient()

export const createP2PBuyLog = async (
    data: Omit<p2p_buy_logs, 'P2PBuyLogId'|'OnCreate'>,
    passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
    const P2PBuy = await P2PBuyModel.getP2PBuyById(data.P2PBuyId)
    if(P2PBuy && P2PBuy.UserId == data.CustomerId)
        throw new AppError('Buyer and Seller is same account', 400)
    return  await passDb.p2p_buy_logs.create({
        data: data
    })
}

export const getP2PBuyLogById = async (
    id: number
) => {
    return await db.p2p_buy_logs.findUnique({
        where: {
            P2PBuyLogId: id
        },
        include: {
            P2PBuy: true
        }
    })
}

export const getP2PBuyLogByP2PBuyId = async (
    P2PBuyId: number
) => {
    return await db.p2p_buy_logs.findMany({
        where: {
            P2PBuyId: P2PBuyId
        }
    })
}

export const getWalletLogByP2PBuyId = async (
    buyId: number
) => {
    return await db.p2p_buy_logs.findMany({
        where: {
            P2PBuyId: buyId
        }
    })
}

export const updateP2PBuyLogById = async (
    id: number,
    data: {
        Status?: number,
        FeedbackScore?: number,
        OnFinish?: Date
    },
    passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
    return await passDb.p2p_buy_logs.update({
        where: {
            P2PBuyLogId: id
        },
        data: {
            Status: data.Status ?? undefined,
            FeedbackScore: data.FeedbackScore ?? undefined,
            OnFinish: data.OnFinish ?? undefined
        }
    }) 
}