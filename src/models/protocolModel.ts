import { Prisma, PrismaClient } from '@prisma/client';
import { AppError } from "../middlewares/errorHandler";
import { DefaultArgs } from '@prisma/client/runtime/library';

const db = new PrismaClient()

export const getProtocolById = async (
  id: number,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.protocols.findUnique({
    where: {
        ProtocolId: id
    }
  })
}

export const getProtocols = async () => {
  return await db.protocols.findMany()
}

export const createProtocol = async (
  data: {
    fullName: string,
    shortName: string
  },
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.protocols.create({
    data: {
      FullName: data.fullName,
      ShortName: data.shortName
    }
  })
}

export const createManyProtocol = async (
  names: {
    fullName: string,
    shortName: string
  }[],
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$use" | "$extends"> = db,
) => {
  const data = await passDb.$transaction(async (db) => {
    const out = []
    for(const n of names){
      out.push(await db.protocols.create({
        data: {
          FullName: n.fullName,
          ShortName: n.shortName
        }
      }))
    }
    return out;
  })
  return data;
}

export const updateProtocolById = async (
  id: number,
  data: {
    fullName?: string,
    shortName?: string
  },
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.protocols.update({
    where: {
      ProtocolId: id
    },
    data: {
      FullName: data.fullName ?? undefined,
      ShortName: data.shortName ?? undefined
    }
  })
}

export const deleteProtocolById = async (
  id: number
) => {
  return await db.protocols.delete({
    where: {
        ProtocolId: id
    }
  })
}