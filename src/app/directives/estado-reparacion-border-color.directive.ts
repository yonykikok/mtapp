import { Directive, ElementRef, Input } from '@angular/core';
const colors = {
  pendiente: 'lightskyblue',
  en_proceso: 'blue',
  cancelado_por_el_usuario: 'red',
  sin_reparar: 'red',
  reparado: 'green',
  diagnosticado: 'orange'
}
@Directive({
  selector: '[appEstadoReparacionBorderColor]'
})
export class EstadoReparacionBorderColorDirective {

  @Input() appEstadoReparacionBorderColor = '';
  constructor(private el: ElementRef) {
   
  }
  ngOnInit(): void {
    this.el.nativeElement.style.borderColor = colors[this.appEstadoReparacionBorderColor];
  }

}
