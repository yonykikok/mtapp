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
    //     console.log(`Stock aumentado en ${cantidad}. Nuevo stock: ${this.stock}`);
    //   } else {
    //     console.log('La cantidad debe ser mayor que 0 para aumentar el stock.');
    //   }
    // }
  
    // disminuirStock(cantidad: number): void {
    //   if (cantidad > 0 && cantidad <= this.stock) {
    //     this.stock -= cantidad;
    //     console.log(`Stock disminuido en ${cantidad}. Nuevo stock: ${this.stock}`);
    //   } else if (cantidad > this.stock) {
    //     console.log('La cantidad a disminuir supera el stock disponible.');
    //   } else {
    //     console.log('La cantidad debe ser mayor que 0 y menor o igual al stock actual.');
    //   }
    // }
  }
  