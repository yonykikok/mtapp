import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formUser = new FormGroup({
    dni: new FormControl('', [Validators.required, this.validDniNumber]),
  });
  constructor(private router: Router,
    private database: DataBaseService) { }

  ngOnInit() {
  }

  preLogin() {
    console.log(this.formUser.value)
    let user = this.formUser.value;
    try {

      var suscripcion = this.database.obtenerPorId('users', user.dni.toString()).subscribe(async (res) => {
        if (!res.payload.exists) {
          user['activo'] = false;
          let res = await this.database.crearConCustomId('users', user.dni.toString(), this.formUser.value);
          console.log("se creo el nuevo usuario")
        }
        this.router.navigate(['/home']);
        suscripcion.unsubscribe();
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


}
