import {prisma} from '../lib/prisma.js';
import type { UserInterface } from '../models/addUser.js';
import type { CreateTransactionInput } from '../models/createTransactionInput.js';

export const upsertUser = async (user: UserInterface) => {
  return prisma.user.upsert({
    where: { telegramId: user.telegramId },
    update: { firstName: user.name },
    create: { telegramId: user.telegramId, firstName: user.name }
  });
};


export const createTransaction = async (transaction : CreateTransactionInput) => {
  return prisma.transaction.create({
    data: {
      user: {connect: { telegramId: transaction.telegramId }},
      amount: transaction.amount,
      category: transaction.category || "General",
      description: transaction.description || "No description",
    }
  });
};

