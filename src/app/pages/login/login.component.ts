import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonToast,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { LoginService } from './login.service';
import { DarkModeService } from 'src/app/common/services/darkMode.service';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { ICONS_LOGIN } from 'src/app/common/constants';

@Component({
  selector: 'app-login',
  imports: [
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    IonToast,
    IonContent,
    IonIcon,
    ReactiveFormsModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LoginComponent { 

  private readonly loginService = inject(LoginService);

  private readonly darkModeService = inject(DarkModeService);

  private readonly router = inject(Router);

  public darkMode = this.darkModeService.darkMode;

  constructor() {
    addIcons(ICONS_LOGIN)
  }

  public toggleDarkMode(event: any) {
    return this.darkModeService.toggleDarkMode(event);
  }

  public loginForm = this.loginService.loginForm;

  public messageLoginError = this.loginService.messageLoginError;

  public durationToast = this.loginService.durationToast;

  public appTitle = this.loginService.appTitle;
  public buttonLabelLogin = this.loginService.buttonLabelLogin;
  public buttonLabelGoogle = this.loginService.buttonLabelGoogle;
  public buttonLabelRegister = this.loginService.buttonLabelRegister;
  public labelForgotPassword = this.loginService.labelForgotPassword;

  async onSubmit() {
    await this.loginService.loginWithEmail();
  }

  async onLoginWithGoogle() {
    await this.loginService.loginWithGoogle();
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onForgotPassword() {
    this.router.navigate(['/recover-password']);
  }

}
