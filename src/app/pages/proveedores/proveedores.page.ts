import { Component, OnInit } from '@angular/core';

interface Proveedor {
  nombre: string,
  productos: Producto[],
  ultimaActualizacion: Date,
}
interface Producto {
  marca: string,
  modelo: string,
  precioDeCompra: number,
}
enum calidadModulo {
  'aaa' = 'generico de baja calidad',
  'genBueno' = 'generico bueno',
  'originalOled' = 'original oled',
  'estandar' = 'estandar',
  'originalCertificado' = 'Original certificado',
  'genMedCalidad' = 'generico mediana calidad',
}
enum tipoModulo {
  'simple' = 'simple',
  'conMarco' = 'con marco',
}

interface Modulo extends Producto {
  color?: string
  stock?: number,
  calidad: calidadModulo,
  tipo: tipoModulo,
  precioVenta: number
}

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {

  

  precioDolar = 310;
  proveedores: Proveedor[] = [];
  productosAMostrar;
  textoABuscar;

  constructor() {

    let producto: Modulo = {
      marca: 'Samsung',
      modelo: 'J7 prime',
      precioDeCompra: 24,
      calidad: calidadModulo.originalOled,
      precioVenta: 34,
      tipo: tipoModulo.simple,
    }
    let producto2: Modulo = {
      marca: 'Samsung',
      modelo: 'J7 Pro',
      precioDeCompra: 30,
      calidad: calidadModulo.originalOled,
      precioVenta: 40,
      tipo: tipoModulo.simple,
    }
    let proveedor: Proveedor = {
      nombre: 'Brandon',
      ultimaActualizacion: new Date(),
      productos: [{ ...producto }, { ...producto2 }]
    }
    this.proveedores.push(proveedor);

    producto.precioDeCompra += 5;
    producto2.precioDeCompra += 5;
    producto.precioVenta += 5;
    producto2.precioVenta += 5;

    let proveedor2: Proveedor = {
      nombre: 'Todo Celu',
      ultimaActualizacion: new Date(),
      productos: [{ ...producto }, { ...producto2 }]
    }
    this.proveedores.push(proveedor2);

    producto.precioDeCompra += 2;
    producto2.precioDeCompra += 2;
    producto.precioVenta += 2;
    producto2.precioVenta += 2;

    let proveedor3: Proveedor = {
      nombre: 'World cell',
      ultimaActualizacion: new Date(),
      productos: [{ ...producto }, { ...producto2 }]
    }
    this.proveedores.push(proveedor3);

  }

  ngOnInit() {
  }

  buscarBoleta() {
    let productos = [];
    this.proveedores.forEach((proveedor: Proveedor) => {
      productos = [
        ...productos,
        ...proveedor.productos.filter((prod: Producto) => {
          if (prod.modelo.toLowerCase().includes(this.textoABuscar.toLowerCase())) {
            prod['proveedor'] = proveedor.nombre;
            return prod;
          }

        })
      ]
    });
    this.productosAMostrar = productos;
    
    console.log(productos)
  }




}
