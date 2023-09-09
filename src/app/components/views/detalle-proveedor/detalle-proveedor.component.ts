import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListaModulosProveedorPageModule } from 'src/app/pages/lista-modulos-proveedor/lista-modulos-proveedor.module';
import { ListaModulosProveedorPage } from 'src/app/pages/lista-modulos-proveedor/lista-modulos-proveedor.page';
import { Proveedor } from 'src/app/pages/proveedores/proveedores.page';

@Component({
  selector: 'app-detalle-proveedor',
  templateUrl: './detalle-proveedor.component.html',
  styleUrls: ['./detalle-proveedor.component.scss'],
})
export class DetalleProveedorComponent implements OnInit {
  proveedor;
  constructor(private modalController: ModalController) { }

  ngOnInit() { }


  async agregarModuloProveedor(proveedor: Proveedor) {

//console.log(proveedor)
    let modal = await this.modalController.create({
      component: ListaModulosProveedorPage,
      componentProps: {
        proveedor
      }
    });
    modal.present();



  }
}
