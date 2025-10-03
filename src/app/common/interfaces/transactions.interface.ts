export interface Transaction {
    userId?: string;
    title: string;
    amount: number;
    category: string;
    date?: string;
}