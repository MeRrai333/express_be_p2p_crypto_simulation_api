import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/P2PPaymentModel'
import { cryptos, p2p_payments } from '@prisma/client';
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';

export const postP2PPayment = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {userId, paymentTypeId, paymentFirstName, paymentLastName, paymentInfo} = req.body;
    if(
      !userId ||
      !paymentTypeId ||
      !paymentFirstName ||
      !paymentLastName ||
      !paymentInfo
    )
      throw new Error('body key missing')

    const data: Omit<p2p_payments, 'P2PPaymentId'|'OnCreate'> = {
      UserId: userId,
      PaymentTypeId: paymentTypeId,
      PaymentFirstName: paymentFirstName,
      PaymentLastName: paymentLastName,
      PaymentInfo: paymentInfo
    };
    const crypto = await model.createP2PPayment(data)
    res.status(201).json(
      crypto
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const getP2PPaymentByUserId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.userId);
    res.json(await model.getP2PPaymentByUserId(userId));
  } catch (e) {
    next(prismaError(e))
  }
}

export const getP2PPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getP2PPaymentById(id);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}

export const putP2PPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const {paymentTypeId, paymentFirstName, paymentLastName, paymentInfo} = req.body;
    if(
      !paymentTypeId &&
      !paymentFirstName &&
      !paymentLastName &&
      !paymentInfo
    )
      throw new Error('body key must have atlest 1 key')

    const data: Omit<p2p_payments, 'P2PPaymentId'|'UserId'|'OnCreate'> = {
        PaymentTypeId: paymentTypeId,
        PaymentFirstName: paymentFirstName,
        PaymentLastName: paymentLastName,
        PaymentInfo: paymentInfo
    }
    res.json(await model.updateP2PPaymentById(id,data));
  } catch (e) {
    next(prismaError(e))
  }
}

export const deleteP2PPaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    res.json({
      message: `deleted paymentId ${id}`,
      crypto: await model.deleteP2PPaymentById(id)
    });
  } catch (e) {
    next(prismaError(e))
  }
}