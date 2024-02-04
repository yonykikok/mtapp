import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajustes-de-repuestos',
  templateUrl: './ajustes-de-repuestos.page.html',
  styleUrls: ['./ajustes-de-repuestos.page.scss'],
})
export class AjustesDeRepuestosPage implements OnInit, OnDestroy {
  loggedUser!: User;
  constructor(private authService: AuthService,
    private database: DataBaseService,
    private router: Router,
    private menuController: MenuController) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  volverAlHome() {
    this.router.navigate(['/home']);
    this.menuController.toggle('first-menu')
    this.menuController.enable(true, 'first-menu');
  }
  seleccionar(categoria: string, subCategoria: string) {

  }
  ngOnDestroy(): void {

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
