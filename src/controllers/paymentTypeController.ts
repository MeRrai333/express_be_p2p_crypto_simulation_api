import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/paymentTypeModel'
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';

export const postPaymentType = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { name} = req.body;
    if(
      !name
    )
      throw new Error('body key missing')
    res.status(201).json(
      await model.createPaymentType(name)
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const postManyPaymentType = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {names} = req.body;
    if(!Array.isArray(names))
      throw new AppError('names isn\' array', 400)
    res.status(201).json(
      await model.createManyPaymentType(names)
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const getPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await model.getPaymentTypes());
  } catch (e) {
    next(prismaError(e))
  }
}

export const getPaymentTypeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getPaymentTypeById(id);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}

export const putPaymentTypeById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = parseInt(req.params.id);
    const { name} = req.body;
    if(
      !name
    )
      throw new Error('body key missing')
    res.status(201).json(
      await model.updatePaymentTypeById(id, name)
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const deletePaymentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    res.json({
      message: `deleted paymentId ${id}`,
      paymentType: await model.deletePaymentTypeById(id)
    });
  } catch (e) {
    next(prismaError(e))
  }
}