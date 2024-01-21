import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { DetalleStockModuloComponent } from 'src/app/components/detalle-stock-modulo/detalle-stock-modulo.component';
import { FormStockModuloComponent } from 'src/app/components/forms/form-stock-modulo/form-stock-modulo.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { Modulo, StockModulo } from 'src/app/services/info-compartida.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock-modulos',
  templateUrl: './stock-modulos.page.html',
  styleUrls: ['./stock-modulos.page.scss'],
})
export class StockModulosPage implements OnInit {
  listaSeleccionada = 'completa';
  mostrarSpinner = false;
  loggedUser: User | null = null;
  stockSeleccionado: any;
  stockSeleccionadoEditable: any;
  showStockDialog = false;
  moduloCompletoSeleccionado!: StockModulo;
  tipoDeStockSeleccionado: any;

  // filterValue = '';
  displayedColumnKeys = new FormControl(['modelo', 'calidad', 'c/m', 's/m']);//columnas mostradas predeterminado
  listaDeModulos: any;
  listaDeModulosAMostrar: any[] = [];
  listaDeAtributos = ['marca', 'modelo', 'calidad', 'c/m', 's/m'];
  // mostrarFormModulo = true;

  constructor(private dataBase: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController,
    private alertService: AlertService,
    public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService,
  ) {

    this.getCurrentUser();
  }
  ngOnInit(): void {

    let lista = [];

    this.dataBase.obtenerTodos(environment.TABLAS.stockModulos).subscribe((docsModulosRef) => {
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      this.listaDeModulos = this.ordenarListaPor(lista, 'modelo', 'stock');
      this.listaDeModulosAMostrar = [...this.listaDeModulos];

    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(modulo: Element) {

    try {
      const modal = await this.modalController.create({
        component: DetalleStockModuloComponent,
        componentProps: {
          repuesto: modulo,
          loggedUser: this.loggedUser
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result || !result.data || !result.role) return;


        this.moduloCompletoSeleccionado = result.data;

        if (result.role == 'eliminar') {
          this.eliminarRepuestoSeleccionado();
        } else {
          this.actualizarModuloEnFirebase();
        }

      })
      return await modal.present();
    } catch (err) {

    }

  }


  async eliminarRepuestoSeleccionado() {
    this.mostrarSpinner = true;
    try {
      await this.dataBase.eliminar(environment.TABLAS.stockModulos, this.moduloCompletoSeleccionado.id);
    } catch (err) {
    } finally {
      this.mostrarSpinner = false;
    }
  }
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.listaDeModulosAMostrar = this.listaDeModulos.filter((d: StockModulo) => d.modelo.toLowerCase().indexOf(query) > -1);
  }



  async openDialog() {
    try {
      const modal = await this.modalController.create({
        component: FormStockModuloComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

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

  seleccionarColorYTipo($event: any, stock: any, modulo: StockModulo, tipo: any) {
    $event.stopPropagation();
    this.moduloCompletoSeleccionado = modulo;
    this.tipoDeStockSeleccionado = tipo;
    this.stockSeleccionadoEditable = { ...stock };
    this.stockSeleccionado = stock;
    this.showStockDialog = true;
  }

  cambiarCantidad(accion: string) {
    let stock = this.stockSeleccionadoEditable;

    if (accion == 'aumentar') {
      stock.cantidad = Number(stock.cantidad) + 1
    } else {
      if (stock.cantidad == 0) {
        this.preguntarSiQuiereRemoverEsteColorDeLaVista();
        return;
      };
      stock.cantidad = Number(stock.cantidad) - 1;
    }
    // this.actualizarCantidadTotal();
  }

  preguntarSiQuiereRemoverEsteColorDeLaVista() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere remover este color de la lista?", 'Si, remover', () => {
      let indiceStockSeleccionado = this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].findIndex((stock: any) => stock == this.stockSeleccionado);
      if (indiceStockSeleccionado != -1) {
        this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].splice(indiceStockSeleccionado, 1);
      }
      this.showStockDialog = false;
      this.actualizarModuloEnFirebase();
    });
    // this.dialogService.setDialog({
    //   title: "Quiere remover este color de la lista?",
    //   state: true,
    //   confirmMethod: () => {
    //     let indiceStockSeleccionado = this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].findIndex(stock => stock == this.stockSeleccionado);
    //     if (indiceStockSeleccionado != -1) {
    //       this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].splice(indiceStockSeleccionado, 1);
    //     }
    //     this.showStockDialog = false;
    //     this.actualizarModuloEnFirebase();
    //   }
    // });
    // this.dialogService.showDialog();
  }

  guardarCambios() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere modificar el stock actual?", 'Si, modificar', () => {
      this.stockSeleccionado.cantidad = this.stockSeleccionadoEditable.cantidad;
      this.showStockDialog = false;
      this.actualizarModuloEnFirebase();
    });
  }
  async actualizarModuloEnFirebase() {
    this.mostrarSpinner = true;
    try {
      await this.dataBase.actualizar(environment.TABLAS.stockModulos, this.moduloCompletoSeleccionado, this.moduloCompletoSeleccionado.id);

    } catch (err) {
    } finally {
      this.mostrarSpinner = false;
    }
  }

  mostrarStockBajo() {
    let listaStockBajo: any = [];

    this.listaDeModulos?.forEach((modulo: StockModulo) => {
      modulo.stock.sinMarco.forEach((stock: any) => {
        if (stock.cantidad <= 0) {
          listaStockBajo.push({
            color: stock.color,
            cantidad: stock.cantidad.toString(),
            modelo: modulo.modelo,
            tipo: 'S/M',
            calidad: modulo.calidad
          });
        }
      });
      modulo.stock.conMarco.forEach((stock: any) => {
        if (stock.cantidad <= 0) {
          listaStockBajo.push({
            color: stock.color,
            cantidad: stock.cantidad.toString(),
            modelo: modulo.modelo,
            tipo: 'C/M',
            calidad: modulo.calidad
          });
        }
      });

    });
    
    this.listaDeModulosAMostrar = listaStockBajo.sort((a:any, b:any) => {
      if (a.modelo < b.modelo) return -1;
      if (a.modelo > b.modelo) return 1;
      if (a.tipo < b.tipo) return -1;
      if (a.tipo > b.tipo) return 1;
      if (a.cantidad < b.cantidad) return -1;
      if (a.cantidad > b.cantidad) return 1;
      return 0;
    });

  }

  mostrarLista(lista: string) {
    this.listaSeleccionada = lista;
    if (lista == 'completa') {
      this.displayedColumnKeys = new FormControl(['modelo', 'calidad', 'c/m', 's/m']);
      this.listaDeAtributos = ['marca', 'modelo', 'calidad', 'c/m', 's/m'];
      this.listaDeModulosAMostrar = [...this.listaDeModulos]
    } else {//stock bajo
      this.displayedColumnKeys = new FormControl(['modelo', 'calidad', 'tipo', 'color', 'cantidad']);
      this.listaDeAtributos = ['modelo', 'calidad', 'tipo', 'color', 'cantidad'];
      this.mostrarStockBajo()
    }
  }
}
