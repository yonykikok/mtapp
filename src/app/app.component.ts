import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userLogged;
  constructor(private authService: AuthService) { 
    this.userLogged=this.authService.currentUser;
  }

  salir() {
    this.authService.currentUser = null;
  }
}
