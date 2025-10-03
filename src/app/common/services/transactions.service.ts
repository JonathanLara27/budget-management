import { Injectable, computed, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Transaction, reqGetTransactions } from '../interfaces';
import { AuthService } from './auth.service';
import { Observable, firstValueFrom, of } from 'rxjs';
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

  private year = signal(new Date().getFullYear());
  public year$ = computed(() => this.year());
  private month = signal(new Date().getMonth() + 1);
  public month$ = computed(() => this.month());

  public transactionsResource = rxResource<Transaction[], void>({
    loader: () => {
      const year = this.year();
      const month = this.month();
      return this.getTransactionsResource({ year, month });
    },
    defaultValue: [],
  });

  constructor() { }

  // Métodos para cambiar signals
  public setYear(year: number) {
    this.year.set(year);
  }

  public setMonth(month: number) {
    this.month.set(month);
  }

  public async addTransaction(transaction: Transaction) {
    const docRef = await addDoc(this.transactionsCollection, transaction);
    const newTransaction: Transaction = {
      ...transaction,
      id: docRef.id
    }
    return newTransaction;
  }

  public getTransactionsResource({ year, month }: reqGetTransactions) {
    const user = this.authService.currentUser();
    if (!user) return of([]); // Retorna un observable vacío si no hay usuario
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
