import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { FormModuloProveedorComponent } from 'src/app/components/forms/form-modulo-proveedor/form-modulo-proveedor.component';
import { FormModuloComponent } from 'src/app/components/forms/form-modulo/form-modulo.component';
import { DetalleModuloComponent } from 'src/app/components/views/detalle-modulo/detalle-modulo.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../proveedores/proveedores.page';


@Component({
  selector: 'app-lista-modulos-proveedor',
  templateUrl: './lista-modulos-proveedor.page.html',
  styleUrls: ['./lista-modulos-proveedor.page.scss'],
})
export class ListaModulosProveedorPage implements OnInit {
  loggedUser: User | null = null;
  camposSeleccionados = ['modelo', 'calidad', 'precio'];
  modulos: any[] = [];
  modulosAMostrar: any[] = [];
  proveedor!: Proveedor;
  mostrarFormModulo = true;
  precioDolarBlue: number = 0;

  constructor(private dataBase: DataBaseService,
    private authService: AuthService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private database: DataBaseService) {

    this.getCurrentUser();
    this.modulosAMostrar = [...this.modulos];
  }
  ngOnInit(): void {
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });
    this.modulos = this.proveedor.modulos;
    this.modulosAMostrar = [...this.modulos];
  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(modulo: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleModuloComponent,
        componentProps: {
          repuesto: modulo,
          ruta: '/proveedores'
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        if (result.role == 'guardar') {
          this.guardarCambiosProeveedor();
        } else if (result.role == 'borrar') {
          let indexABorrar = this.proveedor.modulos.findIndex(modulo => JSON.stringify(modulo) == JSON.stringify(result.data));
          if (indexABorrar != -1) {
            this.proveedor.modulos.splice(indexABorrar, 1);
            this.guardarCambiosProeveedor();
          }
        }


      })
      return await modal.present();
    } catch (err) {
    }

  }

  guardarCambiosProeveedor() {
    if (!this.proveedor || !this.proveedor.id) return; //TODO: notificar.
    this.dataBase.actualizar(environment.TABLAS.proveedores, this.proveedor, this.proveedor.id);
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.dataBase.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
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
  handleInput(event: any) {
    //console.log(this.modulos)
    const textABuscar = event.target.value.toLowerCase();
    this.modulosAMostrar = this.modulos.filter((modulo) => modulo.modelo.toLowerCase().includes(textABuscar));
    //console.log(this.modulosAMostrar)
  }


  async abrirFormModulo() {
    try {
      const modal = await this.modalController.create({
        component: FormModuloProveedorComponent,
        componentProps: {
          proveedor: this.proveedor
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