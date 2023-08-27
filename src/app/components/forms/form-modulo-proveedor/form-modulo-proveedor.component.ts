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
import { ModalController } from '@ionic/angular';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
// const modulos = [
//   {
//     "modelo": "A01 core",
//     "precio": 10500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A02",
//     "precio": 12000,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A02s",
//     "precio": 9800,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A02s",
//     "precio": 12000,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A03",
//     "precio": 9800,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A03s",
//     "precio": 9800,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A03",
//     "precio": 12000,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A03 core",
//     "precio": 9800,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A03s",
//     "precio": 13500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A10s",
//     "precio": 9900,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A10s",
//     "precio": 11500,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A11",
//     "precio": 13500,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A12 A125f -A032f",
//     "precio": 12500,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A12 A127f",
//     "precio": 12500,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A22 4G",
//     "precio": 22200,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A32 4G",
//     "precio": 24000,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A51",
//     "precio": 28000,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "J2 core",
//     "precio": 11500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "J400",
//     "precio": 17500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "J5 Prime",
//     "precio": 11500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "J7 Prime",
//     "precio": 11800,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "J701 Neo",
//     "precio": 17500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "J710",
//     "precio": 17500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "A6 plus",
//     "precio": 20000,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "A30",
//     "precio": 15800,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "A50",
//     "precio": 15800,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "A51",
//     "precio": 19000,
//     "marca": "Samsung",
//     "tipo": "c/m",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J1 Ace",
//     "precio": 11000,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J200",
//     "precio": 11500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J310",
//     "precio": 12800,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J400",
//     "precio": 15000,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J500",
//     "precio": 13000,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J510",
//     "precio": 15500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J600",
//     "precio": 14000,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J701",
//     "precio": 13000,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J710",
//     "precio": 14000,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "J710",
//     "precio": 14500,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "J810",
//     "precio": 17800,
//     "marca": "Samsung",
//     "tipo": "Simple",
//     "calidad": "incel"
//   },
//   {
//     "modelo": "C plus",
//     "precio": 10900,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G2",
//     "precio": 11000,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G3",
//     "precio": 11300,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G6 play",
//     "precio": 11500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G7 play",
//     "precio": 14500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G7 power",
//     "precio": 12500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G7 plus",
//     "precio": 16500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G8 play-one macro",
//     "precio": 11500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "g8 plus",
//     "precio": 16000,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G8 power",
//     "precio": 11800,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G8 power lite",
//     "precio": 12600,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "G22",
//     "precio": 12500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "One",
//     "precio": 12300,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E2",
//     "precio": 7200,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E4 plus",
//     "precio": 10900,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E5 play",
//     "precio": 12200,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E5 plus",
//     "precio": 11800,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E6 plus",
//     "precio": 10500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E6 play",
//     "precio": 10500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E6s",
//     "precio": 11900,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "E40",
//     "precio": 13500,
//     "marca": "Motorola",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "6g",
//     "precio": 10200,
//     "marca": "Apple",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "6 plus",
//     "precio": 11900,
//     "marca": "Apple",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "6s plus",
//     "precio": 11900,
//     "marca": "Apple",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "7 plus",
//     "precio": 11500,
//     "marca": "Apple",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "8 plus",
//     "precio": 11500,
//     "marca": "Apple",
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "modelo": "k22-k22 plus",
//     "precio": 13000,
//     "marca": "LG",
//     "tipo": "Simple",
//     "calidad": "oled"
//   }
// ];
@Component({
  selector: 'app-form-modulo-proveedor',
  templateUrl: './form-modulo-proveedor.component.html',
  styleUrls: ['./form-modulo-proveedor.component.scss'],
})

export class FormModuloProveedorComponent implements OnInit {
  proveedor;
  @Input() nuevoModulo = {
    calidad: '',
    modelo: '',
    marca: '',
    precio: '',
    tipo: '',
  }

  //auto complete
  modelosExistentes = [];
  modulosFiltrados: Observable<string[]>;
  //auto complete

  //parametros formulario
  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesModulosProveedores;
  tipos = this.infoConpatida.tiposModulos;
  //parametros formulario

  modulos;

  precioDolarBlue: number | null = null;
  formModulo: FormGroup = new FormGroup({
    marca: new FormControl('Samsung', Validators.required),
    modelo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    tipo: new FormControl('Simple', Validators.required),
    calidad: new FormControl('AAA', Validators.required)
  });


  constructor(
    private infoConpatida: InfoCompartidaService,
    private dataBase: DataBaseService,
    private alertService: AlertService,
    private toastService: ToastService,
    private modalController: ModalController,
    private funcionesUtiles: FuncionesUtilesService,
    // readonly snackBar: MatSnackBar,
    private afs: AngularFirestore) {
  }

  cargarInputAutoCompletado() {
    let listaSinRepetir = new Set();

    this.modulos = this.proveedor.modulos;

    this.modulos.forEach(modulo => {
      listaSinRepetir.add(modulo['modelo']);
    })
    this.modelosExistentes = [...listaSinRepetir];

    this.modulosFiltrados = this.formModulo.controls.modelo.valueChanges.pipe(
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


    // this.proveedor.modulos = modulos.map(modulo => {
    //   modulo.precio = (modulo.precio / 720);
    //   return modulo;
    // });
    this.dataBase.actualizar(environment.TABLAS.proveedores, this.proveedor, this.proveedor.id);
    console.log(this.proveedor);

    return;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.modelosExistentes.filter(modulo => modulo.toLowerCase().includes(filterValue));
  }
  buscarPorModeloCalidadYTipo(listaModulos, moduloABuscar) {
    return listaModulos.find(modulo => {
      if (modulo.modelo.toLowerCase() == moduloABuscar.modelo.toLowerCase() &&
        modulo.calidad.toLowerCase() == moduloABuscar.calidad.toLowerCase() &&
        modulo.tipo.toLowerCase() == moduloABuscar.tipo.toLowerCase()) {
        return modulo;
      }
    });
  }

  agregarModulo(nuevoModulo) {
    this.proveedor.modulos.push(nuevoModulo);

    // return;
    this.dataBase.actualizar(environment.TABLAS.proveedores, this.proveedor, this.proveedor.id).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el modulo correctamente', ToastColor.success);
      this.formModulo.reset();
    });
  }

  obtenerObjetoModulo() {
    const { calidad, modelo, marca, precio, tipo } = this.formModulo.value;

    return {
      calidad,
      modelo,
      marca,
      precio,
      tipo,
    }
  }


  async procesarAltaModulo() {
    const nuevoModulo = this.obtenerObjetoModulo();

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
