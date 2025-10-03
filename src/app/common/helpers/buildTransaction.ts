import { Transaction } from "../interfaces";

export function createTransaction(
    userId: string,
    type: 'income' | 'expense',
    amount: number,
    date: string,                  // formato "YYYY-MM-DD"
    category?: string,
    description?: string
): Transaction {
    const parsedDate = new Date(date);
    const year = parsedDate.getUTCFullYear();
    const month = parsedDate.getUTCMonth() + 1;
    const day = parsedDate.getUTCDate();

    return {
        userId,
        type,
        amount,
        category: category ?? null,         // si no se pasa → null
        description: description ?? null,   // si no se pasa → null
        date,
        year,
        month,
        day,
        createdAt: new Date().toISOString()
    };
}
