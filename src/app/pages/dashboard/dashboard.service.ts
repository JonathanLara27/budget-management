import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DURATION_TOAST } from 'src/app/common/constants';
import { TransactionsService } from 'src/app/common/services/transactions.service';
import { DASHBOARD_TITLE, EMPTY_EXPENSES_TEXT, EMPTY_TRANSACTIONS_TEXT, ERROR_TEXT_YEAR, LOADING_TRANSACTIONS_TEXT, TITLE_CARD_BALANCE, TITLE_CARD_EXPENSES, TITLE_CARD_FILTER, TITLE_CARD_LAST_TRANSACTIONS } from './dashboard.constants';
import { PieChartService } from './compoments/pieChart/pieChart.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Transaction } from 'src/app/common/interfaces';

@Injectable()
export class DashboardService {

  private fb = inject(FormBuilder);

  private transactionsService = inject(TransactionsService);
  private readonly pieChartService = inject(PieChartService);

  private today = signal<Date>(new Date());

  private year = signal<number>(this.today().getFullYear());
  private setYear = (year: number) => this.year.set(year)
  private month = signal<number>(this.today().getMonth() + 1);
  private setMonth = (month: number) => this.month.set(month)

  private formDate = this.fb.nonNullable.group({
    year: this.fb.control<number>(this.year(), [Validators.required, Validators.min(2000), Validators.max(2100)]),
    month: this.fb.control<number>(this.month(), [Validators.required, Validators.min(1), Validators.max(12)]),
  });

  private messageErrorYear = signal<string | null>(null);
  public messageErrorYear$ = computed(() => this.messageErrorYear());

  public formDateControl = this.fb.control<string | null>(null, [Validators.required]);

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

  public title = computed(() => DASHBOARD_TITLE);
  public titleCardFilter = computed(() => TITLE_CARD_FILTER);
  public titleCardBalance = computed(() => TITLE_CARD_BALANCE);
  public titleCardExpenses = computed(() => TITLE_CARD_EXPENSES);
  public emptyExpensesText = computed(() => EMPTY_EXPENSES_TEXT);
  public titleCardLastTransactions = computed(() => TITLE_CARD_LAST_TRANSACTIONS);
  public emptyTransactionsText = computed(() => EMPTY_TRANSACTIONS_TEXT);
  public messageLoadingTransactions = computed(() => LOADING_TRANSACTIONS_TEXT);

  public durationToast = computed(() => DURATION_TOAST);

  public transactions = computed(() => this.transactionResource.value());

  public expenses = computed(() => this.transactions().filter(t => t.type === 'expense'));

  public incomes = computed(() => this.transactions().filter(t => t.type === 'income'));

  public lastTransactions = computed(() => this.transactions().slice(0, 5));

  public balance = computed(() => {
    const incomeTotal = this.incomes().reduce((sum, t) => sum + t.amount, 0);
    const expenseTotal = this.expenses().reduce((sum, t) => sum + t.amount, 0);
    return incomeTotal - expenseTotal;
  })

  public colorBalance = computed(() => {
    const balance = this.balance();
    if (balance > 0) return 'success';
    if (balance < 0) return 'danger';
    return 'medium';
  })

  public isLoadingAddTransaction = this.transactionsService.isLoadingAddTransaction;

  constructor() {
    this.valueChangesYear();
    this.valueChangesMonth();
    effect(() => {
      const expenses = this.expenses();
      if (!expenses.length) return;
      this.pieChartService.setExpenses(this.expenses());
    });
  }

  public onDateChange(event: any) {
    const value = event.detail.value; // ejemplo: "2025-10-01T00:00:00.000Z"
    if (!value) return;
    this.setDate(value);
  }

  private setDate(value: string) {
    this.messageErrorYear.set(null);
    const [year, month] = [new Date(value).getFullYear(), new Date(value).getMonth() + 1];
    if (!this.validateYear(year)) return this.handleErrorYear(year);
    this.setFormDate(year, month);
    this.transactionResource.reload();
  }

  private validateYear(year: number): boolean {
    return year >= 2000 && year <= 2100;
  }

  private handleErrorYear(year: number) {
    this.messageErrorYear.set(`${ERROR_TEXT_YEAR} (Ingresaste: ${year})`);
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

}
