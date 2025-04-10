import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/walletModel'
import { PrismaClient } from '@prisma/client';
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';

const db = new PrismaClient()

export const getWalletById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getWalletById(id)
    if(!data)
      throw new AppError('Not found', 400) 
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}

export const getWallets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await model.getWallets());
  } catch (e) {
    next(prismaError(e))
  }
}

export const getWalletByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId);
    const data = await model.getWalletByUserId(userId);
    if(!data)
      throw new AppError('Not found', 400) 
    res.json([...data]);
  } catch (e) {
    next(prismaError(e))
  }
}

export const getWalletByAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = req.params.address;
    const data = await model.getWalletByAddress(address);
    if(!data)
      throw new AppError('Not found', 400) 
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}

export const getWalletLogsByWalletAddr = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const addr = req.params.addr;
    const data = await model.getLogByWalletAddr(addr);
    if(!data)
      throw new AppError('Not found', 400) 
    res.json([...data]);
  } catch (e) {
    next(prismaError(e))
  }
}

export const transferCoin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const srcAddress = req.params.addr;
    const { qty, cryptoId, desWalletAddress, protocolId } = req.body;
    if(
      !qty || !cryptoId || !desWalletAddress || !protocolId
    )
      throw new AppError('body key missing', 400)
    if(srcAddress === desWalletAddress)
      throw new AppError('Same address', 400)
    const data = await db.$transaction(async (db) => {
      const srcUpdateWallet = await model.transferCoin(
        {
          srcWalletAddress: srcAddress,
          qty,
          cryptoId,
          protocolId,
          desWalletAddress
        },
        db
      )

      // if des wallet was in our database
      //    then des receive coin
      //    else des was outside database => not need to update or create data of des
      const desWallet = await model.getWalletByAddress(desWalletAddress)
      if(desWallet){
        await model.receiveCoin(
          {
            desWalletAddress: desWallet.WalletAddress,
            qty,
            cryptoId,
            protocolId,
            srcWalletAddress: srcUpdateWallet.WalletAddress
          },
          db
        )
      }
      return srcUpdateWallet
    })
    res.json({
      ...data
    });
  } catch (e) {
    next(prismaError(e))
  }
}

// receive coin for outside wallet transfer to wallet in our system
export const receiveCoin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const desAddress = req.params.addr;
    const { qty, cryptoId, srcWalletAddress, protocolId } = req.body;
    if(
      !qty || !cryptoId || !srcWalletAddress || !protocolId
    )
      throw new AppError('body key missing', 400)
    if(desAddress === srcWalletAddress)
      throw new AppError('Same address', 400)
    const data = await model.receiveCoin(
      {
        desWalletAddress: desAddress,
        qty,
        cryptoId,
        srcWalletAddress,
        protocolId
      }
    )
    res.json({
      ...data
    });
  } catch (e) {
    next(prismaError(e))
  }
}