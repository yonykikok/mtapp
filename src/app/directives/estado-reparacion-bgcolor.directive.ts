import { Directive, ElementRef, Input } from '@angular/core';

const bgColors = {
  pendiente: 'lightskyblue',
  en_proceso: 'blue',
  cancelado_por_el_usuario: 'red',
  sin_reparar: 'red',
  reparado: 'green',
  diagnosticado: 'orange'
}

@Directive({
  selector: '[appEstadoReparacionBgcolor]'
})
export class EstadoReparacionBgcolorDirective {

  @Input() appEstadoReparacionBgcolor;
  constructor(private el: ElementRef) {

  }
  ngOnInit(): void {
    this.el.nativeElement.style.background = bgColors[this.appEstadoReparacionBgcolor];
    this.el.nativeElement.style.color = 'white';
  }

}
