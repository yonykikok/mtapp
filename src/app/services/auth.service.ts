import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Md5 } from 'ts-md5';
import firebaseApp from 'firebase/compat/app';
import { DataBaseService } from './database.service';
import { User } from '../clases/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  public user$: Observable<User>;
  public userData;

  constructor(private database: DataBaseService,
    public afAuth: AngularFireAuth, private afs: AngularFirestore,) { }

  setCurrentUser(user) {
    this.database.obtenerPorId('users', user.dni.toString()).subscribe(userRef => {
      this.currentUser = userRef.payload.data();
    });

  }


  compararPassword(password) {
    let hashPassword = Md5.hashStr(password);
    console.log(hashPassword + " " + this.currentUser.password);
    if (hashPassword === this.currentUser.password) {
      return true;
    }

    return false;
  }

  generarHashPassword(password: string) {
    return Md5.hashStr(password);
  }

  async loginWithGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebaseApp.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (err) {
      // this.snackBar.open('Error, iniciar sesion con Google ', 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
      return null;
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    userRef.get().subscribe(res => {
      const userData = res.data();
      let data: User;

      data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }

      !userData?.role
        ? data['role'] = 'CLIENTE'
        : null;

      this.userData = data;

      return userRef.set(data, { merge: true });
    });
  }
  getCurrentUser() {
    return this.afAuth.authState;
  }
}
