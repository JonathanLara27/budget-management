import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DURATION_TOAST, EMAIL_REGEX } from 'src/app/common/constants';
import { AuthService } from 'src/app/common/services/auth.service';
import { BUTTON_LABEL_REGISTER, LABEL_HAVE_ACCOUNT } from './register.cosntants';

@Injectable()
export class RegisterService {

  private readonly fb = inject(FormBuilder);
  private router = inject(Router);

  private readonly auth = inject(AuthService);
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  public title = computed(() => 'Registrar cuenta');

  private error = signal<string | null>(null);
  public errorMessage = computed(() => this.error());

  public durationToast = computed( () => DURATION_TOAST );

  public buttonLaberRegister = computed(() => BUTTON_LABEL_REGISTER);
  public labelHaveAccount = computed(() => LABEL_HAVE_ACCOUNT);

  private isValidEmail = signal<boolean>(false);
  private equalPasswords = signal<boolean>(false);
  private containsUppercase = signal<boolean>(false);
  private containsLowercase = signal<boolean>(false);
  private containsNumber = signal<boolean>(false);
  private minLength = signal<boolean>(false);

  public registerForm = this.fb.nonNullable.group({
    email: this.fb.control<string>('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
    password: this.fb.control<string>('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPassword: this.fb.control<string>('', [Validators.required])
  });

  private passwordHaved = signal<boolean>(false);
  private confirmPasswordHaved = signal<boolean>(false);


  public isValidForm = computed(() => {
    return this.isValidEmail() && this.equalPasswords() && this.containsUppercase() && this.containsLowercase() && this.containsNumber() && this.minLength();
  })

  public showValidations = computed(() => (!this.minLength() || !this.containsUppercase() || !this.containsLowercase() || !this.containsNumber() || !this.equalPasswords()) && (this.passwordHaved() && this.confirmPasswordHaved()) );

  public iteratorValidations = computed(() => [
    {
      message: 'La contraseña debe tener al menos 8 caracteres',
      color: this.minLength() ? 'success' : 'danger',
      icon: this.minLength() ? 'checkmark-circle' : 'close-circle'
    },
    {
      message: 'La contraseña debe contener al menos una letra mayúscula',
      color: this.containsUppercase() ? 'success' : 'danger',
      icon: this.containsUppercase() ? 'checkmark-circle' : 'close-circle'
    },
    {
      message: 'La contraseña debe contener al menos una letra minúscula',
      color: this.containsLowercase() ? 'success' : 'danger',
      icon: this.containsLowercase() ? 'checkmark-circle' : 'close-circle'
    },
    {
      message: 'La contraseña debe contener al menos un número',
      color: this.containsNumber() ? 'success' : 'danger',
      icon: this.containsNumber() ? 'checkmark-circle' : 'close-circle'
    },
    {
      message: 'Las contraseñas deben coincidir',
      color: this.equalPasswords() ? 'success' : 'danger',
      icon: this.equalPasswords() ? 'checkmark-circle' : 'close-circle'
    }
  ]);


  constructor() {
    this.valueChangesConfirmPassword();
    this.valueChangesPassword();
    this.valueChangesEmail();
  }

  public async onSubmit(){
    if(!this.validateForm()) {
      this.error.set('Por favor, complete el formulario correctamente');
      return;
    }
    const {email,password} =this.registerForm.getRawValue();
    if(!email || !password) return;
    await this.register(email, password);
  }

  private validateForm(): boolean {
    return this.isValidForm();
  }

  private async register(email: string, password: string){
    this.error.set(null);
    try {
      await this.auth.registerWithEmail(email, password);
      this.router.navigate(['/tabs']);
      this.error.set(null);
    } catch (error: any) {
      const errorCode = error.code; // ej: "auth/invalid-credential"
      let friendlyMessage = 'Ocurrió un error al registrar el usuario';

      switch (errorCode) {
        case 'auth/email-already-in-use':
          friendlyMessage = 'El correo ya está en uso';
          break;
        case 'auth/invalid-email':
          friendlyMessage = 'El formato del correo no es válido';
          break;
        case 'auth/operation-not-allowed':
          friendlyMessage = 'El proveedor de autenticación no está habilitado';
          break;
        case 'auth/weak-password':
          friendlyMessage = 'La contraseña es demasiado débil';
          break;
        default:
          friendlyMessage = 'Error desconocido: ' + errorCode;
          break;
      }
      this.error.set(friendlyMessage);
    }
  }

  private valueChangesConfirmPassword() {
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe({
      next: (value) => {
        if (!value) {
          this.equalPasswords.set(false);
          this.confirmPasswordHaved.set(false);
          return;
        }
        const password = this.registerForm.get('password')?.value;
        this.confirmPasswordHaved.set(true);
        this.equalPasswords.set(value === password);
      }
    })
  }

  private valueChangesPassword() {
    this.registerForm.get('password')?.valueChanges.subscribe({
      next: (value) => {
        if(!value) {
          this.containsUppercase.set(false);
          this.containsLowercase.set(false);
          this.containsNumber.set(false);
          this.minLength.set(false);
          this.equalPasswords.set(false);
          this.passwordHaved.set(false);
          return;
        }
        this.containsUppercase.set(/[A-Z]/.test(value));
        this.containsLowercase.set(/[a-z]/.test(value));
        this.containsNumber.set(/\d/.test(value));
        this.minLength.set(value.length >= 8);
        const {confirmPassword} = this.registerForm.getRawValue();
        this.equalPasswords.set(value === confirmPassword && confirmPassword !== '');
        this.passwordHaved.set(true);
      }
    })
  }

  private valueChangesEmail() {
    this.registerForm.get('email')?.valueChanges.subscribe({
      next: (value) => {
        if(!value) {
          this.isValidEmail.set(false);
          return;
        }
        this.isValidEmail.set(EMAIL_REGEX.test(value));
      }
    });
  }
}
