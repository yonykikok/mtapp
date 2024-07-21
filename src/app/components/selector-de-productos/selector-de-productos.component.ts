import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { VisualizadorDeImagenComponent } from '../views/visualizador-de-imagen/visualizador-de-imagen.component';
import { Producto, ProductoCarrito } from '../nueva-funcionalidad/nueva-funcionalidad.component';

@Component({
  selector: 'app-selector-de-productos',
  templateUrl: './selector-de-productos.component.html',
  styleUrls: ['./selector-de-productos.component.scss'],
})
export class SelectorDeProductosComponent implements OnInit {
  textoABuscar: string = '';
  lista: ProductoCarrito[] = [];
  modelosSeleccionados: any[] = [];
  listaAMostrar: any[] = [];
  totalItems: number = 1000; // Supongamos que tienes un total de 1000 ítems para cargar
  itemsPerPage: number = 20; // Número de ítems a cargar por página
  currentPage: number = 0;

  constructor(private alertService: AlertService,
    private modalController: ModalController,
    private funcionesUtilesService: FuncionesUtilesService) { }

  ngOnInit() {
    this.lista.forEach(item => {
      if (this.modelosSeleccionados.some(modelo => modelo.id === item.id)) {
        item.checked = true;
      }
    });
    this.listaAMostrar = this.funcionesUtilesService.clonarObjeto(this.lista.slice(0, this.itemsPerPage));
  }

  seleccionarModelo(event: Event, item: any) {
    event.stopPropagation();
    let indexABorrar = this.modelosSeleccionados.findIndex(mod => item.id == mod.id);
    if (indexABorrar == -1) {
      this.modelosSeleccionados.push(item);
    } else {
      this.modelosSeleccionados.splice(indexABorrar, 1);
    }
  }

  onChangeFilter() {
    this.listaAMostrar = this.lista
    .filter((d) => d.producto.toLowerCase().indexOf(this.textoABuscar.toLowerCase()) > -1)
    .slice(0, this.itemsPerPage)
    .sort((a, b) => a.precio - b.precio);
  }

  mostrarConfirmacion() {
    this.alertService.alertConfirmacion('Confirmación', "¿Termino de seleccionar todos los productos?", 'Sí', () => {
      this.modalController.dismiss(this.modelosSeleccionados, 'seleccionTerminada');
    });
  }

  loadData(event: any) {
    setTimeout(() => {
      const newItems = this.lista.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage);
      this.listaAMostrar = [...this.listaAMostrar, ...newItems];

      this.listaAMostrar = [...this.listaAMostrar, ...newItems]
      .sort((a, b) => a.precio - b.precio);


      this.currentPage++;

      if (event) {
        event.target.complete();  
      }

      // Desactiva el scroll infinito si se han cargado todos los elementos
      if (this.listaAMostrar.length >= this.lista.length) {
        event.target.disabled = true;
      }
    }, 1000);
  }

  async mostrarImagenCompleta(producto: Producto) {
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen: producto.images ? producto.images[0] : null,
          imagenesArray: producto.images,
          isModal: true,
          permitirGirarImagen: true,
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
