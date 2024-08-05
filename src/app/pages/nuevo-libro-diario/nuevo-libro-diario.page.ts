import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { historialCaja, LibroDiario } from 'src/app/clases/libro-diario';
import { User } from 'src/app/clases/user';
import { AperturaDeCajaComponent } from 'src/app/components/apertura-de-caja/apertura-de-caja.component';
import { CarritoComponent } from 'src/app/components/carrito/carrito.component';
import { FormActualizarItemLibroDiarioComponent } from 'src/app/components/forms/form-actualizar-item-libro-diario/form-actualizar-item-libro-diario.component';
import { FormDetalleVentaComponent, MediosDePago } from 'src/app/components/forms/form-detalle-venta/form-detalle-venta.component';
import { NuevoFormDetalleVentaComponent } from 'src/app/components/nuevo-form-detalle-venta/nuevo-form-detalle-venta.component';
import { Carrito, FormasDePago, ItemCarrito, Pago, SelectorDeProductosComponent } from 'src/app/components/selector-de-productos/selector-de-productos.component';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { Venta } from 'src/app/components/selector-de-productos/selector-de-productos.component';
const productos = [
    {
        "margen": 100,
        "producto": "adaptador 1 macho iphone y dos hembra iphone",
        "id": "DBB9mRoRgPrNFjFG2pVq",
        "precio": 9455.094339622643,
        "costo": 3.018867924528302,
        "financiamiento": 8,
        "iva": 0,
        "codigo": "X002VW4JD5",
        "categoria": "Cables",
        "cantidad": 1,
        "marca": "lightning splitter",
        "imgUrlsRef": [
            "productos/1719243571584"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719243571584?alt=media&token=04bd6533-e8da-4c3b-b816-17cced554f42"
        ]
    },
    {
        "precio": 7560.000000000001,
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244538845?alt=media&token=825dcf6f-5774-4049-8e23-923727909756"
        ],
        "cantidad": 1,
        "codigo": "7795234533938",
        "margen": 100,
        "costo": 2.413793103448276,
        "categoria": "Cargadores",
        "id": "15msX5qZDvrzJiZ1Y5Yr",
        "marca": "ibek",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "producto": "adaptador auto",
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719244538845"
        ]
    },
    {
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719356302824?alt=media&token=fcad342e-0f6f-4b4f-b40a-b0e66d84dce9"
        ],
        "marca": "apple",
        "id": "3mRWasQ5CrHqeO2Oggrx",
        "precio": 9111.272727272728,
        "producto": "adaptador de auto tipo c",
        "costo": 2.909090909090909,
        "iva": 0,
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719356302824"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "codigo": "190198889973",
        "categoria": "Cargadores",
        "financiamiento": 8
    },
    {
        "costo": 5.864727272727273,
        "precio": 18368.32581818182,
        "categoria": "Cables",
        "iva": 0,
        "financiamiento": 8,
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434539974?alt=media&token=bca4d5d5-819f-4e14-a580-ba2076ba0696"
        ],
        "imgUrlsRef": [
            "productos/1719434539974"
        ],
        "codigo": "7792641880815",
        "id": "1goZRgsEoXvqlSSAMT4b",
        "producto": "adaptador hdmi a vga",
        "margen": 100,
        "marca": "netmak",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ]
    },
    {
        "costo": 4.7272727272727275,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "categoria": "computacion",
        "iva": 0,
        "margen": 100,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719588383515"
        ],
        "precio": 14805.818181818184,
        "codigo": "8639006253251",
        "cantidad": 1,
        "marca": "--",
        "id": "y1WPqUkaxjYTmQrBxqhv",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719588383515?alt=media&token=a3b85fdc-cb3d-4e20-9654-ffbde1ea72f3"
        ],
        "producto": "adaptador hdtv switch"
    },
    {
        "id": "eGV8KoNgSe1SriIUZlS4",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "categoria": "hogar",
        "precio": 1343.9127272727274,
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500378872?alt=media&token=c3305f20-5d70-4a8e-af4b-21827ed1cf67"
        ],
        "cantidad": 1,
        "producto": "adaptador para lampara",
        "iva": 0,
        "costo": 0.4290909090909091,
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719500378872"
        ],
        "marca": "--"
    },
    {
        "costo": 2.5660377358490565,
        "precio": 8036.830188679245,
        "imgUrlsRef": [
            "productos/1719078603175"
        ],
        "marca": "samsung",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "id": "2P5gyVLYzYStwjpYJ8HL",
        "categoria": "Cargadores",
        "margen": 100,
        "financiamiento": 8,
        "producto": "adaptador tipo c",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078603175?alt=media&token=419acf1c-cb87-41f3-8515-eebffdb76e9f"
        ],
        "iva": 0,
        "cantidad": 1,
        "codigo": "121122499611"
    },
    {
        "id": "pIh6KqMjOqVHYP0xeBPn",
        "marca": "apple",
        "margen": 100,
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078619996?alt=media&token=3202f44b-86a1-431b-be48-f31ad813967f"
        ],
        "precio": 11818.867924528302,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "costo": 3.7735849056603774,
        "imgUrlsRef": [
            "productos/1719078619996"
        ],
        "categoria": "Cargadores",
        "cantidad": 1,
        "codigo": "194252156926",
        "financiamiento": 8,
        "producto": "adaptador tipo c"
    },
    {
        "iva": 0,
        "stockTotal": 1,
        "codigo": "--",
        "id": "iCZCGSFnkTskcb2JIj5M",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "blanco",
                "color": "#ffffff"
            }
        ],
        "margen": 100,
        "financiamiento": 8,
        "costo": 0.26262626262626265,
        "marca": "--",
        "precio": 822.5454545454547,
        "imgUrlsRef": [
            "productos/1721514183712"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721514183712?alt=media&token=d618d161-f2a9-495f-9112-6fb04dcf975a"
        ],
        "producto": "adaptador toma",
        "categoria": "hogar"
    },
    {
        "cantidad": 1,
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500368577?alt=media&token=f443c6e2-d461-41fa-87db-8c2986d150ff"
        ],
        "marca": "--",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "costo": 0.6545454545454545,
        "imgUrlsRef": [
            "productos/1719500368577"
        ],
        "precio": 2050.0363636363636,
        "codigo": "--",
        "categoria": "hogar",
        "producto": "adaptador triple toma",
        "margen": 100,
        "iva": 0,
        "id": "HE5jU17c3XYc5Hx7VGUw"
    },
    {
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078637627?alt=media&token=e7260464-82a8-4ade-a887-28832e2f37bf"
        ],
        "codigo": "7799061004340",
        "imgUrlsRef": [
            "productos/1719078637627"
        ],
        "financiamiento": 8,
        "marca": "inova",
        "costo": 1.509433962264151,
        "iva": 0,
        "margen": 100,
        "producto": "adaptador usb",
        "categoria": "Cargadores",
        "precio": 4727.5471698113215,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "id": "y3nZdpO2Hc0lTpUaE8kT"
    },
    {
        "costo": 2.339622641509434,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "categoria": "computacion",
        "margen": 100,
        "codigo": "6900750011674",
        "precio": 7327.698113207548,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244242005?alt=media&token=cdf62cf9-4542-4cc6-93d1-805bd6acb02d"
        ],
        "producto": "antena wifi",
        "financiamiento": 8,
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719244242005"
        ],
        "id": "eU1ZimePIh9CW7QRM4HX",
        "cantidad": 1,
        "marca": "wireless-n"
    },
    {
        "iva": 0,
        "marca": "netmak",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "cantidad": 1,
        "codigo": "0700306601658",
        "producto": "antena wifi",
        "imgUrlsRef": [
            "productos/1719244261256"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244261256?alt=media&token=4503d0c0-e82c-418b-9d6d-5787235bacd9"
        ],
        "financiamiento": 8,
        "costo": 3.1320754716981134,
        "precio": 9809.660377358492,
        "id": "qZgsYZozebDSTGHZKTl2",
        "margen": 100,
        "categoria": "computacion"
    },
    {
        "margen": 100,
        "marca": "soft ring light",
        "costo": 6.2,
        "precio": 19418.4,
        "financiamiento": 8,
        "codigo": "mj26",
        "categoria": "luces",
        "id": "VgG6xnj4kE9xPPYHxY9p",
        "cantidad": 1,
        "producto": "aro led 26cm rgb",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348789950?alt=media&token=a5e9792b-4be9-43bc-bdf1-3b6811fdb154"
        ],
        "imgUrlsRef": [
            "productos/1719348789950"
        ]
    },
    {
        "marca": "soft ring light",
        "producto": "aro led 30cm rgb",
        "imgUrlsRef": [
            "productos/1719348819624"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348819624?alt=media&token=1f4af23f-40cf-4a2d-9b7d-bd952ad928b2"
        ],
        "financiamiento": 8,
        "codigo": "mj30",
        "categoria": "luces",
        "precio": 20500.36363636364,
        "cantidad": 1,
        "costo": 6.545454545454546,
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "id": "IaOpWIs4cCbYqjH2awNU",
        "margen": 100
    },
    {
        "margen": 100,
        "costo": 6.545454545454546,
        "cantidad": 1,
        "financiamiento": 8,
        "producto": "aro led 33cm rgb",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "categoria": "luces",
        "precio": 20500.36363636364,
        "codigo": "ljj-33",
        "iva": 0,
        "id": "r8F4D4dSqY4paeFM5SqS",
        "imgUrlsRef": [
            "productos/1719348850419"
        ],
        "marca": "ring fill light",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348850419?alt=media&token=ed99ee8f-59de-46cd-ae10-b47ea34c389b"
        ]
    },
    {
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "cantidad": 1,
        "codigo": "6900750010851",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348907381?alt=media&token=b3dd7d05-758e-475b-82d8-5d42439fbb24"
        ],
        "marca": "fill in light",
        "categoria": "luces",
        "margen": 100,
        "producto": "aro led 8\"",
        "costo": 4,
        "financiamiento": 8,
        "iva": 0,
        "precio": 12528,
        "imgUrlsRef": [
            "productos/1719348907381"
        ],
        "id": "XWjeywpsXpkjTZR4t4Q0"
    },
    {
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719348261778?alt=media&token=70fae6bf-766a-46ec-8744-1c35891b3f01"
        ],
        "imgUrlsRef": [
            "productos/1719348261778"
        ],
        "iva": 0,
        "producto": "aro selfie",
        "cantidad": 1,
        "categoria": "luces",
        "costo": 1.0909090909090908,
        "margen": 100,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "codigo": "--",
        "precio": 3416.727272727273,
        "id": "DikSKMI6JEA1lZHBFRwT",
        "marca": "simple, oreja de gato y corazon"
    },
    {
        "imgUrlsRef": [
            "productos/1716996635995"
        ],
        "costo": 3.7735849056603774,
        "marca": "i12 true wireless",
        "codigo": "i12",
        "precio": 10636.981132075472,
        "iva": 0,
        "categoria": "auricular",
        "id": "6KXV5MeN5Vp1B4nUuLjj",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996635995?alt=media&token=ecb631c9-f59b-45e9-817f-89926c7e0707"
        ],
        "margen": 80,
        "producto": "Auricular bluetooth",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "cantidad": 1
    },
    {
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "categoria": "auricular",
        "producto": "Auricular bluetooth",
        "financiamiento": 8,
        "margen": 100,
        "cantidad": 1,
        "id": "GAtIyqGBF2Z9yYrtozsU",
        "codigo": "f9",
        "iva": 0,
        "costo": 4.150943396226415,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996380051?alt=media&token=85a43db3-a0f5-4177-b7e6-7aa8941d3727"
        ],
        "precio": 13000.754716981131,
        "imgUrlsRef": [
            "productos/1716996380051"
        ],
        "marca": "f9"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991463047?alt=media&token=abe64bb5-5704-4971-9fd1-ad76299ad803"
        ],
        "imgUrlsRef": [
            "productos/1718991463047"
        ],
        "costo": 6.188679245283019,
        "iva": 0,
        "id": "O2R97i08XQpDoaTbYb8S",
        "marca": "xiaomi redmi",
        "margen": 100,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "producto": "Auricular bluetooth",
        "codigo": "--",
        "financiamiento": 8,
        "cantidad": 1,
        "precio": 19382.94339622642,
        "categoria": "Auricular bluetooth"
    },
    {
        "financiamiento": 8,
        "costo": 9.23076923076923,
        "id": "dKCKrT28rh0chUZv6POT",
        "categoria": "auricular",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996845856?alt=media&token=c91fa68a-a4c0-4444-926d-2117805f7a7c"
        ],
        "codigo": "6973037709434",
        "marca": "Lenovo xt82",
        "margen": 100,
        "precio": 28910.76923076923,
        "producto": "Auricular bluetooth",
        "imgUrlsRef": [
            "productos/1716996845856"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 0
            }
        ],
        "iva": 0,
        "cantidad": 0
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716932192605?alt=media&token=d3550be6-ce05-40d8-97b2-3f2889a1e270"
        ],
        "codigo": "6989532512530",
        "iva": 0,
        "costo": 2.6923076923076925,
        "producto": "Auricular bluetooth",
        "margen": 100,
        "precio": 8432.307692307693,
        "imgUrlsRef": [
            "productos/1716932192605"
        ],
        "categoria": "auricular",
        "cantidad": 1,
        "id": "etmAfUyvPrhflUtZDZAp",
        "marca": "p47",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ]
    },
    {
        "codigo": "--",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "marca": "p47 messi",
        "producto": "Auricular bluetooth",
        "financiamiento": 8,
        "categoria": "Auricular bluetooth",
        "id": "hEKkEKmSBewAzyn8iLAJ",
        "costo": 3.2452830188679247,
        "precio": 9147.803773584907,
        "iva": 0,
        "cantidad": 1,
        "margen": 80,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718978907251?alt=media&token=a3e4ce0e-e7b0-4ba8-a77c-866234c4fb1f"
        ],
        "imgUrlsRef": [
            "productos/1718978907251"
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716996391397?alt=media&token=c4168290-5436-46f9-a5d6-bb90922b91d1"
        ],
        "codigo": "763571814406",
        "cantidad": 1,
        "producto": "Auricular bluetooth",
        "id": "xZHZnyqT8HEEZpxJMitP",
        "categoria": "auricular",
        "margen": 100,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1716996391397"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "marca": "f9 s pro",
        "costo": 4.150943396226415,
        "iva": 0,
        "precio": 13000.754716981131
    },
    {
        "codigo": "0723540565999",
        "iva": 0,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "precio": 17160.996226415096,
        "producto": "auricular bluetooth ar-1371",
        "costo": 5.479245283018868,
        "marca": "rabbit ear",
        "categoria": "Auricular bluetooth",
        "imgUrlsRef": [
            "productos/1719245390418"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245390418?alt=media&token=dca4163e-b26d-430a-802d-87a49b18089f"
        ],
        "margen": 100,
        "id": "vmJAYz3fn3ivLAG1d8Gt",
        "cantidad": 1
    },
    {
        "id": "68qOm3p8ZHKCPaBvBBRA",
        "producto": "auricular bluetooth aur-103",
        "codigo": "7799061039427",
        "costo": 4.413793103448276,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 4,
                "color": "#ffffff",
                "denominacionColor": "blanco"
            },
            {
                "denominacionColor": "gris",
                "stock": 6,
                "color": "#5c5c5c"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719954216238?alt=media&token=dad06148-ff4d-49c0-bc5d-0d78d3576b73"
        ],
        "imgUrlsRef": [
            "productos/1719954216238"
        ],
        "marca": "inova",
        "precio": 13824.000000000002,
        "iva": 0,
        "categoria": "Auricular bluetooth",
        "cantidad": 10,
        "margen": 100
    },
    {
        "iva": 0,
        "cantidad": 1,
        "codigo": "--",
        "producto": "auricular bluetooth bolsita mj6688",
        "categoria": "Auricular bluetooth",
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245069684?alt=media&token=00e49df3-94fa-49df-bf8b-db5933ee3497"
        ],
        "costo": 1.509433962264151,
        "precio": 4727.5471698113215,
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719245069684"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "marca": "motorola",
        "id": "2ZsxNaxHhJNdtnhEEQD8"
    },
    {
        "imgUrlsRef": [
            "productos/1719245054393"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245054393?alt=media&token=1a499f8b-e4d2-48cb-85d5-66f3bfb8d5b2"
        ],
        "costo": 1.509433962264151,
        "cantidad": 1,
        "categoria": "Auricular bluetooth",
        "financiamiento": 8,
        "producto": "auricular bluetooth bolsita t180a",
        "precio": 4727.5471698113215,
        "iva": 0,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "id": "oyXWNzMwj21eNEfV0Btz",
        "margen": 100,
        "codigo": "--",
        "marca": "jbl"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245008146?alt=media&token=84bb80b5-6cc1-43fb-bcbd-309a5e98fece"
        ],
        "precio": 7575.894339622643,
        "costo": 2.418867924528302,
        "margen": 100,
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "imgUrlsRef": [
            "productos/1719245008146"
        ],
        "categoria": "Auricular bluetooth",
        "marca": "sony",
        "producto": "auricular bluetooth mh-750",
        "id": "jvvAURUYTAi4b5OJoidH",
        "codigo": "--",
        "financiamiento": 8,
        "iva": 0
    },
    {
        "producto": "auricular bluetooth mj6688",
        "costo": 2.418867924528302,
        "id": "ecPQuS89BgJk8JK9EeD6",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244982033?alt=media&token=e529cbbe-917f-4c53-8494-58c85b5f48f3"
        ],
        "categoria": "Auricular bluetooth",
        "iva": 0,
        "codigo": "--",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "marca": "motorola",
        "cantidad": 1,
        "margen": 100,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719244982033"
        ],
        "precio": 7575.894339622643
    },
    {
        "id": "HZCprMuzn4pRKogZVGYM",
        "cantidad": 4,
        "codigo": "6933863822097",
        "categoria": "Auricular bluetooth",
        "imgUrlsRef": [
            "productos/1721511981919"
        ],
        "marca": "noise",
        "producto": "auricular bluetooth mz-09 f9",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721511981919?alt=media&token=c4a867a3-99f7-4c86-b90c-71ad407f7660"
        ],
        "financiamiento": 8,
        "costo": 5.846464646464646,
        "precio": 18311.127272727274,
        "iva": 0,
        "margen": 100,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 4
            }
        ]
    },
    {
        "financiamiento": 8,
        "margen": 80,
        "precio": 21772.800000000003,
        "costo": 7.724137931034483,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 4
            }
        ],
        "codigo": "6902024020849",
        "marca": "pure bass wireless",
        "stockTotal": 4,
        "id": "gpZF2JZL1yJ1Cw8bs04S",
        "producto": "auricular bluetooth p35",
        "iva": 0,
        "categoria": "Auricular bluetooth"
    },
    {
        "margen": 70,
        "iva": 0,
        "precio": 23133.600000000002,
        "producto": "auricular bluetooth sn-35",
        "id": "mLZyAyELt7aeTz45TZiy",
        "stockTotal": 8,
        "costo": 8.689655172413794,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 8,
                "denominacionColor": "negro"
            }
        ],
        "marca": "on ear",
        "codigo": "6902024020764",
        "categoria": "Auricular bluetooth",
        "financiamiento": 8
    },
    {
        "marca": "cat",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 4,
                "color": "#000000"
            }
        ],
        "stockTotal": 4,
        "codigo": "6902024020771",
        "categoria": "Auricular bluetooth",
        "producto": "auricular bluetooth sn-38m",
        "costo": 8.689655172413794,
        "financiamiento": 8,
        "id": "47TWb2eTyWA7tXNUVGlh",
        "iva": 0,
        "precio": 23133.600000000002,
        "margen": 70
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
            "productos/1719244964550"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244964550?alt=media&token=feef3fe7-d699-448c-976e-c24adbe272d3"
        ],
        "cantidad": 1,
        "precio": 7575.894339622643,
        "categoria": "Auricular bluetooth",
        "costo": 2.418867924528302,
        "id": "FCguEV3IqOLcC2FMwEpn",
        "producto": "auricular bluetooth t180a",
        "financiamiento": 8,
        "marca": "jbl",
        "codigo": "--",
        "margen": 100,
        "iva": 0
    },
    {
        "margen": 70,
        "producto": "auricular bluetooth x28",
        "iva": 0,
        "stockTotal": 15,
        "marca": "tws earbuds",
        "costo": 8.689655172413794,
        "financiamiento": 8,
        "id": "MCn0vBxiGWoOtxB99eR3",
        "categoria": "Auricular bluetooth",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 5
            },
            {
                "color": "#b480d0",
                "denominacionColor": "lila",
                "stock": 5
            },
            {
                "stock": 5,
                "denominacionColor": "beige",
                "color": "#f2e9b0"
            }
        ],
        "codigo": "6902024022065",
        "precio": 23133.600000000002
    },
    {
        "precio": 4018.4150943396226,
        "costo": 1.2830188679245282,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719245238282?alt=media&token=28d77bbb-2b51-4fa7-b25a-73ceee325212"
        ],
        "iva": 0,
        "marca": "samsung",
        "cantidad": 1,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719245238282"
        ],
        "producto": "auricular con cable s20+",
        "categoria": "auricular",
        "margen": 100,
        "codigo": "--",
        "id": "vQja0ZnJX3BXMOId8nNn"
    },
    {
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 102
            }
        ],
        "financiamiento": 8,
        "cantidad": 102,
        "costo": 0.5222222222222223,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1720906214774?alt=media&token=8abeeb25-0904-4309-9aa2-583932a0cab7"
        ],
        "iva": 0,
        "imgUrlsRef": [
            "productos/1720906214774"
        ],
        "codigo": "--",
        "marca": "u19",
        "producto": "auricular economico",
        "margen": 100,
        "categoria": "auricular",
        "id": "Pi1Ha7Jz5Lc4nk0emYk6",
        "precio": 1635.6000000000001
    },
    {
        "cantidad": 14,
        "codigo": "--",
        "categoria": "auricular",
        "financiamiento": 8,
        "producto": "auricular economico",
        "iva": 0,
        "precio": 1635.6000000000001,
        "marca": "L29",
        "costo": 0.5222222222222223,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 14,
                "denominacionColor": "Negro"
            }
        ],
        "margen": 100,
        "id": "svw4m5138R4gKKt48A4E",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1720907186678?alt=media&token=bf71a4e6-2e21-4656-b41d-381de1af78ec"
        ],
        "imgUrlsRef": [
            "productos/1720907186678"
        ]
    },
    {
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718990626163?alt=media&token=b2eaa967-c27a-479a-ad69-327a210593f7"
        ],
        "marca": "bolsita",
        "imgUrlsRef": [
            "productos/1718990626163"
        ],
        "precio": 1470.0307924528302,
        "id": "i3xN0cWDeh5ehkhBuRxz",
        "producto": "Auricular economico",
        "margen": 80,
        "costo": 0.5215094339622641,
        "codigo": "--",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "categoria": "auricular",
        "financiamiento": 8,
        "cantidad": 1
    },
    {
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718990753241?alt=media&token=bba1c19f-0350-477d-92e2-6c1a21c57a0f"
        ],
        "codigo": "--",
        "costo": 1.8867924528301887,
        "id": "85MA0ts3gUGywR7sM9yf",
        "producto": "Auricular ficha iphone",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "iva": 0,
        "precio": 5909.433962264151,
        "imgUrlsRef": [
            "productos/1718990753241"
        ],
        "categoria": "auricular",
        "marca": "caja acrilica",
        "cantidad": 1
    },
    {
        "categoria": "auricular",
        "costo": 1.7592727272727273,
        "financiamiento": 8,
        "codigo": "8806088843452",
        "marca": "samsung",
        "margen": 100,
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "imgUrlsRef": [
            "productos/1719350809214"
        ],
        "iva": 0,
        "precio": 5510.042181818182,
        "id": "yMNE2A090qD7oPJ4LLcq",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719350809214?alt=media&token=0f2e1267-b7fc-4848-b5bb-4bbcb84b6780"
        ],
        "producto": "auricular ficha tipo c"
    },
    {
        "marca": "taidun",
        "categoria": "Auriculares con vincha",
        "precio": 18678.109090909093,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "codigo": "6900750010226",
        "costo": 5.963636363636364,
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719350674450?alt=media&token=ebf20bfe-40c5-4e83-a462-2e1702c136d8"
        ],
        "financiamiento": 8,
        "id": "RmeW5hBXdCW1l7HtmIuv",
        "imgUrlsRef": [
            "productos/1719350674450"
        ],
        "producto": "auricular gamer pc v1000",
        "cantidad": 1,
        "margen": 100
    },
    {
        "id": "70FsPIbHt5IbanJMgXcS",
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719350687594?alt=media&token=90d9cac5-82e8-4c88-aed7-023bf8db3d1f"
        ],
        "cantidad": 1,
        "categoria": "Auriculares con vincha",
        "financiamiento": 8,
        "precio": 17083.636363636364,
        "producto": "auricular gamer play sy830mv",
        "margen": 100,
        "marca": "design for high-end gamers",
        "costo": 5.454545454545454,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719350687594"
        ]
    },
    {
        "margen": 100,
        "marca": "suitable for gaming series",
        "precio": 15944.727272727272,
        "cantidad": 2,
        "codigo": "6921168803485",
        "iva": 0,
        "costo": 5.090909090909091,
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "id": "sp6krOMo17xwTI0FB1Aw",
        "imgUrlsRef": [
            "productos/1719351466748"
        ],
        "categoria": "Auriculares con vincha",
        "producto": "auricular gamer x2 mobile/ps4",
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351466748?alt=media&token=3dbc6af4-22df-4110-a16c-bdba6215b210"
        ]
    },
    {
        "precio": 15944.727272727272,
        "margen": 100,
        "costo": 5.090909090909091,
        "codigo": "6921168803485",
        "imgUrlsRef": [
            "productos/1719351478794"
        ],
        "marca": "suitable for gaming series",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351478794?alt=media&token=210b109a-5e71-477a-b6dc-9fb31c2c0ff5"
        ],
        "producto": "auricular gamer x3 mobile/ps4",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 2,
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "cantidad": 2,
        "financiamiento": 8,
        "id": "TuoN2eNOejCFDI8KXZ3F",
        "categoria": "Auriculares con vincha"
    },
    {
        "precio": 3309.283018867925,
        "imgUrlsRef": [
            "productos/1718990940793"
        ],
        "categoria": "auricular",
        "id": "WvXlGmjEm5dbfhVo8aVB",
        "cantidad": 1,
        "costo": 1.0566037735849056,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718990940793?alt=media&token=7dccf034-5b6d-4a2e-90f5-c012e8ce947f"
        ],
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "iva": 0,
        "margen": 100,
        "marca": "caja acrilica",
        "producto": "Auricular imitacion iphone ficha comun",
        "codigo": "--"
    },
    {
        "financiamiento": 8,
        "margen": 80,
        "costo": 4.534640522875817,
        "categoria": "auricular",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052724929?alt=media&token=dbf9a263-a61a-4fc5-9cd2-879c3311725b"
        ],
        "id": "sWGofifjQyegYNt417ff",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "producto": "auricular iphone",
        "cantidad": 1,
        "iva": 0,
        "codigo": "190198001733",
        "precio": 12782.244705882355,
        "marca": "earpods",
        "imgUrlsRef": [
            "productos/1721052724929"
        ]
    },
    {
        "marca": "pro21",
        "margen": 100,
        "iva": 0,
        "codigo": "000005123605",
        "financiamiento": 8,
        "id": "G5j7iBQ5suL4vMvxPxcv",
        "costo": 2.7586206896551726,
        "stockTotal": 4,
        "categoria": "Auriculares con vincha",
        "producto": "auricular max",
        "coloresDisponibles": [
            {
                "stock": 4,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "precio": 8640
    },
    {
        "iva": 0,
        "imgUrlsRef": [
            "productos/1718991837264"
        ],
        "cantidad": 1,
        "margen": 80,
        "id": "H5HFlyAWEDaNyfIcq6ho",
        "producto": "Auricular pc",
        "precio": 17529.74490566038,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991837264?alt=media&token=cec4a4bb-fd03-4fd7-ac81-fdd497004851"
        ],
        "financiamiento": 8,
        "marca": "as-90",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "codigo": "--",
        "categoria": "Auriculares con vincha",
        "costo": 6.218867924528302
    },
    {
        "cantidad": 1,
        "id": "ypQTjKSFRMhbqKmCczax",
        "costo": 6.218867924528302,
        "categoria": "Auriculares con vincha",
        "producto": "Auricular pc",
        "financiamiento": 8,
        "codigo": "--",
        "marca": "as-60",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "imgUrlsRef": [
            "productos/1718991826609"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991826609?alt=media&token=f49fc31b-1c72-423e-b956-6e1a491ee813"
        ],
        "precio": 17529.74490566038,
        "margen": 80
    },
    {
        "id": "rmJfZAloxWUX02pcmV2t",
        "marca": "samsung",
        "precio": 3191.0943396226417,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993351902?alt=media&token=e5cf6772-0ac2-497f-ae40-c5a59734582f"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "costo": 1.0188679245283019,
        "cantidad": 1,
        "categoria": "auricular",
        "imgUrlsRef": [
            "productos/1718993351902"
        ],
        "producto": "auricular s10+ caja gris",
        "iva": 0,
        "margen": 100,
        "codigo": "--"
    },
    {
        "id": "sLePe2GOkH610faIZ0KJ",
        "categoria": "auricular",
        "imgUrlsRef": [
            "productos/1718993367563"
        ],
        "margen": 100,
        "marca": "samsung",
        "cantidad": 1,
        "producto": "auricular s10+ caja negra",
        "costo": 1.0188679245283019,
        "financiamiento": 8,
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993367563?alt=media&token=b963c697-ed09-4e61-a689-17058f33d1e4"
        ],
        "codigo": "--",
        "precio": 3191.0943396226417
    },
    {
        "iva": 0,
        "codigo": "--",
        "categoria": "auricular",
        "costo": 2.868679245283019,
        "cantidad": 1,
        "marca": "extra bass",
        "id": "FTMsbecYHFIHgplI65G7",
        "producto": "Auricular vincha ",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1718988103582"
        ],
        "margen": 80,
        "precio": 8086.2330566037745,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718988103582?alt=media&token=5b0fc333-6b6c-4a81-aa0b-40b7605d1233"
        ]
    },
    {
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "precio": 8849.968301886793,
        "codigo": "--",
        "categoria": "Auricular bluetooth",
        "imgUrlsRef": [
            "productos/1719057634574"
        ],
        "margen": 100,
        "producto": "Auricular y47",
        "financiamiento": 8,
        "id": "cVN0mnJNzZxLVXceISNg",
        "iva": 0,
        "marca": "y47",
        "costo": 2.8256603773584907,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057634574?alt=media&token=595e55bf-f6e2-4d50-aae6-96344286e220"
        ],
        "cantidad": 1
    },
    {
        "imgUrlsRef": [
            "productos/1719351691257"
        ],
        "id": "DZB8l0gYrhyT38ElnIlC",
        "iva": 0,
        "marca": "cat ear",
        "codigo": "6935185208184",
        "costo": 5.090909090909091,
        "financiamiento": 8,
        "categoria": "Auricular bluetooth",
        "precio": 15944.727272727272,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351691257?alt=media&token=f79855eb-f6cb-4692-b46e-794315113691"
        ],
        "producto": "auricular zw-028",
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ]
    },
    {
        "financiamiento": 8,
        "margen": 80,
        "id": "qE4POQdzLxjSZTa2OVYa",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "codigo": "6902022086120",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719351701739?alt=media&token=a4a0b71e-9385-4dcc-a864-8362431ce460"
        ],
        "categoria": "Auricular bluetooth",
        "precio": 14350.254545454547,
        "cantidad": 1,
        "marca": "wireless headset",
        "imgUrlsRef": [
            "productos/1719351701739"
        ],
        "costo": 5.090909090909091,
        "producto": "auricular zw-08"
    },
    {
        "imgUrlsRef": [
            "productos/1718986962750"
        ],
        "producto": "Auriculares bluetooth",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "cantidad": 1,
        "marca": "P36",
        "margen": 80,
        "categoria": "Auricular bluetooth",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718986962750?alt=media&token=82ba916a-3418-4661-a931-3c025dbcf7ef"
        ],
        "costo": 5.283018867924528,
        "codigo": "--",
        "id": "YioSkn5bJ2gSd9Xt7a99",
        "precio": 14891.77358490566,
        "financiamiento": 8
    },
    {
        "precio": 17125.53962264151,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718986940408?alt=media&token=ef89b254-c8f3-4118-9431-e242aab2f694"
        ],
        "codigo": "--",
        "marca": "6s",
        "categoria": "Auricular bluetooth",
        "imgUrlsRef": [
            "productos/1718986940408"
        ],
        "financiamiento": 8,
        "id": "vB0bEyLu91k5xpzfvFx1",
        "margen": 80,
        "producto": "Auriculares bluetooth",
        "costo": 6.0754716981132075,
        "cantidad": 1,
        "iva": 0,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ]
    },
    {
        "margen": 100,
        "categoria": "Auricular bluetooth",
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1718993892168"
        ],
        "cantidad": 1,
        "precio": 4443.894339622641,
        "costo": 1.4188679245283018,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993892168?alt=media&token=f1b58fd7-fc83-4c81-91e9-998ef8d177a6"
        ],
        "marca": "sport",
        "financiamiento": 8,
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "producto": "Auriculares caja amarilla",
        "id": "Wcj39McxxuRfoRLHRE7I"
    },
    {
        "costo": 1.4188679245283018,
        "iva": 0,
        "categoria": "Auricular bluetooth",
        "id": "wXfABRUeknPVf6TKOxqD",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993903816?alt=media&token=0a65c0bf-ce54-4fc5-b937-5406e4cb7aab"
        ],
        "producto": "Auriculares caja negro con verde",
        "margen": 100,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "cantidad": 1,
        "precio": 4443.894339622641,
        "marca": "sport headphones",
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1718993903816"
        ]
    },
    {
        "marca": "wireless headset",
        "costo": 1.4188679245283018,
        "precio": 4443.894339622641,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993916980?alt=media&token=fadc7326-530e-4de0-b346-0c1ec82235fc"
        ],
        "imgUrlsRef": [
            "productos/1718993916980"
        ],
        "iva": 0,
        "codigo": "--",
        "id": "5JoSOL73KxJRucfc3UIQ",
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "cantidad": 1,
        "financiamiento": 8,
        "producto": "Auriculares caja negro deportivo",
        "categoria": "Auricular bluetooth"
    },
    {
        "costo": 2.868679245283019,
        "precio": 8086.2330566037745,
        "cantidad": 1,
        "marca": "Piranha",
        "codigo": "--",
        "margen": 80,
        "imgUrlsRef": [
            "productos/1718991373850"
        ],
        "producto": "Auriculares de vincha con cable",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718991373850?alt=media&token=e48f7df6-f61e-4fa4-bb9b-b319e1e50c0b"
        ],
        "categoria": "Auriculares con vincha",
        "iva": 0,
        "id": "zANYFxyF5Vv9VLmXmoEf",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "financiamiento": 8
    },
    {
        "marca": "elmcoei caja",
        "precio": 3309.283018867925,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "id": "W5RFdGBASPWHDiCA81yp",
        "costo": 1.0566037735849056,
        "margen": 100,
        "iva": 0,
        "producto": "Auriculares ev110",
        "imgUrlsRef": [
            "productos/1718992135823"
        ],
        "cantidad": 1,
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718992135823?alt=media&token=366de6a7-4794-4215-9ec9-0d8015d8f609"
        ],
        "categoria": "auricular",
        "financiamiento": 8
    },
    {
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1718992400408"
        ],
        "margen": 100,
        "producto": "Auriculares hs330",
        "id": "Zi0wrjZirjXfGHxwSme0",
        "iva": 0,
        "costo": 0.9056603773584906,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "precio": 2836.5283018867926,
        "marca": "samsung",
        "cantidad": 1,
        "categoria": "auricular",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718992400408?alt=media&token=ee59e6f2-c898-4ff8-9f59-6be8bb12ecc6"
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718992513064?alt=media&token=5615befb-4327-4b61-abd5-036a46ea4d3e"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "codigo": "--",
        "id": "nxs8f0VVLXTT8Q0vIOcP",
        "cantidad": 1,
        "costo": 8.172830188679246,
        "margen": 100,
        "precio": 25597.304150943397,
        "producto": "Auriculares kos-hp402",
        "categoria": "Auriculares con vincha",
        "marca": "Kosmo",
        "imgUrlsRef": [
            "productos/1718992513064"
        ],
        "financiamiento": 8
    },
    {
        "cantidad": 1,
        "iva": 0,
        "categoria": "Auriculares con vincha",
        "imgUrlsRef": [
            "productos/1718993037052"
        ],
        "id": "m0KIwSN5ws9r0EoTllWM",
        "codigo": "--",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "producto": "Auriculares kr-gm204",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993037052?alt=media&token=443fce68-fe10-4211-95b8-61734ef419ae"
        ],
        "marca": "gaming headset",
        "financiamiento": 8,
        "precio": 14679.033962264153,
        "costo": 5.2075471698113205,
        "margen": 80
    },
    {
        "cantidad": 1,
        "producto": "Auriculares kr-gm303",
        "codigo": "--",
        "costo": 5.283018867924528,
        "categoria": "Auriculares con vincha",
        "marca": "rgb light",
        "margen": 80,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993064970?alt=media&token=3c0e73a5-0f5e-4989-9ef2-d092565bf743"
        ],
        "id": "ma7u36AzUCTPLT3STN6l",
        "imgUrlsRef": [
            "productos/1718993064970"
        ],
        "iva": 0,
        "precio": 14891.77358490566,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "financiamiento": 8
    },
    {
        "imgUrlsRef": [
            "productos/1718993080231"
        ],
        "costo": 5.2075471698113205,
        "financiamiento": 8,
        "codigo": "--",
        "precio": 14679.033962264153,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718993080231?alt=media&token=e387e798-c345-4724-a85d-a374d26fa716"
        ],
        "categoria": "Auriculares con vincha",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "producto": "Auriculares kr-gm402",
        "cantidad": 1,
        "marca": "gaming headset",
        "iva": 0,
        "id": "8TZAguFwLr40gVEukJZC",
        "margen": 80
    },
    {
        "iva": 0,
        "producto": "balanza cocina 10kg",
        "marca": "madison",
        "margen": 100,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719354662761"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354662761?alt=media&token=3d873793-4088-4ee1-bb1a-90cabfbefbe8"
        ],
        "categoria": "hogar",
        "precio": 8266.202181818182,
        "codigo": "bal-sd-400",
        "financiamiento": 8,
        "id": "o0tGs8Qi2CKJpxywx86i",
        "costo": 2.6392727272727274
    },
    {
        "producto": "balanza comercial 40kg",
        "costo": 24,
        "codigo": "kl-t40-b",
        "marca": "kalpana",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "categoria": "hogar",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354683184?alt=media&token=dd6b7875-0d7f-4c03-a73c-2c5473d12545"
        ],
        "id": "0icOXxkWotZxg8j25DKT",
        "precio": 75168,
        "iva": 0,
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719354683184"
        ],
        "cantidad": 1
    },
    {
        "categoria": "hogar",
        "producto": "balanza personal 180kg",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "costo": 6.181818181818182,
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719354703129"
        ],
        "codigo": "1654986196555",
        "margen": 100,
        "id": "ul61vKO0glHQcYXjeDHp",
        "precio": 19361.454545454548,
        "iva": 0,
        "marca": "star vision",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354703129?alt=media&token=5fe3ae37-7625-46d1-99fd-e728381ea315"
        ]
    },
    {
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354716268?alt=media&token=b6c68e0d-f1fd-45ea-8927-394a66251014"
        ],
        "imgUrlsRef": [
            "productos/1719354716268"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "precio": 15352.722327272728,
        "categoria": "hogar",
        "id": "Q9QLwiaGb3Uaphsd9Yuk",
        "costo": 5.446545454545454,
        "financiamiento": 8,
        "producto": "balanza pocket 0,1 a 500gms",
        "iva": 0,
        "codigo": "6945545645009",
        "margen": 80,
        "marca": "pocket scale"
    },
    {
        "marca": "star vision",
        "imgUrlsRef": [
            "productos/1719354739073"
        ],
        "id": "Lz9kKtElS2Kewc3ZO08y",
        "iva": 0,
        "codigo": "--",
        "financiamiento": 8,
        "producto": "balanza portatil 50kg",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354739073?alt=media&token=4be21f0b-667c-44a0-b59b-564e82bfb0c5"
        ],
        "precio": 10250.18181818182,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "cantidad": 1,
        "categoria": "hogar",
        "margen": 100,
        "costo": 3.272727272727273
    },
    {
        "categoria": "hogar",
        "imgUrlsRef": [
            "productos/1719354899865"
        ],
        "coloresDisponibles": [
            {
                "color": "#52d6fc",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "marca": "luo",
        "cantidad": 1,
        "iva": 0,
        "margen": 80,
        "precio": 24003.875781818188,
        "financiamiento": 8,
        "producto": "botella 3 en 1",
        "costo": 8.515636363636364,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354899865?alt=media&token=9b521c62-965f-410c-b4cf-71dd179fe93e"
        ],
        "id": "ZbftCt6uepwqlRAov1Mp",
        "codigo": "--"
    },
    {
        "producto": "cable adaptador iphone a aux",
        "precio": 9455.094339622643,
        "categoria": "Cables",
        "financiamiento": 8,
        "cantidad": 1,
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719243608665?alt=media&token=c6c0429d-de1f-4cc7-b550-a66580de010f"
        ],
        "id": "e6d0yI6COE16gcMwosKq",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "marca": "caja blanca",
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719243608665"
        ],
        "margen": 100,
        "costo": 3.018867924528302
    },
    {
        "precio": 9455.094339622643,
        "marca": "caja blanca",
        "producto": "cable adaptador tipo c a aux",
        "costo": 3.018867924528302,
        "id": "bG8wVdHHDBMvFjd22yDg",
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1719243675736"
        ],
        "iva": 0,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "margen": 100,
        "categoria": "Cables",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719243675736?alt=media&token=887f8a65-6ae0-42d9-bea1-737275fadec1"
        ],
        "financiamiento": 8,
        "cantidad": 1
    },
    {
        "categoria": "Cables",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434372922?alt=media&token=32bea927-f87c-46ff-955e-09c36cbf1e4b"
        ],
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1719434372922"
        ],
        "producto": "cable alimentacion pc",
        "cantidad": 1,
        "financiamiento": 8,
        "iva": 0,
        "costo": 1.3730909090909091,
        "precio": 4300.5207272727275,
        "marca": "bolsita",
        "margen": 100,
        "id": "M0Ac6UQNjp6oqHWHD1w7",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ]
    },
    {
        "precio": 5193.425454545455,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434391870?alt=media&token=c45f40b1-ffe6-4ae9-a510-a11e8b797ba0"
        ],
        "costo": 1.6581818181818182,
        "producto": "cable alimentacion trebol",
        "margen": 100,
        "financiamiento": 8,
        "id": "6bs30Xjx6BDY55X5Fyot",
        "imgUrlsRef": [
            "productos/1719434391870"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "codigo": "--",
        "cantidad": 1,
        "iva": 0,
        "categoria": "Cables",
        "marca": "sin marca"
    },
    {
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "categoria": "Cables",
        "marca": "alfarouk",
        "precio": 1441.858909090909,
        "codigo": "asfsafsafsafsafsa",
        "imgUrlsRef": [
            "productos/1719434442406"
        ],
        "financiamiento": 8,
        "margen": 100,
        "cantidad": 1,
        "iva": 0,
        "producto": "cable audio y video (3 RCA a 3 RCA)",
        "costo": 0.46036363636363636,
        "id": "n9uz21eGAJmqqVMTBEWS",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434442406?alt=media&token=d044990a-cb9b-44b2-8030-48756f2de7db"
        ]
    },
    {
        "precio": 2097.8705454545457,
        "imgUrlsRef": [
            "productos/1719434454798"
        ],
        "codigo": "7792641880662",
        "marca": "netmak",
        "financiamiento": 8,
        "categoria": "Cables",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434454798?alt=media&token=6f35d364-d377-4843-b97f-34419a29b222"
        ],
        "costo": 0.6698181818181819,
        "id": "7u5monieh8QExswYDWMH",
        "producto": "cable aux a aux",
        "iva": 0,
        "cantidad": 1
    },
    {
        "id": "PE3XF2ExxmxNsYczqRx8",
        "costo": 0.37941379310344825,
        "financiamiento": 8,
        "iva": 0,
        "categoria": "Cables",
        "marca": "lianda",
        "producto": "cable aux a aux",
        "cantidad": 29,
        "imgUrlsRef": [
            "productos/1719952493491"
        ],
        "margen": 100,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 29
            }
        ],
        "precio": 1188.324,
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719952493491?alt=media&token=8d0d2fa2-f106-404f-a6c6-fa594fcc7895"
        ]
    },
    {
        "id": "3AnkAER68EfatZYO9n3L",
        "financiamiento": 8,
        "costo": 1.3636363636363635,
        "categoria": "Cables",
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719434477870"
        ],
        "iva": 0,
        "producto": "cable aux a aux con mic",
        "cantidad": 1,
        "precio": 4270.909090909091,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434477870?alt=media&token=7c0846a9-56db-445c-91c7-228310ffd1c4"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "marca": "netmak",
        "codigo": "7792641881935"
    },
    {
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719434502633?alt=media&token=88a247be-9205-4604-bdb8-bce77ae70e8d"
        ],
        "costo": 0.8109090909090909,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "precio": 2539.767272727273,
        "margen": 100,
        "categoria": "Cables",
        "iva": 0,
        "producto": "cable de impresora 1,5mts",
        "imgUrlsRef": [
            "productos/1719434502633"
        ],
        "cantidad": 1,
        "financiamiento": 8,
        "id": "sNPaB14PwL9n3HsSLj3H",
        "marca": "high speed computer"
    },
    {
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "costo": 2.0915032679738563,
        "codigo": "--",
        "precio": 6550.588235294119,
        "categoria": "Cables",
        "imgUrlsRef": [
            "productos/1719057512119"
        ],
        "producto": "cable ethernet 10mts",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057512119?alt=media&token=87397526-9b10-4aa9-b613-0068530410da"
        ],
        "marca": "lian pu",
        "financiamiento": 8,
        "margen": 100,
        "id": "VZJV683QbZDOcVMDX1zO"
    },
    {
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "marca": "netmak",
        "margen": 100,
        "imgUrlsRef": [
            "productos/1720909791472"
        ],
        "producto": "cable ethernet 15mts",
        "id": "vw5QiuJGTWkR4ZfwWTFG",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1720909791472?alt=media&token=811f4755-7321-4bfd-a340-baca7c7bc7ba"
        ],
        "codigo": "7792641882116",
        "costo": 2.4836601307189543,
        "financiamiento": 8,
        "iva": 0,
        "precio": 7778.823529411766,
        "categoria": "Cables"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057524073?alt=media&token=f6176b74-92bf-4742-b4b5-b0c5c5ff0d0d"
        ],
        "precio": 9825.882352941178,
        "cantidad": 1,
        "codigo": "--",
        "id": "Dqe1GZhKKAiZgOnvBMyr",
        "iva": 0,
        "costo": 3.1372549019607843,
        "marca": "lian pu",
        "categoria": "Cables",
        "margen": 100,
        "producto": "cable ethernet 20mts",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "imgUrlsRef": [
            "productos/1719057524073"
        ]
    },
    {
        "id": "B9IVBrQG3HkRYOQ6aDsZ",
        "producto": "cable ethernet 5mts",
        "categoria": "Cables",
        "cantidad": 1,
        "marca": "bentaf",
        "imgUrlsRef": [
            "productos/1719057536222"
        ],
        "costo": 1.6339869281045751,
        "precio": 5117.64705882353,
        "financiamiento": 8,
        "margen": 100,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057536222?alt=media&token=e240af91-d4c4-4231-bfde-8d76c5091269"
        ],
        "codigo": "--",
        "iva": 0
    },
    {
        "precio": 6833.454545454546,
        "producto": "cable hdmi a hdmi 5mts",
        "iva": 0,
        "costo": 2.1818181818181817,
        "financiamiento": 8,
        "codigo": "--",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436819093?alt=media&token=bfaa7afb-1b21-4e7b-b759-042dd65e9f48"
        ],
        "margen": 100,
        "categoria": "Cables",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "imgUrlsRef": [
            "productos/1719436819093"
        ],
        "id": "hG6d8GixGUh3DDRZMqWo",
        "marca": "iglufive"
    },
    {
        "imgUrlsRef": [
            "productos/1719588444799"
        ],
        "categoria": "soportes",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719588444799?alt=media&token=4e022d3c-c64d-4f4a-9380-f2dc4c07d270"
        ],
        "financiamiento": 8,
        "costo": 2.7643636363636364,
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
        "codigo": "7892020015682",
        "producto": "cable hdmi a vga",
        "precio": 8657.986909090909,
        "marca": "hd conversion cable"
    },
    {
        "imgUrlsRef": [
            "productos/1719436828928"
        ],
        "id": "rYdkHQLvRqhSoDuEvqZF",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436828928?alt=media&token=f20f4f38-ce04-42df-8668-436b6021eb7c"
        ],
        "financiamiento": 8,
        "iva": 0,
        "precio": 6150.109090909091,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "margen": 100,
        "categoria": "Cables",
        "codigo": "6910000060253",
        "cantidad": 1,
        "marca": "hdtv cable",
        "costo": 1.9636363636363636,
        "producto": "cable hdmi a vga 1,5mts"
    },
    {
        "categoria": "Cables",
        "costo": 1.4264150943396225,
        "margen": 100,
        "financiamiento": 8,
        "cantidad": 1,
        "iva": 0,
        "marca": "caja blanca",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "imgUrlsRef": [
            "productos/1719057484586"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057484586?alt=media&token=4a047fc3-b567-488e-8c9f-709854cfb793"
        ],
        "codigo": "885909627424",
        "precio": 4467.532075471698,
        "producto": "cable iphone 1mt usb",
        "id": "AEw1pqDEZ7EerGghFQI9"
    },
    {
        "id": "sbKDRVgeouVB4OgqBLqn",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "producto": "cable iphone 2mts usb",
        "cantidad": 1,
        "precio": 5554.867924528303,
        "marca": "apple",
        "imgUrlsRef": [
            "productos/1719079555159"
        ],
        "costo": 1.7735849056603774,
        "financiamiento": 8,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079555159?alt=media&token=3f43e063-a511-4069-842d-d323b1c9d0b3"
        ],
        "categoria": "Cables",
        "iva": 0,
        "codigo": "6900750002597"
    },
    {
        "cantidad": 1,
        "iva": 0,
        "financiamiento": 8,
        "codigo": "6969201905160",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "costo": 1.3584905660377358,
        "precio": 4254.792452830189,
        "marca": "x-cable",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079385667?alt=media&token=57a6ec00-170c-4ba7-80c0-91224906a601"
        ],
        "categoria": "Cables",
        "imgUrlsRef": [
            "productos/1719079385667"
        ],
        "id": "nT1gki73hfXKyfLkKrVa",
        "producto": "Cable iphone imantado",
        "margen": 100
    },
    {
        "iva": 0,
        "producto": "cable iphone tipo c",
        "financiamiento": 8,
        "cantidad": 1,
        "precio": 4963.924528301887,
        "imgUrlsRef": [
            "productos/1719262197849"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "id": "a0xWGbh3s03XmCPuea4Z",
        "margen": 100,
        "costo": 1.5849056603773586,
        "codigo": "--",
        "categoria": "Cables",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719262197849?alt=media&token=3fcade69-d53d-45f5-9589-4fd996ac350d"
        ],
        "marca": "caja blanca"
    },
    {
        "marca": "legatus",
        "iva": 0,
        "id": "Y7rC4dGmLVSMfp5dmEO4",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "codigo": "--",
        "precio": 2954.7169811320755,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719262167013?alt=media&token=ad6e7995-3289-49b4-aee5-581e5c6bbd1f"
        ],
        "imgUrlsRef": [
            "productos/1719262167013"
        ],
        "costo": 0.9433962264150944,
        "margen": 100,
        "financiamiento": 8,
        "cantidad": 1,
        "producto": "cable iphone usb rc-5008",
        "categoria": "Cables"
    },
    {
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057390894?alt=media&token=43d15d34-d3cf-4a54-b8a1-39222970f773"
        ],
        "marca": "motorola",
        "imgUrlsRef": [
            "productos/1719057390894"
        ],
        "codigo": "--",
        "cantidad": 1,
        "precio": 4727.5471698113215,
        "margen": 100,
        "iva": 0,
        "financiamiento": 8,
        "id": "cA33gFZ7vmiBhunLu0HH",
        "producto": "cable tipo c",
        "categoria": "Cables",
        "costo": 1.509433962264151
    },
    {
        "categoria": "Cables",
        "imgUrlsRef": [
            "productos/1719056685235"
        ],
        "marca": "bolsita",
        "iva": 0,
        "producto": "cable tipo c ",
        "precio": 2363.7735849056608,
        "id": "ZQEjZ653dIcxAv7Hgsl2",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "financiamiento": 8,
        "cantidad": 1,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056685235?alt=media&token=05401002-b7c1-4147-816c-b0c47db9c185"
        ],
        "costo": 0.7547169811320755,
        "codigo": "--"
    },
    {
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436290760?alt=media&token=db2cac88-815e-4c66-a110-bf0e1e337280"
        ],
        "id": "ZlFVr3xnd5junpTgYi7a",
        "precio": 4077.294545454545,
        "costo": 1.3018181818181818,
        "producto": "cable tipo c a iphone",
        "imgUrlsRef": [
            "productos/1719436290760"
        ],
        "categoria": "Cables",
        "codigo": "50131",
        "cantidad": 1,
        "iva": 0,
        "marca": "protection mobile",
        "financiamiento": 8
    },
    {
        "precio": 3644.509090909091,
        "id": "7gdT0zAm2O51aPKQVwDu",
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436300181?alt=media&token=70ab749c-3df4-4581-ac95-46831847ac61"
        ],
        "iva": 0,
        "costo": 1.1636363636363636,
        "imgUrlsRef": [
            "productos/1719436300181"
        ],
        "cantidad": 1,
        "marca": "inova",
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "producto": "cable tipo c a iphone 1mt",
        "categoria": "Cables"
    },
    {
        "financiamiento": 8,
        "marca": "aoweixun or vesion",
        "producto": "cable tipo c a tipo c",
        "costo": 1.0566037735849056,
        "margen": 100,
        "codigo": "6900750011735",
        "categoria": "Cables",
        "cantidad": 2,
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079051601?alt=media&token=9b5c4903-5ac9-4e69-b43d-f611bf3ccbbf"
        ],
        "id": "FL7mZMvh9aDpKEy2kpz7",
        "imgUrlsRef": [
            "productos/1719079051601"
        ],
        "iva": 0,
        "precio": 3309.283018867925
    },
    {
        "id": "bNNaHCeKn9J3zO0LOzJG",
        "costo": 1.3018181818181818,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "marca": "protection mobile",
        "financiamiento": 8,
        "margen": 100,
        "precio": 4077.294545454545,
        "producto": "cable tipo c a tipo c",
        "imgUrlsRef": [
            "productos/1719436307818"
        ],
        "cantidad": 1,
        "codigo": "50129",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719436307818?alt=media&token=32bce2c1-021f-4453-816c-2e49ad9e4a67"
        ],
        "iva": 0,
        "categoria": "Cables"
    },
    {
        "financiamiento": 8,
        "precio": 4084.600754716981,
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719056520522"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "id": "liT6TVdpfe9GgOXOLVUV",
        "producto": "cable tipo c cb0-6116",
        "costo": 1.3041509433962264,
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056520522?alt=media&token=1013910b-4b51-418d-bccb-6ef2bfc57759"
        ],
        "categoria": "Cables",
        "iva": 0,
        "margen": 100,
        "marca": "inova"
    },
    {
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "costo": 0.8686792452830189,
        "imgUrlsRef": [
            "productos/1719056585600"
        ],
        "id": "uuNPqHhH9HcDnvxOjBWK",
        "cantidad": 1,
        "marca": "inova",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056585600?alt=media&token=85cf697b-3c5a-47db-bd17-a80028526c2b"
        ],
        "financiamiento": 8,
        "margen": 100,
        "categoria": "Cables",
        "producto": "cable tipo c cbo-5724",
        "codigo": "--",
        "precio": 2720.7033962264154,
        "iva": 0
    },
    {
        "marca": "x-cable",
        "iva": 0,
        "id": "0HFITBQloIopOnXRI10v",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "producto": "Cable tipo c imantado",
        "imgUrlsRef": [
            "productos/1719079304156"
        ],
        "categoria": "Cables",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079304156?alt=media&token=b43a4014-dd45-4ffb-a047-8c16221fe6d3"
        ],
        "codigo": "6969201905160",
        "precio": 4136.603773584906,
        "margen": 100,
        "costo": 1.320754716981132,
        "cantidad": 1
    },
    {
        "costo": 0.7457516339869281,
        "marca": "royalcell",
        "financiamiento": 8,
        "precio": 2335.694117647059,
        "cantidad": 100,
        "producto": "cable tipo c rc-5009",
        "codigo": "7796350512210",
        "coloresDisponibles": [
            {
                "stock": 100,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "margen": 100,
        "imgUrlsRef": [
            "productos/1720909226147"
        ],
        "id": "9xEk3Gfgi4BcVzAowrjr",
        "categoria": "Cables",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1720909226147?alt=media&token=cd1f3f62-3101-4918-b394-0e01b31069dc"
        ]
    },
    {
        "costo": 0.6535947712418301,
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1719056476226"
        ],
        "iva": 0,
        "id": "kvQL4GQvjAbM7uhi3FG4",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719056476226?alt=media&token=4d4afba9-7cd3-4b77-ae14-19d499552485"
        ],
        "producto": "cable tipo c rc-y00",
        "financiamiento": 8,
        "margen": 100,
        "categoria": "Cables",
        "precio": 2047.058823529412,
        "marca": "royalcell",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ]
    },
    {
        "marca": "inova",
        "cantidad": 1,
        "iva": 0,
        "precio": 4857.009230769232,
        "codigo": "7798318654628",
        "id": "4jezpUiMy1FiYEbJb7k1",
        "financiamiento": 8,
        "categoria": "Cables",
        "imgUrlsRef": [
            "productos/1716999347401"
        ],
        "margen": 80,
        "producto": "cable tubo v8",
        "costo": 1.7230769230769232,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716999347401?alt=media&token=fa7ad778-b6dc-4bb1-88b0-ced24b8bb3a8"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ]
    },
    {
        "id": "DuoGOmoFmKr1U9cJmPC1",
        "financiamiento": 8,
        "iva": 0,
        "marca": "adweixun orvesion",
        "producto": "cable usb a usb",
        "codigo": "6900750011728",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "imgUrlsRef": [
            "productos/1719439205078"
        ],
        "categoria": "Cables",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439205078?alt=media&token=2bde547f-51f1-4ed3-93a6-a1aa3dac6407"
        ],
        "cantidad": 1,
        "costo": 0.9818181818181818,
        "margen": 100,
        "precio": 3075.0545454545454
    },
    {
        "marca": "bolsita",
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "costo": 0.49056603773584906,
        "imgUrlsRef": [
            "productos/1719079725779"
        ],
        "cantidad": 1,
        "margen": 100,
        "precio": 1536.4528301886794,
        "codigo": "7891766030409",
        "producto": "cable usb pin fino",
        "id": "EDROjS3XIcLhNjJcXSqf",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079725779?alt=media&token=fcdcef82-4946-4a7c-aa9d-c54b766777f0"
        ],
        "financiamiento": 8,
        "categoria": "Cables"
    },
    {
        "financiamiento": 8,
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719079780809"
        ],
        "id": "JahyknX5qYfzyR4GkZ7z",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "margen": 100,
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079780809?alt=media&token=d8028169-dfd6-4af0-b830-8ec7fd9303c5"
        ],
        "producto": "cable v3 usb",
        "marca": "bolsita",
        "precio": 1891.0188679245282,
        "codigo": "7891766030409",
        "costo": 0.6037735849056604,
        "categoria": "Cables"
    },
    {
        "precio": 1879.2,
        "categoria": "Cables",
        "codigo": "7796350506332",
        "marca": "royalcell",
        "imgUrlsRef": [
            "productos/1719952539674"
        ],
        "id": "E3SzT6dgTW7LdmAZSI5D",
        "financiamiento": 8,
        "cantidad": 20,
        "producto": "cable v8",
        "costo": 0.6,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719952539674?alt=media&token=4d92895f-0280-43f5-8c53-643171e5acf9"
        ],
        "margen": 100,
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 20
            }
        ]
    },
    {
        "producto": "cable v8 ",
        "precio": 4254.792452830189,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "id": "xYUAjsrhOkt44IFcy5vS",
        "margen": 100,
        "marca": "motorola",
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719080055439"
        ],
        "categoria": "Cables",
        "codigo": "698547685894",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719080055439?alt=media&token=271f8704-af50-42dc-b7a3-a85c3e7ad011"
        ],
        "iva": 0,
        "costo": 1.3584905660377358
    },
    {
        "categoria": "Cables",
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "marca": "fast 3a",
        "imgUrlsRef": [
            "productos/1716998225650"
        ],
        "codigo": "--",
        "id": "MTvvTGMOSVPG3bI7fiKl",
        "financiamiento": 8,
        "iva": 0,
        "producto": "cable v8 colores data",
        "margen": 100,
        "precio": 3132,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716998225650?alt=media&token=6ab4a815-be9b-48a7-b28a-55599c1526b2"
        ],
        "costo": 1
    },
    {
        "costo": 0.4230769230769231,
        "margen": 100,
        "producto": "cable v8 economico",
        "id": "FTNGvokPDX7eNi2MgMUi",
        "imgUrlsRef": [
            "productos/1716997666860"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "financiamiento": 8,
        "cantidad": 1,
        "precio": 1325.076923076923,
        "categoria": "Cables",
        "codigo": "--",
        "marca": "bolsita",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716997666860?alt=media&token=9d0c3694-30a5-4811-a499-85a091c0fbac"
        ]
    },
    {
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "costo": 1.2830188679245282,
        "imgUrlsRef": [
            "productos/1719079358192"
        ],
        "producto": "Cable v8 imantado",
        "cantidad": 1,
        "categoria": "Cables",
        "id": "pUOldmtq5tzh7kyVlizf",
        "marca": "x-cable",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719079358192?alt=media&token=fe054e3b-8188-4b96-b8fb-7d7f28fc1015"
        ],
        "codigo": "6969201905160",
        "precio": 4018.4150943396226,
        "margen": 100,
        "financiamiento": 8,
        "iva": 0
    },
    {
        "iva": 0,
        "cantidad": 1,
        "precio": 1686.4615384615386,
        "id": "mMwggTJPDZ1JHJXtqnXx",
        "codigo": "--",
        "producto": "cable v8 mallado",
        "costo": 0.5384615384615384,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1716997846536"
        ],
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1716997846536?alt=media&token=feac6f9c-48a5-4869-be0b-d5457737691d"
        ],
        "marca": "--",
        "categoria": "Cables",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719057428727?alt=media&token=4f6b8939-e906-483f-bad3-de80d795acad"
        ],
        "producto": "cable vga a vga",
        "precio": 2602.5147169811326,
        "costo": 0.8309433962264151,
        "imgUrlsRef": [
            "productos/1719057428727"
        ],
        "cantidad": 1,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "categoria": "Cables",
        "id": "MBRewtLQxcN4chqBFeCI",
        "marca": "bolsita",
        "codigo": "--",
        "margen": 100,
        "iva": 0
    },
    {
        "codigo": "--",
        "marca": "hytoshy",
        "costo": 10.35923076923077,
        "categoria": "caloventor",
        "iva": 0,
        "id": "5gQNNadQFmlHhfr5Bgtr",
        "financiamiento": 8,
        "cantidad": 4,
        "producto": "caloventor 2000w",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1718112287343?alt=media&token=3f6ab77a-4b6b-4320-8a81-6728e4a85228"
        ],
        "precio": 29200.599692307696,
        "imgUrlsRef": [
            "productos/1718112287343"
        ],
        "margen": 80,
        "coloresDisponibles": [
            {
                "stock": 4,
                "color": "#ffffff",
                "denominacionColor": "Blanco"
            }
        ]
    },
    {
        "producto": "camara de seguridad",
        "iva": 0,
        "codigo": "ayv0122",
        "coloresDisponibles": [
            {
                "denominacionColor": "blanco",
                "stock": 1,
                "color": "#ffffff"
            }
        ],
        "cantidad": 1,
        "id": "pQH8zBH57HaVJ0e06DPm",
        "financiamiento": 8,
        "categoria": "hogar",
        "precio": 68070.90909090909,
        "imgUrlsRef": [
            "productos/1721157296740"
        ],
        "stockTotal": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721157296740?alt=media&token=feaae12c-c741-40e1-98fc-49f7ad69033f"
        ],
        "margen": 100,
        "costo": 21.734006734006734,
        "marca": "suono"
    },
    {
        "categoria": "hogar",
        "costo": 29.27946127946128,
        "precio": 91703.27272727274,
        "id": "C1d6JsTOKTMTUiEOdMsH",
        "codigo": "4-suo082",
        "marca": "suono",
        "financiamiento": 8,
        "producto": "camara domo",
        "coloresDisponibles": [
            {
                "color": "#ffffff",
                "stock": 1,
                "denominacionColor": "blanco"
            }
        ],
        "cantidad": 1,
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721157334670?alt=media&token=48336a88-e793-46ee-a70f-948bfe4f124c"
        ],
        "stockTotal": 1,
        "imgUrlsRef": [
            "productos/1721157334670"
        ],
        "margen": 100
    },
    {
        "codigo": "6900750015962",
        "iva": 0,
        "id": "B7lQliuYX2fONVd4GgwL",
        "precio": 6804.000000000001,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "costo": 2.1724137931034484,
        "imgUrlsRef": [
            "productos/1719439245165"
        ],
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439245165?alt=media&token=5cdc798a-6adb-4ca0-8312-fede1805862f"
        ],
        "marca": "pc camera",
        "producto": "camara web",
        "categoria": "computacion",
        "margen": 100
    },
    {
        "id": "Kl5o4FWrMUfONKuHFocX",
        "marca": "suono",
        "imgUrlsRef": [
            "productos/1719439237771"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "codigo": "0701575361939",
        "margen": 100,
        "categoria": "computacion",
        "costo": 2.1724137931034484,
        "precio": 6804.000000000001,
        "producto": "camara web",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439237771?alt=media&token=f4fec6ca-f51a-4a82-918f-dd56895d23e5"
        ],
        "financiamiento": 8,
        "iva": 0
    },
    {
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719439267094"
        ],
        "categoria": "computacion",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439267094?alt=media&token=f5fc3094-1fd1-4bca-b93c-d2f81d02ec55"
        ],
        "financiamiento": 8,
        "producto": "camara web conejo",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "margen": 100,
        "costo": 2.7586206896551726,
        "marca": "high precision glass lens",
        "codigo": "6972667890017",
        "id": "gxvqVed9IRoG7zfBqYb1",
        "cantidad": 1,
        "precio": 8640
    },
    {
        "producto": "camara wifi smart",
        "precio": 91703.27272727274,
        "coloresDisponibles": [
            {
                "color": "#ffffff",
                "stock": 1,
                "denominacionColor": "blanco"
            }
        ],
        "cantidad": 1,
        "margen": 100,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1721157383571"
        ],
        "id": "fR023H0BqYiGOew9XtUC",
        "categoria": "hogar",
        "marca": "inova",
        "codigo": "md-20359",
        "costo": 29.27946127946128,
        "stockTotal": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721157383571?alt=media&token=ed4dcdae-97ba-4f2c-b9fe-1307ea5a07d2"
        ],
        "iva": 0
    },
    {
        "costo": 0.8727272727272727,
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719439078594"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439078594?alt=media&token=428f041c-4b69-409a-b75b-8b7386f60774"
        ],
        "precio": 2733.3818181818183,
        "producto": "cargador auto economico",
        "margen": 100,
        "financiamiento": 8,
        "cantidad": 1,
        "codigo": "--",
        "id": "BjcRSYqmgcllSjEjTHAO",
        "categoria": "Cargadores",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "marca": "bolsita"
    },
    {
        "codigo": "4715000003700",
        "cantidad": 1,
        "margen": 90,
        "categoria": "Cargadores",
        "imgUrlsRef": [
            "productos/1721511355150"
        ],
        "id": "gexAucVly2h5hdxUM5vb",
        "financiamiento": 8,
        "precio": 10208.527272727271,
        "producto": "cargador auto tipo c",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721511355150?alt=media&token=d9578d68-5c7c-4d7c-9bc8-9002f59c4163"
        ],
        "marca": "kosmo",
        "iva": 0,
        "costo": 3.430976430976431
    },
    {
        "id": "LihOXibwOhGScmN0xgHG",
        "costo": 2,
        "cantidad": 1,
        "marca": "unipha",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439092240?alt=media&token=ef9a52e9-e8f8-416c-b1c0-547890e70ecc"
        ],
        "precio": 6264,
        "iva": 0,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "imgUrlsRef": [
            "productos/1719439092240"
        ],
        "categoria": "Cargadores",
        "margen": 100,
        "codigo": "6900750002610",
        "producto": "cargador auto v8"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439114916?alt=media&token=6bbe9f60-996f-4673-bf64-2ae07b1d9cfa"
        ],
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "margen": 100,
        "id": "QItOThApi3YkTMoswz81",
        "marca": "motorola",
        "categoria": "Cargadores",
        "imgUrlsRef": [
            "productos/1719439114916"
        ],
        "costo": 2.7658181818181817,
        "cantidad": 1,
        "producto": "cargador auto v8",
        "codigo": "7237558983322",
        "precio": 8662.542545454546,
        "iva": 0
    },
    {
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "margen": 100,
        "producto": "cargador base inalambrica tipo c",
        "financiamiento": 8,
        "iva": 0,
        "precio": 23917.09090909091,
        "categoria": "Cargadores",
        "imgUrlsRef": [
            "productos/1719439124306"
        ],
        "costo": 7.636363636363637,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439124306?alt=media&token=da26af2c-59c6-4aac-87b6-8cede2ec85af"
        ],
        "cantidad": 1,
        "marca": "apple",
        "id": "ivuyrqZx9GBgKAsAchwW",
        "codigo": "194252192443"
    },
    {
        "marca": "samsung",
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719077907848?alt=media&token=60a8e6b3-521d-4b1d-986f-ff3318159831"
        ],
        "iva": 0,
        "cantidad": 1,
        "precio": 9455.094339622643,
        "costo": 3.018867924528302,
        "producto": "cargador c9 v8",
        "id": "ssrEpazpaYIG08W3cUHu",
        "imgUrlsRef": [
            "productos/1719077907848"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "categoria": "Cargadores",
        "financiamiento": 8,
        "margen": 100
    },
    {
        "coloresDisponibles": [
            {
                "color": "#ffffff",
                "stock": 1,
                "denominacionColor": "blanco"
            }
        ],
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721510803025?alt=media&token=0056114d-fd96-4626-8350-3f0636b16674"
        ],
        "precio": 10543.345454545455,
        "margen": 100,
        "costo": 3.366329966329966,
        "producto": "cargador cable usb reloj apple",
        "cantidad": 1,
        "iva": 0,
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1721510803025"
        ],
        "marca": "watch",
        "categoria": "Cargadores",
        "id": "e5VUqHFfYZHNK8ja2e8G"
    },
    {
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719074335514?alt=media&token=187e9b04-485f-402a-a806-1d9e0add039c"
        ],
        "categoria": "Cargadores",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "precio": 21289.411764705885,
        "financiamiento": 8,
        "producto": "cargador de notebook universal ht-120w",
        "imgUrlsRef": [
            "productos/1719074335514"
        ],
        "margen": 100,
        "cantidad": 1,
        "costo": 6.7973856209150325,
        "codigo": "--",
        "id": "gHyIv6cwPJpKb0YM6vyU",
        "marca": "hytoshy"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717163855759?alt=media&token=13799a63-9b2e-4f39-b930-a652e57d51b1"
        ],
        "imgUrlsRef": [
            "productos/1717163855759"
        ],
        "margen": 80,
        "costo": 3.076923076923077,
        "codigo": "s/c",
        "categoria": "Cargadores",
        "cantidad": 1,
        "precio": 8673.230769230771,
        "marca": "iglufive",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "producto": "cargador iphone",
        "financiamiento": 8,
        "id": "Cx7mPMFKdhzVwY0BA7Db",
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
        "precio": 15364.528301886792,
        "id": "3jaFcK18mWeqoTcSsW32",
        "costo": 4.90566037735849,
        "iva": 0,
        "categoria": "Cargadores",
        "financiamiento": 8,
        "marca": "apple",
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719078787687"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078787687?alt=media&token=5728cd27-7be9-41a2-b30c-f4b890b7c748"
        ],
        "producto": "cargador iphone tipo c",
        "codigo": "190199040670",
        "cantidad": 1
    },
    {
        "marca": "deleex charger",
        "cantidad": 1,
        "financiamiento": 8,
        "margen": 100,
        "categoria": "Cargadores",
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "costo": 3.4313725490196076,
        "codigo": "6970703340663",
        "id": "YgGuMGHQr2mQqNWLOfzJ",
        "producto": "cargador para pilas d-x1",
        "imgUrlsRef": [
            "productos/1721052694364"
        ],
        "precio": 10747.058823529413,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052694364?alt=media&token=e03372f4-ada8-42ce-a20e-0cc0125a81dc"
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052656047?alt=media&token=59205a0b-2d93-48a0-b599-870cfdb2549e"
        ],
        "categoria": "Cargadores",
        "id": "XEILpKLhc3K5j6pTm1MZ",
        "producto": "cargador para pilas dx-0604u",
        "cantidad": 1,
        "marca": "deleex charger",
        "codigo": "697070334298",
        "margen": 100,
        "iva": 0,
        "precio": 6264,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "imgUrlsRef": [
            "productos/1721052656047"
        ],
        "financiamiento": 8,
        "costo": 2
    },
    {
        "margen": 100,
        "financiamiento": 8,
        "costo": 1.9934640522875817,
        "producto": "cargador para pilas ms-5d81x",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "codigo": "6902024659889",
        "marca": "li-ion charger",
        "precio": 6243.529411764707,
        "imgUrlsRef": [
            "productos/1721052634519"
        ],
        "iva": 0,
        "id": "bRkCYlYCcMKfgshpX0LZ",
        "categoria": "Cargadores",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052634519?alt=media&token=a1732249-478e-464a-a175-75794d4f4943"
        ],
        "cantidad": 1
    },
    {
        "id": "I1J0mfV6GVWvMn0msxfR",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "producto": "cargador para pilas ms-5d82a",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052682016?alt=media&token=d09a5f41-c40b-49fe-a627-d9c2c58870ca"
        ],
        "marca": "li-ion",
        "iva": 0,
        "margen": 100,
        "costo": 2.843137254901961,
        "codigo": "6902024659896",
        "cantidad": 1,
        "categoria": "Cargadores",
        "imgUrlsRef": [
            "productos/1721052682016"
        ],
        "precio": 8904.705882352942
    },
    {
        "id": "KNCbgH7ok6YkmTkYMgOf",
        "financiamiento": 8,
        "iva": 0,
        "costo": 15.254248366013073,
        "categoria": "Cargadores",
        "producto": "cargador portaril 10000mAh",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "margen": 90,
        "marca": "netmak",
        "codigo": "--",
        "cantidad": 1,
        "precio": 45387.49058823529
    },
    {
        "margen": 100,
        "producto": "cargador portatil 12000mAh",
        "financiamiento": 8,
        "marca": "lambo powre",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "id": "Nerq69qpRwYKesP8ymxO",
        "costo": 5.043137254901961,
        "iva": 0,
        "codigo": "6985913605250",
        "categoria": "Cargadores",
        "imgUrlsRef": [
            "productos/1721052754135"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052754135?alt=media&token=50f44ddd-f796-4d22-91ed-ac2a4024cd72"
        ],
        "precio": 15795.105882352942,
        "cantidad": 1
    },
    {
        "id": "Q3y0go9fjLZpm26PMgcE",
        "categoria": "Cargadores",
        "codigo": "0700306603720",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "margen": 80,
        "precio": 33906.66352941177,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052765320?alt=media&token=300e8c44-16b4-4d89-9870-c1a6c3b3dc85"
        ],
        "cantidad": 1,
        "iva": 0,
        "producto": "cargador portatil 5000mAh",
        "marca": "netmak",
        "costo": 12.02875816993464,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1721052765320"
        ]
    },
    {
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "categoria": "Cargadores",
        "costo": 12.02875816993464,
        "precio": 37674.0705882353,
        "codigo": "0700306603706",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052778945?alt=media&token=1df76a38-c872-40ad-83a5-9444167a2fe3"
        ],
        "margen": 100,
        "id": "mffObRfBSKDqNV8mEStY",
        "imgUrlsRef": [
            "productos/1721052778945"
        ],
        "iva": 0,
        "financiamiento": 8,
        "producto": "cargador portatil 5000mah led",
        "marca": "netmak"
    },
    {
        "iva": 0,
        "marca": "iglufive",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1717163865659"
        ],
        "precio": 8509.584905660378,
        "id": "A5dSJlPN5DOF5XKTgtpR",
        "costo": 3.018867924528302,
        "producto": "cargador tipo c",
        "margen": 80,
        "codigo": "s/c",
        "categoria": "Cargadores",
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717163865659?alt=media&token=cdcc4d32-dbe7-48f3-b6fe-a98a438741db"
        ]
    },
    {
        "margen": 80,
        "costo": 2.5384615384615383,
        "cantidad": 1,
        "marca": "inova",
        "id": "clkjkrGJ2JMbAO3qd0R6",
        "producto": "cargador tipo c 3.1",
        "imgUrlsRef": [
            "productos/1717160285180"
        ],
        "financiamiento": 8,
        "iva": 0,
        "categoria": "Cargadores",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "precio": 7155.415384615384,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717160285180?alt=media&token=d59d23a7-5d2e-478d-94aa-13e01046c1f1"
        ],
        "codigo": "7798378350102"
    },
    {
        "iva": 0,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1717162795009"
        ],
        "marca": "inova",
        "precio": 9396,
        "producto": "cargador tipo c 5.1",
        "financiamiento": 8,
        "id": "cT4xMVnSoRs0Pr0Pbolh",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717162795009?alt=media&token=8a6b5f58-6100-4a2c-9a98-7507325462cf"
        ],
        "costo": 3,
        "categoria": "Cargadores",
        "codigo": "7799061004401",
        "margen": 100
    },
    {
        "marca": "samsung",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439172160?alt=media&token=5202e4ac-de1f-4ad4-97dc-817361ae8626"
        ],
        "costo": 4,
        "categoria": "Cargadores",
        "producto": "cargador tipo c a tipo c",
        "cantidad": 1,
        "financiamiento": 8,
        "precio": 12528,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1719439172160"
        ],
        "margen": 100,
        "id": "QX0AdKYiyXj3MZolcs7X",
        "iva": 0
    },
    {
        "codigo": "--",
        "id": "DQOScBIq50jcZC2aBCAH",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719077871688?alt=media&token=e1f08d06-521d-43c7-9b20-7b580e1aeb13"
        ],
        "costo": 3.169811320754717,
        "producto": "cargador tipo c c9",
        "cantidad": 1,
        "marca": "samsung",
        "margen": 100,
        "precio": 9927.849056603774,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "imgUrlsRef": [
            "productos/1719077871688"
        ],
        "categoria": "Cargadores",
        "financiamiento": 8,
        "iva": 0
    },
    {
        "iva": 0,
        "id": "LRKuxv0zYk6mQtei7CsV",
        "precio": 9455.094339622643,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078370913?alt=media&token=38c08d1b-23cd-4ea8-a1b6-861ccf24c1ef"
        ],
        "producto": "cargador tipo c s21+",
        "margen": 100,
        "costo": 3.018867924528302,
        "cantidad": 1,
        "categoria": "Cargadores",
        "codigo": "6984521230686",
        "marca": "samsung",
        "imgUrlsRef": [
            "productos/1719078370913"
        ],
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ]
    },
    {
        "financiamiento": 8,
        "margen": 100,
        "categoria": "Cargadores",
        "codigo": "0701575363636",
        "id": "jIZukRiFf3uRRLIczorP",
        "marca": "suono",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "precio": 5694.545454545455,
        "iva": 0,
        "producto": "cargador transformador 12v 2a",
        "imgUrlsRef": [
            "productos/1719439186345"
        ],
        "costo": 1.8181818181818181,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439186345?alt=media&token=dda27b98-1d48-48f8-bd40-37f32edf75fb"
        ],
        "cantidad": 1
    },
    {
        "producto": "cargador universal celular",
        "categoria": "Cargadores",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "iva": 0,
        "financiamiento": 8,
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719078406012?alt=media&token=e067fd39-104c-47f3-9a6c-1f85ced9df01"
        ],
        "cantidad": 1,
        "costo": 1.8867924528301887,
        "id": "HrtnbVhf91QxTRVfr0ST",
        "precio": 5909.433962264151,
        "marca": "digicell",
        "imgUrlsRef": [
            "productos/1719078406012"
        ],
        "margen": 100
    },
    {
        "imgUrlsRef": [
            "productos/1719076929819"
        ],
        "cantidad": 4,
        "iva": 0,
        "id": "QOp3MlLrQjnybvLXxYx0",
        "producto": "cargador universal tw-003",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076929819?alt=media&token=eaa00e50-afae-4a6b-b224-dbddb83675f1"
        ],
        "marca": "universal",
        "costo": 4.716981132075472,
        "financiamiento": 8,
        "precio": 13296.226415094341,
        "categoria": "Cargadores",
        "codigo": "0414795120889",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 4
            }
        ],
        "margen": 80
    },
    {
        "categoria": "Cargadores",
        "costo": 2.8679245283018866,
        "id": "hz69eGG8mriX9CG9c86d",
        "margen": 80,
        "codigo": "s/c",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717163872926?alt=media&token=dfaac846-a37a-425a-a81e-f00133626bbb"
        ],
        "marca": "iglufive",
        "producto": "cargador v8",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "precio": 8084.105660377358,
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1717163872926"
        ],
        "iva": 0,
        "financiamiento": 8
    },
    {
        "financiamiento": 8,
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717097652544?alt=media&token=5290e748-00f2-457a-b8ac-51251db0d59b"
        ],
        "codigo": "7798378350010",
        "id": "RWRsecB2HQbIuzlEwNDW",
        "categoria": "Cargadores",
        "imgUrlsRef": [
            "productos/1717097652544"
        ],
        "producto": "cargador v8 3.1",
        "costo": 1.9622641509433962,
        "marca": "inova",
        "margen": 80,
        "precio": 5531.230188679246,
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ]
    },
    {
        "margen": 90,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "iva": 0,
        "codigo": "7799061004395",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1717097927409?alt=media&token=4756ac8d-a4d5-4887-b378-ce9eb0496d47"
        ],
        "categoria": "Cargadores",
        "precio": 6718.79003773585,
        "marca": "inova",
        "producto": "cargador v8 5.1",
        "financiamiento": 8,
        "cantidad": 1,
        "id": "XN0W8A2qIc8UEeWtHEQl",
        "imgUrlsRef": [
            "productos/1717097927409"
        ],
        "costo": 2.25811320754717
    },
    {
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "producto": "cazador de mosca y mosquitos",
        "imgUrlsRef": [
            "productos/1719440957693"
        ],
        "margen": 100,
        "iva": 0,
        "financiamiento": 8,
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440957693?alt=media&token=c14dccf1-e84d-405e-b278-fd90d7be80ca"
        ],
        "cantidad": 1,
        "id": "VOayVNPuyuINWMg6ckjY",
        "categoria": "hogar",
        "costo": 3.770909090909091,
        "precio": 11810.487272727274,
        "marca": "--"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440921970?alt=media&token=a6c6938d-0d21-4e6c-80c9-de8e247d68ba"
        ],
        "margen": 80,
        "costo": 7.7512727272727275,
        "producto": "consola de video juegos con joystick",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719440921970"
        ],
        "codigo": "--",
        "precio": 21849.287563636368,
        "categoria": "consolas",
        "cantidad": 1,
        "iva": 0,
        "id": "UCADAavHlEY0hT5zQo0Z",
        "marca": "sup"
    },
    {
        "codigo": "699252923184",
        "imgUrlsRef": [
            "productos/1719440909423"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "categoria": "consolas",
        "iva": 0,
        "margen": 100,
        "producto": "consola de video juegos individual",
        "precio": 17083.636363636364,
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440909423?alt=media&token=071174ee-bbcf-4380-9da4-ac0c215d5738"
        ],
        "financiamiento": 8,
        "costo": 5.454545454545454,
        "id": "B5342FhOVx5HO5lRpY5p",
        "marca": "sup"
    },
    {
        "financiamiento": 8,
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719440895228"
        ],
        "margen": 100,
        "costo": 5.454545454545454,
        "id": "URHskZmdEJyFge3Skb5P",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440895228?alt=media&token=6ae8695f-8951-4c33-ba97-21e6b0bee29f"
        ],
        "codigo": "6922629500829",
        "categoria": "consolas",
        "cantidad": 1,
        "producto": "consola de video juegos sy-890a",
        "precio": 17083.636363636364,
        "marca": "game start"
    },
    {
        "iva": 0,
        "margen": 80,
        "id": "FsHC8QH4hny8Be6fB5GY",
        "codigo": "6972325580236",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440846673?alt=media&token=7b990ed6-c5e1-42af-b232-4d77a3e74c46"
        ],
        "costo": 16,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "marca": "game dongle",
        "financiamiento": 8,
        "producto": "consola de video juegos tv",
        "imgUrlsRef": [
            "productos/1719440846673"
        ],
        "categoria": "consolas",
        "cantidad": 1,
        "precio": 45100.8
    },
    {
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "id": "Z0K2qiL31pqBCkBCsnHZ",
        "costo": 5.090909090909091,
        "margen": 100,
        "producto": "consola pop it inalambrica",
        "cantidad": 1,
        "iva": 0,
        "categoria": "consolas",
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719439896093"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439896093?alt=media&token=aa0d1aca-eb50-4a3d-a82c-89c4b9abda80"
        ],
        "precio": 15944.727272727272,
        "marca": "--",
        "codigo": "--"
    },
    {
        "imgUrlsRef": [
            "productos/1720304377924"
        ],
        "cantidad": 2,
        "codigo": "--",
        "iva": 0,
        "id": "Rv76VAmDLA9tCNCQ8t5z",
        "coloresDisponibles": [
            {
                "stock": 2,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "categoria": "consolas",
        "producto": "consola tv hdmi",
        "margen": 100,
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1720304377924?alt=media&token=7d50532d-872c-45c3-9a47-3147a359d911"
        ],
        "stockTotal": 2,
        "costo": 24.137931034482758,
        "marca": "game stick lite",
        "precio": 75600
    },
    {
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "margen": 80,
        "financiamiento": 8,
        "iva": 0,
        "precio": 24613.72363636364,
        "costo": 8.731986531986532,
        "marca": "suono",
        "producto": "control mouse tv",
        "id": "IyZec2Q26CrAta7xmRza",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721510272114?alt=media&token=97013a8b-03d9-4c38-af91-7efd582d582a"
        ],
        "codigo": "0731299175215",
        "categoria": "hogar",
        "imgUrlsRef": [
            "productos/1721510272114"
        ]
    },
    {
        "marca": "la mejor opcion",
        "precio": 3925.018181818182,
        "imgUrlsRef": [
            "productos/1721510283851"
        ],
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721510283851?alt=media&token=0c7e8741-7d6c-4a1a-90ee-b66d12f0f2d8"
        ],
        "producto": "control universal tv led/lcd",
        "margen": 100,
        "iva": 0,
        "categoria": "hogar",
        "costo": 1.2531986531986532,
        "id": "JwvfckgYjamttNybyuWo",
        "cantidad": 1,
        "codigo": "6802023006205"
    },
    {
        "producto": "convertidor bluetooth",
        "precio": 4068.1832727272736,
        "cantidad": 1,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440786613?alt=media&token=fd4d7105-f5b8-4f5b-96bd-4fccaf01ed99"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "id": "7LMeJVAQgxfOG903H6jc",
        "codigo": "6900750000432",
        "costo": 1.298909090909091,
        "financiamiento": 8,
        "marca": "music receiver",
        "categoria": "auto",
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719440786613"
        ]
    },
    {
        "costo": 20.689655172413794,
        "producto": "convertidor tv 4k",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 30
            }
        ],
        "codigo": "F0CEEE29A698",
        "stockTotal": 30,
        "margen": 100,
        "marca": "hevc",
        "iva": 0,
        "id": "Uk9LX3etUN4hb9KC4y2p",
        "financiamiento": 8,
        "categoria": "hogar",
        "precio": 64800
    },
    {
        "categoria": "hogar",
        "cantidad": 2,
        "codigo": "--",
        "financiamiento": 8,
        "stockTotal": 2,
        "margen": 100,
        "id": "tbj7GLaL4JwqvVAK9XSt",
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 2
            }
        ],
        "precio": 75600,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719693446735?alt=media&token=e67ee3b4-29e8-42aa-a8b8-4b1c50273bb0"
        ],
        "producto": "convertidor tv box ",
        "marca": "mx q pro 5g",
        "imgUrlsRef": [
            "productos/1719693446735"
        ],
        "costo": 24.137931034482758
    },
    {
        "codigo": "--",
        "financiamiento": 8,
        "categoria": "soportes",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441448582?alt=media&token=6b8a3d84-9144-49d4-bf42-119e57ad4ecb"
        ],
        "margen": 100,
        "producto": "correa corta",
        "costo": 1.4545454545454546,
        "cantidad": 1,
        "precio": 4555.636363636364,
        "marca": "--",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "id": "BU3m6nqMoPocHf3Wgrb4",
        "imgUrlsRef": [
            "productos/1719441448582"
        ]
    },
    {
        "margen": 100,
        "id": "BpvkrL2DZ4SgZWrZ0P9w",
        "iva": 0,
        "codigo": "--",
        "producto": "correa larga",
        "financiamiento": 8,
        "cantidad": 1,
        "marca": "--",
        "categoria": "soportes",
        "precio": 4555.636363636364,
        "imgUrlsRef": [
            "productos/1719441438662"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "costo": 1.4545454545454546,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441438662?alt=media&token=7faf8677-80a0-445f-b802-2fa51b8670a2"
        ]
    },
    {
        "cantidad": 4,
        "categoria": "hogar",
        "producto": "cortadora de pelo",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 4,
                "color": "#000000"
            }
        ],
        "costo": 8.206037735849057,
        "precio": 23131.179169811323,
        "id": "E6d7I2aA9qAY0ZePjVYc",
        "margen": 80,
        "imgUrlsRef": [
            "productos/1719076175806"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076175806?alt=media&token=5112bb2c-be76-41e5-af60-c74d7ca254bf"
        ],
        "financiamiento": 8,
        "marca": "jinghao",
        "iva": 0,
        "codigo": "6931846846610"
    },
    {
        "precio": 24465.056603773588,
        "coloresDisponibles": [
            {
                "stock": 2,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "categoria": "hogar",
        "financiamiento": 8,
        "codigo": "1820618154532",
        "marca": "grooming hair clipper",
        "imgUrlsRef": [
            "productos/1719076191816"
        ],
        "cantidad": 2,
        "costo": 8.679245283018869,
        "iva": 0,
        "margen": 80,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076191816?alt=media&token=31db27c9-fabb-470b-b7f7-e16b3f9f5518"
        ],
        "id": "aFUbeozmWqae31DFk2Hq",
        "producto": "cortadora de pelo"
    },
    {
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "producto": "cortadora de pelo",
        "financiamiento": 8,
        "categoria": "hogar",
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719440989847"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440989847?alt=media&token=bbd319e7-616d-42bf-98aa-c7d6e2996101"
        ],
        "margen": 100,
        "iva": 0,
        "id": "iIt8kqwdqFeNhPruEvAU",
        "precio": 13439.127272727274,
        "codigo": "0729208240772",
        "marca": "suono",
        "costo": 4.290909090909091
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719440976053?alt=media&token=b74cbe24-2d4c-4d34-ba7f-046f94a14bb0"
        ],
        "producto": "cortadora de pelo wl-10001",
        "marca": "campeones",
        "costo": 3.4909090909090907,
        "codigo": "--",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "precio": 10933.527272727273,
        "id": "qYZTvmvApEQ2klGs4gud",
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719440976053"
        ],
        "categoria": "hogar",
        "margen": 100,
        "iva": 0,
        "financiamiento": 8
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
            "productos/1719441018611"
        ],
        "categoria": "hogar",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441018611?alt=media&token=9d056c7a-be5b-4712-b87d-26d8ecc02d84"
        ],
        "margen": 100,
        "financiamiento": 8,
        "marca": "kisskouchi",
        "codigo": "--",
        "precio": 11389.09090909091,
        "cantidad": 1,
        "costo": 3.6363636363636362,
        "iva": 0,
        "producto": "cortadora patillera de pelo",
        "id": "eA4LUIxiGnfBsMTDtjDf"
    },
    {
        "cantidad": 1,
        "financiamiento": 8,
        "producto": "cortadora patillera de pelo",
        "costo": 5.864727272727273,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719441011009?alt=media&token=943a0a46-b0ca-4690-8fe7-838024d32de7"
        ],
        "id": "jMPGR1twlhUyJzybgNoe",
        "imgUrlsRef": [
            "productos/1719441011009"
        ],
        "precio": 18368.32581818182,
        "codigo": "--",
        "categoria": "hogar",
        "iva": 0,
        "margen": 100,
        "marca": "vintage t9",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ]
    },
    {
        "marca": "jin hong yue",
        "financiamiento": 8,
        "codigo": "--",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "precio": 4100.072727272727,
        "producto": "destornillador acrilico",
        "iva": 0,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500292524?alt=media&token=1028d19e-df3d-42f0-9aa0-639372e231b7"
        ],
        "cantidad": 1,
        "categoria": "herramientas",
        "id": "SRwRN9eU07QngRiNbd87",
        "costo": 1.309090909090909,
        "imgUrlsRef": [
            "productos/1719500292524"
        ]
    },
    {
        "codigo": "0736372874245",
        "producto": "espejo con led y zoom",
        "precio": 13712.465454545456,
        "margen": 100,
        "costo": 4.378181818181818,
        "categoria": "hogar",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "imgUrlsRef": [
            "productos/1719500306606"
        ],
        "cantidad": 1,
        "iva": 0,
        "id": "IBSQBwD3mn8V3LyOzns9",
        "marca": "suono",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500306606?alt=media&token=af9bde52-2e69-4763-801b-44b813fef168"
        ],
        "financiamiento": 8
    },
    {
        "categoria": "auto",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354597591?alt=media&token=1639214b-e9bd-4fb8-8e39-914cb9e7d842"
        ],
        "financiamiento": 8,
        "costo": 13.090909090909092,
        "imgUrlsRef": [
            "productos/1719354597591"
        ],
        "cantidad": 1,
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "precio": 41000.72727272728,
        "id": "OdGRvq9snEr2OoM5fLFu",
        "producto": "estereo desmontable",
        "marca": "xbtqd",
        "codigo": "6974407807453",
        "iva": 0
    },
    {
        "codigo": "0701575361199",
        "imgUrlsRef": [
            "productos/1719354618965"
        ],
        "financiamiento": 8,
        "margen": 100,
        "id": "ySpxuwiPr02AnJEeu8t9",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719354618965?alt=media&token=e7d8a23b-894c-48ac-a813-96cf6d790e5d"
        ],
        "cantidad": 1,
        "categoria": "auto",
        "iva": 0,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "costo": 12,
        "producto": "estereo desmontable",
        "marca": "suono",
        "precio": 37584
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500332674?alt=media&token=2b013b9b-41ee-4787-9d9c-a3166882dae0"
        ],
        "cantidad": 1,
        "costo": 1.309090909090909,
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719500332674"
        ],
        "precio": 4100.072727272727,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "codigo": "--",
        "marca": "chemitec",
        "iva": 0,
        "financiamiento": 8,
        "categoria": "herramientas",
        "producto": "flux de soldar",
        "id": "q40N9KU8RW4QllqmdzQv"
    },
    {
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500346753?alt=media&token=3ff3bc17-0e4e-42ef-80dc-66ddf2165b11"
        ],
        "codigo": "6900750018161",
        "cantidad": 1,
        "precio": 1594.472727272727,
        "id": "9mYFylim36uza2S4yDaQ",
        "categoria": "joystick",
        "costo": 0.509090909090909,
        "producto": "funda para analogico",
        "iva": 0,
        "marca": "thumb grips",
        "imgUrlsRef": [
            "productos/1719500346753"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "margen": 100
    },
    {
        "costo": 4.8065454545454545,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "producto": "hub tipo c 4 puerto",
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719500503130"
        ],
        "margen": 100,
        "id": "iQxyMFBr45yRiYulVoPL",
        "categoria": "computacion",
        "marca": "netmak",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500503130?alt=media&token=91f52c28-c809-4132-927d-07936991b9bc"
        ],
        "codigo": "0700306604246",
        "precio": 15054.100363636366,
        "iva": 0
    },
    {
        "marca": "suono",
        "id": "UqOG6ZlvPQSWaoe3av6h",
        "cantidad": 1,
        "costo": 6.167272727272727,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500420864?alt=media&token=fa088316-66eb-48a4-ac04-3f1d2c6e5112"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "margen": 80,
        "codigo": "7292082400868",
        "financiamiento": 8,
        "precio": 17384.308363636366,
        "producto": "joystick gamepad con cooler",
        "categoria": "joystick",
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719500420864"
        ]
    },
    {
        "id": "csaNR1VdCEInpp5UjtgK",
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "precio": 10600.96581818182,
        "codigo": "6937867731218",
        "marca": "usb game pad",
        "costo": 3.3847272727272726,
        "producto": "joystick pc",
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719500406315"
        ],
        "categoria": "joystick",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500406315?alt=media&token=5466da9f-488e-438a-bac9-cdc250d73498"
        ],
        "financiamiento": 8,
        "margen": 100
    },
    {
        "id": "2UWY6rIT25UYwHfz3q3m",
        "imgUrlsRef": [
            "productos/1719500444599"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "margen": 100,
        "iva": 0,
        "codigo": "6900750002795",
        "costo": 6.167272727272727,
        "marca": "doubleshock",
        "producto": "joystick play 3",
        "categoria": "joystick",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500444599?alt=media&token=21f09125-10cb-4ce8-b0a6-6d4cc6059831"
        ],
        "cantidad": 1,
        "precio": 19315.898181818182
    },
    {
        "producto": "joystick play 3",
        "marca": "sony",
        "codigo": "71179990048",
        "iva": 0,
        "stockTotal": 1,
        "margen": 90,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721514016037?alt=media&token=853b20c3-b156-4864-9ee7-96a6abb1d326"
        ],
        "id": "aOV0k7ecuurQLHJIvqAe",
        "imgUrlsRef": [
            "productos/1721514016037"
        ],
        "costo": 6.682154882154882,
        "precio": 19882.083636363637,
        "categoria": "joystick"
    },
    {
        "stockTotal": 1,
        "margen": 80,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721513806907?alt=media&token=aedde287-b12e-45b6-86d2-d04fa1213982"
        ],
        "imgUrlsRef": [
            "productos/1721513806907"
        ],
        "categoria": "joystick",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "precio": 54493.00363636365,
        "cantidad": 1,
        "codigo": "--",
        "financiamiento": 8,
        "marca": "sony",
        "id": "8Mm9m3hPQR3XtfYZLXYF",
        "costo": 19.331986531986534,
        "iva": 0,
        "producto": "joystick play 4"
    },
    {
        "iva": 0,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "categoria": "joystick",
        "producto": "joystick play 4",
        "imgUrlsRef": [
            "productos/1719500468601"
        ],
        "costo": 16.581818181818182,
        "marca": "doubleshock",
        "id": "kDcO7hjjEPEujgSP9Evu",
        "cantidad": 1,
        "precio": 46740.829090909094,
        "margen": 80,
        "financiamiento": 8,
        "codigo": "69265565542310",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500468601?alt=media&token=acf67343-6922-409c-b13f-267dc3660ad3"
        ]
    },
    {
        "stockTotal": 1,
        "financiamiento": 8,
        "categoria": "joystick",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1721513988940"
        ],
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721513988940?alt=media&token=66d10f1b-a91e-409b-b557-2e9c1dc24021"
        ],
        "id": "2S9xLtBffzzl3kv3kEgT",
        "marca": "sony",
        "producto": "joystick play 4 camuflado",
        "costo": 17.67676767676768,
        "margen": 80,
        "precio": 49827.272727272735
    },
    {
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500156881?alt=media&token=c4da274b-7dcc-4669-a65f-6fa55a8d0490"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "costo": 22.555555555555557,
        "cantidad": 1,
        "stockTotal": 1,
        "producto": "Joystick play 4 messi",
        "marca": "sony",
        "imgUrlsRef": [
            "productos/1719500156881"
        ],
        "financiamiento": 8,
        "id": "WkS3vx7yi8aadgMW4D4V",
        "precio": 63579.600000000006,
        "codigo": "711719870258",
        "margen": 80,
        "categoria": "joystick"
    },
    {
        "producto": "joystick x3",
        "precio": 41000.72727272727,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500481273?alt=media&token=20960c31-3bbb-4193-b3cd-f90766de380e"
        ],
        "financiamiento": 8,
        "marca": "wireless controller",
        "cantidad": 1,
        "margen": 80,
        "categoria": "joystick",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "imgUrlsRef": [
            "productos/1719500481273"
        ],
        "iva": 0,
        "costo": 14.545454545454545,
        "id": "oFOHWhr5s473UuOrZ41N",
        "codigo": "6900750011636"
    },
    {
        "precio": 13666.909090909092,
        "codigo": "6900750000494",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502315934?alt=media&token=484d3eb5-1a9c-4aef-9f2e-e9e19d8473c1"
        ],
        "producto": "kit de destornillador",
        "id": "O5WaDucd61V7jvUnOU7K",
        "imgUrlsRef": [
            "productos/1719502315934"
        ],
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "margen": 100,
        "marca": "versatile screwdrivers set",
        "iva": 0,
        "financiamiento": 8,
        "costo": 4.363636363636363,
        "categoria": "herramientas"
    },
    {
        "producto": "kit de grabacion kd-49/20",
        "marca": "video-making kit",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "codigo": "--",
        "iva": 0,
        "precio": 20574.164945454548,
        "imgUrlsRef": [
            "productos/1719502299671"
        ],
        "costo": 7.298909090909091,
        "margen": 80,
        "cantidad": 1,
        "id": "gTfJFn5v0beh5rOniLBt",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502299671?alt=media&token=fe1ba178-0478-4344-809b-277a401fec3a"
        ],
        "categoria": "soportes"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502368955?alt=media&token=b44c4486-0b64-4100-870e-feb95dfec9cb"
        ],
        "producto": "lampara multicolor",
        "id": "GfNlBHtQazdpkPpzKPRu",
        "imgUrlsRef": [
            "productos/1719502368955"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "codigo": "7790420026324",
        "precio": 4100.072727272727,
        "marca": "ditron",
        "financiamiento": 8,
        "costo": 1.309090909090909,
        "iva": 0,
        "margen": 100,
        "cantidad": 1,
        "categoria": "luces"
    },
    {
        "costo": 6.336,
        "marca": "green laser pointer",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "imgUrlsRef": [
            "productos/1719502444886"
        ],
        "cantidad": 1,
        "categoria": "luces",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502444886?alt=media&token=1952f2f5-8409-4670-9397-4acf4f6d3f78"
        ],
        "margen": 100,
        "financiamiento": 8,
        "iva": 0,
        "id": "gwpeGmrKzZg8fTmgierZ",
        "codigo": "6920221003038",
        "precio": 19844.352000000003,
        "producto": "laser pointer"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502461702?alt=media&token=25a92854-f43a-47ac-ac22-4b20a9375378"
        ],
        "precio": 15944.727272727272,
        "iva": 0,
        "cantidad": 1,
        "categoria": "hogar",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "codigo": "6972910210111",
        "costo": 5.090909090909091,
        "margen": 100,
        "id": "lYvLwj1SXdVXxaJNGLhq",
        "imgUrlsRef": [
            "productos/1719502461702"
        ],
        "producto": "licuadora portatil hm-03",
        "marca": "--",
        "financiamiento": 8
    },
    {
        "iva": 0,
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719502348713"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502348713?alt=media&token=90d6c338-effc-42fe-9a91-5e481f80e728"
        ],
        "costo": 4.691636363636364,
        "cantidad": 1,
        "producto": "luz bicicleta usb nm-ld4",
        "marca": "netmak",
        "codigo": "0700306602938",
        "precio": 14694.20509090909,
        "categoria": "luces",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "id": "4aBXiIdhlcfUEb4A5CEy"
    },
    {
        "imgUrlsRef": [
            "productos/1719502333718"
        ],
        "codigo": "0700306602921",
        "marca": "netmak",
        "categoria": "luces",
        "producto": "luz de bicicleta nm-ld5",
        "costo": 4.273454545454546,
        "financiamiento": 8,
        "iva": 0,
        "cantidad": 1,
        "id": "LDpisQfXJ7xDu7D8l17v",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719502333718?alt=media&token=c74af98f-576f-4599-8a41-83c24a91a78e"
        ],
        "precio": 13384.459636363637,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "margen": 100
    },
    {
        "imgUrlsRef": [
            "productos/1719500106972"
        ],
        "codigo": "--",
        "costo": 5.454545454545454,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "margen": 80,
        "iva": 0,
        "categoria": "luces",
        "id": "oBoyKIghMU0TssMaipdX",
        "precio": 15375.27272727273,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719500106972?alt=media&token=9a815166-01cd-4409-bf56-febb2be150f2"
        ],
        "marca": "neon led",
        "producto": "luz de neon 5mts",
        "cantidad": 1
    },
    {
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719582241359"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582241359?alt=media&token=a3264b78-c79f-4291-8577-5c3484379b28"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "costo": 0.7272727272727273,
        "id": "spHEHwnNOAzBdjOMzMxL",
        "marca": "--",
        "cantidad": 1,
        "codigo": "--",
        "categoria": "smartwatch",
        "producto": "malla de reloj m5/m6/m7",
        "margen": 100,
        "financiamiento": 8,
        "precio": 2277.818181818182
    },
    {
        "producto": "malla de reloj metalica t800/t900/t10 ultra",
        "cantidad": 6,
        "coloresDisponibles": [
            {
                "stock": 6,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "categoria": "smartwatch",
        "costo": 2.909090909090909,
        "marca": "watch",
        "precio": 9111.272727272728,
        "iva": 0,
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719582326014"
        ],
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582326014?alt=media&token=a0a50192-4a7e-4fab-8902-51384e74d09f"
        ],
        "id": "TRWzeU9vbJuUj8s9p4yb"
    },
    {
        "costo": 2.1818181818181817,
        "categoria": "smartwatch",
        "precio": 6833.454545454546,
        "codigo": "--",
        "marca": "watch",
        "cantidad": 5,
        "iva": 0,
        "financiamiento": 8,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582289660?alt=media&token=a0442e2b-af9f-465a-b2a5-06711da1899d"
        ],
        "id": "JOwY7KPg6Ya2O6gX1scV",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 5
            }
        ],
        "producto": "malla de reloj silicona t800/t900/t10 ultra",
        "imgUrlsRef": [
            "productos/1719582289660"
        ]
    },
    {
        "cantidad": 2,
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "categoria": "hogar",
        "iva": 0,
        "margen": 80,
        "codigo": "--",
        "marca": "the stay chill",
        "costo": 4.935272727272728,
        "producto": "mate acero inoxidable",
        "precio": 13911.546763636365,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719522662439"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522662439?alt=media&token=cadf7626-b417-4eb0-891e-c88d06fbb203"
        ],
        "id": "CTYTbxHfohNVAoPOzQ5g"
    },
    {
        "categoria": "memorias y pendrives",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522621956?alt=media&token=ac28afb4-4993-4f97-9c37-febb9230c338"
        ],
        "marca": "kingston",
        "financiamiento": 8,
        "codigo": "740617298680",
        "costo": 4.142758620689655,
        "precio": 12975.119999999999,
        "producto": "memoria 32gb",
        "cantidad": 1,
        "iva": 0,
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "imgUrlsRef": [
            "productos/1719522621956"
        ],
        "id": "QDkHRcPg20nzbVsSiRsV"
    },
    {
        "costo": 5.3,
        "imgUrlsRef": [
            "productos/1719522632214"
        ],
        "iva": 0,
        "marca": "kingston",
        "margen": 100,
        "id": "81CAD0jJgIQBwDbIfYDx",
        "producto": "memoria 64gb",
        "precio": 16599.600000000002,
        "categoria": "memorias y pendrives",
        "codigo": "740617298697",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522632214?alt=media&token=dde55d7e-0d17-461e-8ca3-13b42ffabe4f"
        ],
        "cantidad": 1
    },
    {
        "margen": 100,
        "categoria": "computacion",
        "precio": 4555.636363636364,
        "id": "mK34Q4aFR8izggmNizEu",
        "codigo": "6900750011681",
        "producto": "microfono aux",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522606263?alt=media&token=08c264a0-6abe-46fe-b553-97460ca051a8"
        ],
        "costo": 1.4545454545454546,
        "marca": "usb desktop microphone",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719522606263"
        ],
        "cantidad": 1,
        "financiamiento": 8
    },
    {
        "cantidad": 1,
        "margen": 100,
        "marca": "lavalier micro phone",
        "costo": 1.3818181818181818,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "codigo": "--",
        "id": "KpAbFjDnZ52j9VOZIo3j",
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522596166?alt=media&token=98d6b265-38fb-4791-978f-2e8b16ce25b8"
        ],
        "categoria": "computacion",
        "precio": 4327.854545454546,
        "imgUrlsRef": [
            "productos/1719522596166"
        ],
        "iva": 0,
        "producto": "microfono corbatero aux"
    },
    {
        "codigo": "--",
        "precio": 22148.640000000003,
        "iva": 0,
        "cantidad": 2,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719954158775?alt=media&token=dcd62ff4-3c6e-4245-aeea-0be09481440d"
        ],
        "margen": 100,
        "categoria": "microfono",
        "producto": "microfono corbatero iphone",
        "costo": 7.071724137931034,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "marca": "k9 wireless microphone",
        "id": "J89exw5dvuvdxXnEkfRl",
        "imgUrlsRef": [
            "productos/1719954158775"
        ]
    },
    {
        "financiamiento": 8,
        "costo": 7.071724137931034,
        "producto": "microfono corbatero tipo c",
        "id": "LSw4QCJ2PFFGP2MNAjjG",
        "marca": "k8 wireless microphone",
        "codigo": "--",
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719954168740"
        ],
        "categoria": "microfono",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719954168740?alt=media&token=b7092f38-b07a-4d40-919e-b8630d2963e2"
        ],
        "cantidad": 2,
        "margen": 100,
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "precio": 22148.640000000003
    },
    {
        "stockTotal": 4,
        "costo": 9.655172413793103,
        "financiamiento": 8,
        "id": "VpLSoUsHTflYaC25tQRo",
        "iva": 0,
        "margen": 70,
        "coloresDisponibles": [
            {
                "stock": 2,
                "denominacionColor": "blanco",
                "color": "#ffffff"
            },
            {
                "denominacionColor": "rosa",
                "color": "#f2c0e7",
                "stock": 2
            }
        ],
        "categoria": "microfono",
        "precio": 25704,
        "marca": "baby rabit",
        "codigo": "6902024022096",
        "producto": "microfono parlante karaoke x6"
    },
    {
        "iva": 0,
        "cantidad": 2,
        "producto": "mouse inalambrico 4d",
        "categoria": "computacion",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 2,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "id": "iaCDzpnj6Cf3b9uJdfJ5",
        "marca": "high sensitivity",
        "margen": 80,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721510343789?alt=media&token=b177d7f5-f7a2-41de-ac22-599b20b149f1"
        ],
        "precio": 11480.203636363636,
        "codigo": "8201206261376",
        "imgUrlsRef": [
            "productos/1721510343789"
        ],
        "costo": 4.072727272727272
    },
    {
        "costo": 3.8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719520430569?alt=media&token=374a92d8-fcde-430c-a85d-6ce8242fd43d"
        ],
        "id": "zBO9mdhg1cTnTGM1vmkO",
        "iva": 0,
        "financiamiento": 8,
        "marca": "netmak",
        "cantidad": 2,
        "precio": 10711.44,
        "producto": "Mouse inalambrico pila m680",
        "margen": 80,
        "codigo": "0700306604611",
        "categoria": "computacion",
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "imgUrlsRef": [
            "productos/1719520430569"
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719520454527?alt=media&token=f9a69098-d453-4129-b2af-f2261e726bc5"
        ],
        "imgUrlsRef": [
            "productos/1719520454527"
        ],
        "id": "DqE5sPDvVWIfoOdwZFzn",
        "marca": "LTY",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 2
            }
        ],
        "categoria": "computacion",
        "margen": 80,
        "codigo": "6912352301152",
        "iva": 0,
        "financiamiento": 8,
        "costo": 4.608,
        "cantidad": 2,
        "precio": 12989.030400000001,
        "producto": "mouse inalambrico recargable"
    },
    {
        "categoria": "computacion",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719520467890?alt=media&token=baea9b5b-de98-495d-8dc4-ea01a028ce41"
        ],
        "producto": "mouse inalambrico recargable w90",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 2,
                "color": "#000000"
            }
        ],
        "id": "7QiwKjBJDkoa7865mx8G",
        "imgUrlsRef": [
            "productos/1719520467890"
        ],
        "codigo": "0700306602082",
        "marca": "netmak",
        "margen": 80,
        "iva": 0,
        "costo": 6.702545454545454,
        "precio": 18893.135127272726,
        "cantidad": 2
    },
    {
        "margen": 80,
        "producto": "mouse pad 90x40",
        "id": "8UIozsIGWE8httQXt5Ao",
        "costo": 3.1425454545454548,
        "marca": "yelandar",
        "categoria": "computacion",
        "imgUrlsRef": [
            "productos/1719522414031"
        ],
        "precio": 8858.207127272728,
        "cantidad": 2,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 2,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522414031?alt=media&token=1acdc284-d150-4047-9b62-94593a544cb0"
        ],
        "codigo": "6900750018260"
    },
    {
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522398769?alt=media&token=2c1b5554-7284-4e71-b918-acadedef054b"
        ],
        "iva": 0,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "costo": 1.4712727272727273,
        "margen": 100,
        "marca": "comfort pad",
        "cantidad": 1,
        "id": "DR5X30RnprBeLrVCVlp4",
        "codigo": "--",
        "precio": 4608.0261818181825,
        "categoria": "computacion",
        "imgUrlsRef": [
            "productos/1719522398769"
        ],
        "producto": "mouse pad comun"
    },
    {
        "iva": 0,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "costo": 1.4545454545454546,
        "categoria": "computacion",
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719522530717"
        ],
        "codigo": "6900750000456",
        "financiamiento": 8,
        "id": "1lsUJwOcuxJn4El9xkfa",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522530717?alt=media&token=99cd6675-d9ce-4876-8d96-8116cc3c60a7"
        ],
        "cantidad": 1,
        "producto": "mouse usb",
        "precio": 4555.636363636364,
        "marca": "jiexin"
    },
    {
        "categoria": "computacion",
        "iva": 0,
        "marca": "seisa",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719522517415"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522517415?alt=media&token=ed5bc808-d7ce-4447-a40d-d0a016647b01"
        ],
        "costo": 1.4545454545454546,
        "precio": 4555.636363636364,
        "cantidad": 1,
        "producto": "mouse usb dn-n512",
        "codigo": "6290132557754",
        "margen": 100,
        "id": "edSkvI478bjRKppHQaFX"
    },
    {
        "financiamiento": 8,
        "id": "WGusqP51rSz77rovyweo",
        "producto": "mouse usb gamer",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522445261?alt=media&token=c71c1e0f-2c25-4052-9be2-f03a3330ddfa"
        ],
        "marca": "legion",
        "iva": 0,
        "costo": 2.680727272727273,
        "margen": 100,
        "cantidad": 2,
        "codigo": "0700306602341",
        "categoria": "computacion",
        "precio": 8396.03781818182,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 2
            }
        ],
        "imgUrlsRef": [
            "productos/1719522445261"
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522472502?alt=media&token=eccf69f1-a9c7-4fcd-9dbd-e1344911a0a9"
        ],
        "margen": 100,
        "cantidad": 1,
        "categoria": "computacion",
        "imgUrlsRef": [
            "productos/1719522472502"
        ],
        "producto": "mouse usb gamer m20",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "iva": 0,
        "codigo": "6900750020102",
        "costo": 2.5454545454545454,
        "id": "LKxe9ZTWj515FKR3mjuW",
        "financiamiento": 8,
        "marca": "yelandar",
        "precio": 7972.363636363636
    },
    {
        "producto": "mouse usb kos-m0201",
        "imgUrlsRef": [
            "productos/1719522458041"
        ],
        "financiamiento": 8,
        "id": "qnKi6mTZbqhmnLqbIACs",
        "codigo": "7792391201014",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522458041?alt=media&token=7cfe062a-8d2c-45f7-961e-c583f5a127f1"
        ],
        "marca": "kosmo",
        "cantidad": 1,
        "precio": 9184.16290909091,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "categoria": "computacion",
        "iva": 0,
        "costo": 2.9323636363636365,
        "margen": 100
    },
    {
        "costo": 1.4545454545454546,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522508970?alt=media&token=defb5dc0-3f21-4831-8f60-f55c6576324d"
        ],
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719522508970"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "margen": 100,
        "id": "rTb1KXYdghHYhOiE682p",
        "financiamiento": 8,
        "marca": "gtc",
        "codigo": "8071011013411",
        "categoria": "computacion",
        "cantidad": 1,
        "producto": "mouse usb mog-107",
        "precio": 4555.636363636364
    },
    {
        "costo": 1.4545454545454546,
        "id": "1K5KmaBakFrGKOtH2cdf",
        "categoria": "computacion",
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "margen": 100,
        "codigo": "--",
        "producto": "mouse usb st100",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522500328?alt=media&token=8b6544ae-5398-40d5-9fa9-95a29f433863"
        ],
        "imgUrlsRef": [
            "productos/1719522500328"
        ],
        "marca": "st somostec",
        "iva": 0,
        "financiamiento": 8,
        "precio": 4555.636363636364
    },
    {
        "iva": 0,
        "categoria": "Cables",
        "codigo": "--",
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719522779676"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522779676?alt=media&token=aa39b8ee-9929-4a48-9528-88fc7e7130bd"
        ],
        "cantidad": 1,
        "marca": "note",
        "costo": 0.7843137254901961,
        "financiamiento": 8,
        "precio": 2456.4705882352946,
        "id": "TMeMu42K3RN2QjzYes1o",
        "producto": "muerde cable"
    },
    {
        "producto": "parlante 3\" bt-1302",
        "precio": 12744.392727272729,
        "cantidad": 1,
        "categoria": "parlantes",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525470590?alt=media&token=0eaef078-b6e1-418f-bcfc-14f33daa01f4"
        ],
        "margen": 100,
        "iva": 0,
        "marca": "bt speaker",
        "costo": 4.069090909090909,
        "financiamiento": 8,
        "codigo": "7895582155636",
        "imgUrlsRef": [
            "productos/1719525470590"
        ],
        "id": "QjeQpeG6KK3hdSOJ1Xwo"
    },
    {
        "cantidad": 1,
        "codigo": "--",
        "marca": "fantastic quality",
        "producto": "parlante 3\" gts-1360",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525480088?alt=media&token=13316b4e-c5f1-4e3d-9266-19456fe07071"
        ],
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "imgUrlsRef": [
            "productos/1719525480088"
        ],
        "iva": 0,
        "financiamiento": 8,
        "id": "YoEgM2Zw6oDvQ2t0ErNL",
        "precio": 15876.392727272729,
        "costo": 5.069090909090909,
        "categoria": "parlantes"
    },
    {
        "marca": "fantastic quality",
        "categoria": "parlantes",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525494767?alt=media&token=95dbb6f2-5f06-4f1d-9d87-d5346be4def1"
        ],
        "id": "1NgjhFP4vJ6zqnXnJ6TT",
        "imgUrlsRef": [
            "productos/1719525494767"
        ],
        "cantidad": 1,
        "iva": 0,
        "precio": 15876.392727272729,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "costo": 5.069090909090909,
        "margen": 100,
        "financiamiento": 8,
        "codigo": "--",
        "producto": "parlante 3\" gts-1373 led"
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525504770?alt=media&token=7ff95d98-55ad-4edb-aa9d-41f72c9cf3f9"
        ],
        "producto": "parlante 3\" lm-s330",
        "margen": 100,
        "codigo": "6970017856331",
        "imgUrlsRef": [
            "productos/1719525504770"
        ],
        "cantidad": 1,
        "costo": 5.069090909090909,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "id": "WlOr0ljl12bxCYpq9CNd",
        "marca": "portable speaker",
        "iva": 0,
        "categoria": "parlantes",
        "precio": 15876.392727272729
    },
    {
        "margen": 100,
        "producto": "parlante 3\" spiderman",
        "categoria": "parlantes",
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525554874?alt=media&token=66a3d55e-34a8-44f2-9e58-2644098fa4d7"
        ],
        "precio": 20955.927272727273,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "id": "wxmANfbHAqMDm52qdT8W",
        "cantidad": 1,
        "marca": "phantom",
        "imgUrlsRef": [
            "productos/1719525554874"
        ],
        "codigo": "--",
        "iva": 0,
        "costo": 6.6909090909090905
    },
    {
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "precio": 45556.36363636364,
        "cantidad": 2,
        "margen": 100,
        "marca": "okfly/fantastic quality",
        "iva": 0,
        "codigo": "--",
        "costo": 14.545454545454545,
        "producto": "parlante 6,5\"",
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719525798595"
        ],
        "id": "0VWjjmRQrsgWQi51VYC0",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525798595?alt=media&token=6aa9a0bd-cbb3-4583-b4d3-2fc697ccf23f"
        ],
        "categoria": "parlantes"
    },
    {
        "costo": 23.041454545454545,
        "precio": 72165.83563636364,
        "margen": 100,
        "id": "sAia9AyCf686wvx8LPei",
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719525833136"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525833136?alt=media&token=447ca76e-16d3-4496-8012-a8c2ed3fff66"
        ],
        "cantidad": 1,
        "codigo": "--",
        "iva": 0,
        "marca": "fantastic quality",
        "producto": "parlante 8\" con mic",
        "categoria": "parlantes"
    },
    {
        "producto": "parlante 8\" x 2",
        "marca": "fantastic quality",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525841273?alt=media&token=78b3ca4e-a610-4990-aed3-2c252666fd8e"
        ],
        "cantidad": 1,
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "categoria": "parlantes",
        "iva": 0,
        "precio": 153363.22036363638,
        "imgUrlsRef": [
            "productos/1719525841273"
        ],
        "codigo": "--",
        "financiamiento": 8,
        "costo": 48.966545454545454,
        "id": "kDZN2PwxF4V8yvMdQD0F"
    },
    {
        "costo": 7,
        "iva": 0,
        "producto": "parlante bluetooth go2",
        "marca": "jbl",
        "margen": 80,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721512402403?alt=media&token=48bd2a3a-798d-43f0-9a40-48a32b9ca06e"
        ],
        "categoria": "parlantes",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 3
            }
        ],
        "cantidad": 3,
        "id": "P9BbxLsYul6XMnmvrW5n",
        "imgUrlsRef": [
            "productos/1721512402403"
        ],
        "codigo": "--",
        "precio": 19731.600000000002,
        "financiamiento": 8
    },
    {
        "cantidad": 1,
        "precio": 36445.09090909091,
        "producto": "parlante lampara cargador inalambrico",
        "id": "2Yn1kG1mq5wtdYIvL10R",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "categoria": "parlantes",
        "costo": 11.636363636363637,
        "codigo": "6000051715660",
        "iva": 0,
        "marca": "led wireless charging speaker",
        "imgUrlsRef": [
            "productos/1719439329629"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719439329629?alt=media&token=a64486ef-6b8d-44a0-b541-b9c60279795f"
        ],
        "margen": 100
    },
    {
        "financiamiento": 8,
        "marca": "hytoshy",
        "codigo": "6973281283070",
        "costo": 13.47138047138047,
        "categoria": "Cargadores",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "cantidad": 1,
        "id": "rRkx8W8KTlAM9W9pPYyB",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721509700174?alt=media&token=63a2ad05-514d-472a-9209-d64b9256afbc"
        ],
        "producto": "parlante lampara cargador inalambrico bt-2307",
        "margen": 100,
        "imgUrlsRef": [
            "productos/1721509700174"
        ],
        "precio": 42192.36363636363
    },
    {
        "marca": "magic ball light",
        "precio": 21566.382545454548,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525739678?alt=media&token=4bad34ec-31f2-48e8-9ce8-58aa68f3a73b"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "margen": 100,
        "cantidad": 1,
        "codigo": "--",
        "iva": 0,
        "financiamiento": 8,
        "producto": "parlante led multicolor",
        "id": "12nfr9pxuUXKL4OzRzVQ",
        "categoria": "parlantes",
        "costo": 6.885818181818181,
        "imgUrlsRef": [
            "productos/1719525739678"
        ]
    },
    {
        "categoria": "parlantes",
        "codigo": "6000051715650",
        "marca": "--",
        "cantidad": 1,
        "margen": 100,
        "id": "OwmrZyOY8ZWn6Ecil7Kg",
        "imgUrlsRef": [
            "productos/1719525665448"
        ],
        "producto": "parlante microfono",
        "costo": 3.5614545454545454,
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525665448?alt=media&token=25b6158a-1c6b-4a8b-8e93-72c6f74e158b"
        ],
        "financiamiento": 8,
        "precio": 11154.475636363637,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ]
    },
    {
        "codigo": "--",
        "costo": 3.272727272727273,
        "imgUrlsRef": [
            "productos/1719525644071"
        ],
        "marca": "mini speaker",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525644071?alt=media&token=96491eee-ef9e-4761-9139-13582d2d2899"
        ],
        "iva": 0,
        "cantidad": 1,
        "financiamiento": 8,
        "producto": "parlante mini l59",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "categoria": "parlantes",
        "id": "5Kx8iqqcJuPi3HwRaxZA",
        "precio": 10250.18181818182,
        "margen": 100
    },
    {
        "imgUrlsRef": [
            "productos/1719525851222",
            "productos/1719525786068"
        ],
        "id": "wpZq2YP6iyM2YkDziqhl",
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525851222?alt=media&token=24d3456c-b490-42b3-8742-c3e95f2e58e1",
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525786068?alt=media&token=0510bb3a-c30a-411c-a5e9-e6aea52ea7fe"
        ],
        "financiamiento": 8,
        "costo": 12.149090909090908,
        "producto": "parlante par-200",
        "codigo": "--",
        "iva": 0,
        "categoria": "parlantes",
        "marca": "inova",
        "precio": 38050.95272727273
    },
    {
        "codigo": "0700306602280",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525704853?alt=media&token=ab207659-4c56-44d7-8970-dd6ca9862b95"
        ],
        "financiamiento": 8,
        "categoria": "parlantes",
        "id": "YaNUva9bP40t31UE5Xup",
        "imgUrlsRef": [
            "productos/1719525704853"
        ],
        "costo": 4.7272727272727275,
        "precio": 14805.818181818184,
        "producto": "parlante pc",
        "iva": 0,
        "margen": 100,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "marca": "netmak",
        "cantidad": 1
    },
    {
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719954047529?alt=media&token=31c93832-ad41-4e92-9ac0-c7e33a959ef3"
        ],
        "margen": 100,
        "producto": "parlante retroiluminado trueno",
        "codigo": "0700306602310",
        "categoria": "parlantes",
        "cantidad": 2,
        "precio": 28574.64,
        "imgUrlsRef": [
            "productos/1719954047529"
        ],
        "marca": "netmak",
        "id": "W2GMdKgCHjDvwOkijsyQ",
        "coloresDisponibles": [
            {
                "stock": 2,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "costo": 9.123448275862069,
        "financiamiento": 8
    },
    {
        "imgUrlsRef": [
            "productos/1719525722355"
        ],
        "financiamiento": 8,
        "precio": 14805.818181818184,
        "iva": 0,
        "marca": "--",
        "codigo": "--",
        "id": "hzVMM4MhMAlaRD8nEhap",
        "margen": 100,
        "producto": "parlante tipo airpod",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719525722355?alt=media&token=2522edee-a561-4f06-8b83-389c4a79fe8f"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "categoria": "parlantes",
        "cantidad": 1,
        "costo": 4.7272727272727275
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719238770231?alt=media&token=38f03876-1707-4acf-8583-562041408dc5"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "codigo": "0700306602563",
        "categoria": "hogar",
        "marca": "netmak",
        "imgUrlsRef": [
            "productos/1719238770231"
        ],
        "financiamiento": 8,
        "cantidad": 1,
        "costo": 8.279245283018868,
        "precio": 25930.596226415095,
        "margen": 100,
        "iva": 0,
        "producto": "Pava electrica 1.8lts",
        "id": "fTdm9GBlcgIuro3S5BNs"
    },
    {
        "producto": "pava electrica 2lts",
        "coloresDisponibles": [
            {
                "stock": 2,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "categoria": "hogar",
        "costo": 10.279245283018868,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719238720797?alt=media&token=19f893a3-6e40-44f2-b997-7c4bfd77b04d"
        ],
        "marca": "ibek",
        "margen": 100,
        "cantidad": 2,
        "imgUrlsRef": [
            "productos/1719238720797"
        ],
        "precio": 32194.596226415095,
        "codigo": "--",
        "iva": 0,
        "id": "zvZPQz538h17c7apEVq9",
        "financiamiento": 8
    },
    {
        "financiamiento": 8,
        "producto": "Pava electrica 2lts",
        "iva": 0,
        "marca": "starvision",
        "margen": 100,
        "precio": 34558.36981132076,
        "coloresDisponibles": [
            {
                "stock": 2,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "cantidad": 2,
        "categoria": "hogar",
        "codigo": "4711198456147",
        "id": "XttCa2AtsPLWqiYb3VTp",
        "imgUrlsRef": [
            "productos/1719238751326"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719238751326?alt=media&token=e515b9fb-5783-4ac0-9d2f-1bcc621e247d"
        ],
        "costo": 11.033962264150944
    },
    {
        "iva": 0,
        "codigo": "--",
        "marca": "sandisk",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526163186?alt=media&token=856c0af6-7713-4cef-9403-a621ce517dc3"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "precio": 26636.80581818182,
        "categoria": "memorias y pendrives",
        "financiamiento": 8,
        "cantidad": 1,
        "margen": 100,
        "producto": "pendrive 128gb",
        "id": "VsJd1dDHVJL2bY1E5BA9",
        "imgUrlsRef": [
            "productos/1719526163186"
        ],
        "costo": 8.504727272727273
    },
    {
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526120845?alt=media&token=5b009e06-a3fe-4231-95ca-899947d19235"
        ],
        "cantidad": 1,
        "imgUrlsRef": [
            "productos/1719526120845"
        ],
        "categoria": "memorias y pendrives",
        "id": "cFaerTTkziNtgrPDbXBu",
        "precio": 13666.909090909092,
        "marca": "sandisk",
        "margen": 100,
        "producto": "pendrive 16gb",
        "codigo": "--",
        "iva": 0,
        "costo": 4.363636363636363,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ]
    },
    {
        "iva": 0,
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526142226?alt=media&token=ad84c2b5-6f37-4df7-ad95-c86d7ef548e6"
        ],
        "imgUrlsRef": [
            "productos/1719526142226"
        ],
        "id": "SLg6PGVkMUrEV1I9xJhA",
        "categoria": "memorias y pendrives",
        "codigo": "--",
        "producto": "pendrive 32gb",
        "marca": "sandisk",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "costo": 4.942758620689655,
        "precio": 15480.72,
        "margen": 100,
        "cantidad": 1
    },
    {
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526156362?alt=media&token=a5f2688e-d925-4856-851a-fb441d5e584b"
        ],
        "marca": "sandisk",
        "cantidad": 1,
        "margen": 100,
        "producto": "pendrive 64gb",
        "id": "pbG3nJ5tywGR2dF7ZHsp",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "costo": 5.431724137931035,
        "precio": 17012.16,
        "imgUrlsRef": [
            "productos/1719526156362"
        ],
        "codigo": "--",
        "financiamiento": 8,
        "categoria": "memorias y pendrives"
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
        "precio": 1018.1847272727274,
        "iva": 0,
        "marca": "netmak/lithium",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526261732?alt=media&token=c218fcb1-5da3-4c03-8e18-e8483b69854e"
        ],
        "producto": "pila cr2032",
        "categoria": "pilas",
        "costo": 0.3250909090909091,
        "id": "ih6Gx1WI3TBIyxGgw0NX",
        "imgUrlsRef": [
            "productos/1719526261732"
        ],
        "margen": 100,
        "financiamiento": 8
    },
    {
        "marca": "star vision",
        "margen": 100,
        "costo": 0.22836363636363635,
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526237202?alt=media&token=44256dfd-8fd8-45ec-bc74-28e62f625d0c"
        ],
        "id": "Zw0LhyFHd79erC47eoEK",
        "iva": 0,
        "cantidad": 1,
        "categoria": "pilas",
        "producto": "pila economica AA",
        "imgUrlsRef": [
            "productos/1719526237202"
        ],
        "codigo": "--",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "precio": 715.2349090909091
    },
    {
        "id": "qoOGVGJy2oIGWX9hlK1C",
        "categoria": "pilas",
        "precio": 487.4530909090909,
        "codigo": "--",
        "costo": 0.15563636363636363,
        "producto": "pila economica AAA",
        "margen": 100,
        "iva": 0,
        "cantidad": 1,
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526206747?alt=media&token=8d884a58-4b03-4d3b-b9fe-420f52cd538d"
        ],
        "marca": "star vision",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "imgUrlsRef": [
            "productos/1719526206747"
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052591157?alt=media&token=48e953fc-c1e5-4e61-a5ff-5b12de0ebca9"
        ],
        "categoria": "pilas",
        "marca": "soda alkaline battery",
        "margen": 100,
        "costo": 1.2660130718954248,
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "id": "u2pIy1X708wZZuYag4JO",
        "iva": 0,
        "imgUrlsRef": [
            "productos/1721052591157"
        ],
        "codigo": "6927799692824",
        "producto": "pila lr41",
        "financiamiento": 8,
        "precio": 3965.1529411764704
    },
    {
        "marca": "tmi alkaline battery",
        "codigo": "6998817810131",
        "producto": "pila lr44",
        "id": "fi8XF1V6RWQMc3BvAyit",
        "imgUrlsRef": [
            "productos/1721052610726"
        ],
        "iva": 0,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "margen": 100,
        "financiamiento": 8,
        "precio": 3965.1529411764704,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721052610726?alt=media&token=fe6043a2-822f-4b5c-a6fb-119f6d700f36"
        ],
        "costo": 1.2660130718954248,
        "categoria": "pilas",
        "cantidad": 1
    },
    {
        "categoria": "pilas",
        "precio": 14605.370181818182,
        "marca": "netmak",
        "costo": 4.6632727272727275,
        "financiamiento": 8,
        "codigo": "--",
        "iva": 0,
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719526313474"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526313474?alt=media&token=8be28a2c-6f66-4c55-a8d4-996865b01736"
        ],
        "producto": "pila recargable AA",
        "cantidad": 1,
        "id": "ZW5oGPFDe2RXM4SZObRO"
    },
    {
        "imgUrlsRef": [
            "productos/1719526292931"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719526292931?alt=media&token=65cbd544-8f5f-4080-add2-d6a260f8d306"
        ],
        "categoria": "pilas",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "costo": 2.9403636363636365,
        "precio": 9209.21890909091,
        "id": "o6WNIZJRUDkwm3tWGoPI",
        "iva": 0,
        "marca": "netmak",
        "financiamiento": 8,
        "codigo": "--",
        "margen": 100,
        "cantidad": 1,
        "producto": "pila recargable AAA"
    },
    {
        "precio": 8655.709090909091,
        "marca": "LCD writing tablet",
        "margen": 100,
        "costo": 2.7636363636363637,
        "imgUrlsRef": [
            "productos/1719582710760"
        ],
        "categoria": "hogar",
        "iva": 0,
        "id": "tuUUx8PWWSd83rNkxx4Y",
        "financiamiento": 8,
        "codigo": "--",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "producto": "pizarra magica 10\"",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582710760?alt=media&token=cee28a27-dbd8-4261-b8cb-1be1195f23c5"
        ],
        "cantidad": 1
    },
    {
        "margen": 100,
        "codigo": "--",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "costo": 2.1020689655172413,
        "marca": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582792375?alt=media&token=931cdb61-6c31-4f6d-b28b-5ac13dddbf9b"
        ],
        "id": "q89BcnentOjdCWjhDYMb",
        "categoria": "hogar",
        "producto": "pizarra magica 8,5\"",
        "financiamiento": 8,
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719582792375"
        ],
        "precio": 6583.68,
        "cantidad": 1
    },
    {
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "iva": 0,
        "costo": 2.962962962962963,
        "marca": "netmak",
        "cantidad": 1,
        "producto": "placa de sonido pc",
        "imgUrlsRef": [
            "productos/1721510404253"
        ],
        "id": "pVqnySJ1EQKPd6Z0Cukh",
        "precio": 9280,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721510404253?alt=media&token=909f1276-4bbc-46b7-a72e-adc0cdd415a8"
        ],
        "categoria": "computacion",
        "codigo": "--"
    },
    {
        "marca": "make time",
        "costo": 1.8867924528301887,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            },
            {
                "stock": 1,
                "color": "#efcaff",
                "denominacionColor": "lila"
            }
        ],
        "codigo": "7897255820193",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719076365038?alt=media&token=7d8cddb8-ffad-4c9e-9d42-ec508abe82f6"
        ],
        "financiamiento": 8,
        "iva": 0,
        "producto": "planchita mini",
        "precio": 5909.433962264151,
        "imgUrlsRef": [
            "productos/1719076365038"
        ],
        "margen": 100,
        "id": "qgBYjQ0PoRh4Nmxt9xPa",
        "categoria": "hogar",
        "cantidad": 2
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582426058?alt=media&token=e4a0f287-ef75-4b35-ac99-f992164ace4c"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "categoria": "hogar",
        "imgUrlsRef": [
            "productos/1719582426058"
        ],
        "margen": 100,
        "iva": 0,
        "cantidad": 1,
        "codigo": "6910219208682",
        "id": "QygXMTKCQTGRm8ylcoL7",
        "producto": "planchita nv-868",
        "financiamiento": 8,
        "marca": "hytoshy",
        "costo": 6.866909090909091,
        "precio": 21507.159272727273
    },
    {
        "codigo": "6950999800157",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "producto": "planchita sx-8006",
        "iva": 0,
        "categoria": "hogar",
        "imgUrlsRef": [
            "productos/1719582446885"
        ],
        "financiamiento": 8,
        "costo": 3.0545454545454547,
        "margen": 100,
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582446885?alt=media&token=1587a466-4597-4cd5-9000-d10ddf40e63f"
        ],
        "id": "QgjjtJw9rJiUijMpsAkn",
        "precio": 9566.836363636365,
        "marca": "new nova"
    },
    {
        "costo": 8.145454545454545,
        "id": "MMjB4SyFGcMnrOuGnfdu",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582566803?alt=media&token=6373ecad-afcf-4be4-be7a-926b316d8bfe"
        ],
        "imgUrlsRef": [
            "productos/1719582566803"
        ],
        "cantidad": 1,
        "financiamiento": 8,
        "categoria": "smartwatch",
        "producto": "reloj 7 t900 pro max",
        "margen": 100,
        "marca": "watch",
        "codigo": "695985602308",
        "precio": 25511.563636363633,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ]
    },
    {
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582607888?alt=media&token=5476c290-ddc0-4cb6-9e66-29a8ae81b20f"
        ],
        "precio": 34167.27272727273,
        "marca": "laxasfit",
        "imgUrlsRef": [
            "productos/1719582607888"
        ],
        "financiamiento": 8,
        "codigo": "--",
        "categoria": "smartwatch",
        "id": "Zmd7MjtqLXed9ga9P7Gy",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "costo": 10.909090909090908,
        "iva": 0,
        "producto": "reloj i9 ultra max",
        "cantidad": 1
    },
    {
        "marca": "hiwatch pro",
        "margen": 100,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 10
            }
        ],
        "financiamiento": 8,
        "iva": 0,
        "stockTotal": 10,
        "costo": 8.96551724137931,
        "id": "ZgqosWXv2M0PRmlAQmWJ",
        "codigo": "6902024022317",
        "producto": "reloj i9 ultramax",
        "categoria": "smartwatch",
        "precio": 28080.000000000004
    },
    {
        "producto": "reloj m5/m6",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582559270?alt=media&token=6d3b33bc-6d86-425e-9948-08bc100c1b25"
        ],
        "imgUrlsRef": [
            "productos/1719582559270"
        ],
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "id": "W43q11ZweuDDHf8xRPO0",
        "marca": "smart band",
        "financiamiento": 8,
        "codigo": "6959856022001",
        "costo": 4,
        "cantidad": 1,
        "categoria": "smartwatch",
        "precio": 12528,
        "iva": 0
    },
    {
        "id": "SXvLFUFy7BkNenMjk48v",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719075454977?alt=media&token=1c934fcf-8b57-492c-9c56-bb0efd2f4d09"
        ],
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719075454977"
        ],
        "cantidad": 2,
        "codigo": "--",
        "coloresDisponibles": [
            {
                "stock": 2,
                "denominacionColor": "Negro",
                "color": "#858585"
            }
        ],
        "marca": "hiwatch pro",
        "iva": 0,
        "costo": 11.018867924528301,
        "producto": "reloj t800 ultra 49mm",
        "financiamiento": 8,
        "precio": 34511.09433962264,
        "categoria": "smartwatch"
    },
    {
        "precio": 34511.09433962264,
        "marca": "hiwatch pro",
        "coloresDisponibles": [
            {
                "stock": 2,
                "denominacionColor": "Negro",
                "color": "#ff6a00"
            }
        ],
        "costo": 11.018867924528301,
        "categoria": "smartwatch",
        "margen": 100,
        "id": "5dXh7i1LItCoJzBw0cmE",
        "codigo": "--",
        "cantidad": 2,
        "imgUrlsRef": [
            "productos/1719075527374"
        ],
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719075527374?alt=media&token=5f9b61d8-04ae-496b-b021-262c501a522c"
        ],
        "iva": 0,
        "producto": "reloj t900 ultra 49mm"
    },
    {
        "id": "QoNynEZQHApBRQjkobab",
        "imgUrlsRef": [
            "productos/1719582593506"
        ],
        "costo": 8.145454545454545,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "precio": 25511.563636363633,
        "cantidad": 1,
        "marca": "leading a healthy lifestyle",
        "margen": 100,
        "categoria": "smartwatch",
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582593506?alt=media&token=0ac5ba9a-b475-4f18-8a40-ebcd96b10df9"
        ],
        "financiamiento": 8,
        "producto": "reloj w26+",
        "iva": 0
    },
    {
        "precio": 26456.85818181818,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "margen": 80,
        "categoria": "hogar",
        "producto": "repetidor de wifi",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1721510300985?alt=media&token=8722142f-86d2-4df0-b5d8-b986602fda57"
        ],
        "imgUrlsRef": [
            "productos/1721510300985"
        ],
        "iva": 0,
        "cantidad": 1,
        "marca": "repeater",
        "id": "U4ipKoNZDVdKa54vskqM",
        "codigo": "6921021201211",
        "costo": 9.385858585858585
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719267741426?alt=media&token=38ad4cb6-3dfa-4f7d-8cab-9f2e68178870"
        ],
        "financiamiento": 8,
        "producto": "retro games tetris",
        "categoria": "consolas",
        "cantidad": 5,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 5
            }
        ],
        "iva": 0,
        "marca": "netmak",
        "codigo": "0700306603317",
        "costo": 2.550943396226415,
        "precio": 7989.5547169811325,
        "imgUrlsRef": [
            "productos/1719267741426"
        ],
        "margen": 100,
        "id": "uZiCBNPWTRRh4E7aOme6"
    },
    {
        "marca": "ringo",
        "categoria": "smartwatch",
        "producto": "ringo",
        "financiamiento": 8,
        "codigo": "7798346720012",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582531482?alt=media&token=da304d03-874a-4e4c-ab27-21b5622b0697"
        ],
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "id": "N0hBquPbZMvTJWHhQRhN",
        "imgUrlsRef": [
            "productos/1719582531482"
        ],
        "margen": 100,
        "costo": 0.8,
        "precio": 2505.6000000000004
    },
    {
        "categoria": "smartwatch",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "precio": 20552.753454545455,
        "financiamiento": 8,
        "id": "TJSVcr16b1k5L0pp0JiP",
        "imgUrlsRef": [
            "productos/1719582352386"
        ],
        "cantidad": 1,
        "marca": "remington",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582352386?alt=media&token=f0f618bf-3c29-4d30-b731-091148af2a52"
        ],
        "producto": "secador de pelo",
        "codigo": "6985214720330",
        "margen": 100,
        "costo": 6.562181818181818
    },
    {
        "producto": "secador de pelo",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582381684?alt=media&token=97267fd9-6684-4d1c-a508-f6b39ac6970f"
        ],
        "costo": 7.540363636363637,
        "marca": "imega",
        "id": "Z3Ws3EeN1lxbwIhFxWkC",
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719582381684"
        ],
        "categoria": "smartwatch",
        "cantidad": 1,
        "codigo": "6985854822913",
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "margen": 100,
        "precio": 23616.41890909091
    },
    {
        "imgUrlsRef": [
            "productos/1719582362220"
        ],
        "financiamiento": 8,
        "marca": "hytoshy",
        "id": "h8qia7AezGxETLA6oUL1",
        "producto": "secador de pelo",
        "margen": 100,
        "iva": 0,
        "codigo": "1000804028070",
        "cantidad": 1,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "categoria": "smartwatch",
        "precio": 20552.753454545455,
        "costo": 6.562181818181818,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719582362220?alt=media&token=7197f6c5-5bff-448d-8085-604daab0680e"
        ]
    },
    {
        "categoria": "soportes",
        "producto": "soporte auricular con mueca",
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584225133?alt=media&token=7b13f235-d063-4aa8-92c1-f62f23ac46a9"
        ],
        "marca": "--",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719584225133"
        ],
        "codigo": "6900750016853",
        "precio": 1025.0181818181818,
        "margen": 100,
        "cantidad": 1,
        "costo": 0.32727272727272727,
        "id": "zEb3kbG32VxMOaAdXNGP"
    },
    {
        "cantidad": 1,
        "costo": 1.1774545454545455,
        "marca": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584174274?alt=media&token=900186e7-e814-4bb1-a832-18e6bf47416c"
        ],
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719584174274"
        ],
        "codigo": "--",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "iva": 0,
        "precio": 3687.7876363636365,
        "producto": "soporte brazal deportivo",
        "categoria": "soportes",
        "id": "Vx3nCDWZwSjbiWNGKtWZ",
        "margen": 100
    },
    {
        "id": "8ST0UxtAuEVnSlFClkpI",
        "imgUrlsRef": [
            "productos/1719584436843"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "codigo": "--",
        "categoria": "soportes",
        "margen": 100,
        "producto": "soporte de auto aire",
        "precio": 6833.454545454546,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584436843?alt=media&token=2e2a0d0e-053f-4850-b889-da6bdcd61c19"
        ],
        "marca": "inova",
        "cantidad": 1,
        "financiamiento": 8,
        "iva": 0,
        "costo": 2.1818181818181817
    },
    {
        "id": "npLn9CZOd5m2yLhUEqTh",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "codigo": "0700306604390",
        "producto": "soporte de auto retrovisor",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584162149?alt=media&token=a7026268-fc48-4180-a868-c6f99d6208c0"
        ],
        "cantidad": 1,
        "costo": 3.7701818181818183,
        "iva": 0,
        "financiamiento": 8,
        "marca": "netmak",
        "imgUrlsRef": [
            "productos/1719584162149"
        ],
        "precio": 11808.209454545455,
        "categoria": "soportes",
        "margen": 100
    },
    {
        "codigo": "--",
        "costo": 4.021090909090909,
        "marca": "on the road, for riding",
        "producto": "soporte de bicicleta con funda XL impermeable",
        "precio": 12594.056727272728,
        "iva": 0,
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "categoria": "soportes",
        "financiamiento": 8,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719349178043?alt=media&token=06f448eb-7c4c-4b3c-ad6b-80124add2bb3"
        ],
        "imgUrlsRef": [
            "productos/1719349178043"
        ],
        "id": "6MVEX15AVMYK5xI4XeQp",
        "margen": 100,
        "cantidad": 1
    },
    {
        "financiamiento": 8,
        "cantidad": 1,
        "codigo": "22000308000015",
        "margen": 100,
        "marca": "weather resistant bike mount",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719349200159?alt=media&token=930115d9-17a9-4006-973b-4e439c570666"
        ],
        "costo": 4.021090909090909,
        "precio": 12594.056727272728,
        "id": "ju6RPgNNnSfNzwWxgckn",
        "producto": "soporte de bicicleta con funda XL impermeable",
        "imgUrlsRef": [
            "productos/1719349200159"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "Negro",
                "stock": 1
            }
        ],
        "categoria": "soportes"
    },
    {
        "iva": 0,
        "categoria": "soportes",
        "imgUrlsRef": [
            "productos/1719954018608"
        ],
        "costo": 2.8137931034482757,
        "producto": "soporte de moto lx-02",
        "id": "LFQzNqXW0w6rUNlLk4N7",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 3
            }
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719954018608?alt=media&token=b0e8812c-94b7-40e2-919b-1293e9e82324"
        ],
        "marca": "outdoor riding essential",
        "cantidad": 3,
        "precio": 8812.8,
        "financiamiento": 8,
        "margen": 100,
        "codigo": "7799145017570"
    },
    {
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "categoria": "soportes",
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584128637?alt=media&token=c70404d5-f3c6-4fc4-928f-bbcd5b0f6403"
        ],
        "producto": "soporte de tv 14 a 42\"",
        "iva": 0,
        "costo": 5.803636363636364,
        "imgUrlsRef": [
            "productos/1719584128637"
        ],
        "cantidad": 1,
        "id": "qurIV0qoTT1ArzZD7wm8",
        "codigo": "--",
        "marca": "madison",
        "precio": 18176.98909090909
    },
    {
        "marca": "madison",
        "codigo": "--",
        "iva": 0,
        "costo": 6.530909090909091,
        "id": "UXWK9mf4gBpGfXqNWs97",
        "precio": 20454.807272727274,
        "financiamiento": 8,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584107273?alt=media&token=1fc06a77-891c-4f5a-ad5d-667dbc3aaeaa"
        ],
        "cantidad": 1,
        "producto": "soporte de tv 26 a 63\"",
        "categoria": "soportes",
        "imgUrlsRef": [
            "productos/1719584107273"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ]
    },
    {
        "margen": 100,
        "costo": 0.6472727272727272,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "marca": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584186321?alt=media&token=13ab8885-ee10-40a6-8798-8e59d73bb0ac"
        ],
        "imgUrlsRef": [
            "productos/1719584186321"
        ],
        "id": "Xurzs3Tm44M9FPtYgDju",
        "producto": "soporte manito",
        "codigo": "--",
        "precio": 2027.2581818181818,
        "iva": 0,
        "categoria": "soportes",
        "cantidad": 1
    },
    {
        "codigo": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244448576?alt=media&token=acc3a161-fadd-41db-8b59-f8f3006fe323"
        ],
        "categoria": "soportes",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "iva": 0,
        "precio": 10046.037735849059,
        "id": "FX6yCxboEnyxWi6ucJfI",
        "margen": 100,
        "producto": "soporte para auto",
        "cantidad": 1,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719244448576"
        ],
        "costo": 3.207547169811321,
        "marca": "iglufive"
    },
    {
        "precio": 9184.16290909091,
        "costo": 2.9323636363636365,
        "producto": "soporte para bicicleta",
        "id": "i7075uvbkXFKubPCDMkz",
        "marca": "grc",
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "Negro",
                "color": "#000000"
            }
        ],
        "categoria": "soportes",
        "iva": 0,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719588464443?alt=media&token=de37336f-aa8e-4a01-9ba0-d4e962c3949e"
        ],
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719588464443"
        ],
        "codigo": "8072020042614",
        "cantidad": 1
    },
    {
        "marca": "--",
        "codigo": "--",
        "categoria": "soportes",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719584202594?alt=media&token=0d481d35-a6d4-4bde-a600-12872fc7b8d4"
        ],
        "imgUrlsRef": [
            "productos/1719584202594"
        ],
        "producto": "soporte plegable",
        "costo": 0.4290909090909091,
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "precio": 1343.9127272727274,
        "margen": 100,
        "iva": 0,
        "cantidad": 1,
        "financiamiento": 8,
        "id": "p7dZS5J1hFSVzgEbsYUG"
    },
    {
        "margen": 100,
        "costo": 3.1425454545454548,
        "iva": 0,
        "categoria": "computacion",
        "imgUrlsRef": [
            "productos/1719522759524"
        ],
        "id": "aftomyeTWk2GqaTvHdA8",
        "marca": "pad laptop stand",
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719522759524?alt=media&token=07760fc9-529f-4eaa-9b0e-e0f581743e32"
        ],
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "producto": "soporte tablet o notebook",
        "financiamiento": 8,
        "codigo": "6985745212113",
        "precio": 9842.452363636365
    },
    {
        "precio": 34114.88290909091,
        "categoria": "computacion",
        "producto": "teclado 3 en 1 inalambrico",
        "id": "Tm2quyZ9Mp9ZH71wTjDX",
        "costo": 10.892363636363637,
        "financiamiento": 8,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585679692?alt=media&token=20bf7db5-ded6-4338-8311-8cddae4ea103"
        ],
        "marca": "gtc",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "Negro"
            }
        ],
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719585679692"
        ],
        "cantidad": 1,
        "codigo": "--"
    },
    {
        "marca": "yelandar",
        "margen": 100,
        "iva": 0,
        "codigo": "6902022085000",
        "cantidad": 1,
        "precio": 38495.12727272727,
        "id": "o0SuR7UOHMQ66M2Gp2kf",
        "financiamiento": 8,
        "costo": 12.290909090909091,
        "producto": "teclado 5 en 1 gamer",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585796002?alt=media&token=c0ecda05-adb8-4759-9f6e-d771542b3166"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "imgUrlsRef": [
            "productos/1719585796002"
        ],
        "categoria": "computacion"
    },
    {
        "iva": 0,
        "categoria": "computacion",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "producto": "teclado kos-kd620",
        "cantidad": 1,
        "marca": "kosmo",
        "financiamiento": 8,
        "margen": 100,
        "precio": 15744.279272727274,
        "imgUrlsRef": [
            "productos/1719585752901"
        ],
        "costo": 5.026909090909091,
        "id": "kTAuBrUu3uwSFWnWwQVN",
        "codigo": "7792391620075",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585752901?alt=media&token=60b05327-2cc6-4aa9-8e12-0007e1db2b84"
        ]
    },
    {
        "marca": "kosmo",
        "categoria": "computacion",
        "codigo": "--",
        "imgUrlsRef": [
            "productos/1719585779332"
        ],
        "producto": "teclado kos-tec2",
        "cantidad": 1,
        "precio": 23545.806545454547,
        "id": "sWkaz79HJMGVaD4xBlYo",
        "iva": 0,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585779332?alt=media&token=fa6c993e-8509-42ef-b836-746d0c359649"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "margen": 100,
        "costo": 7.517818181818182
    },
    {
        "categoria": "computacion",
        "codigo": "--",
        "marca": "backlit",
        "financiamiento": 8,
        "id": "s9s30CnxIPVPhxVEqMtN",
        "producto": "teclado mini",
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 2
            }
        ],
        "precio": 18872.131924528305,
        "iva": 0,
        "cantidad": 2,
        "imgUrlsRef": [
            "productos/1719075035539"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719075035539?alt=media&token=7b77f78c-9daf-4396-bbfc-d420020a123f"
        ],
        "costo": 6.695094339622641,
        "margen": 80
    },
    {
        "margen": 100,
        "coloresDisponibles": [
            {
                "denominacionColor": "Negro",
                "color": "#000000",
                "stock": 3
            }
        ],
        "codigo": "8072017071429",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585672752?alt=media&token=0d924300-c5c9-410a-b305-0540dce5d4a0"
        ],
        "iva": 0,
        "precio": 11818.867924528302,
        "imgUrlsRef": [
            "productos/1719585672752"
        ],
        "categoria": "computacion",
        "cantidad": 3,
        "financiamiento": 8,
        "id": "MkH4qlX82dIqZ7H2K0dr",
        "marca": "gtc",
        "producto": "teclado usb",
        "costo": 3.7735849056603774
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585740537?alt=media&token=b1852745-c4d4-4d28-93d5-ee7bfc9bb099"
        ],
        "id": "wRS2hMoCFBPXuZqx0Zvy",
        "iva": 0,
        "cantidad": 1,
        "producto": "teclado usb nm-kb586u",
        "financiamiento": 8,
        "margen": 100,
        "codigo": "0700306601221",
        "coloresDisponibles": [
            {
                "stock": 1,
                "color": "#000000",
                "denominacionColor": "negro"
            }
        ],
        "categoria": "computacion",
        "imgUrlsRef": [
            "productos/1719585740537"
        ],
        "marca": "netmal",
        "precio": 11389.09090909091,
        "costo": 3.6363636363636362
    },
    {
        "cantidad": 1,
        "margen": 100,
        "costo": 2.909090909090909,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719585692327?alt=media&token=7fc60237-3c3e-4f22-85ef-1b51bf403d10"
        ],
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "negro",
                "color": "#000000"
            }
        ],
        "financiamiento": 8,
        "marca": "inova",
        "categoria": "computacion",
        "producto": "teclado usb tec-002",
        "precio": 9111.272727272728,
        "id": "0YKsXjtoseRhY1RWaWSd",
        "iva": 0,
        "codigo": "7798318657889",
        "imgUrlsRef": [
            "productos/1719585692327"
        ]
    },
    {
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586776718?alt=media&token=c5710a07-dbbe-43fb-9c0b-7a9950d34b5d"
        ],
        "costo": 12.781818181818181,
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "blanco",
                "color": "#ffffff"
            },
            {
                "color": "#2e063d",
                "denominacionColor": "violeta",
                "stock": 1
            }
        ],
        "marca": "bigstar",
        "iva": 0,
        "producto": "termo 1,2lts",
        "categoria": "hogar",
        "cantidad": 2,
        "financiamiento": 8,
        "id": "KRIhBtU2mMNLFXKVfWyq",
        "margen": 100,
        "imgUrlsRef": [
            "productos/1719586776718"
        ],
        "precio": 40032.65454545454,
        "codigo": "--"
    },
    {
        "categoria": "Cargadores",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719244163780?alt=media&token=05377794-74e0-4d32-bcf5-3f228a0a46f7"
        ],
        "producto": "toma 12v moto encendedor puerto usb",
        "costo": 3.3962264150943398,
        "precio": 10636.981132075472,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "Negro"
            }
        ],
        "cantidad": 1,
        "iva": 0,
        "marca": "netpor",
        "margen": 100,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719244163780"
        ],
        "id": "MWra919rIzuWK0bUavTf",
        "codigo": "6900750016051"
    },
    {
        "imgUrlsRef": [
            "productos/1719586539340"
        ],
        "iva": 0,
        "id": "qzwt5nQNc1n2veygY8jX",
        "codigo": "--",
        "producto": "tripode 1mt",
        "cantidad": 1,
        "financiamiento": 8,
        "coloresDisponibles": [
            {
                "color": "#000000",
                "denominacionColor": "negro",
                "stock": 1
            }
        ],
        "precio": 8997.381818181819,
        "costo": 2.8727272727272726,
        "categoria": "soportes",
        "marca": "--",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586539340?alt=media&token=e9c3429d-e735-4a28-ae0f-cc6de32f7f2b"
        ],
        "margen": 100
    },
    {
        "imgUrlsRef": [
            "productos/1719586549652"
        ],
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586549652?alt=media&token=070d86a3-63bc-4823-8c9a-e31a12673f98"
        ],
        "marca": "--",
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "stock": 1,
                "color": "#000000"
            }
        ],
        "costo": 3.6,
        "financiamiento": 8,
        "cantidad": 1,
        "categoria": "soportes",
        "codigo": "--",
        "margen": 100,
        "iva": 0,
        "producto": "tripode 2mts",
        "precio": 11275.2,
        "id": "7mBcZlfq7UyxIoboaFsK"
    },
    {
        "codigo": "6959856023388",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586562162?alt=media&token=85c95f0d-d86e-4c9b-999c-669a0f01b2c0"
        ],
        "coloresDisponibles": [
            {
                "denominacionColor": "negro",
                "color": "#000000",
                "stock": 1
            }
        ],
        "precio": 4100.072727272727,
        "imgUrlsRef": [
            "productos/1719586562162"
        ],
        "producto": "tripode articulable",
        "marca": "selfie flexi pod",
        "categoria": "soportes",
        "financiamiento": 8,
        "margen": 100,
        "costo": 1.309090909090909,
        "iva": 0,
        "cantidad": 1,
        "id": "8zdfBCpusMs0L7VMDLsa"
    },
    {
        "codigo": "--",
        "financiamiento": 8,
        "cantidad": 1,
        "iva": 0,
        "imgUrlsRef": [
            "productos/1719586553519"
        ],
        "margen": 100,
        "precio": 9566.836363636365,
        "costo": 3.0545454545454547,
        "producto": "tripode con control bluetooth",
        "categoria": "soportes",
        "coloresDisponibles": [
            {
                "color": "#000000",
                "stock": 1,
                "denominacionColor": "negro"
            }
        ],
        "marca": "k07",
        "id": "HJtdbZ0sG0puvLuL0NMy",
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586553519?alt=media&token=152a8d76-474e-479b-9d1d-60a6418d0f81"
        ]
    },
    {
        "producto": "zapatilla 5 tomas 3mts",
        "precio": 6833.454545454546,
        "coloresDisponibles": [
            {
                "color": "#ffffff",
                "denominacionColor": "blanco",
                "stock": 1
            }
        ],
        "financiamiento": 8,
        "costo": 2.1818181818181817,
        "id": "r7AE3SutjtdSoTxdnpH6",
        "codigo": "--",
        "iva": 0,
        "margen": 100,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586841150?alt=media&token=9519d3fe-007f-4dee-be29-9b5995259ab2"
        ],
        "categoria": "hogar",
        "marca": "vr plast",
        "imgUrlsRef": [
            "productos/1719586841150"
        ],
        "cantidad": 1
    },
    {
        "coloresDisponibles": [
            {
                "stock": 1,
                "denominacionColor": "blanco",
                "color": "#ffffff"
            }
        ],
        "costo": 3.272727272727273,
        "codigo": "--",
        "marca": "vr plast",
        "id": "h4hI3umwo2lOJehrEltX",
        "producto": "zapatilla 5 tomas 5mts",
        "margen": 100,
        "precio": 10250.18181818182,
        "financiamiento": 8,
        "imgUrlsRef": [
            "productos/1719586849248"
        ],
        "iva": 0,
        "cantidad": 1,
        "images": [
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719586849248?alt=media&token=d8a477d8-127c-4a80-a497-a6b15ec9976e"
        ],
        "categoria": "hogar"
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
            "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/productos%2F1719587103894?alt=media&token=d46e6807-c278-4c94-80a2-a914b9a34a82"
        ],
        "costo": 5.446545454545454,
        "categoria": "hogar",
        "id": "Y2HpNEDOqishhHud0rX7",
        "codigo": "--",
        "cantidad": 1,
        "margen": 100,
        "marca": "new times",
        "imgUrlsRef": [
            "productos/1719587103894"
        ],
        "producto": "zapatillas con interruptores",
        "precio": 17058.580363636363,
        "financiamiento": 8,
        "iva": 0
    }
]

export class NuevoLibroDiario {
    id!: string;
    cuadra?: boolean;
    fecha?: number;
    fechaString?: string;
    montoInicial: number = 0;
    montoTotal: number = 0;
    montoTotalEfectivo: number = 0;
    montoTotalMercadoPago: number = 0;
    montoTotalTransferencia: number = 0;
    montoTotalCredito: number = 0;
    montoTotalDebito: number = 0;
    montoTotalVale: number = 0;
    ventas: Venta[] = [];
    montoTotalNegativo: number = 0;
    historialDeCierre?: historialCaja[] = [];
}

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
    libroDiarioHoy: NuevoLibroDiario = {
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
        montoTotalCredito: 0,
        montoTotalDebito: 0,
        montoTotalVale: 0,
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
                this.libroDiarioHoy = res.payload.data() as NuevoLibroDiario;
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

        let libroDiario: NuevoLibroDiario = {
            montoTotalCredito: 0,
            montoTotalDebito: 0,
            montoTotalEfectivo: 0,
            montoTotalMercadoPago: 0,
            montoTotalNegativo: 0,
            montoTotalTransferencia: 0,
            montoTotalVale: 0,
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
   
    obtenerMontoTotalPorMedioDePago(medioDePago: FormasDePago): number {
        let acumulador = 0;
        this.libroDiarioHoy.ventas.forEach((venta: Venta) => {
            venta.pagos.forEach((pago: Pago) => {
                if (pago.formaDePago === medioDePago) {
                    acumulador += pago.cantidad;
                }
            });
        });
        return acumulador;
    }

    obtenerMontoTotalPorNegativo(): number {
        let acumulador = 0;
        this.libroDiarioHoy.ventas.forEach((venta: Venta) => {
            if (venta.total < 0) {
                acumulador += venta.total;
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
                    this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(FormasDePago.EFECTIVO);//total en efectivo
                    this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(FormasDePago.TRANSFERENCIA);//total en efectivo
                    this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(FormasDePago.MERCADO_PAGO);//total en efectivo
                    this.libroDiarioHoy.montoTotalCredito = this.obtenerMontoTotalPorMedioDePago(FormasDePago.TARJETA_CREDITO);//total en efectivo
                    this.libroDiarioHoy.montoTotalDebito = this.obtenerMontoTotalPorMedioDePago(FormasDePago.TARJETA_DEBITO);//total en efectivo
                    this.libroDiarioHoy.montoTotalVale = this.obtenerMontoTotalPorMedioDePago(FormasDePago.VALE);//total en efectivo
                    this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo();//total negativo

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

    async nuevoCarrito() {
        try {
            const modal = await this.modalController.create({
                component: SelectorDeProductosComponent,
                componentProps: {
                    productos: productos,
                    isModal: false
                },
            })

            modal.onDidDismiss().then((result: any) => {
                if (!result.data || !result.role) return;


                if (result.role == 'ventaProcesada') {

                    if (!this.libroDiarioHoy.montoTotalEfectivo) {
                        this.libroDiarioHoy.montoTotalEfectivo = Number(this.libroDiarioHoy.montoInicial);
                    }

                    this.libroDiarioHoy.ventas = this.libroDiarioHoy.ventas || [];
                    this.libroDiarioHoy.ventas.push(result.data);
                    console.log(result.data)

                    result.data.pagos.forEach((pago: { formaDePago: FormasDePago, cantidad: number }) => {
                        console.log(pago)
                        switch (pago.formaDePago) {
                            case FormasDePago.EFECTIVO:
                                if (!this.libroDiarioHoy.montoTotalEfectivo) {
                                    this.libroDiarioHoy.montoTotalEfectivo = 0;
                                }
                                this.libroDiarioHoy.montoTotalEfectivo += pago.cantidad;
                                break;
                            case FormasDePago.TRANSFERENCIA:
                                if (!this.libroDiarioHoy.montoTotalTransferencia) {
                                    this.libroDiarioHoy.montoTotalTransferencia = 0;
                                }
                                this.libroDiarioHoy.montoTotalTransferencia += pago.cantidad;
                                break;
                            case FormasDePago.MERCADO_PAGO:
                                if (!this.libroDiarioHoy.montoTotalMercadoPago) {
                                    this.libroDiarioHoy.montoTotalMercadoPago = 0;
                                }
                                this.libroDiarioHoy.montoTotalMercadoPago += pago.cantidad;
                                break;
                            case FormasDePago.TARJETA_CREDITO:
                                if (!this.libroDiarioHoy.montoTotalCredito) {
                                    this.libroDiarioHoy.montoTotalCredito = 0;
                                }
                                this.libroDiarioHoy.montoTotalCredito += pago.cantidad;
                                break;
                            case FormasDePago.TARJETA_DEBITO:
                                if (!this.libroDiarioHoy.montoTotalDebito) {
                                    this.libroDiarioHoy.montoTotalDebito = 0;
                                }
                                this.libroDiarioHoy.montoTotalDebito += pago.cantidad;
                                break;
                            case FormasDePago.VALE:
                                if (!this.libroDiarioHoy.montoTotalVale) {
                                    this.libroDiarioHoy.montoTotalVale = 0;
                                }
                                this.libroDiarioHoy.montoTotalVale += pago.cantidad;
                                break;
                            default:
                                // Handle any other cases if needed
                                break;
                        }
                    });
                    this.libroDiarioHoy.montoTotalNegativo = this.obtenerMontoTotalPorNegativo();//total negativo
                    console.log(this.libroDiarioHoy)
                    // this.libroDiarioHoy.montoTotalEfectivo = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.EFECTIVO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalTransferencia = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.TRANSFERENCIA);//total en efectivo
                    // this.libroDiarioHoy.montoTotalMercadoPago = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.MERCADO_PAGO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalCredito = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.TARJETA_CREDITO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalDebito = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.TARJETA_DEBITO);//total en efectivo
                    // this.libroDiarioHoy.montoTotalVale = this.obtenerMontoTotalPorMedioDePago(this.libroDiarioHoy, FormasDePago.VALE);//total en efectivo

                    //   this.database.actualizar(environment.TABLAS.ingresosNuevoLibro, this.libroDiarioHoy, this.libroDiarioHoy.id);
                }

            });
            return await modal.present();
        } catch (err) {
        }
    }
}
