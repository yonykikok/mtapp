import { Component, OnInit } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { FormAltaProveedorComponent } from 'src/app/components/forms/form-alta-proveedor/form-alta-proveedor.component';
import { DetalleProveedorComponent } from 'src/app/components/views/detalle-proveedor/detalle-proveedor.component';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';

export interface Proveedor {
  id?: string,
  nombre: string,
  direccion: string,
  telefono: string,
  telefonoAlternativo: string,
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


  loggedUser

  precioDolarBlue: number | null = null;
  proveedores: Proveedor[] = [];
  productosAMostrar;
  textoABuscar;

  constructor(public funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService,
    private dataBase: DataBaseService,
    private modalController: ModalController) {

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
      telefonoAlternativo: null
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
      telefonoAlternativo: null
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
      telefonoAlternativo: null
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
      telefonoAlternativo: null
    }
    this.proveedores.push(proveedor4);

    producto2.precio += 5;
    producto2.precioVenta += 5;

    let proveedor5: Proveedor = {
      nombre: 'Daniels cell',
      modulos: [{ ...producto2 }],
      direccion: 'Larrea 400',
      telefono: '1140404040',
      telefonoAlternativo: null
    }
    this.proveedores.push(proveedor5);

  }
  ionViewWillEnter(): void {
    this.getCurrentUser();


  }
  ngOnInit() {
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }
    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);
    this.dataBase.obtenerTodos(environment.TABLAS.proveedores).subscribe((listProveedoresRef) => {
      this.proveedores = listProveedoresRef.map((proveedorRef: DocumentChangeAction<Proveedor>) => {
        let proveedor = proveedorRef.payload.doc.data();
        proveedor['id'] = proveedorRef.payload.doc.id;
        return proveedor;
      })
 //console.log(this.proveedores)
    });
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.dataBase.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
      })
    })
  }

  async openDialog() {
    try {
      const modal = await this.modalController.create({
        component: FormAltaProveedorComponent,
        componentProps: {
          loggedUser: this.loggedUser
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }

  buscarProducto() {
    if (this.textoABuscar == '') { this.productosAMostrar = []; return; };
    let productos = [];
    let precios = [];

    this.proveedores.forEach((proveedor: Proveedor) => {
      proveedor.modulos.forEach((modulo: Modulo) => {
        if (modulo.modelo.toLowerCase().includes(this.textoABuscar.toLowerCase())) {
     //console.log(productos,)
          const productoExistente = productos.find((p: any) => (p.modelo.toLowerCase() === modulo.modelo.toLowerCase() && p.tipo.toLowerCase() == modulo.tipo.toLowerCase()));

          if (productoExistente) {
            productoExistente.precios.push({
              proveedor: proveedor.nombre,
              precio: modulo.precio
            });
            productoExistente.precios.sort((a, b) => a.precio - b.precio);
          } else {
            const nuevoProducto = {
              calidad: modulo.calidad,
              tipo: modulo.tipo,
              modelo: modulo.modelo,
              precios: [{
                proveedor: proveedor.nombre,
                precio: modulo.precio
              }]
            };

            productos.push(nuevoProducto);
          }
          precios.push(modulo.precio);
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

  async mostrarDetalleProveedor(proveedor: Proveedor) {
    try {
      const modal = await this.modalController.create({
        component: DetalleProveedorComponent,
        componentProps: {
          proveedor
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }
}
