export class Articulo {
    id: string;
    nombre: string;
    categoria: string;
    precio: number;
    codigoDeBarra: string;
    stock: number;
  
    constructor(id: string, nombre: string, categoria: string, precio: number, codigoDeBarra: string, stock: number) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
      this.codigoDeBarra = codigoDeBarra;
      this.stock = stock;
    }
  
    // aumentarStock(cantidad: number): void {
    //   if (cantidad > 0) {
    //     this.stock += cantidad;
    //   } else {
    //   }
    // }
  
    // disminuirStock(cantidad: number): void {
    //   if (cantidad > 0 && cantidad <= this.stock) {
    //     this.stock -= cantidad;
    //   } else if (cantidad > this.stock) {
    //   } else {
    //   }
    // }
  }
  