import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { Producto } from '../lista-productos/lista-productos.page';

@Component({
  selector: 'app-slide-de-productos',
  templateUrl: './slide-de-productos.page.html',
  styleUrls: ['./slide-de-productos.page.scss'],
})
export class SlideDeProductosPage implements OnInit {

  @ViewChild(IonicSlides, { static: false }) slides: any;

  productos: Producto[] = [
    {
      id: '1',
      codigo: '001',
      imgUrlsRef: ['https://example.com/product1.jpg'],
      images: [],
      marca: 'Marca A',
      coloresDisponibles: [{ stock: 10, color: 'red', denominacionColor: 'Rojo' }],
      cantidad: 5,
      categoria: 'Electrónica',
      stockTotal: 100,
      costo: 200,
      iva: 21,
      producto: 'Producto A',
      margen: 20,
      financiamiento: 0,
      precio: 240,
    },
    {
      id: '2',
      codigo: '002',
      imgUrlsRef: ['https://example.com/product2.jpg'],
      images: [],
      marca: 'Marca B',
      coloresDisponibles: [{ stock: 5, color: 'blue', denominacionColor: 'Azul' }],
      cantidad: 3,
      categoria: 'Ropa',
      stockTotal: 50,
      costo: 100,
      iva: 21,
      producto: 'Producto B',
      margen: 30,
      financiamiento: 0,
      precio: 130,
    },
    // Añadir más productos si es necesario
  ];

  slideOpts = {
    initialSlide: 0,
    speed: 2000, // Velocidad de transición entre slides
    autoplay: {
      delay: 3000, // Cambia de producto cada 3 segundos
    },
  };

  constructor() { }

  ngOnInit() {
    // Aquí podrías cargar los productos desde un servicio o una fuente de datos
  }
}
