import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Tapa } from 'src/app/pages/lista-tapas/lista-tapas.page';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-tapa',
  templateUrl: './form-tapa.component.html',
  styleUrls: ['./form-tapa.component.scss'],
})
export class FormTapaComponent implements OnInit {
  selectedColor = '#444444'; // Color seleccionado
  darkerColor = this.adjustColorBrightness(this.selectedColor, -20); // Color más oscuro
  @Input() nuevaTapa: Tapa = {
    calidad: '',
    modelo: '',
    marca: '',
    // precio: 0,
    stock: 0,
    detallesFinancieros: {
      colocacion: 0,
      costo: 0,
      margen: 0,
      precio: 0
    }
  }


  precioDolarBlue: number = 0;
  //auto complete
  modelosExistentes: any[] = [];//solo el string modelo
  tapasFiltrados: Observable<string[]> = new Observable<string[]>();
  //auto complete

  //parametros formulario
  marcas = this.infoConpatida.marcasModulos;
  calidades = this.infoConpatida.calidadesTapas;
  //parametros formulario

  tapas: any[] = [];

  formTapa: FormGroup = new FormGroup({
    modelo: new FormControl('', Validators.required),
    // precio: new FormControl('', Validators.required),
    marca: new FormControl('Samsung', Validators.required),
    calidad: new FormControl('Premium', Validators.required),
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

    this.afs.collection('tapas').snapshotChanges().subscribe(res => {
      this.tapas = res.map(tapasRef => {
        let auxTapa: any = tapasRef.payload.doc.data()
        auxTapa['id'] = tapasRef.payload.doc.id;
        return auxTapa;
      });
      this.tapas.forEach(tapa => {
        listaSinRepetir.add(tapa['modelo']);
      })
      this.modelosExistentes = [...listaSinRepetir];
    });

    this.tapasFiltrados = this.formTapa.controls['modelo'].valueChanges.pipe(
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

    return this.modelosExistentes.filter(tapa => tapa.toLowerCase().includes(filterValue));
  }


  buscarPorModeloYCalidad(listaTapas: any, tapaABuscar: any) {
    return listaTapas.find((tapa: any) => {
      if (tapa.modelo.toLowerCase() == tapaABuscar.modelo.toLowerCase() &&
        tapa.calidad.toLowerCase() == tapaABuscar.calidad.toLowerCase()) {
        return tapa;
      }
    });
  }

  agregarTapa(nuevaTapa: any) {
    this.dataBase.crear(environment.TABLAS.tapas, nuevaTapa).then(() => {
      this.toastService.simpleMessage('Exito', 'Se agrego el tapa correctamente', ToastColor.success);

    });
  }

  obtenerObjetoTapa() {
    return this.formTapa.value;
  }


  async procesarAltaTapa() {
    const nuevaTapa = this.obtenerObjetoTapa();

    let primeraConsulta = true;//para que no repira por el suscribe

    if (primeraConsulta) {
      let tapaExistente = this.buscarPorModeloYCalidad(this.tapas, nuevaTapa);
      tapaExistente
        ?
        this.toastService.simpleMessage('Error', 'El tapa ya existe', ToastColor.warning)
        : this.agregarTapa(nuevaTapa);
    }
    primeraConsulta = false;
  }
  adjustColorBrightness(hex: string, amount: number): string {
    let usePound = false;
    if (hex[0] === "#") {
      hex = hex.slice(1);
      usePound = true;
    }

    let num = parseInt(hex, 16);
    let r = Math.max(0, Math.min(255, (num >> 16) + amount));
    let g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    let b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));

    return (usePound ? "#" : "") + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase();
  }
  updateDarkerColor() {
    this.darkerColor = this.adjustColorBrightness(this.selectedColor, -20);
  }
}