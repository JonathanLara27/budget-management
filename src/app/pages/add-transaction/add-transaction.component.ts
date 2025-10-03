import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonButton, IonContent, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_ADD_TRANSACTION } from 'src/app/common/constants';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    IonContent, 
    CommonModule,
    IonButton,
    IonIcon,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent { 

  onAddTransaction() {
    console.log('Add transaction clicked');
  }

  constructor() {
    addIcons(ICONS_ADD_TRANSACTION)
  }

}
