import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/database.service';
import { InfoCompartidaService, Modulo } from 'src/app/services/info-compartida.service';
import { environment } from 'src/environments/environment';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
@Component({
  selector: 'app-form-modulo',
  templateUrl: './form-modulo.component.html',
  styleUrls: ['./form-modulo.component.scss'],
})
export class FormModuloComponent implements OnInit {

  @Input() nuevoModulo: Modulo = {
    id: '',
    calidad: '',
    modelo: '',
    marca: '',
    tipo: '',
    stock: [],
    detallesFinancieros: {
      colocacion: 0,
      costo: 0,
      margen: 0,
      precio: 0
    },
    precio: 0
  }

  //auto complete
  modelosExistentes: string[] = [];
  modulosFiltrados: Observable<string[]> = new Observable<string[]>();
  //auto complete

  //parametros formulario
  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesModulos;
  colores = this.infoConpatida.coloresModulos;
  tipos = this.infoConpatida.tiposModulos;
  cantidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //parametros formulario

  modulos: Modulo[] = [];

  formModulo: FormGroup = new FormGroup({
    modelo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    cantidad: new FormControl(0, Validators.required),
    marca: new FormControl('Samsung', Validators.required),
    color: new FormControl('Blanco', Validators.required),
    tipo: new FormControl('Simple', Validators.required),
    calidad: new FormControl('AAA', Validators.required)
  });

  precioDolarBlue: number = 0;

  constructor(
    private infoConpatida: InfoCompartidaService,
    private dataBase: DataBaseService,
    private alertService: AlertService,
    private toastService: ToastService,
    private funcionesUtiles: FuncionesUtilesService,
    // readonly snackBar: MatSnackBar,
    private afs: AngularFirestore) {
  }

  cargarInputAutoCompletado() {
    let listaSinRepetir = new Set<string>();

    this.afs.collection('modulos').snapshotChanges().subscribe(res => {
      this.modulos = res.map(moduloRef => {
        let auxModulo: Modulo = moduloRef.payload.doc.data() as Modulo;
        auxModulo['id'] = moduloRef.payload.doc.id;
        return auxModulo;
      });
      this.modulos.forEach((modulo: Modulo) => {
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
    this.dataBase.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
      this.precioDolarBlue = res.payload.data().price;
    });
    this.cargarInputAutoCompletado();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.modelosExistentes.filter(modulo => modulo.toLowerCase().includes(filterValue));
  }
  buscarPorModeloCalidadYTipo(listaModulos: Modulo[], moduloABuscar: Modulo) {
    return listaModulos.find((modulo: Modulo) => {
      let retorno;
      if (modulo.modelo.toLowerCase() == moduloABuscar.modelo.toLowerCase() &&
        modulo.calidad.toLowerCase() == moduloABuscar.calidad.toLowerCase() &&
        modulo.tipo.toLowerCase() == moduloABuscar.tipo.toLowerCase()) {
        retorno = modulo;
      }
      return retorno;
    });
  }

  buscarPorModeloYCalidad(listaModulos: Modulo[], moduloABuscar: Modulo) {
    return listaModulos.find((modulo: Modulo) => {
      let retorno;
      if (modulo.modelo.toLowerCase() == moduloABuscar.modelo.toLowerCase() &&
        modulo.calidad.toLowerCase() == moduloABuscar.calidad.toLowerCase()) {
        retorno = modulo;
      }
      return retorno;
    });
  }

  agregarNuevoColor() {
    let { cantidad, color } = this.formModulo.value;
    let existeColor = this.nuevoModulo.stock.find(stock => stock.color == color);

    if (!existeColor) {
      cantidad <= 0
        ?
        this.toastService.simpleMessage('Error en la cantidad', 'la cantidad debe ser mayor a 0', ToastColor.warning)
        : this.nuevoModulo.stock.push({ cantidad, color });
    } else {
      this.toastService.simpleMessage('Error en el color', 'El color ya existe', ToastColor.warning)
    }
  }



  agregarModulo(nuevoModulo: Modulo) {
    this.dataBase.crear(environment.TABLAS.modulos, nuevoModulo).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el modulo correctamente', ToastColor.success);
      this.formModulo.reset();

    });
  }

  obtenerObjetoModulo() {
    const { calidad, modelo, marca, tipo, precio } = this.formModulo.value;
    let { stock } = this.nuevoModulo;
    stock.length <= 0 ? stock = [{ color: 'Blanco', cantidad: 0 }] : null;
    let modulo: Modulo = {
      calidad,
      modelo,
      marca,
      tipo,
      precio,
      stock,
      detallesFinancieros: {
        colocacion: 0,
        costo: 0,
        margen: 0,
        precio: 0
      }
    }
    return modulo;
  }


  async procesarAltaModulo() {
    const nuevoModulo: Modulo = this.obtenerObjetoModulo();

    let primeraConsulta = true;//para que no repira por el suscribe

    if (primeraConsulta) {
      let moduloExistente = this.buscarPorModeloCalidadYTipo(this.modulos, nuevoModulo);
      moduloExistente
        ?
        this.toastService.simpleMessage('Error', 'El modulo ya existe', ToastColor.warning)
        : this.agregarModulo(nuevoModulo);
    }
    primeraConsulta = false;
  }

}
