import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataBaseService } from './database.service';
import { Observable, Subject } from 'rxjs';
import { ImportanciaRoles, Roles, User } from '../clases/user';
import { MediosDePago } from '../components/form-detalle-venta/form-detalle-venta.component';

@Injectable({
  providedIn: 'root'
})
export class FuncionesUtilesService {

  precioOriginal: number | null = null;
  dolar: number | null = null;
  customDolar: number | null = null;
  dolar$: Subject<number>;


  constructor(
    // private snackBar: MatSnackBar,
    private database: DataBaseService) {
    this.dolar$ = new Subject();
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe(async (res: any) => {
      await this.obtenerCotizacionDelDolarActual();

      if (!res.payload.exists) {
        this.database.actualizar(environment.TABLAS.cotizacion_dolar, { price: this.dolar }, 'dolarBlue');
      } else {
        this.customDolar = res.payload.data()['price'];
      }

      if (this.customDolar > this.dolar) {
        this.dolar$.next(this.customDolar);
      } else {
        this.dolar$.next(this.dolar);
      }
    });
  }

  getPriceDolar(): Observable<number> {
    return this.dolar$.asObservable();
  }

  async obtenerCotizacionDelDolarActual() {
    try {
      const res = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
      const cotizaciones = await res.json();
      const cotizacionBlue = cotizaciones.find((cotizacion: any) => cotizacion.casa.nombre.toLowerCase() == 'dolar blue')['casa'];
      this.dolar = parseFloat(cotizacionBlue.venta) + 2;
      this.precioOriginal = parseFloat(cotizacionBlue.venta) + 2;

      this.dolar$.next(this.dolar);
    } catch (err) {
      // this.snackBar.open('Error, no se pudo obtener el valor del dolar de internet ', 'Cerrar', { duration: 5000, panelClass: ['warnSnackBar'] });
    }
  }

  setPriceDolar(dolar: number) {
    this.dolar = dolar;
    this.dolar$.next(this.dolar);
    this.database.actualizar(environment.TABLAS.cotizacion_dolar, { price: this.dolar }, 'dolarBlue');
  }

  scrollToElement(id: string) {
    let element: HTMLElement | null = document.querySelector(id);
    if (element != null) {
      scroll({
        top: element.offsetTop,
      });
    }
  }

  clonarObjeto(objeto: Object) {
    return JSON.parse(JSON.stringify(objeto));
  }

  roleMinimoNecesario(role: Roles, loggedUser: User) {
    console.log(role)
    console.log(loggedUser)
    if (ImportanciaRoles[role] <= ImportanciaRoles[loggedUser.role]) {
      return true;
    }
    return false;
  }

  tieneUnRoleInferior(role: Roles, loggedUser: User) {
    if (ImportanciaRoles[role] > ImportanciaRoles[loggedUser.role]) {
      return true;
    }
    return false;
  }

  ordenarUsuariosPorImportanciaDeRoles(lista: any[]) {
    return lista.sort((a: any, b: any) => {
      if (ImportanciaRoles[a.role] > ImportanciaRoles[b.role]) {
        return -1;
      } if (ImportanciaRoles[a.role] < ImportanciaRoles[b.role]) {
        return 1;
      } else {
        return 0;
      }
    }
    )
  }











  /* correcciones */
  /* BOTONES
   <!-- <button (click)="reajustar()">Reajustar objetos</button> -->
   <!-- <button (click)="eliminarDiasSinIngresos()">eliminar Dias Sin Ingresos</button> -->
   <!-- <button (click)="hacerBackUp()">BACKUP antes de ajustes</button> -->
   <!-- <button (click)="reubicarLosDiasEnSusMeses()">Reubicar dias en su mes</button> -->
 */



  obtenerNombreDelMes(fecha: Date) {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return months[fecha.getMonth()];
  }

  /**
   * Reubica los dias de ventas que no estan ubicados en su mes correspondiente, a veces un dia de X mes esta incluido en el mes anterior a ese.
   */
  reubicarLosDiasEnSusMeses() {
    let suscript = this.database.obtenerTodos(environment.TABLAS.ingresosBrutos).subscribe(ingresosListRed => {
      if (!ingresosListRed || ingresosListRed.length <= 0) return;

      let ingresos: any = ingresosListRed.map(ingresoRef => {
        let ingreso = ingresoRef.payload.doc.data();
        ingreso['id'] = ingresoRef.payload.doc.id;
        return ingreso;
      });

      let ventasMalUbicadas = [];
      ingresos.forEach((mes: any) => {//buscamos los dias mal ubicados.
        mes.dias.forEach((dia) => {

          if (!mes.id.includes(this.obtenerNombreDelMes(new Date(dia.fecha)))) {
            ventasMalUbicadas.push(dia);
          }

        });
      });


      let mes;
      ventasMalUbicadas.forEach(diaMalUbicado => {//ponemos los dias en el mes que corresponde.
        mes = ingresos.find(mes => mes.id == this.obtenerMesId(new Date(diaMalUbicado.fechaString)));

        mes.dias.push(diaMalUbicado);

      });
      console.log("reubicado",mes)
      this.database.actualizar(environment.TABLAS.ingresosBrutos, mes, mes.id);// queda borrar a mano los duplicados
      suscript.unsubscribe();
    });
  }
  obtenerMesId(fecha) {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[fecha.getMonth()];
    let year = fecha.getFullYear();
    return `${month}${year}`;
  }



  /**
   * Reajusta las tablas y hace los calculos pertienentes para tener el ingreso mensual en efectivo y pagos electronicos
   */
  reajustar() {
    let subs = this.database.obtenerTodos(environment.TABLAS.ingresosBrutos).subscribe(ListDocRef => {
      console.log(ListDocRef);
      let meses = ListDocRef.map(docRef => {
        let mes = docRef.payload.doc.data();
        mes['id'] = docRef.payload.doc.id;
        return mes;
      });

      meses.forEach((mes: any) => {
        mes.dias.forEach(libroDiarioHoy => {
          libroDiarioHoy.montoTotalTransferencia = 0;
          libroDiarioHoy.montoTotalMercadoPago = 0;
          libroDiarioHoy.montoTotalNegativo = 0;

          let acumulador = 0;
          let acumuladorTransferencia = 0;
          let acumuladorMercadoPago = 0;
          let acumuladorNegativo = 0;

          libroDiarioHoy.ventas.forEach((venta) => {
            if (!venta.medioDePago) {
              console.log("No tiene medio de pago")
              venta.medioDePago = MediosDePago.Efectivo;
            }
            if (venta.precio > 0) {

              if (venta.medioDePago == MediosDePago.Transferencia) {
                acumuladorTransferencia += venta.precio;
              } else if (venta.medioDePago == MediosDePago.MercadoPago) {
                acumuladorMercadoPago += venta.precio;
              } else {
                acumulador += venta.precio;
              }
            } else {
              acumuladorNegativo += venta.precio;
            }
          });
          libroDiarioHoy.montoTotalEfectivo = acumulador;
          libroDiarioHoy.montoTotalNegativo = acumuladorNegativo;
          libroDiarioHoy.montoTotalTransferencia = acumuladorTransferencia;
          libroDiarioHoy.montoTotalMercadoPago = acumuladorMercadoPago;

        });
        console.log(mes);
        // this.database.actualizar(environment.TABLAS.ingresosBrutos, mes, mes.id);
      });
      subs.unsubscribe();
      console.log(meses)
    });
  }

  eliminarDiasSinIngresos() {
    let subs = this.database.obtenerTodos(environment.TABLAS.ingresosBrutos).subscribe(ListDocRef => {
      // console.log(ListDocRef);
      let meses = ListDocRef.map(docRef => {
        let mes = docRef.payload.doc.data();
        mes['id'] = docRef.payload.doc.id;
        return mes;
      });
      console.log(new Array(meses));
      meses.forEach((mes: any) => {
        mes.dias = mes.dias.filter(libroDiarioHoy => (libroDiarioHoy.ventas && libroDiarioHoy.ventas.length > 0));
        console.log(mes);
        // this.database.actualizar(environment.TABLAS.ingresosBrutos, mes, mes.id);
      });
      subs.unsubscribe();
    });
  }

  /**
   * Hace un Backup de la tabla IngresosBrutos el cual los guarda en firebase y localstorage.
   */
  hacerBackUp() {

    let subs = this.database.obtenerTodos(environment.TABLAS.ingresosBrutos).subscribe(ListDocRef => {
      // console.log(ListDocRef);
      let meses = ListDocRef.map(docRef => {
        let mes = docRef.payload.doc.data();
        mes['id'] = docRef.payload.doc.id;
        return mes;
      });

      this.database.actualizar(environment.TABLAS.backUps, { meses, stringDate: new Date().toDateString() }, 'ingresosBrutosMeses');
      localStorage.setItem('backup', JSON.stringify({ meses, stringDate: new Date().toDateString() }));
      subs.unsubscribe();
      alert('backup listo');
    });
  }





  /* correcciones */
}