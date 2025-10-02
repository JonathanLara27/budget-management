import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut, browserLocalPersistence, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);

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
  }

  //Registrar con correo y contraseña
  async registerWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Login con correo y contraseña
  // Login con correo y contraseña
  async loginWithEmail(email: string, password: string): Promise<UserCredential | {code: number, message: string}> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
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

      console.error('Error en loginWithEmail:', errorCode, error.message);
      return { code: errorCode, message: friendlyMessage };
    }
  }



}