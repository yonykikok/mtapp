import { Component, OnInit } from '@angular/core';
import { LibroDiario } from 'src/app/clases/libro-diario';

@Component({
  selector: 'app-detalle-ventas-del-dia',
  templateUrl: './detalle-ventas-del-dia.component.html',
  styleUrls: ['./detalle-ventas-del-dia.component.scss'],
})
export class DetalleVentasDelDiaComponent implements OnInit {

   libroDiario: LibroDiario;
  constructor() { }

  ngOnInit(): void {
  }

}
