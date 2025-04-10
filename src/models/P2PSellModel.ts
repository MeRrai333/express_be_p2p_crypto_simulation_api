import { p2p_sells, Prisma } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { DefaultArgs } from "@prisma/client/runtime/library";
import * as logModel from './P2PSellLogModel'
import * as walletModel from './walletModel'
import { AppError } from "../middlewares/errorHandler";

const db = new PrismaClient()

export const createP2PSell = async (
  data: Omit<p2p_sells, 'P2PSellId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_sells.create({
    data: data
  })
}

export const getP2PSellById = async (
  id: number
) => {
  return await db.p2p_sells.findUnique({
    where: {
      P2PSellId: id
    },
    include: {
      Crypto: true
    }
  })
}

export const getP2PSellByShortNameCoin = async (
  shortName: string = ""
) => {
  return await db.p2p_sells.findMany({
    where: {
      Crypto: {
        ShortName: shortName
      }
    }
  })
}

export  const getP2PSellByUserId = async (
  userId: number
) => {
  return await db.p2p_sells.findMany({
    where: {
      UserId: userId
    },
    include: {
      Crypto: true
    }
  })
}

export const updateP2PSellById = async (
  id: number,
  data: Omit<p2p_sells, 'P2PSellId'|'OnCreate'|'UserId'|'CryptoId'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_sells.update({
    where: {
      P2PSellId: id
    },
    data: {
      PriceRate: data.PriceRate ?? undefined,
      MinQTY: data.MinQTY ?? undefined,
      MaxQTY: data.MaxQTY ?? undefined
    }
  })
}

export const deleteP2PSellById = async (
  id: number,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_sells.delete({
    where: {
      P2PSellId: id
    }
  })
}

export const updateSuccesOrder = async (
  logId: number,
  feedbackScore: number
) => {
  const log = await logModel.getP2PSellLogById(logId)
  if(!log)
    throw new AppError('Not found', 400)
  if(log.Status !== 0)
    throw new AppError('This order has finished', 400)

  const data = await db.$transaction(async (db) => {
    const merchantWallet = await walletModel.getWalletByUserIdAndCryptoId(
      log.P2PSell.UserId, log.P2PSell.CryptoId
    )
    const customerWallet = await walletModel.getWalletByUserIdAndCryptoId(
      log.CustomerId, log.P2PSell.CryptoId
    )
    // if  wallet not found or qty of customer not enough
    //    then throw error
    if(!merchantWallet || !customerWallet)
      throw new AppError('merchant or customer wallet not found', 400)
    if(customerWallet.QTY < log.QTY)
      throw new AppError('qty of customer isn\'t enougt', 400)

    const data = await db.p2p_sell_logs.update({
      where: {
        P2PSellLogId: logId
      },
      data: {
        Status: 1,
        FeedbackScore: feedbackScore,
        OnFinish: new Date(Date.now())
      }
    })
    await walletModel.transferCoin(
      {
        srcWalletAddress: customerWallet.WalletAddress,
        qty: log.QTY,
        cryptoId: log.P2PSell.CryptoId,
        desWalletAddress: merchantWallet.WalletAddress,
        protocolId: 1
      },
      db
    )
    // 
    await walletModel.receiveCoin(
      {
        desWalletAddress: merchantWallet.WalletAddress,
        qty: log.QTY,
        cryptoId: log.P2PSell.CryptoId,
        srcWalletAddress: customerWallet.WalletAddress,
        protocolId: 1
      },
      db
    )

    return data
  })

  return data
}