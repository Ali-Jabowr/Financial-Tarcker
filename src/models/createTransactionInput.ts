
export interface CreateTransactionInput {
    telegramId: bigint;
    amount: number;
    description?: string;
    category?: string;
}