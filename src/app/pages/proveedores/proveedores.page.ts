import { Component, OnInit } from '@angular/core';

interface Proveedor {
  nombre: string,
  direccion: string,
  telefono: string,
  telefonoPrivado: string,
  modulos: Modulo[],
}
interface Producto {
  marca: string,
  modelo: string,
  precio: number,
  categoria: string,
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
  'simple' = 'c/m',
  'conMarco' = 's/m',
}

interface Modulo extends Producto {
  calidad: calidadModulo,
  tipo: tipoModulo,
  precioVenta: number
  compatibilidad: string,
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
      categoria: 'modulos',
      compatibilidad: '',
      marca: 'Samsung',
      modelo: 'J7 prime',
      precio: 24,
      calidad: calidadModulo.originalOled,
      precioVenta: 34,
      tipo: tipoModulo.simple,
    }
    let producto2: Modulo = {
      categoria: 'modulos',
      compatibilidad: '',
      marca: 'Samsung',
      modelo: 'J7 Pro',
      precio: 30,
      calidad: calidadModulo.originalOled,
      precioVenta: 40,
      tipo: tipoModulo.simple,
    }
    let proveedor: Proveedor = {
      nombre: 'Brandon',
      modulos: [{ ...producto }, { ...producto2 }],
      direccion: 'Corrientes 2400',
      telefono: '1140875800',
      telefonoPrivado: null
    }
    this.proveedores.push(proveedor);

    producto.precio += 5;
    producto2.precio += 5;
    producto.precioVenta += 5;
    producto2.precioVenta += 5;

    let proveedor2: Proveedor = {
      nombre: 'Todo Celu',
      modulos: [{ ...producto }, { ...producto2 }],
      direccion: 'Larrea 410',
      telefono: '1140545800',
      telefonoPrivado: null
    }
    this.proveedores.push(proveedor2);

    producto.precio -= 2;
    producto2.precio -= 2;
    producto.precioVenta -= 2;
    producto2.precioVenta -= 2;

    let proveedor3: Proveedor = {
      nombre: 'World cell',
      modulos: [{ ...producto }, { ...producto2 }],
      direccion: 'Larrea 408',
      telefono: '1154255100',
      telefonoPrivado: null
    }
    this.proveedores.push(proveedor3);

    producto.precio -= 2;
    producto2.precio -= 2;
    producto.precioVenta -= 2;
    producto2.precioVenta -= 2;
    let proveedor4: Proveedor = {
      nombre: 'Dari Cell',
      modulos: [{ ...producto }, { ...producto2 }],
      direccion: 'Larrea 400',
      telefono: '1140404040',
      telefonoPrivado: null
    }
    this.proveedores.push(proveedor4);

    producto2.precio += 5;
    producto2.precioVenta += 5;

    let proveedor5: Proveedor = {
      nombre: 'Daniels cell',
      modulos: [ { ...producto2 }],
      direccion: 'Larrea 400',
      telefono: '1140404040',
      telefonoPrivado: null
    }
    this.proveedores.push(proveedor5);

  }

  ngOnInit() {
  }

  buscarProducto() {
    if (this.textoABuscar == '') { this.productosAMostrar = []; return; };
    let productos = [];
    let precios = [];

    this.proveedores.forEach((proveedor: Proveedor) => {
      proveedor.modulos.forEach((producto: Modulo) => {
        if (producto.modelo.toLowerCase().includes(this.textoABuscar.toLowerCase())) {
          const productoExistente = productos.find((p: Producto) => p.modelo === producto.modelo);

          if (productoExistente) {
            productoExistente.precios.push({
              proveedor: proveedor.nombre,
              precio: producto.precio
            });
            productoExistente.precios.sort((a, b) => a.precio - b.precio);
          } else {
            const nuevoProducto = {
              calidad: producto.calidad,
              modelo: producto.modelo,
              precios: [{
                proveedor: proveedor.nombre,
                precio: producto.precio
              }]
            };

            productos.push(nuevoProducto);
          }
          precios.push(producto.precio);
        }
      });
    });

    const precioPromedio = precios.reduce((total, precio) => total + precio, 0) / precios.length;

    productos.forEach((producto: any) => {
      producto.precioPromedio = precioPromedio;
    });

    this.productosAMostrar = productos;


  }



  asignarColor(lista, index) {
    if (index == 0) {
      return 'success';
    } else if (index == lista.length - 1) {
      return 'danger';
    }
    return 'primary';

  }
}
