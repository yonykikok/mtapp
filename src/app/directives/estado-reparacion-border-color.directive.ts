import { Directive, ElementRef, Input } from '@angular/core';
import { boleta_estados, reparacionBgColor } from '../services/info-compartida.service';

@Directive({
  selector: '[appEstadoReparacionBorderColor]'
})
export class EstadoReparacionBorderColorDirective {

  @Input() appEstadoReparacionBorderColor:boleta_estados=boleta_estados.PENDIENTE;
  constructor(private el: ElementRef) {
   
  }

  ngOnChanges(): void {
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.el.nativeElement.style.borderColor = reparacionBgColor[this.appEstadoReparacionBorderColor];

  }

}
