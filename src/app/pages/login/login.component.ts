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
  styleUrls: ['./login.component.scss'], // 👈 corregido
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LoginComponent { 

  private readonly loginService = inject(LoginService);

  private readonly darkModeService = inject(DarkModeService);

  private readonly router = inject(Router);

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

  onRegister() {
    this.router.navigate(['/register']);
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

}
