import { Transaction, TransactionType } from "../interfaces";

export function buildTransaction(
    userId: string,
    type: TransactionType,
    amount: number,
    date: string,                  // formato "YYYY-MM-DD"
    category?: string,
    description?: string
): Transaction {
    const parsedDate = new Date(date);

    // Usar métodos locales
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth() + 1; // enero=0
    const day = parsedDate.getDate();

    return {
        userId,
        type,
        amount,
        category: category ?? null,
        description: description ?? null,
        date,
        year,
        month,
        day,
        createdAt: new Date().toISOString()
    };
}

