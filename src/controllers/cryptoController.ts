import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/cryptoModel'
import * as userModel from '../models/userModel'
import * as walletModel from '../models/walletModel'
import { cryptos } from '@prisma/client';
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';

export const postCrypto = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { fullName, shortName, currentPrice} = req.body;
    if(
      !fullName ||
      !shortName ||
      !currentPrice
    )
      throw new Error('body key missing')

    const data: Omit<cryptos, 'CryptoId'|'OnCreate'> = {
      FullName: fullName,
      ShortName: shortName,
      CurrentPrice: currentPrice
    };
    const crypto = await model.createCrypto(data)
    const users = await userModel.getUsers()
    /* Create wallet for all user after crypto insert */
    for(const u of users){
      walletModel.createWallet({
        UserId: u.UserId,
        CryptoId: crypto.CryptoId,
        QTY: 0
      })
    }
    res.status(201).json(
      crypto
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const postManyCrypto = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const reqData = req.body;
    const data: Omit<cryptos, 'CryptoId'|'OnCreate'>[] = [];
    for(const d of reqData){
      if(
        !d.fullName ||
        !d.shortName ||
        !d.currentPrice
      )
        throw new AppError('body key missing', 400)
      data.push({
        FullName: d.fullName,
        ShortName: d.shortName,
        CurrentPrice: d.currentPrice
      })
    }
    const cryptos = await model.createManyCrypto(data)
    const users = await userModel.getUsers()
    /* Create wallet for all user after crypto insert */
    for(const c of cryptos){
      for(const u of users){
        walletModel.createWallet({
          UserId: u.UserId,
          CryptoId: c.CryptoId,
          QTY: 0
        })
      }
    }
    res.status(201).json(
      cryptos
    );
  }
  catch(e){
    next(prismaError(e))
  }
};


export const getCryptos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = req.query.search as string ?? "";
    res.json(await model.getCryptos(search));
  } catch (e) {
    next(prismaError(e))
  }
}

export const getCryptosById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getCryptoById(id);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}

export const putCryptosById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const {fullName, shortName, currentPrice} = req.body;
    if(
      !fullName &&
      !shortName &&
      !currentPrice
    )
      throw new Error('body key must have atlest 1 key')

    const data: Omit<cryptos, 'CryptoId'|'OnCreate'> = {
        FullName: fullName,
        ShortName: shortName,
        CurrentPrice: currentPrice
    }
    res.json(await model.updateCryptoById(id,data));
  } catch (e) {
    next(prismaError(e))
  }
}

export const deleteCryptosById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    res.json({
      message: `deleted cryptoId ${id}`,
      crypto: await model.deleteCryptoById(id)
    });
  } catch (e) {
    next(prismaError(e))
  }
}