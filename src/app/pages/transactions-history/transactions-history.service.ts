
import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY_TRANSACTIONS_TEXT_HISTORY, TITLE_CARD_FILTERS, TITLE_CARD_HISTORY, TRANSACTIONS_HISTORY_TITLE, TYPES_FILTERS } from './transactions-history.constants';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/common/services/transactions.service';
import { DURATION_TOAST } from 'src/app/common/constants';
import { ERROR_TEXT_YEAR, LOADING_TRANSACTIONS_TEXT } from '../dashboard/dashboard.constants';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Transaction, TransactionType } from 'src/app/common/interfaces';

@Injectable()
export class TransactionsHistoryService {

  private fb = inject(FormBuilder);

  private readonly transactionsService = inject(TransactionsService);

  public title = computed(() => TRANSACTIONS_HISTORY_TITLE);

  public titleCardFilters = computed(() => TITLE_CARD_FILTERS);
  public titleCardHistory = computed(() => TITLE_CARD_HISTORY);

  public messageLoadingTransactions = computed(() => LOADING_TRANSACTIONS_TEXT);

  public messageEmptyTransactions = computed(() => EMPTY_TRANSACTIONS_TEXT_HISTORY);

  private today = signal<Date>(new Date());

  private year = signal<number>(this.today().getFullYear());
  private setYear = (year: number) => this.year.set(year)
  private month = signal<number>(this.today().getMonth() + 1);
  private setMonth = (month: number) => this.month.set(month)

  public formDate = this.fb.nonNullable.group({
    year: this.fb.control<number>(this.year(), [Validators.required, Validators.min(2000), Validators.max(2100)]),
    month: this.fb.control<number>(this.month(), [Validators.required, Validators.min(1), Validators.max(12)]),
    type: this.fb.control<TransactionType | 'all'>('all', [Validators.required]),
  });

  public types = computed((): { value: TransactionType | 'all', label: string }[] => TYPES_FILTERS);

  public typeSignal = toSignal(this.formDate.get('type')!.valueChanges, { initialValue: 'all' });

  private messageErrorYear = signal<string | null>(null);
  public messageErrorYear$ = computed(() => this.messageErrorYear());

  public dateControl = this.fb.control<string>(this.today().toISOString(), [Validators.required]);

  public transactionResource = rxResource<Transaction[], void>({
    loader: () => {
      const year = this.year();
      const month = this.month();
      return this.transactionsService.getTransactionsResource({ year, month });
    },
    defaultValue: [],
  });
  public isLoadingGetTransactions = computed(() => this.transactionResource.isLoading());
  public errorGetTransactions = computed(() => this.transactionResource.error());

  public durationToast = computed(() => DURATION_TOAST);


  public transactions = computed(() => this.transactionResource.value().sort((a, b) => b.date.localeCompare(a.date)));

  public expenses = computed(() => this.transactions().filter(t => t.type === 'expense'));

  public totalExpenses = computed(() => this.expenses().reduce((sum, t) => sum + t.amount, 0));

  public incomes = computed(() => this.transactions().filter(t => t.type === 'income'));

  public totalIncomes = computed(() => this.incomes().reduce((sum, t) => sum + t.amount, 0));

  public filteredTransactions = computed(() => {
    const type = this.typeSignal();
    if (type === 'expense') return this.expenses();
    if (type === 'income') return this.incomes();
    return this.transactions();
  });

  public balance = computed(() => {
    const incomeTotal = this.incomes().reduce((sum, t) => sum + t.amount, 0);
    const expenseTotal = this.expenses().reduce((sum, t) => sum + t.amount, 0);
    return incomeTotal - expenseTotal;
  })

  constructor() {
    this.valueChangesYear();
    this.valueChangesMonth();
  }

  private setFormDate(year: number, month: number) {
    this.formDate.patchValue({
      year,
      month
    });
  }

  private valueChangesYear() {
    this.formDate.get('year')?.valueChanges.subscribe({
      next: (year) => {
        if (!year) return;
        this.setYear(year);
      }
    });
  }

  private valueChangesMonth() {
    this.formDate.get('month')?.valueChanges.subscribe({
      next: (month) => {
        if (!month) return;
        this.setMonth(month);
      }
    });
  }

  private validateYear(year: number): boolean {
    return year >= 2000 && year <= 2100;
  }

  private handleErrorYear(year: number) {
    this.messageErrorYear.set(`${ERROR_TEXT_YEAR} (Ingresaste: ${year})`);
  }

  private setDate(value: string) {
    this.messageErrorYear.set(null);
    const [year, month] = [new Date(value).getFullYear(), new Date(value).getMonth() + 1];
    if (!this.validateYear(year)) return this.handleErrorYear(year);
    this.setFormDate(year, month);
    this.transactionResource.reload();
  }

  public onDateChange(event: any) {
    const value = event.detail.value; // ejemplo: "2025-10-01T00:00:00.000Z"
    if (!value) return;
    this.setDate(value);
  }

}
