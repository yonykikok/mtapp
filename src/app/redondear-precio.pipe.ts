import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'redondearPrecio'
})
export class RedondearPrecioPipe implements PipeTransform {

  transform(precio: number, moneda: 'pesos' | 'dolares'): number {
    if (moneda === 'pesos') {
      return this.redondearPrecioPesos(precio);
    } else if (moneda === 'dolares') {
      return this.redondearPrecioDolares(precio);
    }
    return precio;
  }

  private redondearPrecioPesos(precio: number): number {
    let base = Math.floor(precio / 100) * 100;
    let diferencia = precio - base;
    if (diferencia === 0) {
      return base;
    }

    if (diferencia <= 50) {
      return base + 50;
    } else {
      return base + 100;
    }
  }

  private redondearPrecioDolares(precio: number): number {
    return Math.round(precio * 100) / 100;
  }
}
