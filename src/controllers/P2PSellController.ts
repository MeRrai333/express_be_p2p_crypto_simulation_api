import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/P2PSellModel'
import * as logModel from '../models/P2PSellLogModel'
import * as walletModel from '../models/walletModel'
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';

export const postP2PSell = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {userId, cryptoId, priceRate, minQty, maxQty} = req.body;
    if(
      !userId || !cryptoId || !priceRate || ! minQty || !maxQty
    )
      throw new AppError('body key missing', 400)
    if(minQty > maxQty)
      throw new AppError('invalid min and max', 400)
    
    res.status(201).json(
      await model.createP2PSell({
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

export const getP2PSellByShortNameCoin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coin = req.params.coin as string ?? "";
    res.json(await model.getP2PSellByShortNameCoin(coin));
  } catch (e) {
    next(prismaError(e))
  }
}

export const getP2PSellById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getP2PSellById(id);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}


export const getP2PSellByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId);
    res.json(
      await model.getP2PSellByUserId(userId)
    );
  } catch (e) {
    next(prismaError(e))
  }
}

export const putP2PSellById = async (req: Request, res: Response, next: NextFunction) => {
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
      await model.updateP2PSellById(id, {
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

export const deleteP2PSellById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    res.json({
      message: `deleted P2PSellId ${id}`,
      paymentType: await model.deleteP2PSellById(id)
    });
  } catch (e) {
    next(prismaError(e))
  }
}

export const openP2PSellOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {customerId, P2PSellId, qty} = req.body;
    if(
      !customerId || !P2PSellId || !qty
    )
      throw new AppError('body key missing', 400)
    const P2PSell = await model.getP2PSellById(P2PSellId)
    if(!P2PSell)
      throw new AppError('Not found P2PSellId', 400)
    const customerWallet = await walletModel.getWalletByUserIdAndCryptoId(
      customerId, P2PSell.CryptoId
    )
    // if qty of customer not enough
    //    then throw error
    if(!customerWallet)
      throw new AppError('customer wallet not found', 400)
    if(customerWallet.QTY < qty)
      throw new AppError('qty of customer isn\'t enougt', 400)

    if(
      qty < P2PSell!.MinQTY ||
      qty > P2PSell!.MaxQTY
    )
      throw new AppError('buy qty out of range of merchant', 400)

    const p2pTimeOut = (Number(process.env.P2PSTATEMENTTIMEOUT) || 60) * 1000
    const p2pLog = await logModel.createP2PSellLog({
      CustomerId: customerId,
      P2PSellId: P2PSellId,
      QTY: qty,
      Status: 0,
      SumPriec: P2PSell.PriceRate*qty,
      FeedbackScore: null,
      OnFinish: null
    })
    // Check after start p2p order 60s (default)
    //      if status of order isn't succes
    //          then update status to -1 (Failed)
    setTimeout(async () => {
      const checkLog = await logModel.getP2PSellLogById(p2pLog.P2PSellLogId)
      if(checkLog!.Status !== 1){
          console.log(`----- Order: ${p2pLog.P2PSellId} Failed -----`)
          logModel.updateP2PSellLogById(
              p2pLog.P2PSellLogId,
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

export const succesP2PSellOrder = async (req: Request, res: Response, next: NextFunction) => {
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