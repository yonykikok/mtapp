import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/database.service';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { environment } from 'src/environments/environment';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';


export interface PlacaDecarga {
  calidad: string,
  modelo: string,
  marca: string,
  precio: number,
  version?: string,
  stock: number
}
@Component({
  selector: 'app-form-flex-de-carga',
  templateUrl: './form-flex-de-carga.component.html',
  styleUrls: ['./form-flex-de-carga.component.scss'],
})
export class FormFlexDeCargaComponent implements OnInit {

  @Input() nuevoFlexDeCarga = {
    calidad: '',
    modelo: '',
    marca: '',
    precio: '',
    tipo: '',
    stock: []
  }


  precioDolarBlue: number = 0;
  //auto complete
  modelosExistentes: any[] = [];
  flexDeCargasFiltrados: Observable<string[]> = new Observable<string[]>();
  //auto complete

  //parametros formulario
  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesFlexDecarga;
  cantidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //parametros formulario

  flexDeCargas: any[] = [];

  formFlexDeCarga: FormGroup = new FormGroup({
    modelo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    cantidad: new FormControl(0, Validators.required),
    marca: new FormControl('Samsung', Validators.required),
    color: new FormControl('Blanco', Validators.required),
    tipo: new FormControl('Simple', Validators.required),
    calidad: new FormControl('AAA', Validators.required)
  });


  constructor(
    private infoConpatida: InfoCompartidaService,
    private dataBase: DataBaseService,
    private alertService: AlertService,
    private toastService: ToastService,
    // readonly snackBar: MatSnackBar,
    private funcionesUtiles: FuncionesUtilesService,
    private afs: AngularFirestore) {
  }

  cargarInputAutoCompletado() {
    let listaSinRepetir = new Set();

    this.afs.collection('flexDeCargas').snapshotChanges().subscribe(res => {
      this.flexDeCargas = res.map(flexDeCargaRef => {
        let auxFlexDeCarga: any = flexDeCargaRef.payload.doc.data()
        auxFlexDeCarga['id'] = flexDeCargaRef.payload.doc.id;
        return auxFlexDeCarga;
      });
      this.flexDeCargas.forEach(flexDeCarga => {
        listaSinRepetir.add(flexDeCarga['modelo']);
      })
      this.modelosExistentes = [...listaSinRepetir];
    });

    this.flexDeCargasFiltrados = this.formFlexDeCarga.controls['modelo'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );
  }


  ngOnInit(): void {
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }
    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);

    this.cargarInputAutoCompletado();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.modelosExistentes.filter(flexDeCarga => flexDeCarga.toLowerCase().includes(filterValue));
  }


  buscarPorModeloYCalidad(listaFlexDeCargas: any, flexDeCargaABuscar: any) {
    return listaFlexDeCargas.find((flexDeCarga: any) => {
      if (flexDeCarga.modelo.toLowerCase() == flexDeCargaABuscar.modelo.toLowerCase() &&
        flexDeCarga.calidad.toLowerCase() == flexDeCargaABuscar.calidad.toLowerCase()) {
        return flexDeCarga;
      }
    });
  }

  // agregarNuevoColor() {
  //   let { cantidad, color } = this.formFlexDeCarga.value;
  //   let existeColor = this.nuevoFlexDeCarga.stock.find((stock: any) => stock.color == color);

  //   if (!existeColor) {
  //     cantidad <= 0
  //       ? this.toastService.simpleMessage('Error en la cantidad', 'la cantidad debe ser mayor a 0', ToastColor.warning)
  //       : this.nuevoFlexDeCarga.stock.push({ cantidad, color });
  //   } else {
  //     this.toastService.simpleMessage('Error en el color', 'El color ya existe', ToastColor.warning)
  //   }
  // }



  agregarFlexDeCarga(nuevoFlexDeCarga: any) {
    this.dataBase.crear(environment.TABLAS.flexs, nuevoFlexDeCarga).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el flexDeCarga correctamente', ToastColor.success);

    });
  }

  obtenerObjetoFlexDeCarga() {
    const { calidad, modelo, marca, precio, tipo } = this.formFlexDeCarga.value;
    // let { stock } = this.nuevoFlexDeCarga;
    // stock.length <= 0 ? stock = [{ color: 'Blanco', cantidad: 0 }] : null;

    return {
      calidad,
      modelo,
      marca,
      precio,
      tipo,
      // stock
    }
  }


  async procesarAltaFlexDeCarga() {
    const nuevoFlexDeCarga = this.obtenerObjetoFlexDeCarga();

    let primeraConsulta = true;//para que no repira por el suscribe

    if (primeraConsulta) {
      let flexDeCargaExistente = this.buscarPorModeloYCalidad(this.flexDeCargas, nuevoFlexDeCarga);
      flexDeCargaExistente
        ?
        this.toastService.simpleMessage('Error', 'El flexDeCarga ya existe', ToastColor.warning)
        : this.agregarFlexDeCarga(nuevoFlexDeCarga);
    }
    primeraConsulta = false;
  }

}
