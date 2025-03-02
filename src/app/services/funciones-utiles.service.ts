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
import { Producto } from '../pages/lista-productos/lista-productos.page';

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

  productoTieneDescuentoVigente(producto: Producto): boolean {
    const hoy = new Date(); // Obtener la fecha actual
    const { descuento } = producto;

    if (!descuento || !descuento.fechaInicio || !descuento.fechaFin) {
      return false; // Si no hay descuento, devolver false
    }

    const fechaInicio = new Date(descuento.fechaInicio); // Convertir la fecha de inicio a Date
    const fechaFin = new Date(descuento.fechaFin); // Convertir la fecha de fin a Date

    // Verificar si las fechas están definidas y si el descuento está dentro del rango de vigencia
    if (fechaInicio && fechaFin && (hoy < fechaInicio || hoy > fechaFin)) {
      return false; // Si la fecha actual está fuera del rango de fechas del descuento
    }

    return true; // Si el descuento está vigente
  }

  calcularPrecioConDescuento(producto: Producto): number {
    if (!producto.precio || !producto.descuento) return producto.precio || 0;
    if (!this.productoTieneDescuentoVigente(producto)) return producto.precio || 0;

    const { descuento } = producto;
    const hoy = new Date();
    if (!descuento.fechaInicio || !descuento.fechaFin) return producto.precio || 0;

    // Convertir las fechas de descuento a objetos Date
    const fechaInicio = new Date(descuento.fechaInicio);
    const fechaFin = new Date(descuento.fechaFin);

    // Verificar si el descuento está dentro de la vigencia
    if (hoy < fechaInicio || hoy > fechaFin) {
      // Si el descuento no está vigente, devolver el precio original
      return producto.precio;
    }

    let precioFinal = producto.precio;

    // Aplicar el descuento si está vigente
    if (descuento.tipo === 'porcentaje') {
      precioFinal -= (producto.precio * descuento.cantidad) / 100;
    } else if (descuento.tipo === 'valor') {
      precioFinal -= descuento.cantidad;
    }

    // Verificar si el precio final está por debajo del costo
    if (precioFinal < producto.costo) {
      console.warn('El descuento aplicado deja el precio final por debajo del costo. Esto generaría una pérdida.');
      // Retornamos el precio original si no queremos aplicar el descuento
      return producto.precio;
    }

    return precioFinal;
  }
}