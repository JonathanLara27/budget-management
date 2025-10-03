import { Injectable, computed, inject, signal } from '@angular/core';
import { ADD_TRANSACTION_TITLE, CATEGORIES, TYPES_TRANSACTIONS } from './add-transaction.constants';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionType } from 'src/app/common/interfaces';
import { TransactionsService } from 'src/app/common/services/transactions.service';
import { AuthService } from 'src/app/common/services/auth.service';
import { buildTransaction } from 'src/app/common/helpers';
import { DURATION_TOAST } from 'src/app/common/constants';

@Injectable()
export class AddTransactionService {

  private readonly transactionsService = inject(TransactionsService);

  private readonly authService = inject(AuthService);

  private currentUser = this.authService.currentUser;

  private fb = inject(FormBuilder);

  public title = computed(() => ADD_TRANSACTION_TITLE);

  public typesTransaction = computed(() => TYPES_TRANSACTIONS);

  public categories = computed(() => CATEGORIES);

  private isExpense = signal(true);
  public ixExpense$ = computed(() => this.isExpense());
  
  public isLoadingAddTransaction = this.transactionsService.isLoadingAddTransaction;
  public errorAddTransaction = this.transactionsService.errorAddTransaction$;
  public successAddTransaction = this.transactionsService.successAddTransaction$;
  public messageAddTransaction = this.transactionsService.messageAddTransaction$;

  public durationToast = computed(() => DURATION_TOAST);

  public form = this.fb.nonNullable.group({
    type: this.fb.nonNullable.control<TransactionType>('expense', [Validators.required, Validators.pattern('^(income|expense)$')]),
    amount: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(0.01)]),
    category: this.fb.nonNullable.control<string>('', [Validators.required]),
    description: this.fb.nonNullable.control<string>('', [Validators.maxLength(100)]),
    date: this.fb.nonNullable.control<string>(new Date().toISOString(), [Validators.required]),
  })

  constructor() {
    this.valueChangesCategory();
  }

  public onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.createTransaction();
  }

  private valueChangesCategory() {
    this.form.get('type')?.valueChanges.subscribe({
      next: (type) => {
        if (!type) return;
        // si el tipo es ingreso, borramos la categoria y le quitamos los validators
        if (type === 'expense') {
          // si el tipo es gasto, le ponemos los validators
          this.form.get('category')?.setValidators([Validators.required]);
          this.form.get('category')?.updateValueAndValidity();
          this.isExpense.set(true);
          return;
        }
        this.isExpense.set(false);
        this.form.get('category')?.setValue('');
        this.form.get('category')?.clearValidators();
        this.form.get('category')?.updateValueAndValidity();
      }
    })
  }

  private buiildTransaction() {
    const { type, amount, date, category, description } = this.form.getRawValue();
    const userId = this.currentUser()!.uid;
    const transaction = buildTransaction(userId, type, amount, date, category, description);
    return transaction;
  }

  private async createTransaction(){
    if(!this.currentUser()) return;
    const transaction = this.buiildTransaction();
    await this.transactionsService.addTransaction(transaction);
    this.resetForm();
  }

  private resetForm() {
    this.form.reset({
      type: 'expense',
      amount: 0,
      category: '',
      description: '',
      date: new Date().toISOString(),
    });
  }
  

}
