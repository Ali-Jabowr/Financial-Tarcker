import {prisma} from '../lib/prisma.js';

export const upsertUser = async (user: {
  telegramId: bigint;
  name: string;
  username?: string;  
}) => {
  return prisma.user.upsert({
    where: { telegramId: user.telegramId },
    update: { firstName: user.name },
    create: { telegramId: user.telegramId, firstName: user.name }
  });
};


export const createTransaction = async (transaction: {
  telegramId: number;
  amount: number;
  description?: string;
}) => {
  return prisma.transaction.create({
    data: {
      user: {connect: { telegramId: BigInt(transaction.telegramId) }},
      amount: transaction.amount,
      category: "General",
      description: transaction.description || "No description",
    }
  });
};
