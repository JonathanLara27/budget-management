import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonButton, IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ICONS_TRANSACTIONS } from 'src/app/common/constants';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent { 

  constructor() {
    addIcons(ICONS_TRANSACTIONS)
  }
}
