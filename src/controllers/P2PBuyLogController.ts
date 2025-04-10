import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/P2PBuyLogModel'
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';
import dotenv from 'dotenv';

export const getP2PBuyLogByP2PBuyId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const buyId = parseInt(req.params.id);
    const data = await model.getP2PBuyLogByP2PBuyId(buyId);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}