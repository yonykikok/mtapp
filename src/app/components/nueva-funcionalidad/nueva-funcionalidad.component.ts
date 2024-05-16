import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Share } from '@capacitor/share';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { BarcodeScannerComponent } from '../barcode-scanner/barcode-scanner.component';
let productoseas = [
  {
    "producto": "adaptador auricular iphone, tipoc carga",
    "marca": "lightningn splitter",
    "color": null,
    "codigo": null,
    "cantidad": 4,
    "precio": 7993,
    "iva": 0.21,
    "precio_con_iva": 9680
  },
  {
    "producto": "adaptador lightning a aux 3,5mm",
    "marca": null,
    "color": "blanco",
    "codigo": null,
    "cantidad": 5,
    "precio": 7993,
    "iva": 0.21,
    "precio_con_iva": 9671.53
  },
  {
    "producto": "adaptador tipo c a aux 3,5mm",
    "marca": null,
    "color": "blanco",
    "codigo": null,
    "cantidad": 5,
    "precio": 7993,
    "iva": 0.21,
    "precio_con_iva": 9671.53
  },
  {
    "producto": "alimentacion moto encendedor",
    "marca": "netpor",
    "color": "negro",
    "codigo": "6900750016051",
    "cantidad": 2,
    "precio": 7475,
    "iva": 0.21,
    "precio_con_iva": 9044.75
  },
  {
    "producto": "antena nm-cs150",
    "marca": "netmak",
    "color": null,
    "codigo": "70030660168",
    "cantidad": 2,
    "precio": 7820,
    "iva": 0.21,
    "precio_con_iva": 9462.2
  },
  {
    "producto": "antena wireless n",
    "marca": "wireless",
    "color": "negro",
    "codigo": "6900750011674",
    "cantidad": 5,
    "precio": 5747,
    "iva": 0.21,
    "precio_con_iva": 6953.87
  },
  {
    "producto": "aro selfie",
    "marca": null,
    "color": null,
    "codigo": "6900750004454",
    "cantidad": 26,
    "precio": 1200,
    "iva": 0.21,
    "precio_con_iva": 1452
  },
  {
    "producto": "aro led 8\" normal",
    "marca": "fill in light",
    "color": null,
    "codigo": "6900750010851",
    "cantidad": 2,
    "precio": 8650,
    "iva": 0.21,
    "precio_con_iva": 10466.5
  },
  {
    "producto": "aro led rgb 26cm",
    "marca": "rgb led",
    "color": null,
    "codigo": null,
    "cantidad": 1,
    "precio": 17328,
    "iva": 0.21,
    "precio_con_iva": 20966.88
  },
  {
    "producto": "aro led rgb 30cm",
    "marca": "rgb led",
    "color": null,
    "codigo": null,
    "cantidad": 2,
    "precio": 17600,
    "iva": 0.21,
    "precio_con_iva": 21296
  },
  {
    "producto": "aro led rgb 33cm",
    "marca": "ring fill light",
    "color": "negro",
    "codigo": null,
    "cantidad": 1,
    "precio": 17600,
    "iva": 0.21,
    "precio_con_iva": 21296
  },
  {
    "producto": "auricular 6s",
    "marca": "e6",
    "color": "azul, blanco y un color mas",
    "codigo": "6842356465584",
    "cantidad": 3,
    "precio": 14000,
    "iva": 0.21,
    "precio_con_iva": 16940
  },
  {
    "producto": "auricular akg s20+",
    "marca": "samsung",
    "color": "negro",
    "codigo": null,
    "cantidad": 1,
    "precio": 3450,
    "iva": 0.21,
    "precio_con_iva": 4174.5
  },
  {
    "producto": "auricular ar-1371",
    "marca": "rabbit ear",
    "color": "rosa y blanco",
    "codigo": "723540565999",
    "cantidad": 1,
    "precio": 13552,
    "iva": 0.21,
    "precio_con_iva": 16397.92
  },
  {
    "producto": "auricular as-60",
    "marca": "aoas",
    "color": "negro rgb",
    "codigo": "6900750012091",
    "cantidad": 2,
    "precio": 14328,
    "iva": 0.21,
    "precio_con_iva": 17336.88
  },
  {
    "producto": "auricular as-90",
    "marca": "aoas",
    "color": "negro rgb",
    "codigo": "6900750012121",
    "cantidad": 2,
    "precio": 14328,
    "iva": 0.21,
    "precio_con_iva": 17336.88
  },
  {
    "producto": "auricular y47",
    "marca": "y47",
    "color": "negro",
    "codigo": "6902022086151",
    "cantidad": 1,
    "precio": 9328,
    "iva": 0.21,
    "precio_con_iva": 11286.88
  },
  {
    "producto": "auricular",
    "marca": "p47",
    "color": "negro",
    "codigo": "6989532512530",
    "cantidad": 1,
    "precio": 5700,
    "iva": 0.21,
    "precio_con_iva": 6897
  },
  {
    "producto": "auricular",
    "marca": "p47",
    "color": "blanco",
    "codigo": "6989532512530",
    "cantidad": 2,
    "precio": 5700,
    "iva": 0.21,
    "precio_con_iva": 6897
  },
  {
    "producto": "auricular",
    "marca": "p47",
    "color": "gris con rojo",
    "codigo": "6989532512530",
    "cantidad": 2,
    "precio": 5700,
    "iva": 0.21,
    "precio_con_iva": 6897
  },
  {
    "producto": "auricular",
    "marca": "p47",
    "color": "gris con azul",
    "codigo": "6989532512530",
    "cantidad": 1,
    "precio": 5700,
    "iva": 0.21,
    "precio_con_iva": 6897
  },
  {
    "producto": "auricular true wireless",
    "marca": null,
    "color": null,
    "codigo": null,
    "cantidad": 0,
    "precio": 7680,
    "iva": 0.21,
    "precio_con_iva": 9292.8
  },
  {
    "producto": "auricular bluetooh",
    "marca": "lenovoxt82",
    "color": "negro",
    "codigo": "6973037709434",
    "cantidad": 1,
    "precio": 20500,
    "iva": 0.21,
    "precio_con_iva": 24805
  },
  {
    "producto": "auricular bluetooth airdots",
    "marca": "xiaomi",
    "color": "negro",
    "codigo": "6934177708800",
    "cantidad": 2,
    "precio": 18000,
    "iva": 0.21,
    "precio_con_iva": 21780
  },
  {
    "producto": "auricular bluetooth caja amarilla",
    "marca": "sport",
    "color": null,
    "codigo": null,
    "cantidad": 4,
    "precio": 3550,
    "iva": 0.21,
    "precio_con_iva": 4295.5
  },
  {
    "producto": "auricular bluetooth caja negro con verde",
    "marca": "wireless sport headphones",
    "color": null,
    "codigo": null,
    "cantidad": 5,
    "precio": 3550,
    "iva": 0.21,
    "precio_con_iva": 4295.5
  },
  {
    "producto": "auricular bluetooth deportivo rt558",
    "marca": "wireless headset",
    "color": null,
    "codigo": null,
    "cantidad": 4,
    "precio": 3550,
    "iva": 0.21,
    "precio_con_iva": 4295.5
  },
  {
    "producto": "auricular bluetooth mh-750",
    "marca": "sony",
    "color": null,
    "codigo": null,
    "cantidad": 5,
    "precio": 4452,
    "iva": 0.21,
    "precio_con_iva": 5386.92
  },
  {
    "producto": "auricular bluetooth mj6688 sin caja",
    "marca": "motorola",
    "color": null,
    "codigo": null,
    "cantidad": 25,
    "precio": 3500,
    "iva": 0.21,
    "precio_con_iva": 4235
  },
  {
    "producto": "auricular bluetooth mj6688",
    "marca": "motorola",
    "color": null,
    "codigo": null,
    "cantidad": 5,
    "precio": 4452,
    "iva": 0.21,
    "precio_con_iva": 5386.92
  },
  {
    "producto": "auricular bluetooth redmi",
    "marca": "xiaomi",
    "color": "negro",
    "codigo": "6934177719820",
    "cantidad": 1,
    "precio": 18000,
    "iva": 0.21,
    "precio_con_iva": 21780
  },
  {
    "producto": "auricular bluetooth t180a sin caja",
    "marca": "jbl",
    "color": null,
    "codigo": null,
    "cantidad": 24,
    "precio": 3500,
    "iva": 0.21,
    "precio_con_iva": 4235
  },
  {
    "producto": "auricular bluetooth t180a",
    "marca": "jbl",
    "color": null,
    "codigo": null,
    "cantidad": 4,
    "precio": 4452,
    "iva": 0.21,
    "precio_con_iva": 5386.92
  },
  {
    "producto": "auricular caja acrilica",
    "marca": null,
    "color": null,
    "codigo": null,
    "cantidad": 12,
    "precio": 2500,
    "iva": 0.21,
    "precio_con_iva": 3025
  },
  {
    "producto": "auricular kr-gm303",
    "marca": "gaming headset",
    "color": null,
    "codigo": null,
    "cantidad": 1,
    "precio": 11500,
    "iva": 0.21,
    "precio_con_iva": 13915
  },
  {
    "producto": "auricular kr-gm402",
    "marca": "rgb light",
    "color": null,
    "codigo": null,
    "cantidad": 1,
    "precio": 12000,
    "iva": 0.21,
    "precio_con_iva": 14520
  },
  {
    "producto": "auricular kr-gm204",
    "marca": "gaming headset",
    "color": null,
    "codigo": null,
    "cantidad": 1,
    "precio": 12000,
    "iva": 0.21,
    "precio_con_iva": 14520
  },
  {
    "producto": "auricular x2 pro",
    "marca": null,
    "color": null,
    "codigo": "6921168803485",
    "cantidad": 2,
    "precio": 11000,
    "iva": 0.21,
    "precio_con_iva": 13310
  },
  {
    "producto": "auricular x3 pro",
    "marca": null,
    "color": null,
    "codigo": "6921168803485",
    "cantidad": 2,
    "precio": 11000,
    "iva": 0.21,
    "precio_con_iva": 13310
  },
  {
    "producto": "auricular caja acrilica iphone",
    "marca": null,
    "color": "blanco",
    "codigo": null,
    "cantidad": 4,
    "precio": 5680,
    "iva": 0.21,
    "precio_con_iva": 6872.8
  },
  {
    "producto": "auricular economico bolsita",
    "marca": "i love music",
    "color": "negro",
    "codigo": null,
    "cantidad": 0,
    "precio": 862.5,
    "iva": 0.21,
    "precio_con_iva": 1043.625
  },
  {
    "producto": "auricular economico bolsita",
    "marca": "i love music",
    "color": "blanco",
    "codigo": null,
    "cantidad": 2,
    "precio": 862.5,
    "iva": 0.21,
    "precio_con_iva": 1043.625
  },
  {
    "producto": "auricular ev110",
    "marca": "elmcoei",
    "color": "fluor, lila, gris",
    "codigo": "69007500000067",
    "cantidad": 4,
    "precio": 2480,
    "iva": 0.21,
    "precio_con_iva": 3000.8
  },
  {
    "producto": "auricular extra bass mdr-xb450ap",
    "marca": "stereo headphones",
    "color": null,
    "codigo": "6900750015832",
    "cantidad": 3,
    "precio": 6118.4,
    "iva": 0.21,
    "precio_con_iva": 7403.264
  },
  {
    "producto": "auricular f9",
    "marca": "tws",
    "color": null,
    "codigo": null,
    "cantidad": 5,
    "precio": 11327.5,
    "iva": 0.21,
    "precio_con_iva": 13706.275
  },
  {
    "producto": "auricular f9 s pro",
    "marca": "Tws",
    "color": null,
    "codigo": "763571814406",
    "cantidad": 2,
    "precio": 11327.5,
    "iva": 0.21,
    "precio_con_iva": 13706.275
  },
  {
    "producto": "auricular hs330",
    "marca": "samsung",
    "color": "blanco",
    "codigo": "8007229334420",
    "cantidad": 5,
    "precio": 1918,
    "iva": 0.21,
    "precio_con_iva": 2320.78
  },
  {
    "producto": "auricular p36",
    "marca": "p36",
    "color": "negro,verde,celeste,rosa,amarillo",
    "codigo": "6954774700366",
    "cantidad": 10,
    "precio": 9500,
    "iva": 0.21,
    "precio_con_iva": 11495
  },
  {
    "producto": "auricular piranha 2103",
    "marca": "piranha",
    "color": null,
    "codigo": "6902022086137",
    "cantidad": 3,
    "precio": 6118.4,
    "iva": 0.21,
    "precio_con_iva": 7403.264
  },
  {
    "producto": "auricular s10+",
    "marca": "samsung",
    "color": "negro",
    "codigo": "6985451258122",
    "cantidad": 6,
    "precio": 2933,
    "iva": 0.21,
    "precio_con_iva": 3548.93
  },
  {
    "producto": "auricular s10+ akg",
    "marca": "samsung",
    "color": "negro",
    "codigo": "6979879845750",
    "cantidad": 2,
    "precio": 2933,
    "iva": 0.21,
    "precio_con_iva": 3548.93
  },
  {
    "producto": "auricular sy830mv",
    "marca": "sy830mv",
    "color": "negro led",
    "codigo": null,
    "cantidad": 3,
    "precio": 9300,
    "iva": 0.21,
    "precio_con_iva": 11253
  },
  {
    "producto": "auricular tipo c",
    "marca": "samsung",
    "color": "negro",
    "codigo": "699996979565",
    "cantidad": 0,
    "precio": 4180,
    "iva": 0.21,
    "precio_con_iva": 5057.8
  },
  {
    "producto": "auricular v1000",
    "marca": "taidun",
    "color": "negro",
    "codigo": "6900750010226",
    "cantidad": 2,
    "precio": 9614,
    "iva": 0.21,
    "precio_con_iva": 11632.94
  },
  {
    "producto": "auricular z-08",
    "marca": "superbass",
    "color": null,
    "codigo": "6902022086120",
    "cantidad": 3,
    "precio": 8340,
    "iva": 0.21,
    "precio_con_iva": 10091.4
  },
  {
    "producto": "auricular zw-028",
    "marca": "cat ear",
    "color": "negro,rosa,verde",
    "codigo": "6935185208177",
    "cantidad": 3,
    "precio": 10810,
    "iva": 0.21,
    "precio_con_iva": 13080.1
  },
  {
    "producto": "balanza pocket 0,1gm a 500gms",
    "marca": "pocket scale",
    "color": null,
    "codigo": "6945545645009",
    "cantidad": 2,
    "precio": 5330,
    "iva": 0.21,
    "precio_con_iva": 6449.3
  },
  {
    "producto": "balanza portatil 50kg",
    "marca": null,
    "color": null,
    "codigo": "651651035491",
    "cantidad": 3,
    "precio": 3984,
    "iva": 0.21,
    "precio_con_iva": 4820.64
  },
  {
    "producto": "balanza personal 180kg",
    "marca": "star vision",
    "color": "transparente",
    "codigo": "1654986196555",
    "cantidad": 3,
    "precio": 12872,
    "iva": 0.21,
    "precio_con_iva": 15575.12
  },
  {
    "producto": "balanza 10kg",
    "marca": "madison",
    "color": null,
    "codigo": "bal-sf-400",
    "cantidad": 4,
    "precio": 6020,
    "iva": 0.21,
    "precio_con_iva": 7284.2
  },
  {
    "producto": "balanza digital comercial 40kg",
    "marca": "kalpana",
    "color": null,
    "codigo": null,
    "cantidad": 2,
    "precio": 54208,
    "iva": 0.21,
    "precio_con_iva": 65591.68
  },
  {
    "producto": "botella 3 en 1",
    "marca": null,
    "color": null,
    "codigo": null,
    "cantidad": 1,
    "precio": 14500,
    "iva": 0.21,
    "precio_con_iva": 17545
  },
  {
    "producto": "cabezal auto tipo c",
    "marca": "apple",
    "color": null,
    "codigo": "190198889973",
    "cantidad": 3,
    "precio": 7370,
    "iva": 0.21,
    "precio_con_iva": 8917.7
  },
  {
    "producto": "Cabezal auto",
    "marca": "ibek",
    "color": null,
    "codigo": "7795234533938",
    "cantidad": 4,
    "precio": 4580,
    "iva": 0.21,
    "precio_con_iva": 5541.8
  },
  {
    "producto": "cabezal 25W  tipo C",
    "marca": "samsung",
    "color": "negro",
    "codigo": null,
    "cantidad": 5,
    "precio": 6325,
    "iva": 0.21,
    "precio_con_iva": 7653.25
  },
  {
    "producto": "cabezal 5.1",
    "marca": "inova",
    "color": null,
    "codigo": "7799061004340",
    "cantidad": 4,
    "precio": 3800,
    "iva": 0.21,
    "precio_con_iva": 4598
  },
  {
    "producto": "cabezal iphone tipo c",
    "marca": null,
    "color": null,
    "codigo": null,
    "cantidad": 0,
    "precio": 9500,
    "iva": 0.21,
    "precio_con_iva": 11495
  },
  {
    "producto": "cable ethernet 5mts",
    "marca": "bentaf",
    "color": "azul",
    "codigo": "2234567891012",
    "cantidad": 5,
    "precio": 1540,
    "iva": 0.21,
    "precio_con_iva": 1863.4
  },
  {
    "producto": "cable ethernet 10mts",
    "marca": "lian pu",
    "color": "azul",
    "codigo": "2234567891012",
    "cantidad": 1,
    "precio": 2330,
    "iva": 0.21,
    "precio_con_iva": 2819.3
  },
  {
    "producto": "cable ethernet 20mts",
    "marca": "lian pu",
    "color": "azul",
    "codigo": "2234567891012",
    "cantidad": 1,
    "precio": 3520,
    "iva": 0.21,
    "precio_con_iva": 4259.2
  },
  {
    "producto": "cable de impresora 1,5mts",
    "cantidad": 4,
    "precio": 1552,
    "iva": 0.21,
    "precio_con_iva": 1877.92,
    "precio_redondeado": 1880,
    "precio_aumentado": 1650
  },
  {
    "producto": "cable de alimentacion pc",
    "cantidad": 9,
    "precio": 2621,
    "iva": 0.21,
    "precio_con_iva": 3171.41,
    "precio_redondeado": 3200,
    "precio_aumentado": 2650
  },
  {
    "producto": "cable de alimentacion trebol",
    "cantidad": 8,
    "precio": 3370,
    "iva": 0.21,
    "precio_con_iva": 4077.7,
    "precio_redondeado": 4080
  },
  {
    "producto": "cable audio y video",
    "cantidad": 3,
    "precio": 990,
    "iva": 0.21,
    "precio_con_iva": 1197.9,
    "precio_redondeado": 1200
  },
  {
    "producto": "cable aux a aux 1,5mts",
    "cantidad": 5,
    "precio": 1200,
    "iva": 0.21,
    "precio_con_iva": 1452,
    "precio_redondeado": 1460,
    "precio_aumentado": 1335.84
  },
  {
    "producto": "cable usb a usb",
    "marca": "aoweixun orvesion",
    "color": "negro",
    "codigo": "6900750011728",
    "cantidad": 5,
    "precio": 2300,
    "iva": 0.21,
    "precio_con_iva": 2783,
    "precio_redondeado": 2790,
    "precio_aumentado": 2450
  },
  {
    "producto": "cable adaptador hdmi a vga",
    "marca": "netmak",
    "color": "blanco",
    "codigo": "7792641880815",
    "cantidad": 2,
    "precio": 8512,
    "iva": 0.21,
    "precio_con_iva": 10299.52,
    "precio_redondeado": 10300
  },
  {
    "producto": "cable hdmi a vga",
    "marca": "xiu ing",
    "codigo": "6910000060253",
    "cantidad": 2,
    "precio": 4470,
    "iva": 0.21,
    "precio_con_iva": 5408.7,
    "precio_redondeado": 5450,
    "precio_aumentado": 4050
  },
  {
    "producto": "cable hdmi",
    "cantidad": 3,
    "precio": 5129,
    "iva": 0.21,
    "precio_con_iva": 6206.09,
    "precio_redondeado": 6500,
    "precio_aumentado": 4452.8
  },
  {
    "producto": "cable iphone acrilica 1m",
    "marca": "acrilico",
    "color": "blanco",
    "codigo": "4583653533546",
    "cantidad": 0,
    "precio": 3850,
    "iva": 0.21,
    "precio_con_iva": 4658.5,
    "precio_redondeado": 4660,
    "precio_aumentado": 3896.2
  },
  {
    "producto": "cable iphone 1mt",
    "marca": "caja blanca",
    "color": "blanco",
    "cantidad": 0,
    "precio": 4450,
    "iva": 0.21,
    "precio_con_iva": 5384.5,
    "precio_redondeado": 5400
  },
  {
    "producto": "cable iphone caja 2m",
    "marca": "caja",
    "color": "blanco",
    "codigo": "4547597815533",
    "cantidad": 11,
    "precio": 5200,
    "iva": 0.21,
    "precio_con_iva": 6292,
    "precio_redondeado": 6300,
    "precio_aumentado": 5357.275
  },
  {
    "producto": "cable tipo c",
    "marca": "inova",
    "color": "negro",
    "cantidad": 0,
    "precio": 2705,
    "iva": 0.21,
    "precio_con_iva": 3273.05,
    "precio_redondeado": 3280,
    "precio_aumentado": 3270.025
  },
  {
    "producto": "cable tipo c",
    "marca": "bolsita verde",
    "color": "blanco",
    "cantidad": 0,
    "precio": 2070,
    "iva": 0.21,
    "precio_con_iva": 2504.7,
    "precio_redondeado": 2520
  },
  {
    "producto": "cable tipo c",
    "marca": "motorola",
    "color": "negro",
    "codigo": "6985479685894",
    "cantidad": 4,
    "precio": 3450,
    "iva": 0.21,
    "precio_con_iva": 4174.5,
    "precio_redondeado": 4200
  },
  {
    "producto": "cable tipo c a iphone",
    "marca": "inova",
    "color": "blanco",
    "cantidad": 2,
    "precio": 3760,
    "iva": 0.21,
    "precio_con_iva": 4549.6,
    "precio_redondeado": 4550,
    "precio_aumentado": 3896.2
  },
  {
    "producto": "cable tipo c a tipo c",
    "marca": "protection mobile",
    "color": "blanco/negro",
    "codigo": "50129",
    "cantidad": 4,
    "precio": 2650,
    "iva": 0.21,
    "precio_con_iva": 3206.5,
    "precio_redondeado": 3220,
    "precio_aumentado": 3000
  },
  {
    "producto": "cable tipo c a lightning",
    "marca": "protection mobile",
    "color": "blanco",
    "codigo": "50131",
    "cantidad": 4,
    "precio": 4162,
    "iva": 0.21,
    "precio_con_iva": 5036.02,
    "precio_redondeado": 5040,
    "precio_aumentado": 3339.6
  },
  {
    "producto": "cable tipo c tipo original 111111",
    "marca": "bolsita",
    "color": "blanco",
    "cantidad": 6,
    "precio": 1840,
    "iva": 0.21,
    "precio_con_iva": 2226.4,
    "precio_redondeado": 2250,
    "precio_aumentado": 2017.675
  },
  {
    "producto": "cable v3",
    "cantidad": 9,
    "precio": 1400,
    "iva": 0.21,
    "precio_con_iva": 1694,
    "precio_redondeado": 1700
  },
  {
    "producto": "cable usb tela",
    "color": "negro, dorado, rojo",
    "cantidad": 4,
    "precio": 1208,
    "iva": 0.21,
    "precio_con_iva": 1461.68,
    "precio_redondeado": 1480,
    "precio_aumentado": 1461.075
  },
  {
    "producto": "cable usb tubito",
    "marca": "Inova",
    "codigo": "7798318654628",
    "cantidad": 29,
    "precio": 2434,
    "iva": 0.21,
    "precio_con_iva": 2945.14,
    "precio_redondeado": 2950,
    "precio_aumentado": 2574.275
  },
  {
    "producto": "cable usb v8",
    "marca": "3A",
    "color": "verde",
    "cantidad": 5,
    "precio": 1720,
    "iva": 0.21,
    "precio_con_iva": 2081.2,
    "precio_redondeado": 2100,
    "precio_aumentado": 1808.95
  },
  {
    "producto": "cable usb v8",
    "marca": "3A",
    "color": "lila",
    "cantidad": 4,
    "precio": 1720,
    "iva": 0.21,
    "precio_con_iva": 2081.2,
    "precio_redondeado": 2100,
    "precio_aumentado": 1808.95
  },
  {
    "producto": "cable usb v8",
    "marca": "3A",
    "color": "negro",
    "cantidad": 3,
    "precio": 1720,
    "iva": 0.21,
    "precio_con_iva": 2081.2,
    "precio_redondeado": 2100,
    "precio_aumentado": 1808.95
  },
  {
    "producto": "cable usb v8",
    "marca": "3A",
    "color": "blanco",
    "cantidad": 5,
    "precio": 1720,
    "iva": 0.21,
    "precio_con_iva": 2081.2,
    "precio_redondeado": 2100,
    "precio_aumentado": 1808.95
  },
  {
    "producto": "camara web",
    "marca": "suono",
    "codigo": "701575361939",
    "cantidad": 3,
    "precio": 3250,
    "iva": 0.21,
    "precio_con_iva": 3932.5,
    "precio_redondeado": 4000,
    "precio_aumentado": 3800
  },
  {
    "producto": "camara web",
    "cantidad": 7,
    "precio": 3250,
    "iva": 0.21,
    "precio_con_iva": 3932.5,
    "precio_redondeado": 4000,
    "precio_aumentado": 4025
  },
  {
    "producto": "camara oreja conejo",
    "color": "celeste",
    "cantidad": 2,
    "precio": 4600,
    "iva": 0.21,
    "precio_con_iva": 5566,
    "precio_redondeado": 5600,
    "precio_aumentado": 4600
  },
  {
    "producto": "cargador led wireless parlante",
    "cantidad": 2,
    "precio": 24392,
    "iva": 0.21,
    "precio_con_iva": 29514.32,
    "precio_redondeado": 29520,
    "precio_aumentado": 24400
  },
  {
    "producto": "cargador transformador 12v 2A",
    "cantidad": 3,
    "precio": 5925,
    "iva": 0.21,
    "precio_con_iva": 7169.25,
    "precio_redondeado": 7170,
    "precio_aumentado": 6250
  },
  {
    "producto": "cargador inalambrico tipo c",
    "marca": "apple",
    "codigo": "194252192443",
    "cantidad": 3,
    "precio": 9032,
    "iva": 0.21,
    "precio_con_iva": 10928.72,
    "precio_redondeado": 10950,
    "precio_aumentado": 9050
  },
  {
    "producto": "cargador auto",
    "marca": "bolsita",
    "color": "negro",
    "cantidad": 6,
    "precio": 1750,
    "iva": 0.21,
    "precio_con_iva": 2117.5,
    "precio_redondeado": 2120,
    "precio_aumentado": 2017.675
  },
  {
    "producto": "cargador auto 5.1a",
    "marca": "unipha",
    "color": "rojo-dorado",
    "cantidad": 4,
    "precio": 4232,
    "iva": 0.21,
    "precio_con_iva": 5120.72,
    "precio_redondeado": 5150,
    "precio_aumentado": 4452.8
  },
  {
    "producto": "cargador de auto",
    "marca": "motorola",
    "codigo": "7237558983322",
    "cantidad": 2,
    "precio": 4176,
    "iva": 0.21,
    "precio_con_iva": 5052.96,
    "precio_redondeado": 5060,
    "precio_aumentado": 4174.5
  },
  {
    "producto": "cargador tipo c a tipo c alternativo",
    "marca": "samsung",
    "cantidad": 6,
    "precio": 6912,
    "iva": 0.21,
    "precio_con_iva": 8363.52,
    "precio_redondeado": 8370,
    "precio_aumentado": 7000
  },
  {
    "producto": "cargador s21+",
    "marca": "samsung",
    "codigo": "6984521230686",
    "cantidad": 3,
    "precio": 6900,
    "iva": 0.21,
    "precio_con_iva": 8349,
    "precio_redondeado": 8350,
    "precio_aumentado": 8349
  },
  {
    "producto": "cargador de iphone",
    "marca": "apple",
    "color": "blanco",
    "codigo": "6900750001002",
    "cantidad": 2,
    "precio": 8100,
    "iva": 0.21,
    "precio_con_iva": 9801,
    "precio_redondeado": 9800,
    "precio_aumentado": 9601.35
  },
  {
    "producto": "cargador iphone",
    "marca": "i5",
    "codigo": "7799153000038",
    "cantidad": 10,
    "precio": 6348,
    "iva": 0.21,
    "precio_con_iva": 7681.08,
    "precio_redondeado": 7690,
    "precio_aumentado": 6679.2
  },
  {
    "producto": "cargador tipo c",
    "marca": "i5",
    "color": "blanco",
    "cantidad": 8,
    "precio": 5952,
    "iva": 0.21,
    "precio_con_iva": 7201.92,
    "precio_redondeado": 7210,
    "precio_aumentado": 6261.75
  },
  {
    "producto": "cargador tipo c 5.1",
    "marca": "inova",
    "color": "blanco",
    "codigo": "7799061004401",
    "cantidad": 5,
    "precio": 6877,
    "iva": 0.21,
    "precio_con_iva": 8321.17,
    "precio_redondeado": 8330,
    "precio_aumentado": 7235.8
  },
  {
    "producto": "cargador v8",
    "marca": "i5",
    "color": "blanco",
    "cantidad": 8,
    "precio": 5621,
    "iva": 0.21,
    "precio_con_iva": 6801.41,
    "precio_redondeado": 6810,
    "precio_aumentado": 5913.875
  },
  {
    "producto": "consola de juego individual",
    "marca": "sup",
    "codigo": "699252923184",
    "cantidad": 4,
    "precio": 12560,
    "iva": 0.21,
    "precio_con_iva": 15197.6,
    "precio_redondeado": 15200,
    "precio_aumentado": 12800
  },
  {
    "producto": "consola de juego con joystick",
    "marca": "sup",
    "codigo": "6968952142350",
    "cantidad": 1,
    "precio": 15152,
    "iva": 0.21,
    "precio_con_iva": 18333.92,
    "precio_redondeado": 18350,
    "precio_aumentado": 15195.18
  },
  {
    "producto": "consola de juego sy-890a",
    "marca": "game start",
    "color": "rojo",
    "codigo": "6922629500829",
    "cantidad": 1,
    "precio": 13800,
    "iva": 0.21,
    "precio_con_iva": 16698,
    "precio_redondeado": 16700,
    "precio_aumentado": 16698
  },
  {
    "producto": "consola para tv joystick inalambrico",
    "marca": "game dougle",
    "codigo": "6972325580236",
    "cantidad": 5,
    "precio": 29413,
    "iva": 0.21,
    "precio_con_iva": 35589.73,
    "precio_redondeado": 35590,
    "precio_aumentado": 30946.96
  },
  {
    "producto": "consola pop it",
    "marca": "whack a mole game machine",
    "codigo": "6998245028207",
    "cantidad": 7,
    "precio": 14605,
    "iva": 0.21,
    "precio_con_iva": 17672.05,
    "precio_redondeado": 17680,
    "precio_aumentado": 14605
  },
  {
    "producto": "convertidor bluetooth",
    "marca": "music receiver",
    "color": "negro",
    "codigo": "6971354300921",
    "cantidad": 9,
    "precio": 3240,
    "iva": 0.21,
    "precio_con_iva": 3920.4,
    "precio_redondeado": 3950,
    "precio_aumentado": 3896.2
  },
  {
    "producto": "cortadora de pelo",
    "marca": "suono",
    "codigo": "729208240772",
    "cantidad": 2,
    "precio": 9990,
    "iva": 0.21,
    "precio_con_iva": 12087.9,
    "precio_redondeado": 12100
  },
  {
    "producto": "cortadora de pelo messi",
    "marca": "wl-10001",
    "codigo": "7817646100017",
    "cantidad": 1,
    "precio": 8000,
    "iva": 0.21,
    "precio_con_iva": 9680,
    "precio_redondeado": 9680,
    "precio_aumentado": 8200
  },
  {
    "producto": "cortadora de pelo mascota",
    "marca": "star vision",
    "codigo": "6931846846634",
    "cantidad": 4,
    "precio": 16100,
    "iva": 0.21,
    "precio_con_iva": 19481,
    "precio_redondeado": 19500,
    "precio_aumentado": 15200
  },
  {
    "producto": "cortadora de pelo tr-981",
    "marca": "hytoshy",
    "codigo": "178099391708",
    "cantidad": 1,
    "precio": 8712,
    "iva": 0.21,
    "precio_con_iva": 10541.52,
    "precio_redondeado": 10550,
    "precio_aumentado": 8750
  },
  {
    "producto": "cortadora de pelo vintage",
    "marca": "vintage t9",
    "cantidad": 2,
    "precio": 17952,
    "iva": 0.21,
    "precio_con_iva": 21721.92,
    "precio_redondeado": 21750,
    "precio_aumentado": 18000
  },
  {
    "producto": "correa corta",
    "cantidad": 2,
    "precio": 3571,
    "iva": 0.21,
    "precio_con_iva": 4320.91,
    "precio_redondeado": 4350,
    "precio_aumentado": 3757.05
  },
  {
    "producto": "correa larga",
    "cantidad": 1,
    "precio": 3571,
    "iva": 0.21,
    "precio_con_iva": 4320.91,
    "precio_redondeado": 4350,
    "precio_aumentado": 3757.05
  },
  {
    "producto": "kit destornillador",
    "cantidad": 2,
    "precio": 7800,
    "iva": 0.21,
    "precio_con_iva": 9438,
    "precio_redondeado": 9500,
    "precio_aumentado": 9487.5
  },
  {
    "producto": "enchufe para lampara",
    "cantidad": 1,
    "color": "blanco",
    "precio": 680,
    "iva": 0.21,
    "precio_con_iva": 822.8,
    "precio_redondeado": 850,
    "precio_aumentado": 695.75
  },
  {
    "producto": "enchufe triple toma",
    "cantidad": 2,
    "color": "blanco",
    "precio": 1550,
    "iva": 0.21,
    "precio_con_iva": 1875.5,
    "precio_redondeado": 1880,
    "precio_aumentado": 834.9
  },
  {
    "producto": "espejo zoom",
    "marca": "suono",
    "color": "blanco",
    "codigo": "736382874245",
    "cantidad": 3,
    "precio": 8890,
    "iva": 0.21,
    "precio_con_iva": 10756.9,
    "precio_redondeado": 10800
  },
  {
    "producto": "Kit de grabación",
    "cantidad": 4,
    "precio": 13940,
    "iva": 0.21,
    "precio_con_iva": 16867.4,
    "precio_redondeado": 16870,
    "precio_aumentado": 13950
  },
  {
    "producto": "funda para analogico",
    "marca": "thumb grips",
    "color": "negro,verde,azul,blanco",
    "codigo": "6900750018161",
    "cantidad": 5,
    "precio": 1125,
    "iva": 0.21,
    "precio_con_iva": 1361.25,
    "precio_redondeado": 1370,
    "precio_aumentado": 1182.775
  },
  {
    "producto": "hub tipo c 4 puertos",
    "cantidad": 3,
    "precio": 9178,
    "iva": 0.21,
    "precio_con_iva": 11105.38,
    "precio_redondeado": 11110,
    "precio_aumentado": 10575.4
  },
  {
    "producto": "joystick gamepad",
    "codigo": "7292082400868",
    "cantidad": 1,
    "precio": 10.336,
    "iva": 0.21,
    "precio_con_iva": 12506.56,
    "precio_redondeado": 12520
  },
  {
    "producto": "joystick x3",
    "codigo": "6900750011636",
    "cantidad": 1,
    "precio": 20.592,
    "iva": 0.21,
    "precio_con_iva": 24916.32,
    "precio_redondeado": 24950,
    "precio_aumentado": 9660
  },
  {
    "producto": "joystick p3",
    "marca": "doubleshock",
    "color": "negro",
    "codigo": "6900750002795",
    "cantidad": 3,
    "precio": 14.128,
    "iva": 0.21,
    "precio_con_iva": 17094.88,
    "precio_redondeado": 17100,
    "precio_aumentado": 14541.175
  },
  {
    "producto": "joystick pc",
    "marca": "usb game pad",
    "color": "negro",
    "codigo": "693786731218",
    "cantidad": 2,
    "precio": 8258,
    "iva": 0.21,
    "precio_con_iva": 9992.18,
    "precio_redondeado": 10000,
    "precio_aumentado": 9253.475
  },
  {
    "producto": "joystick play 4 sin marca",
    "color": "negro",
    "codigo": "6926556542310",
    "cantidad": 3,
    "precio": 29.6,
    "iva": 0.21,
    "precio_con_iva": 35816,
    "precio_redondeado": 35820,
    "precio_aumentado": 27273.4
  },
  {
    "producto": "joystick play 4 sony",
    "color": "azul y rojo",
    "codigo": "711719870258",
    "cantidad": 2,
    "precio": 35.2,
    "iva": 0.21,
    "precio_con_iva": 42592,
    "precio_redondeado": 42600,
    "precio_aumentado": 31169.6
  },
  {
    "producto": "laser pointer",
    "codigo": "6920221003038",
    "cantidad": 2,
    "precio": 12100,
    "iva": 0.21,
    "precio_con_iva": 14641,
    "precio_redondeado": 14650,
    "precio_aumentado": 12100
  },
  {
    "producto": "licuadora portatil",
    "marca": "portable life, love it",
    "codigo": "6972910210111",
    "cantidad": 3,
    "precio": 11228,
    "iva": 0.21,
    "precio_con_iva": 13585.88,
    "precio_redondeado": 13600,
    "precio_aumentado": 11250
  },
  {
    "producto": "luz bicicleta usb nm-ld4",
    "marca": "netmak",
    "codigo": "700306602938",
    "cantidad": 2,
    "precio": 10260,
    "iva": 0.21,
    "precio_con_iva": 12414.6,
    "precio_redondeado": 12500,
    "precio_aumentado": 10300
  },
  {
    "producto": "luz bicicleta usb nm-ld5",
    "marca": "netmak",
    "codigo": "700306602921",
    "cantidad": 2,
    "precio": 9098,
    "iva": 0.21,
    "precio_con_iva": 11008.58,
    "precio_redondeado": 11050,
    "precio_aumentado": 9100
  },
  {
    "producto": "luz led emergencia",
    "codigo": "6942687635905",
    "cantidad": 1,
    "precio": 13938,
    "iva": 0.21,
    "precio_con_iva": 16864.98,
    "precio_redondeado": 16900,
    "precio_aumentado": 14000
  },
  {
    "producto": "luz de neon",
    "marca": "neon led",
    "color": "rosa,blanco,fluor,celeste",
    "codigo": "8900020225464",
    "cantidad": 7,
    "precio": 12880,
    "iva": 0.21,
    "precio_con_iva": 15584.8,
    "precio_redondeado": 15600
  },
  {
    "producto": "mate beer pint 160ml",
    "marca": "beer pints",
    "cantidad": 2,
    "precio": 10070,
    "iva": 0.21,
    "precio_con_iva": 12184.7,
    "precio_redondeado": 12200,
    "precio_aumentado": 10070
  },
  {
    "producto": "malla reloj m5-m6",
    "marca": "bolsita",
    "codigo": "6902022082252",
    "cantidad": 10,
    "precio": 2070,
    "iva": 0.21,
    "precio_con_iva": 2504.7,
    "precio_redondeado": 2500,
    "precio_aumentado": 2504.7
  },
  {
    "producto": "memoria 32gb generica",
    "marca": "kingston",
    "color": "negro",
    "codigo": "740617120677",
    "cantidad": 0,
    "precio": 4890,
    "iva": 0.21,
    "precio_con_iva": 5916.9,
    "precio_redondeado": 5950,
    "precio_aumentado": 5913.875
  },
  {
    "producto": "memoria 32gb",
    "marca": "kingston",
    "codigo": "740617298680",
    "cantidad": 3,
    "precio": 9600,
    "iva": 0.21,
    "precio_con_iva": 11616,
    "precio_redondeado": 11650,
    "precio_aumentado": 9680
  },
  {
    "producto": "memoria 64gb",
    "marca": "kingston",
    "color": "negro",
    "codigo": "740617298697",
    "cantidad": 3,
    "precio": 11680,
    "iva": 0.21,
    "precio_con_iva": 14132.8,
    "precio_redondeado": 14200,
    "precio_aumentado": 13803.68
  },
  {
    "producto": "microfono corbatero",
    "modelo": "ps-01",
    "cantidad": 2,
    "precio": 3030,
    "iva": 0.21,
    "precio_con_iva": 3666.3,
    "precio_redondeado": 3700,
    "precio_aumentado": 3100
  },
  {
    "producto": "microfono aux",
    "color": "negro",
    "codigo": "6900750011681",
    "cantidad": 1,
    "precio": 2000,
    "IVA": 0.21,
    "precio_con_iva": 2420,
    "precio_redondeado": 2450,
    "precio_aumentado": 2226.4
  },
  {
    "producto": "mouse kos-m0201",
    "marca": "kosmo",
    "codigo": "7792391201014",
    "cantidad": 2,
    "precio": 5732,
    "IVA": 0.21,
    "precio_con_iva": 6935.72,
    "precio_redondeado": 6950,
    "precio_aumentado": 5750
  },
  {
    "producto": "mouse dn-n512",
    "marca": "seisa",
    "color": "negro",
    "codigo": "6290132557754",
    "cantidad": 2,
    "precio": 2645,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 3220,
    "precio_aumentado": 2783
  },
  {
    "producto": "mouse gamer e30",
    "descripcion": "gaming mouse",
    "cantidad": 0,
    "precio": 4232,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 5150,
    "precio_aumentado": "4452,8"
  },
  {
    "producto": "mouse gamer x14",
    "marca": "jiexin",
    "cantidad": 0,
    "precio": 4232,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 5120,
    "precio_aumentado": "4452,8"
  },
  {
    "producto": "Mouse",
    "marca": "Jiexin",
    "codigo": "6900750000456",
    "cantidad": 5,
    "precio": 2645,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 3220
  },
  {
    "producto": "mouse mog-107",
    "marca": "gtc",
    "color": "negro",
    "codigo": "8071011013411",
    "cantidad": 2,
    "precio": 2645,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 3220,
    "precio_aumentado": 2783
  },
  {
    "producto": "mouse pad comun",
    "marca": "comfort pad",
    "color": "negro",
    "cantidad": 1,
    "precio": 1600,
    "IVA": 0.21,
    "precio_con_iva": 1936,
    "precio_redondeado": 2000,
    "precio_aumentado": "1600,225"
  },
  {
    "producto": "mouse pad grande 90*40",
    "marca": "yelandar",
    "codigo": "6900750018260",
    "cantidad": 3,
    "precio": 4166,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 5050,
    "precio_aumentado": "4383,225"
  },
  {
    "producto": "mouse st100",
    "marca": "st somostec",
    "color": "negro",
    "codigo": "790757823075",
    "cantidad": 3,
    "precio": 2645,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 3220,
    "precio_aumentado": 2783
  },
  {
    "producto": "muerde cable",
    "descripcion": "cartoon cable protector",
    "cantidad": 6,
    "precio": 1600,
    "IVA": 0.21,
    "precio_con_iva": 1936,
    "precio_redondeado": 1950
  },
  {
    "producto": "termo 1,2l bsp-1005-r",
    "marca": "bigstar",
    "codigo": "7863404100515",
    "cantidad": 2,
    "precio": 27538,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 33350,
    "precio_aumentado": 27600
  },
  {
    "producto": "pad laptop stand",
    "descripcion": "stable base",
    "cantidad": 3,
    "precio": 6463,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 7850,
    "precio_aumentado": 6500
  },
  {
    "producto": "parlante mini",
    "marca": "l59",
    "cantidad": 2,
    "precio": 8050,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 9750
  },
  {
    "producto": "parlante microfono",
    "cantidad": 10,
    "precio": 7520,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 9100,
    "precio_aumentado": 7290
  },
  {
    "producto": "parlante inova",
    "marca": "inova",
    "modelo": "par-200",
    "cantidad": 1,
    "precio": 24040,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 29100,
    "precio_aumentado": 25300
  },
  {
    "producto": "parlante imit. jbl",
    "marca": "jbl",
    "color": "verde/rojo",
    "cantidad": 0,
    "precio": 11086,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 13450,
    "precio_aumentado": 11700
  },
  {
    "producto": "parlante 3\"",
    "modelo": "bt-1302",
    "cantidad": 1,
    "precio": 11132,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 13500,
    "precio_aumentado": 7900
  },
  {
    "producto": "parlante 3\" gts-1360",
    "descripcion": "fantastic quality",
    "color": "negro",
    "cantidad": 2,
    "precio": 11132,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 13500,
    "precio_aumentado": "12245,2"
  },
  {
    "producto": "parlante 3\" gts-1373 led",
    "descripcion": "fantastic quality",
    "color": "negro",
    "cantidad": 2,
    "precio": 11132,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 13500,
    "precio_aumentado": "12245,2"
  },
  {
    "producto": "parlante 3\" lm-s330",
    "descripcion": "portable speaker",
    "color": "negro",
    "codigo": "6970017856331",
    "cantidad": 2,
    "precio": 11132,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 13500,
    "precio_aumentado": "12245,2"
  },
  {
    "producto": "parlante 4,5\"",
    "cantidad": 0,
    "precio": 12696,
    "IVA": 0.21,
    "precio_con_iva": null,
    "precio_redondeado": 15400,
    "precio_aumentado": "13358,4"
  },
  {
    "producto": "parlante 6,5\" con mic",
    "marca": null,
    "color": "negro",
    "codigo": null,
    "cantidad": 1,
    "precio": 33286,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante 6,5\" sin mic hsd-170bt",
    "marca": "okfly",
    "color": "negro",
    "cantidad": 2,
    "precio": 25604,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante 8\" con mic",
    "cantidad": 1,
    "precio": 44807,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante 8\" sin mic",
    "cantidad": 1,
    "precio": 42695,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante 8\" x 2",
    "cantidad": 1,
    "precio": 63480,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante led multicolor",
    "cantidad": 1,
    "precio": 13755,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante pc",
    "marca": "netmak",
    "color": "rojo",
    "codigo": 700306602297,
    "cantidad": 2,
    "precio": 10240,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante pc",
    "marca": "netmak",
    "color": "azul",
    "codigo": 700306602280,
    "cantidad": 2,
    "precio": 10240,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante simil airpod",
    "marca": null,
    "color": "rosa",
    "codigo": 6290132568835,
    "cantidad": 1,
    "precio": 11410,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "parlante spider-man 3\"",
    "marca": "phantom",
    "color": "negro",
    "codigo": null,
    "cantidad": 1,
    "precio": 16068,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "pava electrica",
    "marca": "ibek",
    "color": "acero",
    "cantidad": 2,
    "precio": 15270,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "pendrive 16gb",
    "marca": "sandisk",
    "codigo": 61965900043,
    "cantidad": 1,
    "precio": 9280,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "pendrive 32gb",
    "marca": "sandisk",
    "codigo": 619659115890,
    "cantidad": 3,
    "precio": 10000,
    "IVA": 0.21,
    "precio_con_iva": 12100
  },
  {
    "producto": "pendrive 64gb",
    "marca": "kingston",
    "color": "negro",
    "codigo": 740617309829,
    "cantidad": 1,
    "precio": 11840,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "pila cr2032",
    "marca": "lithium",
    "codigo": 6970905201458,
    "cantidad": 3,
    "precio": 625,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "pila cr2032",
    "marca": "netmak",
    "codigo": 700306601498,
    "cantidad": 10,
    "precio": 625,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "pizarra magica 10\"",
    "marca": "environment-friendly",
    "cantidad": 7,
    "precio": 9027.5,
    "iva": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "pizarra magica 8,5\"",
    "marca": "lcd writing",
    "color": "2negro,2blanco,rojo",
    "cantidad": 1,
    "precio": 5692.5,
    "iva": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "Planchita",
    "marca": "Make time",
    "cantidad": 3,
    "precio": 4150,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "Planchita",
    "marca": "New nova",
    "codigo": 6950999800157,
    "cantidad": 2,
    "precio": 7350,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "Planchita",
    "marca": "Hytoshy",
    "codigo": 6910219208682,
    "cantidad": 2,
    "precio": 13120,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "reloj watch 7 t900",
    "marca": "watch",
    "color": "azul",
    "codigo": 6959266121327,
    "cantidad": 3,
    "precio": 15870,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "reloj watch 8 t500",
    "marca": "watch",
    "color": "negro",
    "cantidad": 0,
    "precio": 16550,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "reloj watch m6",
    "marca": "m6",
    "color": "rosa",
    "codigo": 6902022082047,
    "cantidad": 3,
    "precio": 10950,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "reloj watch w26+",
    "marca": "watch",
    "color": "rosa",
    "cantidad": 1,
    "precio": 21280,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "reloj i9",
    "marca": "ultra max",
    "cantidad": 3,
    "precio": 23010,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "reloj t10 ultra",
    "cantidad": 2,
    "precio": 23010,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "ringos animado",
    "marca": "ringo",
    "codigo": 7798346720012,
    "cantidad": 16,
    "precio": 1900,
    "IVA": 0.21,
    "precio_con_iva": 2299
  },
  {
    "producto": "Secadora de pelo",
    "marca": "Imega",
    "codigo": 6985854822913,
    "cantidad": 1,
    "precio": 16320,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "Secadora de pelo",
    "marca": "Remington",
    "codigo": 6985214720330,
    "cantidad": 1,
    "precio": 12550,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "Secadora de pelo",
    "marca": "Hytoshy",
    "codigo": 1000804028070,
    "cantidad": 1,
    "precio": 11040,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "soporte auto retrovisor",
    "marca": "netmak",
    "codigo": 700306604390,
    "cantidad": 3,
    "precio": 8711,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "soporte auricular mueca",
    "marca": "bolsita",
    "color": "negro",
    "codigo": 6900750016853,
    "cantidad": 3,
    "precio": 800,
    "IVA": 0.21,
    "precio_con_iva": 968
  },
  {
    "producto": "soporte auto",
    "marca": "i5",
    "color": "negro",
    "cantidad": 7,
    "precio": 7936,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "soporte auto aire spo-008",
    "marca": "inova",
    "color": "negro",
    "codigo": 7798318655083,
    "cantidad": 2,
    "precio": 6776,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "soporte de bici",
    "marca": "360",
    "color": "caja blanca/azul",
    "codigo": 22000308000015,
    "cantidad": 3,
    "precio": 7000,
    "IVA": 0.21,
    "precio_con_iva": 8470
  },
  {
    "producto": "soporte brazal",
    "color": "verde flour-violeta",
    "cantidad": 2,
    "precio": 2250,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "soporte manito",
    "color": "negro,verde",
    "cantidad": 2,
    "precio": 1587,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "soporte plegable",
    "color": "azul,verde",
    "codigo": 6900750011612,
    "cantidad": 2,
    "precio": 750,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "autoestereo xbtqd",
    "marca": "xbtqd",
    "codigo": 6974407807453,
    "cantidad": 2,
    "precio": 30976,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "autoestereo suono",
    "marca": "suono",
    "codigo": 701575361199,
    "cantidad": 2,
    "precio": 25520,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "teclado portatil",
    "marca": "rgb",
    "color": "rgb",
    "cantidad": 1,
    "precio": 10976,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "teclado tec-002",
    "marca": "inova",
    "codigo": 7798318657889,
    "cantidad": 2,
    "precio": 4445,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "teclado 3 en 1",
    "marca": "gtc",
    "codigo": 8072019092408,
    "cantidad": 1,
    "precio": 12564,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "teclado 5en1 gamer k2100",
    "marca": "yelandar",
    "codigo": 6902022085000,
    "cantidad": 2,
    "precio": 22218,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "trípode con control bluetooth",
    "marca": "k07",
    "cantidad": 2,
    "precio": 7500,
    "IVA": 0.21,
    "precio_con_iva": 9075
  },
  {
    "producto": "tripod support",
    "color": "negro",
    "cantidad": 0,
    "precio": 2315,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "tripode 1mt",
    "cantidad": 1,
    "precio": 7500,
    "IVA": 0.21,
    "precio_con_iva": 9075
  },
  {
    "producto": "tripode 2mt",
    "cantidad": 3,
    "precio": 8130,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "tripode articulable",
    "marca": "strong and sturdy",
    "codigo": 6900750002634,
    "cantidad": 1,
    "precio": 1654,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "ventilador 10\"",
    "marca": "hytoshy",
    "codigo": 7798185862072,
    "cantidad": 1,
    "precio": 34400,
    "IVA": 0.21,
    "precio_con_iva": 41624
  },
  {
    "producto": "ventilador 18\"",
    "marca": "hytoshy",
    "codigo": 77981855861860,
    "cantidad": 1,
    "precio": 47360,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "vga a vga",
    "cantidad": 8,
    "precio": 1530,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "zapatilla con 5 coma 5mts",
    "marca": "vr plast",
    "color": "blanco",
    "cantidad": 1,
    "precio": 7935,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "zapatilla con 5 toma 1,5mts",
    "marca": "vr plast",
    "color": "blanco",
    "cantidad": 0,
    "precio": 4876,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "zapatilla con 5 toma 3mts",
    "marca": "vr plast",
    "color": "blanco",
    "cantidad": 1,
    "precio": 5440,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "lampara multicolor",
    "marca": "ditron",
    "codigo": 7790420026324,
    "cantidad": 2,
    "precio": 3174,
    "IVA": 0.21,
    "precio_con_iva": null
  },
  {
    "producto": "esferas imantadas",
    "cantidad": 17,
    "precio": 500,
    "IVA": "2 x 900",
    "precio_con_iva": 0
  },
  {
    "producto": "flux solder",
    "cantidad": 9,
    "precio": 2645,
    "IVA": "1,21",
    "precio_con_iva": null
  },
  {
    "producto": "destornillador",
    "marca": "acrilico",
    "cantidad": 3,
    "precio": 2645,
    "IVA": "1,21",
    "precio_con_iva": null
  },
  {
    "producto": "pilas recargable AA",
    "marca": "netmak",
    "codigo": 700306601481,
    "cantidad": 1,
    "precio": 8905,
    "IVA": "1,21",
    "precio_con_iva": null
  },
  {
    "producto": "pilas recargable AAA",
    "marca": "netmak",
    "codigo": 700306601474,
    "cantidad": 1,
    "precio": 6200,
    "IVA": "1,21",
    "precio_con_iva": 7502
  },
  {
    "producto": "pila economica AAA",
    "marca": "star vision",
    "codigo": 1596845386540,
    "cantidad": 84,
    "precio": 290,
    "IVA": "1,21",
    "precio_con_iva": null
  },
  {
    "producto": "pila economico AA",
    "marca": "star vision",
    "codigo": 2044040699549,
    "cantidad": 49,
    "precio": 360,
    "IVA": "1,21",
    "precio_con_iva": null
  }
];
@Component({
  selector: 'app-nueva-funcionalidad',
  templateUrl: './nueva-funcionalidad.component.html',
  styleUrls: ['./nueva-funcionalidad.component.scss'],
})
export class NuevaFuncionalidadComponent implements OnInit {
  productos = productoseas;
  camposSeleccionados = ['producto', 'codigo', 'cantidad', 'precio'];
  productosAMostrar: any[] = productoseas;
  loggedUser!: User;
  isActionSheetOpen = false;
  actionSheetButtons: any[] = [{
    text: 'Editar información',
    icon: 'create-outline',
    handler: async () => {
    },
  }, {
    text: 'Cambiar Stock Rapido',
    icon: 'chevron-expand-outline',
    handler: async () => {
    },
  }, {
    text: 'Cancelar',
    role: 'cancel',
    icon: 'close',
    handler: () => { },
  }];
  constructor(public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService,
    private modalController: ModalController) {
    this.authService.user$.subscribe(res => {
      this.loggedUser = res;
    })
  }

  ngOnInit() {
    this.productos.forEach((obj: any) => {
      Object.keys(obj).forEach(key => {
        if (obj[key] === "") {
          obj[key] = null;
        }
      });
    });
    console.log(this.productos)
    // let productos = this.productos.map(produ => {
    //   produ.precio_con_iva = Number(produ.precio_con_iva);
    //   return produ;
    // })
    // console.log(productos)
  }
  async seleccionar(producto: any) {
    try {
      const modal = await this.modalController.create({
        component: "DetalleModuloComponent",
        componentProps: {
          producto,
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data || !result.role) return;

      })
      return await modal.present();
    } catch (err) {
    }

  }

  filtrarProductos(event: any) {
    console.log(event.target.value);
    const valorBusqueda = event.target.value.toLowerCase();
    this.productosAMostrar = this.productos.filter(producto => {
      // Verificar si el producto contiene el valor de búsqueda
      return producto.producto.toLowerCase().includes(valorBusqueda);
    });
  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }
  mostrarOpciones() {
    this.setOpen(true);
  }


  async agregarCodigoDeBarra(event: Event, producto: any) {
    event.stopPropagation();
    try {
      const modal = await this.modalController.create({
        component: BarcodeScannerComponent,
        componentProps: {
          producto,
        },
      })

      modal.onDidDismiss().then(async (result: any) => {
        if (!result.data || !result.role) return;

      })
      return await modal.present();
    } catch (err) {
    }
  }

  cargarImagen(event: Event, producto: any) {
    event.stopPropagation();

  }
}
