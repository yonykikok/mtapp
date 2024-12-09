import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataBaseService } from './database.service';
import { Observable, Subject } from 'rxjs';
import { ImportanciaRoles, Roles, User } from '../clases/user';
import { MediosDePago } from '../components/forms/form-detalle-venta/form-detalle-venta.component';
import { VisualizadorDeImagenComponent } from '../components/views/visualizador-de-imagen/visualizador-de-imagen.component';
import { ModalController } from '@ionic/angular';
import { ToastColor, ToastService } from './toast.service';
import JsBarcode from 'jsbarcode';

@Injectable({
  providedIn: 'root'
})
export class FuncionesUtilesService {

  constructor(
    private database: DataBaseService,
    private modalController: ModalController,
    private toastService: ToastService) {


  }


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



  async mostrarImagenCompleta(imagen: string, actualizarImagenMethod?: any, mostrarOpciones?: boolean) {
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen,
          isModal: true,
          permitirGirarImagen: true,
          mostrarOpcionesIcon: mostrarOpciones == false ? mostrarOpciones : true,//puede no tener esa variable
          actualizarImagenMethod
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }


  generateBarcodeValue(): string {
    // Genera un código de barras numérico aleatorio de 12 dígitos
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join('');
  }

  generateBarcode(text: string, index: number) {
    const canvas = document.getElementById(`barcode-${index}`) as HTMLCanvasElement;
    JsBarcode(canvas, text, {
      format: 'CODE128',
      lineColor: '#000000',
      width: 2,
      height: 100,
      displayValue: true
    });
  }

}