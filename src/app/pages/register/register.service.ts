import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DURATION_TOAST } from 'src/app/common/constants/durationToast';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable()
export class RegisterService {

  private readonly fb = inject(FormBuilder);

  private readonly auth = inject(AuthService);
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  public title = computed(() => 'Registrar cuenta');

  private error = signal<string | null>(null);
  public errorMessage = computed(() => this.error());

  public durationToast = computed( () => DURATION_TOAST );

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  public registerForm = this.fb.nonNullable.group({
    email: this.fb.control<string>('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: this.fb.control<string>('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    confirmPassword: this.fb.control<string>('', [Validators.required])
  });

  
  private isValidEmail = signal<boolean>(false);
  private equalPasswords = signal<boolean>(false);
  private containsUppercase = signal<boolean>(false);
  private containsLowercase = signal<boolean>(false);
  private containsNumber = signal<boolean>(false);
  private minLength = signal<boolean>(false);

  public isValidForm = computed(() => {
    return this.isValidEmail() && this.equalPasswords() && this.containsUppercase() && this.containsLowercase() && this.containsNumber() && this.minLength();
  })

  public showValidations = signal<boolean>(false);

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

  //Regex para que la contraseña tenga 8 caracteres minimo, 1 mayuscula, 1 minuscula y 1 numero

  private valueChangesConfirmPassword() {
    this.registerForm.get('confirmPassword')?.valueChanges.subscribe({
      next: (value) => {
        if (!value) {
          this.equalPasswords.set(false);
          this.showValidations.set(false);
          return;
        }
        const password = this.registerForm.get('password')?.value;
        this.equalPasswords.set(value === password);
        this.showValidations.set(true);
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
          return;
        }
        this.containsUppercase.set(/[A-Z]/.test(value));
        this.containsLowercase.set(/[a-z]/.test(value));
        this.containsNumber.set(/\d/.test(value));
        this.minLength.set(value.length >= 8);
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
        this.isValidEmail.set(this.emailRegex.test(value));
      }
    });
  }
}
