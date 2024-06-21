import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
import { BusquedaPorTextoComponent } from 'src/app/components/busqueda-por-texto/busqueda-por-texto.component';
import { DetalleVentasDelDiaComponent } from 'src/app/components/detalle-ventas-del-dia/detalle-ventas-del-dia.component';
import { MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { SelectorDeFechaComponent } from 'src/app/components/selector-de-fecha/selector-de-fecha.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { roles } from 'src/app/services/info-compartida.service';
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
  // maxFechaActual = new Date().toISOString().split('T')[0];;
  maxFechaActual = new Date(new Date().getTime() + 86400000).toISOString().split('T')[0];
  isActionSheetOpen: boolean = false;
  actionSheetButtons: any[] = [{
    text: 'Ventas de esta semana',
    icon: 'receipt-outline',
    handler: async () => {
      const hoy = new Date();
      const diaSemana = hoy.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
      const ultimoDomingo = new Date(hoy);
      ultimoDomingo.setDate(hoy.getDate() - diaSemana); // Restamos los días para llegar al domingo

      // Si hoy es domingo, consideramos la semana anterior
      if (diaSemana === 0) {
        ultimoDomingo.setDate(ultimoDomingo.getDate() - 7);
      }

      const manana = new Date(hoy);
      manana.setDate(hoy.getDate() + 1);

      this.fechaSeleccionada = ultimoDomingo;
      this.fechaSeleccionadaFin = manana;
      this.mostrarIntervaloDeTiempo(false);
    },
  }, {
    text: 'Agregar dia no cargado',
    icon: 'today-outline',
    handler: async () => {
      this.mostarFormularioDeAltaDiaNoCargado()
    },
  }, {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];



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
  intervaloSeleccionado: any;
  dataLibroDiarioDialog: any;

  precioDolarBlue: number = 0;
  constructor(private authService: AuthService, private database: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController,
    private router: Router,
    public funcionesUtiles: FuncionesUtilesService) {
    this.getCurrentUser();
  }

  ngOnInit(): void {

    this.mostrarIntervaloDeTiempo(false);
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });


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

    this.intervaloSeleccionado.dias.forEach((dia: any) => {
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
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que los meses se indexan desde 0
    const dia = fecha.getDate().toString().padStart(2, '0');

    const idFecha = `${anio}-${mes}-${dia}`;
    console.log(idFecha);

    this.database.obtenerPorId(environment.TABLAS.ingresos, idFecha).subscribe(res => {
      let libroDiarioDelDia: LibroDiario = res.payload.data() as LibroDiario;
      libroDiarioDelDia['id'] = res.payload.id;
      console.log(res.payload.data());
      this.mostrarDialogLibroDiario(libroDiarioDelDia);
    })
  }
  mostrarIntervaloDeTiempo(mostrarBuscador: boolean) {
    console.log("por aca")
    if (!this.intervaloSeleccionado) {
      this.intervaloSeleccionado = { dias: [] };
    }
    console.log(this.fechaSeleccionada)
    console.log(this.fechaSeleccionadaFin)
    this.database.getLibrosDiariosEnIntervalo(this.fechaSeleccionada, this.fechaSeleccionadaFin).then(diasListRef => {

      this.intervaloSeleccionado.dias = diasListRef?.map(diaRef => {
        let dia: LibroDiario = diaRef.data() as LibroDiario;
        dia['id'] = diaRef.id;
        return dia
      });
      console.log(diasListRef)
      console.log(this.intervaloSeleccionado.dias)
      this.intervaloSeleccionado['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo(this.intervaloSeleccionado);
      this.intervaloSeleccionado['dias'] = this.intervaloSeleccionado.dias?.sort((diaA: any, diaB: any) => {
        if (diaA.fecha > diaB.fecha) {
          return 1
        } else if (diaA.fecha < diaB.fecha) {
          return -1
        } else {
          return 0;
        }
      });
      // this.intervaloSeleccionado.dias = this.intervaloSeleccionado.dias.filter((dia: LibroDiario) => dia.ventas.length <= 0);
      console.log(this.intervaloSeleccionado)
      // this.reajustarMes(this.intervaloSeleccionado);



      mostrarBuscador ? this.mostrarBuscadorPorTexto() : null;
    })
  }

  mostrarMesCompleto(mostrarBuscador: boolean) {
    if (!this.intervaloSeleccionado) {
      this.intervaloSeleccionado = { dias: [] };
    }

    this.database.getLibrosDiariosMensual(this.fechaSeleccionada).then(diasListRef => {
      this.intervaloSeleccionado.dias = diasListRef?.map(diaRef => {
        let dia: LibroDiario = diaRef.data() as LibroDiario;
        dia['id'] = diaRef.id;
        return dia
      });
      this.intervaloSeleccionado['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo(this.intervaloSeleccionado);
      this.intervaloSeleccionado['dias'] = this.intervaloSeleccionado.dias?.sort((diaA: any, diaB: any) => {
        if (diaA.fecha > diaB.fecha) {
          return 1
        } else if (diaA.fecha < diaB.fecha) {
          return -1
        } else {
          return 0;
        }
      });
      console.log(this.intervaloSeleccionado)
      mostrarBuscador ? this.mostrarBuscadorPorTexto() : null;
    })

  }
  obtenerMesId() {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[this.fechaSeleccionada.getMonth()];
    let year = this.fechaSeleccionada.getFullYear();
    return `${month}${year}`;
  }

  getMontoTotalMensualNegativo(intervalo: any) {
    return intervalo.dias?.reduce((monto: number, dia: any) => {
      // console.log(dia)
      if (dia.montoTotalNegativo && dia.montoTotalNegativo <= 0) {
        return monto += dia.montoTotalNegativo ? dia.montoTotalNegativo : 0;
      }
      return monto;


    }, 0);
  }

  getMontoTotalMensual(medioDePago: MediosDePago, intervalo: any) {
    return intervalo.dias?.reduce((monto: number, dia: any) => {
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
          // console.log(`dia no calculado`, dia)
          return monto;
      }
    }, 0);
  }

  scrollToElement(e: any, id: any) {
    e?.preventDefault();
    setTimeout(() => {
      this.funcionesUtiles.scrollToElement(id);
    }, 200);
  }

  async mostrarBuscadorPorTexto() {
    console.log(this.intervaloSeleccionado)
    try {
      const modal = await this.modalController.create({
        component: BusquedaPorTextoComponent,
        componentProps: {
          intervaloSeleccionado: this.intervaloSeleccionado,
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }


  //TEMPORAL
  reajustarMes(mes: any) { //metodo de reajuste montos diarios y totales
    console.log("entra!")
    let copia = this.funcionesUtiles.clonarObjeto(mes);
    console.log(copia);

    mes.dias.forEach((dia: LibroDiario) => {
      dia.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(dia, MediosDePago.Efectivo);//total en efectivo
      dia.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(dia, MediosDePago.Transferencia);//total en efectivo
      dia.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(dia, MediosDePago.MercadoPago);//total en efectivo
      dia.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(dia);//total negativo
      this.database.actualizar(environment.TABLAS.ingresos, dia, dia.id);

    });

    mes['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo, mes);
    mes['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia, mes);
    mes['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago, mes);
    mes['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo(mes);

    console.log(mes);
    console.log(copia);
  }
  obtenerMontoTotalPorNegativo(libroDiarioHoy: any) {
    let acumuladorNegativo = 0;
    libroDiarioHoy.ventas.forEach((venta: any) => {
      if (venta.precio < 0) {
        acumuladorNegativo += venta.precio;
      }
    });
    return acumuladorNegativo;
  }


  obtenerMontoTotalPorMedioDePago(libroDiarioHoy: any, medioDePago: MediosDePago) {
    let acumulador = 0;
    libroDiarioHoy.ventas.forEach((venta: any) => {
      if (venta.medioDePago == medioDePago) {
        acumulador += venta.precio;
      }
    });
    return acumulador;
  }
  // FIN TEMPORAL
  mostrarOpciones() {
    console.log("Entra", this.loggedUser)
    if (this.funcionesUtiles.roleMinimoNecesario(roles.OWNER, this.loggedUser)) {
      console.log("SEASPEASD")
      this.setOpen(true);
    }
  }
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  async mostarFormularioDeAltaDiaNoCargado() {
    try {
      const modal = await this.modalController.create({
        component: SelectorDeFechaComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'fechaSeleccionada') {
          const fechaOriginal = new Date(result.data.fechaSeleccionada);
          const año = fechaOriginal.getUTCFullYear();
          const mes = String(fechaOriginal.getUTCMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
          const día = String(fechaOriginal.getUTCDate()).padStart(2, '0');

          const fechaFormato = `${año}-${mes}-${día}`;
          let dia = {
            "fechaString": result.data.fechaSeleccionada,
            "ventas": [],
            "id": fechaFormato,
            "montoInicial": 0,
            "montoTotal": 0,
            "cuadra": false,
            "fecha": fechaOriginal.getTime()
          }
          let subscribe = this.database.obtenerPorId(environment.TABLAS.ingresos, dia.id).subscribe(res => {
            subscribe.unsubscribe();
            if (!res.payload.exists) {
              this.database.crearConCustomId(environment.TABLAS.ingresos, dia.id, dia).then(res => {
                this.toastService.simpleMessage('Listo', 'Se agrego el dia', ToastColor.success);
              })
            } else {
              this.toastService.simpleMessage('Existente', 'El dia seleccionado ya existe', ToastColor.warning);
            }
          })
          console.log(result.data)
          console.log(dia)
        }
      })
      return await modal.present();
    } catch (err) {
    }

  }



}




