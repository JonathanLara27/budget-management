import { computed, inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionsService } from 'src/app/common/services/transactions.service';

@Injectable()
export class DashboardService {

  private fb  = inject(FormBuilder);

  private transactionsService = inject(TransactionsService);

  private year = this.transactionsService.year$;
  private month = this.transactionsService.month$;

  public formDate = this.fb.nonNullable.group({
    year : this.fb.control<number>(this.year(), [Validators.required, Validators.min(2000), Validators.max(2100)]),
    month: this.fb.control<number>(this.month(), [Validators.required, Validators.min(1), Validators.max(12)]),
  });

  public transactionResource = this.transactionsService.transactionsResource;
  public isLoadingGetTransactions = computed(() => this.transactionResource.isLoading());
  public errorGetTransactions = computed(() => this.transactionResource.error());

  public transactions = computed(() => this.transactionResource.value());

  public expenses = computed(() => this.transactions().filter(t => t.type === 'expense'));

  public incomes = computed(() => this.transactions().filter(t => t.type === 'income'));

  public isLoadingAddTransaction = this.transactionsService.isLoadingAddTransaction;
  public errorAddTransaction = this.transactionsService.errorAddTransaction$;

  public setYear = (year: number) => this.transactionsService.setYear(year);

  public setMonth = (month: number) => this.transactionsService.setMonth(month);

  constructor() {
    this.valueChangesYear();
    this.valueChangesMonth();
  }

  private valueChangesYear(){
    this.formDate.get('year')?.valueChanges.subscribe({
      next: (year) => {
        if(!year) return;
        this.setYear(year);
      }
    });
  }

  private valueChangesMonth(){
    this.formDate.get('month')?.valueChanges.subscribe({
      next: (month) => {
        if(!month) return;
        this.setMonth(month);
      }
    });
  }

}
