import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormAltaArticuloComponent } from 'src/app/components/forms/articulos/form-alta-articulo/form-alta-articulo.component';
import { FormAltaAuricularComponent } from 'src/app/components/forms/articulos/form-alta-auricular/form-alta-auricular.component';
import { FormAltaCableComponent } from 'src/app/components/forms/articulos/form-alta-cable/form-alta-cable.component';
import { FormAltaCargadorComponent } from 'src/app/components/forms/articulos/form-alta-cargador/form-alta-cargador.component';
import { FormAltaFundaComponent } from 'src/app/components/forms/articulos/form-alta-funda/form-alta-funda.component';
import { FormAltaJoystickComponent } from 'src/app/components/forms/articulos/form-alta-joystick/form-alta-joystick.component';
import { Articulo } from "src/app/clases/articulo";
import { Auricular, conexionAuricular } from 'src/app/interfaces/articulos/auricular';
import { Cable, compatibilidadCableUsb } from 'src/app/interfaces/articulos/cable';
import { Cargador, compatibilidad, tiposCargadores, velocidad } from 'src/app/interfaces/articulos/cargador';
import { Funda, tiposFundas } from 'src/app/interfaces/articulos/funda';
import { Joystick, compatibilidadJoystick, conexionJoystick } from 'src/app/interfaces/articulos/joystick';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.page.html',
  styleUrls: ['./articulos.page.scss'],
})
export class ArticulosPage implements OnInit {
  textoABuscar: string = '';

  precioMin: number = 0;
  precioMax: number = 0;

  categorias: any;
  accesoriosTelefonia: any[] = [];


  constructor(private modalController: ModalController) {


    let cargador1: Cargador = {
      codigoDeBarra: 'C450450',
      stock: 1,
      id: '1',
      velocidad: velocidad.carga_rapida,
      nombre: "Cargador Inalámbrico",
      categoria: "Cargadores",
      marca: "ChargeTech",
      precio: 3900.99,
      tipo: tiposCargadores.inalambrico,
      compatibilidad: [compatibilidad.type_c, compatibilidad.lightning, compatibilidad.v8],
      imagen: 'https://tienda.personal.com.ar/images/Cargador_Wireless_Samsung_30_min_d50908e6fa.png'
    }
    
    let cargador2: Cargador = {
      stock: 1,
      codigoDeBarra: 'C450451',
      id: '2',
      velocidad: velocidad.turbo_power,
      nombre: "Cargador Portatil",
      categoria: "Cargadores",
      marca: "Inova",
      precio: 5900.99,
      tipo: tiposCargadores.con_cable,
      compatibilidad: [compatibilidad.v8],
      imagen: 'https://tienda.personal.com.ar/images/Cargador_45_W_Negro_550x550_4_min_ef4f5010f8.png'
    }


    let funda: Funda = {
      codigoDeBarra: 'A450450',
      id: "3",
      nombre: "Auriculares con Cancelación de Ruido",
      stock: 1,
      categoria: "Fundas",
      marca: "SoundSense",
      precio: 890.99,
      modelo: "J7 prime",
      resistenteGolpes: true,
      tipo: tiposFundas.armor,
      imagen: 'https://smithmayorista.com.ar/wp-content/uploads/2023/05/IMG_0518_preview_rev_1.png'
    }

    let auricular: Auricular = {
      stock: 1,
      codigoDeBarra: 'A450450',
      id: "3",
      nombre: "Auriculares con Cancelación de Ruido",
      categoria: "Auriculares",
      marca: "SoundSense",
      precio: 890.99,
      conexion: [conexionAuricular.auxiliar],
      cancelacionRuido: false,
      microfono: true,
      imagen: 'https://d2r9epyceweg5n.cloudfront.net/stores/002/043/051/products/auricular_manos_libresbluetooth_hypershock_wireless_headset__2_-removebg-preview1-5a40b72ff372bc959916710382338599-640-0.png'
    }
    let mando: Joystick = {
      stock: 1,
      codigoDeBarra: 'J450450',
      id: '5',
      nombre: "Gamepad Móvil",
      categoria: "Joysticks",
      marca: "GameMaster",
      precio: 2200.99,
      compatibilidad: [compatibilidadJoystick.android, compatibilidadJoystick.ios, compatibilidadJoystick.notebook, compatibilidadJoystick.pc],
      conexion: conexionJoystick.bluetooth,
      imagen: 'https://www.venex.com.ar/products_images/1534179393_fg.png'
    };
    let cable: Cable = {
      stock: 1,
      codigoDeBarra: 'J450450',
      id: '5',
      nombre: "Cable usb",
      categoria: "Cables",
      marca: "GameMaster",
      precio: 2200.99,
      compatibilidad: [compatibilidadCableUsb.type_c],
      imagen: 'https://i0.wp.com/compraenclic.com.ar/wp-content/uploads/2023/06/CTB-TYPE.C-SPE.png?fit=500%2C466&ssl=1'
    };
    this.accesoriosTelefonia.push(cable);
    this.accesoriosTelefonia.push(cargador1);
    this.accesoriosTelefonia.push(cargador2);
    this.accesoriosTelefonia.push(mando);
    this.accesoriosTelefonia.push(funda);
    this.accesoriosTelefonia.push(auricular);
    return;
  }

  async ngOnInit() {
    this.categorias = [...this.obtenerCategoriasUnicas(), 'Otros'];
    let modal = await this.modalController.create({
      component: FormAltaArticuloComponent,
      componentProps: {
        categorias: this.categorias
      }
    });
    modal.onDidDismiss().then((result: any) => {
      if (!result.data || !result.role) return;

      if (result.role == 'continuar') {
        let articulo = result.data;
        this.abrirFormularioPorCategoria(articulo)


        console.log("Data:", result.data);
      }
    })
    await modal.present();

  }

  async abrirFormularioPorCategoria(articulo: Articulo) {
    let components: any = {
      'Cargadores': {
        component: FormAltaCargadorComponent,
        props: {
          articulo: articulo
        }
      },
      'Auriculares': {
        component: FormAltaAuricularComponent,
        props: {}
      },
      'Joysticks': {
        component: FormAltaJoystickComponent,
        props: {}
      },
      'Fundas': {
        component: FormAltaFundaComponent,
        props: {}
      },
      'Cables': {
        component: FormAltaCableComponent,
        props: {}
      },
      'Otros': {
        // component: FormAltaJoystickComponent,
        // props: {}
      }
    }

    let modal = await this.modalController.create({
      component: components[articulo.categoria].component,
      componentProps: {}
    });
    modal.onDidDismiss().then((result: any) => {
      if (!result.data || !result.role) return;

      if (result.role == 'continuar') {
        console.log("Data:", result.data);
      }
    })
    await modal.present();
  }


  obtenerCategoriasUnicas() {
    return [...new Set(this.accesoriosTelefonia.map(accesorio => accesorio.categoria))];
  }

  filtrarAccesoriosPorCategoria(categoria: string) {
    return this.accesoriosTelefonia.filter(accesorio => accesorio.categoria === categoria);
  }

}
