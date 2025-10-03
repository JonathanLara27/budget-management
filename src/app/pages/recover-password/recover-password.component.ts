import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RecoverPasswordService } from './recover-password.service';
import {
  IonInput,
  IonButton,
  IonToast,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonToast,
    IonContent,
  ],
  providers: [
    RecoverPasswordService,
  ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecoverPasswordComponent {

  private readonly recoverPasswordService = inject(RecoverPasswordService);

  public appTitle = this.recoverPasswordService.appTitle;

  public buttonLabelRecover = this.recoverPasswordService.buttonLabelRecover;

  public buttonLaberBack = this.recoverPasswordService.buttonLaberBack;

  public error = this.recoverPasswordService.error;

  public success = this.recoverPasswordService.success;

  public recoverForm = this.recoverPasswordService.recoverForm;

  public durationToast = this.recoverPasswordService.durationToast;

  constructor() { }

  public onSubmit() {
    this.recoverPasswordService.onSubmit();
  }

  public onBack() {
    this.recoverPasswordService.onBack();
  }



}
