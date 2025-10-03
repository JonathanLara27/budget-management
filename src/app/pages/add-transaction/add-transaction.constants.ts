import { TransactionType } from "src/app/common/interfaces";

export const ADD_TRANSACTION_TITLE = 'Agregar Movimiento';

export const TYPES_TRANSACTIONS : {key : TransactionType, value: string}[] = [
    { key: 'income', value: 'Ingreso' },
    { key: 'expense', value: 'Gasto' }
]

export const FIXED_EXPENSES: string[] = [
    'Alquiler',
    'Ahorro',
    'Deudas',
    'Educación',
    'Impuestos',
    'Seguros',
    'Servicios públicos',
    'Suscripciones',
    'Vivienda'
];

export const VARIABLE_EXPENSES: string[] = [
    'Automóvil',
    'Comida',
    'Cuidado personal',
    'Electrodomésticos',
    'Hogar',
    'Mascotas',
    'Ropa',
    'Salud',
    'Tecnología',
    'Transporte'
];

export const OCCASIONAL_EXPENSES: string[] = [
    'Conciertos',
    'Donaciones',
    'Entretenimiento',
    'Eventos',
    'Hijos',
    'Otros',
    'Regalos',
    'Vacaciones',
    'Viajes'
];

export const CATEGORIES : string[] = [
    ...FIXED_EXPENSES,
    ...VARIABLE_EXPENSES,
    ...OCCASIONAL_EXPENSES
].sort();