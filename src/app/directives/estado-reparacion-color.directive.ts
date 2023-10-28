import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { boleta_estados, reparacionBgColor } from '../services/info-compartida.service';

@Directive({
  selector: '[appEstadoReparacionColor]'
})
export class EstadoReparacionColorDirective {
  @Input() appEstadoReparacionColor: boleta_estados = boleta_estados.PENDIENTE;
  constructor(private el: ElementRef) {

  }
  ngOnChanges(): void {
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.el.nativeElement.style.color = reparacionBgColor[this.appEstadoReparacionColor];
  }


}
