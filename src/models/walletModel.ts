import { Prisma, wallets } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { DefaultArgs } from "@prisma/client/runtime/library";
import { AppError, IAppError } from "../middlewares/errorHandler";
import * as logModel from './walletLogModel'
import * as protocolModel from './protocolModel'

export interface ITransferData {
  qty: number,
  cryptoId: number,
  srcWalletAddress: string,
  desWalletAddress: string,
  protocolId: number
}

export interface IReceiveData {
  qty: number,
  cryptoId: number,
  srcWalletAddress: string,
  desWalletAddress: string,
  protocolId: number
}

const db = new PrismaClient()

export const createWallet = async (
  data: Omit<wallets, 'WalletId'|'WalletAddress'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.wallets.create({
    data: {
      ...data
    }
  })
}

export const getWallets = async () => {
  return await db.wallets.findMany({
    include: {
      User: {
        select: {
          UserName: true
        }
      },
      Crypto: true
    }
  })
}

export const getWalletById = async (
  id: number
) => {
  return await db.wallets.findUnique({
    where: {
      WalletId: id
    },
    include: {
      User: {
        select: {
          UserName: true
        }
      },
      Crypto: true
    }
  })
}

export const getWalletByAddress = async (
  address: string,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.wallets.findUnique({
    where: {
      WalletAddress: address
    }
  })
}

export const getWalletByUserId = async (
  id: number
) => {
  return await db.wallets.findMany({
    where: {
      UserId: id
    },
    include: {
      User: {
        select: {
          UserName: true
        }
      },
      Crypto: true
    }
  })
}

export const getWalletByUserIdAndCryptoId = async (
  userId: number,
  cryptoId: number
) => {
  return await db.wallets.findFirst({
    where: {
      UserId: userId,
      CryptoId: cryptoId
    }
  })
}

export const putWalletById = async (
  id: number,
  data: {
    QTY?: number,
    WalletAddress?: string
  },
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return passDb.wallets.update({
    where: {
      WalletId: id
    },
    data: {
      QTY: data.QTY ?? undefined,
      WalletAddress: data.WalletAddress ?? undefined
    }
  })
}

export const getLogByWalletId = async (
  id: number
) => {
  const wallet = await getWalletById(id)
  if(!wallet)
    throw new AppError('Not found src wallet', 400)
  return await logModel.getWalletLogByWalletId(id)
}

export const getLogByWalletAddr = async (
  addr: string
) => {
  const wallet = await getWalletByAddress(addr)
  if(!wallet)
    throw new AppError('Not found src wallet', 400)
  return await logModel.getWalletLogByAddr(addr)
}

export const transferCoin = async (
  data: ITransferData,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  const srcWallet = await getWalletByAddress(data.srcWalletAddress)
  if(!srcWallet)
    throw new AppError('Not found src wallet', 400)
  const srcRemainQty = srcWallet.QTY-data.qty
  if(srcRemainQty < 0)
    throw new AppError('src qty not enough', 400)
  if(srcWallet.CryptoId !== data.cryptoId)
    throw new AppError('Body CryptoId and Wallet Crypto Id not match', 400)
  const protocol = await protocolModel.getProtocolById(data.protocolId)
  if(!protocol)
    throw new AppError('Not found protocol', 400)
  // update qty of src wallet
  const srcUpdateWallet = await putWalletById(
    srcWallet.WalletId,
    {
      QTY: srcRemainQty
    },
    passDb
  )

  // create log of src wallet
  await logModel.createWalletLog(
    {
      WalletId: srcUpdateWallet.WalletId,
      ChangeQTY: -data.qty,
      RemainQTY: srcRemainQty,
      ToFromWalletAddress: data.desWalletAddress,
      ProtocolId: protocol.ProtocolId
    },
    passDb
  )

  return srcUpdateWallet
}

export const receiveCoin = async (
  data: IReceiveData,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  const desWallet = await getWalletByAddress(data.desWalletAddress, passDb)
  if(!desWallet)
    throw new AppError('Not found des wallet', 400)
  if(desWallet.CryptoId !== data.cryptoId)
    throw new AppError('Body CryptoId and Wallet Crypto Id not match', 400)
  const desRemainQty = desWallet.QTY+data.qty
  const protocol = await protocolModel.getProtocolById(data.protocolId, passDb)
  if(!protocol)
    throw new AppError('Not found protocol', 400)

  const desUpdateWallet = await putWalletById(
    desWallet.WalletId,
    {
      QTY: desRemainQty
    },
    passDb
  )
  await logModel.createWalletLog({
    WalletId: desWallet.WalletId,
    ChangeQTY: data.qty,
    RemainQTY: desRemainQty,
    ToFromWalletAddress: data.srcWalletAddress,
    ProtocolId: protocol.ProtocolId
  }, passDb)

  return desUpdateWallet
}