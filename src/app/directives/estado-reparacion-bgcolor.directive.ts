import { Directive, ElementRef, Input } from '@angular/core';
import { boleta_estados, reparacionBgColor } from '../services/info-compartida.service';


@Directive({
  selector: '[appEstadoReparacionBgcolor]'
})
export class EstadoReparacionBgcolorDirective {

  @Input() appEstadoReparacionBgcolor:boleta_estados=boleta_estados.PENDIENTE;
  constructor(private el: ElementRef) {
  }

  ngOnChanges(): void {
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.el.nativeElement.style.background = reparacionBgColor[this.appEstadoReparacionBgcolor];
    this.el.nativeElement.style.color = 'white';
  }
  ngOnInit(): void {
   
  }

}
