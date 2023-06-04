import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
})
export class VerificationCodeComponent implements OnInit {
  newCode = false;
  codigoIncorrecto = false;
  securityCode = ['', '', '', '', '', ''];
  teclas = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  posicion = 0;
  loggedUser;
  modo;


  newSecurityCode = {
    firstSecurityCode: "",
    repeatSecurityCode: ""
  }
  constructor(private modalController: ModalController,
    private toastService: ToastService,
    private alertService: AlertService
  ) {
    // this.loggedUser = data.loggedUser;
    // this.modo = data.modo;
    // this.newCode = data.newCode;
  }

  ngOnInit(): void {
  }
  agregarDigito(digito, indice) {
    if (this.posicion < 6) {
      this.securityCode[this.posicion] = digito;
      this.posicion++;
    }

    if (this.posicion == 6) {
      let codigoIngresado = this.securityCode.reduce((securityCode: any, digito) => securityCode += digito);
      if (this.newCode) {
        this.crearNuevoCodigo(codigoIngresado);
      } else {
        this.verificarCodigo(codigoIngresado);
      }

    }
  }

  verificarCodigo(codigo) {
    if (this.modo == "output") {
      this.modalController.dismiss({ codigo });
      return;
    }
    if (this.loggedUser.securityCode == codigo) {
      this.modalController.dismiss({},'codigoCorrecto' );
    } else {
      this.codigoIncorrecto = true;
      setTimeout(() => {
        this.codigoIncorrecto = false;
        this.securityCode = ['', '', '', '', '', ''];
        this.posicion = 0;
      }, 500);
      this.toastService.simpleMessage('Codigo incorrecto','El codigo no es valido',ToastColor.danger);
    }
  }
  borrarTodo() {
    this.securityCode = ['', '', '', '', '', ''];
    this.posicion = 0;
  }


  borrarDigito() {
    this.posicion--;
    this.securityCode[this.posicion] = '';
  }

  crearNuevoCodigo(codigoIngresado) {
    if (!this.newSecurityCode.firstSecurityCode) {
      this.newSecurityCode.firstSecurityCode = codigoIngresado;
      this.borrarTodo();
    } else {
      this.newSecurityCode.repeatSecurityCode = codigoIngresado;
      this.verificarSiCoinciden();
    }

  }

  verificarSiCoinciden() {
    if (this.newSecurityCode.firstSecurityCode == this.newSecurityCode.repeatSecurityCode) {
      this.showConfirmDialog();
    } else {
      this.newSecurityCode = {
        firstSecurityCode: "",
        repeatSecurityCode: ""
      };
      this.toastService.simpleMessage('No coincide', 'Los codigos no coinciden', ToastColor.danger);
      this.borrarTodo();
    }
  }

  showConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmacioón', `Esta seguro de crear este codigo?
    Una ves creado NO podra modificarlo!`, 'Si, crear codigo', () => {
      this.modalController.dismiss({ securityCode: this.newSecurityCode.firstSecurityCode });
      this.toastService.simpleMessage('Exito', 'Codigo de seguridad creado con exito!', ToastColor.success);
    });
  }
}