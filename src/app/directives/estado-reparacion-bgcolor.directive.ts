import { Directive, ElementRef, Input } from '@angular/core';
import { reparacionBgColor } from '../services/info-compartida.service';


@Directive({
  selector: '[appEstadoReparacionBgcolor]'
})
export class EstadoReparacionBgcolorDirective {

  @Input() appEstadoReparacionBgcolor;
  constructor(private el: ElementRef) {
  }

  ngOnChanges(): void {
    this.actualizarEstado();
  }

  private actualizarEstado(): void {
    this.el.nativeElement.style.background = reparacionBgColor[this.appEstadoReparacionBgcolor.toUpperCase()];
    this.el.nativeElement.style.color = 'white';
  }
  ngOnInit(): void {
   
  }

}
