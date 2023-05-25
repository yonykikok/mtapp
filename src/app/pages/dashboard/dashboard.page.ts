import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormAltaReparacionComponent } from 'src/app/components/forms/form-alta-reparacion/form-alta-reparacion.component';
import { DataBaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  reparaciones;
  reparacionesAMostrar;

  modulos = [
    { titulo: 'Modulos', color: '#28a745', ruta: "/lista-modulos", role: 'CLIENTE' },
    { titulo: 'Tactiles', color: '#42688a', ruta: "/lista-tactiles", role: 'CLIENTE' },
    { titulo: 'Baterias', color: '#ffc107', ruta: "/listaB-baterias", role: 'CLIENTE' },
    { titulo: 'Display', color: '#238386', ruta: "/lista-displays", role: 'CLIENTE' },
    { titulo: 'Flex de carga', color: '#d34fb2', ruta: "/lista-flex-de-carga", role: 'CLIENTE' },
    { titulo: 'Pedidos', color: '#007bff', ruta: "/lista-pedidos", role: 'ADMIN' },
    { titulo: 'Deudores', color: '#dc3545', ruta: "/deudores", role: 'ADMIN' },
    { titulo: 'Ventas', color: '#7fbdc7', ruta: "/equipos-vendidos", role: 'ADMIN' },
    { titulo: 'Libro diario', color: '#dc70fd', ruta: "/libro-diario", role: 'ADMIN' },
    { titulo: 'Historial', color: 'rgb(113 112 253)', ruta: "/historial-caja", role: 'ADMIN' },
    { titulo: 'Mis reparaciones', color: '#d34fb2', ruta: "/mis-reparaciones", role: 'CLIENTE' },
  ]
  constructor(private modalController: ModalController,
    private database: DataBaseService) { }

  ngOnInit() {
    this.database.obtenerTodos('boletas').subscribe(documentListRef => {

      console.log(documentListRef)
      if (!documentListRef) return;

      this.reparaciones = documentListRef.map(documentRef => {
        let reparacion = documentRef.payload.doc.data();
        reparacion['id'] = documentRef.payload.doc.id;
        return reparacion;
      });
      this.reparacionesAMostrar = [...this.reparaciones];

      this.reparaciones.sort((a, b) => {
        if (a.estado > b.estado) {
          return -1
        } else if (a.estado < b.estado) {
          return 1
        } else {
          return 0
        }
      });
    });
  }

  async mostrarModalFormAltaReparacion() {
    let modal = await this.modalController.create({
      component: FormAltaReparacionComponent,
      mode: 'ios',
    });
    modal.present();

  }

}
