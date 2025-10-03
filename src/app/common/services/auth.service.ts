import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut, browserLocalPersistence, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, sendPasswordResetEmail } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);

  private readonly router = inject(Router);

  // Observable para guards
  authState$ = authState(this.auth); // ✅ ya es Observable<User | null>

  // Estado de usuario como signal
  currentUser = toSignal(this.authState$, { initialValue: null });

  constructor() {
    // Initialization moved out of constructor to avoid async call here
    this.initialize();
  }

  private initialize() {
    // Call the async init without awaiting to avoid async in constructor
    this.init();
  }

  private async init() {
    await setPersistence(this.auth, browserLocalPersistence);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async logout() {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }

  //Registrar con correo y contraseña
  async registerWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login con correo y contraseña
  // Login con correo y contraseña
  async loginWithEmail(email: string, password: string): Promise<UserCredential | { code: number, message: string }> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  //olvidaste tu contraseña
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return { code: 200, message: 'Se ha enviado un correo para restablecer la contraseña' };
    } catch (error) {
      return { code: 500, message: 'Error al enviar el correo de restablecimiento de contraseña' };
    }
  }
}