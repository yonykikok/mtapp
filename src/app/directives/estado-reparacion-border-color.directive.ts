import { Directive, ElementRef, Input } from '@angular/core';
import { reparacionBgColor } from '../services/info-compartida.service';

@Directive({
  selector: '[appEstadoReparacionBorderColor]'
})
export class EstadoReparacionBorderColorDirective {

  @Input() appEstadoReparacionBorderColor = '';
  constructor(private el: ElementRef) {
   
  }

  ngOnChanges(): void {
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.el.nativeElement.style.borderColor = reparacionBgColor[this.appEstadoReparacionBorderColor.toUpperCase()];

  }

}
