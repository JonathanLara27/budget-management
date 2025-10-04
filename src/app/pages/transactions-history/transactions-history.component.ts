import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { addIcons } from 'ionicons';
import { ICONS_TRANSACTIONS } from 'src/app/common/constants';
import { TransactionsHistoryService } from './transactions-history.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  providers: [
    TransactionsHistoryService
  ],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent { 

  private readonly transactionsHistoryService = inject(TransactionsHistoryService);

  public title = this.transactionsHistoryService.title;

  public titleCardFilters = this.transactionsHistoryService.titleCardFilters;
  public titleCardHistory = this.transactionsHistoryService.titleCardHistory;

  public types = this.transactionsHistoryService.types;
  public form = this.transactionsHistoryService.formDate;
  public dateControl = this.transactionsHistoryService.dateControl;

  public messageErrorYear = this.transactionsHistoryService.messageErrorYear$;
  public isLoadingGetTransactions = this.transactionsHistoryService.isLoadingGetTransactions;
  public errorGetTransactions = this.transactionsHistoryService.errorGetTransactions;
  public messageLoadingTransactions = this.transactionsHistoryService.messageLoadingTransactions;

  public messageEmptyTransactions = this.transactionsHistoryService.messageEmptyTransactions;

  public durationToast = this.transactionsHistoryService.durationToast;

  public transactions = this.transactionsHistoryService.transactions;
  public expenses = this.transactionsHistoryService.expenses;
  public totalExpenses = this.transactionsHistoryService.totalExpenses;
  public incomes = this.transactionsHistoryService.incomes;
  public totalIncomes = this.transactionsHistoryService.totalIncomes;
  // public currentTransactions = this.transactionsHistoryService.currentTransactions;
  public filteredTransactions = this.transactionsHistoryService.filteredTransactions;

  // public balance = this.transactionsHistoryService.balance;
  // public colorBalance = this.transactionsHistoryService.colorBalance;

  constructor() {
    addIcons(ICONS_TRANSACTIONS)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.transactionsHistoryService.transactionResource.reload();
  }

  public onDateChange(event: any) {
    return this.transactionsHistoryService.onDateChange(event);
  }
}
