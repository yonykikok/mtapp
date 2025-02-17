import { Component, OnInit } from '@angular/core';
import { Roles, User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reparaciones-new-version',
  templateUrl: './reparaciones-new-version.page.html',
  styleUrls: ['./reparaciones-new-version.page.scss'],
})
export class ReparacionesNewVersionPage implements OnInit {
  selectedSegment: string = 'modulos'; // Valor inicial del segmento seleccionado



  loggedUser!: User;
  modulos: { titulo: string, color: string, ruta: string, role: Roles, img: string }[] = [
    { titulo: 'Modulos', color: 'rgb(156 242 206);', ruta: "modulos", role: 'CLIENTE', img: '/assets/svg/icons/modulos.png' },
    { titulo: 'Baterias', color: 'rgb(156 242 206);', ruta: "baterias", role: 'CLIENTE', img: '/assets/svg/icons/baterias.png' },
    { titulo: 'Flex de carga', color: 'rgb(156 242 206);', ruta: "flex", role: 'CLIENTE', img: '/assets/svg/icons/placaDeCarga.png' },
    { titulo: 'Glass + Oca', color: 'rgb(156 242 206);', ruta: "glass", role: 'EMPLEADO', img: 'https://i.ebayimg.com/images/g/1AsAAOSw0tBk0~dZ/s-l1600.png' },
    { titulo: 'Tapas', color: 'rgb(156 242 206);', ruta: "tapas", role: 'EMPLEADO', img: 'https://spainelectro.com/11844-medium_default/pantalla-iphone-13-oled.jpg' },
    { titulo: 'Servicios', color: 'rgb(156 242 206);', ruta: "servicios", role: 'EMPLEADO', img: '/assets/svg/icons/servicios.svg' },



    // { titulo: 'Tactiles', color: '#42688a', ruta: "/lista-tactiles", role: 'CLIENTE' },
    // { titulo: 'Display', color: '#238386', ruta: "/lista-displays", role: 'CLIENTE' },

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
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value; // Actualiza el segmento seleccionado
    console.log('Segment seleccionado:', this.selectedSegment);
  }

}
