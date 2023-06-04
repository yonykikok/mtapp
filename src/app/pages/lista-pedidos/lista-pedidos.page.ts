import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { FormPedidoComponent } from 'src/app/components/forms/form-pedido/form-pedido.component';
import { DetallePedidoComponent } from 'src/app/components/views/detalle-pedido/detalle-pedido.component';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
export interface PeriodicElement {
  tipo: string;
  modelo: string;
  cantidad: number;
}

var ELEMENT_DATA: PeriodicElement[] = [
];
@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  listaSeleccionada = 'pendientes';
  pedidosAMostrar = [];
  pedidos = {
    conseguidos: [
      {
        "modelo": "j4 ",
        "fecha": 1680301367164,
        "conseguido": true,
        "prioridad": "Opcional",
        "tipo": "modulo",
        "cantidad": " ",
        "cliente": null,
        "detalle": "celeste (0) dorado(1) negro(1)",
        "id": "0S0FBBrvNh4v40sxsKIf"
      },
      {
        "cliente": "boleta (4239)",
        "fecha": 1679093253263,
        "conseguido": true,
        "tipo": "Flex de carga",
        "modelo": "one fusion",
        "id": "16KpShlzN96Wzb47TqPc",
        "detalle": " ",
        "cantidad": "1",
        "prioridad": "Urgente"
      },
      {
        "cliente": "boleta 4650",
        "tipo": "Modulo (ver version)",
        "conseguido": true,
        "prioridad": "Urgente",
        "fecha": 1683928572963,
        "modelo": "a03s",
        "detalle": " ",
        "id": "187Q0JJ9lR0zuKcBimED",
        "cantidad": "1 "
      },
      {
        "id": "1AAxe188d4Ub1PC4srys",
        "cantidad": "1",
        "prioridad": "Urgente",
        "conseguido": true,
        "modelo": "a71",
        "fecha": 1683928019982,
        "detalle": " ",
        "tipo": "Modulo oled",
        "cliente": "boleta 4693"
      },
      {
        "fecha": 1678491749321,
        "detalle": "queda 1 solo negro",
        "id": "1AxaIe9BrRiIG7LXRNqH",
        "cantidad": "1",
        "modelo": "j7 2016",
        "prioridad": "Opcional",
        "cliente": null,
        "conseguido": true,
        "tipo": "Modulo"
      },
      {
        "prioridad": "Opcional",
        "id": "1HqAGWEoxzauaDXTaf6a",
        "fecha": 1684535416627,
        "modelo": "a20s",
        "cliente": "",
        "conseguido": true,
        "cantidad": "",
        "tipo": "Modulo",
        "detalle": "queda 1"
      },
      {
        "fecha": 1678458049529,
        "cliente": "",
        "conseguido": true,
        "cantidad": "1",
        "detalle": " ",
        "id": "1dryMBt4CsRjl4wUy9kj",
        "modelo": "E20/E40",
        "tipo": "funda ",
        "prioridad": "Sin stock"
      },
      {
        "detalle": "",
        "fecha": 1680725684047,
        "cliente": "miguel mendoza 1138654126",
        "prioridad": "Urgente",
        "modelo": "lg typ 2800 mah",
        "id": "2geM5GtEeVK42p7cUxTw",
        "conseguido": true,
        "tipo": "Bateria",
        "cantidad": " "
      },
      {
        "tipo": "Modulo",
        "prioridad": "Urgente",
        "conseguido": true,
        "detalle": "hasta 20mil paga",
        "fecha": 1679094538679,
        "modelo": "xiaomi mi 8 lite",
        "id": "3yJyfPGdLqXFs9SmOZ0p",
        "cliente": "boleta 4437",
        "cantidad": "1"
      },
      {
        "tipo": "Modulo",
        "conseguido": true,
        "prioridad": "Opcional",
        "modelo": "a01",
        "detalle": "queda 1",
        "cantidad": "1",
        "id": "4DIzTn7SRI9opPjsrAM5",
        "fecha": 1678491598831,
        "cliente": ""
      },
      {
        "fecha": 1680301442964,
        "tipo": "Modulo",
        "conseguido": true,
        "prioridad": "Opcional",
        "detalle": "negro (0) blanco (2) ",
        "cantidad": " ",
        "id": "4OpMiQ0b4GhRYNNNemtW",
        "cliente": null,
        "modelo": "j5 prime"
      },
      {
        "fecha": 1679665521538,
        "cantidad": "1",
        "detalle": " ",
        "conseguido": true,
        "id": "4vAuxkoIPFuovuP3yrrR",
        "modelo": "a51",
        "cliente": "",
        "prioridad": "Sin stock",
        "tipo": "Modulo"
      },
      {
        "detalle": " ",
        "conseguido": true,
        "prioridad": "Sin stock",
        "cliente": null,
        "fecha": 1678491890491,
        "tipo": "Modulo",
        "cantidad": "1",
        "id": "60a7Hc2UpSGY2cHPRaIt",
        "modelo": "g51"
      },
      {
        "id": "61DU1JihrXBlgnjvfTZk",
        "tipo": "Modulo",
        "conseguido": true,
        "detalle": "queda 1",
        "fecha": 1678491804531,
        "modelo": "e5/g6 play",
        "cantidad": "1",
        "prioridad": "Opcional",
        "cliente": null
      },
      {
        "cantidad": " ",
        "id": "62IyGw6ljNPpGYmhqk2W",
        "tipo": "modulo",
        "prioridad": "Opcional",
        "cliente": null,
        "modelo": "a51",
        "conseguido": true,
        "fecha": 1680301231205,
        "detalle": "tenemos 1"
      },
      {
        "conseguido": true,
        "modelo": "a20s",
        "tipo": "tapa azul",
        "cliente": "",
        "cantidad": "1",
        "detalle": "4575boleta me hago cargo adriana",
        "id": "66zvilTmhekgIj4JG1i4",
        "prioridad": "Urgente",
        "fecha": 1681770050735
      },
      {
        "cantidad": "  ",
        "tipo": "Modulo",
        "conseguido": true,
        "detalle": "BLANCO",
        "fecha": 1684499854389,
        "id": "6IgcDUV5FII2n4SGq6f0",
        "prioridad": "Urgente",
        "modelo": "IPHONE 7 PLUS",
        "cliente": "BOLETA (4718)"
      },
      {
        "prioridad": "Urgente",
        "fecha": 1681218118079,
        "conseguido": true,
        "detalle": "model-nt40",
        "tipo": "Bateria",
        "cliente": "boleta 4546",
        "cantidad": "1",
        "id": "70DYPO9oQ0IisQocbDOS",
        "modelo": "e20"
      },
      {
        "tipo": "funda",
        "cliente": "",
        "detalle": " ",
        "id": "7Iq5fCftT8bsUiileEm4",
        "conseguido": true,
        "fecha": 1681994502880,
        "prioridad": "Sin stock",
        "modelo": "a04e",
        "cantidad": " "
      },
      {
        "prioridad": "Sin stock",
        "conseguido": true,
        "fecha": 1680301499099,
        "tipo": "modulo",
        "modelo": "g31-g41-g71",
        "cliente": null,
        "id": "7UgpcOjGlpN16tfNFfOI",
        "detalle": " ",
        "cantidad": " "
      },
      {
        "modelo": "one fusion",
        "cliente": null,
        "fecha": 1679094524785,
        "id": "7VLuXbR2bo61F1ZSyRtq",
        "prioridad": "Sin stock",
        "cantidad": " ",
        "detalle": " ",
        "conseguido": true,
        "tipo": "Modulo"
      },
      {
        "modelo": "j7 2016",
        "id": "7cwacrIWsNusd3WKJEpu",
        "prioridad": "Urgente",
        "tipo": "Modulo",
        "conseguido": true,
        "cantidad": "1",
        "cliente": "boleta (4438)",
        "fecha": 1679094225832,
        "detalle": "dorado"
      },
      {
        "detalle": " ",
        "cantidad": "1",
        "cliente": "",
        "conseguido": true,
        "id": "7pnE0jitmdfZ0R4tsQBD",
        "prioridad": "Averiguar",
        "tipo": "funda",
        "fecha": 1681219230186,
        "modelo": "e22"
      },
      {
        "id": "8OOnu32Mw7ZMW6AtXLOg",
        "detalle": " ",
        "prioridad": "Averiguar",
        "conseguido": true,
        "cliente": null,
        "tipo": "film",
        "modelo": "e22",
        "fecha": 1681474970986,
        "cantidad": " "
      },
      {
        "fecha": 1679094437604,
        "modelo": "a11",
        "prioridad": "Opcional",
        "cantidad": "1",
        "tipo": "Modulo",
        "id": "9J1IHOBXUxit1McViDuT",
        "cliente": null,
        "detalle": "queda 1",
        "conseguido": true
      },
      {
        "fecha": 1681505970230,
        "detalle": " ",
        "cliente": "",
        "conseguido": true,
        "tipo": "luces led",
        "prioridad": "Urgente",
        "cantidad": "   ",
        "modelo": " ",
        "id": "AKcI919ryRjhBeZgy4ai",
        "nota": "$3500"
      },
      {
        "prioridad": "Sin stock",
        "cantidad": " ",
        "tipo": "Modulo",
        "cliente": null,
        "id": "C64ZxEAqR4jjxvl7CptA",
        "conseguido": true,
        "modelo": "k41s",
        "fecha": 1679665617650,
        "detalle": " "
      },
      {
        "conseguido": true,
        "cliente": "boleta 4561",
        "modelo": "a51",
        "fecha": 1681506537700,
        "tipo": "Modulo",
        "id": "DQ1K31z83f2Y4wYLUA91",
        "detalle": "generico bueno",
        "prioridad": "Urgente",
        "cantidad": ""
      },
      {
        "id": "DRNqhexwGneBGjappzgH",
        "modelo": "g20",
        "prioridad": "Urgente",
        "tipo": "vibrador ",
        "conseguido": true,
        "detalle": " ",
        "cantidad": "1",
        "fecha": 1678491604960,
        "cliente": "boleta 4375"
      },
      {
        "modelo": "A20",
        "cliente": null,
        "detalle": " ",
        "cantidad": "1",
        "id": "DkXU4gCdK17mX9EhUYT5",
        "tipo": "film",
        "prioridad": "Opcional",
        "conseguido": true,
        "fecha": 1678311199036
      },
      {
        "detalle": " ",
        "fecha": 1678491866362,
        "modelo": "one fusion",
        "prioridad": "Sin stock",
        "id": "DuQENlve8m11Nl0bekZf",
        "tipo": "Modulo",
        "conseguido": true,
        "cliente": null,
        "cantidad": "1"
      },
      {
        "tipo": "funda flipcover",
        "conseguido": true,
        "cantidad": "1   ",
        "detalle": " ",
        "fecha": 1682023206477,
        "cliente": "1127223374 angel ",
        "prioridad": "Urgente",
        "id": "EZfIjmvFAtjti37Z6ezg",
        "modelo": "a02"
      },
      {
        "conseguido": true,
        "prioridad": "Opcional",
        "fecha": 1680301302085,
        "detalle": "blanco (0) negro(2)",
        "cliente": null,
        "id": "Ec3LB46sfYk85EzJXcXM",
        "modelo": "i.6g",
        "cantidad": " ",
        "tipo": "Modulo"
      },
      {
        "tipo": "Modulo",
        "conseguido": true,
        "prioridad": "Opcional",
        "fecha": 1679094407228,
        "cantidad": "1",
        "id": "FCOYCUPBDpwCfwXM8dxY",
        "modelo": "a10s",
        "detalle": "queda 1",
        "cliente": ""
      },
      {
        "id": "GLIeNcBBpvVURnxgfKoV",
        "prioridad": "Opcional",
        "modelo": "a21s",
        "conseguido": true,
        "detalle": "tenemos 1 c/m y 0 s/m",
        "cliente": null,
        "tipo": "Modulo",
        "cantidad": " ",
        "fecha": 1683321722660
      },
      {
        "cliente": null,
        "cantidad": " ",
        "fecha": 1680301213813,
        "conseguido": true,
        "id": "HJFcTo5AHw1wRO4TLgnv",
        "modelo": "g8",
        "tipo": "modulo",
        "detalle": "tenemos 1",
        "prioridad": "Opcional"
      },
      {
        "modelo": "LG K22",
        "fecha": 1684500043152,
        "tipo": "CUBRE LENTE TRASERO",
        "detalle": "  ",
        "prioridad": "Urgente",
        "cliente": "BOLETA (4681) 1140840368",
        "cantidad": " ",
        "id": "IRQLeTdpjYsJWVWJ2dfd",
        "conseguido": true
      },
      {
        "cliente": "",
        "id": "IVMLYOkPuCuZrmw4cSZm",
        "prioridad": "Averiguar",
        "fecha": 1679094270101,
        "modelo": "s22",
        "detalle": "rosa multicolor",
        "conseguido": true,
        "tipo": "funda",
        "cantidad": "1"
      },
      {
        "detalle": " ",
        "conseguido": true,
        "tipo": "film",
        "fecha": 1681415437569,
        "prioridad": "Sin stock",
        "cliente": null,
        "cantidad": " ",
        "id": "IaToXvGUBhXYuBWZUAhM",
        "modelo": "e6 play"
      },
      {
        "conseguido": true,
        "modelo": "e4 plus",
        "id": "ItpJvLOWFFEVsN0COTsv",
        "prioridad": "Sin stock",
        "fecha": 1681512354611,
        "tipo": "Modulo",
        "cantidad": " 1",
        "cliente": "",
        "detalle": " "
      },
      {
        "id": "JfJdHDdwlX9nCQCuKKUj",
        "cliente": null,
        "detalle": "  ",
        "prioridad": "Sin stock",
        "tipo": "Flex de carga",
        "fecha": 1680725794233,
        "conseguido": true,
        "modelo": "e6i/e6s",
        "cantidad": "1"
      },
      {
        "conseguido": true,
        "detalle": " tenemos 1",
        "prioridad": "Opcional",
        "cantidad": "1",
        "modelo": "a10s",
        "id": "JrdUJHHZayvvi8yNlSHu",
        "cliente": "",
        "fecha": 1680301191531,
        "tipo": "modulo"
      },
      {
        "fecha": 1678491835303,
        "id": "K5Ulm04djYH6P0ipzG9h",
        "conseguido": true,
        "cliente": null,
        "prioridad": "Sin stock",
        "detalle": " ",
        "tipo": "Modulo",
        "cantidad": "1",
        "modelo": "g5s plus"
      },
      {
        "id": "KFcYFtOUgWc7gK4BypEa",
        "tipo": "Flex de carga",
        "prioridad": "Urgente",
        "detalle": "garantia",
        "modelo": "a21s",
        "cliente": "boleta (4688)",
        "cantidad": "",
        "fecha": 1684527968490,
        "conseguido": true
      },
      {
        "fecha": 1678311003593,
        "cantidad": "1",
        "conseguido": true,
        "detalle": "10D",
        "cliente": "",
        "prioridad": "Sin stock",
        "id": "KUS4cufMowqrOGeD4dY6",
        "tipo": "film 10d",
        "modelo": "a22"
      },
      {
        "cantidad": "1",
        "fecha": 1684535339979,
        "cliente": "",
        "detalle": "queda 1",
        "id": "LlicohiNLrXYsoPiVtgF",
        "modelo": "a12/a02",
        "prioridad": "Opcional",
        "conseguido": true,
        "tipo": "Modulo"
      },
      {
        "cantidad": " 4",
        "id": "LtSnLRCoc9O704OrWxU2",
        "modelo": "g31",
        "cliente": "",
        "fecha": 1680954883425,
        "detalle": "sin stock",
        "prioridad": "Urgente",
        "tipo": "film",
        "conseguido": true
      },
      {
        "tipo": "funda ",
        "prioridad": "Opcional",
        "modelo": "a03",
        "id": "MpM9t1pdppBlYeh7iPzJ",
        "fecha": 1678454511910,
        "cantidad": "1",
        "cliente": null,
        "conseguido": true,
        "detalle": " quedan 2"
      },
      {
        "prioridad": "Opcional",
        "cantidad": " ",
        "modelo": "j6",
        "cliente": null,
        "tipo": "Modulo",
        "detalle": "0 en stock 1 en garantia",
        "id": "NozqRm7NRIyxHviTCFjX",
        "conseguido": true,
        "fecha": 1682116433415
      },
      {
        "detalle": " ",
        "cliente": null,
        "cantidad": " ",
        "tipo": "film ",
        "id": "Oulhh2U0f55eed35dw0G",
        "conseguido": true,
        "fecha": 1681415379813,
        "prioridad": "Sin stock",
        "modelo": "a04"
      },
      {
        "tipo": "modulo",
        "prioridad": "Urgente",
        "cliente": "boleta 4377",
        "fecha": 1678491639438,
        "conseguido": true,
        "detalle": "se le paso aprox $15500",
        "cantidad": "1",
        "id": "PP0oDCnlfc1E3bDG4eqa",
        "modelo": "y9 prime 2019"
      },
      {
        "conseguido": true,
        "cliente": null,
        "fecha": 1678491635829,
        "detalle": "queda 1",
        "tipo": "Modulo",
        "modelo": "a12/a02",
        "prioridad": "Opcional",
        "id": "QjcZMMkisiJx5GpeLztf",
        "cantidad": "1"
      },
      {
        "fecha": 1684535376648,
        "tipo": "Modulo",
        "id": "RGFGzDLWdWmkCTa54sNt",
        "conseguido": true,
        "cliente": null,
        "prioridad": "Opcional",
        "detalle": "queda 1",
        "modelo": "a10",
        "cantidad": " "
      },
      {
        "fecha": 1679094184509,
        "tipo": "Boton fisico(interno)",
        "prioridad": "Urgente",
        "conseguido": true,
        "cliente": "boleta (4438)",
        "detalle": "power",
        "modelo": "j7 2016",
        "cantidad": "1",
        "id": "RvnxlNjjpnGKExIAD9sO"
      },
      {
        "detalle": " ",
        "tipo": "film 10d y comun",
        "prioridad": "Urgente",
        "modelo": "a04",
        "cliente": "",
        "cantidad": "5",
        "conseguido": true,
        "id": "SaffO5dtcTPialhK9XVP",
        "fecha": 1678550457722
      },
      {
        "detalle": "flip cover",
        "cliente": null,
        "cantidad": " ",
        "fecha": 1681415295644,
        "id": "T3Tu1nIbxaD2WOkxUi9K",
        "tipo": "funda",
        "modelo": "a33 5g",
        "conseguido": true,
        "prioridad": "Averiguar"
      },
      {
        "conseguido": true,
        "fecha": 1678311167125,
        "cantidad": "1",
        "detalle": " ",
        "cliente": "",
        "modelo": "a10",
        "tipo": "film 10d",
        "id": "TZhUomiMZHwvSwp9cllT",
        "prioridad": "Sin stock"
      },
      {
        "cliente": "michael",
        "id": "TkP7TtwZpBHkKokz5Pu0",
        "prioridad": "Averiguar",
        "cantidad": "1",
        "modelo": "iphone 12 pro",
        "detalle": " ",
        "conseguido": true,
        "fecha": 1680013813760,
        "tipo": "film"
      },
      {
        "prioridad": "Opcional",
        "fecha": 1682720174020,
        "cliente": null,
        "id": "U51UXHmk3G2zx65eKvEY",
        "cantidad": "1",
        "detalle": "queda 1",
        "modelo": "a02",
        "conseguido": true,
        "tipo": "Flex de carga"
      },
      {
        "prioridad": "Averiguar",
        "id": "UCebWfS9VvUth2W0h2v2",
        "cantidad": " ",
        "fecha": 1681480407829,
        "detalle": "con diseño de mujer ",
        "conseguido": true,
        "modelo": "g20",
        "tipo": "funda",
        "cliente": ""
      },
      {
        "prioridad": "Urgente",
        "tipo": "modulo oled",
        "id": "Vwe00hGG938wSHe7TVVu",
        "cantidad": "1",
        "detalle": "original oled",
        "fecha": 1683299606610,
        "modelo": "a70",
        "cliente": "boleta (4667)",
        "conseguido": true
      },
      {
        "prioridad": "Averiguar",
        "conseguido": true,
        "cliente": "",
        "id": "WjJnwBF9JANjLeJZMXBT",
        "fecha": 1679579758094,
        "tipo": "funda ",
        "cantidad": "1",
        "detalle": "transparente o lisa quedan 4 con diseños",
        "modelo": "e7 plus"
      },
      {
        "tipo": "Flex de carga",
        "modelo": "e6i",
        "conseguido": true,
        "cliente": null,
        "cantidad": null,
        "prioridad": "Opcional",
        "detalle": " queda 1",
        "id": "Xkp2i4ZVzXzezaH3lMHg",
        "fecha": 1682720245009
      },
      {
        "detalle": " ",
        "prioridad": "Urgente",
        "cantidad": " ",
        "conseguido": true,
        "id": "YDWzzQ3hdUZaIAtK3Nbq",
        "fecha": 1682084863217,
        "tipo": "Cubre lente",
        "cliente": "boleta (4598)\n1130853105 (adrian)",
        "modelo": "g6 plus"
      },
      {
        "conseguido": true,
        "fecha": 1683918998705,
        "modelo": "j4",
        "cliente": null,
        "prioridad": "Opcional",
        "id": "YLCR34XUnUZNmIZaAA29",
        "detalle": "negro (0) celeste (1) dorado (1)",
        "tipo": "Modulo",
        "cantidad": " "
      },
      {
        "cliente": null,
        "modelo": "j4",
        "cantidad": " ",
        "conseguido": true,
        "prioridad": "Opcional",
        "id": "Z6yZLqKVHXB1Hqtu7Ik4",
        "tipo": "Modulo",
        "fecha": 1680954732006,
        "detalle": "tenemos celeste (0) negro(1) dorado (1)"
      },
      {
        "detalle": "",
        "fecha": 1683840378002,
        "id": "ZndP9nydGPHeXIGNKeRu",
        "prioridad": "Averiguar",
        "conseguido": true,
        "tipo": "flex power",
        "modelo": "e5 play go",
        "cantidad": " ",
        "cliente": "pablo 1150294114"
      },
      {
        "tipo": "Modulo",
        "prioridad": "Urgente",
        "cantidad": " ",
        "nota": "INCELL CLIENTE INSISTE",
        "id": "Zr94uAbxVjsrUdhY9wEn",
        "fecha": 1684500671553,
        "cliente": "BOLETA (4590)",
        "modelo": "J6",
        "conseguido": true,
        "detalle": "GENERICO BUENO"
      },
      {
        "id": "ZthwVtPYkYKpXae8JJC2",
        "detalle": "negro 0, celeste 1 dorado 1",
        "cantidad": " ",
        "conseguido": true,
        "tipo": "Modulo",
        "fecha": 1682116407304,
        "prioridad": null,
        "cliente": null,
        "modelo": "j4"
      },
      {
        "fecha": 1682720223372,
        "prioridad": "Opcional",
        "cantidad": " ",
        "tipo": "Flex de carga",
        "modelo": "e6 plus",
        "id": "Zxs5TNG9v1uX7GS5FKcP",
        "detalle": "queda 1",
        "cliente": null,
        "conseguido": true
      },
      {
        "id": "aIKSZ08ZcGmRttae4UoK",
        "modelo": "g31",
        "tipo": "film",
        "conseguido": true,
        "cantidad": "10",
        "detalle": " ",
        "cliente": "",
        "prioridad": "Sin stock",
        "fecha": 1680351557583
      },
      {
        "detalle": " ",
        "tipo": "Modulo",
        "id": "arTw5Gh3U35C1nFlXjh7",
        "cliente": "",
        "prioridad": "Sin stock",
        "fecha": 1683918913849,
        "conseguido": true,
        "modelo": "a01",
        "cantidad": " "
      },
      {
        "tipo": "film ",
        "cantidad": " ",
        "prioridad": "Sin stock",
        "fecha": 1682085103890,
        "cliente": null,
        "modelo": "e6 play",
        "id": "b51PBP1ZzWgYvEf5ARbH",
        "conseguido": true,
        "detalle": " queda 1 "
      },
      {
        "cantidad": " ",
        "prioridad": "Sin stock",
        "conseguido": true,
        "tipo": "Modulo",
        "cliente": null,
        "id": "cTzRL2VHqPc3SOGz2lpW",
        "detalle": " ",
        "modelo": "a13",
        "fecha": 1684506727831
      },
      {
        "detalle": "tenemos 1(blanco) 1(dorados)",
        "id": "d6pTC5yeycGFNu6PLtVQ",
        "cliente": null,
        "conseguido": true,
        "prioridad": "Opcional",
        "fecha": 1679665575090,
        "cantidad": " ",
        "modelo": "j7 2016",
        "tipo": "Modulo"
      },
      {
        "cantidad": "1",
        "tipo": "Bateria",
        "cliente": "boleta (4397)",
        "detalle": " je30",
        "prioridad": "Urgente",
        "modelo": "moto g5",
        "conseguido": true,
        "id": "d8AXsh2ZOUJVb4Rsw3wI",
        "fecha": 1679094074866
      },
      {
        "conseguido": true,
        "cantidad": "1",
        "modelo": "a51",
        "tipo": "Cubre lente",
        "fecha": 1682513641577,
        "detalle": " ",
        "prioridad": "Urgente",
        "id": "dE1btEt0JEPfcmaePqOl",
        "cliente": "1162476864 Noelia"
      },
      {
        "conseguido": true,
        "id": "dIQfcQtXl43caCItJzku",
        "cliente": null,
        "modelo": "g22",
        "cantidad": " ",
        "fecha": 1680301271877,
        "detalle": "tenemos 1",
        "prioridad": "Opcional",
        "tipo": "Modulo"
      },
      {
        "detalle": "ORIGINAL OLED C/M",
        "modelo": "A03S",
        "id": "eBCc52xzxyrmABwvrMLg",
        "cantidad": " ",
        "prioridad": "Urgente",
        "tipo": "Modulo",
        "cliente": "BOLETA 4650",
        "fecha": 1684529365797,
        "conseguido": true
      },
      {
        "cantidad": " ",
        "detalle": " ",
        "conseguido": true,
        "fecha": 1684500610423,
        "id": "eE9fIqpWIyLKm2yjOUVi",
        "modelo": "MOTO Z PLAY",
        "cliente": "BOLETA (4714) 1157047624",
        "tipo": "Modulo",
        "prioridad": "Urgente"
      },
      {
        "cliente": "boleta 4239",
        "tipo": "bateria jk50",
        "cantidad": " 1",
        "prioridad": "Urgente",
        "conseguido": true,
        "modelo": "one fusion ",
        "id": "eST06bZ3Alsi1vLaWoVc",
        "detalle": " ",
        "fecha": 1679664774966
      },
      {
        "prioridad": "Sin stock",
        "cliente": null,
        "detalle": " ",
        "tipo": "film ",
        "cantidad": " ",
        "conseguido": true,
        "id": "eWfCTV9SpTkoGCuyKtQR",
        "fecha": 1681415399544,
        "modelo": "g31"
      },
      {
        "modelo": "a04",
        "prioridad": "Urgente",
        "detalle": " sin stock",
        "tipo": "film",
        "id": "fEtHVOfSCUP7DCWFQDgs",
        "fecha": 1680812211203,
        "conseguido": true,
        "cliente": "matias 1167001653",
        "cantidad": "5"
      },
      {
        "cantidad": "1",
        "conseguido": true,
        "detalle": "power",
        "fecha": 1679094143451,
        "modelo": "j7 2016",
        "tipo": "Boton fisico(interno)",
        "prioridad": "Urgente",
        "cliente": "boleta (4406)",
        "id": "gbjliqfxRwnGcuoMrMQM"
      },
      {
        "id": "goWfiE5q30SZCBeSiDsJ",
        "fecha": 1679664937313,
        "prioridad": "Urgente",
        "tipo": "Flex de carga",
        "cliente": "boleta 4455",
        "modelo": "e7 plus",
        "detalle": " ",
        "cantidad": "1",
        "conseguido": true
      },
      {
        "fecha": 1681994550876,
        "tipo": "film 10d",
        "conseguido": true,
        "prioridad": "Opcional",
        "detalle": "quedan 4",
        "id": "h0BjBg1MtsSCithw1v5Y",
        "cliente": null,
        "cantidad": " ",
        "modelo": "a04"
      },
      {
        "conseguido": true,
        "tipo": "Bateria",
        "cantidad": "1",
        "id": "hjLiF8EJSJZ3swGXjTWM",
        "cliente": "lionel dejo seña de $3000",
        "fecha": 1680698880437,
        "detalle": "gk40",
        "prioridad": "Urgente",
        "modelo": "moto g5"
      },
      {
        "detalle": " ",
        "fecha": 1682113378120,
        "tipo": "pin suelto",
        "id": "i8GHzmJuiXclJ0SP2qGz",
        "modelo": "e6 plus",
        "conseguido": true,
        "cliente": "",
        "cantidad": " ",
        "prioridad": "Urgente"
      },
      {
        "detalle": " ",
        "modelo": "a20s",
        "cliente": "",
        "fecha": 1682549273596,
        "prioridad": "Urgente",
        "tipo": "Flex de carga",
        "cantidad": " ",
        "conseguido": true,
        "id": "iPjw3XsRQNqnN67cuJcg"
      },
      {
        "prioridad": "Urgente",
        "tipo": "Bateria",
        "cliente": "boleta 4598 1130853105 (adrian)",
        "id": "jOzh7ja5HrgxCuYsCbNH",
        "modelo": "g6 plus",
        "fecha": 1682084766517,
        "conseguido": true,
        "cantidad": " ",
        "detalle": ""
      },
      {
        "id": "jj6R57rygmQwzsGjxFrG",
        "fecha": 1681846227618,
        "tipo": "funda",
        "cliente": "graciela 1167357663",
        "prioridad": "Averiguar",
        "cantidad": "1",
        "detalle": "transparente, antigolpes ",
        "conseguido": true,
        "modelo": "e13"
      },
      {
        "conseguido": true,
        "tipo": "film",
        "id": "lBIG9sd429I825T17IVq",
        "fecha": 1678311051265,
        "detalle": "comun",
        "cliente": null,
        "cantidad": "1",
        "modelo": "a22",
        "prioridad": "Sin stock"
      },
      {
        "conseguido": true,
        "tipo": "Modulo con marco",
        "modelo": "a03s",
        "detalle": "con marco",
        "cantidad": " ",
        "prioridad": "Urgente",
        "id": "lUicNv4Vw0Sdp2n3j9Bk",
        "fecha": 1683299710773,
        "cliente": "boleta (4650)"
      },
      {
        "fecha": 1680812173998,
        "id": "lo3ORKUu6G38g1QeTja3",
        "detalle": "transparente",
        "conseguido": true,
        "modelo": "a04",
        "cliente": "1167001653 matias",
        "tipo": "funda",
        "cantidad": "2",
        "prioridad": "Urgente"
      },
      {
        "prioridad": "Opcional",
        "modelo": "a23",
        "tipo": "film",
        "cantidad": " ",
        "conseguido": true,
        "detalle": "quedan 3",
        "fecha": 1683322293583,
        "id": "mThcoDyRAAWtxy1MPCPH",
        "cliente": null
      },
      {
        "conseguido": true,
        "modelo": "g5",
        "fecha": 1679664658741,
        "cliente": "boleta 4464",
        "tipo": "Flex de carga",
        "cantidad": "1",
        "detalle": " ",
        "id": "mdg7MDk0Loogrw9T53XB",
        "prioridad": "Urgente"
      },
      {
        "fecha": 1680184890288,
        "tipo": "Bateria",
        "modelo": "g30",
        "prioridad": "Urgente",
        "id": "mfm6GYS7EMTlqNLNmQRK",
        "cliente": "boleta (4491)",
        "cantidad": "jk50",
        "conseguido": true,
        "detalle": " "
      },
      {
        "tipo": "funda",
        "prioridad": "Averiguar",
        "fecha": 1679094289937,
        "conseguido": true,
        "cantidad": "1",
        "detalle": " ",
        "cliente": null,
        "modelo": "e13",
        "id": "n6kANWzQg8WkswEi1GDM"
      },
      {
        "cantidad": "2",
        "cliente": "",
        "prioridad": "Sin stock",
        "tipo": "modulo",
        "conseguido": true,
        "modelo": "a02/a12",
        "detalle": " ",
        "fecha": 1683321685022,
        "id": "nbJxbKuNDQiPJB2puZe6"
      },
      {
        "cantidad": "1",
        "prioridad": "Sin stock",
        "tipo": "film",
        "fecha": 1678454437327,
        "cliente": "",
        "id": "ndDlVRkVUVIxhd80WK5W",
        "modelo": "a03 core",
        "conseguido": true,
        "detalle": "comun/ 10D"
      },
      {
        "cliente": "boleta (4725) 1166371511",
        "conseguido": true,
        "prioridad": "Urgente",
        "detalle": "generico bueno",
        "tipo": "Modulo",
        "fecha": 1684524889980,
        "id": "oZeulHokufM4kcJjYsEY",
        "modelo": "a10s",
        "cantidad": " "
      },
      {
        "fecha": 1684500375975,
        "nota": "Solo oled",
        "cantidad": " ",
        "tipo": "Modulo",
        "prioridad": "Urgente",
        "detalle": "GENERICO BUENO",
        "modelo": "A30",
        "cliente": "BOLETA (4715) 1162018224",
        "id": "oehiZxYHXGWsDCJUP51q",
        "conseguido": true
      },
      {
        "cliente": null,
        "detalle": "queda 1",
        "modelo": "a 32",
        "cantidad": " ",
        "tipo": "film ",
        "conseguido": true,
        "fecha": 1682690961822,
        "prioridad": "Sin stock",
        "id": "ozHHMQ4Nkx3Ggd4osHtv"
      },
      {
        "modelo": "j8",
        "id": "pKh7mqocVF7s4ifvMBPr",
        "detalle": " ",
        "fecha": 1679094491208,
        "conseguido": true,
        "prioridad": "Sin stock",
        "tipo": "Modulo",
        "cliente": null,
        "cantidad": "1"
      },
      {
        "fecha": 1680300218455,
        "detalle": " ",
        "tipo": "Cubre lente",
        "id": "pM8U37J2X0vS6Zj5hNjS",
        "conseguido": true,
        "prioridad": "Urgente",
        "cantidad": "1",
        "cliente": "boleta 4499",
        "modelo": "s10 plus"
      },
      {
        "fecha": 1679094470597,
        "id": "pN8DEpOFbIwANe4Do2ts",
        "cliente": null,
        "detalle": "quedan 2 blancos",
        "tipo": "Modulo",
        "cantidad": " ",
        "conseguido": true,
        "prioridad": "Opcional",
        "modelo": "j7 2016"
      },
      {
        "cliente": "Pepe",
        "fecha": 1679103566646,
        "detalle": " ",
        "modelo": "G31",
        "tipo": "Parlante altavoz",
        "id": "q5qIdZxiIX7ZWlLHrUS8",
        "prioridad": "Urgente",
        "conseguido": true,
        "cantidad": "1"
      },
      {
        "id": "q6TeP3TnctQzIygZlWDl",
        "conseguido": true,
        "detalle": " ",
        "cliente": null,
        "modelo": "j8",
        "tipo": "Modulo",
        "prioridad": "Sin stock",
        "cantidad": "1",
        "fecha": 1679665594105
      },
      {
        "id": "qF9ROBww6K6UbGuPOc5A",
        "detalle": " ",
        "modelo": "a10",
        "tipo": "film comun",
        "prioridad": "Sin stock",
        "conseguido": true,
        "cliente": null,
        "fecha": 1678311095039,
        "cantidad": "1"
      },
      {
        "detalle": "original oled",
        "prioridad": "Urgente",
        "fecha": 1683299568589,
        "tipo": "Modulo oled",
        "conseguido": true,
        "cliente": "boleta 4649",
        "cantidad": "",
        "id": "qL8vg1c3KtE7VoCqrJB0",
        "modelo": "a70"
      },
      {
        "modelo": "a 33 5g",
        "prioridad": "Averiguar",
        "conseguido": true,
        "detalle": " ",
        "tipo": "film",
        "cantidad": " ",
        "id": "qWrlRClbjjKVx2t3ZnBb",
        "fecha": 1681415335696,
        "cliente": null
      },
      {
        "modelo": "e5 play go",
        "fecha": 1682720199682,
        "conseguido": true,
        "cliente": null,
        "tipo": "Flex de carga",
        "detalle": " ",
        "id": "r2JptEKWEFgEuvpyliNn",
        "prioridad": "Sin stock",
        "cantidad": " "
      },
      {
        "id": "rPFY8gX3lGXMPXuCRMjJ",
        "cantidad": "1",
        "cliente": "boleta (4407)",
        "fecha": 1679093296135,
        "detalle": "negro",
        "tipo": "Modulo",
        "modelo": "iphone 7",
        "conseguido": true,
        "prioridad": "Urgente"
      },
      {
        "prioridad": "Opcional",
        "cantidad": null,
        "fecha": 1684535472382,
        "id": "rzdjYRouJhTs8EgvAJkE",
        "cliente": null,
        "detalle": "queda 1",
        "conseguido": true,
        "modelo": "g8 power",
        "tipo": "Modulo"
      },
      {
        "detalle": " quedan 3",
        "tipo": "film",
        "conseguido": true,
        "cliente": "",
        "fecha": 1679088720857,
        "modelo": "a20/a30/a50",
        "id": "sn1s0yMUr7GybqciWQvg",
        "prioridad": "Opcional",
        "cantidad": "1"
      },
      {
        "cliente": "boleta 4606",
        "cantidad": " ",
        "tipo": "Modulo",
        "conseguido": true,
        "modelo": "a11",
        "id": "tFVjk3hPlI6jJ5p2SjaK",
        "detalle": " ",
        "prioridad": "Urgente",
        "fecha": 1682116528269
      },
      {
        "detalle": "2500 mh bl-45f1f",
        "conseguido": true,
        "id": "tGqKxyCjdWiAjtS3Fr78",
        "cantidad": "",
        "tipo": "Bateria",
        "cliente": "boleta 4568",
        "prioridad": "Urgente",
        "modelo": "lg k9 2500 mh",
        "fecha": 1682115152908
      },
      {
        "cliente": null,
        "conseguido": true,
        "fecha": 1682116501957,
        "cantidad": " ",
        "id": "tQAjs2gylmcgQAafSOGN",
        "detalle": " 0 sin stock",
        "modelo": "a11",
        "prioridad": "Sin stock",
        "tipo": "Modulo"
      },
      {
        "tipo": "funda",
        "cantidad": "1",
        "conseguido": true,
        "modelo": "a23",
        "fecha": 1678477429609,
        "cliente": "",
        "prioridad": "Opcional",
        "id": "tVCnz1t3vKaBexmxNVJp",
        "detalle": "con diseño"
      },
      {
        "tipo": "bateria ",
        "cantidad": " ",
        "id": "uEopA5XK6bE8F2kY0EOX",
        "fecha": 1682712957384,
        "cliente": "1133134412 diego",
        "conseguido": true,
        "prioridad": "Averiguar",
        "detalle": " ",
        "modelo": "j2"
      },
      {
        "id": "uKneu6BRRyxb352R2JsN",
        "cliente": "boleta 4429",
        "conseguido": true,
        "tipo": "Flex de carga",
        "prioridad": "Urgente",
        "fecha": 1679664859200,
        "detalle": " ",
        "cantidad": "1 ",
        "modelo": "g60s"
      },
      {
        "cliente": "boleta 4492",
        "fecha": 1680299937474,
        "prioridad": "Urgente",
        "id": "uyqdQVgktsRhrkfeoQrG",
        "cantidad": "2",
        "modelo": "a51",
        "detalle": " ",
        "tipo": "flex carga",
        "conseguido": true
      },
      {
        "tipo": "Modulo",
        "fecha": 1683918943970,
        "cantidad": " ",
        "id": "vUSleLIXcRLebPe3hUPb",
        "modelo": "a10",
        "detalle": "tenemos 1",
        "conseguido": true,
        "prioridad": "Opcional",
        "cliente": null
      },
      {
        "detalle": " ",
        "modelo": "a02s/ a03 / a03s",
        "prioridad": "Sin stock",
        "fecha": 1681512252408,
        "conseguido": true,
        "id": "vXs1Sw6BnxBxhFafbwDg",
        "tipo": "Modulo",
        "cantidad": "1",
        "cliente": ""
      },
      {
        "tipo": "modulo ",
        "conseguido": true,
        "cliente": null,
        "detalle": "tenemos 1",
        "modelo": "a52",
        "fecha": 1680301254765,
        "id": "vhesofihRJxq2Fb5Dfq4",
        "prioridad": "Opcional",
        "cantidad": " "
      },
      {
        "cantidad": " ",
        "cliente": "",
        "detalle": "tenemos 1",
        "modelo": "e40",
        "fecha": 1680954682608,
        "tipo": "Modulo",
        "conseguido": true,
        "prioridad": "Opcional",
        "id": "vymzLgD7lsNqf3Nwirpi"
      },
      {
        "conseguido": true,
        "modelo": "g41",
        "tipo": "Modulo",
        "prioridad": "Urgente",
        "cantidad": " ",
        "fecha": 1684529878472,
        "cliente": "boleta 4735",
        "id": "w1ZyybiFZg7cMOrecSy0",
        "detalle": " "
      },
      {
        "conseguido": true,
        "modelo": "a12",
        "cantidad": "1",
        "cliente": "boleta (4436)",
        "tipo": "huella",
        "id": "wJDsfW3gPomZi7iC1Yux",
        "prioridad": "Urgente",
        "fecha": 1679093845867,
        "detalle": " "
      },
      {
        "tipo": "Flex de carga",
        "fecha": 1682720154056,
        "id": "x243kZfGHTbTSwBBOh2M",
        "conseguido": true,
        "cliente": "",
        "prioridad": "Sin stock",
        "modelo": "a20s",
        "cantidad": "",
        "detalle": " "
      },
      {
        "id": "yCappILmGNoVIY12O5FI",
        "conseguido": true,
        "fecha": 1679664721361,
        "cantidad": "1",
        "tipo": "flex power",
        "detalle": " ",
        "prioridad": "Urgente",
        "cliente": "boleta g5 4458",
        "modelo": "g5"
      },
      {
        "tipo": "modulo",
        "id": "yuyQ8eFLqLW4mpzuxclN",
        "cantidad": "1",
        "fecha": 1679664821256,
        "cliente": "boleta 4453",
        "prioridad": "Urgente",
        "conseguido": true,
        "detalle": " ",
        "modelo": "one macro"
      },
      {
        "id": "z5nJhr7Ik2HPfOH8LBmm",
        "cliente": "",
        "conseguido": true,
        "tipo": "funda ",
        "detalle": "antigolpes",
        "fecha": 1681418751977,
        "prioridad": "Averiguar",
        "cantidad": "",
        "modelo": "a53 5g "
      }
    ],
    notificados: [],
    pendientes: [
      {
        "prioridad": "Averiguar",
        "modelo": "a14",
        "cliente": null,
        "detalle": null,
        "cantidad": null,
        "tipo": "film",
        "fecha": 1684967995411,
        "id": "0G068Er311YdkmrQCK3b"
      },
      {
        "fecha": 1681846265948,
        "prioridad": "Averiguar",
        "tipo": "film",
        "detalle": " ",
        "modelo": "e13",
        "cliente": "graciela 1167357663",
        "cantidad": "1",
        "id": "0b2fw5ayp76CD1XNA472"
      },
      {
        "modelo": "a10",
        "tipo": "Modulo",
        "cliente": null,
        "detalle": "tenemos 1",
        "cantidad": " ",
        "prioridad": "Opcional",
        "fecha": 1684966390579,
        "id": "2u5eZ6KjGlXrV86pdYJ5"
      },
      {
        "fecha": 1684967977131,
        "prioridad": "Averiguar",
        "tipo": "funda",
        "detalle": null,
        "cliente": null,
        "cantidad": " ",
        "modelo": "a14",
        "id": "3RliA8AjDMddQm6hc7ic"
      },
      {
        "tipo": "FILM",
        "modelo": "IPHONE 11 PRO",
        "prioridad": "Sin stock",
        "fecha": 1684447500919,
        "detalle": " ",
        "cliente": null,
        "cantidad": " ",
        "id": "3jHW9QO6uqq1lrpLJ3E6"
      },
      {
        "cantidad": " ",
        "detalle": "silicona transparente",
        "fecha": 1683929009149,
        "cliente": "cinthia 1127055279",
        "prioridad": "Averiguar",
        "modelo": "a03s",
        "tipo": "funda",
        "id": "5gD80gsRRgRC4Yw8LFpK"
      },
      {
        "tipo": "modulo",
        "cliente": null,
        "cantidad": " ",
        "fecha": 1684966651683,
        "prioridad": "Sin stock",
        "modelo": "e6 plus",
        "detalle": " ",
        "id": "6tnY8puDfF6bOOwbqSN3"
      },
      {
        "cantidad": " ",
        "detalle": "tenemos 1",
        "cliente": "",
        "fecha": 1684966362722,
        "modelo": "a01",
        "prioridad": "Opcional",
        "tipo": "Modulo",
        "id": "87kzhSniBfe8wujxcVoT"
      },
      {
        "prioridad": "Sin stock",
        "fecha": 1684967252268,
        "tipo": "film",
        "cantidad": " ",
        "cliente": null,
        "modelo": "e13",
        "detalle": " ",
        "id": "8DNwzGne2m0gipg5xFwx"
      },
      {
        "tipo": "Bateria",
        "modelo": "A02",
        "id": "8kphuc66WV5biSLJrBql",
        "detalle": "",
        "fecha": 1684792500041,
        "conseguido": false,
        "prioridad": "Urgente",
        "cliente": "boleta 3613",
        "cantidad": " "
      },
      {
        "detalle": " ",
        "tipo": "film ",
        "cantidad": "3",
        "prioridad": "Sin stock",
        "cliente": "",
        "modelo": "g8 power",
        "fecha": 1684599767606,
        "id": "8se6FD0nbXXnXS7Stxln"
      },
      {
        "prioridad": "Averiguar",
        "modelo": "g53",
        "cliente": "",
        "detalle": "flip cover",
        "cantidad": " ",
        "fecha": 1681415271274,
        "tipo": "funda",
        "id": "9VKNC0NkhGe6Ab8kcJ9b"
      },
      {
        "prioridad": "Opcional",
        "fecha": 1684447390855,
        "cliente": null,
        "modelo": "A11",
        "tipo": "FILM",
        "detalle": "QUEDAN 2",
        "cantidad": " ",
        "id": "9zQOvJX2RYk0antIRDjw"
      },
      {
        "cantidad": " ",
        "detalle": "silicona transparente",
        "tipo": "funda",
        "fecha": 1683929046902,
        "prioridad": "Averiguar",
        "cliente": "1127055279",
        "modelo": "g7 plus",
        "id": "B32ZrFLwOIdJVt1NS7fp"
      },
      {
        "fecha": 1685116107313,
        "tipo": "prueba",
        "modelo": "de repuesto",
        "detalle": "",
        "cantidad": "25",
        "cliente": "1140875900 maximo a pagar $18.000",
        "prioridad": "Urgente",
        "id": "CZizX7ObukfrY1EzL6HG"
      },
      {
        "tipo": "FILM 10D Y COMUN",
        "cliente": null,
        "fecha": 1684446768344,
        "modelo": "E7 PLUS",
        "detalle": "QUEDA 1 SOLO",
        "cantidad": " ",
        "prioridad": "Opcional",
        "id": "EeM6tCfxfvBoJwTbIzHf"
      },
      {
        "cliente": null,
        "detalle": " ",
        "tipo": "film ",
        "cantidad": "1",
        "fecha": 1678454483700,
        "modelo": "g5s plus",
        "prioridad": "Sin stock",
        "id": "HObt0jSNfFVuLsWo9kZw"
      },
      {
        "modelo": "g72",
        "fecha": 1680813679577,
        "cantidad": "1 ",
        "tipo": "film ",
        "prioridad": "Urgente",
        "cliente": "1154972634 acosta",
        "detalle": " ",
        "id": "HfxEPyW1COmxutjhUQX4"
      },
      {
        "detalle": " ",
        "tipo": "FILM",
        "fecha": 1684447069414,
        "prioridad": "Sin stock",
        "cliente": "SOFIA GUAITA 11099103",
        "modelo": "A34 5G",
        "cantidad": " ",
        "id": "IAVhSdwCbJkNGzRcasOe"
      },
      {
        "detalle": " ",
        "tipo": "film",
        "cliente": null,
        "modelo": "moto one",
        "cantidad": " ",
        "fecha": 1682691011001,
        "prioridad": "Sin stock",
        "id": "ILQ5HNRdvTpk7PBWlQNN"
      },
      {
        "detalle": " ",
        "fecha": 1684967290416,
        "tipo": "film ",
        "cliente": null,
        "prioridad": "Averiguar",
        "cantidad": "  ",
        "modelo": "moto edge 30 neo",
        "id": "JZS6jSOzm3TFtFPryqDF"
      },
      {
        "cliente": "",
        "cantidad": " ",
        "prioridad": "Sin stock",
        "tipo": "film",
        "detalle": " ",
        "modelo": "a12",
        "fecha": 1684967209614,
        "id": "MKN3vUOIR1Lz2SJObxC7"
      },
      {
        "tipo": "Porta sim",
        "modelo": "moto one action",
        "cliente": "boleta 4722",
        "prioridad": "Urgente",
        "fecha": 1684533952302,
        "cantidad": " ",
        "detalle": " ",
        "id": "NIJtaFrM0WpNpft9cNje"
      },
      {
        "prioridad": "Averiguar",
        "cliente": null,
        "tipo": "film",
        "detalle": null,
        "modelo": "iphone 11 pro max",
        "cantidad": null,
        "fecha": 1684967925410,
        "id": "OawBGqLZXtaUj5N6kZH3"
      },
      {
        "modelo": "j7 2016",
        "cliente": "fabian",
        "fecha": 1684854629873,
        "tipo": "camara trasera",
        "detalle": " ",
        "prioridad": "Urgente",
        "cantidad": " ",
        "id": "PR0Tn5hvILJIzICus38l"
      },
      {
        "cliente": "javier 1131241850",
        "detalle": " ",
        "fecha": 1683929153012,
        "prioridad": "Urgente",
        "modelo": "e6 plus",
        "tipo": "flex power",
        "cantidad": " ",
        "id": "Q6llOc7BSwt2eJTplBb4"
      },
      {
        "cliente": null,
        "detalle": " ",
        "cantidad": " ",
        "modelo": "j4 plus",
        "prioridad": "Sin stock",
        "tipo": "film",
        "fecha": 1682690887279,
        "id": "QFNVX6Sjbvdj16FfZpj8"
      },
      {
        "cantidad": "    ",
        "detalle": "",
        "tipo": "teclado",
        "fecha": 1683203369689,
        "modelo": "mecanico",
        "cliente": "graciela 1167503567",
        "prioridad": "Averiguar",
        "id": "QvHuskJSEY7TKqQVRbii"
      },
      {
        "tipo": "funda",
        "detalle": " ",
        "cantidad": "1",
        "modelo": "g43",
        "fecha": 1678458126117,
        "cliente": null,
        "prioridad": "Opcional",
        "id": "QzYUgsA6V46Mc4WO0a35"
      },
      {
        "cantidad": " ",
        "prioridad": "Sin stock",
        "cliente": "",
        "modelo": "e6 plus",
        "tipo": "funda",
        "detalle": "de hombre o lisas color negra o azul",
        "fecha": 1683838009826,
        "id": "RWDmz0hBw5zan1gJqGbC"
      },
      {
        "tipo": "Modulo",
        "fecha": 1683928925200,
        "modelo": "redmi 6",
        "prioridad": "Averiguar",
        "cliente": "camila 1169656892",
        "cantidad": "",
        "detalle": " ",
        "id": "RvMDpB6m27Lhb01iLG7s"
      },
      {
        "prioridad": "Averiguar",
        "cliente": "leandra 1128483939",
        "detalle": "algo economico",
        "modelo": "a7 2018",
        "cantidad": "",
        "fecha": 1684506709887,
        "tipo": "funda",
        "id": "S2WMnd5KkHZI3u1BRkfO"
      },
      {
        "cantidad": " ",
        "tipo": "cable",
        "fecha": 1683055706825,
        "cliente": "",
        "modelo": "joystick 3",
        "detalle": " ",
        "prioridad": "Averiguar",
        "id": "TdTnkp3an93KlM3MaxC1"
      },
      {
        "cliente": null,
        "prioridad": "Averiguar",
        "fecha": 1681415358054,
        "cantidad": " ",
        "detalle": "mujer con diseño",
        "modelo": "e40",
        "tipo": "funda",
        "id": "VzWDjkA4xmULOeOEXXd7"
      },
      {
        "cliente": null,
        "tipo": "funda",
        "detalle": " ",
        "prioridad": "Averiguar",
        "cantidad": " ",
        "fecha": 1684967306528,
        "modelo": "moto edge 30 neo",
        "id": "WJslHQMu4euz87mz9GXt"
      },
      {
        "cliente": "1150062136",
        "cantidad": "1",
        "tipo": "Display",
        "detalle": " ",
        "prioridad": "Averiguar",
        "modelo": "positivo bgh t780",
        "fecha": 1684605602397,
        "id": "WKrnl1cEC2jZnhu3ubrs"
      },
      {
        "tipo": "lud led de mesa",
        "modelo": "  ",
        "cantidad": " ",
        "prioridad": "Averiguar",
        "fecha": 1683322167811,
        "cliente": "1130295587 alejandro",
        "detalle": "como el que tenes en la estacion de soldado",
        "id": "WrqpYoCY25YHz1IVljv1"
      },
      {
        "cantidad": " ",
        "fecha": 1681415317977,
        "cliente": null,
        "modelo": "g53",
        "detalle": " ",
        "prioridad": "Averiguar",
        "tipo": "film",
        "id": "X9nq8ngySebL6mRvCvcp"
      },
      {
        "tipo": "Modulo",
        "detalle": " ",
        "cantidad": " ",
        "cliente": null,
        "fecha": 1682116555821,
        "prioridad": "Sin stock",
        "modelo": "g31/g41/g71",
        "id": "XS4l0ZztneTMLBLHxSKJ"
      },
      {
        "modelo": "tipo c",
        "cantidad": " ",
        "fecha": 1683817232667,
        "cliente": "",
        "detalle": " ",
        "tipo": "otg",
        "prioridad": "Sin stock",
        "id": "YIf8VwRUWL4f7mqTvtjJ"
      },
      {
        "detalle": " ",
        "tipo": "Flex de carga",
        "cantidad": " ",
        "fecha": 1684941595590,
        "cliente": "carla 1169239370",
        "prioridad": "Averiguar",
        "modelo": "g41",
        "id": "a0GNQJt8OsMXMKimPFYv"
      },
      {
        "cantidad": " ",
        "detalle": " ",
        "cliente": null,
        "prioridad": "Sin stock",
        "modelo": "g22",
        "fecha": 1684966409076,
        "tipo": "Modulo",
        "id": "aYUcRpEXyIYhycZcXqI7"
      },
      {
        "cliente": "camila 1169656892",
        "fecha": 1683928955694,
        "cantidad": " ",
        "tipo": "Bateria",
        "modelo": "redmi 6",
        "prioridad": "Averiguar",
        "detalle": " ",
        "id": "abMPAXfD6CLQSzCxNeC6"
      },
      {
        "fecha": 1680792773430,
        "cliente": "michael",
        "prioridad": "Urgente",
        "detalle": " ",
        "modelo": "de tipo c a iphone",
        "tipo": "cable usb",
        "cantidad": " ",
        "id": "bl2UbeqYa3PQEtxoeo4K"
      },
      {
        "cliente": "",
        "cantidad": "1",
        "modelo": "E22 10d",
        "fecha": 1682547171734,
        "tipo": "film de vidrio",
        "prioridad": "Urgente",
        "detalle": " ",
        "id": "e3Q0we4fXLrcVj3VFJEK"
      },
      {
        "prioridad": "Opcional",
        "detalle": "quedan 2",
        "cantidad": " ",
        "cliente": null,
        "fecha": 1682691039907,
        "modelo": "g7 play",
        "tipo": "film",
        "id": "faVsx9yPj0o9KgOpm2jo"
      },
      {
        "tipo": "FILM",
        "cliente": null,
        "cantidad": " ",
        "detalle": "COMUN",
        "fecha": 1684446709685,
        "modelo": "E20/E40",
        "prioridad": "Sin stock",
        "id": "fkaRepv4bzIcfCXjGmxG"
      },
      {
        "prioridad": "Averiguar",
        "tipo": "FUNDA",
        "fecha": 1684447356673,
        "cantidad": " ",
        "detalle": "TRANSPARENTE REFORZADA",
        "modelo": "A31",
        "cliente": null,
        "id": "g330Ob9UluUilXQLBenE"
      },
      {
        "tipo": "FUNDA",
        "prioridad": "Averiguar",
        "fecha": 1684447105244,
        "modelo": "A34",
        "cantidad": " ",
        "cliente": "SOFIA GUAITA 1160991063",
        "detalle": " ",
        "id": "g5tGhRaVYS2wSYZxyb31"
      },
      {
        "tipo": "funda",
        "fecha": 1684967904983,
        "prioridad": "Averiguar",
        "detalle": "",
        "modelo": "iphone 11 pro max",
        "cantidad": "",
        "cliente": "",
        "id": "gqhmyEkAFIbK4aLANWOS"
      },
      {
        "tipo": "FILM COMUN",
        "prioridad": "Sin stock",
        "cantidad": " ",
        "detalle": " ",
        "modelo": "G5",
        "fecha": 1684447427589,
        "cliente": null,
        "id": "gy8NyJ350xuXS0LmzDHs"
      },
      {
        "modelo": "S22 ultra ",
        "detalle": "Quiere dos claudia ",
        "fecha": 1680302879903,
        "prioridad": "Urgente",
        "cantidad": "2",
        "tipo": "Film full",
        "cliente": "Claudia ",
        "id": "h6LfJNWfAT0Bdt9zKlxf"
      },
      {
        "cliente": "diego 1133134412",
        "tipo": "Bateria",
        "fecha": 1684872051851,
        "prioridad": "Averiguar",
        "cantidad": "  ",
        "modelo": "j2",
        "detalle": "",
        "id": "hEb4Z5ujyJismceAsnos"
      },
      {
        "modelo": "iphone 7 plus",
        "tipo": "Modulo",
        "cantidad": " ",
        "detalle": "blanco (0) negro(2)",
        "fecha": 1684966540905,
        "cliente": null,
        "prioridad": "Opcional",
        "id": "hhHZK62Ccin2NCTEFrXb"
      },
      {
        "modelo": "A03",
        "cliente": null,
        "fecha": 1684446800015,
        "cantidad": " ",
        "tipo": "FILM",
        "prioridad": "Sin stock",
        "detalle": " ",
        "id": "iSvqmccSVpKsEz4Qg7go"
      },
      {
        "prioridad": "Averiguar",
        "modelo": "a31",
        "detalle": "con diseño de mujer",
        "cantidad": " ",
        "fecha": 1681415470071,
        "cliente": null,
        "tipo": "funda",
        "id": "imAF2rupMpT7XIcrOBZO"
      },
      {
        "detalle": "",
        "cantidad": " ",
        "cliente": "",
        "prioridad": "Urgente",
        "modelo": "Tipo c a auxiliar",
        "fecha": 1682690860082,
        "tipo": "cable",
        "id": "ip9KDscP7AvpSVRVXz3G"
      },
      {
        "prioridad": "Averiguar",
        "cliente": "",
        "fecha": 1683322663463,
        "modelo": " ",
        "detalle": "",
        "cantidad": " ",
        "tipo": "hdmi a hdmi",
        "id": "j1TXnPyFB4onQfHBgfao"
      },
      {
        "prioridad": "Sin stock",
        "cliente": null,
        "detalle": " ",
        "modelo": "a54",
        "cantidad": " ",
        "tipo": "film",
        "fecha": 1683929214263,
        "id": "jG1nhWIkcdSyYMJ5Jq1j"
      },
      {
        "detalle": "1 en stock",
        "cliente": null,
        "prioridad": "Opcional",
        "modelo": "g6 plus",
        "tipo": "Modulo",
        "cantidad": " ",
        "fecha": 1682116584999,
        "id": "khDeI7FFkCg2XCePHgwC"
      },
      {
        "detalle": "dorado (0) negro (1) celeste (1)",
        "modelo": "j4",
        "prioridad": "Opcional",
        "cliente": null,
        "cantidad": " ",
        "tipo": "Modulo",
        "fecha": 1684966594611,
        "id": "lAk1MI92vE9xNrKNnKrH"
      },
      {
        "tipo": "FUNDA",
        "cantidad": " ",
        "fecha": 1684447310015,
        "modelo": "A23 5G",
        "detalle": "QUEDAN 2",
        "prioridad": "Opcional",
        "cliente": null,
        "id": "lPXlTRiQTHiAbwABqSkp"
      },
      {
        "conseguido": false,
        "cliente": "boleta 4714",
        "modelo": "z2 play ",
        "tipo": "Bateria hz40",
        "prioridad": "Urgente",
        "id": "lQGXGOzOGfKyhbjm4biV",
        "fecha": 1684966313109,
        "cantidad": "1",
        "detalle": "probar equipo"
      },
      {
        "fecha": 1683298133654,
        "detalle": "",
        "cliente": "pepe (taller mecanico)",
        "tipo": "Parlante altavoz",
        "modelo": "g31",
        "cantidad": "   ",
        "prioridad": "Averiguar",
        "id": "lVSCqP4439vUVZQVnyCu"
      },
      {
        "tipo": "Modulo",
        "detalle": " ",
        "fecha": 1684966627202,
        "cliente": null,
        "prioridad": "Sin stock",
        "modelo": "k41s",
        "cantidad": " ",
        "id": "m6tTjZlQA6oXzJOWIuFq"
      },
      {
        "modelo": "j6 plus",
        "prioridad": "Sin stock",
        "cantidad": " ",
        "tipo": "film",
        "detalle": " ",
        "cliente": null,
        "fecha": 1682690904172,
        "id": "mLp74Z4cD8HEqWE2fgnG"
      },
      {
        "fecha": 1683322254528,
        "tipo": "film",
        "cliente": "",
        "cantidad": " ",
        "prioridad": "Sin stock",
        "detalle": "comun y 10d",
        "modelo": "a32",
        "id": "mUqyY2Zbjl4vKjbiG9HC"
      },
      {
        "cliente": null,
        "tipo": "film ",
        "fecha": 1684967344270,
        "cantidad": " ",
        "detalle": null,
        "prioridad": "Opcional",
        "modelo": "a04",
        "id": "moL1xyl8dqOXhDQO9901"
      },
      {
        "detalle": " queda 1 solo",
        "prioridad": "Sin stock",
        "fecha": 1682690946029,
        "cantidad": " ",
        "modelo": "j7 prime",
        "cliente": null,
        "tipo": "film",
        "id": "nXG94tCWW1k2pr297GxG"
      },
      {
        "prioridad": "Sin stock",
        "modelo": "e20/E40",
        "detalle": " ",
        "tipo": "film 10d",
        "cliente": "",
        "cantidad": " ",
        "fecha": 1684446682622,
        "id": "oGha1mVne0JiMNLA7nC0"
      },
      {
        "prioridad": "Urgente",
        "fecha": 1680300245782,
        "cliente": "boleta 4499",
        "cantidad": " ",
        "detalle": " ",
        "modelo": "s10 plus",
        "tipo": "film full",
        "id": "oU6nbSRFNWwym5WbNbIT"
      },
      {
        "cantidad": " ",
        "modelo": "de precios",
        "prioridad": "Urgente",
        "fecha": 1680302526940,
        "detalle": " ",
        "tipo": "etiqueta",
        "cliente": "",
        "id": "rYUjJyFGNpwNPirGQz2I"
      },
      {
        "prioridad": "Urgente",
        "cantidad": "1",
        "tipo": "Parlante altavoz",
        "cliente": "boleta (4405)",
        "modelo": "g9 play",
        "fecha": 1679093795986,
        "detalle": " ",
        "id": "rtPQdd6M0hl4wh3tR2jT"
      },
      {
        "tipo": "camara trasera",
        "fecha": 1683117785464,
        "modelo": "a10",
        "cliente": "patricio 1135409510",
        "cantidad": " ",
        "detalle": " ",
        "prioridad": "Averiguar",
        "id": "t43LH7yuoHUJnT0jpwC9"
      },
      {
        "prioridad": "Averiguar",
        "modelo": "iphone",
        "cantidad": " ",
        "cliente": "1154129710",
        "tipo": "auricular ",
        "detalle": " ",
        "fecha": 1681846315370,
        "id": "tNj0bJsLjfeUfSEgU7FO"
      },
      {
        "tipo": "funda",
        "modelo": "a54",
        "detalle": null,
        "cliente": null,
        "prioridad": "Sin stock",
        "fecha": 1683929198748,
        "cantidad": "",
        "id": "u2yXNNNjkB8U96kY36wQ"
      },
      {
        "tipo": "FUNDA",
        "fecha": 1684447276971,
        "detalle": "PARA HOMBRE O LISAS COLOR OSCUROS",
        "modelo": "E6S",
        "cliente": "",
        "cantidad": " ",
        "prioridad": "Averiguar",
        "id": "uFrSp1ItcbruXx52gr9J"
      },
      {
        "tipo": "funda",
        "prioridad": "Urgente",
        "fecha": 1680813724535,
        "detalle": "con tapa camara",
        "modelo": "g72",
        "cliente": "1154972634 acosta",
        "cantidad": " ",
        "id": "ukTpcLGgwMLvS0ks3AC7"
      },
      {
        "detalle": " ",
        "prioridad": "Sin stock",
        "cantidad": " ",
        "cliente": null,
        "modelo": "J4 PLUS",
        "fecha": 1684447460898,
        "tipo": "FILM ",
        "id": "vF1YzidzfKTa3BpN9O5Y"
      },
      {
        "prioridad": "Opcional",
        "cantidad": " ",
        "fecha": 1684966473128,
        "detalle": "blanco (0) negro (1)",
        "tipo": "Modulo",
        "cliente": null,
        "modelo": "iphone 6s ",
        "id": "wm0PT17azEYBsqY2Rrlv"
      },
      {
        "detalle": " ",
        "tipo": "Modulo",
        "prioridad": "Averiguar",
        "cliente": "pablo 1151054186",
        "modelo": "xiaomi mi 3",
        "cantidad": "1",
        "fecha": 1679947445597,
        "id": "xnEU8zqrWzRWLFWNimXe"
      },
      {
        "cliente": "boleta 4722",
        "tipo": "Parlante altavoz",
        "prioridad": "Urgente",
        "detalle": "  ",
        "modelo": "moto one action",
        "cantidad": " ",
        "fecha": 1684533894366,
        "id": "zo1t6tb6fVallXYTFczU"
      }
    ]
  }/*{
      conseguidos: [],
      notificados: [],
      pendientes: []
    };*/

  @Input() loggedUser: User;
  @Input() listaPedidos;
  textoABuscar;


  constructor(
    private database: DataBaseService,
    private alerService: AlertService,
    private toastService: ToastService,
    private modalController: ModalController
  ) { }
  ngOnInit(): void {
    this.pedidosAMostrar = [...this.pedidos.pendientes];
      this.pedidosAMostrar?.sort(this.compare.bind(this))
    return;
    let sus = this.database.obtenerTodos(environment.TABLAS.pedidos).subscribe(pedidosRef => {
      this.pedidos = {
        conseguidos: [],
        notificados: [],
        pendientes: []
      };
      pedidosRef.forEach(pedidoRef => {
        let pedido = pedidoRef.payload.doc.data();
        pedido['id'] = pedidoRef.payload.doc.id;

        if (pedido['conseguido'] && !pedido['notificado']) {
          // this.pedidos.conseguidos.push(pedido);
        } else if (pedido['conseguido'] && pedido['notificado']) {
          this.pedidos.notificados.push(pedido);
        } else {
          // this.pedidos.pendientes.push(pedido);
        }
      });
      this.pedidosAMostrar = [...this.pedidos.pendientes];
      this.pedidosAMostrar?.sort(this.compare.bind(this));
      this.filtrarPorTexto(this.textoABuscar);

      // sus.unsubscribe();//remover despues de limpieza
    });
  }



  showSaveDialog(pedido, campo, message) {
    this.alerService.alertConfirmacion('Confirmación', message, 'Si, confirmo', this.guardar.bind(this, pedido, campo));
  }

  confirmarMarcado(pedido, campo, e) {
    let message = `¿  Ya has ${campo} el pedido?`;
    if (!pedido[campo]) {
      setTimeout(() => { pedido[campo] = false; }, 50);
    }

    e.stopPropagation();
    this.showSaveDialog(pedido, campo, message);
  }

  confirmarDesmarcado(pedido, campo, e) {
    let message = `¿Quieres desmarcar el pedido?`;
    if (pedido[campo]) {
      setTimeout(() => { pedido[campo] = true; }, 50);
    }

    e.stopPropagation();
    this.showSaveDialog(pedido, campo, message);
  }

  guardar(pedido, campo) {

    if (!pedido[campo]) {
      pedido[campo] = true;
    } else {
      pedido[campo] = false;
    }
    let auxPedido = { ...pedido };

    this.database.actualizar(environment.TABLAS.pedidos, auxPedido, pedido.id).finally(() => {
      let mensaje = auxPedido[campo] ?
        `Se marco como '${campo}', podras verlo en pedidos ${campo}s.` :
        "Se marco como 'pendiente', podras verlo en pedidos pendientes.";
      this.toastService.simpleMessage('', mensaje, ToastColor.success);
    });
  }

  obtenerNivelDePrioridad(prioridad) {
    switch (prioridad) {
      case "Opcional":
        return 0;
      case "Averiguar":
        return 1;
      case "Sin stock":
        return 2;
      case "Urgente":
        return 4;
      default:
        return 0;
    }
  }

  compare(a, b) {
    if (this.obtenerNivelDePrioridad(a.prioridad) < this.obtenerNivelDePrioridad(b.prioridad)) return 1;
    if (this.obtenerNivelDePrioridad(a.prioridad) > this.obtenerNivelDePrioridad(b.prioridad)) return -1;
    else {
      if (a.tipo > b.tipo) return 1;
      else if (a.tipo < b.tipo) return -1;
      return 0;
    }
  }
  async mostrarDetalle(pedido) {


    try {
      const modal = await this.modalController.create({
        component: DetallePedidoComponent,
        componentProps: {
          pedido: pedido
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;


        switch (result.role) {
          case 'cancelarPedido':
            console.log("LLEGO")
            this.database.eliminar(environment.TABLAS.pedidos, pedido.id).finally(() => {
              this.toastService.simpleMessage('', 'Se elimino el pedido, ya no aparecera en los listados', ToastColor.success);
              // this.actualizarLista();
            });
            break;
          case 'agregarNota':
            this.database.actualizar(environment.TABLAS.pedidos, pedido, pedido.id).finally(() => {
              this.toastService.simpleMessage('', 'Nota agregada', ToastColor.success);
            });
            break;
          case 'actualizarEstado':
            this.database.actualizar(environment.TABLAS.pedidos, pedido, pedido.id).then(res => {
              this.toastService.simpleMessage('', `Prioridad establecida como ${pedido.prioridad}`, ToastColor.success);
              // this.actualizarLista();
            });
            break;
        }

      })
      return await modal.present();
    } catch (err) {
    }



  }

  borarPedidosConseguidos() {
    let auxLista = this.pedidos.conseguidos.filter(ped => {
      if (ped.conseguido && !ped.nota) {
        return ped;
      }
    });
    auxLista.forEach(element => {
      this.database.eliminar(environment.TABLAS.pedidos, element.id).finally(() => {
      });
    });

  }
  filtrarPorTexto(texto) {
    console.log(this.pedidosAMostrar)
    const query = !texto ? "" : texto.toLowerCase();
    this.pedidosAMostrar = this.pedidos[this.listaSeleccionada].filter((d) => d.modelo.toLowerCase().indexOf(query) > -1 || d.tipo.toLowerCase().indexOf(query) > -1);
    this.pedidosAMostrar?.sort(this.compare.bind(this))

  }


  cargarListaDePedidos(estado: 'pendientes' | 'conseguidos' | 'notificados') {
    this.pedidosAMostrar = this.pedidos[estado];
    this.pedidosAMostrar?.sort(this.compare.bind(this))
    this.listaSeleccionada = estado;


  }

  async mostrarFormularioDeAltaPedido() {
    try {
      const modal = await this.modalController.create({
        component: FormPedidoComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        console.log(result)
        if (!result.data || !result.role) return;
      });
      return await modal.present();
    } catch (err) {
    }
  }


}


