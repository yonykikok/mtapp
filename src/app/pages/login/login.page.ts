import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mostrarInputClave = false;
  formUser = new FormGroup({
    dni: new FormControl('3775513', [Validators.required, this.validDniNumber]),
    password: new FormControl('', []),
  });
  constructor(private router: Router,
    private database: DataBaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  preLogin() {
    console.log(this.formUser.value)
    let user = this.formUser.value;
    try {

      var suscripcion = this.database.obtenerPorId('users', user.dni.toString()).subscribe(async (res: any) => {
        const auxUser = res.payload.data();

        if (!res.payload.exists) {//si no existe lo creamos.
          user['activo'] = false;
          user['fechaCreacion']=new Date();
          let res = await this.database.crearConCustomId('users', user.dni.toString(), this.formUser.value);
          console.log("se creo el nuevo usuario")
        }

        this.authService.setCurrentUser(user)

        if (auxUser.password) {
          this.mostrarInputClave = true;
        } else {
          this.router.navigate(['/home']);
          suscripcion.unsubscribe();
        }

      });

    } catch (err) {
      console.log(err);
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
    var suscripcion = this.database.obtenerPorId('users', formUser.dni.toString()).subscribe((res: any) => {
      const auxUser = res.payload.data();

      if (!res.payload.exists) {
        return;
      }
      // if (auxUser.password.toString().toLowerCase() === formUser.password.toString().toLowerCase()) {
      if (this.authService.compararPassword(formUser.password.toString())) {
        this.router.navigate(['/home']);
        this.authService.setCurrentUser(formUser);
      } else {
        alert("Password incorrecto te queda 3 intentos.");
      }
      this.mostrarInputClave = false;
      suscripcion.unsubscribe();
    });
  }

}
