import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
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
  buscarPorRangoDeFechas = false;
  // Asignar la fecha actual al atributo max
  maxFechaActual = new Date().toISOString().split('T')[0];;


  // mostarSideBar=false;
  mostrarAcciones = false;

  textoABuscar!: string;
  mostrarBuscador = false;
  itemsFiltrados: any[] = [];
  itemSeleccionado: any[] = [];

  fechaSeleccionada!: Date;
  fechaSeleccionadaFin!: Date;
  fechaSeleccionadaDate!: Date;
  fechaSeleccionadaDateFin!: Date;

  libroDiario: any;
  loggedUser!: User;
  mesSeleccionado: any;
  dataLibroDiarioDialog: any;

  precioDolarBlue: number = 0;
  dolarObservable$: Observable<number> | null = null;
  constructor(private authService: AuthService, private database: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController,
    private router: Router,
    public funcionesUtiles: FuncionesUtilesService) {
    this.getCurrentUser();
  }

  ngOnInit(): void {
    this.mostrarIntervaloDeTiempo(false);
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }
    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);


  }
  updateCalcs(e: any) {
    if (!this.fechaSeleccionadaDate) return;
    this.mostrarAcciones = true;
    let fecha = new Date(this.fechaSeleccionadaDate);
    fecha.setHours(0, 0, 0, 0);
    this.fechaSeleccionada = fecha
  }
  updateCalcsFin(e: any) {
    if (!this.fechaSeleccionadaDateFin) return;
    this.mostrarAcciones = true;
    let fecha = new Date(this.fechaSeleccionadaDateFin);
    fecha.setHours(0, 0, 0, 0);
    this.fechaSeleccionadaFin = fecha
  }

  transformarFecha() {
    if (!this.fechaSeleccionada) return;
    return new Date(this.fechaSeleccionada).toLocaleString();
  }
  applyFilter() {
    //TODO: continuar desde aqui.
    //tenemos coincidencias por texto y/o boleta falta generar una vista para estos items.
    let items: any[] = [];

    this.mesSeleccionado.dias.forEach((dia: any) => {
      dia.ventas.forEach((venta: any) => {
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
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario: User = res.payload.data() as User;
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
  // mostrarHistorial() {
  //   this.mesSeleccionado = null;
  //   if (!this.fechaSeleccionada) {
  //     this.toastService.simpleMessage('', 'Seleccione una fecha', ToastColor.warning);
  //     return
  //   };

  //   let documentId = this.obtenerMesId();

  //   let subscripcion = this.database.obtenerPorId(environment.TABLAS.ingresos, documentId).subscribe(async (res) => {
  //     if (!res.payload.exists) {
  //       this.toastService.simpleMessage('Sin datos', 'Este dia no tiene datos', ToastColor.secondary);
  //       subscripcion.unsubscribe();
  //       return;
  //     }
  //     this.mesSeleccionado = res.payload.data();
  //     this.mesSeleccionado['id'] = res.payload.id;

  //     let libroDiarioSeleccionado = this.mesSeleccionado.dias?.find((dia: any) =>
  //       new Date(dia.fecha).toString() == this.fechaSeleccionada.toString());


  //     if (libroDiarioSeleccionado && libroDiarioSeleccionado.ventas && libroDiarioSeleccionado.ventas.length > 0) {
  //       this.libroDiario = libroDiarioSeleccionado;
  //     } else {
  //       this.toastService.simpleMessage('', 'El dia seleccionado no tiene vetas', ToastColor.warning);
  //       this.libroDiario = null;
  //       this.mesSeleccionado = null;
  //       return;
  //     }

  //     this.mostrarDialogLibroDiario(this.libroDiario);

  //   });
  // }
  async mostrarDialogLibroDiario(libroDiario: any) {
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
  mostrarDiaSeleccionado() {
    const fecha = new Date(this.fechaSeleccionada);
    const idFecha = fecha.toISOString().split('T')[0];

    this.database.obtenerPorId(environment.TABLAS.ingresos, idFecha).subscribe(res => {
      let libroDiarioDelDia: LibroDiario = res.payload.data() as LibroDiario;
      libroDiarioDelDia['id'] = res.payload.id;
      console.log(res.payload.data());
      this.mostrarDialogLibroDiario(libroDiarioDelDia);
    })
  }
  mostrarIntervaloDeTiempo(mostrarBuscador: boolean) {
    if (!this.mesSeleccionado) {
      this.mesSeleccionado = { dias: [] };
    }
    // console.log("this.fechaSeleccionada", this.fechaSeleccionada)
    // console.log("this.fechaSeleccionadaFin", this.fechaSeleccionadaFin)
    this.database.getLibrosDiariosEnIntervalo(this.fechaSeleccionada, this.fechaSeleccionadaFin).then(diasListRef => {
      // this.database.getLibrosDiariosEnIntervalo('Sat Jul 09 2022 00:00:00 GMT-0300 (Argentina Standard Time)',
      //   'Fri Jan 19 2024 00:00:00 GMT-0300 (Argentina Standard Time)').then(diasListRef => {

      this.mesSeleccionado.dias = diasListRef?.map(diaRef => {
        let dia: LibroDiario = diaRef.data() as LibroDiario;
        dia['id'] = diaRef.id;
        return dia
      });
      this.mesSeleccionado['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo);
      this.mesSeleccionado['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia);
      this.mesSeleccionado['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago);
      this.mesSeleccionado['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo();
      this.mesSeleccionado['dias'] = this.mesSeleccionado.dias?.sort((diaA: any, diaB: any) => {
        if (diaA.fecha > diaB.fecha) {
          return 1
        } else if (diaA.fecha < diaB.fecha) {
          return -1
        } else {
          return 0;
        }
      });
      // this.mesSeleccionado.dias = this.mesSeleccionado.dias.filter((dia: LibroDiario) => dia.ventas.length <= 0);
      console.log(this.mesSeleccionado)

      mostrarBuscador ? this.mostrarBuscadorPorTexto() : null;
    })
  }

  mostrarMesCompleto(mostrarBuscador: boolean) {
    if (!this.mesSeleccionado) {
      this.mesSeleccionado = { dias: [] };
    }

    this.database.getLibrosDiariosMensual(this.fechaSeleccionada).then(diasListRef => {
      this.mesSeleccionado.dias = diasListRef?.map(diaRef => {
        let dia: LibroDiario = diaRef.data() as LibroDiario;
        dia['id'] = diaRef.id;
        return dia
      });
      this.mesSeleccionado['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo);
      this.mesSeleccionado['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia);
      this.mesSeleccionado['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago);
      this.mesSeleccionado['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo();
      this.mesSeleccionado['dias'] = this.mesSeleccionado.dias?.sort((diaA: any, diaB: any) => {
        if (diaA.fecha > diaB.fecha) {
          return 1
        } else if (diaA.fecha < diaB.fecha) {
          return -1
        } else {
          return 0;
        }
      });
      console.log(this.mesSeleccionado)
      mostrarBuscador ? this.mostrarBuscadorPorTexto() : null;
    })


    // // this.obtenerCotizacionDelDolarActual();
    // this.libroDiario = null;
    // if (!this.fechaSeleccionada) {
    //   this.toastService.simpleMessage('', 'Seleccione una fecha', ToastColor.warning);
    //   return
    // };
    // let documentId = this.obtenerMesId();

  }
  obtenerMesId() {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[this.fechaSeleccionada.getMonth()];
    let year = this.fechaSeleccionada.getFullYear();
    return `${month}${year}`;
  }

  getMontoTotalMensualNegativo() {
    return this.mesSeleccionado.dias?.reduce((monto: number, dia: any) => {
      // console.log(dia)
      if (dia.montoTotalNegativo && dia.montoTotalNegativo <= 0) {
        return monto += dia.montoTotalNegativo ? dia.montoTotalNegativo : 0;
      }
      return monto;


    }, 0);
  }

  getMontoTotalMensual(medioDePago: MediosDePago) {
    return this.mesSeleccionado.dias?.reduce((monto: number, dia: any) => {
      // console.log(dia.montoTotalEfectivo)  
      switch (medioDePago) {
        case MediosDePago.Transferencia:
          return monto += dia.montoTotalTransferencia ? dia.montoTotalTransferencia : 0;
        case MediosDePago.MercadoPago:
          return monto += dia.montoTotalMercadoPago ? dia.montoTotalMercadoPago : 0;
        default:
          if (dia.montoTotalEfectivo > 0) {
            return monto += dia.montoTotalEfectivo ? dia.montoTotalEfectivo : 0;
          }
          console.log(`dia no calculado`, dia)
          return monto;
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


  scrollToElement(e: any, id: any) {
    e?.preventDefault();
    setTimeout(() => {
      this.funcionesUtiles.scrollToElement(id);
    }, 200);
  }

  async mostrarBuscadorPorTexto() {
    console.log(this.mesSeleccionado)
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

