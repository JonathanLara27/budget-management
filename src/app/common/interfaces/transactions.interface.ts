export interface  Transaction {
    id?: string;              // id generado por Firestore
    userId: string;           // id del usuario autenticado (Google UID)
    type: 'income' | 'expense'; // tipo de transacción
    amount: number;           // monto
    category: string | null;        // requerido en gasto, opcional en ingreso
    description: string | null;     // texto libre
    date: string;             // formato "YYYY-MM-DD"
    year: number;             // redundancia para filtros
    month: number;            // redundancia para filtros
    day: number;              // redundancia para filtros diarios
    createdAt: string;        // fecha/hora de creación (ISO)
}

export interface reqGetTransactions {
    year: number;
    month: number;
}


// {
//   "id": "auto-id",
//   "userId": "uid-del-usuario",
//   "type": "expense" | "income",
//   "amount": 250.50,
//   "category": "Comida",            // opcional en ingresos, requerido en gastos
//   "description": "Cena con amigos",
//   "date": "2025-10-02",            // guardado como string ISO "YYYY-MM-DD"
//   "year": 2025,
//   "month": 10,
//   "day": 2,                        // útil para vistas diarias
//   "createdAt": "2025-10-02T19:20:30Z"
// }
