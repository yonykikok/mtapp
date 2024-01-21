import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/user';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { roles } from 'src/app/services/info-compartida.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mostrarInputClave = false;
  formUser = new FormGroup({
    dni: new FormControl('', [Validators.required, this.validDniNumber]),
    password: new FormControl('', []),
  });
  constructor(private router: Router,
    private database: DataBaseService,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  preLogin() {
    let user: any = this.formUser.value;
    if (user.dni) {

      try {

        var suscripcion = this.database.obtenerPorId('users', user.dni.toString()).subscribe(async (res: any) => {
          const auxUser = res.payload.data();

          if (!res.payload.exists && user.dni) {//si no existe lo creamos.
            user['activo'] = false;
            user['fechaCreacion'] = new Date();
            user['role'] = roles.CLIENTE;
            await this.database.crearConCustomId('users', user.dni.toString(), this.formUser.value);

            this.alertService.alertSinAccion('Bienvenido!!',
              'Gracias por sumarte a nuestra comunidad, una ves finalizada el registro podras acceder a todos los sectores de la App.',
              'Ok');
          }

          this.authService.setCurrentUser(user)

          if (auxUser && auxUser.password) {
            this.mostrarInputClave = true;
          } else {
            this.router.navigate(['/home']);
            suscripcion.unsubscribe();
          }

        });

      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(() => {
      // this.router.navigate(['/home']);
    }, 1000);
  }
  validDniNumber(control: AbstractControl) {
    if (
      !Number.isInteger(control.value) ||
      control.value.toString().includes('e') ||
      control.value.toString().includes('.') ||
      control.value.toString().length != 8
    ) {
      return { invalidDniNumber: true }
    } else {
      return null;
    }
  }

  ingresar() {
    let formUser = this.formUser.value;
    if (formUser.dni) {

      var suscripcion = this.database.obtenerPorId('users', formUser.dni.toString()).subscribe((res: any) => {
        const auxUser = res.payload.data();

        if (!res.payload.exists) {
          return;
        }

        if (formUser.password) {
          if (this.authService.compararPassword(formUser.password.toString())) {
            this.router.navigate(['/home']);
            this.authService.setCurrentUser(formUser);
          } else {
          }
          this.mostrarInputClave = false;
        }
        suscripcion.unsubscribe();
      });
    }
  }


  async onGoogleLogin() {
    try {
      const user:any = await this.authService.loginWithGoogle();
      console.log(user);
      console.log("paso")
      if (user) {
        this.checkUserIsVerified(user);
      }
    } catch (err) {
      // this.snackBar.open('Error, No se pudo iniciar sesion con Google', 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
    }
  }

  private checkUserIsVerified(user: User): boolean {
    if (user && !user.emailVerified) {
      this.router.navigate(['/verification-email']);
      return false;
    }
    else if (user && user.emailVerified) {
      this.router.navigate(['/home']);
      return true;
    } else {
      return false;
    }
  }

}
