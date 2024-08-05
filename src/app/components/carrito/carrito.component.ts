import { Component, OnInit } from '@angular/core';
import { Producto } from '../nueva-funcionalidad/nueva-funcionalidad.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent {

  productos: Producto[] = [];
  carts: any[] = []; // Debes definir una estructura para los carritos
  selectedCartId: string | null = null;
  selectedCartItems: any[] = [];
  productoABuscar: string = '';

  // Calcula el precio total de un carrito
  getTotalPrice(cartId: string): number {
    const cart = this.carts.find(cart => cart.id === cartId);
    if (cart) {
      return cart.items.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
    }
    return 0;
  }

  // Busca productos en base a la cadena ingresada
  searchProduct() {
    if (this.productoABuscar) {
      // Filtra productos que contengan el texto en su nombre
      const searchTerm = this.productoABuscar.toLowerCase();
      return this.productos.filter(producto => producto.producto.toLowerCase().includes(searchTerm));
    }
    return [];
  }

  // Maneja el evento de búsqueda
  onSubmit() {
    // Ejecuta la búsqueda y muestra los resultados
    const results = this.searchProduct();
    console.log('Resultados de la búsqueda:', results);
    // Aquí podrías mostrar los resultados en la interfaz
  }

  // Limpia el campo de búsqueda
  clearSearch() {
    this.productoABuscar = '';
    // Opcional: Puedes también limpiar los resultados mostrados
  }

  // Selecciona un carrito
  selectCart(cartId: string) {
    this.selectedCartId = cartId;
    this.selectedCartItems = this.carts.find(cart => cart.id === cartId)?.items || [];
  }

  // Elimina un producto del carrito
  removeFromCart(productId: string) {
    const cart = this.carts.find(cart => cart.id === this.selectedCartId);
    if (cart) {
      cart.items = cart.items.filter((item: any) => item.productId !== productId);
      this.selectedCartItems = cart.items;
    }
  }

  // Actualiza la cantidad de un producto en el carrito
  updateQuantity(productId: string, newQuantity: number) {
    const cart = this.carts.find(cart => cart.id === this.selectedCartId);
    if (cart) {
      const item = cart.items.find((item: any) => item.productId === productId);
      if (item) {
        item.quantity = newQuantity;
      }
    }
  }

  // Crea un nuevo carrito
  createNewCart() {
    const newCartId = (this.carts.length + 1).toString(); // O usa algún otro método para generar un ID único
    this.carts.push({
      id: newCartId,
      items: []
    });
    this.selectedCartId = newCartId;
    this.selectedCartItems = [];
  }

  // Muestra la confirmación de checkout
  showCheckoutConfirmation() {
    const totalPrice = this.getTotalPrice(this.selectedCartId || '');
    console.log('Confirmación de Checkout - Total:', totalPrice);
    // Aquí podrías mostrar un modal de confirmación o procesar el checkout
  }
}
