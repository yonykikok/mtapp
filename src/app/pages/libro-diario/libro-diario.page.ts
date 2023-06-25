import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
import { FormDetalleVentaComponent, MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-libro-diario',
  templateUrl: './libro-diario.page.html',
  styleUrls: ['./libro-diario.page.scss'],
})
export class LibroDiarioPage implements OnInit {

  montoInicialOriginal;
  mostrarModalCierreDeCaja = false;
  resultadoDeCaja = null;
  montoDeCaja = null;
  libroDiarioHoy: LibroDiario = {
    fecha: null,
    ventas: [],
    montoInicial: 0,
    montoTotal: 0,
    cuadra: false,
    fechaString: '',
    montoTotalEfectivo: 0,
    montoTotalMercadoPago: 0,
    montoTotalTransferencia: 0,
    montoTotalNegativo: 0
  }
  mostrarMontoInicial = true;
  montoIngresado;
  loggedUser: User;
  esteMes;

  constructor(private authService: AuthService,
    private database: DataBaseService,
    public funcionesUtiles: FuncionesUtilesService,
    // private dialog: MatDialog,
    // private confirmDialog: ConfirmDialogService
    private modalController: ModalController,
    private alertService: AlertService
  ) {
    this.getCurrentUser();

  }

  ngOnInit(): void {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let newDate = new Date();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();

    let subscripcion = this.database.obtenerPorId(environment.TABLAS.ingresosBrutos, `${month}${year}`).subscribe(async (res) => {
      if (!res.payload.exists) {
        await this.database.actualizar(environment.TABLAS.ingresosBrutos, {}, `${month}${year}`);
        subscripcion.unsubscribe();
        return;
      }

      this.esteMes = res.payload.data();
      this.esteMes['id'] = res.payload.id;

      let hoy = new Date();
      hoy.setHours(0);
      hoy.setMinutes(0);
      hoy.setSeconds(0);
      let libroDiarioDeHoy = this.esteMes.dias?.find(dia => new Date(dia.fecha).toString() == hoy.toString());
      if (libroDiarioDeHoy) {
        this.libroDiarioHoy = libroDiarioDeHoy;
      } else {
        let nuevoLibroDiario = this.obtenerNuevoLibroDiario();//aca debe estar el problema

        this.esteMes.dias = [...this.esteMes.dias, nuevoLibroDiario];
        this.database.actualizar(environment.TABLAS.ingresosBrutos, this.esteMes, this.esteMes.id);
      }
      this.montoInicialOriginal = this.libroDiarioHoy.montoInicial;
      this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Efectivo);
    });

  }
  async cargarMontoInicial() {
    this.libroDiarioHoy.montoInicial = Number(this.montoIngresado);
    let libroDiario = this.obtenerNuevoLibroDiario();
    if (!this.esteMes.dias) {
      this.esteMes['dias'] = [libroDiario];
      await this.database.actualizar(environment.TABLAS.ingresosBrutos, this.esteMes, this.esteMes.id);
    } else {
      let diarioDeHoy = this.esteMes.dias.find(dia => {
        if (new Date(dia.fecha).toString() == new Date(libroDiario.fecha).toString()) {
          return dia;
        }
      });

      if (!diarioDeHoy) {
        this.esteMes['dias'] = [...this.esteMes['dias'], libroDiario];
      }
    }
  }
  obtenerNuevoLibroDiario() {
    let hoy = new Date();
    hoy.setHours(0);
    hoy.setMinutes(0);
    hoy.setSeconds(0);

    let libroDiario = {
      fecha: hoy.getTime(),
      fechaString: hoy.toString(),
      ventas: [],
      montoInicial: Number(this.montoIngresado) | 0,
      montoTotal: Number(this.montoIngresado) | 0,
      cuadra: false
    }
    return libroDiario;
  }

  showConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmación', `La caja inicial es: $${this.montoIngresado}?`, 'Si, confirmo', this.cargarMontoInicial.bind(this));
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
  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: FormDetalleVentaComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


        if (result.role == 'guardarItems') {

          if (!this.libroDiarioHoy.montoTotalEfectivo) {
            this.libroDiarioHoy.montoTotalEfectivo = Number(this.libroDiarioHoy.montoInicial);
          }

          this.libroDiarioHoy.ventas = [...this.libroDiarioHoy.ventas, ...result.data];
          this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Efectivo);//total en efectivo
          this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Transferencia);//total en efectivo
          this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.MercadoPago);//total en efectivo
          this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(this.libroDiarioHoy);//total negativo

          this.database.actualizar(environment.TABLAS.ingresosBrutos, this.esteMes, this.esteMes.id);
        }

      })
      return await modal.present();
    } catch (err) {
    }





  }

  obtenerMontoTotalPorMedioDePago(libroDiarioHoy, medioDePago: MediosDePago) {
    let acumulador = 0;
    libroDiarioHoy.ventas.forEach((venta) => {
      if (venta.medioDePago == medioDePago) {
        acumulador += venta.precio;
      }
    });
    return acumulador;
  }

  comprobar() {
    this.resultadoDeCaja = (this.libroDiarioHoy.montoTotalEfectivo + this.libroDiarioHoy.montoInicial) - this.montoDeCaja;
  }
  detenerPropagacion(e) {
    e.stopPropagation();
  }
  reiniciarMontoInicialDeCaja() {
    this.libroDiarioHoy.montoInicial = null;
  }
  obtenerMontoTotalPorNegativo(libroDiarioHoy) {
    let acumuladorNegativo = 0;
    libroDiarioHoy.ventas.forEach((venta) => {
      if (venta.precio < 0) {
        acumuladorNegativo += venta.precio;
      }
    });
    return acumuladorNegativo;
  }


}
