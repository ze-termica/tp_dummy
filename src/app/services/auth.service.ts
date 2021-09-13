import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      console.log('p0');
      if (user) {
        this.userData = user;
        // localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['home']);
        console.log('p1');
      } else {
        // localStorage.setItem('user', null);
        this.router.navigate(['login']);
        console.log('p2');
      }
    });
  }

  // Login in with email/password
  async signIn(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
      this.userData = user;
    });
  }

  // Register user with email/password
  registerUser(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Recover password
  passwordRecover(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail.value).then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((err) => {
      window.alert(err)
    });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Auth providers
  async authLogin(provider) {
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      this.ngZone.run(() => this.router.navigate(['home']));
      this.setUserData(result.user);
    } catch (err) {
      window.alert(err);
    }
  }

  // Store user in localStorage
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  async sendVerificationMail() {
    await this.afAuth.currentUser.then(user => {
      user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email']);
      });
    });
  }

  // Sign-out 
  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}