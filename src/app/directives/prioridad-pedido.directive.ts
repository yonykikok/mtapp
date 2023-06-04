import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPrioridadPedido]'
})
export class PrioridadPedidoDirective implements OnInit {
  @Input() appPrioridadPedido;

  constructor(private el: ElementRef) {
  }
  ngOnInit() {
    switch (this.appPrioridadPedido.prioridad) {
      case "Opcional":
        break;
      case "Sin stock":
        this.el.nativeElement.style.backgroundColor = '#fddea4';
        break;
      case "Averiguar":
        this.el.nativeElement.style.backgroundColor = '#dcdcff';
        break;
      case "Urgente":
        this.el.nativeElement.style.backgroundColor = '#f5a0a0';
        break;
    }
  }

}
