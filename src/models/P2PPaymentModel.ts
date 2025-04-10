import { p2p_payments, Prisma } from "@prisma/client";
import { PrismaClient } from '@prisma/client';
import { DefaultArgs } from "@prisma/client/runtime/library";

const db = new PrismaClient()

export const createP2PPayment = async (
  data: Omit<p2p_payments, 'P2PPaymentId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_payments.create({
    data: {
      UserId: data.UserId,
      PaymentTypeId: data.PaymentTypeId,
      PaymentFirstName: data.PaymentFirstName,
      PaymentLastName: data.PaymentLastName,
      PaymentInfo: data.PaymentInfo
    }
  })
}

export const getP2PPaymentByUserId = async (
  userId: number
) => {
  return await db.p2p_payments.findMany({
    where: {
      UserId: userId
    },
    include: {
      PaymentType: true
    }
  })
}

export  const getP2PPaymentById = async (
  id: number
) => {
  return await db.p2p_payments.findUnique({
    where: {
      P2PPaymentId: id
    },
    include: {
      PaymentType: true
    }
  })
}

export const updateP2PPaymentById = async (
  id: number,
  data: Omit<p2p_payments, 'P2PPaymentId'|'UserId'|'OnCreate'>,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_payments.update({
    where: {
      P2PPaymentId: id
    },
    data: {
      PaymentTypeId: data.PaymentTypeId ?? undefined,
      PaymentFirstName: data.PaymentFirstName ?? undefined,
      PaymentLastName: data.PaymentLastName ?? undefined,
      PaymentInfo: data.PaymentInfo ?? undefined
    }
  })
}

export const deleteP2PPaymentById = async (
  id: number,
  passDb: Omit<PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"> = db,
) => {
  return await passDb.p2p_payments.delete({
    where: {
      P2PPaymentId: id
    }
  })
}