import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { DataBaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(private database: DataBaseService) { }

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
}
