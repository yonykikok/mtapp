import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';

@Component({
  selector: 'app-precio-dolar',
  templateUrl: './precio-dolar.component.html',
  styleUrls: ['./precio-dolar.component.scss'],
})
export class PrecioDolarComponent implements OnInit {
  editarPrecio = false;
  @Input() loggedUser;
  precioDolarBlueOriginal;
  precioDolarBlue;
  precioDolarBlueIngresado;
  @Output() setPrecioBlue = new EventEmitter<Number>();
  dolarObservable$: Observable<number>;

  constructor(
    public funcionesUtiles: FuncionesUtilesService) {
    if (this.funcionesUtiles.customDolar) {
      this.precioDolarBlue = this.funcionesUtiles.customDolar;
    }
    this.funcionesUtiles.getPriceDolar().subscribe(newPrice => this.precioDolarBlue = newPrice);
  }


  ngOnInit(): void {
  }

  aplicarCambio() {
    if (!this.precioDolarBlueIngresado || this.precioDolarBlueIngresado.toString().includes('e')) return;

    if (this.precioDolarBlueIngresado < this.funcionesUtiles.precioOriginal) {
      // this.snackBar.open('ERROR, no podes ingresar un valor menor al real', 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
    } else {
      this.precioDolarBlue = Number(this.precioDolarBlueIngresado);
      this.funcionesUtiles.setPriceDolar(Number(this.precioDolarBlueIngresado));
      // this.snackBar.open('Se establecio el nuevo precio de seguridad', 'Cerrar', { duration: 5000, panelClass: ['successSnackBar'] });
    }
  }
  restablecerPrecioDolarBlue() {
    this.funcionesUtiles.setPriceDolar(this.funcionesUtiles.precioOriginal);
    this.precioDolarBlueIngresado = Number(this.precioDolarBlueOriginal);
  }
}
