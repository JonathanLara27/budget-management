import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonToast,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonButtons,
  IonLabel,
  IonToggle,
  IonContent } from '@ionic/angular/standalone';
import { LoginService } from './login.service';
import { DarkModeService } from 'src/app/common/services/darkMode.service';

@Component({
  selector: 'app-login',
  imports: [
    IonInput,
    IonInputPasswordToggle,
    ReactiveFormsModule,
    IonButton,
    IonToast,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonButtons,
    IonLabel,
    IonToggle,
    IonContent
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export default class LoginComponent { 

  private readonly loginService = inject(LoginService);

  private readonly darkModeService = inject(DarkModeService);

  public darkMode = this.darkModeService.darkMode;

  public toggleDarkMode(event: any) {
    return this.darkModeService.toggleDarkMode(event);
  }

  loginForm = this.loginService.loginForm;

  messageLoginError = this.loginService.messageLoginError;

  durationToast = this.loginService.durationToast;

  async onSubmit() {
    await this.loginService.loginWithEmail();
  }

  async onLoginWithGoogle() {
    await this.loginService.loginWithGoogle();
  }

}
