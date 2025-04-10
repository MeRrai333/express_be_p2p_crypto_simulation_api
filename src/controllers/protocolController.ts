import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/protocolModel'
import { prismaError } from '../utilize/prismaError';
import { AppError } from '../middlewares/errorHandler';

export const postProtocol = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {fullName, shortName} = req.body;
    if(
      !fullName || !shortName
    )
      throw new Error('body key missing')
    res.status(201).json(
      await model.createProtocol({
        fullName,
        shortName
      })
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const postManyProtocol = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const {names} = req.body;
    if(!Array.isArray(names))
      throw new AppError('names isn\' array', 400)
    res.status(201).json(
      await model.createManyProtocol(names)
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const getProtocols = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await model.getProtocols());
  } catch (e) {
    next(prismaError(e))
  }
}

export const getProtocolById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getProtocolById(id);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
}

export const putProtocolById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = parseInt(req.params.id);
    const {fullName, shortName} = req.body;
    if(
      !fullName && !shortName
    )
      throw new Error('body key missing')
    res.status(201).json(
      await model.updateProtocolById(id, {
        fullName,
        shortName
      })
    );
  }
  catch(e){
    next(prismaError(e))
  }
};

export const deleteProtocoltById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    res.json({
      message: `deleted protocolId ${id}`,
      paymentType: await model.deleteProtocolById(id)
    });
  } catch (e) {
    next(prismaError(e))
  }
}