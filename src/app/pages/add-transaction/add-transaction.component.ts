import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonModal, IonSelectOption, IonTitle, IonToolbar, IonSelect, IonToast } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { ICONS_ADD_TRANSACTION } from 'src/app/common/constants';
import { AddTransactionService } from './add-transaction.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader,
    IonContent,
    IonButton,
    IonToolbar,
    IonTitle,
    IonLoading,
    IonDatetime,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToast
    // IonicModule,
  ],
  providers: [
    AddTransactionService
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTransactionComponent {

  private readonly addTransactionService = inject(AddTransactionService);

  public title = this.addTransactionService.title;

  public form = this.addTransactionService.form;
  public typesTransaction = this.addTransactionService.typesTransaction;
  public categories = this.addTransactionService.categories;

  public isExpense = this.addTransactionService.ixExpense$;

  public isLoadingAddTransaction = this.addTransactionService.isLoadingAddTransaction;
  public errorAddTransaction = this.addTransactionService.errorAddTransaction;
  public successAddTransaction = this.addTransactionService.successAddTransaction;
  public messageAddTransaction = this.addTransactionService.messageAddTransaction;
  public durationToast = this.addTransactionService.durationToast;

  constructor() {
    addIcons(ICONS_ADD_TRANSACTION)
  }

  public onSubmit() {
    this.addTransactionService.onSubmit();
  }

}
