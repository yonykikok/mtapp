import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { MediosDePago, RecargoPorMediosDePago } from '../forms/form-detalle-venta/form-detalle-venta.component';
import { Producto } from '../nueva-funcionalidad/nueva-funcionalidad.component';
import { VisualizadorDeImagenComponent } from '../views/visualizador-de-imagen/visualizador-de-imagen.component';
@Component({
  selector: 'app-nuevo-form-detalle-venta',
  templateUrl: './nuevo-form-detalle-venta.component.html',
  styleUrls: ['./nuevo-form-detalle-venta.component.scss'],
})
export class NuevoFormDetalleVentaComponent implements OnInit {

  productosSeleccionados: Producto[] = [];
  productoABuscar: string = '';
  productos: Producto[] = [];
  productosAMostrar: Producto[] = [];
  anularRecargo = false;
  cuentasBancarias = [{
    titular: 'Haedo Adriana',
    alias: 's.t.multitask',
    CBU: '8001236549574516'
  }, {
    titular: 'Haedo Jonathan',
    alias: 'disco.choza.escudo',
    CBU: '4054654412581258'
  }];



  step = 1;
  medioDePago: string = MediosDePago.Efectivo;
  titularDeCuenta: any;
  montoAbonado!: number;
  montoTotal = 0;
  items: any[] = [];
  item: any = {
    precio: null,
    boleta: '',
    descripcion: '',
  }
  porcentajeDeRecargo: RecargoPorMediosDePago = RecargoPorMediosDePago.Efectivo;
  constructor(
    private alertService: AlertService,
    private modalController: ModalController,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    console.log(this.productos)
  }

  filtrarProductos(event: any) {
    const valorBusqueda = event.target.value.toLowerCase();
    this.productosAMostrar = this.productos.filter((producto: Producto) => {
      // Verificar si el producto contiene el valor de búsqueda
      if (producto.producto.toLowerCase().includes(valorBusqueda) ||
        (producto.codigo && producto.codigo.toLowerCase().includes(valorBusqueda)) ||
        producto.marca.toLowerCase().includes(valorBusqueda)
      ) {
        return producto;
      }
      return null;
    });
    console.log(this.productosAMostrar)
  }

  onSubmit() {
    console.log(this.productoABuscar)
    const valorBusqueda = this.productoABuscar.toLowerCase();
    this.productosAMostrar = this.productos.filter((producto: Producto) => {
      // Verificar si el producto contiene el valor de búsqueda
      if (producto.producto.toLowerCase().includes(valorBusqueda) ||
        (producto.codigo && producto.codigo.toLowerCase().includes(valorBusqueda)) ||
        producto.marca.toLowerCase().includes(valorBusqueda)
      ) {
        return producto;
      }
      return null;
    });
    console.log(this.productosAMostrar)
    if (this.productosAMostrar && this.productosAMostrar.length == 1) {
      this.item = {
        boleta: this.item.boleta ? this.item.boleta : '',
        precio: this.productosAMostrar[0].precio,
        descripcion: this.productosAMostrar[0].producto,
      };
      this.agregarItem();
    }

    this.addToCart({ id: this.productosAMostrar[0].id, name: this.productosAMostrar[0].producto, price: this.productosAMostrar[0].precio });
  }
  agregarItem() {
    this.items.push({ ...this.item });
    this.item = {
      precio: 0,
      descripcion: '',
    }
    this.productoABuscar = '';

    this.calcularMontoTotal();
  }
  calcularMontoTotal() {
    this.montoTotal = 0;
    this.items.forEach(item => {
      this.montoTotal += item.precio;
    });
  }
  showConfirmDialog() {

    this.alertService.alertConfirmacion('Finalizar Venta', 'Confirma que todos los datos estan correctos?', 'Si, confirmo', this.agregarVenta.bind(this));

  }

  agregarVenta() {
    let items = this.items.map(item => {
      item['medioDePago'] = this.medioDePago;
      item['precio'] = item['precio'] + ((item['precio'] / 100) * this.porcentajeDeRecargo);
      if (this.medioDePago != MediosDePago.Efectivo) {
        item['titularDeCuenta'] = this.titularDeCuenta ? this.titularDeCuenta : 'descuento';
      }

      return item;
    });

    this.modalController.dismiss(items, 'guardarItems');
    this.items = [];
  }
  eliminarItem(selectedItem: any) {
    this.items.splice(this.items.findIndex(item => selectedItem === item), 1);
    this.calcularMontoTotal();
  }

  volverAtras() {
    console.log(this.step);
    if (this.step == 2) {
      console.log("bajar pasol")
      this.step = this.step - 1;
    } else {
      console.log("cerra modal")
      this.modalController.dismiss();
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: `${this.cuentasBancarias.length > 0 ? 'Cuentas disponibles' : 'Sin cuentas disponibles'}`,
      cssClass: 'my-custom-class',
      buttons: this.cuentasBancarias.map(cuenta => {
        let actionSheet: ActionSheetButton = {
          text: cuenta.alias ? cuenta.alias + ` (${cuenta.titular})` : cuenta.CBU.toString() + ` (${cuenta.titular})`,
          handler: () => {
            this.titularDeCuenta = cuenta.alias ? cuenta.alias : cuenta.CBU;
          }
        }
        return actionSheet;
      })
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();

    if (role == 'backdrop') {
      this.medioDePago = 'efectivo';
      this.porcentajeDeRecargo = 0;
    }
    console.log('onDidDismiss resolved with role', role);
  }
  verDeAnularRecargo() {
    setTimeout(() => {
      if (this.anularRecargo) {
        this.porcentajeDeRecargo = 0;
      } else {
        this.porcentajeDeRecargo = this.medioDePago == 'transferencia'
          ? 8//transferencia
          : this.medioDePago == 'mercadopago'
            ? 12//mercadopago
            : 0;//efectivo
      }
    }, 100);
  }

  agregarProducto(producto: Producto) {
    this.productosSeleccionados.push(producto);
    console.log(this.productosSeleccionados)
  }

  async solicitarCantidad(producto: Producto) {
    const alert = await this.alertController.create({
      header: 'Cantidad',
      subHeader: `¿Cuántos quieres agregar?`,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1,
          value: 1
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            console.log(`Cantidad seleccionada: ${data.cantidad}`);
            console.log(`${producto.producto}x${data.cantidad}`)

            for (let index = 0; index < data.cantidad; index++) {
              this.item = {
                descripcion: producto.producto,
                precio: producto.precio ? producto.precio : 0,
                boleta: this.item.boleta ? this.item.boleta : ''
              }
              this.agregarItem();

            }

            // Aquí puedes manejar la cantidad seleccionada, por ejemplo, actualizar el estado de la aplicación
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarImagenCompleta(event: Event, imagen: string) {
    event.stopPropagation();
    try {
      const modal = await this.modalController.create({
        component: VisualizadorDeImagenComponent,
        componentProps: {
          imagen,
          isModal: true,
          ruta: 'nuevo-libro-diario'
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }
  }





  lastCartId: number = 0;
  //generado por ia
  selectedTotalPrice: number = 0;
  selectCart(cartId: string) {
    this.switchCart(cartId);
    // this.updateSelectedCart();
  }
  generateReceipt(cartId: string) {
    // Genera la boleta con los detalles del carrito
  }
  checkout() {
    // Implementa el proceso de pago aquí
    const currentCartId = this.currentCartId;
    this.generateReceipt(currentCartId);
    this.clearCart(currentCartId);
    this.updateSelectedCart();
  }
  updateSelectedCart() {
    this.selectedCartItems = this.getCartItems();
    this.selectedTotalPrice = this.getTotalPrice(this.currentCartId);
  }
  carts: Cart[] = [];
  selectedCartItems: any[] = [];
  currentCartId: any = null;

  createNewCart(): string {
    const newCartId = this.generateUniqueId();
    this.carts.push({ id: newCartId, items: [] });
    this.currentCartId = newCartId;
    return newCartId;
  }

  switchCart(cartId: string) {
    this.currentCartId = cartId;
  }

  addToCart(product: any) {
    if (!this.currentCartId) {
      throw new Error('No cart selected');
    }
    const cart = this.carts.find(c => c.id === this.currentCartId);
    if (cart) {
      const index = cart.items.findIndex(item => item.productId === product.id);
      if (index === -1) {
        cart.items.push({ productId: product.id, name: product.name, price: product.price, quantity: 1 });
      } else {
        cart.items[index].quantity++;
      }
    }
  }

  removeFromCart(productId: string) {
    if (!this.currentCartId) {
      throw new Error('No cart selected');
    }
    const cart = this.carts.find(c => c.id === this.currentCartId);
    if (cart) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    }
  }

  getCartItems(): CartItem[] {
    if (!this.currentCartId) {
      throw new Error('No cart selected');
    }
    const cart = this.carts.find(c => c.id === this.currentCartId);
    return cart ? cart.items : [];
  }

  clearCart(cartId: string) {
    const cart = this.carts.find(c => c.id === cartId);
    if (cart) {
      cart.items = [];
    }
  }

  getTotalPrice(cartId: string): number {
    const cart = this.carts.find(c => c.id === cartId);
    return cart ? cart.items.reduce((total, item) => total + (item.price * item.quantity), 0) : 0;
  }

  private generateUniqueId(): string {
    this.lastCartId += 1;
    return `carrito${this.lastCartId}`;
  }
}


export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
}
