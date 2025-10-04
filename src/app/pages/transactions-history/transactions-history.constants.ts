import { TransactionType } from "src/app/common/interfaces";

export const TRANSACTIONS_HISTORY_TITLE = 'Historial de Movimientos';

export const TITLE_CARD_FILTERS = 'Filtros por mes año y tipo';

export const TITLE_CARD_HISTORY = 'Historial de Movimientos';

export const EMPTY_TRANSACTIONS_TEXT_HISTORY = "No hay movimientos para los filtros seleccionados.";

export const TYPES_FILTERS: { value: TransactionType | 'all', label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'income', label: 'Ingresos' },
    { value: 'expense', label: 'Gastos' },
];