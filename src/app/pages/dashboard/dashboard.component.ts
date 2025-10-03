import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonContent, IonCardContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel, IonDatetime, IonLoading, IonToast } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_DASHBOARD } from 'src/app/common/constants';
import { DashboardService } from './dashboard.service';
import { PieChartComponent } from './compoments/pieChart/pieChart.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  private readonly dashboardService = inject(DashboardService);

  // public formDate = this.dashboardService.formDate;

  public formDateControl = this.dashboardService.formDateControl;

  public transactions = this.dashboardService.transactions;

  public lastTransactions = this.dashboardService.lastTransactions;

  public expenses = this.dashboardService.expenses;

  public incomes = this.dashboardService.incomes;

  public balance = this.dashboardService.balance;

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

  public onDateChange(event:any){
    return this.dashboardService.onDateChange(event);
  }

}
