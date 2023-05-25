import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    autoplay: true,
  }



  reparaciones;
  reparacionesAMostrar
  

  constructor() {
  }


}

