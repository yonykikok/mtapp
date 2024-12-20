import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from '../services/database.service';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { EncuestaCalificacionComponent } from '../components/encuesta-calificacion/encuesta-calificacion.component';
import { FuncionesUtilesService } from '../services/funciones-utiles.service';
import { environment } from 'src/environments/environment';
import { User } from '../clases/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userLogged!: User;
  slideOpts = {
    autoplay: true,
  }



  reparaciones: any[] = [];
  reparacionesAMostrar: any[] = [];

  isMobile: boolean = false;
  viewportWidth!: number;

  constructor(private modalController: ModalController,
    public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService,
    private database: DataBaseService,
    private router: Router,
    private menuController: MenuController,
    private platform: Platform) {

    this.checkViewport();
    this.getCurrentUser();
    // this.mostrarFormulario();
  }

  NgOnInit() {


  }
  @HostListener('window:resize', [])
  onResize() {
    this.checkViewport(); // Actualiza el valor si cambia el tamaño de la ventana
  }

  private checkViewport() {
    this.viewportWidth = window.innerWidth;
    // this.isMobile = this.platform.is('mobile') || this.platform.is('mobileweb');
  }
  salir() {
    this.authService.currentUser = null;
  }
  ngOnInit(): void {
    // this.agregarALaDBDiasNoCargados();
  }


  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.userLogged = {
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

  irAajustesDeRepuestos() {
    this.router.navigate(['/ajustes-de-repuestos'], { skipLocationChange: true }).then(() => {
      // Navega a '/home' nuevamente para recargar la página
      this.router.navigate(['/ajustes-de-repuestos']);
    });
  }
  async mostrarFormulario() {
    let modal = this.modalController.create({
      component: EncuestaCalificacionComponent
    })

      ; (await modal).present();
  }
  redirecionarA(ruta: string) {
    console.log("entra a", ruta)
    window.open(ruta, '_blank');
  }

  abrirWhatsApp(e: Event, telefono: any) {
    e.stopPropagation();
    let mensaje: string = 'Hola! Me comunico desde el acceso rapido de su web oficial.';
    const url = `https://api.whatsapp.com/send?phone=+54${telefono}&text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_system');
  }


}

