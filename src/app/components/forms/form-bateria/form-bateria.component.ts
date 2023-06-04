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
@Component({
  selector: 'app-form-bateria',
  templateUrl: './form-bateria.component.html',
  styleUrls: ['./form-bateria.component.scss'],
})
export class FormBateriaComponent implements OnInit {

  @Input() nuevoBateria = {
    calidad: '',
    modelo: '',
    marca: '',
    precio: '',
    tipo: '',
    stock: []
  }

  //auto complete
  modelosExistentes = [];
  bateriasFiltrados: Observable<string[]>;
  //auto complete

  //parametros formulario
  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesBaterias;
  cantidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //parametros formulario

  baterias;

  formBateria: FormGroup = new FormGroup({
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
    private afs: AngularFirestore) {
  }

  cargarInputAutoCompletado() {
    let listaSinRepetir = new Set();

    this.afs.collection('baterias').snapshotChanges().subscribe(res => {
      this.baterias = res.map(bateriaRef => {
        let auxBateria = bateriaRef.payload.doc.data()
        auxBateria['id'] = bateriaRef.payload.doc.id;
        return auxBateria;
      });
      this.baterias.forEach(bateria => {
        listaSinRepetir.add(bateria['modelo']);
      })
      this.modelosExistentes = [...listaSinRepetir];
    });

    this.bateriasFiltrados = this.formBateria.controls.modelo.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );
  }


  ngOnInit(): void {
    this.cargarInputAutoCompletado();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.modelosExistentes.filter(bateria => bateria.toLowerCase().includes(filterValue));
  }


  buscarPorModeloYCalidad(listaBaterias, bateriaABuscar) {
    return listaBaterias.find(bateria => {
      if (bateria.modelo.toLowerCase() == bateriaABuscar.modelo.toLowerCase() &&
        bateria.calidad.toLowerCase() == bateriaABuscar.calidad.toLowerCase()) {
        return bateria;
      }
    });
  }

  agregarNuevoColor() {
    let { cantidad, color } = this.formBateria.value;
    let existeColor = this.nuevoBateria.stock.find(stock => stock.color == color);

    if (!existeColor) {
      cantidad <= 0
        ?
        this.toastService.simpleMessage('Error en la cantidad', 'la cantidad debe ser mayor a 0', ToastColor.warning)
        : this.nuevoBateria.stock.push({ cantidad, color });
    } else {
      this.toastService.simpleMessage('Error en el color', 'El color ya existe', ToastColor.warning)
    }
  }



  agregarBateria(nuevoBateria) {
    this.dataBase.crear(environment.TABLAS.baterias, nuevoBateria).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el bateria correctamente', ToastColor.success);

    });
  }

  obtenerObjetoBateria() {
    const { calidad, modelo, marca, precio, tipo } = this.formBateria.value;
    let { stock } = this.nuevoBateria;
    stock.length <= 0 ? stock = [{ color: 'Blanco', cantidad: 0 }] : null;

    return {
      calidad,
      modelo,
      marca,
      precio,
      tipo,
      stock
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
