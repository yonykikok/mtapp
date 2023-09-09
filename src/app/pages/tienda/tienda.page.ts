import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  textoABuscar;

  precioMin: number;
  precioMax: number;

  categorias;
  accesoriosTelefonia = [
    {
      nombre: "Cargador Inalámbrico",
      categoria: "Cargadores",
      marca: "ChargeTech",
      precio: 3900.99,
      tipo: "Carga rápida",
      compatibilidad: "Qi-enabled",
      imagen: 'https://fixechelectronica.com.ar/wp-content/uploads/2023/05/cargados-iphone-tipo-c.png'
    },
    {
      nombre: "Cargador Portatil",
      categoria: "Cargadores",
      marca: "Inova",
      precio: 5900.99,
      tipo: "Carga rápida",
      compatibilidad: "V8",
      imagen: 'https://tienda.personal.com.ar/images/Cargador_45_W_Negro_550x550_4_min_ef4f5010f8.png'
    },
    {
      nombre: "Cargador Portatil",
      categoria: "Cargadores",
      marca: "Inova",
      precio: 5950.99,
      tipo: "Carga rápida",
      compatibilidad: "V8",
      imagen: 'https://images.samsung.com/is/image/samsung/ar-ep-ln930cbegww-ep-ln930cbegww-frontblack-89864501?$650_519_PNG$'
    },
    {
      nombre: "Auriculares con Cancelación de Ruido",
      categoria: "Auriculares",
      marca: "SoundSense",
      precio: 890.99,
      conexion: "Bluetooth",
      cancelacionRuido: true,
      imagen: 'https://d2r9epyceweg5n.cloudfront.net/stores/002/043/051/products/auricular_manos_libresbluetooth_hypershock_wireless_headset__2_-removebg-preview1-5a40b72ff372bc959916710382338599-640-0.png'
    },
    {
      nombre: "Protector Anti-Shock",
      categoria: "Protectores de Pantalla",
      marca: "ArmorGuard",
      precio: 1200.99,
      compatibilidad: "iPhone 13",
      resistenteGolpes: true,
      imagen: 'https://d2r9epyceweg5n.cloudfront.net/stores/213/750/products/templado-2-5d-full-glue-iphone_x-xs1-d7eba740f3dfd7c51f16013284517708-1024-1024.png'
    },
    {
      nombre: "Funda con Soporte Integrado",
      categoria: "Fundas",
      marca: "SmartCover",
      precio: 2400.99,
      color: "Azul",
      soporteIntegrado: true,
      imagen: 'https://gvz-tec.com/wp-content/uploads/2022/04/case-pao.png'
    },
    {
      nombre: "Memoria USB OTG",
      categoria: "Memorias",
      marca: "FlashTech",
      precio: 1700.99,
      capacidad: "64GB",
      compatibilidad: "Micro USB / USB-C",
      imagen: 'https://kolaccesorios.com/wp-content/uploads/2022/05/Mickey-pop-it-6.png'
    },
    {
      nombre: "Gamepad Móvil",
      categoria: "Joysticks",
      marca: "GameMaster",
      precio: 2200.99,
      compatibilidad: "iOS / Android",
      conexion: "Cable USB",
      imagen: 'https://www.venex.com.ar/products_images/1534179393_fg.png'
    },
    // Agrega más accesorios aquí
  ];


  constructor() { }

  ngOnInit() {
    this.categorias = this.obtenerCategoriasUnicas()
  }


  obtenerCategoriasUnicas() {
    return [...new Set(this.accesoriosTelefonia.map(accesorio => accesorio.categoria))];
  }

  filtrarAccesoriosPorCategoria(categoria: string) {
    return this.accesoriosTelefonia.filter(accesorio => accesorio.categoria === categoria);
  }

}
