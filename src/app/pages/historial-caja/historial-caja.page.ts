import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { BusquedaPorTextoComponent } from 'src/app/components/busqueda-por-texto/busqueda-por-texto.component';
import { DetalleVentasDelDiaComponent } from 'src/app/components/detalle-ventas-del-dia/detalle-ventas-del-dia.component';
import { MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-historial-caja',
  templateUrl: './historial-caja.page.html',
  styleUrls: ['./historial-caja.page.scss'],
})
export class HistorialCajaPage implements OnInit {
  // mostarSideBar=false;
  mostrarAcciones = false;

  textoABuscar;
  mostrarBuscador = false;
  itemsFiltrados;
  itemSeleccionado;

  fechaSeleccionada: Date | null;
  fechaSeleccionadaDate: Date | null;
  libroDiario;
  loggedUser;
  mesSeleccionado;
  dataLibroDiarioDialog;

  precioDolarBlue: number | null = null;
  dolarObservable$: Observable<number> | null = null;
  constructor(private authService: AuthService, private database: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController,
    private router: Router,
    public funcionesUtiles: FuncionesUtilesService) {
    this.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }
    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);


  }
  updateCalcs(e) {
    this.mostrarAcciones = true;
    let fecha = new Date(this.fechaSeleccionadaDate);
    fecha.setHours(0, 0, 0, 0);
    this.fechaSeleccionada = fecha
  }

  transformarFecha() {
    return new Date(this.fechaSeleccionada).toLocaleString();
  }
  applyFilter() {
    //TODO: continuar desde aqui.
    //tenemos coincidencias por texto y/o boleta falta generar una vista para estos items.
    let items = [];

    this.mesSeleccionado.dias.forEach(dia => {
      dia.ventas.forEach(venta => {
        if (venta.descripcion.toLowerCase().includes(this.textoABuscar.toLowerCase()) ||
          venta.boleta == this.textoABuscar) {
          let auxVenta = { ...venta };
          auxVenta['fecha'] = dia.fecha;
          auxVenta['fechaString'] = dia.fechaString;

          items.push(auxVenta)
        }
      });
    });
    this.itemsFiltrados = items;
    this.scrollToElement(null, '#filtroBusquedaHistorial');

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
  mostrarHistorial() {
    this.mesSeleccionado = null;
    if (!this.fechaSeleccionada) {
      this.toastService.simpleMessage('', 'Seleccione una fecha', ToastColor.warning);
      return
    };

    let documentId = this.obtenerMesId();

    let subscripcion = this.database.obtenerPorId(environment.TABLAS.ingresosBrutos, documentId).subscribe(async (res) => {
      if (!res.payload.exists) {
        this.toastService.simpleMessage('Sin datos', 'Este dia no tiene datos', ToastColor.secondary);
        subscripcion.unsubscribe();
        return;
      }
      this.mesSeleccionado = res.payload.data();
      this.mesSeleccionado['id'] = res.payload.id;

      let libroDiarioSeleccionado = this.mesSeleccionado.dias?.find(dia =>
        new Date(dia.fecha).toString() == this.fechaSeleccionada.toString());


      if (libroDiarioSeleccionado && libroDiarioSeleccionado.ventas && libroDiarioSeleccionado.ventas.length > 0) {
        this.libroDiario = libroDiarioSeleccionado;
      } else {
        this.toastService.simpleMessage('', 'El dia seleccionado no tiene vetas', ToastColor.warning);
        this.libroDiario = null;
        this.mesSeleccionado = null;
        return;
      }

      this.mostrarDialogLibroDiario(this.libroDiario);

    });
  }
  async mostrarDialogLibroDiario(libroDiario) {
    try {
      const modal = await this.modalController.create({
        component: DetalleVentasDelDiaComponent,
        componentProps: {
          libroDiario,
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  mostrarMesCompleto(mostrarBuscador) {
    mostrarBuscador ? this.mostrarBuscador = true : this.mostrarBuscador = false;

    // this.obtenerCotizacionDelDolarActual();
    this.libroDiario = null;
    if (!this.fechaSeleccionada) {
      this.toastService.simpleMessage('', 'Seleccione una fecha', ToastColor.warning);
      return
    };
    let documentId = this.obtenerMesId();

    let subscripcion = this.database.obtenerPorId(environment.TABLAS.ingresosBrutos, documentId).subscribe(async (res) => {
      if (!res.payload.exists) {
        this.toastService.simpleMessage('', 'Este mes no tiene datos', ToastColor.warning);
        this.mesSeleccionado = null;
        subscripcion.unsubscribe();
        return;
      }
      this.mesSeleccionado = res.payload.data();
      console.log(res)
      console.log(res.payload.data())
      this.mesSeleccionado['id'] = res.payload.id;
      this.mesSeleccionado['dias'] = this.mesSeleccionado['dias'].filter(dia => dia.montoTotalEfectivo > 0);

      this.mesSeleccionado['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo);
      this.mesSeleccionado['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia);
      this.mesSeleccionado['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago);
      this.mesSeleccionado['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo();

      this.mesSeleccionado.dias = this.mesSeleccionado.dias.sort((diaA, diaB) => {
        if (diaA.fecha > diaB.fecha) {
          return 1
        } else if (diaA.fecha < diaB.fecha) {
          return -1
        } else {
          return 0;
        }
      });

      mostrarBuscador ? this.mostrarBuscadorPorTexto() : null;
    });

  }
  obtenerMesId() {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[this.fechaSeleccionada.getMonth()];
    let year = this.fechaSeleccionada.getFullYear();
    return `${month}${year}`;
  }

  getMontoTotalMensualNegativo() {
    return this.mesSeleccionado.dias.reduce((monto, dia) => {
      if (dia.montoTotalNegativo <= 0) {
        return monto += dia.montoTotalNegativo;
      }

    }, 0);
  }

  getMontoTotalMensual(medioDePago) {
    return this.mesSeleccionado.dias.reduce((monto, dia) => {
      switch (medioDePago) {
        case MediosDePago.Transferencia:
          return monto += dia.montoTotalTransferencia;
        case MediosDePago.MercadoPago:
          return monto += dia.montoTotalMercadoPago;
        default:
          if (dia.montoTotalEfectivo > 0) {
            return monto += dia.montoTotalEfectivo;
          }
      }
    }, 0);
  }

  // reajustarMontos(mostrarBuscador) {
  //   mostrarBuscador ? this.mostrarBuscador = true : this.mostrarBuscador = false;

  //   // this.obtenerCotizacionDelDolarActual();
  //   this.libroDiario = null;
  //   if (!this.fechaSeleccionada) {
  //     this.snackBar.open('Seleccione una fecha', 'Cerrar', { duration: 5000, panelClass: ['warnSnackBar'] });
  //     return
  //   };
  //   let documentId = this.obtenerMesId();

  //   let subscripcion = this.database.obtenerPorId(environment.TABLAS.ingresosBrutos, documentId).subscribe(async (res) => {
  //     if (!res.payload.exists) {
  //       this.snackBar.open('Este mes no tiene datos', 'Cerrar', { duration: 5000, panelClass: ['infoSnackBar'] });
  //       this.mesSeleccionado = null;
  //       subscripcion.unsubscribe();
  //       return;
  //     }

  //     this.mesSeleccionado = res.payload.data();
  //     this.mesSeleccionado['id'] = res.payload.id;
  //     this.mesSeleccionado['dias'] = this.mesSeleccionado['dias'].filter(dia => dia.montoTotal > 0);

  //     this.mesSeleccionado['montoTotalMensual'] = this.mesSeleccionado.dias.reduce((monto, dia) => {
  //       dia['saldoPositivo'] = 0;
  //       dia['saldoNegativo'] = 0;
  //       dia.ventas.forEach(venta => {
  //         if (venta.precio > 0) {
  //           dia['saldoPositivo'] = dia['saldoPositivo'] + venta.precio;
  //         } else {
  //           dia['saldoNegativo'] = dia['saldoNegativo'] + venta.precio;
  //         }
  //       });

  //       return monto += dia.montoTotal;
  //     }, 0);



  //     this.mesSeleccionado.dias = this.mesSeleccionado.dias.sort((diaA, diaB) => {
  //       if (diaA.fecha > diaB.fecha) {
  //         return 1
  //       } else if (diaA.fecha < diaB.fecha) {
  //         return -1
  //       } else {
  //         return 0;
  //       }
  //     });
  //   });

  // }



  scrollToElement(e, id) {
    e?.preventDefault();
    setTimeout(() => {
      this.funcionesUtiles.scrollToElement(id);
    }, 200);
  }

  async mostrarBuscadorPorTexto() {

    try {
      const modal = await this.modalController.create({
        component: BusquedaPorTextoComponent,
        componentProps: {
          mesSeleccionado: this.mesSeleccionado,
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }
}

