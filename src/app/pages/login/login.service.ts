import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DURATION_TOAST } from 'src/app/common/constants/durationToast';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable()
export class LoginService {

  private readonly fb = inject(FormBuilder);

  private readonly auth = inject(AuthService);

  public loginForm = this.fb.nonNullable.group({
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: this.fb.control<string>('', [Validators.required])
  });

  public messageLoginError = signal<string | null>(null);
  
  public durationToast = computed(() => DURATION_TOAST);

  public async loginWithEmail() {
    const isValid = this.validateLoginForm();
    if (!isValid) return;

    const { email, password } = this.loginForm.getRawValue();
    if (!email || !password) return;

    const result = await this.auth.loginWithEmail(email, password);
    if ('code' in result) {
      this.messageLoginError.set(result.message);
    } else {
      this.messageLoginError.set(null);
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
    return await this.auth.loginWithGoogle();
  }

}
