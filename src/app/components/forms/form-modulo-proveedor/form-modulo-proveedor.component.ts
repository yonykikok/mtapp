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
// const modulosparaagregar = [
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J2 CORE",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J4",
//     "precio": 22.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J4 PLUS",
//     "precio": 13.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J5 PRIME",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J7",
//     "precio": 22.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J7 2016",
//     "precio": 22.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J7 NEO",
//     "precio": 22.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J7 PRO",
//     "precio": 22.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J7 PRIME",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J6",
//     "precio": 39.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "J8",
//     "precio": 29.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A01",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A01 CORE",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A10",
//     "precio": 12.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A10S",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A02(A125F-A022F)",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A12 (A127F-A32F)",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A02-S/A03s/A03",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A03 CORE",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A04E",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A04",
//     "precio": 18.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A04S",
//     "precio": 20.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A7 2018",
//     "precio": 43.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A11",
//     "precio": 18.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A13 4G",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A20 CON MARCO",
//     "precio": 26.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A20-S CON MARCO",
//     "precio": 19.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A21-S CON MARCO",
//     "precio": 18.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A23",
//     "precio": 19.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A22 4G",
//     "precio": 29.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A22 5G CON MARCO",
//     "precio": 20.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A30 CON MARCO",
//     "precio": 21.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A30-S CON MARCO",
//     "precio": 22.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A31 CON MARCO",
//     "precio": 28.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A32 4G",
//     "precio": 37.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A32 5G",
//     "precio": 26.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A50 CON MARCO",
//     "precio": 26.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A51 CON MARCO",
//     "precio": 29.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A52",
//     "precio": 58.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A53",
//     "precio": 41.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A70 CON MARCO",
//     "precio": 60.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A71 CON MARCO",
//     "precio": 73.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "A72 CON MARCO",
//     "precio": 83.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "SAMSUNG",
//     "modelo": "S20 FE",
//     "precio": 54.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E",
//     "precio": 10.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E2",
//     "precio": 10.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E4",
//     "precio": 10.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E4 PLUS",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E5/G6 PLAY",
//     "precio": 14.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E5 PLUS",
//     "precio": 14.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E5 PLAY GO",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E6",
//     "precio": 10.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E6S/E6I",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E6 PLUS",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E6 PLAY",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E7/E7I POWER",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E7 PLUS/G9 PLAY",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E32",
//     "precio": 18.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E13",
//     "precio": 23.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E22",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E20",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "E40",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G5",
//     "precio": 10.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G5-S",
//     "precio": 10.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G7/G7 PLUS",
//     "precio": 22.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G7 PLAY",
//     "precio": 18.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G7 POWER",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G8",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G8 PLUS",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G8 PLAY/MACRO",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G8 POWER",
//     "precio": 21.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G8 POWER LITE",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G9 PLUS",
//     "precio": 21.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G9 POWER",
//     "precio": 18.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G20",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G22",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G30",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G31/G41/G71",
//     "precio": 25.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G32",
//     "precio": 23.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G50",
//     "precio": 33.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G42",
//     "precio": 25.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G52",
//     "precio": 62.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G72",
//     "precio": 42.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "G51/G60S",
//     "precio": 20.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "Z PLAY",
//     "precio": 28.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "Z2 PLAY",
//     "precio": 23.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "Z3 PLAY",
//     "precio": 27.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "FUSION",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "ONE",
//     "precio": 21.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "MOTOROLA",
//     "modelo": "VISION/ACTION",
//     "precio": 38.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K4 2017",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K8",
//     "precio": 14.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K8  2017",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K9",
//     "precio": 16.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K10 V.3",
//     "precio": 19.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K10 TV",
//     "precio": 19.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K10 2017",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K11 C/M",
//     "precio": 18.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K22/K22 PLUS",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K40",
//     "precio": 24.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K41S",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K42/K52 S/M",
//     "precio": 20.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K42 C/M",
//     "precio": 20.00,
//     "tipo": "C/M",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K40S",
//     "precio": 21.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K50",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K50S",
//     "precio": 14.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K51S/K60S",
//     "precio": 29.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "K61",
//     "precio": 21.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "LG",
//     "modelo": "SPIRIT",
//     "precio": 12.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "5C-5G",
//     "precio": 10.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "6G",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "6S",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "6G PLUS",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "6S PLUS",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "7G",
//     "precio": 15.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "7 PLUS",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "8G",
//     "precio": 17.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "8 PLUS",
//     "precio": 20.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "X",
//     "precio": 37.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "XS MAX",
//     "precio": 36.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "XR",
//     "precio": 48.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "X11",
//     "precio": 30.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "X11PRO MAX",
//     "precio": 59.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "X12",
//     "precio": 89.00,
//     "tipo": "Simple",
//     "calidad": "oled"
//   },
//   {
//     "marca": "IPHONE",
//     "modelo": "X12PRO MAX",
//     "precio": 115.00,
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


    // this.proveedor.modulos=[...modulosparaagregar];
    // this.dataBase.actualizar(environment.TABLAS.proveedores,this.proveedor,this.proveedor.id);
    // console.log(this.proveedor);
    
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
