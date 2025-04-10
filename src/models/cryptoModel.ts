import { cryptos, Prisma, users } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { AppError } from "../middlewares/errorHandler";
import { DefaultArgs } from "@prisma/client/runtime/library";

const db = new PrismaClient()

export const createCrypto = async (
  data: Omit<cryptos, 'CryptoId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.cryptos.create({
    data: {
      FullName: data.FullName,
      ShortName: data.ShortName,
      CurrentPrice: data.CurrentPrice
    }
  })
}

export const createManyCrypto = async (
  data: Omit<cryptos, 'CryptoId'|'OnCreate'>[],
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$use" | "$extends"> = db,
) => {
  const cryptos = await passDb.$transaction(async (db) => {
    const out = []
    for(const d of data)
      out.push(await db.cryptos.create({
        data: d
      }))
    return out;
  })
  return cryptos;
}

export const getCryptos = async (
  search: string = ""
) => {
  const data = await db.cryptos.findMany()
  // PrismaORM can't use case insensitive with MySQL
  // Then query all and filter by Javascript
  const fitlerData = data.filter((d) => {
    if(
      d.FullName.toLowerCase().includes(search.toLocaleLowerCase()) ||
      d.ShortName.toLowerCase().includes(search.toLocaleLowerCase())
    )
      return d
  })
  return fitlerData;
}

export  const getCryptoById = async (
  id: number
) => {
  return await db.cryptos.findUnique({
    where: {
      CryptoId: id
    }
  })
}

export const updateCryptoById = async (
  id: number,
  data: Omit<cryptos, 'CryptoId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.cryptos.update({
    where: {
      CryptoId: id
    },
    data: {
      FullName: data.FullName ?? undefined,
      ShortName: data.ShortName ?? undefined,
      CurrentPrice: data.CurrentPrice ?? undefined
    }
  })
}

export const deleteCryptoById = async (
  id: number,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.cryptos.delete({
    where: {
      CryptoId: id
    }
  })
}