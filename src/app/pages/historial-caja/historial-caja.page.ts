import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
import { BusquedaPorTextoComponent } from 'src/app/components/busqueda-por-texto/busqueda-por-texto.component';
import { DetalleVentasDelDiaComponent } from 'src/app/components/detalle-ventas-del-dia/detalle-ventas-del-dia.component';
import { MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
// const objetoPrueba = {
//   "dias": [
//     {
//       "fecha": 1704078000119,
//       "fechaString": "Mon Jan 01 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "montoTotal": 0,
//       "montoInicial": 0,
//       "ventas": [],
//       "id": "2024-01-01",
//       "cuadra": false
//     },
//     {
//       "id": "2024-01-02",
//       "ventas": [
//         {
//           "boleta": "",
//           "descripcion": "cargador inova v8 3.1",
//           "medioDePago": "efectivo",
//           "precio": 3300
//         },
//         {
//           "precio": 53500,
//           "boleta": 5711,
//           "descripcion": "módulo a32 4g",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5709,
//           "descripcion": "módulo a21s",
//           "precio": 32100,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 7700,
//           "boleta": 5694,
//           "descripcion": "flex power g82"
//         },
//         {
//           "boleta": "",
//           "descripcion": "usb v8",
//           "medioDePago": "efectivo",
//           "precio": 1450
//         },
//         {
//           "descripcion": "cargador iphone ",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 7900
//         },
//         {
//           "precio": 5500,
//           "boleta": 5710,
//           "descripcion": "pin de j7",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "desarme y arme iphone 11",
//           "medioDePago": "efectivo",
//           "boleta": 5705,
//           "precio": 5500
//         },
//         {
//           "boleta": 5692,
//           "medioDePago": "efectivo",
//           "precio": 5500,
//           "descripcion": "pin e5 play"
//         },
//         {
//           "descripcion": "desarme y arme a03",
//           "boleta": 5714,
//           "precio": 4500,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5714,
//           "precio": 1300,
//           "descripcion": "film a03 10d"
//         },
//         {
//           "descripcion": "usb tipo c",
//           "medioDePago": "efectivo",
//           "precio": 1750,
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "cargador inova v8 3.1",
//           "precio": 3300,
//           "boleta": ""
//         }
//       ],
//       "fecha": 1704164400799,
//       "cuadra": false,
//       "montoInicial": 0,
//       "montoTotal": 0,
//       "fechaString": "Tue Jan 02 2024 00:00:00 GMT-0300 (hora estándar de Argentina)"
//     },
//     {
//       "ventas": [
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "usb tipo c",
//           "precio": 1750
//         },
//         {
//           "precio": 11900,
//           "descripcion": "flex de carga a10",
//           "medioDePago": "efectivo",
//           "boleta": 5720
//         },
//         {
//           "boleta": "",
//           "precio": 1300,
//           "descripcion": "film a02s 10d",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "módulo a02",
//           "boleta": 5713,
//           "precio": 31000,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5713,
//           "descripcion": "film 10d a02",
//           "precio": 1300
//         },
//         {
//           "descripcion": "film j7 nro común ",
//           "boleta": "",
//           "precio": 1000,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "descripcion": "auriculares Sony",
//           "medioDePago": "efectivo",
//           "precio": 4250
//         },
//         {
//           "precio": 3300,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "cargador inova 3.1 v8"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 3500,
//           "descripcion": "pin en placa franco"
//         }
//       ],
//       "cuadra": false,
//       "montoTotalEfectivo": 0,
//       "id": "2024-01-03",
//       "montoTotalMercadoPago": 0,
//       "montoInicial": 0,
//       "montoTotalTransferencia": 0,
//       "fechaString": "Wed Jan 03 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotalNegativo": 0,
//       "montoTotal": 0,
//       "fecha": 1704250800000
//     },
//     {
//       "montoTotalNegativo": 0,
//       "montoTotalEfectivo": 0,
//       "ventas": [
//         {
//           "precio": 32100,
//           "medioDePago": "efectivo",
//           "descripcion": "módulo e7",
//           "boleta": 5707
//         },
//         {
//           "boleta": 5707,
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "descripcion": "film e7 10d"
//         },
//         {
//           "precio": 1300,
//           "boleta": 5701,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a12"
//         },
//         {
//           "descripcion": "módulo a12",
//           "medioDePago": "efectivo",
//           "precio": 31000,
//           "boleta": 5701
//         },
//         {
//           "precio": 2800,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "funda m06 a21s"
//         },
//         {
//           "precio": 1750,
//           "descripcion": "usb tipo c",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 5500,
//           "medioDePago": "efectivo",
//           "descripcion": "pin a10s",
//           "boleta": 5723
//         },
//         {
//           "boleta": 5619,
//           "medioDePago": "efectivo",
//           "precio": 300,
//           "descripcion": "chip personal"
//         },
//         {
//           "descripcion": "pin j7 prime",
//           "boleta": 5715,
//           "medioDePago": "efectivo",
//           "precio": 5500
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 8000,
//           "boleta": 5727,
//           "descripcion": "resto g7"
//         },
//         {
//           "precio": 30000,
//           "medioDePago": "efectivo",
//           "boleta": 5727,
//           "descripcion": "seña módulo g7"
//         },
//         {
//           "medioDePago": "transferencia",
//           "boleta": 5619,
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 5940,
//           "descripcion": "pin j7 neo"
//         },
//         {
//           "descripcion": "batería j7 neo",
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": 5619,
//           "precio": 9417.6
//         },
//         {
//           "medioDePago": "transferencia",
//           "boleta": "",
//           "precio": 6588,
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "batería j7"
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "cuadra": false,
//       "fechaString": "Thu Jan 04 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "fecha": 1704337200000,
//       "id": "2024-01-04",
//       "montoTotal": 0,
//       "montoInicial": 0,
//       "montoTotalTransferencia": 0
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "fechaString": "Fri Jan 05 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "ventas": [
//         {
//           "precio": 1000,
//           "descripcion": "cambio",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5721,
//           "precio": 4500,
//           "descripcion": "desarme y arme G5s plus"
//         },
//         {
//           "descripcion": "auriculares Bluetooth tws ",
//           "precio": 11350,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 3000,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "funda a14 m07"
//         },
//         {
//           "precio": 3250,
//           "boleta": "",
//           "descripcion": "usb iPhone ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "cargador universal ",
//           "boleta": "",
//           "precio": 3000,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 37000,
//           "boleta": "",
//           "descripcion": "venta j7 prime",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "descripcion": "film j7 prime 10d"
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "funda j7 prime 08",
//           "precio": 3600
//         },
//         {
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 7452,
//           "medioDePago": "transferencia",
//           "boleta": "",
//           "descripcion": "auriculares p47"
//         },
//         {
//           "descripcion": "auriculares p47",
//           "medioDePago": "transferencia",
//           "precio": 7452,
//           "boleta": "",
//           "titularDeCuenta": "s.t.multitask"
//         },
//         {
//           "boleta": "",
//           "medioDePago": "transferencia",
//           "descripcion": "soporte mano",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 2106
//         },
//         {
//           "boleta": "",
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "soporte mano",
//           "medioDePago": "transferencia",
//           "precio": 2106
//         },
//         {
//           "boleta": "",
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia",
//           "descripcion": "usb v3",
//           "precio": 11286
//         },
//         {
//           "descripcion": "módulo a02",
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia",
//           "boleta": 5724,
//           "precio": 27993.6
//         },
//         {
//           "precio": 3132,
//           "boleta": 5724,
//           "descripcion": "envío a02",
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia"
//         },
//         {
//           "precio": 3888,
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "funda a02 m08",
//           "boleta": 5724
//         },
//         {
//           "precio": 11286,
//           "descripcion": "joystick play 3",
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": ""
//         }
//       ],
//       "cuadra": false,
//       "montoInicial": 0,
//       "fecha": 1704423600000,
//       "montoTotalEfectivo": 0,
//       "montoTotalTransferencia": 0,
//       "montoTotalNegativo": 0,
//       "id": "2024-01-05",
//       "montoTotal": 0
//     },
//     {
//       "fechaString": "Sat Jan 06 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotal": 0,
//       "montoTotalEfectivo": 0,
//       "cuadra": false,
//       "fecha": 1704510000000,
//       "montoTotalTransferencia": 0,
//       "id": "2024-01-06",
//       "montoTotalNegativo": 0,
//       "ventas": [
//         {
//           "medioDePago": "transferencia",
//           "descripcion": "resto módulo g31",
//           "boleta": 5736,
//           "precio": 25056,
//           "titularDeCuenta": "s.t.multitask"
//         },
//         {
//           "precio": 1404,
//           "medioDePago": "transferencia",
//           "descripcion": "film 10d g31",
//           "boleta": 5736,
//           "titularDeCuenta": "s.t.multitask"
//         },
//         {
//           "medioDePago": "transferencia",
//           "precio": 21600,
//           "descripcion": "venta j2 prime",
//           "boleta": "",
//           "titularDeCuenta": "s.t.multitask"
//         },
//         {
//           "medioDePago": "transferencia",
//           "descripcion": "film j2 prime",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 1080,
//           "boleta": ""
//         },
//         {
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "funda j2 prime m08",
//           "boleta": "",
//           "precio": 3888,
//           "medioDePago": "transferencia"
//         },
//         {
//           "precio": 300,
//           "descripcion": "chip Movistar ",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5727,
//           "descripcion": "film 10d g7",
//           "precio": 1300
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "resto módulo g7",
//           "boleta": 5727,
//           "precio": 880
//         },
//         {
//           "precio": 32820,
//           "medioDePago": "efectivo",
//           "descripcion": "seña módulo One fusión ",
//           "boleta": 5728
//         },
//         {
//           "boleta": 5699,
//           "precio": 31030,
//           "descripcion": "módulo a04e",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5699,
//           "descripcion": "film a04e",
//           "precio": 1300
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "descripcion": "film 10d a51"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 2800,
//           "descripcion": "funda a51 m06",
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "precio": 1750,
//           "descripcion": "usb tipo c",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "módulo g31",
//           "medioDePago": "efectivo",
//           "boleta": 5736,
//           "precio": 20000
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "módulo g42",
//           "boleta": 5718,
//           "precio": 41730
//         },
//         {
//           "boleta": "",
//           "precio": 1000,
//           "medioDePago": "efectivo",
//           "descripcion": "film a02 core comun"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a10",
//           "boleta": "",
//           "precio": 1300
//         },
//         {
//           "boleta": "",
//           "descripcion": "funda antigolpe m04",
//           "medioDePago": "efectivo",
//           "precio": 1400
//         },
//         {
//           "boleta": "",
//           "descripcion": "funda a10 m06",
//           "medioDePago": "efectivo",
//           "precio": 2800
//         },
//         {
//           "descripcion": "chip movistar",
//           "medioDePago": "efectivo",
//           "precio": 300,
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "touch Tablet ",
//           "boleta": 5737,
//           "precio": 7500
//         },
//         {
//           "boleta": 5734,
//           "precio": 36720,
//           "descripcion": "módulo g51",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5734,
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "descripcion": "film 10d g51"
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "montoInicial": 0
//     },
//     {
//       "fechaString": "Sun Jan 07 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "cuadra": false,
//       "ventas": [],
//       "id": "2024-01-07",
//       "montoInicial": 0,
//       "fecha": 1704596400000,
//       "montoTotalNegativo": 0,
//       "montoTotalMercadoPago": 0,
//       "montoTotalEfectivo": 0,
//       "montoTotal": 0,
//       "montoTotalTransferencia": 0
//     },
//     {
//       "id": "2024-01-08",
//       "fecha": 1704682800000,
//       "fechaString": "Mon Jan 08 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotalNegativo": 0,
//       "cuadra": false,
//       "montoInicial": 0,
//       "montoTotalEfectivo": 0,
//       "montoTotalMercadoPago": 0,
//       "montoTotal": 0,
//       "montoTotalTransferencia": 0,
//       "ventas": [
//         {
//           "boleta": "",
//           "precio": 12960,
//           "descripcion": "resto equipo e5 play",
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia"
//         },
//         {
//           "boleta": "",
//           "medioDePago": "transferencia",
//           "precio": 3564,
//           "descripcion": "cargador inova 3.1 v8",
//           "titularDeCuenta": "s.t.multitask"
//         },
//         {
//           "descripcion": "film común g41",
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": "",
//           "medioDePago": "transferencia",
//           "precio": 1080
//         },
//         {
//           "precio": 6350,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "cabezal Samsung tipo c"
//         },
//         {
//           "precio": 57000,
//           "descripcion": "venta a30s",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "descripcion": "film a30s",
//           "medioDePago": "efectivo",
//           "precio": 1000,
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": -14000,
//           "boleta": 5743,
//           "descripcion": "compra g51"
//         },
//         {
//           "precio": 5500,
//           "descripcion": "limpieza a32",
//           "medioDePago": "efectivo",
//           "boleta": 5740
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 20000,
//           "descripcion": "venta e5 play"
//         },
//         {
//           "precio": 3300,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "cargador inova v8 3.1"
//         },
//         {
//           "boleta": "",
//           "precio": 900,
//           "descripcion": "auricular oferta",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 300,
//           "descripcion": "chip movistar",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "usb iphone",
//           "medioDePago": "efectivo",
//           "precio": 3250,
//           "boleta": ""
//         },
//         {
//           "descripcion": "cuenta lujan ",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 10400
//         },
//         {
//           "descripcion": "módulo a21s",
//           "precio": 32550,
//           "medioDePago": "efectivo",
//           "boleta": 5742
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "módulo a03",
//           "precio": 29290,
//           "boleta": 5743
//         },
//         {
//           "descripcion": "limpieza a20",
//           "precio": 5500,
//           "medioDePago": "efectivo",
//           "boleta": 5741
//         }
//       ]
//     },
//     {
//       "fechaString": "Tue Jan 09 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "ventas": [
//         {
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "film 10d a31",
//           "boleta": "",
//           "precio": 1404
//         },
//         {
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia",
//           "precio": 8640,
//           "boleta": "",
//           "descripcion": "memoria 32gb"
//         },
//         {
//           "descripcion": "porta memoria ",
//           "boleta": "",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 4806,
//           "medioDePago": "transferencia"
//         },
//         {
//           "descripcion": "módulo a03",
//           "boleta": 5746,
//           "medioDePago": "efectivo",
//           "precio": 29290
//         },
//         {
//           "descripcion": "film 10d a03",
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "boleta": 5746
//         },
//         {
//           "descripcion": "usb v8",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 1250
//         },
//         {
//           "boleta": "",
//           "precio": 10,
//           "descripcion": "cambio adri ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 3600,
//           "descripcion": "funda a03 m08",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 37000,
//           "boleta": 5754,
//           "descripcion": "seña módulo a03 core"
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "fecha": 1704769200000,
//       "montoInicial": 0,
//       "cuadra": false,
//       "montoTotalTransferencia": 0,
//       "montoTotalEfectivo": 0,
//       "montoTotalNegativo": 0,
//       "id": "2024-01-09",
//       "montoTotal": 0
//     },
//     {
//       "montoTotal": 0,
//       "montoTotalTransferencia": 0,
//       "id": "2024-01-10",
//       "montoTotalEfectivo": 0,
//       "fechaString": "Wed Jan 10 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "cuadra": false,
//       "fecha": 1704855600000,
//       "montoInicial": 0,
//       "montoTotalMercadoPago": 0,
//       "ventas": [
//         {
//           "boleta": "",
//           "descripcion": "venta a02s",
//           "medioDePago": "efectivo",
//           "precio": 49000
//         },
//         {
//           "precio": 1300,
//           "descripcion": "film 10d a02s",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "boleta": 5754,
//           "precio": 200,
//           "descripcion": "resto módulo a03 core",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a03 core",
//           "boleta": 5754,
//           "precio": 1300
//         },
//         {
//           "descripcion": "film 10d e7",
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "boleta": ""
//         },
//         {
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "film 10d a03"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 8000,
//           "boleta": 5745,
//           "descripcion": "cuenta a6 plus"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "limpieza a04e",
//           "precio": 5500,
//           "boleta": 5748
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "ringo",
//           "precio": 1200
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 1200,
//           "descripcion": "ringo",
//           "boleta": ""
//         },
//         {
//           "precio": 1200,
//           "descripcion": "ringo",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1000,
//           "boleta": "",
//           "descripcion": "film j6",
//           "medioDePago": "efectivo"
//         }
//       ],
//       "montoTotalNegativo": 0
//     },
//     {
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 3600,
//           "descripcion": "funda j6 m08"
//         },
//         {
//           "descripcion": "cuenta diego",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 1500
//         },
//         {
//           "precio": 2800,
//           "boleta": "",
//           "descripcion": "auriculares ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5755,
//           "precio": 36000,
//           "descripcion": "módulo e7 plus",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1000,
//           "medioDePago": "efectivo",
//           "descripcion": "film común e7 plus",
//           "boleta": ""
//         }
//       ],
//       "fechaString": "Thu Jan 11 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotalTransferencia": 0,
//       "montoTotalEfectivo": 0,
//       "montoTotalNegativo": 0,
//       "montoTotal": 0,
//       "cuadra": false,
//       "id": "2024-01-11",
//       "montoTotalMercadoPago": 0,
//       "montoInicial": 0,
//       "fecha": 1704942000000
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "fecha": 1705028400000,
//       "montoTotalNegativo": 0,
//       "ventas": [
//         {
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": -4000,
//           "boleta": 5757,
//           "descripcion": "compra s7 edge"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 3250,
//           "descripcion": "usb iphone",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 2000,
//           "boleta": "",
//           "descripcion": "seña batería gw "
//         },
//         {
//           "boleta": 5761,
//           "descripcion": "módulo j4",
//           "medioDePago": "efectivo",
//           "precio": 39600
//         },
//         {
//           "boleta": "",
//           "precio": 1000,
//           "medioDePago": "efectivo",
//           "descripcion": "film común a51"
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 18350,
//           "descripcion": "auriculares lenovo "
//         },
//         {
//           "descripcion": "cargador inova 5.1 inova",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 6300
//         },
//         {
//           "descripcion": "cabezal inova",
//           "boleta": "",
//           "precio": 2650,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "descripcion": "usb tipo c",
//           "precio": 1750,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "descripcion": "film común e20",
//           "medioDePago": "efectivo",
//           "precio": 1000
//         },
//         {
//           "boleta": "",
//           "descripcion": "cuenta a6 plus lucia",
//           "precio": -3000,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a22 4g",
//           "boleta": "",
//           "precio": 1300
//         },
//         {
//           "boleta": "",
//           "precio": 20000,
//           "descripcion": "venta j2 prime",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 1300,
//           "descripcion": "film j2 prime ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "descripcion": "funda m06 j2 prime",
//           "precio": 2800,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "uso de maquinaria st juanpi ",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 1000
//         },
//         {
//           "boleta": "",
//           "descripcion": "vidrio oca st juanpi ",
//           "precio": 3500,
//           "medioDePago": "efectivo"
//         }
//       ],
//       "montoInicial": 0,
//       "montoTotal": 0,
//       "montoTotalTransferencia": 0,
//       "montoTotalEfectivo": 0,
//       "id": "2024-01-12",
//       "fechaString": "Fri Jan 12 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "cuadra": false
//     },
//     {
//       "montoTotalTransferencia": 0,
//       "id": "2024-01-13",
//       "montoTotalMercadoPago": 0,
//       "montoTotalEfectivo": 0,
//       "montoTotalNegativo": 0,
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 1300,
//           "descripcion": "film 10d g51"
//         },
//         {
//           "descripcion": "cargador inova 3.1 v8",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 3300
//         },
//         {
//           "boleta": "",
//           "descripcion": "film 10d s20 fe",
//           "precio": 1300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 5350,
//           "descripcion": "cargador inova tipo c 5.1",
//           "boleta": ""
//         },
//         {
//           "precio": 3000,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "seña parlante jbl imitación "
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "flex de carga e7 plus",
//           "boleta": 5765,
//           "precio": 11900
//         },
//         {
//           "boleta": "",
//           "descripcion": "chip claro",
//           "precio": 300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "cuenta de Tablet ",
//           "medioDePago": "efectivo",
//           "boleta": 5762,
//           "precio": 5000
//         },
//         {
//           "descripcion": "film común a01",
//           "medioDePago": "efectivo",
//           "precio": 1000,
//           "boleta": ""
//         },
//         {
//           "precio": 1400,
//           "descripcion": "usb v3",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         }
//       ],
//       "fechaString": "Sat Jan 13 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoInicial": 0,
//       "cuadra": false,
//       "fecha": 1705114800000,
//       "montoTotal": 0
//     },
//     {
//       "ventas": [],
//       "montoInicial": 0,
//       "fechaString": "Sun Jan 14 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "fecha": 1705201200000,
//       "montoTotalMercadoPago": 0,
//       "montoTotal": 0,
//       "cuadra": false,
//       "id": "2024-01-14",
//       "montoTotalTransferencia": 0,
//       "montoTotalEfectivo": 0,
//       "montoTotalNegativo": 0
//     },
//     {
//       "montoTotalTransferencia": 0,
//       "id": "2024-01-15",
//       "cuadra": false,
//       "montoInicial": 0,
//       "fecha": 1705287600000,
//       "fechaString": "Mon Jan 15 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotalMercadoPago": 0,
//       "ventas": [
//         {
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "film 10d a13"
//         },
//         {
//           "precio": 1000,
//           "medioDePago": "efectivo",
//           "descripcion": "film común a14",
//           "boleta": ""
//         },
//         {
//           "descripcion": "usb tipo c",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 2100
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "cabezal Samsung tipo c",
//           "precio": 6350
//         }
//       ],
//       "montoTotalNegativo": 0,
//       "montoTotal": 0,
//       "montoTotalEfectivo": 0
//     },
//     {
//       "montoTotalEfectivo": 0,
//       "montoTotalTransferencia": 0,
//       "montoTotalMercadoPago": 0,
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "flex de carga a03",
//           "boleta": 5768,
//           "precio": 11900
//         },
//         {
//           "descripcion": "cargador inova 3.1 v8",
//           "boleta": "",
//           "precio": 3300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "usb tipo c",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 2100
//         },
//         {
//           "boleta": 5738,
//           "precio": 4500,
//           "descripcion": "desarme y arme a01",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "ringo",
//           "boleta": "",
//           "precio": 1200
//         },
//         {
//           "descripcion": "devolución de seña batería gw ",
//           "precio": -2000,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "funda a04 m08",
//           "precio": 3600,
//           "boleta": ""
//         },
//         {
//           "descripcion": "cargador de notebook universal",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 10900
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 3300,
//           "descripcion": "cargador inova v8 3.1"
//         },
//         {
//           "descripcion": "módulo a04",
//           "boleta": 5772,
//           "medioDePago": "efectivo",
//           "precio": 38400
//         },
//         {
//           "descripcion": "film 10d a04",
//           "medioDePago": "efectivo",
//           "boleta": 5772,
//           "precio": 1300
//         },
//         {
//           "precio": 34000,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "venta e5"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "chip movistar",
//           "boleta": "",
//           "precio": 300
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": -2000,
//           "boleta": "",
//           "descripcion": "cuenta lu "
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "adelantó adri",
//           "precio": -10000
//         }
//       ],
//       "fechaString": "Tue Jan 16 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "cuadra": false,
//       "montoTotal": 0,
//       "fecha": 1705374000000,
//       "montoInicial": 0,
//       "id": "2024-01-16",
//       "montoTotalNegativo": 0
//     },
//     {
//       "cuadra": false,
//       "montoTotalNegativo": 0,
//       "montoTotal": 0,
//       "fecha": 1705460400000,
//       "fechaString": "Wed Jan 17 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoInicial": 0,
//       "ventas": [
//         {
//           "boleta": "",
//           "precio": 800,
//           "medioDePago": "efectivo",
//           "descripcion": "cambio lu"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 3300,
//           "descripcion": "cargador inova 3.1 v8"
//         },
//         {
//           "boleta": 5739,
//           "descripcion": "módulo iphone 11",
//           "medioDePago": "efectivo",
//           "precio": 54250
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5773,
//           "precio": 38400,
//           "descripcion": "módulo j7"
//         },
//         {
//           "boleta": "",
//           "descripcion": "parlante jbl resto",
//           "precio": 8700,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5775,
//           "precio": 34800,
//           "descripcion": "módulo a02"
//         },
//         {
//           "descripcion": "film 10d a02",
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "boleta": 5775
//         },
//         {
//           "descripcion": "pin suelto",
//           "precio": 1200,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "precio": -3000,
//           "medioDePago": "efectivo",
//           "descripcion": "agua"
//         },
//         {
//           "precio": 3250,
//           "descripcion": "usb iphone",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 300,
//           "boleta": "",
//           "descripcion": "chip movistar",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "desarme y arme g41",
//           "medioDePago": "efectivo",
//           "precio": 4500,
//           "boleta": ""
//         },
//         {
//           "precio": 1000,
//           "descripcion": "film g41",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "cargador universal",
//           "precio": 3000,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "mouse seisa",
//           "precio": 2300,
//           "boleta": ""
//         }
//       ],
//       "montoTotalTransferencia": 0,
//       "montoTotalMercadoPago": 0,
//       "id": "2024-01-17",
//       "montoTotalEfectivo": 0
//     },
//     {
//       "montoTotal": 0,
//       "montoTotalTransferencia": 0,
//       "montoTotalEfectivo": 0,
//       "ventas": [
//         {
//           "descripcion": "film iphone 11",
//           "titularDeCuenta": "disco.choza.escudo",
//           "boleta": "",
//           "precio": 648,
//           "medioDePago": "transferencia"
//         },
//         {
//           "boleta": 5778,
//           "descripcion": "pin j7 2016",
//           "medioDePago": "efectivo",
//           "precio": 5500
//         },
//         {
//           "precio": 11700,
//           "descripcion": "parlante jbl imitacion",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "seña tapa a22",
//           "precio": 3000
//         },
//         {
//           "descripcion": "cable aux a aux",
//           "precio": 1400,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 2000,
//           "descripcion": "film 10d iphone 11pro max ",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 36290,
//           "medioDePago": "efectivo",
//           "boleta": 5783,
//           "descripcion": "módulo g9 plus"
//         },
//         {
//           "boleta": 5784,
//           "medioDePago": "efectivo",
//           "precio": 24480,
//           "descripcion": "batería iphone 8 plus"
//         },
//         {
//           "precio": 1400,
//           "descripcion": "cable usb v3",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 58000,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "venta a30"
//         },
//         {
//           "descripcion": "film 10d a30",
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": -38100,
//           "boleta": "",
//           "descripcion": "descuento j7 venta"
//         },
//         {
//           "boleta": "",
//           "descripcion": "funda a04e m05",
//           "precio": 2450,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 5500,
//           "descripcion": "pin franco"
//         },
//         {
//           "precio": -70,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "descuento franco"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5786,
//           "precio": 38100,
//           "descripcion": "módulo a13"
//         }
//       ],
//       "id": "2024-01-18",
//       "montoTotalNegativo": 0,
//       "cuadra": false,
//       "fecha": 1705546800000,
//       "montoTotalMercadoPago": 0,
//       "montoInicial": 0,
//       "fechaString": "Thu Jan 18 2024 00:00:00 GMT-0300 (Argentina Standard Time)"
//     },
//     {
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5760,
//           "descripcion": "Samsung pin tablet ",
//           "precio": 12500
//         },
//         {
//           "descripcion": "auriculares ",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 8500
//         },
//         {
//           "descripcion": "cargador de auto inova",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 3700
//         },
//         {
//           "boleta": "",
//           "descripcion": "cable usb tipo c",
//           "medioDePago": "efectivo",
//           "precio": 1750
//         },
//         {
//           "descripcion": "display + simple",
//           "medioDePago": "efectivo",
//           "precio": 12500,
//           "boleta": 5777
//         },
//         {
//           "descripcion": "puente carga g32",
//           "medioDePago": "efectivo",
//           "precio": 12000,
//           "boleta": 5788
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "fecha": 1705633200000,
//       "cuadra": false,
//       "montoInicial": 0,
//       "montoTotalEfectivo": 0,
//       "montoTotalNegativo": 0,
//       "id": "2024-01-19",
//       "fechaString": "Fri Jan 19 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotalTransferencia": 0,
//       "montoTotal": 0
//     },
//     {
//       "montoTotal": 0,
//       "id": "2024-01-21",
//       "fecha": 1705806000405,
//       "cuadra": false,
//       "fechaString": "Sun Jan 21 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "ventas": [],
//       "montoInicial": 0
//     },
//     {
//       "montoTotalTransferencia": 0,
//       "id": "2024-01-22",
//       "montoTotalMercadoPago": 0,
//       "montoTotalEfectivo": 0,
//       "fechaString": "Mon Jan 22 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "cuadra": false,
//       "montoTotalNegativo": 0,
//       "fecha": 1705892400000,
//       "ventas": [
//         {
//           "precio": 3250,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "receptor bluetooth"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "Tablet mágica 10\"",
//           "precio": 10950
//         },
//         {
//           "precio": 3600,
//           "descripcion": "cable tipo c a tipo c",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 1300,
//           "descripcion": "film s20 fe ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5776,
//           "precio": 38400,
//           "medioDePago": "efectivo",
//           "descripcion": "módulo a04"
//         },
//         {
//           "boleta": 5776,
//           "descripcion": "film 10d a04",
//           "precio": 1300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 3250,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "receptor Bluetooth "
//         },
//         {
//           "descripcion": "cabezal usb inova",
//           "precio": 2650,
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 1000,
//           "medioDePago": "efectivo",
//           "descripcion": "film a02s comun"
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "funda a02 m08",
//           "precio": 3600
//         },
//         {
//           "precio": 1250,
//           "medioDePago": "efectivo",
//           "descripcion": "cable usb v8",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "cable usb iphone",
//           "precio": 3250
//         },
//         {
//           "precio": 11400,
//           "medioDePago": "efectivo",
//           "descripcion": "auriculares redmi",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5802,
//           "descripcion": "pin j4",
//           "precio": 5500
//         }
//       ],
//       "montoTotal": 0,
//       "montoInicial": 0
//     },
//     {
//       "id": "2024-01-23",
//       "montoTotalTransferencia": 0,
//       "montoInicial": 0,
//       "montoTotalNegativo": 0,
//       "fechaString": "Tue Jan 23 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "cuadra": false,
//       "montoTotalEfectivo": 0,
//       "ventas": [
//         {
//           "descripcion": "módulo a10",
//           "boleta": 5747,
//           "precio": 24950,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "pin a10",
//           "precio": 5500,
//           "boleta": 5747
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film j7 2016",
//           "precio": 1300,
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "modulo g20",
//           "boleta": 5807,
//           "precio": 38100
//         },
//         {
//           "descripcion": "film 10d g20",
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "boleta": 5807
//         },
//         {
//           "precio": 300,
//           "boleta": "",
//           "descripcion": "chip Movistar ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "venta g7 play",
//           "precio": 42000
//         },
//         {
//           "descripcion": "resto parlante inova",
//           "precio": 13700,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 2100,
//           "descripcion": "pulsera reloj malla"
//         },
//         {
//           "descripcion": "cable usb v8",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 1250
//         },
//         {
//           "precio": 1600,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d ???"
//         },
//         {
//           "boleta": "",
//           "precio": 2300,
//           "descripcion": "usb imantado tipo c",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "liberación a02",
//           "precio": 8000,
//           "boleta": 5781
//         },
//         {
//           "boleta": "",
//           "descripcion": "chip claro",
//           "precio": 300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 3250,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "funda a20 m06"
//         },
//         {
//           "precio": 1600,
//           "descripcion": "film 10d a20",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1750,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "cable usb tipo c"
//         }
//       ],
//       "montoTotal": 0,
//       "montoTotalMercadoPago": 0,
//       "fecha": 1705978800000
//     },
//     {
//       "montoTotal": 0,
//       "id": "2024-01-24",
//       "montoTotalMercadoPago": 0,
//       "fechaString": "Wed Jan 24 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotalNegativo": 0,
//       "fecha": 1706065200000,
//       "montoTotalEfectivo": 0,
//       "cuadra": false,
//       "montoInicial": 0,
//       "montoTotalTransferencia": 0,
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "precio": 5100,
//           "descripcion": "cargador i5 iphone",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "seña a02",
//           "precio": 25000
//         },
//         {
//           "precio": 7500,
//           "descripcion": "touch j2 prime ",
//           "boleta": 5808,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "sacado de cuenta j2 prime ",
//           "boleta": 5808,
//           "medioDePago": "efectivo",
//           "precio": 4000
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 52000,
//           "descripcion": "venta a03 core"
//         },
//         {
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d e40",
//           "boleta": ""
//         },
//         {
//           "descripcion": "cable usb tipo c",
//           "medioDePago": "efectivo",
//           "precio": 1750,
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "descripcion": "auriculares económicos ",
//           "medioDePago": "efectivo",
//           "precio": 900
//         },
//         {
//           "precio": -10000,
//           "boleta": "",
//           "descripcion": "adelantó adri",
//           "medioDePago": "efectivo"
//         }
//       ]
//     },
//     {
//       "montoInicial": 0,
//       "montoTotalTransferencia": 0,
//       "id": "2024-01-25",
//       "cuadra": false,
//       "montoTotalEfectivo": 0,
//       "montoTotal": 0,
//       "fecha": 1706151600000,
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5816,
//           "precio": 5000,
//           "descripcion": "seña batería s6 Edge plus"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5816,
//           "precio": 16670,
//           "descripcion": "resto batería s6 Edge plus"
//         },
//         {
//           "boleta": "",
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "descripcion": "film j2 prime"
//         },
//         {
//           "descripcion": "film 10d iphone 8 plus",
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 33000,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "resto venta equipo a02"
//         },
//         {
//           "precio": 1600,
//           "descripcion": "film 10d a02",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 1750,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "cable usb tipo c"
//         },
//         {
//           "descripcion": "cable usb v8",
//           "precio": 1250,
//           "boleta": "",
//           "medioDePago": "efectivo"
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "fechaString": "Thu Jan 25 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoTotalNegativo": 0
//     },
//     {
//       "montoInicial": 0,
//       "ventas": [
//         {
//           "boleta": "",
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a11"
//         },
//         {
//           "precio": 1600,
//           "descripcion": "film 10d a12",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 48000,
//           "boleta": "",
//           "descripcion": "venta moto z play",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film z play",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 1300
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 3250,
//           "descripcion": "funda e20 m06",
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "descripcion": "film 10d a51",
//           "precio": 1600,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a02",
//           "boleta": ""
//         },
//         {
//           "precio": 45000,
//           "descripcion": "placa a32",
//           "medioDePago": "efectivo",
//           "boleta": 5729
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "id": "2024-01-26",
//       "fecha": 1706238000000,
//       "fechaString": "Fri Jan 26 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "cuadra": false,
//       "montoTotalEfectivo": 0,
//       "montoTotalTransferencia": 0,
//       "montoTotal": 0,
//       "montoTotalNegativo": 0
//     },
//     {
//       "fecha": 1706324400640,
//       "montoTotalNegativo": 0,
//       "montoTotal": 0,
//       "ventas": [
//         {
//           "precio": 40800,
//           "boleta": 5828,
//           "descripcion": "modulo a02s",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a02s",
//           "boleta": 5828
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 1600,
//           "descripcion": "film 10d g9 power"
//         },
//         {
//           "boleta": 5554,
//           "medioDePago": "efectivo",
//           "descripcion": "seña modulo a01",
//           "precio": 27150
//         },
//         {
//           "boleta": 5554,
//           "medioDePago": "efectivo",
//           "precio": 6000,
//           "descripcion": "resto modulo a01"
//         },
//         {
//           "descripcion": "film comun a01",
//           "medioDePago": "efectivo",
//           "boleta": 5554,
//           "precio": 1300
//         },
//         {
//           "descripcion": "desarme y arme e6i",
//           "medioDePago": "efectivo",
//           "precio": 4500,
//           "boleta": 5832
//         },
//         {
//           "descripcion": "modulo a02",
//           "precio": 36830,
//           "boleta": 5803,
//           "medioDePago": "efectivo"
//         }
//       ],
//       "cuadra": false,
//       "fechaString": "Sat Jan 27 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "montoInicial": 1080,
//       "montoTotalTransferencia": 0,
//       "montoTotalEfectivo": 119780,
//       "historialDeCierre": [
//         {
//           "fechaString": "27/1/2024, 17:17:59",
//           "usuario": "Adriana Haedo",
//           "fecha": 1706386679937,
//           "resultadoDeCaja": -108000,
//           "mensaje": "falta plata en la caja"
//         },
//         {
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fecha": 1706386684638,
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "27/1/2024, 17:18:04"
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "id": "2024-01-27"
//     },
//     {
//       "ventas": [],
//       "fechaString": "Sun Jan 28 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "fecha": 1706410800762,
//       "id": "2024-01-28",
//       "cuadra": false,
//       "montoInicial": 1,
//       "montoTotal": 0
//     },
//     {
//       "montoTotalNegativo": -100,
//       "montoTotalMercadoPago": 0,
//       "montoInicial": 2860,
//       "montoTotalTransferencia": 0,
//       "historialDeCierre": [
//         {
//           "fecha": 1706567641238,
//           "usuario": "Adriana Haedo",
//           "fechaString": "29/1/2024, 19:34:01",
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!"
//         }
//       ],
//       "montoTotal": 0,
//       "fecha": 1706497200982,
//       "fechaString": "Mon Jan 29 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "id": "2024-01-29",
//       "ventas": [
//         {
//           "precio": -100,
//           "descripcion": "del  agua",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "funda g23 m05",
//           "precio": 2800,
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "descripcion": "film 10d g9 power",
//           "precio": 1600,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "seña bateria iphone 6s ",
//           "precio": 14300,
//           "boleta": 5820
//         },
//         {
//           "boleta": 5820,
//           "precio": 35700,
//           "descripcion": "modulo iphone 6s",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 42070,
//           "boleta": 5819,
//           "descripcion": "modulo j4",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5819,
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "descripcion": "j4 film"
//         },
//         {
//           "precio": 10980,
//           "boleta": 5801,
//           "descripcion": "costo arreglo display iphone 11",
//           "medioDePago": "efectivo"
//         }
//       ],
//       "montoTotalEfectivo": 108650,
//       "cuadra": false
//     },
//     {
//       "montoTotalTransferencia": 0,
//       "cuadra": false,
//       "historialDeCierre": [
//         {
//           "fecha": 1706630009059,
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "30/1/2024, 12:53:29",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "fechaString": "30/1/2024, 12:53:32",
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo",
//           "fecha": 1706630012748
//         }
//       ],
//       "id": "2024-01-30",
//       "montoTotal": 0,
//       "fechaString": "Tue Jan 30 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "montoTotalEfectivo": 94680,
//       "montoTotalMercadoPago": 0,
//       "montoInicial": 2510,
//       "montoTotalNegativo": -6000,
//       "fecha": 1706583600195,
//       "ventas": [
//         {
//           "descripcion": "auriculas bluetooth f9",
//           "precio": 11350,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 34420,
//           "boleta": 5814,
//           "descripcion": "modulo a14",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film comun a14",
//           "precio": 1300,
//           "boleta": 5814,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 10440,
//           "descripcion": "bateria j7 2016"
//         },
//         {
//           "descripcion": "cargador inova 3.1 v8",
//           "boleta": "",
//           "precio": 3300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "usb v8 3.1A",
//           "medioDePago": "efectivo",
//           "precio": 1500,
//           "boleta": ""
//         },
//         {
//           "descripcion": "pin tipo c teclado ",
//           "precio": 8000,
//           "boleta": 5840,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 11000,
//           "boleta": 5827,
//           "medioDePago": "efectivo",
//           "descripcion": "cuenta e32"
//         },
//         {
//           "boleta": 5821,
//           "medioDePago": "efectivo",
//           "precio": -6000,
//           "descripcion": "compra z2 play"
//         },
//         {
//           "precio": 10070,
//           "descripcion": "resto bateria iphone 6s",
//           "medioDePago": "efectivo",
//           "boleta": 5820
//         },
//         {
//           "boleta": 5841,
//           "descripcion": "desarme y arme j7 2016",
//           "precio": 4500,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5829,
//           "descripcion": "desarme y arme j6",
//           "precio": 4500
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "chip movistar",
//           "precio": 300
//         }
//       ]
//     },
//     {
//       "ventas": [
//         {
//           "precio": 5750,
//           "medioDePago": "efectivo",
//           "descripcion": "receptor wifi",
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "descripcion": "usb fast v8",
//           "medioDePago": "efectivo",
//           "precio": 1450
//         },
//         {
//           "descripcion": "chip movistar",
//           "precio": 300,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "descripcion": "auriculares Bluetooth rt558",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 3550
//         },
//         {
//           "precio": 8000,
//           "descripcion": "pulsador power a12",
//           "boleta": 5836,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "udb imantado tipo c",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 2300
//         },
//         {
//           "boleta": 5764,
//           "descripcion": "cuenta a22",
//           "precio": 12000,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 5350,
//           "boleta": "",
//           "descripcion": "cargador tipo c inova 3.1",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "modulo redmi note 9",
//           "boleta": 5830,
//           "precio": 53290,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 5500,
//           "medioDePago": "efectivo",
//           "boleta": 5837,
//           "descripcion": "limpieza poco"
//         },
//         {
//           "descripcion": "modulo tcl 10se",
//           "medioDePago": "efectivo",
//           "boleta": 5838,
//           "precio": 39500
//         },
//         {
//           "boleta": 5838,
//           "descripcion": "envio modulo tcl 10se",
//           "precio": 2900,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5797,
//           "descripcion": "pin a10s",
//           "precio": 5500,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": -4000,
//           "descripcion": "compra dos equipos a01 y a01 core",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         }
//       ],
//       "fechaString": "Wed Jan 31 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "historialDeCierre": [
//         {
//           "mensaje": "hay de mas en la caja",
//           "fecha": 1706716394651,
//           "fechaString": "31/1/2024, 12:53:14",
//           "resultadoDeCaja": 20,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "fechaString": "31/1/2024, 12:53:40",
//           "fecha": 1706716420025,
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 0
//         },
//         {
//           "fecha": 1706740702207,
//           "resultadoDeCaja": -4100,
//           "fechaString": "31/1/2024, 19:38:22",
//           "usuario": "Adriana Haedo",
//           "mensaje": "falta plata en la caja"
//         },
//         {
//           "mensaje": "falta plata en la caja",
//           "usuario": "Adriana Haedo",
//           "fecha": 1706740739534,
//           "resultadoDeCaja": -4000,
//           "fechaString": "31/1/2024, 19:38:59"
//         },
//         {
//           "fechaString": "31/1/2024, 19:43:18",
//           "fecha": 1706740998849,
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 0
//         },
//         {
//           "fechaString": "31/1/2024, 19:49:59",
//           "fecha": 1706741399836,
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0
//         }
//       ],
//       "fecha": 1706670000385,
//       "montoTotalMercadoPago": 0,
//       "montoTotal": 0,
//       "montoTotalEfectivo": 141390,
//       "cuadra": false,
//       "montoTotalNegativo": -4000,
//       "id": "2024-01-31",
//       "montoInicial": 2190,
//       "montoTotalTransferencia": 0
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "montoInicial": 2580,
//       "fechaString": "Thu Feb 01 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "ventas": [
//         {
//           "descripcion": "auriculares samsung",
//           "medioDePago": "efectivo",
//           "precio": 2950,
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 3250,
//           "boleta": "",
//           "descripcion": "usb iphone"
//         },
//         {
//           "precio": 1000,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "film e7 "
//         },
//         {
//           "boleta": 5858,
//           "precio": 56100,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo a31"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 1600,
//           "boleta": 5858,
//           "descripcion": "film 10d a31"
//         },
//         {
//           "boleta": 5759,
//           "precio": 13500,
//           "descripcion": "placa grand prime",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "diferencia por vale",
//           "precio": 350,
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5854,
//           "precio": 7000,
//           "descripcion": "flash iphone 11",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "pin Nokia 2.3",
//           "precio": 5500,
//           "boleta": 5860
//         },
//         {
//           "precio": 36970,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo a03s (gb)",
//           "boleta": 5855
//         },
//         {
//           "precio": 2970,
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia",
//           "descripcion": "usb inova tipo c",
//           "boleta": ""
//         }
//       ],
//       "montoTotalTransferencia": 2970,
//       "cuadra": false,
//       "fecha": 1706756400318,
//       "montoTotal": 0,
//       "id": "2024-02-01",
//       "montoTotalNegativo": 0,
//       "montoTotalEfectivo": 128220
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "ventas": [
//         {
//           "boleta": "",
//           "descripcion": "cuenta eduardo casal",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 4000,
//           "medioDePago": "transferencia"
//         },
//         {
//           "descripcion": "bateria iphone 7G",
//           "boleta": 5867,
//           "precio": 35700,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "microfibra",
//           "boleta": "",
//           "precio": -600
//         },
//         {
//           "precio": 1700,
//           "descripcion": "auricular samsung",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "chip claro",
//           "boleta": "",
//           "precio": 300
//         },
//         {
//           "boleta": 5869,
//           "precio": 600,
//           "descripcion": "limpieza J7",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5869,
//           "descripcion": "boton home ",
//           "precio": 2500,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film 10d e13",
//           "boleta": "",
//           "precio": 1600,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 300,
//           "descripcion": "chip movistar",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 7700,
//           "descripcion": "power A03 core",
//           "boleta": 5857
//         },
//         {
//           "descripcion": "film 10d A03 core",
//           "boleta": 5857,
//           "precio": 1600,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5870,
//           "medioDePago": "efectivo",
//           "descripcion": "desarme y arme A04",
//           "precio": 2000
//         },
//         {
//           "boleta": "",
//           "precio": 40000,
//           "descripcion": "venta equipo E5",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "cargador auto inova ",
//           "precio": 3700
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5844,
//           "precio": 58650,
//           "descripcion": "modulo a51"
//         },
//         {
//           "descripcion": "cuenta a51",
//           "precio": 10000,
//           "medioDePago": "efectivo",
//           "boleta": 5844
//         },
//         {
//           "boleta": 5847,
//           "medioDePago": "efectivo",
//           "descripcion": "funda g9 power m07",
//           "precio": 3500
//         },
//         {
//           "descripcion": "flex main g9 power",
//           "boleta": 5847,
//           "medioDePago": "efectivo",
//           "precio": 8500
//         },
//         {
//           "boleta": "",
//           "descripcion": "film 10d tcl",
//           "medioDePago": "transferencia",
//           "precio": 1728,
//           "titularDeCuenta": "s.t.multitask"
//         },
//         {
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": "",
//           "descripcion": "cable tipo c a tipo c",
//           "medioDePago": "transferencia",
//           "precio": 4752
//         },
//         {
//           "medioDePago": "transferencia",
//           "precio": 5616,
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": "",
//           "descripcion": "HDMI a HDMI"
//         }
//       ],
//       "montoTotalTransferencia": 16096,
//       "montoInicial": 1800,
//       "historialDeCierre": [
//         {
//           "resultadoDeCaja": -6200,
//           "usuario": "Adriana Haedo",
//           "mensaje": "falta plata en la caja",
//           "fechaString": "2/2/2024, 20:12:03",
//           "fecha": 1706915523683
//         },
//         {
//           "fechaString": "2/2/2024, 20:16:01",
//           "resultadoDeCaja": -6200,
//           "fecha": 1706915761075,
//           "usuario": "Adriana Haedo",
//           "mensaje": "falta plata en la caja"
//         },
//         {
//           "mensaje": "falta plata en la caja",
//           "fechaString": "2/2/2024, 20:16:01",
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": -6200,
//           "fecha": 1706915761467
//         },
//         {
//           "fechaString": "2/2/2024, 20:22:59",
//           "fecha": 1706916179195,
//           "mensaje": "falta plata en la caja",
//           "resultadoDeCaja": -1000,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "mensaje": "falta plata en la caja",
//           "usuario": "Lucia Cardozo",
//           "fecha": 1706916761900,
//           "resultadoDeCaja": -1000,
//           "fechaString": "2/2/2024, 20:32:41"
//         }
//       ],
//       "fechaString": "Fri Feb 02 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "id": "2024-02-02",
//       "montoTotalEfectivo": 177750,
//       "montoTotalNegativo": -600,
//       "cuadra": false,
//       "fecha": 1706842800188,
//       "montoTotal": 0
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "fechaString": "Sat Feb 03 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "montoTotalTransferencia": 1620,
//       "id": "2024-02-03",
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "precio": 7500,
//           "descripcion": "resto de tapa A22",
//           "boleta": ""
//         },
//         {
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "film 10D A71"
//         },
//         {
//           "precio": 5500,
//           "medioDePago": "efectivo",
//           "descripcion": "pin E5",
//           "boleta": 5824
//         },
//         {
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia",
//           "boleta": "",
//           "precio": 1620,
//           "descripcion": "usb v8 3.a"
//         },
//         {
//           "precio": 20000,
//           "boleta": 5826,
//           "medioDePago": "efectivo",
//           "descripcion": "camara frontal E40"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d E40",
//           "boleta": "",
//           "precio": 1600
//         },
//         {
//           "boleta": "",
//           "precio": 1600,
//           "descripcion": "film 10d E20",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "cargador tipo C inova",
//           "boleta": "",
//           "precio": 5350,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 1600,
//           "descripcion": "film 10d A04",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d A51",
//           "precio": 1600,
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "precio": 300,
//           "medioDePago": "efectivo",
//           "descripcion": "chip claro"
//         },
//         {
//           "descripcion": "venta de equipo G20",
//           "precio": 69500,
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film 10d G20",
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10D iphone 11",
//           "boleta": "",
//           "precio": 1600
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "limpieza de parlante iphone 11",
//           "precio": 500,
//           "boleta": ""
//         },
//         {
//           "precio": 3300,
//           "boleta": "",
//           "descripcion": "cargador inova 3.1 v8",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5846,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo A11 (de afuera)",
//           "precio": 40800
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 1600,
//           "descripcion": "film 10D A71 adaptado",
//           "boleta": 5846
//         }
//       ],
//       "montoInicial": 2550,
//       "cuadra": false,
//       "montoTotalNegativo": 0,
//       "montoTotalEfectivo": 165550,
//       "fecha": 1706929200779,
//       "historialDeCierre": [
//         {
//           "mensaje": "hay de mas en la caja",
//           "fechaString": "3/2/2024, 17:18:52",
//           "fecha": 1706991532332,
//           "resultadoDeCaja": 30,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "fecha": 1706991849862,
//           "fechaString": "3/2/2024, 17:24:09",
//           "usuario": "Adriana Haedo"
//         }
//       ],
//       "montoTotal": 0
//     },
//     {
//       "fecha": 1707102000887,
//       "montoTotalMercadoPago": 0,
//       "ventas": [
//         {
//           "descripcion": "auriculares samsung",
//           "boleta": "",
//           "precio": 1750,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "usb tipo c cable suelto",
//           "boleta": "",
//           "precio": 2750
//         },
//         {
//           "boleta": "",
//           "precio": 1250,
//           "descripcion": "usb v8 mayado ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "usb iphone caja acrilica \n",
//           "boleta": "",
//           "precio": 3250,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "descripcion": "film 10D A70 ( adap redmi)",
//           "medioDePago": "efectivo",
//           "precio": 1600
//         },
//         {
//           "descripcion": "crgador inova 3.1 tipo C",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 5350
//         },
//         {
//           "boleta": "",
//           "descripcion": "mouse GTC ( debe 100)",
//           "precio": 2550,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "boleta": "",
//           "descripcion": "film 10D A03",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "usb v8 mallado",
//           "precio": 1250,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 3600,
//           "descripcion": "usb C a usb C",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "boleta": 5871,
//           "descripcion": "modulo oferta A20",
//           "medioDePago": "efectivo",
//           "precio": 30000
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "pin A10S",
//           "precio": 5500,
//           "boleta": 5818
//         },
//         {
//           "descripcion": "soldadura auricular",
//           "medioDePago": "efectivo",
//           "boleta": 5874,
//           "precio": 2000
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d A52",
//           "boleta": 5877,
//           "precio": 1600
//         },
//         {
//           "boleta": 5877,
//           "precio": 89600,
//           "descripcion": "modulo A52",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 40800,
//           "medioDePago": "efectivo",
//           "boleta": 5880,
//           "descripcion": "mmodulo J7 neo "
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 40800,
//           "boleta": 5878,
//           "descripcion": "modulo g20"
//         },
//         {
//           "precio": 1250,
//           "medioDePago": "efectivo",
//           "descripcion": "cable usb v8 mallado",
//           "boleta": ""
//         },
//         {
//           "boleta": 5880,
//           "descripcion": "film común J7 neo",
//           "precio": 1300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 10250,
//           "descripcion": "auriculares gaming v1000",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         }
//       ],
//       "montoInicial": 1900,
//       "historialDeCierre": [
//         {
//           "fechaString": "5/2/2024, 18:47:48",
//           "usuario": "Adriana Haedo",
//           "mensaje": "hay de mas en la caja",
//           "fecha": 1707169668826,
//           "resultadoDeCaja": 40850
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "fecha": 1707169844121,
//           "fechaString": "5/2/2024, 18:50:44",
//           "mensaje": "hay de mas en la caja",
//           "resultadoDeCaja": 50
//         },
//         {
//           "fecha": 1707172385475,
//           "usuario": "Adriana Haedo",
//           "fechaString": "5/2/2024, 19:33:05",
//           "mensaje": "hay de mas en la caja",
//           "resultadoDeCaja": 2258400
//         },
//         {
//           "mensaje": "hay de mas en la caja",
//           "usuario": "Adriana Haedo",
//           "fecha": 1707172395697,
//           "fechaString": "5/2/2024, 19:33:15",
//           "resultadoDeCaja": 10200
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "fechaString": "5/2/2024, 19:33:53",
//           "mensaje": "hay de mas en la caja",
//           "fecha": 1707172433000,
//           "resultadoDeCaja": 10200
//         },
//         {
//           "fechaString": "5/2/2024, 19:35:42",
//           "mensaje": "falta plata en la caja",
//           "fecha": 1707172542344,
//           "resultadoDeCaja": -50,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "5/2/2024, 19:37:30",
//           "resultadoDeCaja": 0,
//           "fecha": 1707172650411
//         }
//       ],
//       "montoTotal": 0,
//       "montoTotalEfectivo": 248050,
//       "montoTotalTransferencia": 0,
//       "montoTotalNegativo": 0,
//       "id": "2024-02-05",
//       "cuadra": false,
//       "fechaString": "Mon Feb 05 2024 00:00:00 GMT-0300 (hora estándar de Argentina)"
//     },
//     {
//       "montoTotalEfectivo": 174860,
//       "montoTotalNegativo": -3000,
//       "fechaString": "Tue Feb 06 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "montoInicial": 1950,
//       "cuadra": false,
//       "montoTotal": 0,
//       "montoTotalTransferencia": 0,
//       "fecha": 1707188400611,
//       "ventas": [
//         {
//           "precio": 1300,
//           "boleta": "",
//           "descripcion": "film g72 ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "encendedor de auto ibek",
//           "boleta": "",
//           "precio": 4600
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 21670,
//           "descripcion": "glass+oca g60s",
//           "boleta": 5875
//         },
//         {
//           "boleta": 5875,
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "descripcion": "film común g60s"
//         },
//         {
//           "precio": 3250,
//           "descripcion": "funda g60s m06",
//           "boleta": 5875,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "agua x3",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": -3000
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 3250,
//           "descripcion": "usb iphone acrilico"
//         },
//         {
//           "descripcion": "film 10d iphone 8 plus",
//           "boleta": "",
//           "precio": 1600,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 39520,
//           "descripcion": "modulo one fusion ",
//           "boleta": 5882
//         },
//         {
//           "precio": 1600,
//           "boleta": 5882,
//           "descripcion": "film 10d one fusion  ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "modulo a13",
//           "boleta": 5856,
//           "precio": 44620
//         },
//         {
//           "boleta": 5856,
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a13"
//         },
//         {
//           "boleta": 5887,
//           "descripcion": "modulo a20",
//           "precio": 53550,
//           "medioDePago": "efectivo"
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "historialDeCierre": [
//         {
//           "fechaString": "6/2/2024, 19:40:40",
//           "mensaje": "hay de mas en la caja",
//           "resultadoDeCaja": 53450,
//           "usuario": "Adriana Haedo",
//           "fecha": 1707259240003
//         },
//         {
//           "fechaString": "6/2/2024, 19:41:38",
//           "fecha": 1707259298303,
//           "usuario": "Adriana Haedo",
//           "mensaje": "falta plata en la caja",
//           "resultadoDeCaja": -100
//         }
//       ],
//       "id": "2024-02-06"
//     },
//     {
//       "ventas": [
//         {
//           "boleta": 5864,
//           "precio": 38250,
//           "descripcion": "modulo j4 core ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "descripcion": "film común j4 core ",
//           "boleta": 5864
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "film 10D E22",
//           "precio": 1600
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "funda j7 M06",
//           "precio": 3250
//         },
//         {
//           "descripcion": "modulo E7i power",
//           "boleta": 5865,
//           "medioDePago": "efectivo",
//           "precio": 35700
//         },
//         {
//           "descripcion": "chip movistar",
//           "boleta": "",
//           "precio": 300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "film 10D A51"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "limpieza a52s",
//           "boleta": 5896,
//           "precio": 7800
//         },
//         {
//           "descripcion": "auriculares Samsung",
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia",
//           "boleta": "",
//           "precio": 2592
//         }
//       ],
//       "montoTotalNegativo": 0,
//       "id": "2024-02-07",
//       "montoTotalTransferencia": 2592,
//       "historialDeCierre": [
//         {
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "fecha": 1707321396772,
//           "usuario": "Adriana Haedo",
//           "fechaString": "7/2/2024, 12:56:36"
//         },
//         {
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fecha": 1707345501604,
//           "fechaString": "7/2/2024, 19:38:21"
//         }
//       ],
//       "montoTotal": 0,
//       "montoTotalMercadoPago": 0,
//       "montoTotalEfectivo": 89800,
//       "fecha": 1707274800883,
//       "fechaString": "Wed Feb 07 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "cuadra": false,
//       "montoInicial": 1710
//     },
//     {
//       "montoInicial": 1510,
//       "montoTotalTransferencia": 0,
//       "fecha": 1707361200063,
//       "montoTotalNegativo": 0,
//       "historialDeCierre": [
//         {
//           "fechaString": "8/2/2024, 19:56:19",
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "fecha": 1707432979853
//         }
//       ],
//       "ventas": [
//         {
//           "descripcion": "venta a01 core",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 38500
//         },
//         {
//           "precio": 3300,
//           "descripcion": "cargador inova 3.1 v8",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "descripcion": "cargador portatil",
//           "medioDePago": "efectivo",
//           "precio": 10500
//         },
//         {
//           "precio": 300,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "chip personal"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 66300,
//           "boleta": 5893,
//           "descripcion": "modulo one vision"
//         },
//         {
//           "boleta": 5893,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10D one vision",
//           "precio": 1600
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "limpieza A32",
//           "precio": 7800,
//           "boleta": 5886
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "usb tipo c",
//           "precio": 1750
//         },
//         {
//           "precio": 3800,
//           "medioDePago": "efectivo",
//           "descripcion": "cabezal inova 5.1",
//           "boleta": ""
//         },
//         {
//           "descripcion": "auriculares s10",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 2950
//         },
//         {
//           "precio": 47170,
//           "descripcion": "modulo j8 gb",
//           "medioDePago": "efectivo",
//           "boleta": 5843
//         },
//         {
//           "precio": 5500,
//           "descripcion": "pin j8",
//           "boleta": 5843,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film común j8",
//           "boleta": 5843,
//           "precio": 1300
//         },
//         {
//           "boleta": 5843,
//           "descripcion": "usb v8 mayado ",
//           "medioDePago": "efectivo",
//           "precio": 1250
//         },
//         {
//           "descripcion": "venta moto g7",
//           "boleta": "",
//           "precio": 76000,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film 10d g7",
//           "medioDePago": "efectivo",
//           "precio": 1600,
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "precio": 3500,
//           "medioDePago": "efectivo",
//           "descripcion": "funda g7 (m07)"
//         },
//         {
//           "precio": 2000,
//           "boleta": "",
//           "descripcion": "funda de agua ",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "precio": 2000,
//           "medioDePago": "efectivo",
//           "descripcion": "funda de agua"
//         },
//         {
//           "descripcion": "film 10d A04",
//           "boleta": "",
//           "precio": 1600,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "film 10d iphone 11 pro "
//         }
//       ],
//       "montoTotalEfectivo": 280320,
//       "montoTotal": 0,
//       "id": "2024-02-08",
//       "fechaString": "Thu Feb 08 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "montoTotalMercadoPago": 0,
//       "cuadra": false
//     },
//     {
//       "ventas": [
//         {
//           "descripcion": "usb tipo c ",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 1750
//         },
//         {
//           "descripcion": "modulo a10s",
//           "precio": 36970,
//           "boleta": 5902,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 3250,
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": 5902,
//           "medioDePago": "transferencia",
//           "descripcion": "funda a10s m06"
//         },
//         {
//           "medioDePago": "transferencia",
//           "boleta": 5902,
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 1600,
//           "descripcion": "film 10d a10s"
//         },
//         {
//           "boleta": 5902,
//           "titularDeCuenta": "s.t.multitask",
//           "medioDePago": "transferencia",
//           "descripcion": "cubre lente a10s",
//           "precio": 7800
//         },
//         {
//           "boleta": 5876,
//           "precio": 10000,
//           "descripcion": "cuenta a03",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "usb tipo c",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 4400
//         },
//         {
//           "precio": 48450,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo g8 play",
//           "boleta": 5901
//         },
//         {
//           "boleta": 5901,
//           "precio": 1600,
//           "descripcion": "film 10d a10 se adapta a g8 play",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5909,
//           "descripcion": "modulo a10s",
//           "precio": 33200,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d a 10s",
//           "boleta": 5909
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 7800,
//           "descripcion": "desarme y arme a02",
//           "boleta": 5910
//         },
//         {
//           "boleta": 5904,
//           "precio": 34350,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo e6 plus"
//         },
//         {
//           "precio": 3250,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "usb iphone acrílico"
//         },
//         {
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "film 10d g20"
//         },
//         {
//           "descripcion": "funda g20 m07",
//           "precio": 3500,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "descripcion": "g5 plus compra",
//           "boleta": 5899,
//           "medioDePago": "efectivo",
//           "precio": -3000
//         },
//         {
//           "boleta": 5895,
//           "descripcion": "desarme y arme a10s",
//           "precio": 5800,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 3300,
//           "boleta": "",
//           "descripcion": "cargador inova 3.1 v8"
//         },
//         {
//           "descripcion": "film 10d iphone 14",
//           "precio": 1600,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 2950,
//           "boleta": "",
//           "descripcion": "auriculares Samsung akg",
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "boleta": "",
//           "descripcion": "film 10d g42",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "pin e6i",
//           "boleta": 5911,
//           "precio": 6500
//         },
//         {
//           "boleta": 5911,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo e6i",
//           "precio": 33020
//         },
//         {
//           "precio": 1728,
//           "boleta": 5911,
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "film 10d e6i"
//         },
//         {
//           "precio": 7800,
//           "medioDePago": "efectivo",
//           "boleta": 5853,
//           "descripcion": "limpieza e6s"
//         },
//         {
//           "precio": -20000,
//           "boleta": 5908,
//           "descripcion": "compra a32",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5907,
//           "precio": 7800,
//           "descripcion": "darme y arme g9 power"
//         },
//         {
//           "descripcion": "cambio adri",
//           "precio": 10,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         }
//       ],
//       "fecha": 1707361200938,
//       "montoTotalNegativo": -23000,
//       "id": "2024-02-09",
//       "historialDeCierre": [
//         {
//           "mensaje": "hay de mas en la caja",
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 30,
//           "fecha": 1707518640927,
//           "fechaString": "9/2/2024, 19:44:00"
//         },
//         {
//           "fechaString": "9/2/2024, 19:44:19",
//           "mensaje": "hay de mas en la caja",
//           "resultadoDeCaja": 10,
//           "fecha": 1707518659938,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "mensaje": "hay de mas en la caja",
//           "usuario": "Adriana Haedo",
//           "fechaString": "9/2/2024, 19:44:20",
//           "fecha": 1707518660856,
//           "resultadoDeCaja": 10
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "fecha": 1707518686573,
//           "fechaString": "9/2/2024, 19:44:46",
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0
//         }
//       ],
//       "montoTotalMercadoPago": 0,
//       "montoTotalTransferencia": 14378,
//       "montoInicial": 1830,
//       "montoTotal": 0,
//       "cuadra": false,
//       "fechaString": "Thu Feb 08 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "montoTotalEfectivo": 235850
//     },
//     {
//       "montoInicial": 1680,
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5889,
//           "precio": 7800,
//           "descripcion": "darme y arme iphone 7"
//         },
//         {
//           "precio": 1600,
//           "descripcion": "film a04",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 2800,
//           "descripcion": "funda a04 m05"
//         },
//         {
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "film e22"
//         },
//         {
//           "precio": 58000,
//           "descripcion": "venta e22",
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "boleta": 5916,
//           "medioDePago": "efectivo",
//           "descripcion": "flex power a52",
//           "precio": 8200
//         },
//         {
//           "precio": 4000,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "cubre lente protector iPhone 14"
//         },
//         {
//           "boleta": 5887,
//           "precio": 1600,
//           "descripcion": "film a10d a20",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "modulo a22 5g",
//           "precio": 45900,
//           "medioDePago": "efectivo",
//           "boleta": 5879
//         },
//         {
//           "boleta": 5879,
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "descripcion": "film a10 a22 5g"
//         },
//         {
//           "precio": 45720,
//           "boleta": 5912,
//           "descripcion": "modulo a22 5g",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5912,
//           "medioDePago": "efectivo",
//           "precio": 1600,
//           "descripcion": "film 10d a22 5g "
//         },
//         {
//           "precio": 48500,
//           "descripcion": "modulo oled a31",
//           "boleta": 5906,
//           "medioDePago": "efectivo"
//         },
//         {
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "film 10D a31",
//           "precio": 1500,
//           "boleta": 5906,
//           "medioDePago": "transferencia"
//         },
//         {
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": 5906,
//           "descripcion": "cubrelentes A31",
//           "precio": 4500
//         },
//         {
//           "descripcion": "funda A3 m06",
//           "precio": 3000,
//           "titularDeCuenta": "s.t.multitask",
//           "boleta": 5906,
//           "medioDePago": "transferencia"
//         },
//         {
//           "boleta": 5915,
//           "descripcion": "lg k9 modulo",
//           "medioDePago": "efectivo",
//           "precio": 38100
//         },
//         {
//           "boleta": "",
//           "precio": 4150,
//           "descripcion": "funda m08",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film 10d a 23 ",
//           "boleta": "",
//           "precio": 3200,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film 10d a10s",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 1600
//         },
//         {
//           "titularDeCuenta": "s.t.multitask",
//           "descripcion": "tablet mágica ",
//           "precio": 5400,
//           "medioDePago": "transferencia",
//           "boleta": ""
//         }
//       ],
//       "montoTotal": 0,
//       "cuadra": false,
//       "montoTotalMercadoPago": 0,
//       "montoTotalTransferencia": 14400,
//       "fechaString": "Sat Feb 10 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "fecha": 1707534000501,
//       "historialDeCierre": [
//         {
//           "fecha": 1707601156600,
//           "fechaString": "10/2/2024, 18:39:16",
//           "mensaje": "hay de mas en la caja",
//           "resultadoDeCaja": 1210840,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "fecha": 1707601162741,
//           "mensaje": "hay de mas en la caja",
//           "fechaString": "10/2/2024, 18:39:22",
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 340
//         },
//         {
//           "fechaString": "10/2/2024, 18:39:55",
//           "fecha": 1707601195405,
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 340,
//           "mensaje": "hay de mas en la caja"
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 340,
//           "fechaString": "10/2/2024, 18:39:56",
//           "fecha": 1707601196342,
//           "mensaje": "hay de mas en la caja"
//         },
//         {
//           "resultadoDeCaja": 350,
//           "mensaje": "hay de mas en la caja",
//           "fechaString": "10/2/2024, 20:32:54",
//           "usuario": "Adriana Haedo",
//           "fecha": 1707607974362
//         }
//       ],
//       "id": "2024-02-10",
//       "montoTotalEfectivo": 275370,
//       "montoTotalNegativo": 0
//     },
//     {
//       "montoTotalEfectivo": 74670,
//       "id": "2024-02-13",
//       "montoTotalTransferencia": 0,
//       "montoTotal": 0,
//       "fecha": 1707793200645,
//       "historialDeCierre": [
//         {
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 0,
//           "fecha": 1707851031567,
//           "fechaString": "13/2/2024, 16:03:51",
//           "mensaje": "Cerro perfecto!"
//         }
//       ],
//       "cuadra": false,
//       "montoTotalNegativo": 0,
//       "montoTotalMercadoPago": 0,
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "funda g22 m06",
//           "boleta": "",
//           "precio": 3250
//         },
//         {
//           "boleta": 5924,
//           "medioDePago": "efectivo",
//           "precio": 6500,
//           "descripcion": "pin j7 2016"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 58420,
//           "boleta": 5919,
//           "descripcion": "modulo a51"
//         },
//         {
//           "boleta": 5921,
//           "descripcion": "pin redmi note 6 pro ",
//           "medioDePago": "efectivo",
//           "precio": 6500
//         }
//       ],
//       "fechaString": "Tue Feb 13 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "montoInicial": 1400
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "cuadra": false,
//       "ventas": [
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 1500,
//           "descripcion": "usb v8 3.A"
//         },
//         {
//           "boleta": "",
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "descripcion": "film j6+ (adap xiaomi)"
//         },
//         {
//           "descripcion": "auriculares lenovo",
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "precio": 20500
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 5500,
//           "descripcion": "pin lenovo",
//           "boleta": 5848
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 1300,
//           "descripcion": "film a04e",
//           "boleta": ""
//         },
//         {
//           "precio": 7800,
//           "boleta": 5894,
//           "medioDePago": "efectivo",
//           "descripcion": "limpieza"
//         },
//         {
//           "precio": 10000,
//           "boleta": 5894,
//           "medioDePago": "efectivo",
//           "descripcion": "microsoldadura"
//         },
//         {
//           "precio": 37000,
//           "medioDePago": "efectivo",
//           "boleta": 5913,
//           "descripcion": "modulo G32"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 3250,
//           "boleta": "",
//           "descripcion": "funda a20 m06"
//         },
//         {
//           "boleta": 5927,
//           "precio": 12300,
//           "descripcion": "flex main A30s",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "transferencia",
//           "boleta": "",
//           "descripcion": "usb tipo c motorola",
//           "precio": 3726,
//           "titularDeCuenta": "s.t.multitask"
//         },
//         {
//           "medioDePago": "transferencia",
//           "boleta": "",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 6858,
//           "descripcion": "cargador Motorola tm 30+"
//         }
//       ],
//       "montoTotalEfectivo": 100450,
//       "montoInicial": 1070,
//       "fechaString": "Wed Feb 14 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "fecha": 1707879600397,
//       "montoTotalTransferencia": 10584,
//       "montoTotal": 0,
//       "id": "2024-02-14",
//       "historialDeCierre": [
//         {
//           "fechaString": "14/2/2024, 19:39:38",
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!",
//           "fecha": 1707950378784,
//           "resultadoDeCaja": 0
//         },
//         {
//           "fechaString": "14/2/2024, 19:40:25",
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 0,
//           "fecha": 1707950425335
//         },
//         {
//           "fechaString": "14/2/2024, 19:41:31",
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "fecha": 1707950491922
//         },
//         {
//           "fecha": 1707950497672,
//           "fechaString": "14/2/2024, 19:41:37",
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 0
//         },
//         {
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "fechaString": "14/2/2024, 19:41:38",
//           "usuario": "Adriana Haedo",
//           "fecha": 1707950498174
//         },
//         {
//           "fechaString": "14/2/2024, 19:41:38",
//           "resultadoDeCaja": 0,
//           "fecha": 1707950498205,
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "14/2/2024, 19:41:38",
//           "resultadoDeCaja": 0,
//           "fecha": 1707950498234,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "fecha": 1707950498264,
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "14/2/2024, 19:41:38",
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "fechaString": "14/2/2024, 19:41:38",
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fecha": 1707950498294
//         },
//         {
//           "resultadoDeCaja": 0,
//           "fechaString": "14/2/2024, 19:41:38",
//           "usuario": "Adriana Haedo",
//           "fecha": 1707950498324,
//           "mensaje": "Cerro perfecto!"
//         },
//         {
//           "fechaString": "14/2/2024, 19:41:38",
//           "resultadoDeCaja": 0,
//           "fecha": 1707950498355,
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "14/2/2024, 19:41:38",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fecha": 1707950498386
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "fecha": 1707950498417,
//           "fechaString": "14/2/2024, 19:41:38"
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "fechaString": "14/2/2024, 19:41:38",
//           "fecha": 1707950498453,
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0
//         },
//         {
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fecha": 1707950498478,
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "14/2/2024, 19:41:38"
//         },
//         {
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "14/2/2024, 19:41:38",
//           "fecha": 1707950498506
//         },
//         {
//           "mensaje": "Cerro perfecto!",
//           "fecha": 1707950498536,
//           "fechaString": "14/2/2024, 19:41:38",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "fechaString": "14/2/2024, 19:41:38",
//           "usuario": "Adriana Haedo",
//           "fecha": 1707950498565
//         }
//       ],
//       "montoTotalNegativo": 0
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "ventas": [
//         {
//           "medioDePago": "efectivo",
//           "precio": 38100,
//           "boleta": 5925,
//           "descripcion": "modulo e20"
//         },
//         {
//           "precio": 1750,
//           "descripcion": "usb tipo c ",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 1600,
//           "boleta": "",
//           "descripcion": "film 10d a71"
//         },
//         {
//           "precio": 1250,
//           "medioDePago": "efectivo",
//           "descripcion": "usb v8",
//           "boleta": ""
//         },
//         {
//           "descripcion": "modulo j5 prime",
//           "medioDePago": "efectivo",
//           "boleta": 5375,
//           "precio": 36830
//         },
//         {
//           "boleta": 5375,
//           "precio": 1300,
//           "medioDePago": "efectivo",
//           "descripcion": "film comun"
//         },
//         {
//           "boleta": "",
//           "descripcion": "venta equipo a10s",
//           "medioDePago": "efectivo",
//           "precio": 50000
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "modulo e7i power",
//           "boleta": 5936,
//           "precio": 35560
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 1600,
//           "descripcion": "film 10d\ne7i power",
//           "boleta": 5936
//         },
//         {
//           "precio": 3250,
//           "descripcion": "fui a e7i power m06",
//           "boleta": 5936,
//           "medioDePago": "efectivo"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5938,
//           "descripcion": "modulo g20",
//           "precio": 40640
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d g20",
//           "precio": 1600,
//           "boleta": 5938
//         },
//         {
//           "boleta": "",
//           "precio": 1600,
//           "descripcion": "film 10d e13",
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "descripcion": "film 10d a14",
//           "precio": 1600,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "funda a14 m08",
//           "precio": 4150,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 1300,
//           "boleta": "",
//           "descripcion": "film k9",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film 10d a04e",
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "precio": 1600
//         },
//         {
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "funda a04e m08",
//           "precio": 4150
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 38100,
//           "boleta": 5942,
//           "descripcion": "modulo i7 g"
//         }
//       ],
//       "montoTotal": 0,
//       "montoTotalEfectivo": 265980,
//       "historialDeCierre": [
//         {
//           "resultadoDeCaja": 0,
//           "fechaString": "15/2/2024, 12:47:52",
//           "usuario": "Adriana Haedo",
//           "fecha": 1708012072142,
//           "mensaje": "Cerro perfecto!"
//         },
//         {
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "fecha": 1708012073161,
//           "usuario": "Adriana Haedo",
//           "fechaString": "15/2/2024, 12:47:53"
//         },
//         {
//           "fechaString": "15/2/2024, 19:50:17",
//           "fecha": 1708037417150,
//           "usuario": "Adriana Haedo",
//           "mensaje": "falta plata en la caja",
//           "resultadoDeCaja": -10000
//         },
//         {
//           "fecha": 1708037429307,
//           "fechaString": "15/2/2024, 19:50:29",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!"
//         }
//       ],
//       "cuadra": false,
//       "montoTotalTransferencia": 0,
//       "fechaString": "Thu Feb 15 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "id": "2024-02-15",
//       "montoInicial": 1520,
//       "fecha": 1708040424000,
//       "montoTotalNegativo": 0
//     },
//     {
//       "montoTotalMercadoPago": 0,
//       "montoTotal": 0,
//       "id": "2024-02-17",
//       "fecha": 1708052400345,
//       "montoTotalTransferencia": 8910,
//       "montoInicial": 2180,
//       "historialDeCierre": [
//         {
//           "fecha": 1708205989769,
//           "fechaString": "17/2/2024, 18:39:49",
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo"
//         }
//       ],
//       "fechaString": "Fri Feb 16 2024 00:00:00 GMT-0300 (Argentina Standard Time)",
//       "ventas": [
//         {
//           "precio": 1600,
//           "descripcion": "film 10d g71",
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "funda g71 m08",
//           "precio": 4150,
//           "boleta": "",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "pin e5 play",
//           "boleta": 5947,
//           "medioDePago": "efectivo",
//           "precio": 6500
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "liberación g32",
//           "precio": 66000,
//           "boleta": 5845
//         },
//         {
//           "descripcion": "soldadura luz neón",
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 2700,
//           "boleta": 5948
//         },
//         {
//           "boleta": "",
//           "medioDePago": "transferencia",
//           "descripcion": "film a13 10d",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 1728
//         },
//         {
//           "descripcion": "funda A13 m08",
//           "medioDePago": "transferencia",
//           "titularDeCuenta": "s.t.multitask",
//           "precio": 4482,
//           "boleta": ""
//         },
//         {
//           "boleta": "",
//           "descripcion": "film 10d a13",
//           "medioDePago": "efectivo",
//           "precio": 1000
//         },
//         {
//           "descripcion": "film 10d a51",
//           "precio": 1000,
//           "medioDePago": "efectivo",
//           "boleta": ""
//         },
//         {
//           "precio": 38100,
//           "descripcion": "modulo e22",
//           "boleta": 5944,
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "flex power a10s",
//           "precio": 10100,
//           "boleta": 5941,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 32260,
//           "descripcion": "modulo a10 film regalo",
//           "medioDePago": "efectivo",
//           "boleta": 5949
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5923,
//           "precio": 17780,
//           "descripcion": "batería p9 lite"
//         },
//         {
//           "boleta": 5923,
//           "descripcion": "pin p9 lite",
//           "precio": 6500,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 139300,
//           "boleta": 5934,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo a52s"
//         }
//       ],
//       "montoTotalNegativo": 0,
//       "montoTotalEfectivo": 324290,
//       "cuadra": false
//     },
//     {
//       "montoTotalNegativo": -100,
//       "montoTotalMercadoPago": 0,
//       "montoTotal": 0,
//       "ventas": [
//         {
//           "boleta": "",
//           "descripcion": "film 10d a10s",
//           "medioDePago": "efectivo",
//           "precio": 1600
//         },
//         {
//           "precio": -100,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "chip tuenti x5"
//         },
//         {
//           "precio": 1750,
//           "boleta": "",
//           "descripcion": "usb tipo tipo c",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "modulo g7 play",
//           "precio": 35700,
//           "boleta": 5898,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5898,
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d g7 play",
//           "precio": 1600
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 10300,
//           "boleta": 5937,
//           "descripcion": "flex power j7 2016"
//         },
//         {
//           "precio": 1750,
//           "medioDePago": "efectivo",
//           "boleta": "",
//           "descripcion": "usb tipo c"
//         },
//         {
//           "precio": 38100,
//           "medioDePago": "efectivo",
//           "descripcion": "modulo a21s ",
//           "boleta": 5939
//         },
//         {
//           "descripcion": "batería a21s",
//           "precio": 17780,
//           "boleta": 5939,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": 5939,
//           "precio": 3250,
//           "descripcion": "funda a21s m06",
//           "medioDePago": "efectivo"
//         },
//         {
//           "descripcion": "film 10d a21s",
//           "medioDePago": "efectivo",
//           "boleta": 5939,
//           "precio": 1600
//         },
//         {
//           "precio": 6500,
//           "boleta": 5940,
//           "medioDePago": "efectivo",
//           "descripcion": "pin j5 prime"
//         },
//         {
//           "precio": 1300,
//           "descripcion": "film común j5 prime",
//           "boleta": 5940,
//           "medioDePago": "efectivo"
//         },
//         {
//           "boleta": "",
//           "descripcion": "usb v8",
//           "medioDePago": "efectivo",
//           "precio": 1500
//         },
//         {
//           "precio": 2450,
//           "medioDePago": "efectivo",
//           "descripcion": "auriculares puck",
//           "boleta": ""
//         },
//         {
//           "medioDePago": "efectivo",
//           "descripcion": "modulo xiaomi 9a",
//           "boleta": 5905,
//           "precio": 38200
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": 5905,
//           "precio": 1600,
//           "descripcion": "film 10d a12 se adapto a xiaomi 9a"
//         },
//         {
//           "medioDePago": "efectivo",
//           "boleta": null,
//           "precio": 35000,
//           "descripcion": "cuenta fran placa one vision"
//         },
//         {
//           "medioDePago": "efectivo",
//           "precio": 15400,
//           "boleta": 5866,
//           "descripcion": "flex carga a50"
//         },
//         {
//           "descripcion": "pin de carga j7 2016",
//           "precio": 6500,
//           "medioDePago": "efectivo",
//           "boleta": 5928
//         },
//         {
//           "precio": 3500,
//           "medioDePago": "efectivo",
//           "descripcion": "recursos cuenta Google j7 2016",
//           "boleta": 5928
//         },
//         {
//           "boleta": 5873,
//           "medioDePago": "efectivo",
//           "precio": 5500,
//           "descripcion": "pin a10s"
//         },
//         {
//           "descripcion": "usb imantado v8",
//           "boleta": "",
//           "precio": 2300,
//           "medioDePago": "efectivo"
//         },
//         {
//           "precio": 1600,
//           "boleta": "",
//           "medioDePago": "efectivo",
//           "descripcion": "film 10d g9 play"
//         }
//       ],
//       "montoTotalEfectivo": 234680,
//       "fecha": 1708052400830,
//       "montoTotalTransferencia": 0,
//       "id": "2024-02-16",
//       "historialDeCierre": [
//         {
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fechaString": "16/2/2024, 12:44:55",
//           "fecha": 1708098295884
//         },
//         {
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo",
//           "fecha": 1708098298031,
//           "fechaString": "16/2/2024, 12:44:58"
//         },
//         {
//           "usuario": "Adriana Haedo",
//           "resultadoDeCaja": 0,
//           "fecha": 1708098298174,
//           "fechaString": "16/2/2024, 12:44:58",
//           "mensaje": "Cerro perfecto!"
//         },
//         {
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fecha": 1708098298310,
//           "fechaString": "16/2/2024, 12:44:58",
//           "mensaje": "Cerro perfecto!"
//         },
//         {
//           "fechaString": "16/2/2024, 12:44:58",
//           "resultadoDeCaja": 0,
//           "mensaje": "Cerro perfecto!",
//           "fecha": 1708098298482,
//           "usuario": "Adriana Haedo"
//         },
//         {
//           "resultadoDeCaja": 0,
//           "fechaString": "16/2/2024, 20:06:21",
//           "fecha": 1708124781588,
//           "usuario": "Adriana Haedo",
//           "mensaje": "Cerro perfecto!"
//         },
//         {
//           "fechaString": "16/2/2024, 20:06:23",
//           "mensaje": "Cerro perfecto!",
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fecha": 1708124783128
//         },
//         {
//           "resultadoDeCaja": 0,
//           "fechaString": "16/2/2024, 20:06:23",
//           "mensaje": "Cerro perfecto!",
//           "usuario": "Adriana Haedo",
//           "fecha": 1708124783332
//         },
//         {
//           "resultadoDeCaja": 0,
//           "usuario": "Adriana Haedo",
//           "fechaString": "16/2/2024, 20:06:23",
//           "fecha": 1708124783495,
//           "mensaje": "Cerro perfecto!"
//         }
//       ],
//       "cuadra": false,
//       "montoInicial": 1500,
//       "fechaString": "Fri Feb 16 2024 00:00:00 GMT-0300 (hora estándar de Argentina)"
//     },
//     {
//       "montoTotal": 0,
//       "montoInicial": 0,
//       "fechaString": "Sun Feb 18 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "id": "2024-02-18",
//       "fecha": 1708225200685,
//       "ventas": [],
//       "cuadra": false
//     },
//     {
//       "montoInicial": 0,
//       "fechaString": "Mon Feb 19 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "cuadra": false,
//       "ventas": [],
//       "id": "2024-02-19",
//       "fecha": 1708311600222,
//       "montoTotal": 0
//     },
//     {
//       "montoInicial": 0,
//       "fechaString": "Wed Feb 21 2024 00:00:00 GMT-0300 (hora estándar de Argentina)",
//       "fecha": 1708484400148,
//       "montoTotal": 0,
//       "ventas": [],
//       "id": "2024-02-21",
//       "cuadra": false
//     }
//   ],
//   "montoTotalMensualEfectivo": 3240340,
//   "montoTotalMensualTransferencia": 71550,
//   "montoTotalMensualMercadoPago": 0,
//   "montoNegativoTotalMensualEfectivo": -36800
// };
@Component({
  selector: 'app-historial-caja',
  templateUrl: './historial-caja.page.html',
  styleUrls: ['./historial-caja.page.scss'],
})
export class HistorialCajaPage implements OnInit {
  buscarPorRangoDeFechas = false;
  // Asignar la fecha actual al atributo max
  maxFechaActual = new Date().toISOString().split('T')[0];;


  // mostarSideBar=false;
  mostrarAcciones = false;

  textoABuscar!: string;
  mostrarBuscador = false;
  itemsFiltrados: any[] = [];
  itemSeleccionado: any[] = [];

  fechaSeleccionada!: Date;
  fechaSeleccionadaFin!: Date;
  fechaSeleccionadaDate!: Date;
  fechaSeleccionadaDateFin!: Date;

  libroDiario: any;
  loggedUser!: User;
  intervaloSeleccionado: any;
  dataLibroDiarioDialog: any;

  precioDolarBlue: number = 0;
  dolarObservable$: Observable<number> | null = null;
  constructor(private authService: AuthService, private database: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController,
    private router: Router,
    public funcionesUtiles: FuncionesUtilesService) {
    this.getCurrentUser();
  }

  ngOnInit(): void {

    this.mostrarIntervaloDeTiempo(false);
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }
    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);


  }
  updateCalcs(e: any) {
    if (!this.fechaSeleccionadaDate) return;
    this.mostrarAcciones = true;
    let fecha = new Date(this.fechaSeleccionadaDate);
    fecha.setHours(0, 0, 0, 0);
    this.fechaSeleccionada = fecha
  }
  updateCalcsFin(e: any) {
    if (!this.fechaSeleccionadaDateFin) return;
    this.mostrarAcciones = true;
    let fecha = new Date(this.fechaSeleccionadaDateFin);
    fecha.setHours(0, 0, 0, 0);
    this.fechaSeleccionadaFin = fecha
  }

  transformarFecha() {
    if (!this.fechaSeleccionada) return;
    return new Date(this.fechaSeleccionada).toLocaleString();
  }
  applyFilter() {
    //TODO: continuar desde aqui.
    //tenemos coincidencias por texto y/o boleta falta generar una vista para estos items.
    let items: any[] = [];

    this.intervaloSeleccionado.dias.forEach((dia: any) => {
      dia.ventas.forEach((venta: any) => {
        if (venta.descripcion.toLowerCase().includes(this.textoABuscar.toLowerCase()) ||
          venta.boleta == this.textoABuscar) {
          let auxVenta = { ...venta };
          auxVenta['fecha'] = dia.fecha;
          auxVenta['fechaString'] = dia.fechaString;

          items.push(auxVenta)
        }
      });
    });
    this.itemsFiltrados = items;
    this.scrollToElement(null, '#filtroBusquedaHistorial');

  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario: User = res.payload.data() as User;
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

  async mostrarDialogLibroDiario(libroDiario: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleVentasDelDiaComponent,
        componentProps: {
          libroDiario,
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;




      })
      return await modal.present();
    } catch (err) {
    }

  }
  mostrarDiaSeleccionado() {
    const fecha = new Date(this.fechaSeleccionada);
    const idFecha = fecha.toISOString().split('T')[0];

    this.database.obtenerPorId(environment.TABLAS.ingresos, idFecha).subscribe(res => {
      let libroDiarioDelDia: LibroDiario = res.payload.data() as LibroDiario;
      libroDiarioDelDia['id'] = res.payload.id;
      console.log(res.payload.data());
      this.mostrarDialogLibroDiario(libroDiarioDelDia);
    })
  }
  mostrarIntervaloDeTiempo(mostrarBuscador: boolean) {
    console.log("por aca")
    if (!this.intervaloSeleccionado) {
      this.intervaloSeleccionado = { dias: [] };
    }
    this.database.getLibrosDiariosEnIntervalo(this.fechaSeleccionada, this.fechaSeleccionadaFin).then(diasListRef => {

      this.intervaloSeleccionado.dias = diasListRef?.map(diaRef => {
        let dia: LibroDiario = diaRef.data() as LibroDiario;
        dia['id'] = diaRef.id;
        return dia
      });
      this.intervaloSeleccionado['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo(this.intervaloSeleccionado);
      this.intervaloSeleccionado['dias'] = this.intervaloSeleccionado.dias?.sort((diaA: any, diaB: any) => {
        if (diaA.fecha > diaB.fecha) {
          return 1
        } else if (diaA.fecha < diaB.fecha) {
          return -1
        } else {
          return 0;
        }
      });
      // this.intervaloSeleccionado.dias = this.intervaloSeleccionado.dias.filter((dia: LibroDiario) => dia.ventas.length <= 0);
      console.log(this.intervaloSeleccionado)
      // this.reajustarMes(this.intervaloSeleccionado);



      mostrarBuscador ? this.mostrarBuscadorPorTexto() : null;
    })
  }

  mostrarMesCompleto(mostrarBuscador: boolean) {
    if (!this.intervaloSeleccionado) {
      this.intervaloSeleccionado = { dias: [] };
    }

    this.database.getLibrosDiariosMensual(this.fechaSeleccionada).then(diasListRef => {
      this.intervaloSeleccionado.dias = diasListRef?.map(diaRef => {
        let dia: LibroDiario = diaRef.data() as LibroDiario;
        dia['id'] = diaRef.id;
        return dia
      });
      this.intervaloSeleccionado['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago, this.intervaloSeleccionado);
      this.intervaloSeleccionado['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo(this.intervaloSeleccionado);
      this.intervaloSeleccionado['dias'] = this.intervaloSeleccionado.dias?.sort((diaA: any, diaB: any) => {
        if (diaA.fecha > diaB.fecha) {
          return 1
        } else if (diaA.fecha < diaB.fecha) {
          return -1
        } else {
          return 0;
        }
      });
      console.log(this.intervaloSeleccionado)
      mostrarBuscador ? this.mostrarBuscadorPorTexto() : null;
    })

  }
  obtenerMesId() {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    let month = months[this.fechaSeleccionada.getMonth()];
    let year = this.fechaSeleccionada.getFullYear();
    return `${month}${year}`;
  }

  getMontoTotalMensualNegativo(intervalo: any) {
    return intervalo.dias?.reduce((monto: number, dia: any) => {
      // console.log(dia)
      if (dia.montoTotalNegativo && dia.montoTotalNegativo <= 0) {
        return monto += dia.montoTotalNegativo ? dia.montoTotalNegativo : 0;
      }
      return monto;


    }, 0);
  }

  getMontoTotalMensual(medioDePago: MediosDePago, intervalo: any) {
    return intervalo.dias?.reduce((monto: number, dia: any) => {
      // console.log(dia.montoTotalEfectivo)  
      switch (medioDePago) {
        case MediosDePago.Transferencia:
          return monto += dia.montoTotalTransferencia ? dia.montoTotalTransferencia : 0;
        case MediosDePago.MercadoPago:
          return monto += dia.montoTotalMercadoPago ? dia.montoTotalMercadoPago : 0;
        default:
          if (dia.montoTotalEfectivo > 0) {
            return monto += dia.montoTotalEfectivo ? dia.montoTotalEfectivo : 0;
          }
          // console.log(`dia no calculado`, dia)
          return monto;
      }
    }, 0);
  }

  scrollToElement(e: any, id: any) {
    e?.preventDefault();
    setTimeout(() => {
      this.funcionesUtiles.scrollToElement(id);
    }, 200);
  }

  async mostrarBuscadorPorTexto() {
    console.log(this.intervaloSeleccionado)
    try {
      const modal = await this.modalController.create({
        component: BusquedaPorTextoComponent,
        componentProps: {
          intervaloSeleccionado: this.intervaloSeleccionado,
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }


  //TEMPORAL
  reajustarMes(mes: any) { //metodo de reajuste montos diarios y totales
    console.log("entra!")
    let copia = this.funcionesUtiles.clonarObjeto(mes);
    console.log(copia);

    mes.dias.forEach((dia: LibroDiario) => {
      dia.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(dia, MediosDePago.Efectivo);//total en efectivo
      dia.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(dia, MediosDePago.Transferencia);//total en efectivo
      dia.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(dia, MediosDePago.MercadoPago);//total en efectivo
      dia.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(dia);//total negativo
      this.database.actualizar(environment.TABLAS.ingresos, dia, dia.id);

    });

    mes['montoTotalMensualEfectivo'] = this.getMontoTotalMensual(MediosDePago.Efectivo, mes);
    mes['montoTotalMensualTransferencia'] = this.getMontoTotalMensual(MediosDePago.Transferencia, mes);
    mes['montoTotalMensualMercadoPago'] = this.getMontoTotalMensual(MediosDePago.MercadoPago, mes);
    mes['montoNegativoTotalMensualEfectivo'] = this.getMontoTotalMensualNegativo(mes);

    console.log(mes);
    console.log(copia);
  }
  obtenerMontoTotalPorNegativo(libroDiarioHoy: any) {
    let acumuladorNegativo = 0;
    libroDiarioHoy.ventas.forEach((venta: any) => {
      if (venta.precio < 0) {
        acumuladorNegativo += venta.precio;
      }
    });
    return acumuladorNegativo;
  }


  obtenerMontoTotalPorMedioDePago(libroDiarioHoy: any, medioDePago: MediosDePago) {
    let acumulador = 0;
    libroDiarioHoy.ventas.forEach((venta: any) => {
      if (venta.medioDePago == medioDePago) {
        acumulador += venta.precio;
      }
    });
    return acumulador;
  }
  // FIN TEMPORAL

}

