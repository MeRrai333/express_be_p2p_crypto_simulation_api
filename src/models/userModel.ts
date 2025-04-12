import dotenv from 'dotenv';
import { Prisma, users } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { AppError, IAppError } from '../middlewares/errorHandler';
import { DefaultArgs } from '@prisma/client/runtime/library';
const bcrypt = require('bcrypt');

export const SALT = 10

dotenv.config();
const db = new PrismaClient()

export const createUser = async (
  data: Omit<users, 'UserId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  const {Password, ...user} = await passDb.users.create({
    data: {
      UserName: data.UserName,
      Password: bcrypt.hashSync(data.Password, SALT),
      Email: data.Email
    }
  })
  return user;
}

export const getSignIn = async (
  email: string,
  password: string
) => {
  const user = await db.users.findUnique({
    where: {
      Email: email
    }
  })
  if(!user){
    const err: IAppError = new Error('Not found')
    err.status = 400
    throw err;
  }
  const isMatch = await bcrypt.compare(password, user.Password)
  if(isMatch){
    // remove password before return data to display in api page
    const {Password, ...data} = user
    return data;
  }
  throw new AppError('Invalid password', 400);
}

export const getUsers = async () => {
  return await db.users.findMany({
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true
    }
  })
}

export const getUserById = async (
  id: number
) => {
  return await db.users.findUnique({
    where: {
      UserId: id
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true
    }
  })
}

export const getUserByEmail = async (
  email: string
) => {
  return await db.users.findUnique({
    where: {
      Email: email
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true
    }
  })
}

export const getUserByIdWithPayments = async (
  id: number
) => {
  return await db.users.findUnique({
    where: {
      UserId: id
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true,
      P2PPayments: {
        include: {
          PaymentType: true
        }
      }
    }
  })
}

export const getUserByIdWithWallets = async (
  id: number
) => {
  return await db.users.findUnique({
    where: {
      UserId: id
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true,
      Wallets: {
        include: {
          Crypto: true
        }
      }
    }
  })
}

export const getUserByIdWithP2PBuys = async (
  id: number
) => {
  return await db.users.findUnique({
    where: {
      UserId: id
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true,
      P2PBuys: {
        include: {
          Crypto: true
        }
      }
    }
  })
}

export const getUserByIdWithP2PBuyLogs = async (
  id: number
) => {
  return await db.users.findUnique({
    where: {
      UserId: id
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true,
      P2PBuyLogs: true
    }
  })
}

export const getUserByIdWithP2PSells = async (
  id: number
) => {
  return await db.users.findUnique({
    where: {
      UserId: id
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true,
      P2PSells: {
        include: {
          Crypto: true
        }
      }
    }
  })
}

export const getUserByIdWithP2PSellLogs = async (
  id: number
) => {
  return await db.users.findUnique({
    where: {
      UserId: id
    },
    select: {
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true,
      P2PSellLogs: true
    }
  })
}

export const updateUser = async (
  id: number,
  data: Omit<users, 'UserId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  const {Password, ...user} = await passDb.users.update({
    where: {
      UserId: id
    },
    data: {
      UserName: data.UserName ?? undefined,
      Email: data.Email ?? undefined,
      Password: data.Password ? bcrypt.hashSync(data.Password, SALT) : undefined
    }
  })
  return user
}

export const deleteUserById = async (
  id: number,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.users.delete({
    where: {
      UserId: id
    },
    select:{
      UserId: true,
      UserName: true,
      Email: true,
      OnCreate: true,
    }
  })
}

export const deleteUserByEmail = async (
  email: string,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  const {Password, ...user} = await passDb.users.delete({
    where: {
      Email: email
    }
  })
  return user
}