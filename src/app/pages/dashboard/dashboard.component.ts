import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonContent, IonCardContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonDatetime, IonLoading, IonToast, IonText } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_DASHBOARD } from 'src/app/common/constants';
import { DashboardService } from './dashboard.service';
import { PieChartComponent } from './compoments/pieChart/pieChart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonToast, 
    IonHeader, 
    IonCardContent, 
    IonContent,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
    IonDatetime,
    IonLoading,
    // Componentes
    PieChartComponent,
    IonText,
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements ViewWillEnter {

  private readonly dashboardService = inject(DashboardService);

  public formDateControl = this.dashboardService.formDateControl;

  private transactionsResourse = this.dashboardService.transactionResource;

  public transactions = this.dashboardService.transactions;

  public lastTransactions = this.dashboardService.lastTransactions;

  public expenses = this.dashboardService.expenses;

  public incomes = this.dashboardService.incomes;

  public balance = this.dashboardService.balance;

  public colorBalance = this.dashboardService.colorBalance;

  public title = this.dashboardService.title;
  public titleCardFilter = this.dashboardService.titleCardFilter;
  public titleCardBalance = this.dashboardService.titleCardBalance;
  public titleCardExpenses = this.dashboardService.titleCardExpenses;
  public emptyExpensesText = this.dashboardService.emptyExpensesText;
  public titleCardLastTransactions = this.dashboardService.titleCardLastTransactions;
  public emptyTransactionsText = this.dashboardService.emptyTransactionsText;
  public messageLoadingTransactions = this.dashboardService.messageLoadingTransactions;

  public isLoadingGetTransactions = this.dashboardService.isLoadingGetTransactions;
  public errorGetTransactions = this.dashboardService.errorGetTransactions;
  public messageErrorYear = this.dashboardService.messageErrorYear$;
  public durationToast = this.dashboardService.durationToast;

  constructor() {
    addIcons(ICONS_DASHBOARD)
  }

  ionViewWillEnter() {
    this.transactionsResourse.reload();
  }

  public onDateChange(event:any){
    return this.dashboardService.onDateChange(event);
  }

}
