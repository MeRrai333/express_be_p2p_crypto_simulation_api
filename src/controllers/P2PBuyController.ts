import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/P2PBuyModel'
import * as logModel from '../models/P2PBuyLogModel'
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

export const postP2PBuy = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {userId, cryptoId, priceRate, minQty, maxQty} = req.body;
    if(
      !userId || !cryptoId || !priceRate || ! minQty || !maxQty
    )
      throw new AppError('body key missing', 400)
    if(minQty > maxQty)
      throw new AppError('invalid min and max', 400)
    
    res.status(201).json(
      await model.createP2PBuy({
        UserId: userId,
        CryptoId: cryptoId,
        PriceRate: priceRate,
        MinQTY: minQty,
        MaxQTY: maxQty
      })
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const getP2PBuyByShortNameCoin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coin = req.params.coin as string ?? "";
    res.json(await model.getP2PBuyByShortNameCoin(coin));
  } catch (e) {
    next(prismaError(e))
  }
}

export const getP2PBuyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getP2PBuyById(id);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}

export const getP2PBuyByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId);
    res.json(
      await model.getP2PBuyByUserId(userId)
    );
  } catch (e) {
    next(prismaError(e))
  }
}

export const putP2PBuyById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = parseInt(req.params.id);
    const {priceRate, minQty, maxQty} = req.body;
    if(
      !priceRate && !minQty && !maxQty
    )
      throw new AppError('body key missing', 400)
    if(minQty > maxQty)
      throw new AppError('invalid min and max', 400)
    res.status(201).json(
      await model.updateP2PBuyById(id, {
        PriceRate: priceRate,
        MinQTY: minQty,
        MaxQTY: maxQty
      })
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const deletP2PBuyById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    res.json({
      message: `deleted P2PBuyId ${id}`,
      P2PBuy: await model.deleteP2PBuyById(id)
    });
  } catch (e) {
    next(prismaError(e))
  }
}

export const openP2PBuyOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {customerId, P2PBuyId, qty} = req.body;
    if(
      !customerId || !P2PBuyId || !qty
    )
      throw new AppError('body key missing', 400)
    const merchantWallet = await model.getMerchantWalletByP2PBuyId(P2PBuyId)
    // if qty of merchant not enough
    //    then throw error
    if(!merchantWallet)
      throw new AppError('merchant wallet not found', 400)
    if(merchantWallet.QTY < qty)
      throw new AppError('qty of merchant isn\'t enougt', 400)

    const P2PBuy = await model.getP2PBuyById(P2PBuyId)
    if(!P2PBuy)
      throw new AppError('P2PBuyId not found', 400)
    if(
      qty < P2PBuy!.MinQTY ||
      qty > P2PBuy!.MaxQTY
    )
      throw new AppError('buy qty out of range of merchant', 400)

    const p2pTimeOut = (Number(process.env.P2PSTATEMENTTIMEOUT) || 60) * 1000
    const p2pLog = await logModel.createP2PBuyLog({
      CustomerId: customerId,
      P2PBuyId: P2PBuyId,
      QTY: qty,
      Status: 0,
      SumPriec: P2PBuy?.PriceRate*qty,
      FeedbackScore: null,
      OnFinish: null
    })
    // Check after start p2p order 60s (default)
    //      if status of order isn't succes
    //          then update status to -1 (Failed)
    setTimeout(async () => {
      const checkLog = await logModel.getP2PBuyLogById(p2pLog.P2PBuyLogId)
      if(checkLog!.Status !== 1){
          console.log(`----- Order: ${p2pLog.P2PBuyId} Failed -----`)
          logModel.updateP2PBuyLogById(
              p2pLog.P2PBuyLogId,
              {
                  Status: -1,
                  OnFinish: new Date(Date.now())
              }
          )
      }
  }, p2pTimeOut)
    res.json(
      {...p2pLog}
    );
  } catch (e) {
    next(prismaError(e))
  }
}

export const succesP2PBuyOrder = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = parseInt(req.params.id);
    const {feedbackScore} = req.body;
    if(feedbackScore > 1 || feedbackScore < -1)
      throw new AppError('Feedback score out of range (-1 to 1)', 400)

    const p2pLog = await model.updateSuccesOrder(id, feedbackScore)
    res.json(
      {...p2pLog}
    );
  } catch (e) {
    next(prismaError(e))
  }
}