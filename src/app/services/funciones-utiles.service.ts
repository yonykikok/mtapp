import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataBaseService } from './database.service';
import { Observable, Subject } from 'rxjs';
import { ImportanciaRoles, Roles, User } from '../clases/user';
import { MediosDePago } from '../components/forms/form-detalle-venta/form-detalle-venta.component';
import { VisualizadorDeImagenComponent } from '../components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { ModalController } from '@ionic/angular';
import { ToastColor, ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionesUtilesService {

  constructor(
    private database: DataBaseService,
    private modalController: ModalController,
    private toastService: ToastService) {


  }

  // async obtenerCotizacionDelDolarActual() {
  //   try {
  //     const res = await fetch("https://api.bluelytics.com.ar/v2/latest");
  //     const cotizaciones = await res.json();
  //     const cotizacionBlue = cotizaciones.blue.value_sell;

  //     if (cotizacionBlue && cotizacionBlue > 900) {
  //       this.dolar = parseFloat(cotizacionBlue);
  //       this.precioOriginal = parseFloat(cotizacionBlue);
  //       this.customDolar = parseFloat(cotizacionBlue + 100);
  //     }

  //     this.dolar$.next(this.dolar);
  //   } catch (err) {
  //     this.toastService.simpleMessage('Error', 'no se pudo obtener el valor del dolar de internet', ToastColor.danger);
  //   }
  // }

  setPriceDolar(dolar: number) {
    this.database.actualizar(environment.TABLAS.cotizacion_dolar, { price: dolar }, 'dolarBlue');
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



  async mostrarImagenCompleta(imagen: string) {
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen,
          isModal: true
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