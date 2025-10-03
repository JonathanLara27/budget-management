import { Injectable, computed, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Transaction, reqGetTransactions } from '../interfaces';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private readonly authService = inject(AuthService)

  private readonly collectionName = 'transactions';
  private readonly firestore = inject(Firestore);
  private readonly transactionsCollection = collection(this.firestore, this.collectionName);

  private addTransactionLoading = signal(false);
  public isLoadingAddTransaction = computed(() => this.addTransactionLoading());

  private errorAddTransaction = signal<string | null>(null);
  public errorAddTransaction$ = computed(() => this.errorAddTransaction());

  private successAddTransaction = signal<string | null>(null);
  public successAddTransaction$ = computed(() => this.successAddTransaction());
  public messageAddTransaction$ = computed(() => 'Agregando movimiento...');

  private today = signal<Date>(new Date());
  public today$ = computed(() => this.today());

  private year = signal(this.today().getFullYear());
  public year$ = computed(() => this.year());
  private month = signal(this.today().getMonth() + 1);
  public month$ = computed(() => this.month());

  public transactionsResource = rxResource<Transaction[], void>({
    loader: () => {
      const year = this.year();
      const month = this.month();
      return this.getTransactionsResource({ year, month });
    },
    defaultValue: [],
  });

  public setYear(year: number) {
    this.year.set(year);
  }

  public setMonth(month: number) {
    this.month.set(month);
  }

  public async addTransaction(transaction: Transaction) {
    this.addTransactionLoading.set(true);
    this.successAddTransaction.set(null);
    this.errorAddTransaction.set(null);
    try {
      this.errorAddTransaction.set(null);
      const docRef = await addDoc(this.transactionsCollection, transaction);
      const newTransaction: Transaction = {
        ...transaction,
        id: docRef.id
      }
      this.successAddTransaction.set('Transacción agregada con éxito');
      return newTransaction;
    } catch (error: any) {
      return this.handleErrorAddTransaction(error);
    }finally {
      this.addTransactionLoading.set(false);
    }
  }


  private handleErrorAddTransaction(error: any) {
    this.errorAddTransaction.set(`Error al agregar transacción: ${error.message || error}`);
    return null;
  }

  private getTransactionsResource({ year, month }: reqGetTransactions) {
    const user = this.authService.currentUser();
    if (!user) return of([]);
    const q = query(this.transactionsCollection,
      where('userId', '==', this.authService.currentUser()?.uid),
      where('year', '==', year),
      where('month', '==', month)
    )
    return collectionData(q, { idField: 'id' }) as Observable<Transaction[]>;
  }


  // Query para obtener transacciones del usuario autenticado en un mes y año específicos
  // const q = query(
  //   collection(this.firestore, 'transactions'),
  //   where('userId', '==', currentUser.uid),
  //   where('year', '==', selectedYear),
  //   where('month', '==', selectedMonth)
  // );

  //query diario
  // const q = query(
  //   collection(this.firestore, 'transactions'),
  //   where('userId', '==', currentUser.uid),
  //   where('year', '==', 2025),
  //   where('month', '==', 10),
  //   where('day', '==', 2)
  // );


}
