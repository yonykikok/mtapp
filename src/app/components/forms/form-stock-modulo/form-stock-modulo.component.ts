import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataBaseService } from 'src/app/services/database.service';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

interface ModuloStock {
  calidad: string,
  modelo: string,
  marca: string,
  stock: {
    conMarco: [{ cantidad: number, color: string }],
    sinMarco: [{ cantidad: number, color: string }]
  }
}
@Component({
  selector: 'app-form-stock-modulo',
  templateUrl: './form-stock-modulo.component.html',
  styleUrls: ['./form-stock-modulo.component.scss'],
})

//TODO: hacer el autocomplete del input modulo, si no, quitar toda la logica de traida de modelos.
export class FormStockModuloComponent implements OnInit {


  @Input() nuevoModulo: ModuloStock = {
    calidad: '',
    modelo: '',
    marca: '',
    stock: {
      conMarco: [{ cantidad: 0, color: 'blanco' }],
      sinMarco: [{ cantidad: 0, color: 'blanco' }]
    }
  }

  //auto complete
  modelosExistentes: any[] = [];
  modulosFiltrados: Observable<string[]> = new Observable<string[]>();
  //auto complete

  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesModulos;

  modulos: any[] = [];

  formModulo: FormGroup = new FormGroup({
    modelo: new FormControl('', Validators.required),
    marca: new FormControl('Samsung', Validators.required),
    calidad: new FormControl('AAA', Validators.required)
  });


  constructor(
    private infoConpatida: InfoCompartidaService,
    private modalController:ModalController,
    private dataBase: DataBaseService,
    private afs: AngularFirestore,
    private toastService: ToastService) {
  }

  cargarInputAutoCompletado() {
    let listaSinRepetir = new Set();

    this.afs.collection('stockModulos').snapshotChanges().subscribe(res => {
      this.modulos = res.map(moduloRef => {
        let auxModulo: any = moduloRef.payload.doc.data()
        auxModulo['id'] = moduloRef.payload.doc.id;
        return auxModulo;
      });
      this.modulos.forEach(modulo => {
        listaSinRepetir.add(modulo['modelo']);
      })
      this.modelosExistentes = [...listaSinRepetir];
    });

    this.modulosFiltrados = this.formModulo.controls['modelo'].valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value)),
    );
  }


  ngOnInit(): void {
    this.cargarInputAutoCompletado();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.modelosExistentes.filter(modulo => modulo.toLowerCase().includes(filterValue));
  }
  buscarPorModeloCalidad(listaModulos: any, moduloABuscar: any) {
    return listaModulos.find((modulo: any) => {
      if (modulo.modelo.toLowerCase() == moduloABuscar.modelo.toLowerCase() &&
        modulo.calidad.toLowerCase() == moduloABuscar.calidad.toLowerCase()) {
        return modulo;
      }
    });
  }

  buscarPorModeloYCalidad(listaModulos: any, moduloABuscar: any) {
    return listaModulos.find((modulo: any) => {
      if (modulo.modelo.toLowerCase() == moduloABuscar.modelo.toLowerCase() &&
        modulo.calidad.toLowerCase() == moduloABuscar.calidad.toLowerCase()) {
        return modulo;
      }
    });
  }


  agregarModulo(nuevoModulo: any) {
    this.dataBase.crear(environment.TABLAS.stockModulos, nuevoModulo).then(() => {
      this.toastService.simpleMessage('Exito', 'Modulo agregado', ToastColor.success);
      this.modalController.dismiss();
      // this.snackBar.open('Modulo agregado', 'Cerrar', { duration: 5000, panelClass: ['successSnackBar'] });

    });
  }

  obtenerObjetoModulo() {
    const { calidad, modelo, marca } = this.formModulo.value;

    return {
      calidad,
      modelo,
      marca,
      stock: {
        conMarco: [],
        sinMarco: []
      }
    }
  }


  async procesarAltaModulo() {
    const nuevoModulo = this.obtenerObjetoModulo();

    let primeraConsulta = true;//para que no repira por el suscribe

    if (primeraConsulta) {
      let moduloExistente = this.buscarPorModeloCalidad(this.modulos, nuevoModulo);
      moduloExistente
        ? this.toastService.simpleMessage('Atencion', 'El modulo ya existe', ToastColor.warning)
        : this.agregarModulo(nuevoModulo);
    }
    primeraConsulta = false;
  }
}
