import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { DetalleReparacionComponent } from 'src/app/components/detalles/detalle-reparacion/detalle-reparacion.component';
import { FormAltaReparacionComponent } from 'src/app/components/forms/form-alta-reparacion/form-alta-reparacion.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { boleta } from '../mis-reparaciones/mis-reparaciones.page';
import { boleta_estados } from 'src/app/services/info-compartida.service';
export const enum OrderByDireccions {
  ascendente = 'asc',
  descendente = 'desc'
}
@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.page.html',
  styleUrls: ['./boletas.page.scss'],
})
export class BoletasPage implements OnInit {
  busquedaPorInput: boolean = true;
  estadoSeleccionado!: boleta_estados;
  camposSeleccionados = ['nroBoleta', 'dniCliente', 'estado'];


  textoABuscar: string = "";
  boletas: boleta[] = [];
  boletasAMostrar: boleta[] = [];
  loggedUser: User | null = null;
  sinCoincidencias = false;

  filterValue = '';

  mostrarFormModulo = true;

  constructor(
    private authService: AuthService,
    private dataBase: DataBaseService,
    private modalController: ModalController,
    private toastService: ToastService,
    public funcionesUtiles: FuncionesUtilesService) {
    this.getCurrentUser();

  }
  ngOnInit(): void {//obtenemos las boletas modificadas del dia.
    //buscamos todas las boletas y pasamos a lowercase el modelo para el filtro por modelo.
    // let subs = this.dataBase.obtenerTodos(environment.TABLAS.boletasReparacion).subscribe(res => {
    //   subs.unsubscribe();
    //   let boletas = res.map(boletaRef => {
    //     let boleta: boleta = boletaRef.payload.doc.data() as boleta;
    //     boleta['id'] = boletaRef.payload.doc.id;
    //     return boleta;
    //   });
    //   console.log(boletas)
    //   boletas.forEach(boleta => {
    //     if (boleta.modelo && boleta.id) {
    //       boleta.modelo = boleta.modelo.toLowerCase();
    //       this.dataBase.actualizar(environment.TABLAS.boletasReparacion, boleta, boleta.id);
    //     }
    //   });
    // })
    // const fechaHoy = new Date().getTime();
    // const fechaAyer = fechaHoy - 24 * 60 * 60 * 1000; // Restamos un día
    // this.dataBase.getBoletasModificadasHoy(fechaAyer, fechaHoy).then(boletasListRef => {
    //   let boletas = boletasListRef.map(boletaRef => {
    //     let boleta = boletaRef.data();
    //     boleta['id'] = boletaRef.id;
    //     return boleta;
    //   })
    //   console.log(boletas);
    // })
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

  async openDialog() {
    try {
      const modal = await this.modalController.create({
        component: FormAltaReparacionComponent,
        componentProps: {
          ruta: 'boletas'
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        //
      })
      return await modal.present();
    } catch (err) {
    }

  }

  async seleccionar(boleta: boleta) {
    try {
      const modal = await this.modalController.create({
        component: DetalleReparacionComponent,
        componentProps: {
          reparacion: boleta,
          autoFocus: false,
          loggedUser: this.loggedUser,
          ruta: 'boletas'

        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;

        //
      })
      return await modal.present();
    } catch (err) {
    }

  }

  limpiarFiltro() {

    console.log("limpiar")
  }

  applyFilter() {
    this.sinCoincidencias = false;
    if (Number(this.textoABuscar)) {
      if ((this.textoABuscar.length >= 2 && this.textoABuscar.length <= 5)) {
        this.busquedaPorNroBoleta(this.textoABuscar);
      }
      else if (this.textoABuscar.length == 8) {
        this.busquedaPorDni();
      }
    } else {//busqueda por texto.
      console.log("busqueda por texto")
      if (this.textoABuscar.length >= 2) {
        this.busquedaPorTexto();
      }
    }
  }
  busquedaPorTexto() {
    this.dataBase.obtenerBoletaPorModelo(environment.TABLAS.boletasReparacion, this.textoABuscar.toLocaleLowerCase()).then((res: any) => {
      if (!res) {
        this.sinCoincidencias = true;
        return;
      }

      let boletas = res.map((element: any) => {
        let boleta = element.data();
        boleta['id'] = element.id;
        return boleta;
      });
      boletas.sort((a: boleta, b: boleta) => b.nroBoleta.localeCompare(a.nroBoleta));
      this.boletas = boletas;
      this.boletasAMostrar = this.funcionesUtiles.clonarObjeto(boletas);
      console.log(boletas)

    });
  }
  busquedaPorDni() {
    this.dataBase.obtenerBoletaPorDni(environment.TABLAS.boletasReparacion, this.textoABuscar).then((res: any) => {
      if (!res) {
        this.sinCoincidencias = true;
        return;
      }

      let boletas = res.map((element: any) => {
        let boleta = element.data();
        boleta['id'] = element.id;
        return boleta;
      });
      this.boletas = boletas;
      this.boletasAMostrar = this.funcionesUtiles.clonarObjeto(boletas);

    });
  }
  busquedaPorNroBoleta(textoABuscar: string) {
    console.log(this.textoABuscar)
    this.dataBase.obtenerBoletaPorNroBoleta(environment.TABLAS.boletasReparacion, this.textoABuscar).then((res: any) => {
      if (!res) {
        this.sinCoincidencias = true;
        return;
      }

      let boletas = res.map((element: any) => {
        let boleta = element.data();
        boleta['id'] = element.id;
        return boleta;
      });
      this.boletas = boletas;
      this.boletasAMostrar = this.funcionesUtiles.clonarObjeto(boletas);

    });
  }

  applyFilter2(event: Event) {
    this.sinCoincidencias = false;
    let textoABuscar = (event.target as HTMLInputElement).value;
    if (this.textoABuscar.length == 4 || this.textoABuscar.length == 5 || this.textoABuscar.length == 8) {

      let metodoALlamar: any = (this.textoABuscar.length == 4 || this.textoABuscar.length == 5)
        ? this.dataBase.obtenerBoletaPorNroBoleta
        : this.dataBase.obtenerBoletaPorDni;

      metodoALlamar(environment.TABLAS.boletasReparacion, this.textoABuscar).then((res: any) => {
        if (!res) {
          this.sinCoincidencias = true;
          return;
        }

        let boletas = res.map((element: any) => {
          let boleta = element.data();
          boleta['id'] = element.id;
          return boleta;
        });
        this.boletas = boletas;

      });
    }
  }
  buscarPorEstado() {
    this.sinCoincidencias = false;
    
    this.dataBase.obtenerBoletaPorEstadoBoleta(environment.TABLAS.boletasReparacion, this.estadoSeleccionado).then(res => {
      if (!res) {
        this.sinCoincidencias = true;
        return;
      }

      let boletas = res.map((element: any) => {
        let boleta = element.data();
        boleta['id'] = element.id;
        return boleta;
      });
      boletas.sort((a: boleta, b: boleta) => b.nroBoleta.localeCompare(a.nroBoleta));
      this.boletas = boletas;
      this.boletasAMostrar = this.funcionesUtiles.clonarObjeto(boletas);
      console.log(boletas)

    });
  }

}
