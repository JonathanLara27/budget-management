import { Injectable, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DURATION_TOAST, EMAIL_REGEX } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable()
export class RecoverPasswordService {

  private fb = inject(FormBuilder);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  public appTitle = computed(() => 'Recuperar contraseña');

  public buttonLabelRecover = computed(() => 'Enviar correo de recuperación');

  public buttonLaberBack = computed(() => 'Volver al inicio de sesión');

  private mesageRecoverError = signal<string | null>(null);
  public error = computed(() => this.mesageRecoverError());

  public messageSuccess = signal<string | null>(null);
  public success = computed(() => this.messageSuccess());

  public durationToast = computed(() => DURATION_TOAST);

  public recoverForm = this.fb.nonNullable.group({
    email: this.fb.control<string>('', [Validators.required, Validators.pattern(EMAIL_REGEX)])
  });

  constructor() { }

  public async onSubmit() {
    const isValid = this.validateForm();
    if (!isValid) return;
    const { email } = this.recoverForm.getRawValue();
    try {
      await this.authService.sendPasswordResetEmail(email!)
      this.messageSuccess.set('Se ha enviado un correo para restablecer la contraseña. Revisa tu spam.');
      this.mesageRecoverError.set(null);
      
    } catch (error: any) {
      const errorCode = error.code; // ej: "auth/invalid-credential"
      let friendlyMessage = 'Ocurrió un error al enviar el correo de recuperación';
  
      switch (errorCode) {
        case 'auth/user-not-found':
          friendlyMessage = 'El usuario no existe';
          break;
        case 'auth/invalid-email':
          friendlyMessage = 'El formato del correo no es válido';
          break;
        case 'auth/user-disabled':
          friendlyMessage = 'La cuenta ha sido deshabilitada';
          break;
      }
      this.mesageRecoverError.set(friendlyMessage);
      this.messageSuccess.set(null);
    }
  }

  public async onBack(){
    await this.router.navigate(['/login']);
  }

  private validateForm(): boolean {
    this.mesageRecoverError.set(null);
    const { email } = this.recoverForm.getRawValue();
    if (!email || email.trim() === '') {
      this.mesageRecoverError.set('El correo es obligatorio');
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      this.mesageRecoverError.set('El formato del correo no es válido');
      return false;
    }
    return true;
  }

}
