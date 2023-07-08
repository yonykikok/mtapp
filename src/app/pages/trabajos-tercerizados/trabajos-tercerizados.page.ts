import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';

interface trabajoTercerizado {
  fecha: number,
  modelo: string,
  trabajo: string,
  boleta: number,
  detallesDelEquipo: string,
  fechaRetiro: number,
  costo: number,
  precio: number
}
@Component({
  selector: 'app-trabajos-tercerizados',
  templateUrl: './trabajos-tercerizados.page.html',
  styleUrls: ['./trabajos-tercerizados.page.scss'],
})
export class TrabajosTercerizadosPage implements OnInit {
  loggedUser;
  trabajosTercerizados: trabajoTercerizado[] = [{
    boleta: 4040,
    costo: 1500, 
    detallesDelEquipo: 'tapa despegada',
    fecha: Date.now(),
    fechaRetiro: Date.now() + 545545,
    modelo: 'J7 prime',
    precio: 3000,
    trabajo: 'Liberacion'
  },
  {
    boleta: 4150,
    costo: 1800, 
    detallesDelEquipo: '',
    fecha: Date.now(),
    fechaRetiro: null,
    modelo: 'A20',
    precio: 3600,
    trabajo: 'Liberacion'
  }];
  constructor(
    private authService: AuthService,
    private database: DataBaseService,
  ) { }

  ionViewDidEnter(): void {
    this.getCurrentUser()
  }
  ngOnInit() {
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
      })
    })
  }


  async abrirFormTrabajoTercerizado() {

  }
}
