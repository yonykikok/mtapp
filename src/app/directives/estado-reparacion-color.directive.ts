import { Directive, ElementRef, Input, OnInit } from '@angular/core';
const colors = {
  pendiente: 'lightskyblue',
  en_proceso: 'blue',
  cancelado_por_el_usuario: 'red',
  sin_reparar: 'red',
  reparado: 'green',
  diagnosticado: 'orange'
}
@Directive({
  selector: '[appEstadoReparacionColor]'
})
export class EstadoReparacionColorDirective implements OnInit {
  @Input() appEstadoReparacionColor = '';
  constructor(private el: ElementRef) {
   
  }
  ngOnInit(): void {
    
    this.el.nativeElement.style.color = colors[this.appEstadoReparacionColor];
  }
}
