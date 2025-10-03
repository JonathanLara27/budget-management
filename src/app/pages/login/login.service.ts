import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DURATION_TOAST } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';
import { APP_TITLE, BUTTON_LABEL_GOOGLE, BUTTON_LABEL_LOGIN, BUTTON_LABEL_REGISTER, LABEL_FORGOT_PASSWORD } from './login.constants';

@Injectable()
export class LoginService {

  private readonly fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private router = inject(Router);

  public loginForm = this.fb.nonNullable.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required])
  });

  public messageLoginError = signal<string | null>(null);

  public durationToast = computed(() => DURATION_TOAST);

  public appTitle = computed(() => APP_TITLE);
  public buttonLabelLogin = computed(() => BUTTON_LABEL_LOGIN);
  public buttonLabelGoogle = computed(() => BUTTON_LABEL_GOOGLE);
  public buttonLabelRegister = computed(() => BUTTON_LABEL_REGISTER);
  public labelForgotPassword = computed(() => LABEL_FORGOT_PASSWORD);

  public async loginWithEmail() {
    this.messageLoginError.set(null);
    const isValid = this.validateLoginForm();
    if (!isValid) return;

    const { email, password } = this.loginForm.getRawValue();

    try {
      await this.authService.loginWithEmail(email!, password!);
      await this.router.navigate(['/tabs']);
      this.messageLoginError.set(null);
    } catch (error: any) {
      const errorCode = error.code; // ej: "auth/invalid-credential"
      let friendlyMessage = 'Ocurrió un error al iniciar sesión';

      switch (errorCode) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          friendlyMessage = 'Correo o contraseña incorrectos';
          break;
        case 'auth/user-not-found':
          friendlyMessage = 'El usuario no existe';
          break;
        case 'auth/invalid-email':
          friendlyMessage = 'El formato del correo no es válido';
          break;
        case 'auth/user-disabled':
          friendlyMessage = 'La cuenta ha sido deshabilitada';
          break;
        default:
          friendlyMessage = 'Error desconocido: ' + errorCode;
          break;
      }
      this.messageLoginError.set(friendlyMessage);
    }
  }

  private validateLoginForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return false;
    }
    return true;
  }

  public async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      await this.router.navigate(['/tabs']);
      this.messageLoginError.set(null);
      // this.alertService.showSuccessAlert('Login successful');
    } catch (error) {
      // this.alertService.showErrorAlert('Login failed');
      this.messageLoginError.set('Error al iniciar sesión con Google');
    }
  }

}
