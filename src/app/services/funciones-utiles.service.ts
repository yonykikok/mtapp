import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataBaseService } from './database.service';
import { Observable, Subject } from 'rxjs';
import { ImportanciaRoles, Roles, User } from '../clases/user';
import { MediosDePago } from '../components/forms/form-detalle-venta/form-detalle-venta.component';

@Injectable({
  providedIn: 'root'
})
export class FuncionesUtilesService {

  precioOriginal: number = 0;
  dolar: number = 0;
  customDolar: number = 0;
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

      if ((this.customDolar && this.dolar) && this.customDolar > this.dolar) {
        this.dolar$.next(this.customDolar);
      } else {
        if (this.dolar)
          this.dolar$.next(this.dolar);
      }
    });
  }

  getPriceDolar(): Observable<number> {
    return this.dolar$.asObservable();
  }

  // async obtenerCotizacionDelDolarActual() {
  //   try {
  //     const res = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
  //     const cotizaciones = await res.json();
  //     const cotizacionBlue = cotizaciones.find((cotizacion: any) => cotizacion.casa.nombre.toLowerCase() == 'dolar blue')['casa'];
  //     this.dolar = parseFloat(cotizacionBlue.venta) + 2;
  //     this.precioOriginal = parseFloat(cotizacionBlue.venta) + 2;

  //     this.dolar$.next(this.dolar);
  //   } catch (err) {
  //     // this.snackBar.open('Error, no se pudo obtener el valor del dolar de internet ', 'Cerrar', { duration: 5000, panelClass: ['warnSnackBar'] });
  //   }
  // }
  async obtenerCotizacionDelDolarActual() {
    try {
      const res = await fetch("https://api.bluelytics.com.ar/v2/latest");
      const cotizaciones = await res.json();
      const cotizacionBlue = cotizaciones.blue.value_sell;

      this.dolar = parseFloat(cotizacionBlue);
      this.precioOriginal = parseFloat(cotizacionBlue);

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
    if (!loggedUser) return false;
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

}