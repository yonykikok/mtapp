import { Component, OnInit } from '@angular/core';
import { Roles, User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {
  loggedUser!:User;
  modulos: { titulo: string, color: string, ruta: string, role: Roles }[] = [
    { titulo: 'Modulos', color: '#28a745', ruta: "/lista-modulos", role: 'CLIENTE' },
    { titulo: 'Baterias', color: '#ffc107', ruta: "/lista-baterias", role: 'CLIENTE' },
    { titulo: 'Flex de carga', color: '#d34fb2', ruta: "/lista-flex-de-carga", role: 'CLIENTE' },
    { titulo: 'Tactiles', color: '#42688a', ruta: "/lista-tactiles", role: 'CLIENTE' },
    { titulo: 'Display', color: '#238386', ruta: "/lista-displays", role: 'CLIENTE' },

    // { titulo: 'Mis reparaciones', color: '#d34fb2', ruta: "/mis-reparaciones", role: 'CLIENTE' },
  ]
  constructor(public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService,
    private database: DataBaseService) { }

  ngOnInit() {
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
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
}
