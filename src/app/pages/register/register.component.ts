import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegisterService } from './register.service';
import {
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonToast,
  IonItem,
  IonLabel,
  IonContent,
  IonList,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { ICONS_REGISTER } from 'src/app/common/constants';
@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonToast,
    IonItem,
    IonLabel,
    IonContent,
    IonList,
    IonIcon
  ],
  providers: [RegisterService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RegisterComponent { 

  private readonly registerService = inject(RegisterService);

  private readonly router = inject(Router);

  public title = this.registerService.title;
  public registerForm = this.registerService.registerForm;

  public errorMessage = this.registerService.errorMessage;
  public durationToast = this.registerService.durationToast;

  public buttonLaberRegister = this.registerService.buttonLaberRegister;
  public labelHaveAccount = this.registerService.labelHaveAccount;

  public showValidations = this.registerService.showValidations;
  public iteratorValidations = this.registerService.iteratorValidations;

  public isValidForm = this.registerService.isValidForm;

  constructor() {
    addIcons(ICONS_REGISTER)
  }


  public goToLoginPage() {
    this.router.navigate(['/login']);
  }

  public onSubmit() {
    return this.registerService.onSubmit();
  }

}
