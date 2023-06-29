import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { reparacionBgColor } from '../services/info-compartida.service';

@Directive({
  selector: '[appEstadoReparacionColor]'
})
export class EstadoReparacionColorDirective {
  @Input() appEstadoReparacionColor = '';
  constructor(private el: ElementRef) {

  }
  ngOnChanges(): void {
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.el.nativeElement.style.color = reparacionBgColor[this.appEstadoReparacionColor.toUpperCase()];
  }


}
