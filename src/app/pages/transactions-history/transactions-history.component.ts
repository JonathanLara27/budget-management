import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ICONS_TRANSACTIONS } from 'src/app/common/constants';
import { TransactionsHistoryService } from './transactions-history.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonButton,
    IonIcon,
    IonToolbar,
    IonTitle,
    IonLoading,
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

  constructor() {
    addIcons(ICONS_TRANSACTIONS)
  }
}
