import {TransactionType} from '../../generated/prisma/enums.js';
export interface CreateTransactionInput {
    telegramId: bigint;
    amount: number;
    description?: string;
    category?: string;
    type?: TransactionType
}