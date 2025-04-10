import { Prisma, PrismaClient } from '@prisma/client';
import { AppError } from "../middlewares/errorHandler";
import { DefaultArgs } from '@prisma/client/runtime/library';

const db = new PrismaClient()

export const getPaymentTypeById = async (
  id: number
) => {
  return await db.payment_types.findUnique({
    where: {
        PaymentTypeId: id
    }
  })
}

export const getPaymentTypes = async () => {
  return await db.payment_types.findMany();
}

export const createPaymentType = async (
  name: string,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.payment_types.create({
    data: {
      Name: name
    }
  })
}

export const createManyPaymentType = async (
  names: string[],
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$use" | "$extends"> = db,
) => {
  const data = await passDb.$transaction(async (db) => {
    const out = []
    for(const n of names){
      out.push(await db.payment_types.create({
        data: {
          Name: n
        }
      }))
    }
    return out;
  })
  return data;
}

export const updatePaymentTypeById = async (
  id: number,
  name: string,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.payment_types.update({
    where: {
      PaymentTypeId: id
    },
    data: {
      Name: name
    }
  })
}

export const deletePaymentTypeById = async (
  id: number
) => {
  return await db.payment_types.delete({
    where: {
        PaymentTypeId: id
    }
  })
}