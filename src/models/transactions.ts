export interface TransactionInterface {
    id: string;
    amount: number;
    date: Date;
    category: string;
    type: 'income' | 'expense';
    userId: string;
}