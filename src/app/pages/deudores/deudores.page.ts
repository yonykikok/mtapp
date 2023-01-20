import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-deudores',
  templateUrl: './deudores.page.html',
  styleUrls: ['./deudores.page.scss'],
})
export class DeudoresPage implements OnInit {
  deudores = [
    {
      "items": [],
      "direccion": "hornos 4633",
      "pagos": [],
      "nombre": "Marcelo",
      "dni": "32553625",
      "apellido": "Sosa",
      "fechaCreacion": 1639249946261,
      "id": "27GvHbJH6eqFmj0e0ZeY",
      "fechaLimite": {
        "seconds": 1639364400,
        "nanoseconds": 0
      },
      "telefono": "112000000000"
    },
    {
      "apellido": "morelli",
      "pagos": [],
      "id": "2UGLiSiJzUBDvuXXOn0Q",
      "nombre": "juan",
      "fechaCreacion": 1643037355752,
      "direccion": "rivadavia 4245",
      "fechaLimite": {
        "seconds": 1641783600,
        "nanoseconds": 0
      },
      "dni": "38050618",
      "telefono": "1154082454",
      "items": [
        {
          "fecha": 1643034812951,
          "precio": 1300,
          "producto": "bateria j2 prime"
        }
      ]
    },
    {
      "items": [
        {
          "fecha": 1637940205332,
          "producto": "Modulo A10S",
          "precio": 8080
        }
      ],
      "direccion": "kiosco frente Jr",
      "fechaLimite": {
        "seconds": 1639364400,
        "nanoseconds": 0
      },
      "apellido": "Meno",
      "pagos": [
        {
          "concepto": "efectivo",
          "fecha": 1637940229296,
          "monto": 2200
        },
        {
          "fecha": 1638399442811,
          "monto": 5880,
          "concepto": "Efectivo"
        }
      ],
      "fechaCreacion": 1637940338746,
      "telefono": "1133459603",
      "deudaTotal": 8080,
      "nombre": "Monica ",
      "montoTotal": 8080,
      "dni": "17652891",
      "id": "2wqP6DMDf7Kexco8AdV4"
    },
    {
      "pagos": [
        {
          "monto": 1,
          "concepto": "efectivo",
          "fecha": 1640450158698
        },
        {
          "concepto": "Transferencia",
          "fecha": 1641547580649,
          "monto": 1099
        }
      ],
      "nombre": "yamila",
      "deudaTotal": 1100,
      "apellido": "garcia",
      "direccion": "chaco",
      "id": "3Qi6Kl5kNim3oCtTGSeo",
      "fechaCreacion": 1640450172290,
      "dni": "36980741",
      "montoTotal": 1100,
      "telefono": "3725403537",
      "fechaLimite": {
        "seconds": 1640228400,
        "nanoseconds": 0
      },
      "items": [
        {
          "producto": "pendrive",
          "fecha": 1640450151330,
          "precio": 1100
        }
      ]
    },
    {
      "nombre": "Franco",
      "dni": "37750108",
      "pagos": [
        {
          "monto": 960,
          "concepto": "efectivo",
          "fecha": 1639692753696
        },
        {
          "concepto": "Efectivo",
          "monto": 1650,
          "fecha": 1655934917169
        }
      ],
      "montoTotal": 960,
      "deudaTotal": 2610,
      "items": [
        {
          "fecha": 1639692745449,
          "precio": 960,
          "producto": "deuda anterior"
        },
        {
          "producto": "deuda por reparaciones",
          "fecha": 1641507550332,
          "precio": 1000
        },
        {
          "precio": 650,
          "fecha": 1641508190212,
          "producto": "cubre lente a01"
        }
      ],
      "fechaCreacion": 1639692842899,
      "direccion": "marco avellaneda 1893",
      "apellido": "cuenca",
      "telefono": "1133331625",
      "fechaLimite": {
        "seconds": 1640574000,
        "nanoseconds": 0
      },
      "id": "3QseXOjjDbzTwgFsubC0"
    },
    {
      "pagos": [],
      "dni": "43581646",
      "fechaCreacion": 1640411920147,
      "direccion": "125 entre 24 y 25",
      "id": "BW5jFy8DTNtKYVBIlZh0",
      "fechaLimite": {
        "seconds": 1640574000,
        "nanoseconds": 0
      },
      "items": [
        {
          "producto": "consola con joystick",
          "fecha": 1640411879881,
          "precio": 2600
        },
        {
          "fecha": 1640412594833,
          "precio": 1000,
          "producto": "camara"
        },
        {
          "producto": "Film glass full",
          "fecha": 1654759869407,
          "precio": 450
        }
      ],
      "apellido": "Haedo",
      "deudaTotal": 3600,
      "montoTotal": 1,
      "nombre": "Jose",
      "telefono": "1124539448"
    },
    {
      "pagos": [
        {
          "fecha": 1646666669835,
          "concepto": "Efectivo",
          "monto": 350
        }
      ],
      "nombre": "eduardo",
      "fechaCreacion": 1646348236843,
      "items": [
        {
          "producto": "funda",
          "fecha": 1646348212054,
          "precio": 350
        }
      ],
      "id": "CI7NG1Cysw7GMbsFm8Nf",
      "direccion": "mendoza 3754",
      "apellido": "olgiati",
      "dni": "14320877",
      "fechaLimite": {
        "seconds": 1648954800,
        "nanoseconds": 0
      },
      "telefono": "1123342042"
    },
    {
      "pagos": [],
      "direccion": "asd",
      "fechaLimite": {
        "seconds": 1646276400,
        "nanoseconds": 0
      },
      "items": [],
      "telefono": "asd",
      "fechaCreacion": 1645984357897,
      "nombre": "sdfsdfasd",
      "dni": "asd",
      "id": "DAIn20UzZ9jMWnriGxSp",
      "apellido": "asdasd"
    },
    {
      "telefono": "1144756009",
      "direccion": "marcos avellaneda 3567",
      "fechaLimite": {
        "seconds": 1656558000,
        "nanoseconds": 0
      },
      "id": "DkowxadAmq3k9vDXzWi2",
      "nombre": "yamil ",
      "fechaCreacion": 1653949043294,
      "items": [
        {
          "precio": 13000,
          "fecha": 1653949020501,
          "producto": "a10 libre"
        }
      ],
      "apellido": "flores",
      "dni": "42089933",
      "pagos": [
        {
          "concepto": "efectivo",
          "monto": 5000,
          "fecha": 1653949025811
        },
        {
          "concepto": "Efectivo",
          "monto": 3000,
          "fecha": 1654641034767
        },
        {
          "concepto": "Transferencia",
          "monto": 5000,
          "fecha": 1656025916598
        }
      ]
    },
    {
      "direccion": "murguiondo 3071",
      "telefono": "1141600026",
      "nombre": "Romina",
      "dni": "33290881",
      "pagos": [
        {
          "monto": 250,
          "fecha": 1645021681048,
          "concepto": "efectivo"
        }
      ],
      "apellido": "andres",
      "id": "I412Ax3KrRS0eLRGkttk",
      "fechaCreacion": 1644413770522,
      "items": [
        {
          "fecha": 1644413744180,
          "producto": "bateria j2 prime",
          "precio": 250
        }
      ],
      "fechaLimite": {
        "seconds": 1667962800,
        "nanoseconds": 0
      }
    },
    {
      "fechaCreacion": 1654041786883,
      "fechaLimite": {
        "seconds": 1656633775,
        "nanoseconds": 320000000
      },
      "dni": "28308355",
      "nombre": "Virginia",
      "apellido": "Ortichy",
      "id": "IRk0QeKG6PZWm3GK7gLF",
      "items": [
        {
          "producto": "Pin j6",
          "precio": 1000,
          "fecha": 1654041766140
        },
        {
          "fecha": 1654099488893,
          "precio": 1800,
          "producto": "Auricular Bluetooth x2 "
        },
        {
          "fecha": 1654373811911,
          "producto": "Modulo j6",
          "precio": 8000
        }
      ],
      "telefono": "36252843",
      "direccion": "Chaco puerto tirol",
      "pagos": [
        {
          "fecha": 1654373869962,
          "monto": 4000,
          "concepto": "Transferencia jona "
        },
        {
          "fecha": 1654373937168,
          "concepto": "Efectivo ",
          "monto": 1000
        }
      ]
    },
    {
      "pagos": [
        {
          "fecha": 1660344026570,
          "concepto": "Efectivo",
          "monto": 3000
        },
        {
          "concepto": "Efectivo",
          "monto": 1000,
          "fecha": 1660344113977
        }
      ],
      "apellido": "gonzalez",
      "montoTotal": 13725,
      "fechaLimite": {
        "seconds": 1641178800,
        "nanoseconds": 0
      },
      "direccion": "calle 20 3672",
      "deudaTotal": 18970,
      "id": "MjtwZS7CC3NHtVaSXOGz",
      "telefono": "1130506300",
      "items": [
        {
          "precio": 1800,
          "producto": "Teclado Bluetooth ",
          "fecha": 1660000179888
        },
        {
          "producto": "Rindo ",
          "fecha": 1660000197270,
          "precio": 150
        },
        {
          "precio": 3800,
          "fecha": 1660219652535,
          "producto": "Batería e6 plus"
        },
        {
          "producto": "Desarme ",
          "fecha": 1660219665053,
          "precio": 400
        },
        {
          "precio": 3000,
          "fecha": 1660264616638,
          "producto": "Adelanto"
        }
      ],
      "fechaCreacion": 1638573008110,
      "dni": "42547343",
      "nombre": "nazareno"
    },
    {
      "direccion": "25 de mayo 5251",
      "nombre": "gaston ",
      "id": "PfOjEwNeh5lk8iXipNGO",
      "items": [
        {
          "producto": "J7 2016 ",
          "fecha": 1652218677667,
          "precio": 13000
        }
      ],
      "apellido": "arancibia",
      "pagos": [
        {
          "concepto": "Efectivo",
          "monto": 11500,
          "fecha": 1651871488240
        },
        {
          "concepto": "Efectivo",
          "monto": 1500,
          "fecha": 1651871883405
        }
      ],
      "telefono": "42622626",
      "fechaLimite": {
        "seconds": 1646535600,
        "nanoseconds": 0
      },
      "fechaCreacion": 1650919879000,
      "dni": "32881529"
    },
    {
      "dni": "38133834",
      "nombre": "Yamila",
      "apellido": "Cardozo",
      "fechaLimite": {
        "seconds": 1646535600,
        "nanoseconds": 0
      },
      "pagos": [
        {
          "fecha": 1646582938436,
          "monto": 5000,
          "concepto": "Efectivo"
        },
        {
          "concepto": "Efectivo",
          "monto": 5000,
          "fecha": 1649004623220
        },
        {
          "fecha": 1652448502519,
          "monto": 5000,
          "concepto": "Transferencia"
        },
        {
          "concepto": "Transferencia",
          "fecha": 1656335625121,
          "monto": 3000
        }
      ],
      "items": [
        {
          "producto": "Prestamo de dinero",
          "precio": 5000,
          "fecha": 1644181320684
        },
        {
          "precio": 10000,
          "producto": "Prestamo",
          "fecha": 1646582952330
        },
        {
          "precio": 3000,
          "fecha": 1655236803282,
          "producto": "Prestamo"
        }
      ],
      "direccion": "Gral Hornos 3699",
      "id": "QhV4tSxS4sUySxoMjgG4",
      "telefono": "1122926335",
      "fechaCreacion": 1644181640089
    },
    {
      "telefono": "1131667546",
      "fechaCreacion": 1644090566621,
      "direccion": "ecuador 2057 quilmes oeste",
      "apellido": "andrada",
      "nombre": "maria elena",
      "id": "UCAefBjl6FWn5lAJYOEJ",
      "fechaLimite": {
        "seconds": 1646682563,
        "nanoseconds": 584000000
      },
      "pagos": [
        {
          "monto": 900,
          "concepto": "Se le hizo descuento 5/2/22",
          "fecha": 1654789290926
        }
      ],
      "dni": "23060825",
      "items": [
        {
          "fecha": 1644090555909,
          "producto": "resto boleta 2144",
          "precio": 900
        }
      ]
    },
    {
      "fechaCreacion": 1639606419017,
      "apellido": "ponce",
      "items": [
        {
          "producto": "tablet 8\" x2",
          "precio": 15000,
          "fecha": 1639606269737
        },
        {
          "producto": "funda flicover tablet x2",
          "precio": 1100,
          "fecha": 1639606310588
        },
        {
          "producto": "cable tipo c",
          "precio": 300,
          "fecha": 1640209560529
        },
        {
          "producto": "funda",
          "fecha": 1640209620253,
          "precio": 400
        },
        {
          "precio": 300,
          "fecha": 1641563866637,
          "producto": "adaptador bluetooth"
        }
      ],
      "deudaTotal": 17100,
      "dni": "35345795",
      "telefono": "1136283982",
      "id": "VFQ6yUrXu7DgKNK3Ofi2",
      "nombre": "Guiliana",
      "montoTotal": 16800,
      "fechaLimite": {
        "seconds": 1640574000,
        "nanoseconds": 0
      },
      "pagos": [
        {
          "monto": 2000,
          "fecha": 1639606322022,
          "concepto": "efectivo"
        },
        {
          "concepto": "efectivo",
          "fecha": 1641563845633,
          "monto": 14800
        },
        {
          "fecha": 1643928245034,
          "monto": 300,
          "concepto": "efectivo"
        }
      ],
      "direccion": "marco avellaneda 3827"
    },
    {
      "apellido": "Montes",
      "telefono": "1138636304",
      "nombre": "Leyla",
      "fechaLimite": {
        "seconds": 1647313200,
        "nanoseconds": 0
      },
      "direccion": "Miguel cane 53 4to ero",
      "pagos": [],
      "fechaCreacion": 1644966135856,
      "dni": "31694425",
      "id": "VZgmS5sdNVhilkmla4WN",
      "items": []
    },
    {
      "items": [
        {
          "producto": "consola",
          "precio": 2900,
          "fecha": 1640264338718
        }
      ],
      "fechaCreacion": 1640264414928,
      "pagos": [
        {
          "fecha": 1640264397809,
          "concepto": "efectivo",
          "monto": 2900
        }
      ],
      "nombre": "jose",
      "direccion": "jose leon suarez 2950",
      "apellido": "estanciero",
      "telefono": "1166848049",
      "dni": "14276315",
      "fechaLimite": {
        "seconds": 1637895600,
        "nanoseconds": 0
      },
      "id": "VljXEaShxqzqLCDmkjL1"
    },
    {
      "direccion": "Liberta 4239",
      "id": "WwoQ3tsxfEyNEOJtetsg",
      "dni": "39628166",
      "apellido": "Huissi",
      "fechaLimite": {
        "seconds": 1654124666,
        "nanoseconds": 805000000
      },
      "pagos": [
        {
          "fecha": 1651532725175,
          "concepto": "Efectivo ",
          "monto": 700
        },
        {
          "concepto": "Efectivo",
          "monto": 2300,
          "fecha": 1655066262844
        }
      ],
      "items": [
        {
          "producto": "Auricular  Bluetooth ",
          "precio": 3000,
          "fecha": 1651532647580
        }
      ],
      "nombre": "Juan",
      "fechaCreacion": 1651532674393,
      "telefono": "1162721790"
    },
    {
      "dni": "16950172",
      "telefono": "1134393834",
      "fechaLimite": {
        "seconds": 1657403575,
        "nanoseconds": 186000000
      },
      "apellido": "GASTO",
      "id": "XcZf2NbxxJN6IiTPyUDg",
      "fechaCreacion": 1654811576996,
      "direccion": " ",
      "nombre": "FABIAN",
      "items": [
        {
          "precio": 2000,
          "fecha": 1654811550900,
          "producto": "CAMARA TRASERA J7 2016"
        }
      ],
      "pagos": [
        {
          "monto": 2000,
          "concepto": "Efectivo ",
          "fecha": 1654868490478
        }
      ]
    },
    {
      "nombre": "agustina",
      "fechaLimite": {
        "seconds": 1646881200,
        "nanoseconds": 0
      },
      "direccion": "jose leon suarez 4265",
      "id": "Xt7ZcxMU1Iho9GQql2o0",
      "telefono": "1134795088",
      "apellido": "valdez",
      "dni": "43326535",
      "pagos": [],
      "items": [
        {
          "precio": 800,
          "producto": "Cargador Inova 3.1",
          "fecha": 1660000152238
        }
      ],
      "fechaCreacion": 1643669340235
    },
    {
      "pagos": [
        {
          "fecha": 1639432540209,
          "concepto": "efectivo",
          "monto": 1000
        },
        {
          "monto": 2200,
          "concepto": "efectivo",
          "fecha": 1640291523642
        }
      ],
      "dni": "22810196",
      "apellido": "gomez",
      "montoTotal": 3200,
      "fechaLimite": {
        "seconds": 1640228400,
        "nanoseconds": 0
      },
      "id": "aTqId4S1cAhvO5uPjWzI",
      "items": [
        {
          "producto": "joystick bluetooh x2",
          "fecha": 1639432523134,
          "precio": 3200
        }
      ],
      "direccion": "viamonte2966",
      "deudaTotal": 3200,
      "telefono": "1161659659",
      "fechaCreacion": 1639432573459,
      "nombre": "silvia"
    },
    {
      "telefono": "1165093223",
      "dni": "42284728",
      "deudaTotal": 21300,
      "nombre": "Junior",
      "fechaLimite": {
        "seconds": 1640228400,
        "nanoseconds": 0
      },
      "montoTotal": 13000,
      "pagos": [
        {
          "fecha": 1642712668207,
          "concepto": "efectivo",
          "monto": 3000
        },
        {
          "monto": 10000,
          "fecha": 1642726854172,
          "concepto": "Efectivo"
        },
        {
          "monto": 7487,
          "fecha": 1643991544977,
          "concepto": "Transferencia"
        },
        {
          "concepto": "Efectivo",
          "monto": 9000,
          "fecha": 1647903897707
        },
        {
          "fecha": 1647905075619,
          "monto": 120,
          "concepto": "Devolución film "
        },
        {
          "concepto": "Efectivo ",
          "monto": 6000,
          "fecha": 1648153447412
        },
        {
          "concepto": "Efectivo sueldo sele",
          "fecha": 1650059465291,
          "monto": 4000
        },
        {
          "monto": 3000,
          "concepto": "Efectivo junior",
          "fecha": 1650669914218
        },
        {
          "fecha": 1650670244444,
          "monto": 2000,
          "concepto": "Efectivo sele"
        },
        {
          "monto": 8000,
          "concepto": "Efectivo junior",
          "fecha": 1651929943845
        },
        {
          "concepto": "Efectivo",
          "monto": 8500,
          "fecha": 1652444509114
        },
        {
          "fecha": 1654270819343,
          "concepto": "Transferencia",
          "monto": 14300
        }
      ],
      "items": [
        {
          "producto": "tablet ",
          "fecha": 1642693062167,
          "precio": 4500
        },
        {
          "precio": 850,
          "fecha": 1642693069701,
          "producto": "deuda vieja"
        },
        {
          "producto": "modulo j6 oled usado",
          "precio": 7200,
          "fecha": 1642693202898
        },
        {
          "fecha": 1642870894325,
          "producto": "Cuenta A11 Yanke",
          "precio": 800
        },
        {
          "producto": "modulo a11",
          "precio": 7500,
          "fecha": 1642870916443
        },
        {
          "fecha": 1643125146813,
          "producto": "funda y film a11",
          "precio": 450
        },
        {
          "producto": "modulo j7 prime",
          "fecha": 1646145675285,
          "precio": 7800
        },
        {
          "precio": 400,
          "producto": "pulsador",
          "fecha": 1647484791598
        },
        {
          "fecha": 1647904080039,
          "precio": 120,
          "producto": "Film a 11"
        },
        {
          "precio": 350,
          "fecha": 1647904190510,
          "producto": "Funda 3050"
        },
        {
          "producto": "A11 film 10d",
          "fecha": 1647905097788,
          "precio": 300
        },
        {
          "producto": "Módulo a11",
          "fecha": 1647905182308,
          "precio": 10000
        },
        {
          "fecha": 1648135792158,
          "producto": "Flash iPhone ",
          "precio": 650
        },
        {
          "precio": 9300,
          "producto": "Módulo oled a20",
          "fecha": 1648153415764
        },
        {
          "precio": 250,
          "fecha": 1650937025513,
          "producto": "glass 10d"
        },
        {
          "producto": "pin de carga parlante",
          "fecha": 1650937113909,
          "precio": 700
        },
        {
          "producto": "LIBERACION",
          "fecha": 1651096888398,
          "precio": 700
        },
        {
          "precio": 700,
          "fecha": 1651274596837,
          "producto": "Liberación j7"
        },
        {
          "fecha": 1651274631816,
          "precio": 7400,
          "producto": "J7 2016 modulo"
        },
        {
          "producto": "J7 astillado",
          "fecha": 1652404145798,
          "precio": 8500
        },
        {
          "precio": 6500,
          "fecha": 1652710643926,
          "producto": "Módulo a10"
        },
        {
          "precio": 400,
          "producto": "Módulo astillado j3",
          "fecha": 1652710660811
        },
        {
          "fecha": 1654270847035,
          "producto": "Interes",
          "precio": 37
        }
      ],
      "direccion": "Pilcomayo 4487",
      "id": "aUQuzFkctbGAl7HV5CUX",
      "apellido": "Caballero",
      "fechaCreacion": 1642693114599
    },
    {
      "pagos": [],
      "nombre": "Lujan",
      "telefono": "1131103893",
      "fechaLimite": {
        "seconds": 1644030000,
        "nanoseconds": 0
      },
      "dni": "20878420",
      "apellido": "Zaracho",
      "direccion": "Marco avellaneda 3843",
      "fechaCreacion": 1643407380288,
      "items": [],
      "id": "aybORrb1Q12YnkNIlfzR"
    },
    {
      "pagos": [
        {
          "monto": 2000,
          "concepto": "Trabajo tomas",
          "fecha": 1646580841824
        },
        {
          "concepto": "Transferencia",
          "fecha": 1646581501164,
          "monto": 4000
        },
        {
          "fecha": 1649176753875,
          "concepto": "Efectivo",
          "monto": 6000
        },
        {
          "concepto": "Efectivo ",
          "fecha": 1651069466039,
          "monto": 240
        },
        {
          "fecha": 1654094598442,
          "concepto": "Efectivo",
          "monto": 210
        },
        {
          "fecha": 1654781735200,
          "concepto": "Efectivo",
          "monto": 750
        },
        {
          "monto": 7000,
          "fecha": 1656345119618,
          "concepto": "Trabajo en el fondo"
        },
        {
          "concepto": "Trabajo en el fondo",
          "fecha": 1657919379161,
          "monto": 9000
        }
      ],
      "telefono": "1164087586",
      "direccion": "M avellaneda 3843",
      "id": "k2v6phThUzlH77MxtPHP",
      "nombre": "Oscar",
      "apellido": "Quintas",
      "items": [
        {
          "fecha": 1645221125894,
          "producto": "J4",
          "precio": 12000
        },
        {
          "fecha": 1650978403568,
          "producto": "funda j4",
          "precio": 450
        },
        {
          "fecha": 1654094630418,
          "precio": 750,
          "producto": "Cargador 5.1"
        },
        {
          "fecha": 1655329382941,
          "precio": 650,
          "producto": "Auriculares blueetoh "
        },
        {
          "producto": "Adelanto de trabajo",
          "precio": 1500,
          "fecha": 1656345150120
        },
        {
          "precio": 850,
          "producto": "Cargador 5.1 inova",
          "fecha": 1656345180649
        },
        {
          "fecha": 1656623762503,
          "precio": 1000,
          "producto": "Adelanto efectivo "
        },
        {
          "producto": "Adelanto efectivo ",
          "precio": 2000,
          "fecha": 1657919414085
        },
        {
          "producto": "Adelanto",
          "precio": 4000,
          "fecha": 1658178230410
        },
        {
          "precio": 3000,
          "producto": "Adelanto",
          "fecha": 1659380448531
        },
        {
          "producto": "Adelanto",
          "fecha": 1659380804378,
          "precio": 1500
        },
        {
          "fecha": 1659381109016,
          "producto": "Adelanto",
          "precio": 1500
        }
      ],
      "fechaCreacion": 1645221167921,
      "dni": "17005301",
      "fechaLimite": {
        "seconds": 1649127600,
        "nanoseconds": 0
      }
    },
    {
      "id": "sSEfQ68HIwPHSOguqeNc",
      "pagos": [
        {
          "concepto": "efectivo",
          "monto": 1450,
          "fecha": 1653685671706
        }
      ],
      "fechaLimite": {
        "seconds": 1652279944,
        "nanoseconds": 170000000
      },
      "dni": "950135390",
      "nombre": "limber",
      "items": [
        {
          "producto": "celular one fusion",
          "fecha": 1649687906368,
          "precio": 1000
        },
        {
          "precio": 450,
          "fecha": 1649687928173,
          "producto": "film 10d one fusion"
        }
      ],
      "direccion": "marcos avellaneda 3373",
      "telefono": "1156233475",
      "fechaCreacion": 1649687950249,
      "apellido": "gicona"
    },
    {
      "apellido": "Castro",
      "telefono": "1130642894",
      "direccion": "Pilcomayo 3910",
      "pagos": [
        {
          "fecha": 1649195548129,
          "monto": 1500,
          "concepto": "Transferencia"
        },
        {
          "fecha": 1649594725280,
          "concepto": "Transferencia",
          "monto": 1500
        },
        {
          "monto": 1500,
          "fecha": 1650035787537,
          "concepto": "Transferencia"
        },
        {
          "fecha": 1650978748915,
          "concepto": "Efectivo",
          "monto": 1500
        },
        {
          "concepto": "Transferencia",
          "monto": 1500,
          "fecha": 1651453643471
        },
        {
          "fecha": 1651953212446,
          "monto": 1500,
          "concepto": "Efectivo"
        },
        {
          "fecha": 1652482730010,
          "concepto": "Transferencia",
          "monto": 1500
        },
        {
          "fecha": 1654299339828,
          "concepto": "Transferecia",
          "monto": 920
        },
        {
          "fecha": 1654731684650,
          "concepto": "Transferencia",
          "monto": 5000
        },
        {
          "monto": 4000,
          "fecha": 1654947086162,
          "concepto": "Transferencia"
        },
        {
          "concepto": "Transferencia",
          "fecha": 1655409680659,
          "monto": 5000
        },
        {
          "fecha": 1656113225769,
          "concepto": "Transf",
          "monto": 4000
        },
        {
          "monto": 4000,
          "concepto": "Transferencia",
          "fecha": 1656727940580
        },
        {
          "fecha": 1657323091933,
          "concepto": "Transferencia",
          "monto": 4000
        },
        {
          "monto": 4250,
          "concepto": "Transferencia",
          "fecha": 1657917024172
        }
      ],
      "items": [
        {
          "precio": 11000,
          "producto": "J5 prime equipo",
          "fecha": 1648332724848
        },
        {
          "precio": 200,
          "fecha": 1648332741648,
          "producto": "J5 prime film"
        },
        {
          "fecha": 1648332752053,
          "precio": 220,
          "producto": "J5 prime funda"
        },
        {
          "fecha": 1654097258410,
          "producto": "Prestamo",
          "precio": 30000
        },
        {
          "producto": "Funda j6 plus",
          "precio": 250,
          "fecha": 1655934973413
        }
      ],
      "fechaLimite": {
        "seconds": 1650924775,
        "nanoseconds": 825000000
      },
      "fechaCreacion": 1648332781620,
      "nombre": "Laura",
      "id": "swF6rogDQCO9WSTJZEnR",
      "dni": "31494210"
    },
    {
      "dni": "35974877",
      "fechaLimite": {
        "seconds": 1641783600,
        "nanoseconds": 0
      },
      "items": [],
      "direccion": "marco avellaneda 3835",
      "id": "uz8DaDJAKxdfLnbYS8FY",
      "montoTotal": 100,
      "pagos": [],
      "nombre": "adriana",
      "apellido": "haedo",
      "telefono": "1144497529",
      "deudaTotal": 21990,
      "fechaCreacion": 1639176923900
    },
    {
      "apellido": "test",
      "telefono": "1122334455",
      "nombre": "test",
      "direccion": "m avellaneda ",
      "dni": "4040404040",
      "id": "xyjjXntHXcQ5uQhlDX1x",
      "fechaLimite": {
        "seconds": 1648177200,
        "nanoseconds": 0
      },
      "pagos": [
        {
          "concepto": "efectivo",
          "fecha": 1645840299595,
          "monto": 5000
        },
        {
          "concepto": "efectivo",
          "fecha": 1645975735610,
          "monto": 20000
        },
        {
          "fecha": 1645984232725,
          "monto": 545,
          "concepto": "efectivo"
        },
        {
          "monto": 450,
          "fecha": 1646074754937,
          "concepto": "Efectivo "
        }
      ],
      "items": [
        {
          "fecha": 1645839691996,
          "precio": 25000,
          "producto": "Celular "
        },
        {
          "precio": 545,
          "fecha": 1645984081332,
          "producto": "Botella"
        },
        {
          "precio": 450,
          "producto": "Funda ",
          "fecha": 1646074449413
        }
      ],
      "fechaCreacion": 1645839701461
    },
    {
      "pagos": [
        {
          "fecha": 1651182211959,
          "concepto": "efectivo seña",
          "monto": 1000
        }
      ],
      "fechaCreacion": 1651182216962,
      "nombre": "blanca",
      "telefono": "1151029001",
      "items": [
        {
          "fecha": 1651182190471,
          "precio": 0,
          "producto": "celu a pagar"
        }
      ],
      "direccion": "santiago plaul 3612",
      "fechaLimite": {
        "seconds": 1653774214,
        "nanoseconds": 630000000
      },
      "dni": "14460485",
      "apellido": "rolon",
      "id": "zH1dfpjQiXJpE9Vj6Kvo"
    },
    {
      "direccion": "LITUANIA 385",
      "items": [
        {
          "producto": "AURICULAR F9",
          "precio": 3000,
          "fecha": 1652478912356
        },
        {
          "fecha": 1652478932431,
          "producto": "PIN DE CARAGA (BAPORISADOR)",
          "precio": 1500
        },
        {
          "precio": 7750,
          "fecha": 1653686128468,
          "producto": "J3 boleta 2768"
        }
      ],
      "fechaCreacion": 1652478958317,
      "apellido": "CROZZA",
      "nombre": "FRANCISCO",
      "telefono": "1154921712",
      "fechaLimite": {
        "seconds": 1655070953,
        "nanoseconds": 717000000
      },
      "pagos": [
        {
          "concepto": "Efectivo",
          "fecha": 1656967092555,
          "monto": 12250
        }
      ],
      "dni": "39013246",
      "id": "zQfM1JuZsSeQdwV1Hc5I"
    }
  ]
  constructor() { }
  ngOnInit(): void {

  }
}
