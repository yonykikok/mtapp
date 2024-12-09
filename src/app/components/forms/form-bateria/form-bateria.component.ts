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
export interface Bateria {
  id: string,
  marca: string;
  modelo: string;
  codigo: string;
  calidad: string;
  detallesFinancieros: DetallesFinancieros;
}

export interface DetallesFinancieros {
  costo: number;
  precio: number;
  margen: number;
  colocacion: number;
}

@Component({
  selector: 'app-form-bateria',
  templateUrl: './form-bateria.component.html',
  styleUrls: ['./form-bateria.component.scss'],
})
export class FormBateriaComponent implements OnInit {

  @Input() nuevoBateria: Bateria = {
    id: '',
    marca: '',
    modelo: '',
    codigo: '',
    detallesFinancieros: {
      colocacion: 0,
      costo: 0,
      margen: 0,
      precio: 0,
    },
    calidad: '',
  }

  //auto complete
  modelosExistentes: any[] = [];
  bateriasFiltrados: Observable<string[]> = new Observable<string[]>();
  //auto complete

  //parametros formulario
  marcas = this.infoConpatida.marcasModulos;
  calidades = [];
  //parametros formulario

  baterias: any[] = [];

  precioDolarBlue: number = 0;
  formBateria: FormGroup = new FormGroup({
    marca: new FormControl('Samsung', Validators.required),
    modelo: new FormControl('', Validators.required),
    codigo: new FormControl('', Validators.required),
    calidad: new FormControl('AAA', Validators.required)
  });


  constructor(
    private infoConpatida: InfoCompartidaService,
    private dataBase: DataBaseService,
    private alertService: AlertService,
    private toastService: ToastService,
    private afs: AngularFirestore,
    private funcionesUtiles: FuncionesUtilesService) {
  }

  cargarInputAutoCompletado() {
    let listaSinRepetir = new Set();

    this.afs.collection(environment.TABLAS.baterias).snapshotChanges().subscribe(res => {
      this.baterias = res.map(bateriaRef => {
        let auxBateria: any = bateriaRef.payload.doc.data()
        auxBateria['id'] = bateriaRef.payload.doc.id;
        return auxBateria;
      });
      this.baterias.forEach(bateria => {
        listaSinRepetir.add(bateria['modelo']);
      })
      this.modelosExistentes = [...listaSinRepetir];
    });

    this.bateriasFiltrados = this.formBateria.controls['modelo'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );
  }


  ngOnInit(): void {

    this.dataBase.obtenerPorId(environment.TABLAS.calidadesDeRepuestos, 'baterias').subscribe((res: any) => {
      this.calidades = res.payload.data().calidades;
      console.log(res.payload.data())
    });
    this.dataBase.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });

    this.cargarInputAutoCompletado();

  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.modelosExistentes.filter(bateria => bateria.toLowerCase().includes(filterValue));
  }


  buscarPorModeloYCalidad(listaBaterias: any[], bateriaABuscar: any) {
    return listaBaterias.find(bateria => {
      if (bateria.modelo.toLowerCase() == bateriaABuscar.modelo.toLowerCase() &&
        bateria.calidad.toLowerCase() == bateriaABuscar.calidad.toLowerCase()) {
        return bateria;
      }
    });
  }





  agregarBateria(nuevoBateria: any) {
    this.dataBase.crear(environment.TABLAS.baterias, nuevoBateria).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el bateria correctamente', ToastColor.success);

    });
  }

  obtenerObjetoBateria(): Bateria {
    const { marca, modelo, codigo, calidad } = this.formBateria.value;


    return {
      marca,
      modelo,
      codigo,
      calidad,
      detallesFinancieros: {
        colocacion: 0,
        costo: 0,
        margen: 0,
        precio: 0,
      },
      id: ''
    }
  }


  async procesarAltaBateria() {
    const nuevoBateria = this.obtenerObjetoBateria();

    let primeraConsulta = true;//para que no repira por el suscribe

    if (primeraConsulta) {
      let bateriaExistente = this.buscarPorModeloYCalidad(this.baterias, nuevoBateria);
      bateriaExistente
        ?
        this.toastService.simpleMessage('Error', 'El bateria ya existe', ToastColor.warning)
        : this.agregarBateria(nuevoBateria);
    }
    primeraConsulta = false;
  }

}
