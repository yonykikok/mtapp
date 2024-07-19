import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
import { AperturaDeCajaComponent } from 'src/app/components/apertura-de-caja/apertura-de-caja.component';
import { FormActualizarItemLibroDiarioComponent } from 'src/app/components/forms/form-actualizar-item-libro-diario/form-actualizar-item-libro-diario.component';
import { FormDetalleVentaComponent, MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { NuevoFormDetalleVentaComponent } from 'src/app/components/nuevo-form-detalle-venta/nuevo-form-detalle-venta.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
const productos = [
  {
    "codigo": "--",
    "categoria": "Cables",
    "costo": 3.018867924528302,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "iva": 0,
    "precio": 8966.037735849059,
    "id": "DBB9mRoRgPrNFjFG2pVq",
    "producto": "adaptador 1 macho iphone y dos hembra iphone",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719243571584?alt=media&token=04bd6533-e8da-4c3b-b816-17cced554f42"
    ],
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719243571584"
    ],
    "marca": "lightning splitter",
    "margen": 100
  },
  {
    "producto": "adaptador auto",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244538845?alt=media&token=825dcf6f-5774-4049-8e23-923727909756"
    ],
    "financiamiento": 8,
    "precio": 5491.698113207547,
    "categoria": "Cargadores",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719244538845"
    ],
    "marca": "ibek",
    "costo": 1.849056603773585,
    "codigo": "7795234533938",
    "margen": 100,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "id": "15msX5qZDvrzJiZ1Y5Yr"
  },
  {
    "imgUrlsRef": [
      "productos/1719356302824"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719356302824?alt=media&token=fcad342e-0f6f-4b4f-b40a-b0e66d84dce9"
    ],
    "producto": "adaptador de auto tipo c",
    "id": "3mRWasQ5CrHqeO2Oggrx",
    "categoria": "Cargadores",
    "cantidad": 1,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "codigo": "190198889973",
    "marca": "apple",
    "precio": 8640,
    "costo": 2.909090909090909,
    "iva": 0,
    "margen": 100
  },
  {
    "financiamiento": 8,
    "iva": 0,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "categoria": "Cables",
    "producto": "adaptador hdmi a vga",
    "marca": "netmak",
    "cantidad": 1,
    "costo": 5.864727272727273,
    "imgUrlsRef": [
      "productos/1719434539974"
    ],
    "precio": 17418.24,
    "margen": 100,
    "id": "1goZRgsEoXvqlSSAMT4b",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434539974?alt=media&token=bca4d5d5-819f-4e14-a580-ba2076ba0696"
    ],
    "codigo": "7792641880815"
  },
  {
    "codigo": "8639006253251",
    "precio": 14040.000000000002,
    "producto": "adaptador hdtv switch",
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719588383515?alt=media&token=a3b85fdc-cb3d-4e20-9654-ffbde1ea72f3"
    ],
    "id": "y1WPqUkaxjYTmQrBxqhv",
    "imgUrlsRef": [
      "productos/1719588383515"
    ],
    "margen": 100,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "financiamiento": 8,
    "costo": 4.7272727272727275,
    "iva": 0,
    "marca": "--",
    "categoria": "computacion"
  },
  {
    "costo": 0.4290909090909091,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719500378872"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "precio": 1274.4,
    "id": "eGV8KoNgSe1SriIUZlS4",
    "margen": 100,
    "financiamiento": 8,
    "producto": "adaptador para lampara",
    "marca": "--",
    "codigo": "--",
    "categoria": "hogar",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500378872?alt=media&token=c3305f20-5d70-4a8e-af4b-21827ed1cf67"
    ],
    "iva": 0
  },
  {
    "id": "2P5gyVLYzYStwjpYJ8HL",
    "financiamiento": 8,
    "producto": "adaptador tipo c",
    "margen": 100,
    "cantidad": 1,
    "iva": 0,
    "marca": "samsung",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "costo": 2.5660377358490565,
    "imgUrlsRef": [
      "productos/1719078603175"
    ],
    "precio": 7621.132075471698,
    "codigo": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078603175?alt=media&token=419acf1c-cb87-41f3-8515-eebffdb76e9f"
    ],
    "categoria": "Cargadores"
  },
  {
    "codigo": "194252156926",
    "categoria": "Cargadores",
    "margen": 100,
    "id": "pIh6KqMjOqVHYP0xeBPn",
    "precio": 11207.547169811322,
    "imgUrlsRef": [
      "productos/1719078619996"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078619996?alt=media&token=3202f44b-86a1-431b-be48-f31ad813967f"
    ],
    "iva": 0,
    "costo": 3.7735849056603774,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "marca": "apple",
    "producto": "adaptador tipo c",
    "cantidad": 1,
    "financiamiento": 8
  },
  {
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "precio": 1944,
    "costo": 0.6545454545454545,
    "imgUrlsRef": [
      "productos/1719500368577"
    ],
    "marca": "--",
    "iva": 0,
    "id": "HE5jU17c3XYc5Hx7VGUw",
    "codigo": "--",
    "categoria": "hogar",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500368577?alt=media&token=f443c6e2-d461-41fa-87db-8c2986d150ff"
    ],
    "producto": "adaptador triple toma",
    "cantidad": 1,
    "financiamiento": 8,
    "margen": 100
  },
  {
    "categoria": "Cargadores",
    "iva": 0,
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078637627?alt=media&token=e7260464-82a8-4ade-a887-28832e2f37bf"
    ],
    "costo": 1.509433962264151,
    "precio": 4483.018867924529,
    "producto": "adaptador usb",
    "cantidad": 1,
    "marca": "inova",
    "margen": 100,
    "id": "y3nZdpO2Hc0lTpUaE8kT",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719078637627"
    ],
    "codigo": "7799061004340"
  },
  {
    "categoria": "computacion",
    "financiamiento": 8,
    "precio": 6948.67924528302,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244242005?alt=media&token=cdf62cf9-4542-4cc6-93d1-805bd6acb02d"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719244242005"
    ],
    "producto": "antena wifi",
    "marca": "wireless-n",
    "iva": 0,
    "costo": 2.339622641509434,
    "margen": 100,
    "codigo": "6900750011674",
    "id": "eU1ZimePIh9CW7QRM4HX"
  },
  {
    "marca": "netmak",
    "margen": 100,
    "categoria": "computacion",
    "costo": 3.1320754716981134,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244261256?alt=media&token=4503d0c0-e82c-418b-9d6d-5787235bacd9"
    ],
    "cantidad": 1,
    "financiamiento": 8,
    "codigo": "0700306601658",
    "precio": 9302.264150943398,
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "producto": "antena wifi",
    "id": "qZgsYZozebDSTGHZKTl2",
    "imgUrlsRef": [
      "productos/1719244261256"
    ]
  },
  {
    "producto": "aro led 26cm rgb",
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348789950?alt=media&token=a5e9792b-4be9-43bc-bdf1-3b6811fdb154"
    ],
    "cantidad": 1,
    "iva": 0,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "categoria": "luces",
    "id": "VgG6xnj4kE9xPPYHxY9p",
    "marca": "soft ring light",
    "costo": 6.2,
    "codigo": "mj26",
    "precio": 18414,
    "imgUrlsRef": [
      "productos/1719348789950"
    ]
  },
  {
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719348819624"
    ],
    "id": "IaOpWIs4cCbYqjH2awNU",
    "precio": 19440.000000000004,
    "categoria": "luces",
    "iva": 0,
    "producto": "aro led 30cm rgb",
    "costo": 6.545454545454546,
    "codigo": "mj30",
    "margen": 100,
    "marca": "soft ring light",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348819624?alt=media&token=1f4af23f-40cf-4a2d-9b7d-bd952ad928b2"
    ],
    "cantidad": 1
  },
  {
    "costo": 6.545454545454546,
    "categoria": "luces",
    "precio": 19440.000000000004,
    "marca": "ring fill light",
    "codigo": "ljj-33",
    "financiamiento": 8,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348850419?alt=media&token=ed99ee8f-59de-46cd-ae10-b47ea34c389b"
    ],
    "margen": 100,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719348850419"
    ],
    "producto": "aro led 33cm rgb",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "id": "r8F4D4dSqY4paeFM5SqS"
  },
  {
    "imgUrlsRef": [
      "productos/1719348907381"
    ],
    "financiamiento": 8,
    "iva": 0,
    "producto": "aro led 8\"",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "costo": 4,
    "id": "XWjeywpsXpkjTZR4t4Q0",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348907381?alt=media&token=b3dd7d05-758e-475b-82d8-5d42439fbb24"
    ],
    "codigo": "6900750010851",
    "categoria": "luces",
    "margen": 100,
    "marca": "fill in light",
    "cantidad": 1,
    "precio": 11880
  },
  {
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719348261778"
    ],
    "marca": "simple, oreja de gato y corazon",
    "id": "DikSKMI6JEA1lZHBFRwT",
    "financiamiento": 8,
    "codigo": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348261778?alt=media&token=70fae6bf-766a-46ec-8744-1c35891b3f01"
    ],
    "precio": 3240,
    "margen": 100,
    "producto": "aro selfie",
    "categoria": "luces",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "costo": 1.0909090909090908,
    "iva": 0
  },
  {
    "marca": "i12 true wireless",
    "margen": 80,
    "costo": 3.7735849056603774,
    "precio": 10086.79245283019,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996635995?alt=media&token=ecb631c9-f59b-45e9-817f-89926c7e0707"
    ],
    "id": "6KXV5MeN5Vp1B4nUuLjj",
    "categoria": "auricular",
    "iva": 0,
    "codigo": "i12",
    "producto": "Auricular bluetooth",
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1716996635995"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ]
  },
  {
    "costo": 4.150943396226415,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "margen": 100,
    "precio": 12328.301886792453,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996380051?alt=media&token=85a43db3-a0f5-4177-b7e6-7aa8941d3727"
    ],
    "iva": 0,
    "marca": "f9",
    "producto": "Auricular bluetooth",
    "codigo": "f9",
    "cantidad": 1,
    "categoria": "auricular",
    "financiamiento": 8,
    "id": "GAtIyqGBF2Z9yYrtozsU",
    "imgUrlsRef": [
      "productos/1716996380051"
    ]
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991463047?alt=media&token=abe64bb5-5704-4971-9fd1-ad76299ad803"
    ],
    "categoria": "Auricular bluetooth",
    "margen": 100,
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1718991463047"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "marca": "xiaomi redmi",
    "cantidad": 1,
    "id": "O2R97i08XQpDoaTbYb8S",
    "precio": 18380.37735849057,
    "iva": 0,
    "financiamiento": 8,
    "costo": 6.188679245283019,
    "producto": "Auricular bluetooth"
  },
  {
    "financiamiento": 8,
    "cantidad": 0,
    "costo": 9.23076923076923,
    "id": "dKCKrT28rh0chUZv6POT",
    "codigo": "6973037709434",
    "categoria": "auricular",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 0,
        "denominacionColor": "Negro"
      }
    ],
    "marca": "Lenovo xt82",
    "iva": 0,
    "margen": 100,
    "producto": "Auricular bluetooth",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996845856?alt=media&token=c91fa68a-a4c0-4444-926d-2117805f7a7c"
    ],
    "imgUrlsRef": [
      "productos/1716996845856"
    ],
    "precio": 27415.384615384617
  },
  {
    "precio": 7996.153846153847,
    "financiamiento": 8,
    "costo": 2.6923076923076925,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "producto": "Auricular bluetooth",
    "codigo": "6989532512530",
    "imgUrlsRef": [
      "productos/1716932192605"
    ],
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716932192605?alt=media&token=d3550be6-ce05-40d8-97b2-3f2889a1e270"
    ],
    "id": "etmAfUyvPrhflUtZDZAp",
    "categoria": "auricular",
    "marca": "p47",
    "cantidad": 1,
    "margen": 100
  },
  {
    "precio": 8674.641509433963,
    "imgUrlsRef": [
      "productos/1718978907251"
    ],
    "marca": "p47 messi",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "codigo": "--",
    "cantidad": 1,
    "producto": "Auricular bluetooth",
    "categoria": "Auricular bluetooth",
    "iva": 0,
    "margen": 80,
    "costo": 3.2452830188679247,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718978907251?alt=media&token=a3e4ce0e-e7b0-4ba8-a77c-866234c4fb1f"
    ],
    "id": "hEKkEKmSBewAzyn8iLAJ"
  },
  {
    "codigo": "763571814406",
    "categoria": "auricular",
    "imgUrlsRef": [
      "productos/1716996391397"
    ],
    "iva": 0,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "precio": 12328.301886792453,
    "producto": "Auricular bluetooth",
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996391397?alt=media&token=c4168290-5436-46f9-a5d6-bb90922b91d1"
    ],
    "marca": "f9 s pro",
    "financiamiento": 8,
    "costo": 4.150943396226415,
    "id": "xZHZnyqT8HEEZpxJMitP"
  },
  {
    "costo": 5.479245283018868,
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245390418?alt=media&token=dca4163e-b26d-430a-802d-87a49b18089f"
    ],
    "marca": "rabbit ear",
    "cantidad": 1,
    "id": "vmJAYz3fn3ivLAG1d8Gt",
    "precio": 16273.35849056604,
    "imgUrlsRef": [
      "productos/1719245390418"
    ],
    "margen": 100,
    "codigo": "0723540565999",
    "producto": "auricular bluetooth ar-1371",
    "financiamiento": 8,
    "categoria": "Auricular bluetooth"
  },
  {
    "precio": 4483.018867924529,
    "margen": 100,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "codigo": "--",
    "costo": 1.509433962264151,
    "iva": 0,
    "marca": "motorola",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245069684?alt=media&token=00e49df3-94fa-49df-bf8b-db5933ee3497"
    ],
    "imgUrlsRef": [
      "productos/1719245069684"
    ],
    "id": "2ZsxNaxHhJNdtnhEEQD8",
    "cantidad": 1,
    "categoria": "Auricular bluetooth",
    "producto": "auricular bluetooth bolsita mj6688"
  },
  {
    "codigo": "--",
    "margen": 100,
    "cantidad": 1,
    "categoria": "Auricular bluetooth",
    "precio": 4483.018867924529,
    "producto": "auricular bluetooth bolsita t180a",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245054393?alt=media&token=1a499f8b-e4d2-48cb-85d5-66f3bfb8d5b2"
    ],
    "costo": 1.509433962264151,
    "id": "oyXWNzMwj21eNEfV0Btz",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "marca": "jbl",
    "imgUrlsRef": [
      "productos/1719245054393"
    ],
    "financiamiento": 8
  },
  {
    "costo": 2.418867924528302,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245008146?alt=media&token=84bb80b5-6cc1-43fb-bcbd-309a5e98fece"
    ],
    "producto": "auricular bluetooth mh-750",
    "precio": 7184.037735849058,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719245008146"
    ],
    "codigo": "--",
    "iva": 0,
    "id": "jvvAURUYTAi4b5OJoidH",
    "categoria": "Auricular bluetooth",
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "marca": "sony",
    "margen": 100
  },
  {
    "producto": "auricular bluetooth mj6688",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "imgUrlsRef": [
      "productos/1719244982033"
    ],
    "precio": 7184.037735849058,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244982033?alt=media&token=e529cbbe-917f-4c53-8494-58c85b5f48f3"
    ],
    "codigo": "--",
    "marca": "motorola",
    "cantidad": 1,
    "costo": 2.418867924528302,
    "iva": 0,
    "categoria": "Auricular bluetooth",
    "margen": 100,
    "id": "ecPQuS89BgJk8JK9EeD6",
    "financiamiento": 8
  },
  {
    "margen": 100,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "categoria": "Auricular bluetooth",
    "precio": 7184.037735849058,
    "costo": 2.418867924528302,
    "imgUrlsRef": [
      "productos/1719244964550"
    ],
    "id": "FCguEV3IqOLcC2FMwEpn",
    "codigo": "--",
    "marca": "jbl",
    "producto": "auricular bluetooth t180a",
    "financiamiento": 8,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244964550?alt=media&token=feef3fe7-d699-448c-976e-c24adbe272d3"
    ],
    "cantidad": 1
  },
  {
    "marca": "samsung",
    "id": "vQja0ZnJX3BXMOId8nNn",
    "iva": 0,
    "costo": 1.2830188679245282,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245238282?alt=media&token=28d77bbb-2b51-4fa7-b25a-73ceee325212"
    ],
    "precio": 3810.566037735849,
    "categoria": "auricular",
    "producto": "auricular con cable s20+",
    "codigo": "--",
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719245238282"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "margen": 100,
    "cantidad": 1
  },
  {
    "categoria": "auricular",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718990626163?alt=media&token=b2eaa967-c27a-479a-ad69-327a210593f7"
    ],
    "margen": 80,
    "marca": "bolsita",
    "iva": 0,
    "cantidad": 1,
    "financiamiento": 8,
    "costo": 0.5215094339622641,
    "precio": 1393.9947169811321,
    "imgUrlsRef": [
      "productos/1718990626163"
    ],
    "codigo": "--",
    "producto": "Auricular economico",
    "id": "i3xN0cWDeh5ehkhBuRxz"
  },
  {
    "financiamiento": 8,
    "costo": 1.8867924528301887,
    "producto": "Auricular ficha iphone",
    "codigo": "--",
    "categoria": "auricular",
    "id": "85MA0ts3gUGywR7sM9yf",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1718990753241"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718990753241?alt=media&token=bba1c19f-0350-477d-92e2-6c1a21c57a0f"
    ],
    "precio": 5603.773584905661,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "marca": "caja acrilica",
    "cantidad": 1,
    "margen": 100
  },
  {
    "margen": 100,
    "costo": 1.7592727272727273,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719350809214"
    ],
    "iva": 0,
    "precio": 5225.040000000001,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719350809214?alt=media&token=0f2e1267-b7fc-4848-b5bb-4bbcb84b6780"
    ],
    "codigo": "8806088843452",
    "id": "yMNE2A090qD7oPJ4LLcq",
    "categoria": "auricular",
    "producto": "auricular ficha tipo c",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "marca": "samsung"
  },
  {
    "marca": "taidun",
    "codigo": "6900750010226",
    "id": "RmeW5hBXdCW1l7HtmIuv",
    "producto": "auricular gamer pc v1000",
    "categoria": "Auriculares con vincha",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719350674450?alt=media&token=ebf20bfe-40c5-4e83-a462-2e1702c136d8"
    ],
    "margen": 100,
    "precio": 17712.000000000004,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719350674450"
    ],
    "cantidad": 1,
    "costo": 5.963636363636364,
    "iva": 0
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719350687594"
    ],
    "cantidad": 1,
    "producto": "auricular gamer play sy830mv",
    "iva": 0,
    "costo": 5.454545454545454,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719350687594?alt=media&token=90d9cac5-82e8-4c88-aed7-023bf8db3d1f"
    ],
    "codigo": "--",
    "marca": "design for high-end gamers",
    "categoria": "Auriculares con vincha",
    "margen": 100,
    "precio": 16200,
    "id": "70FsPIbHt5IbanJMgXcS"
  },
  {
    "cantidad": 2,
    "id": "sp6krOMo17xwTI0FB1Aw",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351466748?alt=media&token=3dbc6af4-22df-4110-a16c-bdba6215b210"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 2,
        "color": "#000000"
      }
    ],
    "iva": 0,
    "marca": "suitable for gaming series",
    "imgUrlsRef": [
      "productos/1719351466748"
    ],
    "costo": 5.090909090909091,
    "codigo": "6921168803485",
    "margen": 100,
    "precio": 15120,
    "producto": "auricular gamer x2 mobile/ps4",
    "financiamiento": 8,
    "categoria": "Auriculares con vincha"
  },
  {
    "codigo": "6921168803485",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351478794?alt=media&token=210b109a-5e71-477a-b6dc-9fb31c2c0ff5"
    ],
    "cantidad": 2,
    "marca": "suitable for gaming series",
    "imgUrlsRef": [
      "productos/1719351478794"
    ],
    "coloresDisponibles": [
      {
        "stock": 2,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "financiamiento": 8,
    "id": "TuoN2eNOejCFDI8KXZ3F",
    "iva": 0,
    "producto": "auricular gamer x3 mobile/ps4",
    "costo": 5.090909090909091,
    "precio": 15120,
    "categoria": "Auriculares con vincha",
    "margen": 100
  },
  {
    "imgUrlsRef": [
      "productos/1718990940793"
    ],
    "margen": 100,
    "financiamiento": 8,
    "marca": "caja acrilica",
    "producto": "Auricular imitacion iphone ficha comun",
    "precio": 3138.11320754717,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "cantidad": 1,
    "categoria": "auricular",
    "iva": 0,
    "id": "WvXlGmjEm5dbfhVo8aVB",
    "costo": 1.0566037735849056,
    "codigo": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718990940793?alt=media&token=7dccf034-5b6d-4a2e-90f5-c012e8ce947f"
    ]
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991837264?alt=media&token=cec4a4bb-fd03-4fd7-ac81-fdd497004851"
    ],
    "id": "H5HFlyAWEDaNyfIcq6ho",
    "producto": "Auricular pc",
    "marca": "as-90",
    "margen": 80,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1718991837264"
    ],
    "precio": 16623.03396226415,
    "cantidad": 1,
    "codigo": "--",
    "costo": 6.218867924528302,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "iva": 0,
    "categoria": "Auriculares con vincha"
  },
  {
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "marca": "as-60",
    "imgUrlsRef": [
      "productos/1718991826609"
    ],
    "codigo": "--",
    "margen": 80,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991826609?alt=media&token=f49fc31b-1c72-423e-b956-6e1a491ee813"
    ],
    "precio": 16623.03396226415,
    "cantidad": 1,
    "iva": 0,
    "costo": 6.218867924528302,
    "producto": "Auricular pc",
    "categoria": "Auriculares con vincha",
    "id": "ypQTjKSFRMhbqKmCczax"
  },
  {
    "costo": 1.0188679245283019,
    "precio": 3026.037735849057,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1718993351902"
    ],
    "margen": 100,
    "codigo": "--",
    "producto": "auricular s10+ caja gris",
    "categoria": "auricular",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "marca": "samsung",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993351902?alt=media&token=e5cf6772-0ac2-497f-ae40-c5a59734582f"
    ],
    "cantidad": 1,
    "id": "rmJfZAloxWUX02pcmV2t"
  },
  {
    "costo": 1.0188679245283019,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993367563?alt=media&token=b963c697-ed09-4e61-a689-17058f33d1e4"
    ],
    "precio": 3026.037735849057,
    "marca": "samsung",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "categoria": "auricular",
    "financiamiento": 8,
    "codigo": "--",
    "margen": 100,
    "cantidad": 1,
    "producto": "auricular s10+ caja negra",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1718993367563"
    ],
    "id": "sLePe2GOkH610faIZ0KJ"
  },
  {
    "marca": "extra bass",
    "margen": 80,
    "cantidad": 1,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718988103582?alt=media&token=5b0fc333-6b6c-4a81-aa0b-40b7605d1233"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "costo": 2.868679245283019,
    "categoria": "auricular",
    "id": "FTMsbecYHFIHgplI65G7",
    "codigo": "--",
    "producto": "Auricular vincha ",
    "imgUrlsRef": [
      "productos/1718988103582"
    ],
    "financiamiento": 8,
    "precio": 7667.97962264151
  },
  {
    "margen": 100,
    "iva": 0,
    "codigo": "--",
    "producto": "Auricular y47",
    "financiamiento": 8,
    "categoria": "Auricular bluetooth",
    "marca": "y47",
    "precio": 8392.211320754717,
    "imgUrlsRef": [
      "productos/1719057634574"
    ],
    "id": "cVN0mnJNzZxLVXceISNg",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057634574?alt=media&token=595e55bf-f6e2-4d50-aae6-96344286e220"
    ],
    "costo": 2.8256603773584907,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ]
  },
  {
    "marca": "cat ear",
    "margen": 100,
    "codigo": "6935185208184",
    "categoria": "Auricular bluetooth",
    "precio": 15120,
    "id": "DZB8l0gYrhyT38ElnIlC",
    "imgUrlsRef": [
      "productos/1719351691257"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351691257?alt=media&token=f79855eb-f6cb-4692-b46e-794315113691"
    ],
    "cantidad": 1,
    "producto": "auricular zw-028",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "iva": 0,
    "costo": 5.090909090909091,
    "financiamiento": 8
  },
  {
    "codigo": "6902022086120",
    "costo": 5.090909090909091,
    "margen": 100,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "cantidad": 1,
    "producto": "auricular zw-08",
    "marca": "wireless headset",
    "iva": 0,
    "id": "qE4POQdzLxjSZTa2OVYa",
    "imgUrlsRef": [
      "productos/1719351701739"
    ],
    "categoria": "Auricular bluetooth",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351701739?alt=media&token=a4a0b71e-9385-4dcc-a864-8362431ce460"
    ],
    "precio": 15120,
    "financiamiento": 8
  },
  {
    "precio": 14121.509433962265,
    "id": "YioSkn5bJ2gSd9Xt7a99",
    "costo": 5.283018867924528,
    "margen": 80,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "producto": "Auriculares bluetooth",
    "categoria": "Auricular bluetooth",
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1718986962750"
    ],
    "marca": "P36",
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718986962750?alt=media&token=82ba916a-3418-4661-a931-3c025dbcf7ef"
    ],
    "codigo": "--",
    "iva": 0
  },
  {
    "codigo": "--",
    "iva": 0,
    "categoria": "Auricular bluetooth",
    "financiamiento": 8,
    "precio": 16239.735849056606,
    "margen": 80,
    "marca": "6s",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718986940408?alt=media&token=ef89b254-c8f3-4118-9431-e242aab2f694"
    ],
    "cantidad": 1,
    "costo": 6.0754716981132075,
    "imgUrlsRef": [
      "productos/1718986940408"
    ],
    "producto": "Auriculares bluetooth",
    "id": "vB0bEyLu91k5xpzfvFx1"
  },
  {
    "iva": 0,
    "producto": "Auriculares caja amarilla",
    "cantidad": 1,
    "id": "Wcj39McxxuRfoRLHRE7I",
    "costo": 1.4188679245283018,
    "precio": 4214.037735849057,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993892168?alt=media&token=f1b58fd7-fc83-4c81-91e9-998ef8d177a6"
    ],
    "categoria": "Auricular bluetooth",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "codigo": "--",
    "marca": "sport",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1718993892168"
    ]
  },
  {
    "categoria": "Auricular bluetooth",
    "id": "wXfABRUeknPVf6TKOxqD",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993903816?alt=media&token=0a65c0bf-ce54-4fc5-b937-5406e4cb7aab"
    ],
    "precio": 4214.037735849057,
    "imgUrlsRef": [
      "productos/1718993903816"
    ],
    "marca": "sport headphones",
    "iva": 0,
    "cantidad": 1,
    "margen": 100,
    "financiamiento": 8,
    "producto": "Auriculares caja negro con verde",
    "codigo": "--",
    "costo": 1.4188679245283018
  },
  {
    "precio": 4214.037735849057,
    "iva": 0,
    "marca": "wireless headset",
    "id": "5JoSOL73KxJRucfc3UIQ",
    "imgUrlsRef": [
      "productos/1718993916980"
    ],
    "financiamiento": 8,
    "margen": 100,
    "producto": "Auriculares caja negro deportivo",
    "codigo": "--",
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "categoria": "Auricular bluetooth",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993916980?alt=media&token=fadc7326-530e-4de0-b346-0c1ec82235fc"
    ],
    "costo": 1.4188679245283018
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991373850?alt=media&token=e48f7df6-f61e-4fa4-bb9b-b319e1e50c0b"
    ],
    "marca": "Piranha",
    "iva": 0,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "financiamiento": 8,
    "precio": 7667.97962264151,
    "margen": 80,
    "imgUrlsRef": [
      "productos/1718991373850"
    ],
    "cantidad": 1,
    "codigo": "--",
    "costo": 2.868679245283019,
    "id": "zANYFxyF5Vv9VLmXmoEf",
    "categoria": "Auriculares con vincha",
    "producto": "Auriculares de vincha con cable"
  },
  {
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718992135823?alt=media&token=366de6a7-4794-4215-9ec9-0d8015d8f609"
    ],
    "iva": 0,
    "producto": "Auriculares ev110",
    "imgUrlsRef": [
      "productos/1718992135823"
    ],
    "codigo": "--",
    "margen": 100,
    "cantidad": 1,
    "costo": 1.0566037735849056,
    "id": "W5RFdGBASPWHDiCA81yp",
    "precio": 3138.11320754717,
    "marca": "elmcoei caja",
    "categoria": "auricular",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ]
  },
  {
    "margen": 100,
    "categoria": "auricular",
    "marca": "samsung",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718992400408?alt=media&token=ee59e6f2-c898-4ff8-9f59-6be8bb12ecc6"
    ],
    "imgUrlsRef": [
      "productos/1718992400408"
    ],
    "costo": 0.9056603773584906,
    "financiamiento": 8,
    "id": "Zi0wrjZirjXfGHxwSme0",
    "iva": 0,
    "precio": 2689.811320754717,
    "cantidad": 1,
    "producto": "Auriculares hs330",
    "codigo": "--",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ]
  },
  {
    "codigo": "--",
    "cantidad": 1,
    "iva": 0,
    "costo": 8.172830188679246,
    "id": "nxs8f0VVLXTT8Q0vIOcP",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "marca": "Kosmo",
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718992513064?alt=media&token=5615befb-4327-4b61-abd5-036a46ea4d3e"
    ],
    "producto": "Auriculares kos-hp402",
    "imgUrlsRef": [
      "productos/1718992513064"
    ],
    "precio": 24273.305660377362,
    "financiamiento": 8,
    "categoria": "Auriculares con vincha"
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993037052?alt=media&token=443fce68-fe10-4211-95b8-61734ef419ae"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "iva": 0,
    "producto": "Auriculares kr-gm204",
    "precio": 13919.77358490566,
    "margen": 80,
    "categoria": "Auriculares con vincha",
    "cantidad": 1,
    "codigo": "--",
    "costo": 5.2075471698113205,
    "id": "m0KIwSN5ws9r0EoTllWM",
    "imgUrlsRef": [
      "productos/1718993037052"
    ],
    "marca": "gaming headset",
    "financiamiento": 8
  },
  {
    "margen": 80,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993064970?alt=media&token=3c0e73a5-0f5e-4989-9ef2-d092565bf743"
    ],
    "categoria": "Auriculares con vincha",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "producto": "Auriculares kr-gm303",
    "costo": 5.283018867924528,
    "id": "ma7u36AzUCTPLT3STN6l",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1718993064970"
    ],
    "precio": 14121.509433962265,
    "codigo": "--",
    "marca": "rgb light",
    "iva": 0,
    "financiamiento": 8
  },
  {
    "marca": "gaming headset",
    "precio": 13919.77358490566,
    "id": "8TZAguFwLr40gVEukJZC",
    "iva": 0,
    "cantidad": 1,
    "margen": 80,
    "categoria": "Auriculares con vincha",
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1718993080231"
    ],
    "producto": "Auriculares kr-gm402",
    "codigo": "--",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993080231?alt=media&token=e387e798-c345-4724-a85d-a374d26fa716"
    ],
    "costo": 5.2075471698113205
  },
  {
    "id": "o0tGs8Qi2CKJpxywx86i",
    "codigo": "bal-sd-400",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354662761?alt=media&token=3d873793-4088-4ee1-bb1a-90cabfbefbe8"
    ],
    "imgUrlsRef": [
      "productos/1719354662761"
    ],
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "cantidad": 1,
    "producto": "balanza cocina 10kg",
    "iva": 0,
    "categoria": "hogar",
    "costo": 2.6392727272727274,
    "precio": 7838.640000000001,
    "marca": "madison",
    "margen": 100
  },
  {
    "id": "0icOXxkWotZxg8j25DKT",
    "financiamiento": 8,
    "codigo": "kl-t40-b",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719354683184"
    ],
    "margen": 100,
    "producto": "balanza comercial 40kg",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "costo": 24,
    "precio": 71280,
    "marca": "kalpana",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354683184?alt=media&token=dd6b7875-0d7f-4c03-a73c-2c5473d12545"
    ],
    "iva": 0,
    "categoria": "hogar"
  },
  {
    "marca": "star vision",
    "precio": 18360,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "iva": 0,
    "financiamiento": 8,
    "codigo": "1654986196555",
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354703129?alt=media&token=5fe3ae37-7625-46d1-99fd-e728381ea315"
    ],
    "imgUrlsRef": [
      "productos/1719354703129"
    ],
    "costo": 6.181818181818182,
    "id": "ul61vKO0glHQcYXjeDHp",
    "categoria": "hogar",
    "producto": "balanza personal 180kg",
    "margen": 100
  },
  {
    "marca": "pocket scale",
    "producto": "balanza pocket 0,1 a 500gms",
    "costo": 5.446545454545454,
    "margen": 100,
    "financiamiento": 8,
    "codigo": "6945545645009",
    "precio": 16176.24,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719354716268"
    ],
    "categoria": "hogar",
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354716268?alt=media&token=b6c68e0d-f1fd-45ea-8927-394a66251014"
    ],
    "id": "Q9QLwiaGb3Uaphsd9Yuk"
  },
  {
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354739073?alt=media&token=4be21f0b-667c-44a0-b59b-564e82bfb0c5"
    ],
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719354739073"
    ],
    "producto": "balanza portatil 50kg",
    "costo": 3.272727272727273,
    "financiamiento": 8,
    "precio": 9720.000000000002,
    "categoria": "hogar",
    "margen": 100,
    "marca": "star vision",
    "id": "Lz9kKtElS2Kewc3ZO08y",
    "codigo": "--",
    "cantidad": 1
  },
  {
    "coloresDisponibles": [
      {
        "color": "#52d6fc",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "iva": 0,
    "producto": "botella 3 en 1",
    "costo": 8.515636363636364,
    "id": "ZbftCt6uepwqlRAov1Mp",
    "precio": 22762.296000000006,
    "imgUrlsRef": [
      "productos/1719354899865"
    ],
    "categoria": "hogar",
    "margen": 80,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354899865?alt=media&token=9b521c62-965f-410c-b4cf-71dd179fe93e"
    ],
    "codigo": "--",
    "financiamiento": 8,
    "marca": "luo",
    "cantidad": 1
  },
  {
    "margen": 100,
    "costo": 3.018867924528302,
    "marca": "caja blanca",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719243608665?alt=media&token=c6c0429d-de1f-4cc7-b550-a66580de010f"
    ],
    "categoria": "Cables",
    "producto": "cable adaptador iphone a aux",
    "cantidad": 1,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719243608665"
    ],
    "precio": 8966.037735849059,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "id": "e6d0yI6COE16gcMwosKq",
    "codigo": "--"
  },
  {
    "categoria": "Cables",
    "precio": 8966.037735849059,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "producto": "cable adaptador tipo c a aux",
    "codigo": "--",
    "costo": 3.018867924528302,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719243675736?alt=media&token=887f8a65-6ae0-42d9-bea1-737275fadec1"
    ],
    "imgUrlsRef": [
      "productos/1719243675736"
    ],
    "margen": 100,
    "marca": "caja blanca",
    "cantidad": 1,
    "id": "bG8wVdHHDBMvFjd22yDg"
  },
  {
    "margen": 100,
    "codigo": "--",
    "costo": 1.3730909090909091,
    "producto": "cable alimentacion pc",
    "id": "M0Ac6UQNjp6oqHWHD1w7",
    "cantidad": 1,
    "categoria": "Cables",
    "iva": 0,
    "financiamiento": 8,
    "marca": "bolsita",
    "imgUrlsRef": [
      "productos/1719434372922"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434372922?alt=media&token=32bea927-f87c-46ff-955e-09c36cbf1e4b"
    ],
    "precio": 4078.0800000000004
  },
  {
    "marca": "sin marca",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434391870?alt=media&token=c45f40b1-ffe6-4ae9-a510-a11e8b797ba0"
    ],
    "codigo": "--",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719434391870"
    ],
    "cantidad": 1,
    "costo": 1.6581818181818182,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "categoria": "Cables",
    "iva": 0,
    "producto": "cable alimentacion trebol",
    "id": "6bs30Xjx6BDY55X5Fyot",
    "precio": 4924.8
  },
  {
    "margen": 100,
    "producto": "cable audio y video (3 RCA a 3 RCA)",
    "precio": 1367.28,
    "codigo": "asfsafsafsafsafsa",
    "marca": "alfarouk",
    "cantidad": 1,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434442406?alt=media&token=d044990a-cb9b-44b2-8030-48756f2de7db"
    ],
    "imgUrlsRef": [
      "productos/1719434442406"
    ],
    "categoria": "Cables",
    "costo": 0.46036363636363636,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "id": "n9uz21eGAJmqqVMTBEWS"
  },
  {
    "id": "7u5monieh8QExswYDWMH",
    "marca": "netmak",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434454798?alt=media&token=6f35d364-d377-4843-b97f-34419a29b222"
    ],
    "producto": "cable aux a aux",
    "imgUrlsRef": [
      "productos/1719434454798"
    ],
    "precio": 1989.3600000000004,
    "costo": 0.6698181818181819,
    "categoria": "Cables",
    "codigo": "7792641880662",
    "cantidad": 1,
    "margen": 100,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "iva": 0
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434477870?alt=media&token=7c0846a9-56db-445c-91c7-228310ffd1c4"
    ],
    "marca": "netmak",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "categoria": "Cables",
    "imgUrlsRef": [
      "productos/1719434477870"
    ],
    "financiamiento": 8,
    "margen": 100,
    "producto": "cable aux a aux con mic",
    "precio": 4050,
    "costo": 1.3636363636363635,
    "id": "3AnkAER68EfatZYO9n3L",
    "cantidad": 1,
    "iva": 0,
    "codigo": "7792641881935"
  },
  {
    "producto": "cable de impresora 1,5mts",
    "id": "sNPaB14PwL9n3HsSLj3H",
    "costo": 0.8109090909090909,
    "cantidad": 1,
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434502633?alt=media&token=88a247be-9205-4604-bdb8-bce77ae70e8d"
    ],
    "marca": "high speed computer",
    "margen": 100,
    "precio": 2408.4,
    "codigo": "--",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "categoria": "Cables",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719434502633"
    ]
  },
  {
    "precio": 2824.3018867924534,
    "margen": 100,
    "marca": "lian pu",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719057512119"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057512119?alt=media&token=87397526-9b10-4aa9-b613-0068530410da"
    ],
    "categoria": "Cables",
    "cantidad": 1,
    "producto": "cable ethernet 10mts",
    "id": "VZJV683QbZDOcVMDX1zO",
    "financiamiento": 8,
    "costo": 0.9509433962264151,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "codigo": "--"
  },
  {
    "costo": 1.3962264150943395,
    "cantidad": 1,
    "financiamiento": 8,
    "precio": 4146.792452830188,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719057524073"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "categoria": "Cables",
    "id": "Dqe1GZhKKAiZgOnvBMyr",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057524073?alt=media&token=f6176b74-92bf-4742-b4b5-b0c5c5ff0d0d"
    ],
    "margen": 100,
    "codigo": "--",
    "marca": "lian pu",
    "producto": "cable ethernet 20mts"
  },
  {
    "codigo": "--",
    "marca": "bentaf",
    "categoria": "Cables",
    "precio": 2299.788679245283,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719057536222"
    ],
    "id": "B9IVBrQG3HkRYOQ6aDsZ",
    "financiamiento": 8,
    "margen": 100,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "costo": 0.7743396226415095,
    "producto": "cable ethernet 5mts",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057536222?alt=media&token=e240af91-d4c4-4231-bfde-8d76c5091269"
    ],
    "cantidad": 1
  },
  {
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "costo": 2.1818181818181817,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436819093?alt=media&token=bfaa7afb-1b21-4e7b-b759-042dd65e9f48"
    ],
    "categoria": "Cables",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719436819093"
    ],
    "marca": "iglufive",
    "iva": 0,
    "codigo": "--",
    "margen": 100,
    "producto": "cable hdmi a hdmi 5mts",
    "precio": 6480,
    "id": "hG6d8GixGUh3DDRZMqWo"
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "id": "7a5u5mJBo5l3J791yNbG",
    "iva": 0,
    "margen": 100,
    "cantidad": 1,
    "codigo": "7892020015682",
    "producto": "cable hdmi a vga",
    "costo": 2.7643636363636364,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719588444799?alt=media&token=4e022d3c-c64d-4f4a-9380-f2dc4c07d270"
    ],
    "precio": 8210.16,
    "imgUrlsRef": [
      "productos/1719588444799"
    ],
    "marca": "hd conversion cable",
    "categoria": "soportes",
    "financiamiento": 8
  },
  {
    "precio": 5832,
    "producto": "cable hdmi a vga 1,5mts",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436828928?alt=media&token=f20f4f38-ce04-42df-8668-436b6021eb7c"
    ],
    "costo": 1.9636363636363636,
    "codigo": "6910000060253",
    "imgUrlsRef": [
      "productos/1719436828928"
    ],
    "marca": "hdtv cable",
    "categoria": "Cables",
    "cantidad": 1,
    "margen": 100,
    "iva": 0,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "id": "rYdkHQLvRqhSoDuEvqZF"
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719057484586"
    ],
    "costo": 1.4264150943396225,
    "margen": 100,
    "marca": "caja blanca",
    "producto": "cable iphone 1mt usb",
    "codigo": "885909627424",
    "precio": 4236.452830188679,
    "categoria": "Cables",
    "id": "AEw1pqDEZ7EerGghFQI9",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057484586?alt=media&token=4a047fc3-b567-488e-8c9f-709854cfb793"
    ],
    "cantidad": 1,
    "financiamiento": 8
  },
  {
    "categoria": "Cables",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "id": "sbKDRVgeouVB4OgqBLqn",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719079555159"
    ],
    "codigo": "6900750002597",
    "precio": 5267.5471698113215,
    "marca": "apple",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079555159?alt=media&token=3f43e063-a511-4069-842d-d323b1c9d0b3"
    ],
    "producto": "cable iphone 2mts usb",
    "costo": 1.7735849056603774,
    "cantidad": 1,
    "financiamiento": 8
  },
  {
    "codigo": "6969201905160",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "id": "nT1gki73hfXKyfLkKrVa",
    "cantidad": 1,
    "financiamiento": 8,
    "margen": 100,
    "marca": "x-cable",
    "categoria": "Cables",
    "iva": 0,
    "producto": "Cable iphone imantado",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079385667?alt=media&token=57a6ec00-170c-4ba7-80c0-91224906a601"
    ],
    "precio": 4034.7169811320755,
    "costo": 1.3584905660377358,
    "imgUrlsRef": [
      "productos/1719079385667"
    ]
  },
  {
    "codigo": "--",
    "margen": 100,
    "producto": "cable iphone tipo c",
    "financiamiento": 8,
    "costo": 1.5849056603773586,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719262197849?alt=media&token=3fcade69-d53d-45f5-9589-4fd996ac350d"
    ],
    "id": "a0xWGbh3s03XmCPuea4Z",
    "imgUrlsRef": [
      "productos/1719262197849"
    ],
    "marca": "caja blanca",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "cantidad": 1,
    "iva": 0,
    "categoria": "Cables",
    "precio": 4707.169811320755
  },
  {
    "imgUrlsRef": [
      "productos/1719262167013"
    ],
    "id": "Y7rC4dGmLVSMfp5dmEO4",
    "categoria": "Cables",
    "financiamiento": 8,
    "codigo": "--",
    "costo": 0.9433962264150944,
    "margen": 100,
    "producto": "cable iphone usb rc-5008",
    "marca": "legatus",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719262167013?alt=media&token=ad6e7995-3289-49b4-aee5-581e5c6bbd1f"
    ],
    "iva": 0,
    "precio": 2801.8867924528304,
    "cantidad": 1
  },
  {
    "financiamiento": 8,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719057390894"
    ],
    "margen": 100,
    "categoria": "Cables",
    "marca": "motorola",
    "iva": 0,
    "precio": 4483.018867924529,
    "id": "cA33gFZ7vmiBhunLu0HH",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057390894?alt=media&token=43d15d34-d3cf-4a54-b8a1-39222970f773"
    ],
    "codigo": "--",
    "producto": "cable tipo c",
    "costo": 1.509433962264151
  },
  {
    "financiamiento": 8,
    "margen": 100,
    "marca": "bolsita",
    "costo": 0.7547169811320755,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719056685235"
    ],
    "codigo": "--",
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "id": "ZQEjZ653dIcxAv7Hgsl2",
    "categoria": "Cables",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056685235?alt=media&token=05401002-b7c1-4147-816c-b0c47db9c185"
    ],
    "precio": 2241.5094339622647,
    "producto": "cable tipo c "
  },
  {
    "producto": "cable tipo c a iphone",
    "margen": 100,
    "iva": 0,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436290760?alt=media&token=db2cac88-815e-4c66-a110-bf0e1e337280"
    ],
    "precio": 3866.3999999999996,
    "id": "ZlFVr3xnd5junpTgYi7a",
    "costo": 1.3018181818181818,
    "marca": "protection mobile",
    "financiamiento": 8,
    "codigo": "50131",
    "categoria": "Cables",
    "imgUrlsRef": [
      "productos/1719436290760"
    ],
    "cantidad": 1
  },
  {
    "iva": 0,
    "precio": 3456,
    "producto": "cable tipo c a iphone 1mt",
    "cantidad": 1,
    "id": "7gdT0zAm2O51aPKQVwDu",
    "codigo": "--",
    "costo": 1.1636363636363636,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719436300181"
    ],
    "margen": 100,
    "categoria": "Cables",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "marca": "inova",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436300181?alt=media&token=70ab749c-3df4-4581-ac95-46831847ac61"
    ]
  },
  {
    "margen": 100,
    "marca": "aoweixun or vesion",
    "cantidad": 2,
    "codigo": "6900750011735",
    "id": "FL7mZMvh9aDpKEy2kpz7",
    "producto": "cable tipo c a tipo c",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079051601?alt=media&token=9b5c4903-5ac9-4e69-b43d-f611bf3ccbbf"
    ],
    "precio": 3138.11320754717,
    "financiamiento": 8,
    "categoria": "Cables",
    "iva": 0,
    "costo": 1.0566037735849056,
    "imgUrlsRef": [
      "productos/1719079051601"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 2
      }
    ]
  },
  {
    "imgUrlsRef": [
      "productos/1719436307818"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "cantidad": 1,
    "id": "bNNaHCeKn9J3zO0LOzJG",
    "financiamiento": 8,
    "producto": "cable tipo c a tipo c",
    "precio": 3866.3999999999996,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436307818?alt=media&token=32bce2c1-021f-4453-816c-2e49ad9e4a67"
    ],
    "costo": 1.3018181818181818,
    "categoria": "Cables",
    "iva": 0,
    "margen": 100,
    "codigo": "50129",
    "marca": "protection mobile"
  },
  {
    "categoria": "Cables",
    "financiamiento": 8,
    "precio": 3873.3283018867924,
    "costo": 1.3041509433962264,
    "cantidad": 1,
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056520522?alt=media&token=1013910b-4b51-418d-bccb-6ef2bfc57759"
    ],
    "id": "liT6TVdpfe9GgOXOLVUV",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "producto": "cable tipo c cb0-6116",
    "imgUrlsRef": [
      "productos/1719056520522"
    ],
    "codigo": "--",
    "iva": 0,
    "marca": "inova"
  },
  {
    "financiamiento": 8,
    "id": "uuNPqHhH9HcDnvxOjBWK",
    "costo": 0.8686792452830189,
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056585600?alt=media&token=85cf697b-3c5a-47db-bd17-a80028526c2b"
    ],
    "imgUrlsRef": [
      "productos/1719056585600"
    ],
    "categoria": "Cables",
    "producto": "cable tipo c cbo-5724",
    "iva": 0,
    "marca": "inova",
    "codigo": "--",
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "precio": 2579.9773584905665
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079304156?alt=media&token=b43a4014-dd45-4ffb-a047-8c16221fe6d3"
    ],
    "costo": 1.320754716981132,
    "margen": 100,
    "precio": 3922.6415094339627,
    "producto": "Cable tipo c imantado",
    "iva": 0,
    "id": "0HFITBQloIopOnXRI10v",
    "marca": "x-cable",
    "codigo": "6969201905160",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "cantidad": 1,
    "financiamiento": 8,
    "categoria": "Cables",
    "imgUrlsRef": [
      "productos/1719079304156"
    ]
  },
  {
    "cantidad": 1,
    "costo": 0.6792452830188679,
    "precio": 2017.3584905660377,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056476226?alt=media&token=4d4afba9-7cd3-4b77-ae14-19d499552485"
    ],
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "categoria": "Cables",
    "marca": "royalcell",
    "imgUrlsRef": [
      "productos/1719056476226"
    ],
    "codigo": "--",
    "id": "kvQL4GQvjAbM7uhi3FG4",
    "iva": 0,
    "producto": "cable tipo c rc-y00",
    "margen": 100
  },
  {
    "codigo": "7798318654628",
    "producto": "cable tubo v8",
    "precio": 4605.784615384617,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716999347401?alt=media&token=fa7ad778-b6dc-4bb1-88b0-ced24b8bb3a8"
    ],
    "margen": 80,
    "marca": "inova",
    "imgUrlsRef": [
      "productos/1716999347401"
    ],
    "costo": 1.7230769230769232,
    "financiamiento": 8,
    "categoria": "Cables",
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "id": "4jezpUiMy1FiYEbJb7k1"
  },
  {
    "id": "DuoGOmoFmKr1U9cJmPC1",
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "precio": 2916,
    "marca": "adweixun orvesion",
    "imgUrlsRef": [
      "productos/1719439205078"
    ],
    "producto": "cable usb a usb",
    "cantidad": 1,
    "categoria": "Cables",
    "costo": 0.9818181818181818,
    "financiamiento": 8,
    "margen": 100,
    "codigo": "6900750011728",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439205078?alt=media&token=2bde547f-51f1-4ed3-93a6-a1aa3dac6407"
    ]
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079725779?alt=media&token=fcdcef82-4946-4a7c-aa9d-c54b766777f0"
    ],
    "producto": "cable usb pin fino",
    "margen": 100,
    "marca": "bolsita",
    "precio": 1456.9811320754718,
    "financiamiento": 8,
    "categoria": "Cables",
    "cantidad": 1,
    "costo": 0.49056603773584906,
    "imgUrlsRef": [
      "productos/1719079725779"
    ],
    "codigo": "7891766030409",
    "id": "EDROjS3XIcLhNjJcXSqf",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "iva": 0
  },
  {
    "financiamiento": 8,
    "producto": "cable v3 usb",
    "margen": 100,
    "id": "JahyknX5qYfzyR4GkZ7z",
    "categoria": "Cables",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079780809?alt=media&token=d8028169-dfd6-4af0-b830-8ec7fd9303c5"
    ],
    "codigo": "7891766030409",
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "marca": "bolsita",
    "imgUrlsRef": [
      "productos/1719079780809"
    ],
    "precio": 1793.2075471698113,
    "costo": 0.6037735849056604
  },
  {
    "iva": 0,
    "costo": 1.3584905660377358,
    "imgUrlsRef": [
      "productos/1719080055439"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719080055439?alt=media&token=271f8704-af50-42dc-b7a3-a85c3e7ad011"
    ],
    "categoria": "Cables",
    "marca": "motorola",
    "id": "xYUAjsrhOkt44IFcy5vS",
    "precio": 4034.7169811320755,
    "producto": "cable v8 ",
    "margen": 100,
    "financiamiento": 8,
    "cantidad": 1,
    "codigo": "698547685894"
  },
  {
    "id": "MTvvTGMOSVPG3bI7fiKl",
    "financiamiento": 8,
    "codigo": "--",
    "categoria": "Cables",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716998225650?alt=media&token=6ab4a815-be9b-48a7-b28a-55599c1526b2"
    ],
    "margen": 100,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1716998225650"
    ],
    "marca": "fast 3a",
    "precio": 2970,
    "iva": 0,
    "costo": 1,
    "producto": "cable v8 colores data"
  },
  {
    "margen": 100,
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716997666860?alt=media&token=9d0c3694-30a5-4811-a499-85a091c0fbac"
    ],
    "categoria": "Cables",
    "marca": "bolsita",
    "producto": "cable v8 economico",
    "id": "FTNGvokPDX7eNi2MgMUi",
    "financiamiento": 8,
    "cantidad": 1,
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1716997666860"
    ],
    "costo": 0.4230769230769231,
    "precio": 1256.5384615384617
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "precio": 3810.566037735849,
    "margen": 100,
    "categoria": "Cables",
    "producto": "Cable v8 imantado",
    "financiamiento": 8,
    "iva": 0,
    "id": "pUOldmtq5tzh7kyVlizf",
    "marca": "x-cable",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079358192?alt=media&token=fe054e3b-8188-4b96-b8fb-7d7f28fc1015"
    ],
    "costo": 1.2830188679245282,
    "codigo": "6969201905160",
    "imgUrlsRef": [
      "productos/1719079358192"
    ],
    "cantidad": 1
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716997846536?alt=media&token=feac6f9c-48a5-4869-be0b-d5457737691d"
    ],
    "cantidad": 1,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1716997846536"
    ],
    "categoria": "Cables",
    "producto": "cable v8 mallado",
    "codigo": "--",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "precio": 1599.2307692307693,
    "marca": "--",
    "id": "mMwggTJPDZ1JHJXtqnXx",
    "costo": 0.5384615384615384,
    "margen": 100,
    "iva": 0
  },
  {
    "categoria": "Cables",
    "imgUrlsRef": [
      "productos/1719057428727"
    ],
    "precio": 2467.9018867924533,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057428727?alt=media&token=4f6b8939-e906-483f-bad3-de80d795acad"
    ],
    "financiamiento": 8,
    "id": "MBRewtLQxcN4chqBFeCI",
    "cantidad": 1,
    "margen": 100,
    "codigo": "--",
    "marca": "bolsita",
    "producto": "cable vga a vga",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "iva": 0,
    "costo": 0.8309433962264151
  },
  {
    "marca": "hytoshy",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718112287343?alt=media&token=3f6ab77a-4b6b-4320-8a81-6728e4a85228"
    ],
    "iva": 0,
    "cantidad": 4,
    "codigo": "--",
    "id": "5gQNNadQFmlHhfr5Bgtr",
    "imgUrlsRef": [
      "productos/1718112287343"
    ],
    "categoria": "caloventor",
    "margen": 80,
    "coloresDisponibles": [
      {
        "denominacionColor": "Blanco",
        "stock": 4,
        "color": "#ffffff"
      }
    ],
    "precio": 27690.22384615385,
    "producto": "caloventor 2000w",
    "costo": 10.35923076923077,
    "financiamiento": 8
  },
  {
    "imgUrlsRef": [
      "productos/1719439245165"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "producto": "camara web",
    "id": "B7lQliuYX2fONVd4GgwL",
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439245165?alt=media&token=5cdc798a-6adb-4ca0-8312-fede1805862f"
    ],
    "financiamiento": 8,
    "codigo": "6900750015962",
    "iva": 0,
    "costo": 1.4545454545454546,
    "margen": 100,
    "categoria": "computacion",
    "marca": "pc camera",
    "precio": 4320
  },
  {
    "imgUrlsRef": [
      "productos/1719439237771"
    ],
    "margen": 100,
    "producto": "camara web",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439237771?alt=media&token=f4fec6ca-f51a-4a82-918f-dd56895d23e5"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "marca": "suono",
    "cantidad": 1,
    "id": "Kl5o4FWrMUfONKuHFocX",
    "financiamiento": 8,
    "categoria": "computacion",
    "precio": 4320,
    "iva": 0,
    "costo": 1.4545454545454546,
    "codigo": "0701575361939"
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719439267094"
    ],
    "margen": 100,
    "iva": 0,
    "producto": "camara web conejo",
    "marca": "high precision glass lens",
    "id": "gxvqVed9IRoG7zfBqYb1",
    "categoria": "computacion",
    "cantidad": 1,
    "financiamiento": 8,
    "costo": 1.6727272727272726,
    "precio": 4968,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439267094?alt=media&token=f5fc3094-1fd1-4bca-b93c-d2f81d02ec55"
    ],
    "codigo": "6972667890017"
  },
  {
    "categoria": "Cargadores",
    "margen": 100,
    "producto": "cargador auto economico",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "financiamiento": 8,
    "iva": 0,
    "marca": "bolsita",
    "imgUrlsRef": [
      "productos/1719439078594"
    ],
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439078594?alt=media&token=428f041c-4b69-409a-b75b-8b7386f60774"
    ],
    "precio": 2592,
    "id": "BjcRSYqmgcllSjEjTHAO",
    "costo": 0.8727272727272727,
    "codigo": "--"
  },
  {
    "costo": 2,
    "financiamiento": 8,
    "producto": "cargador auto v8",
    "categoria": "Cargadores",
    "marca": "unipha",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "cantidad": 1,
    "id": "LihOXibwOhGScmN0xgHG",
    "margen": 100,
    "iva": 0,
    "precio": 5940,
    "codigo": "6900750002610",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439092240?alt=media&token=ef9a52e9-e8f8-416c-b1c0-547890e70ecc"
    ],
    "imgUrlsRef": [
      "productos/1719439092240"
    ]
  },
  {
    "categoria": "Cargadores",
    "margen": 100,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "codigo": "7237558983322",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439114916?alt=media&token=6bbe9f60-996f-4673-bf64-2ae07b1d9cfa"
    ],
    "costo": 2.7658181818181817,
    "financiamiento": 8,
    "iva": 0,
    "cantidad": 1,
    "id": "QItOThApi3YkTMoswz81",
    "marca": "motorola",
    "imgUrlsRef": [
      "productos/1719439114916"
    ],
    "precio": 8214.480000000001,
    "producto": "cargador auto v8"
  },
  {
    "marca": "apple",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "categoria": "Cargadores",
    "margen": 100,
    "codigo": "194252192443",
    "iva": 0,
    "costo": 7.636363636363637,
    "id": "ivuyrqZx9GBgKAsAchwW",
    "imgUrlsRef": [
      "productos/1719439124306"
    ],
    "financiamiento": 8,
    "precio": 22680.000000000004,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439124306?alt=media&token=da26af2c-59c6-4aac-87b6-8cede2ec85af"
    ],
    "producto": "cargador base inalambrica tipo c"
  },
  {
    "categoria": "Cargadores",
    "codigo": "--",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719077907848"
    ],
    "producto": "cargador c9 v8",
    "precio": 8966.037735849059,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "costo": 3.018867924528302,
    "margen": 100,
    "financiamiento": 8,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719077907848?alt=media&token=60a8e6b3-521d-4b1d-986f-ff3318159831"
    ],
    "marca": "samsung",
    "id": "ssrEpazpaYIG08W3cUHu"
  },
  {
    "codigo": "--",
    "id": "gHyIv6cwPJpKb0YM6vyU",
    "precio": 13826.975094339625,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "marca": "hytoshy",
    "categoria": "Cargadores",
    "imgUrlsRef": [
      "productos/1719074335514"
    ],
    "margen": 80,
    "financiamiento": 8,
    "costo": 5.172830188679245,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719074335514?alt=media&token=187e9b04-485f-402a-a806-1d9e0add039c"
    ],
    "producto": "cargador de notebook universal ht-120w"
  },
  {
    "precio": 8224.615384615387,
    "iva": 0,
    "categoria": "Cargadores",
    "financiamiento": 8,
    "producto": "cargador iphone",
    "margen": 80,
    "marca": "iglufive",
    "imgUrlsRef": [
      "productos/1717163855759"
    ],
    "id": "Cx7mPMFKdhzVwY0BA7Db",
    "codigo": "s/c",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717163855759?alt=media&token=13799a63-9b2e-4f39-b930-a652e57d51b1"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "costo": 3.076923076923077,
    "cantidad": 1
  },
  {
    "codigo": "190199040670",
    "costo": 4.90566037735849,
    "categoria": "Cargadores",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719078787687"
    ],
    "precio": 14569.811320754716,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078787687?alt=media&token=5728cd27-7be9-41a2-b30c-f4b890b7c748"
    ],
    "margen": 100,
    "marca": "apple",
    "id": "3jaFcK18mWeqoTcSsW32",
    "producto": "cargador iphone tipo c"
  },
  {
    "imgUrlsRef": [
      "productos/1717163865659"
    ],
    "categoria": "Cargadores",
    "financiamiento": 8,
    "iva": 0,
    "marca": "iglufive",
    "id": "A5dSJlPN5DOF5XKTgtpR",
    "precio": 8069.433962264152,
    "costo": 3.018867924528302,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717163865659?alt=media&token=cdcc4d32-dbe7-48f3-b6fe-a98a438741db"
    ],
    "cantidad": 1,
    "margen": 80,
    "codigo": "s/c",
    "producto": "cargador tipo c",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ]
  },
  {
    "margen": 80,
    "codigo": "7798378350102",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "precio": 6785.307692307692,
    "categoria": "Cargadores",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717160285180?alt=media&token=d59d23a7-5d2e-478d-94aa-13e01046c1f1"
    ],
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1717160285180"
    ],
    "costo": 2.5384615384615383,
    "financiamiento": 8,
    "marca": "inova",
    "iva": 0,
    "producto": "cargador tipo c 3.1",
    "id": "clkjkrGJ2JMbAO3qd0R6"
  },
  {
    "imgUrlsRef": [
      "productos/1717162795009"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717162795009?alt=media&token=8a6b5f58-6100-4a2c-9a98-7507325462cf"
    ],
    "precio": 8910,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "marca": "inova",
    "cantidad": 1,
    "producto": "cargador tipo c 5.1",
    "iva": 0,
    "costo": 3,
    "id": "cT4xMVnSoRs0Pr0Pbolh",
    "financiamiento": 8,
    "codigo": "7799061004401",
    "categoria": "Cargadores",
    "margen": 100
  },
  {
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719439172160"
    ],
    "marca": "samsung",
    "financiamiento": 8,
    "id": "QX0AdKYiyXj3MZolcs7X",
    "producto": "cargador tipo c a tipo c",
    "iva": 0,
    "codigo": "--",
    "margen": 100,
    "categoria": "Cargadores",
    "precio": 11880,
    "costo": 4,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439172160?alt=media&token=5202e4ac-de1f-4ad4-97dc-817361ae8626"
    ]
  },
  {
    "categoria": "Cargadores",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "iva": 0,
    "marca": "samsung",
    "cantidad": 1,
    "id": "DQOScBIq50jcZC2aBCAH",
    "margen": 100,
    "precio": 9414.33962264151,
    "codigo": "--",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719077871688?alt=media&token=e1f08d06-521d-43c7-9b20-7b580e1aeb13"
    ],
    "producto": "cargador tipo c c9",
    "imgUrlsRef": [
      "productos/1719077871688"
    ],
    "costo": 3.169811320754717
  },
  {
    "precio": 8966.037735849059,
    "financiamiento": 8,
    "cantidad": 1,
    "iva": 0,
    "costo": 3.018867924528302,
    "imgUrlsRef": [
      "productos/1719078370913"
    ],
    "producto": "cargador tipo c s21+",
    "margen": 100,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "marca": "samsung",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078370913?alt=media&token=38c08d1b-23cd-4ea8-a1b6-861ccf24c1ef"
    ],
    "codigo": "6984521230686",
    "id": "LRKuxv0zYk6mQtei7CsV",
    "categoria": "Cargadores"
  },
  {
    "id": "jIZukRiFf3uRRLIczorP",
    "marca": "suono",
    "codigo": "0701575363636",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439186345?alt=media&token=dda27b98-1d48-48f8-bd40-37f32edf75fb"
    ],
    "costo": 1.8181818181818181,
    "cantidad": 1,
    "producto": "cargador transformador 12v 2a",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "precio": 5400,
    "iva": 0,
    "margen": 100,
    "categoria": "Cargadores",
    "imgUrlsRef": [
      "productos/1719439186345"
    ]
  },
  {
    "categoria": "Cargadores",
    "codigo": "--",
    "iva": 0,
    "costo": 1.8867924528301887,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078406012?alt=media&token=e067fd39-104c-47f3-9a6c-1f85ced9df01"
    ],
    "margen": 100,
    "precio": 5603.773584905661,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "id": "HrtnbVhf91QxTRVfr0ST",
    "producto": "cargador universal celular",
    "imgUrlsRef": [
      "productos/1719078406012"
    ],
    "financiamiento": 8,
    "marca": "digicell"
  },
  {
    "codigo": "0414795120889",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 4,
        "color": "#000000"
      }
    ],
    "imgUrlsRef": [
      "productos/1719076929819"
    ],
    "producto": "cargador universal tw-003",
    "iva": 0,
    "financiamiento": 8,
    "marca": "universal",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076929819?alt=media&token=eaa00e50-afae-4a6b-b224-dbddb83675f1"
    ],
    "id": "QOp3MlLrQjnybvLXxYx0",
    "cantidad": 4,
    "margen": 80,
    "categoria": "Cargadores",
    "precio": 12608.490566037737,
    "costo": 4.716981132075472
  },
  {
    "producto": "cargador v8",
    "costo": 2.8679245283018866,
    "imgUrlsRef": [
      "productos/1717163872926"
    ],
    "iva": 0,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "margen": 80,
    "categoria": "Cargadores",
    "cantidad": 1,
    "codigo": "s/c",
    "precio": 7665.962264150943,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717163872926?alt=media&token=dfaac846-a37a-425a-a81e-f00133626bbb"
    ],
    "marca": "iglufive",
    "financiamiento": 8,
    "id": "hz69eGG8mriX9CG9c86d"
  },
  {
    "categoria": "Cargadores",
    "marca": "inova",
    "producto": "cargador v8 3.1",
    "id": "RWRsecB2HQbIuzlEwNDW",
    "precio": 5245.132075471698,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "cantidad": 1,
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717097652544?alt=media&token=5290e748-00f2-457a-b8ac-51251db0d59b"
    ],
    "imgUrlsRef": [
      "productos/1717097652544"
    ],
    "iva": 0,
    "codigo": "7798378350010",
    "margen": 80,
    "costo": 1.9622641509433962
  },
  {
    "precio": 6371.26641509434,
    "margen": 90,
    "marca": "inova",
    "producto": "cargador v8 5.1",
    "codigo": "7799061004395",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "iva": 0,
    "id": "XN0W8A2qIc8UEeWtHEQl",
    "categoria": "Cargadores",
    "cantidad": 1,
    "financiamiento": 8,
    "costo": 2.25811320754717,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717097927409?alt=media&token=4756ac8d-a4d5-4887-b378-ce9eb0496d47"
    ],
    "imgUrlsRef": [
      "productos/1717097927409"
    ]
  },
  {
    "categoria": "hogar",
    "id": "VOayVNPuyuINWMg6ckjY",
    "margen": 100,
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1719440957693"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "cantidad": 1,
    "precio": 11199.600000000002,
    "marca": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440957693?alt=media&token=c14dccf1-e84d-405e-b278-fd90d7be80ca"
    ],
    "iva": 0,
    "costo": 3.770909090909091,
    "producto": "cazador de mosca y mosquitos"
  },
  {
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "categoria": "consolas",
    "imgUrlsRef": [
      "productos/1719440921970"
    ],
    "margen": 80,
    "precio": 20719.152000000002,
    "marca": "sup",
    "producto": "consola de video juegos con joystick",
    "iva": 0,
    "costo": 7.7512727272727275,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440921970?alt=media&token=a6c6938d-0d21-4e6c-80c9-de8e247d68ba"
    ],
    "codigo": "--",
    "cantidad": 1,
    "financiamiento": 8,
    "id": "UCADAavHlEY0hT5zQo0Z"
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440909423?alt=media&token=071174ee-bbcf-4380-9da4-ac0c215d5738"
    ],
    "codigo": "699252923184",
    "marca": "sup",
    "id": "B5342FhOVx5HO5lRpY5p",
    "precio": 16200,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719440909423"
    ],
    "producto": "consola de video juegos individual",
    "categoria": "consolas",
    "margen": 100,
    "cantidad": 1,
    "costo": 5.454545454545454,
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ]
  },
  {
    "producto": "consola de video juegos sy-890a",
    "iva": 0,
    "precio": 16200,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440895228?alt=media&token=6ae8695f-8951-4c33-ba97-21e6b0bee29f"
    ],
    "id": "URHskZmdEJyFge3Skb5P",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "costo": 5.454545454545454,
    "marca": "game start",
    "categoria": "consolas",
    "imgUrlsRef": [
      "productos/1719440895228"
    ],
    "cantidad": 1,
    "codigo": "6922629500829",
    "financiamiento": 8,
    "margen": 100
  },
  {
    "id": "FsHC8QH4hny8Be6fB5GY",
    "iva": 0,
    "producto": "consola de video juegos tv",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "costo": 16,
    "financiamiento": 8,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440846673?alt=media&token=7b990ed6-c5e1-42af-b232-4d77a3e74c46"
    ],
    "imgUrlsRef": [
      "productos/1719440846673"
    ],
    "categoria": "consolas",
    "margen": 100,
    "marca": "game dongle",
    "codigo": "6972325580236",
    "precio": 47520
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439896093?alt=media&token=aa0d1aca-eb50-4a3d-a82c-89c4b9abda80"
    ],
    "margen": 100,
    "precio": 15120,
    "codigo": "--",
    "financiamiento": 8,
    "marca": "--",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "iva": 0,
    "cantidad": 1,
    "costo": 5.090909090909091,
    "producto": "consola pop it inalambrica",
    "id": "Z0K2qiL31pqBCkBCsnHZ",
    "imgUrlsRef": [
      "productos/1719439896093"
    ],
    "categoria": "consolas"
  },
  {
    "producto": "convertidor bluetooth",
    "codigo": "6900750000432",
    "marca": "music receiver",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440786613?alt=media&token=fd4d7105-f5b8-4f5b-96bd-4fccaf01ed99"
    ],
    "costo": 1.298909090909091,
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "cantidad": 1,
    "precio": 3857.7600000000007,
    "id": "7LMeJVAQgxfOG903H6jc",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719440786613"
    ],
    "categoria": "auto",
    "financiamiento": 8
  },
  {
    "costo": 23.272727272727273,
    "imgUrlsRef": [
      "productos/1719693446735"
    ],
    "margen": 80,
    "categoria": "hogar",
    "iva": 0,
    "marca": "mx q pro 5g",
    "producto": "convertidor tv box ",
    "precio": 62208,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 2
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719693446735?alt=media&token=e67ee3b4-29e8-42aa-a8b8-4b1c50273bb0"
    ],
    "cantidad": 2,
    "codigo": "--",
    "id": "tbj7GLaL4JwqvVAK9XSt",
    "financiamiento": 8
  },
  {
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "codigo": "--",
    "producto": "correa corta",
    "marca": "--",
    "id": "BU3m6nqMoPocHf3Wgrb4",
    "imgUrlsRef": [
      "productos/1719441448582"
    ],
    "costo": 1.4545454545454546,
    "financiamiento": 8,
    "categoria": "soportes",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441448582?alt=media&token=6b8a3d84-9144-49d4-bf42-119e57ad4ecb"
    ],
    "iva": 0,
    "margen": 100,
    "cantidad": 1,
    "precio": 4320
  },
  {
    "codigo": "--",
    "producto": "correa larga",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441438662?alt=media&token=7faf8677-80a0-445f-b802-2fa51b8670a2"
    ],
    "costo": 1.4545454545454546,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "cantidad": 1,
    "margen": 100,
    "id": "BpvkrL2DZ4SgZWrZ0P9w",
    "marca": "--",
    "precio": 4320,
    "imgUrlsRef": [
      "productos/1719441438662"
    ],
    "iva": 0,
    "categoria": "soportes"
  },
  {
    "costo": 8.206037735849057,
    "margen": 80,
    "codigo": "6931846846610",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076175806?alt=media&token=5112bb2c-be76-41e5-af60-c74d7ca254bf"
    ],
    "producto": "cortadora de pelo",
    "marca": "jinghao",
    "cantidad": 4,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 4,
        "denominacionColor": "Negro"
      }
    ],
    "id": "E6d7I2aA9qAY0ZePjVYc",
    "precio": 21934.73886792453,
    "categoria": "hogar",
    "imgUrlsRef": [
      "productos/1719076175806"
    ],
    "iva": 0
  },
  {
    "margen": 80,
    "iva": 0,
    "producto": "cortadora de pelo",
    "marca": "grooming hair clipper",
    "imgUrlsRef": [
      "productos/1719076191816"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 2,
        "denominacionColor": "Negro"
      }
    ],
    "id": "aFUbeozmWqae31DFk2Hq",
    "financiamiento": 8,
    "costo": 8.679245283018869,
    "codigo": "1820618154532",
    "cantidad": 2,
    "precio": 23199.622641509435,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076191816?alt=media&token=31db27c9-fabb-470b-b7f7-e16b3f9f5518"
    ],
    "categoria": "hogar"
  },
  {
    "id": "iIt8kqwdqFeNhPruEvAU",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "categoria": "hogar",
    "precio": 12744,
    "iva": 0,
    "financiamiento": 8,
    "marca": "suono",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440989847?alt=media&token=bbd319e7-616d-42bf-98aa-c7d6e2996101"
    ],
    "imgUrlsRef": [
      "productos/1719440989847"
    ],
    "cantidad": 1,
    "costo": 4.290909090909091,
    "codigo": "0729208240772",
    "producto": "cortadora de pelo",
    "margen": 100
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440976053?alt=media&token=b74cbe24-2d4c-4d34-ba7f-046f94a14bb0"
    ],
    "costo": 3.4909090909090907,
    "financiamiento": 8,
    "cantidad": 1,
    "categoria": "hogar",
    "margen": 100,
    "precio": 10368,
    "id": "qYZTvmvApEQ2klGs4gud",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "codigo": "--",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719440976053"
    ],
    "marca": "campeones",
    "producto": "cortadora de pelo wl-10001"
  },
  {
    "costo": 3.6363636363636362,
    "producto": "cortadora patillera de pelo",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "marca": "kisskouchi",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441018611?alt=media&token=9d056c7a-be5b-4712-b87d-26d8ecc02d84"
    ],
    "imgUrlsRef": [
      "productos/1719441018611"
    ],
    "categoria": "hogar",
    "precio": 10800,
    "codigo": "--",
    "financiamiento": 8,
    "margen": 100,
    "iva": 0,
    "cantidad": 1,
    "id": "eA4LUIxiGnfBsMTDtjDf"
  },
  {
    "marca": "vintage t9",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "imgUrlsRef": [
      "productos/1719441011009"
    ],
    "financiamiento": 8,
    "codigo": "--",
    "costo": 5.864727272727273,
    "id": "jMPGR1twlhUyJzybgNoe",
    "producto": "cortadora patillera de pelo",
    "categoria": "hogar",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441011009?alt=media&token=943a0a46-b0ca-4690-8fe7-838024d32de7"
    ],
    "cantidad": 1,
    "margen": 100,
    "precio": 17418.24,
    "iva": 0
  },
  {
    "codigo": "--",
    "precio": 3888,
    "categoria": "herramientas",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500292524?alt=media&token=1028d19e-df3d-42f0-9aa0-639372e231b7"
    ],
    "financiamiento": 8,
    "cantidad": 1,
    "marca": "jin hong yue",
    "iva": 0,
    "margen": 100,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "costo": 1.309090909090909,
    "imgUrlsRef": [
      "productos/1719500292524"
    ],
    "producto": "destornillador acrilico",
    "id": "SRwRN9eU07QngRiNbd87"
  },
  {
    "imgUrlsRef": [
      "productos/1719500306606"
    ],
    "marca": "suono",
    "costo": 4.378181818181818,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "precio": 13003.2,
    "iva": 0,
    "producto": "espejo con led y zoom",
    "categoria": "hogar",
    "margen": 100,
    "codigo": "0736372874245",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500306606?alt=media&token=af9bde52-2e69-4763-801b-44b813fef168"
    ],
    "cantidad": 1,
    "id": "IBSQBwD3mn8V3LyOzns9"
  },
  {
    "marca": "xbtqd",
    "margen": 100,
    "categoria": "auto",
    "precio": 38880.00000000001,
    "financiamiento": 8,
    "id": "OdGRvq9snEr2OoM5fLFu",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354597591?alt=media&token=1639214b-e9bd-4fb8-8e39-914cb9e7d842"
    ],
    "imgUrlsRef": [
      "productos/1719354597591"
    ],
    "cantidad": 1,
    "producto": "estereo desmontable",
    "costo": 13.090909090909092,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "iva": 0,
    "codigo": "6974407807453"
  },
  {
    "cantidad": 1,
    "codigo": "0701575361199",
    "iva": 0,
    "categoria": "auto",
    "costo": 12,
    "marca": "suono",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "financiamiento": 8,
    "producto": "estereo desmontable",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354618965?alt=media&token=e7d8a23b-894c-48ac-a813-96cf6d790e5d"
    ],
    "imgUrlsRef": [
      "productos/1719354618965"
    ],
    "precio": 35640,
    "id": "ySpxuwiPr02AnJEeu8t9",
    "margen": 100
  },
  {
    "codigo": "--",
    "financiamiento": 8,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719500332674"
    ],
    "iva": 0,
    "costo": 1.309090909090909,
    "precio": 3888,
    "id": "q40N9KU8RW4QllqmdzQv",
    "categoria": "herramientas",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500332674?alt=media&token=2b013b9b-41ee-4787-9d9c-a3166882dae0"
    ],
    "marca": "chemitec",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "producto": "flux de soldar",
    "margen": 100
  },
  {
    "codigo": "6900750018161",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500346753?alt=media&token=3ff3bc17-0e4e-42ef-80dc-66ddf2165b11"
    ],
    "costo": 0.509090909090909,
    "categoria": "joystick",
    "financiamiento": 8,
    "iva": 0,
    "id": "9mYFylim36uza2S4yDaQ",
    "producto": "funda para analogico",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "marca": "thumb grips",
    "margen": 100,
    "cantidad": 1,
    "precio": 1511.9999999999998,
    "imgUrlsRef": [
      "productos/1719500346753"
    ]
  },
  {
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "codigo": "0700306604246",
    "id": "iQxyMFBr45yRiYulVoPL",
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719500503130"
    ],
    "margen": 100,
    "precio": 14275.440000000002,
    "categoria": "computacion",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500503130?alt=media&token=91f52c28-c809-4132-927d-07936991b9bc"
    ],
    "iva": 0,
    "costo": 4.8065454545454545,
    "marca": "netmak",
    "cantidad": 1,
    "producto": "hub tipo c 4 puerto"
  },
  {
    "financiamiento": 8,
    "costo": 6.167272727272727,
    "imgUrlsRef": [
      "productos/1719500420864"
    ],
    "margen": 80,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "id": "UqOG6ZlvPQSWaoe3av6h",
    "iva": 0,
    "marca": "suono",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500420864?alt=media&token=fa088316-66eb-48a4-ac04-3f1d2c6e5112"
    ],
    "categoria": "joystick",
    "codigo": "7292082400868",
    "producto": "joystick gamepad con cooler",
    "precio": 16485.120000000003,
    "cantidad": 1
  },
  {
    "precio": 10052.640000000001,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500406315?alt=media&token=5466da9f-488e-438a-bac9-cdc250d73498"
    ],
    "cantidad": 1,
    "categoria": "joystick",
    "id": "csaNR1VdCEInpp5UjtgK",
    "margen": 100,
    "financiamiento": 8,
    "marca": "usb game pad",
    "producto": "joystick pc",
    "costo": 3.3847272727272726,
    "codigo": "6937867731218",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "imgUrlsRef": [
      "productos/1719500406315"
    ]
  },
  {
    "producto": "joystick play 3",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500444599?alt=media&token=21f09125-10cb-4ce8-b0a6-6d4cc6059831"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "iva": 0,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719500444599"
    ],
    "costo": 6.167272727272727,
    "margen": 100,
    "cantidad": 1,
    "categoria": "joystick",
    "marca": "doubleshock",
    "precio": 18316.8,
    "codigo": "6900750002795",
    "id": "2UWY6rIT25UYwHfz3q3m"
  },
  {
    "cantidad": 1,
    "marca": "sony",
    "producto": "joystick play 4",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "categoria": "joystick",
    "precio": 48209.256000000016,
    "costo": 18.035636363636364,
    "margen": 80,
    "id": "8Mm9m3hPQR3XtfYZLXYF",
    "financiamiento": 8,
    "codigo": "--",
    "iva": 0
  },
  {
    "categoria": "joystick",
    "producto": "joystick play 4",
    "marca": "doubleshock",
    "id": "kDcO7hjjEPEujgSP9Evu",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "imgUrlsRef": [
      "productos/1719500468601"
    ],
    "costo": 16.581818181818182,
    "cantidad": 1,
    "precio": 44323.2,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500468601?alt=media&token=acf67343-6922-409c-b13f-267dc3660ad3"
    ],
    "iva": 0,
    "financiamiento": 8,
    "codigo": "69265565542310",
    "margen": 80
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500156881?alt=media&token=c4da274b-7dcc-4669-a65f-6fa55a8d0490"
    ],
    "imgUrlsRef": [
      "productos/1719500156881"
    ],
    "costo": 19.22472727272727,
    "codigo": "711719870258",
    "margen": 80,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "iva": 0,
    "id": "WkS3vx7yi8aadgMW4D4V",
    "cantidad": 1,
    "categoria": "joystick",
    "producto": "Joystick play 4 messi",
    "marca": "sony",
    "precio": 51387.696
  },
  {
    "marca": "wireless controller",
    "id": "oFOHWhr5s473UuOrZ41N",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719500481273"
    ],
    "codigo": "6900750011636",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500481273?alt=media&token=20960c31-3bbb-4193-b3cd-f90766de380e"
    ],
    "precio": 38880,
    "producto": "joystick x3",
    "financiamiento": 8,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "categoria": "joystick",
    "costo": 14.545454545454545,
    "margen": 80
  },
  {
    "producto": "kit de destornillador",
    "margen": 100,
    "marca": "versatile screwdrivers set",
    "id": "O5WaDucd61V7jvUnOU7K",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502315934?alt=media&token=484d3eb5-1a9c-4aef-9f2e-e9e19d8473c1"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "iva": 0,
    "cantidad": 1,
    "codigo": "6900750000494",
    "precio": 12960,
    "imgUrlsRef": [
      "productos/1719502315934"
    ],
    "costo": 4.363636363636363,
    "categoria": "herramientas"
  },
  {
    "cantidad": 1,
    "categoria": "soportes",
    "imgUrlsRef": [
      "productos/1719502299671"
    ],
    "precio": 19509.984,
    "margen": 80,
    "iva": 0,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "id": "gTfJFn5v0beh5rOniLBt",
    "marca": "video-making kit",
    "costo": 7.298909090909091,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502299671?alt=media&token=fe1ba178-0478-4344-809b-277a401fec3a"
    ],
    "producto": "kit de grabacion kd-49/20",
    "codigo": "--"
  },
  {
    "precio": 3888,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "iva": 0,
    "margen": 100,
    "categoria": "luces",
    "imgUrlsRef": [
      "productos/1719502368955"
    ],
    "financiamiento": 8,
    "id": "GfNlBHtQazdpkPpzKPRu",
    "costo": 1.309090909090909,
    "cantidad": 1,
    "marca": "ditron",
    "codigo": "7790420026324",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502368955?alt=media&token=b44c4486-0b64-4100-870e-feb95dfec9cb"
    ],
    "producto": "lampara multicolor"
  },
  {
    "id": "gwpeGmrKzZg8fTmgierZ",
    "iva": 0,
    "marca": "green laser pointer",
    "financiamiento": 8,
    "precio": 18817.920000000002,
    "margen": 100,
    "categoria": "luces",
    "codigo": "6920221003038",
    "imgUrlsRef": [
      "productos/1719502444886"
    ],
    "producto": "laser pointer",
    "costo": 6.336,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502444886?alt=media&token=1952f2f5-8409-4670-9397-4acf4f6d3f78"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ]
  },
  {
    "codigo": "6972910210111",
    "financiamiento": 8,
    "costo": 5.090909090909091,
    "precio": 15120,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719502461702"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "producto": "licuadora portatil hm-03",
    "marca": "--",
    "margen": 100,
    "id": "lYvLwj1SXdVXxaJNGLhq",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502461702?alt=media&token=25a92854-f43a-47ac-ac22-4b20a9375378"
    ],
    "categoria": "hogar",
    "cantidad": 1
  },
  {
    "producto": "luz bicicleta usb nm-ld4",
    "marca": "netmak",
    "cantidad": 1,
    "codigo": "0700306602938",
    "costo": 4.691636363636364,
    "iva": 0,
    "categoria": "luces",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502348713?alt=media&token=90d6c338-effc-42fe-9a91-5e481f80e728"
    ],
    "imgUrlsRef": [
      "productos/1719502348713"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "precio": 13934.16,
    "margen": 100,
    "id": "4aBXiIdhlcfUEb4A5CEy",
    "financiamiento": 8
  },
  {
    "marca": "netmak",
    "producto": "luz de bicicleta nm-ld5",
    "iva": 0,
    "categoria": "luces",
    "margen": 100,
    "id": "LDpisQfXJ7xDu7D8l17v",
    "codigo": "0700306602921",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "imgUrlsRef": [
      "productos/1719502333718"
    ],
    "cantidad": 1,
    "financiamiento": 8,
    "costo": 4.273454545454546,
    "precio": 12692.160000000002,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502333718?alt=media&token=c74af98f-576f-4599-8a41-83c24a91a78e"
    ]
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500106972?alt=media&token=9a815166-01cd-4409-bf56-febb2be150f2"
    ],
    "producto": "luz de neon 5mts",
    "precio": 14580.000000000002,
    "iva": 0,
    "cantidad": 1,
    "marca": "neon led",
    "margen": 80,
    "id": "oBoyKIghMU0TssMaipdX",
    "imgUrlsRef": [
      "productos/1719500106972"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "codigo": "--",
    "financiamiento": 8,
    "categoria": "luces",
    "costo": 5.454545454545454
  },
  {
    "cantidad": 1,
    "categoria": "smartwatch",
    "iva": 0,
    "id": "spHEHwnNOAzBdjOMzMxL",
    "producto": "malla de reloj m5/m6/m7",
    "costo": 0.7272727272727273,
    "codigo": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582241359?alt=media&token=a3264b78-c79f-4291-8577-5c3484379b28"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "marca": "--",
    "margen": 100,
    "financiamiento": 8,
    "precio": 2160,
    "imgUrlsRef": [
      "productos/1719582241359"
    ]
  },
  {
    "cantidad": 6,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582326014?alt=media&token=a0a50192-4a7e-4fab-8902-51384e74d09f"
    ],
    "marca": "watch",
    "imgUrlsRef": [
      "productos/1719582326014"
    ],
    "id": "TRWzeU9vbJuUj8s9p4yb",
    "margen": 100,
    "iva": 0,
    "precio": 8640,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 6,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "producto": "malla de reloj metalica t800/t900/t10 ultra",
    "costo": 2.909090909090909,
    "categoria": "smartwatch",
    "codigo": "--"
  },
  {
    "marca": "watch",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719582289660"
    ],
    "precio": 6480,
    "codigo": "--",
    "id": "JOwY7KPg6Ya2O6gX1scV",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582289660?alt=media&token=a0442e2b-af9f-465a-b2a5-06711da1899d"
    ],
    "producto": "malla de reloj silicona t800/t900/t10 ultra",
    "financiamiento": 8,
    "costo": 2.1818181818181817,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 5
      }
    ],
    "iva": 0,
    "categoria": "smartwatch",
    "cantidad": 5
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522662439?alt=media&token=cadf7626-b417-4eb0-891e-c88d06fbb203"
    ],
    "precio": 13191.984,
    "cantidad": 2,
    "iva": 0,
    "categoria": "hogar",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 2,
        "color": "#000000"
      }
    ],
    "codigo": "--",
    "financiamiento": 8,
    "producto": "mate acero inoxidable",
    "marca": "the stay chill",
    "costo": 4.935272727272728,
    "margen": 80,
    "imgUrlsRef": [
      "productos/1719522662439"
    ],
    "id": "CTYTbxHfohNVAoPOzQ5g"
  },
  {
    "margen": 100,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719522621956"
    ],
    "precio": 11769.84,
    "id": "QDkHRcPg20nzbVsSiRsV",
    "codigo": "740617298680",
    "financiamiento": 8,
    "cantidad": 1,
    "costo": 3.9629090909090907,
    "categoria": "memorias y pendrives",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522621956?alt=media&token=ac28afb4-4993-4f97-9c37-febb9230c338"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "producto": "memoria 32gb",
    "marca": "kingston"
  },
  {
    "precio": 15057.36,
    "margen": 100,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719522632214"
    ],
    "id": "81CAD0jJgIQBwDbIfYDx",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "producto": "memoria 64gb",
    "codigo": "740617298697",
    "financiamiento": 8,
    "categoria": "memorias y pendrives",
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522632214?alt=media&token=dde55d7e-0d17-461e-8ca3-13b42ffabe4f"
    ],
    "costo": 5.069818181818182,
    "marca": "kingston"
  },
  {
    "imgUrlsRef": [
      "productos/1719522606263"
    ],
    "codigo": "6900750011681",
    "producto": "microfono aux",
    "cantidad": 1,
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "precio": 4320,
    "margen": 100,
    "categoria": "computacion",
    "costo": 1.4545454545454546,
    "marca": "usb desktop microphone",
    "id": "mK34Q4aFR8izggmNizEu",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522606263?alt=media&token=08c264a0-6abe-46fe-b553-97460ca051a8"
    ],
    "financiamiento": 8
  },
  {
    "imgUrlsRef": [
      "productos/1719522596166"
    ],
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522596166?alt=media&token=98d6b265-38fb-4791-978f-2e8b16ce25b8"
    ],
    "iva": 0,
    "id": "KpAbFjDnZ52j9VOZIo3j",
    "producto": "microfono corbatero aux",
    "precio": 4104.000000000001,
    "cantidad": 1,
    "marca": "lavalier micro phone",
    "categoria": "computacion",
    "codigo": "--",
    "costo": 1.3818181818181818,
    "margen": 100,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ]
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719520430569?alt=media&token=374a92d8-fcde-430c-a85d-6ce8242fd43d"
    ],
    "precio": 10157.4,
    "producto": "Mouse inalambrico pila m680",
    "categoria": "computacion",
    "margen": 80,
    "id": "zBO9mdhg1cTnTGM1vmkO",
    "financiamiento": 8,
    "marca": "netmak",
    "cantidad": 2,
    "iva": 0,
    "costo": 3.8,
    "codigo": "0700306604611",
    "imgUrlsRef": [
      "productos/1719520430569"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 2
      }
    ]
  },
  {
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719520454527"
    ],
    "id": "DqE5sPDvVWIfoOdwZFzn",
    "producto": "mouse inalambrico recargable",
    "costo": 4.608,
    "categoria": "computacion",
    "cantidad": 2,
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719520454527?alt=media&token=f9a69098-d453-4129-b2af-f2261e726bc5"
    ],
    "codigo": "6912352301152",
    "marca": "LTY",
    "margen": 80,
    "precio": 12317.184000000001,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 2
      }
    ]
  },
  {
    "costo": 6.702545454545454,
    "categoria": "computacion",
    "imgUrlsRef": [
      "productos/1719520467890"
    ],
    "id": "7QiwKjBJDkoa7865mx8G",
    "marca": "netmak",
    "cantidad": 2,
    "codigo": "0700306602082",
    "iva": 0,
    "financiamiento": 8,
    "producto": "mouse inalambrico recargable w90",
    "precio": 17915.904,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 2,
        "color": "#000000"
      }
    ],
    "margen": 80,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719520467890?alt=media&token=baea9b5b-de98-495d-8dc4-ea01a028ce41"
    ]
  },
  {
    "imgUrlsRef": [
      "productos/1719522414031"
    ],
    "id": "8UIozsIGWE8httQXt5Ao",
    "marca": "yelandar",
    "margen": 80,
    "iva": 0,
    "precio": 8400.024000000001,
    "producto": "mouse pad 90x40",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522414031?alt=media&token=1acdc284-d150-4047-9b62-94593a544cb0"
    ],
    "categoria": "computacion",
    "cantidad": 2,
    "costo": 3.1425454545454548,
    "coloresDisponibles": [
      {
        "stock": 2,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "codigo": "6900750018260",
    "financiamiento": 8
  },
  {
    "marca": "comfort pad",
    "imgUrlsRef": [
      "productos/1719522398769"
    ],
    "cantidad": 1,
    "codigo": "--",
    "id": "DR5X30RnprBeLrVCVlp4",
    "categoria": "computacion",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522398769?alt=media&token=2c1b5554-7284-4e71-b918-acadedef054b"
    ],
    "margen": 100,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "costo": 1.4712727272727273,
    "iva": 0,
    "producto": "mouse pad comun",
    "precio": 4369.68
  },
  {
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719522530717"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522530717?alt=media&token=99cd6675-d9ce-4876-8d96-8116cc3c60a7"
    ],
    "financiamiento": 8,
    "id": "1lsUJwOcuxJn4El9xkfa",
    "codigo": "6900750000456",
    "costo": 1.4545454545454546,
    "margen": 100,
    "categoria": "computacion",
    "precio": 4320,
    "marca": "jiexin",
    "iva": 0,
    "producto": "mouse usb"
  },
  {
    "costo": 1.4545454545454546,
    "id": "edSkvI478bjRKppHQaFX",
    "margen": 100,
    "categoria": "computacion",
    "financiamiento": 8,
    "codigo": "6290132557754",
    "marca": "seisa",
    "producto": "mouse usb dn-n512",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719522517415"
    ],
    "cantidad": 1,
    "precio": 4320,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522517415?alt=media&token=ed5bc808-d7ce-4447-a40d-d0a016647b01"
    ]
  },
  {
    "imgUrlsRef": [
      "productos/1719522445261"
    ],
    "categoria": "computacion",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522445261?alt=media&token=c71c1e0f-2c25-4052-9be2-f03a3330ddfa"
    ],
    "precio": 7961.76,
    "iva": 0,
    "codigo": "0700306602341",
    "id": "WGusqP51rSz77rovyweo",
    "marca": "legion",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 2,
        "color": "#000000"
      }
    ],
    "producto": "mouse usb gamer",
    "cantidad": 2,
    "costo": 2.680727272727273,
    "financiamiento": 8,
    "margen": 100
  },
  {
    "financiamiento": 8,
    "margen": 100,
    "cantidad": 1,
    "costo": 2.5454545454545454,
    "imgUrlsRef": [
      "productos/1719522472502"
    ],
    "categoria": "computacion",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522472502?alt=media&token=eccf69f1-a9c7-4fcd-9dbd-e1344911a0a9"
    ],
    "marca": "yelandar",
    "codigo": "6900750020102",
    "producto": "mouse usb gamer m20",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "id": "LKxe9ZTWj515FKR3mjuW",
    "precio": 7560,
    "iva": 0
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "financiamiento": 8,
    "costo": 2.9323636363636365,
    "id": "qnKi6mTZbqhmnLqbIACs",
    "categoria": "computacion",
    "cantidad": 1,
    "producto": "mouse usb kos-m0201",
    "codigo": "7792391201014",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719522458041"
    ],
    "marca": "kosmo",
    "precio": 8709.12,
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522458041?alt=media&token=7cfe062a-8d2c-45f7-961e-c583f5a127f1"
    ]
  },
  {
    "margen": 100,
    "codigo": "8071011013411",
    "iva": 0,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "imgUrlsRef": [
      "productos/1719522508970"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522508970?alt=media&token=defb5dc0-3f21-4831-8f60-f55c6576324d"
    ],
    "precio": 4320,
    "costo": 1.4545454545454546,
    "id": "rTb1KXYdghHYhOiE682p",
    "financiamiento": 8,
    "cantidad": 1,
    "categoria": "computacion",
    "producto": "mouse usb mog-107",
    "marca": "gtc"
  },
  {
    "marca": "st somostec",
    "cantidad": 1,
    "id": "1K5KmaBakFrGKOtH2cdf",
    "precio": 4320,
    "costo": 1.4545454545454546,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "producto": "mouse usb st100",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719522500328"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522500328?alt=media&token=8b6544ae-5398-40d5-9fa9-95a29f433863"
    ],
    "codigo": "--",
    "iva": 0,
    "categoria": "computacion",
    "financiamiento": 8
  },
  {
    "margen": 100,
    "precio": 1242,
    "imgUrlsRef": [
      "productos/1719522779676"
    ],
    "codigo": "--",
    "iva": 0,
    "producto": "muerde cable",
    "cantidad": 1,
    "marca": "note",
    "id": "TMeMu42K3RN2QjzYes1o",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522779676?alt=media&token=aa39b8ee-9929-4a48-9528-88fc7e7130bd"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "categoria": "Cables",
    "costo": 0.41818181818181815
  },
  {
    "iva": 0,
    "costo": 4.069090909090909,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719525470590"
    ],
    "margen": 100,
    "id": "QjeQpeG6KK3hdSOJ1Xwo",
    "codigo": "7895582155636",
    "marca": "bt speaker",
    "categoria": "parlantes",
    "precio": 12085.2,
    "producto": "parlante 3\" bt-1302",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525470590?alt=media&token=0eaef078-b6e1-418f-bcfc-14f33daa01f4"
    ]
  },
  {
    "categoria": "parlantes",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719525480088"
    ],
    "precio": 15055.2,
    "margen": 100,
    "costo": 5.069090909090909,
    "codigo": "--",
    "marca": "fantastic quality",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525480088?alt=media&token=13316b4e-c5f1-4e3d-9266-19456fe07071"
    ],
    "id": "YoEgM2Zw6oDvQ2t0ErNL",
    "producto": "parlante 3\" gts-1360",
    "iva": 0
  },
  {
    "margen": 100,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525494767?alt=media&token=95dbb6f2-5f06-4f1d-9d87-d5346be4def1"
    ],
    "producto": "parlante 3\" gts-1373 led",
    "categoria": "parlantes",
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719525494767"
    ],
    "codigo": "--",
    "id": "1NgjhFP4vJ6zqnXnJ6TT",
    "iva": 0,
    "costo": 5.069090909090909,
    "marca": "fantastic quality",
    "precio": 15055.2
  },
  {
    "iva": 0,
    "financiamiento": 8,
    "margen": 100,
    "costo": 5.069090909090909,
    "categoria": "parlantes",
    "cantidad": 1,
    "marca": "portable speaker",
    "codigo": "6970017856331",
    "id": "WlOr0ljl12bxCYpq9CNd",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "precio": 15055.2,
    "imgUrlsRef": [
      "productos/1719525504770"
    ],
    "producto": "parlante 3\" lm-s330",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525504770?alt=media&token=7ff95d98-55ad-4edb-aa9d-41f72c9cf3f9"
    ]
  },
  {
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719525554874"
    ],
    "margen": 100,
    "categoria": "parlantes",
    "financiamiento": 8,
    "iva": 0,
    "precio": 19872,
    "id": "wxmANfbHAqMDm52qdT8W",
    "codigo": "--",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "marca": "phantom",
    "producto": "parlante 3\" spiderman",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525554874?alt=media&token=66a3d55e-34a8-44f2-9e58-2644098fa4d7"
    ],
    "costo": 6.6909090909090905
  },
  {
    "codigo": "--",
    "costo": 14.545454545454545,
    "margen": 100,
    "precio": 43200,
    "producto": "parlante 6,5\"",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525798595?alt=media&token=6aa9a0bd-cbb3-4583-b4d3-2fc697ccf23f"
    ],
    "marca": "okfly/fantastic quality",
    "imgUrlsRef": [
      "productos/1719525798595"
    ],
    "financiamiento": 8,
    "cantidad": 2,
    "id": "0VWjjmRQrsgWQi51VYC0",
    "categoria": "parlantes",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 2,
        "denominacionColor": "negro"
      }
    ],
    "iva": 0
  },
  {
    "producto": "parlante 8\" con mic",
    "marca": "fantastic quality",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "iva": 0,
    "categoria": "parlantes",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719525833136"
    ],
    "id": "sAia9AyCf686wvx8LPei",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525833136?alt=media&token=447ca76e-16d3-4496-8012-a8c2ed3fff66"
    ],
    "codigo": "--",
    "precio": 68433.12000000001,
    "costo": 23.041454545454545,
    "financiamiento": 8,
    "margen": 100
  },
  {
    "costo": 48.966545454545454,
    "iva": 0,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "producto": "parlante 8\" x 2",
    "categoria": "parlantes",
    "id": "kDZN2PwxF4V8yvMdQD0F",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525841273?alt=media&token=78b3ca4e-a610-4990-aed3-2c252666fd8e"
    ],
    "imgUrlsRef": [
      "productos/1719525841273"
    ],
    "codigo": "--",
    "precio": 145430.64,
    "marca": "fantastic quality",
    "margen": 100
  },
  {
    "cantidad": 1,
    "id": "2Yn1kG1mq5wtdYIvL10R",
    "precio": 34560,
    "producto": "parlante lampara cargador inalambrico",
    "marca": "led wireless charging speaker",
    "imgUrlsRef": [
      "productos/1719439329629"
    ],
    "iva": 0,
    "categoria": "parlantes",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439329629?alt=media&token=a64486ef-6b8d-44a0-b541-b9c60279795f"
    ],
    "costo": 11.636363636363637,
    "codigo": "6000051715660",
    "margen": 100,
    "financiamiento": 8
  },
  {
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1719525739678"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525739678?alt=media&token=4bad34ec-31f2-48e8-9ce8-58aa68f3a73b"
    ],
    "id": "12nfr9pxuUXKL4OzRzVQ",
    "marca": "magic ball light",
    "financiamiento": 8,
    "cantidad": 1,
    "producto": "parlante led multicolor",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "precio": 20450.88,
    "margen": 100,
    "costo": 6.885818181818181,
    "iva": 0,
    "categoria": "parlantes"
  },
  {
    "marca": "--",
    "financiamiento": 8,
    "producto": "parlante microfono",
    "iva": 0,
    "precio": 10577.52,
    "imgUrlsRef": [
      "productos/1719525665448"
    ],
    "cantidad": 1,
    "categoria": "parlantes",
    "costo": 3.5614545454545454,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "id": "OwmrZyOY8ZWn6Ecil7Kg",
    "codigo": "6000051715650",
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525665448?alt=media&token=25b6158a-1c6b-4a8b-8e93-72c6f74e158b"
    ]
  },
  {
    "cantidad": 1,
    "producto": "parlante mini l59",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719525644071"
    ],
    "id": "5Kx8iqqcJuPi3HwRaxZA",
    "margen": 100,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "marca": "mini speaker",
    "precio": 9720.000000000002,
    "categoria": "parlantes",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525644071?alt=media&token=96491eee-ef9e-4761-9139-13582d2d2899"
    ],
    "costo": 3.272727272727273,
    "codigo": "--",
    "financiamiento": 8
  },
  {
    "costo": 12.149090909090908,
    "id": "wpZq2YP6iyM2YkDziqhl",
    "financiamiento": 8,
    "codigo": "--",
    "categoria": "parlantes",
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "producto": "parlante par-200",
    "precio": 36082.799999999996,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525851222?alt=media&token=24d3456c-b490-42b3-8742-c3e95f2e58e1",
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525786068?alt=media&token=0510bb3a-c30a-411c-a5e9-e6aea52ea7fe"
    ],
    "marca": "inova",
    "imgUrlsRef": [
      "productos/1719525851222",
      "productos/1719525786068"
    ],
    "iva": 0,
    "margen": 100,
    "cantidad": 1
  },
  {
    "producto": "parlante pc",
    "codigo": "0700306602280",
    "categoria": "parlantes",
    "margen": 100,
    "costo": 4.7272727272727275,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525704853?alt=media&token=ab207659-4c56-44d7-8970-dd6ca9862b95"
    ],
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719525704853"
    ],
    "id": "YaNUva9bP40t31UE5Xup",
    "precio": 14040.000000000002,
    "cantidad": 1,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "marca": "netmak"
  },
  {
    "margen": 100,
    "marca": "--",
    "producto": "parlante tipo airpod",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525722355?alt=media&token=2522edee-a561-4f06-8b83-389c4a79fe8f"
    ],
    "iva": 0,
    "financiamiento": 8,
    "precio": 14040.000000000002,
    "categoria": "parlantes",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "codigo": "--",
    "costo": 4.7272727272727275,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719525722355"
    ],
    "id": "hzVMM4MhMAlaRD8nEhap"
  },
  {
    "codigo": "0700306602563",
    "financiamiento": 8,
    "id": "fTdm9GBlcgIuro3S5BNs",
    "precio": 24589.35849056604,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719238770231?alt=media&token=38f03876-1707-4acf-8583-562041408dc5"
    ],
    "cantidad": 1,
    "costo": 8.279245283018868,
    "categoria": "hogar",
    "imgUrlsRef": [
      "productos/1719238770231"
    ],
    "iva": 0,
    "producto": "Pava electrica 1.8lts",
    "margen": 100,
    "marca": "netmak",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ]
  },
  {
    "categoria": "hogar",
    "precio": 30529.35849056604,
    "codigo": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719238720797?alt=media&token=19f893a3-6e40-44f2-b997-7c4bfd77b04d"
    ],
    "producto": "pava electrica 2lts",
    "cantidad": 2,
    "id": "zvZPQz538h17c7apEVq9",
    "costo": 10.279245283018868,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719238720797"
    ],
    "coloresDisponibles": [
      {
        "stock": 2,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "margen": 100,
    "marca": "ibek",
    "iva": 0
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 2
      }
    ],
    "id": "XttCa2AtsPLWqiYb3VTp",
    "producto": "Pava electrica 2lts",
    "categoria": "hogar",
    "codigo": "4711198456147",
    "cantidad": 2,
    "imgUrlsRef": [
      "productos/1719238751326"
    ],
    "iva": 0,
    "precio": 32770.867924528306,
    "costo": 11.033962264150944,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719238751326?alt=media&token=e515b9fb-5783-4ac0-9d2f-1bcc621e247d"
    ],
    "marca": "starvision",
    "margen": 100,
    "financiamiento": 8
  },
  {
    "cantidad": 1,
    "margen": 100,
    "iva": 0,
    "financiamiento": 8,
    "precio": 25259.040000000005,
    "marca": "sandisk",
    "producto": "pendrive 128gb",
    "costo": 8.504727272727273,
    "id": "VsJd1dDHVJL2bY1E5BA9",
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1719526163186"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526163186?alt=media&token=856c0af6-7713-4cef-9403-a621ce517dc3"
    ],
    "categoria": "memorias y pendrives",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ]
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "codigo": "--",
    "precio": 12960,
    "cantidad": 1,
    "iva": 0,
    "margen": 100,
    "costo": 4.363636363636363,
    "imgUrlsRef": [
      "productos/1719526120845"
    ],
    "producto": "pendrive 16gb",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526120845?alt=media&token=5b009e06-a3fe-4231-95ca-899947d19235"
    ],
    "marca": "sandisk",
    "categoria": "memorias y pendrives",
    "financiamiento": 8,
    "id": "cFaerTTkziNtgrPDbXBu"
  },
  {
    "imgUrlsRef": [
      "productos/1719526142226"
    ],
    "margen": 100,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "categoria": "memorias y pendrives",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526142226?alt=media&token=ad84c2b5-6f37-4df7-ad95-c86d7ef548e6"
    ],
    "id": "SLg6PGVkMUrEV1I9xJhA",
    "financiamiento": 8,
    "precio": 14040.000000000002,
    "costo": 4.7272727272727275,
    "codigo": "--",
    "iva": 0,
    "marca": "sandisk",
    "producto": "pendrive 32gb",
    "cantidad": 1
  },
  {
    "costo": 5.195636363636364,
    "imgUrlsRef": [
      "productos/1719526156362"
    ],
    "categoria": "memorias y pendrives",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526156362?alt=media&token=a5f2688e-d925-4856-851a-fb441d5e584b"
    ],
    "marca": "sandisk",
    "margen": 100,
    "precio": 15431.040000000003,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "producto": "pendrive 64gb",
    "iva": 0,
    "id": "pbG3nJ5tywGR2dF7ZHsp",
    "codigo": "--",
    "cantidad": 1
  },
  {
    "producto": "pila cr2032",
    "id": "ih6Gx1WI3TBIyxGgw0NX",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "iva": 0,
    "costo": 0.3250909090909091,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526261732?alt=media&token=c218fcb1-5da3-4c03-8e18-e8483b69854e"
    ],
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719526261732"
    ],
    "marca": "netmak/lithium",
    "financiamiento": 8,
    "precio": 965.5200000000001,
    "categoria": "pilas",
    "cantidad": 1,
    "codigo": "--"
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "codigo": "--",
    "precio": 678.24,
    "costo": 0.22836363636363635,
    "iva": 0,
    "id": "Zw0LhyFHd79erC47eoEK",
    "cantidad": 1,
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719526237202"
    ],
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526237202?alt=media&token=44256dfd-8fd8-45ec-bc74-28e62f625d0c"
    ],
    "marca": "star vision",
    "producto": "pila economica AA",
    "categoria": "pilas"
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "cantidad": 1,
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1719526206747"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526206747?alt=media&token=8d884a58-4b03-4d3b-b9fe-420f52cd538d"
    ],
    "financiamiento": 8,
    "producto": "pila economica AAA",
    "precio": 462.24,
    "id": "qoOGVGJy2oIGWX9hlK1C",
    "categoria": "pilas",
    "marca": "star vision",
    "margen": 100,
    "costo": 0.15563636363636363,
    "iva": 0
  },
  {
    "imgUrlsRef": [
      "productos/1719526313474"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "precio": 13849.92,
    "margen": 100,
    "costo": 4.6632727272727275,
    "id": "ZW5oGPFDe2RXM4SZObRO",
    "marca": "netmak",
    "categoria": "pilas",
    "producto": "pila recargable AA",
    "cantidad": 1,
    "financiamiento": 8,
    "iva": 0,
    "codigo": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526313474?alt=media&token=8be28a2c-6f66-4c55-a8d4-996865b01736"
    ]
  },
  {
    "iva": 0,
    "categoria": "pilas",
    "marca": "netmak",
    "id": "o6WNIZJRUDkwm3tWGoPI",
    "imgUrlsRef": [
      "productos/1719526292931"
    ],
    "financiamiento": 8,
    "costo": 2.9403636363636365,
    "margen": 100,
    "producto": "pila recargable AAA",
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526292931?alt=media&token=65cbd544-8f5f-4080-add2-d6a260f8d306"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "precio": 8732.880000000001,
    "codigo": "--"
  },
  {
    "costo": 2.7636363636363637,
    "financiamiento": 8,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719582710760"
    ],
    "producto": "pizarra magica 10\"",
    "marca": "LCD writing tablet",
    "id": "tuUUx8PWWSd83rNkxx4Y",
    "codigo": "--",
    "iva": 0,
    "margen": 100,
    "categoria": "hogar",
    "precio": 8208.000000000002,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582710760?alt=media&token=cee28a27-dbd8-4261-b8cb-1be1195f23c5"
    ]
  },
  {
    "producto": "pizarra magica 8,5\"",
    "cantidad": 1,
    "id": "q89BcnentOjdCWjhDYMb",
    "imgUrlsRef": [
      "productos/1719582792375"
    ],
    "precio": 6886.08,
    "costo": 2.3185454545454545,
    "financiamiento": 8,
    "iva": 0,
    "margen": 100,
    "codigo": "--",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "marca": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582792375?alt=media&token=931cdb61-6c31-4f6d-b28b-5ac13dddbf9b"
    ],
    "categoria": "hogar"
  },
  {
    "financiamiento": 8,
    "cantidad": 2,
    "margen": 100,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      },
      {
        "stock": 1,
        "denominacionColor": "lila",
        "color": "#efcaff"
      }
    ],
    "imgUrlsRef": [
      "productos/1719076365038"
    ],
    "producto": "planchita mini",
    "precio": 5603.773584905661,
    "categoria": "hogar",
    "codigo": "7897255820193",
    "iva": 0,
    "costo": 1.8867924528301887,
    "id": "qgBYjQ0PoRh4Nmxt9xPa",
    "marca": "make time",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076365038?alt=media&token=7d8cddb8-ffad-4c9e-9d42-ec508abe82f6"
    ]
  },
  {
    "costo": 6.866909090909091,
    "precio": 20394.72,
    "producto": "planchita nv-868",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582426058?alt=media&token=e4a0f287-ef75-4b35-ac99-f992164ace4c"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719582426058"
    ],
    "marca": "hytoshy",
    "id": "QygXMTKCQTGRm8ylcoL7",
    "financiamiento": 8,
    "margen": 100,
    "iva": 0,
    "codigo": "6910219208682",
    "cantidad": 1,
    "categoria": "hogar"
  },
  {
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582446885?alt=media&token=1587a466-4597-4cd5-9000-d10ddf40e63f"
    ],
    "costo": 3.0545454545454547,
    "id": "QgjjtJw9rJiUijMpsAkn",
    "imgUrlsRef": [
      "productos/1719582446885"
    ],
    "producto": "planchita sx-8006",
    "marca": "new nova",
    "categoria": "hogar",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "negro"
      }
    ],
    "iva": 0,
    "precio": 9072.000000000002,
    "margen": 100,
    "financiamiento": 8,
    "codigo": "6950999800157"
  },
  {
    "margen": 100,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "marca": "watch",
    "iva": 0,
    "id": "MMjB4SyFGcMnrOuGnfdu",
    "financiamiento": 8,
    "categoria": "smartwatch",
    "producto": "reloj 7 t900 pro max",
    "codigo": "695985602308",
    "costo": 8.145454545454545,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719582566803"
    ],
    "precio": 24191.999999999996,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582566803?alt=media&token=6373ecad-afcf-4be4-be7a-926b316d8bfe"
    ]
  },
  {
    "costo": 10.909090909090908,
    "marca": "laxasfit",
    "codigo": "--",
    "margen": 100,
    "producto": "reloj i9 ultra max",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582607888?alt=media&token=5476c290-ddc0-4cb6-9e66-29a8ae81b20f"
    ],
    "id": "Zmd7MjtqLXed9ga9P7Gy",
    "financiamiento": 8,
    "categoria": "smartwatch",
    "precio": 32400,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "imgUrlsRef": [
      "productos/1719582607888"
    ],
    "cantidad": 1,
    "iva": 0
  },
  {
    "costo": 4,
    "marca": "smart band",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719582559270"
    ],
    "codigo": "6959856022001",
    "producto": "reloj m5/m6",
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "margen": 100,
    "id": "W43q11ZweuDDHf8xRPO0",
    "cantidad": 1,
    "precio": 11880,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582559270?alt=media&token=6d3b33bc-6d86-425e-9948-08bc100c1b25"
    ],
    "categoria": "smartwatch"
  },
  {
    "producto": "reloj t800 ultra 49mm",
    "precio": 32726.037735849055,
    "categoria": "smartwatch",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719075454977?alt=media&token=1c934fcf-8b57-492c-9c56-bb0efd2f4d09"
    ],
    "costo": 11.018867924528301,
    "marca": "hiwatch pro",
    "id": "SXvLFUFy7BkNenMjk48v",
    "codigo": "--",
    "financiamiento": 8,
    "margen": 100,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 2,
        "color": "#858585"
      }
    ],
    "imgUrlsRef": [
      "productos/1719075454977"
    ],
    "cantidad": 2
  },
  {
    "costo": 11.018867924528301,
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719075527374?alt=media&token=5f9b61d8-04ae-496b-b021-262c501a522c"
    ],
    "categoria": "smartwatch",
    "precio": 32726.037735849055,
    "marca": "hiwatch pro",
    "margen": 100,
    "cantidad": 2,
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 2,
        "color": "#ff6a00"
      }
    ],
    "id": "5dXh7i1LItCoJzBw0cmE",
    "producto": "reloj t900 ultra 49mm",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719075527374"
    ],
    "codigo": "--"
  },
  {
    "codigo": "--",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719582593506"
    ],
    "financiamiento": 8,
    "producto": "reloj w26+",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582593506?alt=media&token=0ac5ba9a-b475-4f18-8a40-ebcd96b10df9"
    ],
    "iva": 0,
    "costo": 8.145454545454545,
    "precio": 24191.999999999996,
    "id": "QoNynEZQHApBRQjkobab",
    "marca": "leading a healthy lifestyle",
    "margen": 100,
    "categoria": "smartwatch",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ]
  },
  {
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719267741426"
    ],
    "precio": 7576.301886792453,
    "cantidad": 5,
    "producto": "retro games tetris",
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719267741426?alt=media&token=38ad4cb6-3dfa-4f7d-8cab-9f2e68178870"
    ],
    "iva": 0,
    "id": "uZiCBNPWTRRh4E7aOme6",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 5
      }
    ],
    "marca": "netmak",
    "costo": 2.550943396226415,
    "codigo": "0700306603317",
    "categoria": "consolas"
  },
  {
    "financiamiento": 8,
    "producto": "ringo",
    "iva": 0,
    "id": "N0hBquPbZMvTJWHhQRhN",
    "imgUrlsRef": [
      "productos/1719582531482"
    ],
    "categoria": "smartwatch",
    "precio": 2376.0000000000005,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582531482?alt=media&token=da304d03-874a-4e4c-ab27-21b5622b0697"
    ],
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "costo": 0.8,
    "cantidad": 1,
    "codigo": "7798346720012",
    "margen": 100,
    "marca": "ringo"
  },
  {
    "id": "TJSVcr16b1k5L0pp0JiP",
    "imgUrlsRef": [
      "productos/1719582352386"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582352386?alt=media&token=f0f618bf-3c29-4d30-b731-091148af2a52"
    ],
    "producto": "secador de pelo",
    "financiamiento": 8,
    "precio": 19489.68,
    "codigo": "6985214720330",
    "categoria": "smartwatch",
    "costo": 6.562181818181818,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "margen": 100,
    "marca": "remington",
    "iva": 0
  },
  {
    "marca": "imega",
    "financiamiento": 8,
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719582381684"
    ],
    "codigo": "6985854822913",
    "categoria": "smartwatch",
    "cantidad": 1,
    "costo": 7.540363636363637,
    "margen": 100,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582381684?alt=media&token=97267fd9-6684-4d1c-a508-f6b39ac6970f"
    ],
    "precio": 22394.88,
    "producto": "secador de pelo",
    "id": "Z3Ws3EeN1lxbwIhFxWkC",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ]
  },
  {
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "id": "h8qia7AezGxETLA6oUL1",
    "imgUrlsRef": [
      "productos/1719582362220"
    ],
    "financiamiento": 8,
    "costo": 6.562181818181818,
    "marca": "hytoshy",
    "codigo": "1000804028070",
    "producto": "secador de pelo",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582362220?alt=media&token=7197f6c5-5bff-448d-8085-604daab0680e"
    ],
    "precio": 19489.68,
    "margen": 100,
    "categoria": "smartwatch"
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584225133?alt=media&token=7b13f235-d063-4aa8-92c1-f62f23ac46a9"
    ],
    "marca": "--",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "codigo": "6900750016853",
    "imgUrlsRef": [
      "productos/1719584225133"
    ],
    "categoria": "soportes",
    "costo": 0.32727272727272727,
    "cantidad": 1,
    "precio": 972,
    "financiamiento": 8,
    "iva": 0,
    "producto": "soporte auricular con mueca",
    "margen": 100,
    "id": "zEb3kbG32VxMOaAdXNGP"
  },
  {
    "categoria": "soportes",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584174274?alt=media&token=900186e7-e814-4bb1-a832-18e6bf47416c"
    ],
    "iva": 0,
    "costo": 1.1774545454545455,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "imgUrlsRef": [
      "productos/1719584174274"
    ],
    "financiamiento": 8,
    "cantidad": 1,
    "margen": 100,
    "producto": "soporte brazal deportivo",
    "marca": "--",
    "precio": 3497.0400000000004,
    "codigo": "--",
    "id": "Vx3nCDWZwSjbiWNGKtWZ"
  },
  {
    "financiamiento": 8,
    "marca": "inova",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "stock": 1,
        "denominacionColor": "Negro"
      }
    ],
    "precio": 6480,
    "codigo": "--",
    "categoria": "soportes",
    "producto": "soporte de auto aire",
    "id": "8ST0UxtAuEVnSlFClkpI",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584436843?alt=media&token=2e2a0d0e-053f-4850-b889-da6bdcd61c19"
    ],
    "iva": 0,
    "costo": 2.1818181818181817,
    "margen": 100,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719584436843"
    ]
  },
  {
    "precio": 11197.44,
    "categoria": "soportes",
    "iva": 0,
    "financiamiento": 8,
    "margen": 100,
    "marca": "netmak",
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719584162149"
    ],
    "costo": 3.7701818181818183,
    "producto": "soporte de auto retrovisor",
    "codigo": "0700306604390",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584162149?alt=media&token=a7026268-fc48-4180-a868-c6f99d6208c0"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "id": "npLn9CZOd5m2yLhUEqTh"
  },
  {
    "codigo": "--",
    "margen": 100,
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "imgUrlsRef": [
      "productos/1719349178043"
    ],
    "precio": 11942.64,
    "categoria": "soportes",
    "costo": 4.021090909090909,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719349178043?alt=media&token=06f448eb-7c4c-4b3c-ad6b-80124add2bb3"
    ],
    "id": "6MVEX15AVMYK5xI4XeQp",
    "iva": 0,
    "producto": "soporte de bicicleta con funda XL impermeable",
    "marca": "on the road, for riding"
  },
  {
    "marca": "weather resistant bike mount",
    "imgUrlsRef": [
      "productos/1719349200159"
    ],
    "costo": 4.021090909090909,
    "iva": 0,
    "financiamiento": 8,
    "categoria": "soportes",
    "codigo": "22000308000015",
    "margen": 100,
    "precio": 11942.64,
    "id": "ju6RPgNNnSfNzwWxgckn",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719349200159?alt=media&token=930115d9-17a9-4006-973b-4e439c570666"
    ],
    "producto": "soporte de bicicleta con funda XL impermeable"
  },
  {
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "imgUrlsRef": [
      "productos/1719584128637"
    ],
    "financiamiento": 8,
    "categoria": "soportes",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584128637?alt=media&token=c70404d5-f3c6-4fc4-928f-bbcd5b0f6403"
    ],
    "iva": 0,
    "margen": 100,
    "precio": 17236.8,
    "costo": 5.803636363636364,
    "cantidad": 1,
    "id": "qurIV0qoTT1ArzZD7wm8",
    "producto": "soporte de tv 14 a 42\"",
    "codigo": "--",
    "marca": "madison"
  },
  {
    "producto": "soporte de tv 26 a 63\"",
    "iva": 0,
    "categoria": "soportes",
    "marca": "madison",
    "id": "UXWK9mf4gBpGfXqNWs97",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "financiamiento": 8,
    "precio": 19396.800000000003,
    "margen": 100,
    "codigo": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584107273?alt=media&token=1fc06a77-891c-4f5a-ad5d-667dbc3aaeaa"
    ],
    "costo": 6.530909090909091,
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719584107273"
    ]
  },
  {
    "precio": 1922.4,
    "costo": 0.6472727272727272,
    "financiamiento": 8,
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "id": "Xurzs3Tm44M9FPtYgDju",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584186321?alt=media&token=13ab8885-ee10-40a6-8798-8e59d73bb0ac"
    ],
    "codigo": "--",
    "marca": "--",
    "margen": 100,
    "categoria": "soportes",
    "producto": "soporte manito",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719584186321"
    ]
  },
  {
    "iva": 0,
    "cantidad": 1,
    "id": "FX6yCxboEnyxWi6ucJfI",
    "marca": "iglufive",
    "precio": 9526.415094339623,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244448576?alt=media&token=acc3a161-fadd-41db-8b59-f8f3006fe323"
    ],
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719244448576"
    ],
    "producto": "soporte para auto",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "costo": 3.207547169811321,
    "codigo": "--",
    "categoria": "soportes",
    "margen": 100
  },
  {
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 1
      }
    ],
    "financiamiento": 8,
    "marca": "grc",
    "cantidad": 1,
    "precio": 8709.12,
    "categoria": "soportes",
    "margen": 100,
    "producto": "soporte para bicicleta",
    "imgUrlsRef": [
      "productos/1719588464443"
    ],
    "id": "i7075uvbkXFKubPCDMkz",
    "codigo": "8072020042614",
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719588464443?alt=media&token=de37336f-aa8e-4a01-9ba0-d4e962c3949e"
    ],
    "costo": 2.9323636363636365
  },
  {
    "costo": 0.4290909090909091,
    "precio": 1274.4,
    "margen": 100,
    "financiamiento": 8,
    "producto": "soporte plegable",
    "cantidad": 1,
    "id": "p7dZS5J1hFSVzgEbsYUG",
    "iva": 0,
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1719584202594"
    ],
    "marca": "--",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584202594?alt=media&token=0d481d35-a6d4-4bde-a600-12872fc7b8d4"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "categoria": "soportes"
  },
  {
    "imgUrlsRef": [
      "productos/1719522759524"
    ],
    "producto": "soporte tablet o notebook",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ],
    "margen": 100,
    "precio": 9333.360000000002,
    "financiamiento": 8,
    "cantidad": 1,
    "costo": 3.1425454545454548,
    "id": "aftomyeTWk2GqaTvHdA8",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522759524?alt=media&token=07760fc9-529f-4eaa-9b0e-e0f581743e32"
    ],
    "codigo": "6985745212113",
    "categoria": "computacion",
    "iva": 0,
    "marca": "pad laptop stand"
  },
  {
    "financiamiento": 8,
    "imgUrlsRef": [
      "productos/1719585679692"
    ],
    "iva": 0,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585679692?alt=media&token=20bf7db5-ded6-4338-8311-8cddae4ea103"
    ],
    "cantidad": 1,
    "categoria": "computacion",
    "producto": "teclado 3 en 1 inalambrico",
    "costo": 10.892363636363637,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "marca": "gtc",
    "precio": 32350.320000000007,
    "margen": 100,
    "codigo": "--",
    "id": "Tm2quyZ9Mp9ZH71wTjDX"
  },
  {
    "codigo": "6902022085000",
    "imgUrlsRef": [
      "productos/1719585796002"
    ],
    "margen": 100,
    "precio": 36504.00000000001,
    "id": "o0SuR7UOHMQ66M2Gp2kf",
    "marca": "yelandar",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585796002?alt=media&token=c0ecda05-adb8-4759-9f6e-d771542b3166"
    ],
    "producto": "teclado 5 en 1 gamer",
    "costo": 12.290909090909091,
    "iva": 0,
    "financiamiento": 8,
    "categoria": "computacion",
    "cantidad": 1,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "negro"
      }
    ]
  },
  {
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "marca": "kosmo",
    "cantidad": 1,
    "iva": 0,
    "margen": 100,
    "codigo": "7792391620075",
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585752901?alt=media&token=60b05327-2cc6-4aa9-8e12-0007e1db2b84"
    ],
    "categoria": "computacion",
    "id": "kTAuBrUu3uwSFWnWwQVN",
    "producto": "teclado kos-kd620",
    "financiamiento": 8,
    "costo": 5.026909090909091,
    "precio": 14929.92,
    "imgUrlsRef": [
      "productos/1719585752901"
    ]
  },
  {
    "cantidad": 1,
    "imgUrlsRef": [
      "productos/1719585779332"
    ],
    "id": "sWkaz79HJMGVaD4xBlYo",
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "negro",
        "stock": 1
      }
    ],
    "producto": "teclado kos-tec2",
    "costo": 7.517818181818182,
    "margen": 100,
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585779332?alt=media&token=fa6c993e-8509-42ef-b836-746d0c359649"
    ],
    "marca": "kosmo",
    "categoria": "computacion",
    "precio": 22327.920000000002,
    "codigo": "--",
    "iva": 0
  },
  {
    "id": "s9s30CnxIPVPhxVEqMtN",
    "margen": 80,
    "precio": 17895.987169811324,
    "coloresDisponibles": [
      {
        "color": "#000000",
        "denominacionColor": "Negro",
        "stock": 2
      }
    ],
    "financiamiento": 8,
    "costo": 6.695094339622641,
    "categoria": "computacion",
    "marca": "backlit",
    "producto": "teclado mini",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719075035539"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719075035539?alt=media&token=7b77f78c-9daf-4396-bbfc-d420020a123f"
    ],
    "cantidad": 2,
    "codigo": "--"
  },
  {
    "financiamiento": 8,
    "iva": 0,
    "costo": 3.7735849056603774,
    "categoria": "computacion",
    "marca": "gtc",
    "precio": 11207.547169811322,
    "id": "MkH4qlX82dIqZ7H2K0dr",
    "producto": "teclado usb",
    "coloresDisponibles": [
      {
        "denominacionColor": "Negro",
        "color": "#000000",
        "stock": 3
      }
    ],
    "imgUrlsRef": [
      "productos/1719585672752"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585672752?alt=media&token=0d924300-c5c9-410a-b305-0540dce5d4a0"
    ],
    "codigo": "8072017071429",
    "cantidad": 3,
    "margen": 100
  },
  {
    "precio": 10800,
    "producto": "teclado usb nm-kb586u",
    "cantidad": 1,
    "marca": "netmal",
    "financiamiento": 8,
    "margen": 100,
    "id": "wRS2hMoCFBPXuZqx0Zvy",
    "imgUrlsRef": [
      "productos/1719585740537"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585740537?alt=media&token=b1852745-c4d4-4d28-93d5-ee7bfc9bb099"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "costo": 3.6363636363636362,
    "iva": 0,
    "codigo": "0700306601221",
    "categoria": "computacion"
  },
  {
    "categoria": "computacion",
    "cantidad": 1,
    "costo": 2.909090909090909,
    "producto": "teclado usb tec-002",
    "codigo": "7798318657889",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719585692327"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585692327?alt=media&token=7fc60237-3c3e-4f22-85ef-1b51bf403d10"
    ],
    "marca": "inova",
    "financiamiento": 8,
    "id": "0YKsXjtoseRhY1RWaWSd",
    "iva": 0,
    "precio": 8640,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ]
  },
  {
    "precio": 37962,
    "costo": 12.781818181818181,
    "imgUrlsRef": [
      "productos/1719586776718"
    ],
    "cantidad": 2,
    "marca": "bigstar",
    "categoria": "hogar",
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#ffffff",
        "denominacionColor": "blanco"
      },
      {
        "stock": 1,
        "color": "#2e063d",
        "denominacionColor": "violeta"
      }
    ],
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586776718?alt=media&token=c5710a07-dbbe-43fb-9c0b-7a9950d34b5d"
    ],
    "codigo": "--",
    "margen": 100,
    "producto": "termo 1,2lts",
    "id": "KRIhBtU2mMNLFXKVfWyq",
    "iva": 0
  },
  {
    "iva": 0,
    "margen": 100,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "Negro",
        "color": "#000000"
      }
    ],
    "marca": "netpor",
    "categoria": "Cargadores",
    "financiamiento": 8,
    "codigo": "6900750016051",
    "id": "MWra919rIzuWK0bUavTf",
    "producto": "toma 12v moto encendedor puerto usb",
    "cantidad": 1,
    "precio": 10086.79245283019,
    "imgUrlsRef": [
      "productos/1719244163780"
    ],
    "costo": 3.3962264150943398,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244163780?alt=media&token=05377794-74e0-4d32-bcf5-3f228a0a46f7"
    ]
  },
  {
    "iva": 0,
    "producto": "tripode 1mt",
    "codigo": "--",
    "margen": 100,
    "precio": 8532,
    "costo": 2.8727272727272726,
    "id": "qzwt5nQNc1n2veygY8jX",
    "cantidad": 1,
    "marca": "--",
    "imgUrlsRef": [
      "productos/1719586539340"
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586539340?alt=media&token=e9c3429d-e735-4a28-ae0f-cc6de32f7f2b"
    ],
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "stock": 1,
        "color": "#000000"
      }
    ],
    "categoria": "soportes",
    "financiamiento": 8
  },
  {
    "producto": "tripode 2mts",
    "margen": 100,
    "categoria": "soportes",
    "costo": 3.6,
    "financiamiento": 8,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586549652?alt=media&token=070d86a3-63bc-4823-8c9a-e31a12673f98"
    ],
    "cantidad": 1,
    "marca": "--",
    "precio": 10692.000000000002,
    "codigo": "--",
    "iva": 0,
    "imgUrlsRef": [
      "productos/1719586549652"
    ],
    "id": "7mBcZlfq7UyxIoboaFsK",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ]
  },
  {
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586562162?alt=media&token=85c95f0d-d86e-4c9b-999c-669a0f01b2c0"
    ],
    "iva": 0,
    "marca": "selfie flexi pod",
    "imgUrlsRef": [
      "productos/1719586562162"
    ],
    "categoria": "soportes",
    "cantidad": 1,
    "costo": 1.309090909090909,
    "precio": 3888,
    "codigo": "6959856023388",
    "financiamiento": 8,
    "coloresDisponibles": [
      {
        "stock": 1,
        "denominacionColor": "negro",
        "color": "#000000"
      }
    ],
    "id": "8zdfBCpusMs0L7VMDLsa",
    "margen": 100,
    "producto": "tripode articulable"
  },
  {
    "producto": "tripode con control bluetooth",
    "marca": "k07",
    "margen": 100,
    "codigo": "--",
    "imgUrlsRef": [
      "productos/1719586553519"
    ],
    "id": "HJtdbZ0sG0puvLuL0NMy",
    "iva": 0,
    "costo": 3.0545454545454547,
    "precio": 9072.000000000002,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586553519?alt=media&token=152a8d76-474e-479b-9d1d-60a6418d0f81"
    ],
    "financiamiento": 8,
    "categoria": "soportes",
    "coloresDisponibles": [
      {
        "denominacionColor": "negro",
        "color": "#000000",
        "stock": 1
      }
    ],
    "cantidad": 1
  },
  {
    "imgUrlsRef": [
      "productos/1719586841150"
    ],
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#ffffff",
        "denominacionColor": "blanco"
      }
    ],
    "marca": "vr plast",
    "financiamiento": 8,
    "id": "r7AE3SutjtdSoTxdnpH6",
    "precio": 6480,
    "producto": "zapatilla 5 tomas 3mts",
    "codigo": "--",
    "iva": 0,
    "costo": 2.1818181818181817,
    "margen": 100,
    "cantidad": 1,
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586841150?alt=media&token=9519d3fe-007f-4dee-be29-9b5995259ab2"
    ],
    "categoria": "hogar"
  },
  {
    "precio": 9720.000000000002,
    "cantidad": 1,
    "id": "h4hI3umwo2lOJehrEltX",
    "marca": "vr plast",
    "coloresDisponibles": [
      {
        "denominacionColor": "blanco",
        "stock": 1,
        "color": "#ffffff"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586849248?alt=media&token=d8a477d8-127c-4a80-a497-a6b15ec9976e"
    ],
    "costo": 3.272727272727273,
    "codigo": "--",
    "financiamiento": 8,
    "producto": "zapatilla 5 tomas 5mts",
    "iva": 0,
    "categoria": "hogar",
    "margen": 100,
    "imgUrlsRef": [
      "productos/1719586849248"
    ]
  },
  {
    "imgUrlsRef": [
      "productos/1719587103894"
    ],
    "marca": "new times",
    "iva": 0,
    "id": "Y2HpNEDOqishhHud0rX7",
    "precio": 16176.24,
    "coloresDisponibles": [
      {
        "stock": 1,
        "color": "#000000",
        "denominacionColor": "Negro"
      }
    ],
    "images": [
      "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719587103894?alt=media&token=d46e6807-c278-4c94-80a2-a914b9a34a82"
    ],
    "cantidad": 1,
    "financiamiento": 8,
    "producto": "zapatillas con interruptores",
    "categoria": "hogar",
    "codigo": "--",
    "costo": 5.446545454545454,
    "margen": 100
  }
]
@Component({
  selector: 'app-nuevo-libro-diario',
  templateUrl: './nuevo-libro-diario.page.html',
  styleUrls: ['./nuevo-libro-diario.page.scss'],
})
export class NuevoLibroDiarioPage implements OnInit {
  isActionSheetOpen = false;
  actionSheetButtons: any = [];

  montoInicialOriginal: number = 0;
  mostrarModalCierreDeCaja = false;
  resultadoDeCaja: number = 0;
  montoDeCaja = null;
  libroDiarioHoy: LibroDiario = {
    id: '',
    fecha: -1,
    ventas: [],
    montoInicial: 0,
    montoTotal: 0,
    cuadra: false,
    fechaString: '',
    montoTotalEfectivo: 0,
    montoTotalMercadoPago: 0,
    montoTotalTransferencia: 0,
    montoTotalNegativo: 0
  }
  mostrarMontoInicial = true;
  montoIngresado: number = 0;
  loggedUser!: User;

  constructor(private authService: AuthService,
    private database: DataBaseService,
    public funcionesUtiles: FuncionesUtilesService,
    private modalController: ModalController,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private alertService: AlertService,
  ) {
    this.getCurrentUser();

  }

  ngOnInit(): void {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que los meses se indexan desde 0
    const dia = fechaActual.getDate().toString().padStart(2, '0');

    const idDiaActual = `${anio}-${mes}-${dia}`;
    console.log(environment.TABLAS.ingresosNuevoLibro, idDiaActual);

    this.database.obtenerPorId(environment.TABLAS.ingresosNuevoLibro, idDiaActual).subscribe(res => {

      if (!res.payload.exists) {
        this.libroDiarioHoy = this.obtenerNuevoLibroDiario(idDiaActual);//aca debe estar el problema
        this.database.crearConCustomId(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy.id, this.libroDiarioHoy);
      } else {
        this.libroDiarioHoy = res.payload.data() as LibroDiario;
        this.libroDiarioHoy['id'] = res.payload.id;
      }

    });
  }


  async mostrarModalAbrirCaja() {
    try {
      const modal = await this.modalController.create({
        component: AperturaDeCajaComponent,
        componentProps: {
          isModal: false,
          libroDiarioHoy: this.libroDiarioHoy
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data == undefined || !result.role) return;


        console.log("Guardando")
        if (result.role == 'guardar') {
          this.spinnerService.showLoading("Cargando monto...");
          this.libroDiarioHoy.montoInicial = Number(result.data);
          await this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id)?.then(res => {
            this.spinnerService.stopLoading();
          });
        }

      })
      return await modal.present();
    } catch (err) {
    }
  }
  cargarActionSheet() {
    this.actionSheetButtons = [];

    if (this.funcionesUtiles.roleMinimoNecesario('EMPLEADO', this.loggedUser)) {
      this.actionSheetButtons.unshift({
        text: (this.libroDiarioHoy.montoInicial && this.libroDiarioHoy.montoInicial > 0)
          ? 'Cambiar monto inicial' : 'Iniciar Caja',
        icon: 'calculator-outline',
        handler: () => {
          this.mostrarModalAbrirCaja();
        },
      });
    }
    this.actionSheetButtons.push({
      text: 'Cancelar',
      role: 'cancel',
      icon: 'close',
      handler: () => { },
    })
  }
  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  async cargarMontoInicial() {
    this.libroDiarioHoy.montoInicial = Number(this.montoIngresado);
    await this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id);
    this.cargarActionSheet();
  }

  obtenerNuevoLibroDiario(id: string) {
    let hoy = new Date();
    hoy.setHours(0);
    hoy.setMinutes(0);
    hoy.setSeconds(0);

    let libroDiario: LibroDiario = {
      id,
      fecha: hoy.getTime(),
      fechaString: hoy.toString(),
      ventas: [],
      montoInicial: Number(this.montoIngresado) | 0,
      montoTotal: Number(this.montoIngresado) | 0,
      cuadra: false
    }
    this.montoIngresado = 0;//ver si resuelve la apertura de caja erronea, sino eliminar.
    return libroDiario;
  }

  showConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmación', `La caja inicial es: $${this.montoIngresado}?`, 'Si, confirmo', this.cargarMontoInicial.bind(this));
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      if (!userRef) return;

      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
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

        this.cargarActionSheet();
      })
    })
  }
  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: NuevoFormDetalleVentaComponent,
        componentProps: {
          productos: productos,
          isModal: false
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


        if (result.role == 'guardarItems') {

          if (!this.libroDiarioHoy.montoTotalEfectivo) {
            this.libroDiarioHoy.montoTotalEfectivo = Number(this.libroDiarioHoy.montoInicial);
          }

          this.libroDiarioHoy.ventas = this.libroDiarioHoy.ventas || [];
          this.libroDiarioHoy.ventas = [...this.libroDiarioHoy.ventas, ...result.data];
          this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Efectivo);//total en efectivo
          this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Transferencia);//total en efectivo
          this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.MercadoPago);//total en efectivo
          this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(this.libroDiarioHoy);//total negativo

          this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id);
        }

      })
      return await modal.present();
    } catch (err) {
    }
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

  comprobar() {
    if (this.libroDiarioHoy.montoTotalEfectivo && this.libroDiarioHoy.montoInicial && this.montoDeCaja) {

      this.resultadoDeCaja = (this.libroDiarioHoy.montoTotalEfectivo + this.libroDiarioHoy.montoInicial) - this.montoDeCaja;

      let mensaje = '';
      if (this.resultadoDeCaja > 0) {//(falta plata en la caja)
        mensaje = 'falta plata en la caja';
      }
      else if (this.resultadoDeCaja < 0) {//(hay de mas en la caja)
        mensaje = 'hay de mas en la caja';
      } else {//Cerro perfecto!
        mensaje = 'Cerro perfecto!';
      }

      if (!this.libroDiarioHoy.historialDeCierre) {
        this.libroDiarioHoy.historialDeCierre = [];
      }

      this.libroDiarioHoy.historialDeCierre.push({
        fecha: Date.now(),
        fechaString: new Date().toLocaleString(),
        mensaje,
        usuario: this.loggedUser.displayName || '',
        resultadoDeCaja: this.montoDeCaja - (this.libroDiarioHoy.montoTotalEfectivo + this.libroDiarioHoy.montoInicial),
      });

      this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id);
    }

  }
  detenerPropagacion(e: any) {
    e.stopPropagation();
  }
  reiniciarMontoInicialDeCaja() {
    this.libroDiarioHoy.montoInicial = 0;
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

  async mostrarModalEditarVenta(venta: any) {
    try {
      const modal = await this.modalController.create({
        component: FormActualizarItemLibroDiarioComponent,
        componentProps: {
          item: venta
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.role) return;
        let necesitaActualizar = false;


        if (result.role == 'confirmarActualizacion') {
          necesitaActualizar = true;

        } else if (result.role == 'eliminarItemVenta') {
          let indexAEliminar: number = this.libroDiarioHoy.ventas.findIndex(auxVenta => auxVenta == venta);
          //console.log(indexAEliminar)
          if (indexAEliminar != -1) {
            this.libroDiarioHoy.ventas.splice(indexAEliminar, 1);
            necesitaActualizar = true;
          }

        }


        if (necesitaActualizar) {
          this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Efectivo);//total en efectivo
          this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.Transferencia);//total en efectivo
          this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, MediosDePago.MercadoPago);//total en efectivo
          this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo(this.libroDiarioHoy);//total negativo

          this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id)?.then(res => {
            this.toastService.simpleMessage('Exito', 'Se modifico la venta', ToastColor.success);
          });
        }

      })
      return await modal.present();
    } catch (err) {
    }

  }


  mostrarOpciones() {
    this.setOpen(true);
  }
}
