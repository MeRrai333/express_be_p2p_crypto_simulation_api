import { p2p_buys, Prisma } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { DefaultArgs } from "@prisma/client/runtime/library";
import * as logModel from './P2PBuyLogModel'
import * as walletModel from './walletModel'
import { AppError } from "../middlewares/errorHandler";

const db = new PrismaClient()

export const createP2PBuy = async (
  data: Omit<p2p_buys, 'P2PBuyId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_buys.create({
    data: data
  })
}

export const getMerchantWalletByP2PBuyId = async (
  id: number
) => {
  const p2pBuy = await getP2PBuyById(id);
  return walletModel.getWalletByUserIdAndCryptoId(
    p2pBuy!.UserId,
    p2pBuy!.CryptoId
  )
} 

export const getP2PBuyById = async (
  id: number
) => {
  return await db.p2p_buys.findUnique({
    where: {
      P2PBuyId: id
    },
    include: {
      User: {
        select: {
          UserName: true,
          OnCreate: true,
          P2PPayments: true
        }
      },
      Crypto: true
    }
  })
}

export const getP2PBuyByShortNameCoin = async (
  shortName: string = ""
) => {
  return await db.p2p_buys.findMany({
    where: {
      Crypto: {
        ShortName: shortName
      }
    },
    include: {
      User: {
        select: {
          UserName: true,
          OnCreate: true,
          P2PPayments: true
        }
      }
    }
  })
}

export  const getP2PBuyByUserId = async (
  userId: number
) => {
  return await db.p2p_buys.findMany({
    where: {
      UserId: userId
    },
    include: {
      User: {
        select: {
          P2PPayments: true
        }
      },
      Crypto: true
    }
  })
}

export const updateP2PBuyById = async (
  id: number,
  data: Omit<p2p_buys, 'P2PBuyId'|'OnCreate'|'UserId'|'CryptoId'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_buys.update({
    where: {
      P2PBuyId: id
    },
    data: {
      PriceRate: data.PriceRate ?? undefined,
      MinQTY: data.MinQTY ?? undefined,
      MaxQTY: data.MaxQTY ?? undefined
    }
  })
}

export const deleteP2PBuyById = async (
  id: number,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_buys.delete({
    where: {
      P2PBuyId: id
    }
  })
}

export const updateSuccesOrder = async (
  logId: number,
  feedbackScore: number
) => {
  const log = await logModel.getP2PBuyLogById(logId)
  if(!log)
    throw new AppError('Not found', 400)
  if(log.Status !== 0)
    throw new AppError('This order has finished', 400)

  const data = await db.$transaction(async (db) => {
    const merchantWallet = await walletModel.getWalletByUserIdAndCryptoId(
      log.P2PBuy.UserId, log.P2PBuy.CryptoId
    )
    const customerWallet = await walletModel.getWalletByUserIdAndCryptoId(
      log.CustomerId, log.P2PBuy.CryptoId
    )
    // if  wallet not found or qty of seller not enough
    //    then throw error
    if(!merchantWallet || !customerWallet)
      throw new AppError('merchant or customer wallet not found', 400)
    if(merchantWallet.QTY < log.QTY)
      throw new AppError('qty of merchant isn\'t enougt', 400)

    const data = await db.p2p_buy_logs.update({
      where: {
        P2PBuyLogId: logId
      },
      data: {
        Status: 1,
        FeedbackScore: feedbackScore,
        OnFinish: new Date(Date.now())
      }
    })

    await walletModel.transferCoin(
      {
        srcWalletAddress: merchantWallet.WalletAddress,
        qty: log.QTY,
        cryptoId: log.P2PBuy.CryptoId,
        desWalletAddress: customerWallet.WalletAddress,
        protocolId: 1
      },
      db
    )
    await walletModel.receiveCoin(
      {
        desWalletAddress: customerWallet.WalletAddress,
        qty: log.QTY,
        cryptoId: log.P2PBuy.CryptoId,
        srcWalletAddress: merchantWallet.WalletAddress,
        protocolId: 1
      },
      db
    )

    return data
  })

  return data
}