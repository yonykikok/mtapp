import { Component, OnInit } from '@angular/core';
import { Deudor } from 'src/app/pages/deudores/cuentas-clientes.page';

@Component({
  selector: 'app-historial-cuenta-cliente',
  templateUrl: './historial-cuenta-cliente.component.html',
  styleUrls: ['./historial-cuenta-cliente.component.scss'],
})
export class HistorialCuentaClienteComponent  implements OnInit {
  cliente!:Deudor;
  constructor() { }

  ngOnInit() {}

}
