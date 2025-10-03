import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonContent, IonCardContent, IonHeader, IonToolbar, IonTitle, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_DASHBOARD } from 'src/app/common/constants';
import { Transaction } from 'src/app/common/interfaces';
import { DashboardService } from './dashboard.service';
import { PieChartComponent } from './compoments/pieChart/pieChart.component';

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
    IonLabel,

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

  constructor() {
    addIcons(ICONS_DASHBOARD)
  }
}
