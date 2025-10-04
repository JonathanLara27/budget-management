import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, setPersistence, signInWithPopup, signOut, browserLocalPersistence, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, sendPasswordResetEmail, User } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { DocumentData, DocumentReference, Firestore, doc, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);

  private readonly router = inject(Router);

  private readonly firestore = inject(Firestore);

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

  private setUserDate(userRef:DocumentReference<DocumentData,DocumentData> , user: User){
    return setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  public async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);
    const user = credential.user;
    
    //verificamos si ya existe el usuario
    const userRef = doc(this.firestore, `users/${user.uid}`);
    const snap = await getDoc(userRef);
    if(snap.exists()) return;
    await this.setUserDate(userRef, user);
  }

  public async logout() {
    await signOut(this.auth);
    await this.router.navigate(['/login']);
  }

  public async registerWithEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  public async loginWithEmail(email: string, password: string): Promise<UserCredential | { code: number, message: string }> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  //olvidaste tu contraseña
  public async sendPasswordResetEmail(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      return { code: 200, message: 'Se ha enviado un correo para restablecer la contraseña' };
    } catch (error) {
      return { code: 500, message: 'Error al enviar el correo de restablecimiento de contraseña' };
    }
  }

  //ver dispositivos conectados a la cuenta
  public getUserDevices() {
    return this.currentUser()?.metadata?.lastSignInTime;
  }

}