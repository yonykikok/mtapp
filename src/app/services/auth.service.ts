import { Injectable } from '@angular/core';
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
}
