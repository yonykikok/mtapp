import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Md5 } from 'ts-md5';
import firebaseApp from 'firebase/compat/app';
import { DataBaseService } from './database.service';
import { User } from '../clases/user';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  public user$: Observable<any>;
  public userData: any;

  constructor(private database: DataBaseService,
    public afAuth: AngularFireAuth, private afs: AngularFirestore,) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  // async loginWithGoogle2(): Promise<any> {implementacion vieja
  //   try {
  //     const { user } = await this.afAuth.signInWithPopup(new firebaseApp.auth.GoogleAuthProvider());
  //     this.updateUserData(user);
  //     return user;
  //   } catch (err) {
  //     console.log(err)
  //     // this.snackBar.open('Error, iniciar sesion con Google ', 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
  //     return null;
  //   }
  // }
  async loginWithGoogle() {

    const auth = getAuth();
    let result = await signInWithPopup(auth, provider)
    try {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential ? credential.accessToken : null;

      const user = result.user;
      this.updateUserData(user);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
  setCurrentUser(user: any) {
    this.database.obtenerPorId('users', user.dni.toString()).subscribe(userRef => {
      this.currentUser = userRef.payload.data();
    });
  }


  compararPassword(password: string) {
    let hashPassword = Md5.hashStr(password);
    if (hashPassword === this.currentUser.password) {
      return true;
    }

    return false;
  }

  generarHashPassword(password: string) {
    return Md5.hashStr(password);
  }



  private updateUserData(user: any) {
    console.log(user.uid)
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    userRef.get().subscribe(res => {
      const userData = res.data();
      let data: any;

      data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      console.log(res.data());

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
