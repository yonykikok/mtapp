import { Component, OnInit } from '@angular/core';
import { reparacionIconName } from 'src/app/services/info-compartida.service';

@Component({
  selector: 'app-detalle-reparacion',
  templateUrl: './detalle-reparacion.component.html',
  styleUrls: ['./detalle-reparacion.component.scss'],
})
export class DetalleReparacionComponent implements OnInit {
  reparacion;
  mostrarImgBoleta=false;
  constructor() { }

  ngOnInit() {}

  getIconName(){
    console.log(reparacionIconName[this.reparacion.estado])
    return reparacionIconName[this.reparacion.estado];
  }
}
