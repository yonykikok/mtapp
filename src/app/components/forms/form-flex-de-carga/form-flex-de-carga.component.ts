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
  id?: string,
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

  @Input() nuevoFlexDeCarga: PlacaDecarga = {
    calidad: '',
    modelo: '',
    marca: '',
    precio: 0,
    stock: 0,
  }


  precioDolarBlue: number = 0;
  //auto complete
  modelosExistentes: any[] = [];//solo el string modelo
  flexDeCargasFiltrados: Observable<string[]> = new Observable<string[]>();
  //auto complete

  //parametros formulario
  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesFlexDecarga;
  //parametros formulario

  flexDeCargas: any[] = [];

  formFlexDeCarga: FormGroup = new FormGroup({
    modelo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    marca: new FormControl('Samsung', Validators.required),
    calidad: new FormControl('AAA', Validators.required),
    stock: new FormControl(1, Validators.required),
    version: new FormControl('',),
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


  ngOnInit() {
    this.dataBase.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });

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

  agregarFlexDeCarga(nuevoFlexDeCarga: any) {
    this.dataBase.crear(environment.TABLAS.flexs, nuevoFlexDeCarga).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el flexDeCarga correctamente', ToastColor.success);

    });
  }

  obtenerObjetoFlexDeCarga() {
    return this.formFlexDeCarga.value;
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
