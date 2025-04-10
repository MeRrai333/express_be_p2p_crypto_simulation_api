import { p2p_sell_logs, Prisma, PrismaClient} from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import * as P2PSellModel from './P2PSellModel'
import dotenv from 'dotenv';
import { AppError } from '../middlewares/errorHandler';

dotenv.config();

const db = new PrismaClient()

export const createP2PSellLog = async (
    data: Omit<p2p_sell_logs, 'P2PSellLogId'|'OnCreate'>,
    passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
    const P2PSell = await P2PSellModel.getP2PSellById(data.P2PSellId)
    if(P2PSell!.UserId == data.CustomerId)
        throw new AppError('Buyer and Seller is same account', 400)
    return await passDb.p2p_sell_logs.create({
        data: data
    })
}

export const getP2PSellLogById = async (
    id: number
) => {
    return await db.p2p_sell_logs.findUnique({
        where: {
            P2PSellLogId: id
        },
        include: {
            P2PSell: true
        }
    })
}

export const getP2PSellLogByP2PSellId = async (
    P2PSellId: number
) => {
    return await db.p2p_sell_logs.findMany({
        where: {
            P2PSellId: P2PSellId
        }
    })
}

export const getWalletLogByP2PSellId = async (
    buyId: number
) => {
    return await db.p2p_sell_logs.findMany({
        where: {
            P2PSellLogId: buyId
        }
    })
}

export const updateP2PSellLogById = async (
    id: number,
    data: {
        Status?: number,
        FeedbackScore?: number,
        OnFinish?: Date
    },
    passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
    return await passDb.p2p_sell_logs.update({
        where: {
            P2PSellLogId: id
        },
        data: {
            Status: data.Status ?? undefined,
            FeedbackScore: data.FeedbackScore ?? undefined,
            OnFinish: data.OnFinish ?? undefined
        }
    }) 
}