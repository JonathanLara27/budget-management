import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonContent, IonCardContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_DASHBOARD } from 'src/app/common/constants';
import { Transaction } from 'src/app/common/interfaces';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IonHeader, 
    IonCardContent, 
    IonContent,
    CommonModule,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel
  ],
  providers: [DashboardService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

  balance: number = 1250; // ejemplo, luego se obtiene de Firebase
  transactions: Transaction[] = []; // últimas transacciones


  ngOnInit() {
    // Datos de ejemplo, más adelante traer de Firebase
    // this.transactions = [
    //   { title: 'Almuerzo', amount: 15, category: 'Comida', date: '2025-10-02' },
    //   { title: 'Taxi', amount: 7, category: 'Transporte', date: '2025-10-02' },
    //   { title: 'Café', amount: 3, category: 'Comida', date: '2025-10-01' }
    // ];
  }

  getTotalExpenses(): number {
    return this.transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  constructor() {
    addIcons(ICONS_DASHBOARD)
  }
}
