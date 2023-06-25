import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { DetalleStockModuloComponent } from 'src/app/components/detalle-stock-modulo/detalle-stock-modulo.component';
import { FormStockModuloComponent } from 'src/app/components/forms/form-stock-modulo/form-stock-modulo.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-stock-modulos',
  templateUrl: './stock-modulos.page.html',
  styleUrls: ['./stock-modulos.page.scss'],
})
export class StockModulosPage implements OnInit {
  listaSeleccionada = 'completa';
  mostrarSpinner = false;
  loggedUser: User | null = null;
  stockSeleccionado;
  stockSeleccionadoEditable;
  showStockDialog = false;
  moduloCompletoSeleccionado;
  tipoDeStockSeleccionado;

  // filterValue = '';
  displayedColumnKeys = new FormControl(['modelo', 'calidad', 'c/m', 's/m']);//columnas mostradas predeterminado
  listaDeModulos: any;
  listaDeModulosAMostrar = [];
  listaDeAtributos = ['marca', 'modelo', 'calidad', 'c/m', 's/m'];
  // mostrarFormModulo = true;

  constructor(private dataBase: DataBaseService,
    private toastService: ToastService,
    private modalController: ModalController,
    private alertService: AlertService,
    public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService,
  ) {

    this.getCurrentUser();
  }
  ngOnInit(): void {

    let lista = [];
    // lista = [
    //   {
    //     "marca": "Samsung",
    //     "id": "apQpBj6qwHlUjICWdzT2",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "calidad": "Original Oled",
    //     "modelo": "A01",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "marca": "Samsung",
    //     "calidad": "Original Oled",
    //     "id": "diVwt5PnsgVODuSw3uuS",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "modelo": "A01 core"
    //   },
    //   {
    //     "id": "MXqSzhtTzqOW4y6YIVRN",
    //     "cantidadTotal": 1,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "marca": "Samsung",
    //     "modelo": "A02 / A12",
    //     "calidad": "GenBueno",
    //     "hovered": false
    //   },
    //   {
    //     "hovered": false,
    //     "id": "ZaTXQEqZKJgc853kIEpK",
    //     "calidad": "Original Oled",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 4
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "marca": "Samsung",
    //     "modelo": "A02s - A03 - A03s "
    //   },
    //   {
    //     "modelo": "A03 core",
    //     "marca": "Samsung",
    //     "calidad": "Original Oled",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 3
    //         }
    //       ]
    //     },
    //     "hovered": false,
    //     "id": "NeOf5VFgnUlHsMATxlLh",
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 0,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "id": "PELpvI96Q3rJsNYa4my4",
    //     "cantidadTotal": 1,
    //     "calidad": "Original Oled",
    //     "modelo": "A03s ",
    //     "marca": "Samsung",
    //     "hovered": false
    //   },
    //   {
    //     "calidad": "GenBueno",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "modelo": "A04",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "id": "8RMFJkj9E9UndQuh8P9h",
    //     "marca": "Samsung"
    //   },
    //   {
    //     "calidad": "GenBueno",
    //     "hovered": false,
    //     "marca": "Samsung",
    //     "id": "YThdXn6G4Pm8ysABiYxU",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "modelo": "A04s",
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 4,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "ZOrxILLNJJISmSWPMT7o",
    //     "marca": "Samsung",
    //     "modelo": "A10",
    //     "calidad": "Original Oled"
    //   },
    //   {
    //     "cantidadTotal": 1,
    //     "modelo": "A10s",
    //     "marca": "Samsung",
    //     "calidad": "Original Oled",
    //     "id": "L4J85t3iL0PvayGZI7OI",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 3,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "id": "YRnhZExndMbdgANxWBsI",
    //     "hovered": false,
    //     "modelo": "A11",
    //     "calidad": "Original Oled",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "marca": "Samsung"
    //   },
    //   {
    //     "calidad": "GenBueno",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "modelo": "A13",
    //     "hovered": false,
    //     "marca": "Samsung",
    //     "id": "RAuJAtbU2VKKyJsu5cEf",
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ]
    //     },
    //     "hovered": false,
    //     "modelo": "A20",
    //     "cantidadTotal": 2,
    //     "marca": "Samsung",
    //     "id": "PFgiMjBQmVQUjOfYSJCR",
    //     "calidad": "Original Oled"
    //   },
    //   {
    //     "calidad": "GenBueno",
    //     "cantidadTotal": 2,
    //     "modelo": "A20s",
    //     "id": "CcwVv39lzdKWsTpYSqfn",
    //     "marca": "Samsung",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 0
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "hovered": false
    //   },
    //   {
    //     "id": "ke5BGggEKThKR6PANIgh",
    //     "marca": "Samsung",
    //     "modelo": "A20s",
    //     "hovered": false,
    //     "calidad": "Original Oled",
    //     "cantidadTotal": 1,
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "id": "3ylbnIQBmOmfk3YJoYDy",
    //     "hovered": false,
    //     "cantidadTotal": 1,
    //     "modelo": "A21s",
    //     "marca": "Samsung",
    //     "calidad": "Original Oled",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 0,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "cantidad": 3,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "cantidadTotal": 1,
    //     "marca": "Samsung",
    //     "modelo": "A22",
    //     "hovered": false,
    //     "calidad": "GenBueno",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "id": "j9igutUB25ivW5005tjs"
    //   },
    //   {
    //     "id": "ZDQ5EfDqf5sCQWmLaQz7",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "modelo": "A22 4g",
    //     "cantidadTotal": 1,
    //     "hovered": false,
    //     "marca": "Samsung",
    //     "calidad": "Original Oled"
    //   },
    //   {
    //     "modelo": "A23",
    //     "id": "YLAC0yvnDF1qqABhfEG8",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "calidad": "Original Oled",
    //     "marca": "Samsung",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 3
    //         }
    //       ],
    //       "conMarco": []
    //     }
    //   },
    //   {
    //     "id": "QA8vF0d8z0J7tx4mosEE",
    //     "modelo": "A30 - A50",
    //     "hovered": false,
    //     "cantidadTotal": 9,
    //     "marca": "Samsung",
    //     "calidad": "Estandar",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 8
    //         }
    //       ],
    //       "sinMarco": []
    //     }
    //   },
    //   {
    //     "cantidadTotal": 2,
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ]
    //     },
    //     "modelo": "A30s",
    //     "calidad": "Original Oled",
    //     "id": "d3OEy0v1cgSIg82KRdu7",
    //     "hovered": false,
    //     "marca": "Samsung"
    //   },
    //   {
    //     "marca": "Samsung",
    //     "id": "Yc9z9FIwJdUBv1dBfNZx",
    //     "hovered": false,
    //     "modelo": "A30S",
    //     "cantidadTotal": 1,
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "GenBueno"
    //   },
    //   {
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "cantidad": "3",
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "cantidadTotal": 3,
    //     "marca": "Samsung",
    //     "calidad": "GenBueno",
    //     "modelo": "A31",
    //     "id": "JDyK3HSLkEpvhYvoXzww"
    //   },
    //   {
    //     "calidad": "Original Oled",
    //     "id": "Ku4nIDg763T5fhRGDlYn",
    //     "cantidadTotal": 3,
    //     "modelo": "A31",
    //     "marca": "Samsung",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "hovered": false
    //   },
    //   {
    //     "id": "xOadeBbBqRjWfkXFhKwJ",
    //     "hovered": false,
    //     "calidad": "Original Oled",
    //     "modelo": "A32 4g",
    //     "cantidadTotal": 1,
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "marca": "Samsung"
    //   },
    //   {
    //     "cantidadTotal": 1,
    //     "marca": "Samsung",
    //     "hovered": false,
    //     "calidad": "GenBueno",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "modelo": "A32 5g",
    //     "id": "6nPdYzxAYFCEje00cNs8"
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": "2"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "SsleTm1xCF6SblaGXKQA",
    //     "calidad": "AAA",
    //     "modelo": "A5 2016",
    //     "marca": "Samsung",
    //     "hovered": false
    //   },
    //   {
    //     "marca": "Samsung",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "modelo": "A51",
    //     "cantidadTotal": 2,
    //     "calidad": "Original Oled",
    //     "hovered": false,
    //     "id": "NNgLEm4cI4aXXSPb0BOx"
    //   },
    //   {
    //     "marca": "Samsung",
    //     "id": "olOuJkJJ6tGQ7ABofmu8",
    //     "cantidadTotal": 1,
    //     "calidad": "Original Oled",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "modelo": "A52",
    //     "hovered": false
    //   },
    //   {
    //     "id": "x4XhVR6MPHdPR7lsdpMR",
    //     "marca": "Samsung",
    //     "modelo": "A7 2018 - A8 2018",
    //     "hovered": false,
    //     "calidad": "GenBueno",
    //     "cantidadTotal": 2,
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "sinMarco": []
    //     }
    //   },
    //   {
    //     "hovered": false,
    //     "id": "7IuytBAWKxn3Ite7vVCT",
    //     "modelo": "A70",
    //     "cantidadTotal": 1,
    //     "calidad": "Original Oled",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "marca": "Samsung"
    //   },
    //   {
    //     "modelo": "A70",
    //     "calidad": "GenBueno",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "marca": "Samsung",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "id": "T8FIOAVvPWEAE7oeYxPz"
    //   },
    //   {
    //     "modelo": "A71",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": []
    //     },
    //     "calidad": "Original Oled",
    //     "marca": "Samsung",
    //     "id": "AV6xKmzVWZqX3OZw2jSH"
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ]
    //     },
    //     "hovered": false,
    //     "calidad": "GenBueno",
    //     "marca": "Samsung",
    //     "id": "fIW0jqIbd24tdNFj4cOr",
    //     "modelo": "A71",
    //     "cantidadTotal": 2
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": "3",
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "modelo": "E22 - E22i",
    //     "id": "644CDKiXS4OmOLOm4l6t"
    //   },
    //   {
    //     "hovered": false,
    //     "id": "gKlAGbohTqDAHZeZuPds",
    //     "marca": "Motorola",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 0
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "modelo": "G22",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 2
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 3
    //         }
    //       ]
    //     },
    //     "cantidadTotal": 0,
    //     "calidad": "Original Oled",
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "modelo": "G51 - G60s",
    //     "id": "DmhhxsXd7MgihyFVgilj"
    //   },
    //   {
    //     "modelo": "Gw metal",
    //     "calidad": "Estandar",
    //     "id": "PCAYvKYsQ1iCm3LHY43m",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "marca": "Huawei",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     }
    //   },
    //   {
    //     "cantidadTotal": 3,
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": "2"
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "marca": "Apple",
    //     "hovered": false,
    //     "id": "JvxTOYt6Md8OA5J9CY3v",
    //     "modelo": "i4s - i5s - i5g",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "cantidadTotal": 3,
    //     "calidad": "Estandar",
    //     "marca": "Apple",
    //     "modelo": "i6g",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Blanco"
    //         }
    //       ]
    //     },
    //     "id": "NcvmJ3w4XChyuWPOXhgd",
    //     "hovered": false
    //   },
    //   {
    //     "hovered": false,
    //     "cantidadTotal": 3,
    //     "id": "CtxtexI8uPyzR2YybKZT",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": 1
    //         },
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "modelo": "i6g plus",
    //     "marca": "Apple",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "cantidadTotal": 2,
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": 1
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "modelo": "i6s",
    //     "id": "oncIuLDud0ZTs0N0VnwC",
    //     "marca": "Apple",
    //     "calidad": "Estandar",
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 3,
    //     "calidad": "Estandar",
    //     "modelo": "i6s plus",
    //     "marca": "Apple",
    //     "hovered": false,
    //     "id": "QPZchPn6CIikBxdv0kPb",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": 1
    //         },
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     }
    //   },
    //   {
    //     "modelo": "i7",
    //     "id": "SgD6Yge94qfYr6R13S7L",
    //     "marca": "Apple",
    //     "hovered": false,
    //     "calidad": "Estandar",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": "5"
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "cantidadTotal": 6
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "cantidadTotal": 3,
    //     "id": "AdpKEwXLtYgriYzL6HP4",
    //     "marca": "Apple",
    //     "hovered": false,
    //     "modelo": "i7 plus",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": 0
    //         },
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "hovered": false,
    //     "marca": "Apple",
    //     "modelo": "i8",
    //     "calidad": "Estandar",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Blanco"
    //         },
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "id": "bcvhnY7j4ejQkRS79FGN",
    //     "cantidadTotal": 2
    //   },
    //   {
    //     "hovered": false,
    //     "calidad": "Estandar",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 3,
    //           "color": "Blanco"
    //         },
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "modelo": "i8 plus",
    //     "id": "EwoRqD5W6eITCmjeGTmi",
    //     "marca": "Apple",
    //     "cantidadTotal": 3
    //   },
    //   {
    //     "id": "9TrJWkxLSGXdAoKB6tUl",
    //     "hovered": false,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Azul"
    //         }
    //       ]
    //     },
    //     "marca": "Samsung",
    //     "modelo": "J1 ace ",
    //     "cantidadTotal": 0,
    //     "calidad": "AAA"
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "modelo": "J2",
    //     "marca": "Samsung",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "id": "7Sy1JmWIdWPVhESsWRwg",
    //     "calidad": "AAA"
    //   },
    //   {
    //     "marca": "Samsung",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "id": "deQy9x82sXOg4PbkwYwC",
    //     "modelo": "J2 core",
    //     "calidad": "GenBueno",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "calidad": "GenBueno",
    //     "hovered": false,
    //     "modelo": "J3/j3 2016",
    //     "marca": "Samsung",
    //     "id": "bGkhPffCz1jkyAlRzb9t",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": "2"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "hovered": false,
    //     "calidad": "Original Oled",
    //     "marca": "Samsung",
    //     "modelo": "J4",
    //     "cantidadTotal": 0,
    //     "id": "DDuBZ1fGMdzTrzkegPMb",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Celeste"
    //         },
    //         {
    //           "cantidad": 2,
    //           "color": "Dorado"
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "marca": "Samsung",
    //     "id": "agbvhegO2Mmq7XQhtlG0",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Dorado",
    //           "cantidad": 2
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Celeste"
    //         }
    //       ]
    //     },
    //     "calidad": "AAA",
    //     "cantidadTotal": 2,
    //     "modelo": "J4",
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "modelo": "J4",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "marca": "Samsung",
    //     "calidad": "GenBueno",
    //     "id": "nShBsxHqbm2KtLENvVlt",
    //     "hovered": false
    //   },
    //   {
    //     "id": "tQwbrHQC6Ib3tnumpAGX",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "calidad": "GenBueno",
    //     "modelo": "J5",
    //     "marca": "Samsung",
    //     "hovered": false
    //   },
    //   {
    //     "hovered": false,
    //     "id": "DWfM9YrrwdpcecyrY01o",
    //     "marca": "Samsung",
    //     "calidad": "GenBueno",
    //     "modelo": "J5 2016 ",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "cantidadTotal": 5,
    //     "modelo": "J5 prime ",
    //     "marca": "Samsung",
    //     "calidad": "Original Oled",
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Blanco"
    //         },
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "Lr9nxwj5jj4z5z5frGWr"
    //   },
    //   {
    //     "hovered": false,
    //     "id": "PH6Cv6ZRnAsUKrOgMUN3",
    //     "cantidadTotal": 0,
    //     "modelo": "J5 pro",
    //     "marca": "Samsung",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Dorado",
    //           "cantidad": "2"
    //         },
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "calidad": "AAA"
    //   },
    //   {
    //     "modelo": "J6",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "calidad": "Original Oled",
    //     "marca": "Samsung",
    //     "id": "aQtvRFQzq0Wr9Rboy4Ro"
    //   },
    //   {
    //     "hovered": false,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "id": "xnTRMe2k0gMdMC9hcht2",
    //     "cantidadTotal": 0,
    //     "modelo": "J6",
    //     "calidad": "GenBueno",
    //     "marca": "Samsung"
    //   },
    //   {
    //     "marca": "Samsung",
    //     "hovered": false,
    //     "id": "yEnI89qvwyxDmaNukJID",
    //     "calidad": "Original Oled",
    //     "cantidadTotal": 0,
    //     "modelo": "J6 - J4 / plus / core / prime",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 7
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Blanco"
    //         },
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ]
    //     },
    //     "modelo": "J7",
    //     "id": "4CowvDLwnJqOv6ffOdc6",
    //     "cantidadTotal": 0,
    //     "calidad": "Original Oled",
    //     "marca": "Samsung",
    //     "hovered": false
    //   },
    //   {
    //     "calidad": "GenBueno",
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": []
    //     },
    //     "marca": "Samsung",
    //     "modelo": "J7",
    //     "id": "9IG8CzW76rZmtCHOHGUQ",
    //     "hovered": false
    //   },
    //   {
    //     "id": "CijKuyr1nR2KP4NRMAQt",
    //     "cantidadTotal": 0,
    //     "calidad": "AAA",
    //     "hovered": false,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Dorado"
    //         }
    //       ]
    //     },
    //     "marca": "Samsung",
    //     "modelo": "J7"
    //   },
    //   {
    //     "modelo": "J7 2016",
    //     "marca": "Samsung",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": 2
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         },
    //         {
    //           "color": "Dorado",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 3,
    //     "calidad": "Original Oled",
    //     "hovered": false,
    //     "id": "63clvOorRlmA6fGGgqwR"
    //   },
    //   {
    //     "id": "D5C9s74AB7BSJOdAXCxa",
    //     "modelo": "J7 neo",
    //     "hovered": false,
    //     "marca": "Samsung",
    //     "calidad": "Original Oled",
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Gris"
    //         },
    //         {
    //           "color": "Dorado",
    //           "cantidad": 2
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "marca": "Samsung",
    //     "modelo": "J7 neo",
    //     "cantidadTotal": 0,
    //     "calidad": "GenBueno",
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": 1
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         },
    //         {
    //           "color": "Dorado",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "hVMW7zEUmx1mu6KPNyiv"
    //   },
    //   {
    //     "modelo": "J7 prime ",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Blanco",
    //           "cantidad": 2
    //         },
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "marca": "Samsung",
    //     "id": "fgeF967cCrijfYdeqoxk",
    //     "calidad": "Original Oled"
    //   },
    //   {
    //     "id": "6VQnOImgqZLt87hqKQKu",
    //     "modelo": "J7 pro",
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 0
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Celeste"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "calidad": "Original Oled",
    //     "cantidadTotal": 0,
    //     "marca": "Samsung"
    //   },
    //   {
    //     "id": "Cy3k0VWo84mfTdn0jUoE",
    //     "cantidadTotal": 0,
    //     "modelo": "J7 pro",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Celeste"
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Dorado"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "calidad": "AAA",
    //     "hovered": false,
    //     "marca": "Samsung"
    //   },
    //   {
    //     "marca": "Samsung",
    //     "modelo": "J7 pro",
    //     "calidad": "GenBueno",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "id": "cjPa8oYbjahqm4y7rFOQ",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "marca": "Samsung",
    //     "calidad": "Original Oled",
    //     "modelo": "J8",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": []
    //     },
    //     "id": "ML8m9eZ6s7ILB6cvTnE0"
    //   },
    //   {
    //     "hovered": false,
    //     "id": "SCr4cEVXiF41hzvEqUDQ",
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "GenBueno",
    //     "modelo": "J8",
    //     "marca": "Samsung"
    //   },
    //   {
    //     "modelo": "k11 plus",
    //     "marca": "LG",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "id": "w4rmPYRYi4PhyDZQKsuI",
    //     "hovered": false,
    //     "calidad": "Estandar",
    //     "cantidadTotal": 1
    //   },
    //   {
    //     "marca": "LG",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "calidad": "Estandar",
    //     "cantidadTotal": 3,
    //     "hovered": false,
    //     "modelo": "Lg K10 2017",
    //     "id": "kNNadMI3hO0XOMoosQNu"
    //   },
    //   {
    //     "modelo": "Lg K10 v0,3",
    //     "cantidadTotal": 1,
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "id": "sriqiHT5QZzoLWFA9qJR",
    //     "hovered": false,
    //     "marca": "LG",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "3"
    //         }
    //       ]
    //     },
    //     "marca": "LG",
    //     "cantidadTotal": 0,
    //     "modelo": "Lg K11",
    //     "id": "bDaROICahVOld9sHIIgv",
    //     "hovered": false,
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": []
    //     },
    //     "calidad": "Estandar",
    //     "marca": "LG",
    //     "modelo": "Lg K22",
    //     "id": "0oeftLlRoMHgpLAo6ucL"
    //   },
    //   {
    //     "marca": "LG",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": []
    //     },
    //     "calidad": "Estandar",
    //     "modelo": "Lg K4 2017",
    //     "id": "p3tCzWpunq2Gus42m4I0"
    //   },
    //   {
    //     "marca": "LG",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "id": "l3iDTaDy7tx1tDGSsM2v",
    //     "calidad": "Estandar",
    //     "modelo": "Lg K41s",
    //     "hovered": false,
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "id": "k1pkBTuv7Z0hc6gDBzRw",
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "modelo": "Lg K50 -Q60",
    //     "marca": "LG",
    //     "cantidadTotal": 2
    //   },
    //   {
    //     "hovered": false,
    //     "modelo": "Lg K50s",
    //     "cantidadTotal": 1,
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "id": "RLfLNhqWi4HOu2p5Tw5X",
    //     "marca": "LG",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "id": "36mm90EY6vf6TlXl5ZjC",
    //     "modelo": "Lg K8",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 2,
    //     "hovered": false,
    //     "marca": "LG",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     }
    //   },
    //   {
    //     "cantidadTotal": 1,
    //     "modelo": "Lg K8 2017",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "marca": "LG",
    //     "id": "QSJLSHonCmO8zx1VDDfd",
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 2,
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "id": "ScD9N9AiNmtjNwsBCxF3",
    //     "marca": "LG",
    //     "modelo": "Lg K9",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "id": "hZYYl2eJrWWXjqOYe9U6",
    //     "hovered": false,
    //     "cantidadTotal": 2,
    //     "calidad": "Estandar",
    //     "marca": "LG",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "modelo": "Lg leon"
    //   },
    //   {
    //     "hovered": false,
    //     "calidad": "Estandar",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "cantidadTotal": 1,
    //     "modelo": "Lg Q6",
    //     "id": "7XCeQXRFgQvjvRtuwVAn",
    //     "marca": "LG"
    //   },
    //   {
    //     "modelo": "M12",
    //     "id": "2ZMYBtI4ffPTUtXimcul",
    //     "hovered": false,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "marca": "Samsung",
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "marca": "Huawei",
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "id": "jrx0uZWeJzxtrf9v0t2l",
    //     "modelo": "Mate 9 lite (flex costado)"
    //   },
    //   {
    //     "modelo": "Mate 9 lite (flex medio)",
    //     "hovered": false,
    //     "marca": "Huawei",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": "3",
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "id": "PKNEdE77BQsosMRn3WNL",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "cantidadTotal": 0,
    //     "marca": "Xiaomi",
    //     "modelo": "mia 8 lite",
    //     "id": "KmWkOgODZXINx8mx91Hd",
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     }
    //   },
    //   {
    //     "id": "4f9vYGZykayQeSSUlK1c",
    //     "modelo": "Moto C",
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "marca": "Motorola"
    //   },
    //   {
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "modelo": "Moto C plus",
    //     "id": "ax4EhIc8V51ydUfmuUkm",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "id": "ut7P4yUGdzICZr0EbHUA",
    //     "modelo": "Moto E2",
    //     "calidad": "Estandar",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "marca": "Motorola"
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "id": "Vwkt0EFMu5VOThWsY6CG",
    //     "modelo": "Moto E20",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 5,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "marca": "Motorola"
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 3
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "hovered": false,
    //     "modelo": "Moto E32",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 0,
    //     "id": "2QnLzlP3FQlkqMK2aXJf",
    //     "marca": "Motorola"
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "calidad": "Estandar",
    //     "modelo": "Moto E4 plus",
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "id": "7xDD24P9ttJ9hRSocIgb"
    //   },
    //   {
    //     "id": "kSYTwVavLgznNEMMhWWu",
    //     "marca": "Motorola",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 3,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "calidad": "Estandar",
    //     "modelo": "Moto E40",
    //     "cantidadTotal": 0,
    //     "hovered": false
    //   },
    //   {
    //     "id": "gkVabId7fgvSsLON5Yfw",
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "calidad": "Estandar",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 0
    //         },
    //         {
    //           "color": "Dorado",
    //           "cantidad": "2"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "modelo": "Moto E5 - G6 play"
    //   },
    //   {
    //     "id": "X18x6RnCD9BH0Ne98pWx",
    //     "hovered": false,
    //     "modelo": "Moto E5 play",
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "marca": "Motorola",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "modelo": "Moto E5 play go",
    //     "cantidadTotal": 0,
    //     "marca": "Motorola",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "Kt8rJrnZ1kThh5Ur6FMT",
    //     "calidad": "Estandar",
    //     "hovered": false
    //   },
    //   {
    //     "modelo": "Moto E5 plus",
    //     "id": "4jvknORkTwRT9HnnKE4S",
    //     "cantidadTotal": 0,
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     }
    //   },
    //   {
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ]
    //     },
    //     "modelo": "Moto E6 play",
    //     "id": "DVbp6le271G8jJkqLllJ",
    //     "cantidadTotal": 2,
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "cantidadTotal": 3,
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "id": "MfzT01XposzZYv96dyge",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ]
    //     },
    //     "modelo": "Moto E6 plus"
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "id": "dDRH7Gko4X4H4O2Vdb56",
    //     "cantidadTotal": 2,
    //     "modelo": "Moto E6s - E6i"
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ]
    //     },
    //     "cantidadTotal": 0,
    //     "modelo": "Moto E7 - E7i power",
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "id": "9fSW0KJjazEDHNJJXiV0",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "hovered": false,
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "modelo": "Moto G",
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "cantidadTotal": 1,
    //     "id": "Abu5DMkjPJUreMbvmdkS"
    //   },
    //   {
    //     "cantidadTotal": 1,
    //     "id": "oPciYjubuq29XYRfVwNy",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "modelo": "Moto G2",
    //     "hovered": false
    //   },
    //   {
    //     "marca": "Motorola",
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "id": "Yjli5AmK0yjwHSq9zojo",
    //     "modelo": "Moto G20"
    //   },
    //   {
    //     "modelo": "Moto G3",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 0,
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "id": "FewqOTiUgrRhj2KNcIa9",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     }
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "id": "9w94KxEA2tJkHtHOqiCQ",
    //     "hovered": false,
    //     "modelo": "Moto G30"
    //   },
    //   {
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "id": "4fPhvCqslRlvObS7H0gV",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "modelo": "Moto G31 - G41 - G71",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 0,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "id": "ZG9Ta2xyB2q1BZSgYUye",
    //     "cantidadTotal": 0,
    //     "calidad": "Estandar",
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "modelo": "Moto G4",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "modelo": "Moto G4 play",
    //     "id": "1R6ZLo9zj7viWuru5E6M",
    //     "cantidadTotal": 2,
    //     "hovered": false
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "id": "2rJOt4RGK3UdnFOvfeee",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "hovered": false,
    //     "modelo": "Moto G4 plus",
    //     "cantidadTotal": 1
    //   },
    //   {
    //     "marca": "Motorola",
    //     "id": "BNomxs0Hntu9rK9Zxga5",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": "2",
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "modelo": "Moto G5",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "id": "AII4NCMbvcVsU2JdFp7S",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "modelo": "Moto G5 plus"
    //   },
    //   {
    //     "marca": "Motorola",
    //     "modelo": "Moto G5s plus",
    //     "cantidadTotal": 2,
    //     "hovered": false,
    //     "calidad": "Estandar",
    //     "id": "v8Baev6HDYJRseqemBHW",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "marca": "Motorola",
    //     "id": "HCgoqpn8tiMEfyWzAr91",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 0,
    //     "modelo": "Moto G6",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "hjewlOnjAVjElvyneVcS",
    //     "modelo": "Moto G6 plus"
    //   },
    //   {
    //     "marca": "Motorola",
    //     "id": "IThn4jifk2CNFvhYIw6U",
    //     "modelo": "Moto G7 - G7 plus",
    //     "cantidadTotal": 0,
    //     "calidad": "Estandar",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ]
    //     },
    //     "hovered": false
    //   },
    //   {
    //     "modelo": "Moto G7 play",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 4,
    //     "id": "DAAePIbK21UYXQDtO5EA"
    //   },
    //   {
    //     "id": "k952z6tcPjCftpucH0Yp",
    //     "cantidadTotal": 0,
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ]
    //     },
    //     "modelo": "Moto G7 power",
    //     "hovered": false
    //   },
    //   {
    //     "id": "WlBAwQyzevvN9ChD8VJb",
    //     "hovered": false,
    //     "modelo": "Moto G8",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "modelo": "Moto G8 play - One macro",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "marca": "Motorola",
    //     "cantidadTotal": 0,
    //     "id": "KIQu9YG4vaEm5Wx8CzaK",
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "QUiTuIWFN6tDmwTigevv",
    //     "modelo": "Moto G8 plus",
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "modelo": "Moto G8 power",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "id": "pyCXvhVCqQwEvulBZZTj",
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 2,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "id": "vtywxaCSYx1GOaVM4q9M",
    //     "modelo": "Moto G8 power lite",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "marca": "Motorola",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "marca": "Motorola",
    //     "cantidadTotal": 4,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 3,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "id": "YiTWMhFHM2qnswp9TUGs",
    //     "modelo": "Moto G9 play - E7 plus",
    //     "hovered": false
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "3"
    //         }
    //       ]
    //     },
    //     "id": "iHMQyQ7ln4tFO2xufcdT",
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "modelo": "Moto G9 plus"
    //   },
    //   {
    //     "modelo": "Moto G9 power",
    //     "hovered": false,
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "id": "41BpZeExMk3iRoUzwuKI",
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 4,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "cantidadTotal": 0
    //   },
    //   {
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 2
    //         }
    //       ]
    //     },
    //     "modelo": "Moto One",
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "id": "QAMqvtXYZOGhfBcWVHRd",
    //     "cantidadTotal": 0,
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 3,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "id": "2VRw1SCTft0kL2uVbvFF",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 1,
    //     "modelo": "Moto One action - vision"
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "modelo": "Moto One fucion",
    //     "id": "gkyI6HdSskZmFSgF4xW0",
    //     "marca": "Motorola",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "hovered": false
    //   },
    //   {
    //     "hovered": false,
    //     "id": "E6Takv0RO8CuH7ZRbKUq",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 1,
    //     "marca": "Motorola",
    //     "modelo": "Moto X",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     }
    //   },
    //   {
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "id": "PfZ3RhwwJiNeowAJ1Uq4",
    //     "cantidadTotal": 2,
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         },
    //         {
    //           "cantidad": 1,
    //           "color": "Blanco"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "calidad": "Estandar",
    //     "modelo": "Moto X play"
    //   },
    //   {
    //     "marca": "Motorola",
    //     "stock": {
    //       "sinMarco": [],
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "calidad": "Estandar",
    //     "id": "6CRwoV0Abdn7X6Eg3Q0R",
    //     "cantidadTotal": 1,
    //     "modelo": "Moto X style",
    //     "hovered": false
    //   },
    //   {
    //     "cantidadTotal": 0,
    //     "id": "CsSZaKNMerfjmTUcixxD",
    //     "hovered": false,
    //     "modelo": "Moto X2",
    //     "calidad": "Estandar",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "marca": "Motorola"
    //   },
    //   {
    //     "hovered": false,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "marca": "Motorola",
    //     "calidad": "Estandar",
    //     "id": "lIQwQjwlD7NrDcTEPvPx",
    //     "cantidadTotal": 0,
    //     "modelo": "Moto Z play"
    //   },
    //   {
    //     "id": "S5ohG1qZQOMTzWJ9q8aA",
    //     "calidad": "Estandar",
    //     "marca": "Motorola",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ]
    //     },
    //     "modelo": "Moto Z2 play"
    //   },
    //   {
    //     "modelo": "Note 6 pro",
    //     "cantidadTotal": 0,
    //     "marca": "Huawei",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "hovered": false,
    //     "id": "ck372UJYySiAabN0PPeV",
    //     "calidad": "Estandar"
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "marca": "Huawei",
    //     "modelo": "P10 lite",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "id": "Wtv3NBaBdqgFsVrjjCZo",
    //     "hovered": false
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "modelo": "P9",
    //     "id": "ktnFiL6FImPb3doTevg8",
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ]
    //     },
    //     "hovered": false,
    //     "marca": "Huawei"
    //   },
    //   {
    //     "id": "S0YgmEDmzoofjUsZEPH6",
    //     "calidad": "Estandar",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "marca": "Huawei",
    //     "cantidadTotal": 0,
    //     "modelo": "P9 lite",
    //     "hovered": false
    //   },
    //   {
    //     "calidad": "Original Oled",
    //     "modelo": "S7 edge",
    //     "marca": "Samsung",
    //     "cantidadTotal": 1,
    //     "stock": {
    //       "conMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "sinMarco": []
    //     },
    //     "id": "Z5iZkMYL4ZMRCUhWaPVF",
    //     "hovered": false
    //   },
    //   {
    //     "calidad": "Estandar",
    //     "marca": "Xiaomi",
    //     "modelo": "Xiaomi A1",
    //     "id": "7p9HUdBp08xI9OU0L62c",
    //     "hovered": false,
    //     "cantidadTotal": 0,
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": 1
    //         }
    //       ],
    //       "conMarco": []
    //     }
    //   },
    //   {
    //     "hovered": false,
    //     "id": "qxWRMlpoi1LEMTGn9PBJ",
    //     "calidad": "Estandar",
    //     "stock": {
    //       "sinMarco": [
    //         {
    //           "cantidad": 1,
    //           "color": "Negro"
    //         }
    //       ],
    //       "conMarco": []
    //     },
    //     "cantidadTotal": 0,
    //     "marca": "Xiaomi",
    //     "modelo": "Xiaomi note 8 t"
    //   },
    //   {
    //     "marca": "Xiaomi",
    //     "id": "D3rEisimJcgU4E3O9El8",
    //     "calidad": "Estandar",
    //     "cantidadTotal": 0,
    //     "hovered": false,
    //     "stock": {
    //       "conMarco": [],
    //       "sinMarco": [
    //         {
    //           "color": "Negro",
    //           "cantidad": "2"
    //         }
    //       ]
    //     },
    //     "modelo": "Xiaomi redmi note 7"
    //   }
    // ];
    // this.listaDeModulos = this.ordenarListaPor(lista, 'modelo', 'stock');
    // this.listaDeModulosAMostrar = [...this.listaDeModulos];
    console.log(this.listaDeModulosAMostrar)


    this.dataBase.obtenerTodos(environment.TABLAS.stockModulos).subscribe((docsModulosRef) => {
      if (docsModulosRef.length <= 0) return;
      lista = docsModulosRef.map((element: any) => {
        let auxElement = element.payload.doc.data();
        auxElement['id'] = element.payload.doc.id;
        return auxElement;
      });
      this.listaDeModulos = this.ordenarListaPor(lista, 'modelo', 'stock');
      this.listaDeModulosAMostrar = [...this.listaDeModulos];

    });


  }

  ordenarListaPor(lista: any[], criterio: string, criterio2: string) {
    return lista.sort((a, b) => a[criterio].localeCompare(b[criterio]) || a[criterio2] - b[criterio2]);
  }

  async seleccionar(modulo: Element) {

    try {
      const modal = await this.modalController.create({
        component: DetalleStockModuloComponent,
        componentProps: {
          repuesto: modulo,
          loggedUser: this.loggedUser
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result || !result.data || !result.role) return;


        this.moduloCompletoSeleccionado = result.data;

        if (result.role == 'eliminar') {
          this.eliminarRepuestoSeleccionado();
        } else {
          this.actualizarModuloEnFirebase();
        }

      })
      return await modal.present();
    } catch (err) {

    }

  }


  async eliminarRepuestoSeleccionado() {
    this.mostrarSpinner = true;
    try {
      await this.dataBase.eliminar(environment.TABLAS.stockModulos, this.moduloCompletoSeleccionado.id);
    } catch (err) {
    } finally {
      this.mostrarSpinner = false;
    }
  }
  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.listaDeModulosAMostrar = this.listaDeModulos.filter((d) => d.modelo.toLowerCase().indexOf(query) > -1);
  }



  async openDialog() {
    try {
      const modal = await this.modalController.create({
        component: FormStockModuloComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.dataBase.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
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

  seleccionarColorYTipo($event, stock, modulo, tipo) {
    $event.stopPropagation();
    this.moduloCompletoSeleccionado = modulo;
    this.tipoDeStockSeleccionado = tipo;
    this.stockSeleccionadoEditable = { ...stock };
    this.stockSeleccionado = stock;
    this.showStockDialog = true;
  }

  cambiarCantidad(accion) {
    let stock = this.stockSeleccionadoEditable;

    if (accion == 'aumentar') {
      stock.cantidad = Number(stock.cantidad) + 1
    } else {
      if (stock.cantidad == 0) {
        this.preguntarSiQuiereRemoverEsteColorDeLaVista();
        return;
      };
      stock.cantidad = Number(stock.cantidad) - 1;
    }
    // this.actualizarCantidadTotal();
  }

  preguntarSiQuiereRemoverEsteColorDeLaVista() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere remover este color de la lista?", 'Si, remover', () => {
      let indiceStockSeleccionado = this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].findIndex(stock => stock == this.stockSeleccionado);
      if (indiceStockSeleccionado != -1) {
        this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].splice(indiceStockSeleccionado, 1);
      }
      this.showStockDialog = false;
      this.actualizarModuloEnFirebase();
    });
    // this.dialogService.setDialog({
    //   title: "Quiere remover este color de la lista?",
    //   state: true,
    //   confirmMethod: () => {
    //     let indiceStockSeleccionado = this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].findIndex(stock => stock == this.stockSeleccionado);
    //     if (indiceStockSeleccionado != -1) {
    //       this.moduloCompletoSeleccionado.stock[this.tipoDeStockSeleccionado].splice(indiceStockSeleccionado, 1);
    //     }
    //     this.showStockDialog = false;
    //     this.actualizarModuloEnFirebase();
    //   }
    // });
    // this.dialogService.showDialog();
  }

  guardarCambios() {
    this.alertService.alertConfirmacion('Confirmación', "¿Quiere modificar el stock actual?", 'Si, modificar', () => {
      this.stockSeleccionado.cantidad = this.stockSeleccionadoEditable.cantidad;
      this.showStockDialog = false;
      this.actualizarModuloEnFirebase();
    });
  }
  async actualizarModuloEnFirebase() {
    this.mostrarSpinner = true;
    try {
      await this.dataBase.actualizar(environment.TABLAS.stockModulos, this.moduloCompletoSeleccionado, this.moduloCompletoSeleccionado.id);

    } catch (err) {
    } finally {
      this.mostrarSpinner = false;
    }
  }

  mostrarStockBajo() {
    let listaStockBajo = [];

    this.listaDeModulos.forEach(modulo => {
      modulo.stock.sinMarco.forEach((stock: any) => {
        if (stock.cantidad <= 1) {
          listaStockBajo.push({
            color: stock.color,
            cantidad: stock.cantidad.toString(),
            modelo: modulo.modelo,
            tipo: 'S/M',
            calidad: modulo.calidad
          });
        }
      });
      modulo.stock.conMarco.forEach((stock: any) => {
        if (stock.cantidad <= 1) {
          listaStockBajo.push({
            color: stock.color,
            cantidad: stock.cantidad.toString(),
            modelo: modulo.modelo,
            tipo: 'C/M',
            calidad: modulo.calidad
          });
        }
      });

    });
    this.listaDeModulosAMostrar = listaStockBajo.sort((a, b) => {
      if (a.modelo < b.modelo) return -1;
      if (a.modelo > b.modelo) return 1;
      if (a.tipo < b.tipo) return -1;
      if (a.tipo > b.tipo) return 1;
      if (a.cantidad < b.cantidad) return -1;
      if (a.cantidad > b.cantidad) return 1;
      return 0;
    });

  }

  mostrarLista(lista) {
    this.listaSeleccionada = lista;
    if (lista == 'completa') {
      this.displayedColumnKeys = new FormControl(['modelo', 'calidad', 'c/m', 's/m']);
      this.listaDeAtributos = ['marca', 'modelo', 'calidad', 'c/m', 's/m'];
      this.listaDeModulosAMostrar = [...this.listaDeModulos]
    } else {//stock bajo
      this.displayedColumnKeys = new FormControl(['modelo', 'calidad', 'tipo', 'color', 'cantidad']);
      this.listaDeAtributos = ['modelo', 'calidad', 'tipo', 'color', 'cantidad'];
      this.mostrarStockBajo()
    }
  }
}
