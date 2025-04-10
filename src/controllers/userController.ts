import e, { Request, Response, NextFunction } from 'express';
import * as model from '../models/userModel'
import { Prisma, users } from '@prisma/client';
import { AppError, IAppError } from '../middlewares/errorHandler';
import { prismaError } from '../utilize/prismaError';
import * as cryptoModel from '../models/cryptoModel'
import * as walletModel from '../models/walletModel'

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { username, email, password, repassword } = req.body;
    if(
      !username ||
      !email ||
      !password
    )
      throw new AppError('body key missing', 400)
    if(password !== repassword)
      throw new AppError('password invalid', 400)
    const data: Omit<users, 'UserId'|'OnCreate'> = {
      UserName: username,
      Email: email,
      Password: password
    };
    const user = await model.createUser(data)
    /* Create wallet for all crypto after user create */
    const cryptos = await cryptoModel.getCryptos()
    for(const c of cryptos){
      walletModel.createWallet({
        UserId: user.UserId,
        CryptoId: c.CryptoId,
        QTY: 0
      })
    }
    res.status(201).json(
      user
    );
  }
  catch(e){
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if(e.code === 'P2002'){
        const err: IAppError = new Error('Unique key constraint')
        err.status = 400
        next(err);
      }
    }
    next(prismaError(e))
  }
};

export const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password} = req.body;
    if(
      !email ||
      !password
    )
      throw new Error('body key missing')
    res.json({
      message: 'sign in succes',
      user: await model.getSignIn(
        email,
        password
      )
    });
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await model.getUsers());
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getUserById(id)
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email;
    const data = await model.getUserByEmail(email)
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserByIdWithPayments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getUserByIdWithPayments(id)
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserByIdWithWallets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getUserByIdWithWallets(id);
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserByIdWithP2PBuys = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getUserByIdWithP2PBuys(id)
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserByIdWithP2PBuyLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getUserByIdWithP2PBuyLogs(id)
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserByIdWithP2PSells = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getUserByIdWithP2PSells(id)
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const getUserByIdWithP2PSellLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const data = await model.getUserByIdWithP2PSellLogs(id)
    if(!data)
      throw new AppError('Not found', 400)
    res.json({...data});
  } catch (e) {
    next(prismaError(e))
  }
};

export const putUserById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = parseInt(req.params.id);
    const { username, email, password, repassword } = req.body;
    if(
      !username &&
      !email &&
      !password
    )
      throw new Error('body key must have atlest 1 key')
    if(password && password !== repassword)
      throw new Error('password invalid')
    const data: Omit<users, 'UserId'|'OnCreate'> = {
      UserName: username,
      Email: email,
      Password: password
    };
    res.status(200).json(
      await model.updateUser(id, data)
    );
  }
  catch(e){
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if(e.code === 'P2002'){
        const err: IAppError = new Error('Unique key constraint')
        err.status = 400
        next(err);
      }
    }
    next(prismaError(e))
  }
};

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    res.json({
      message: `deleted userId ${id}`,
      user: await model.deleteUserById(id)
    });
  } catch (e) {
    next(prismaError(e))
  }
};

export const deleteUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body.email;
    res.json({
      message: `deleted user Email ${email}`,
      user: await model.deleteUserByEmail(email)
    });
  } catch (e) {
    next(prismaError(e))
  }
};