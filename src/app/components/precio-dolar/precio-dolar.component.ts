import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/user';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-precio-dolar',
  templateUrl: './precio-dolar.component.html',
  styleUrls: ['./precio-dolar.component.scss'],
})
export class PrecioDolarComponent implements OnInit {
  mostrarPrecioDolar: boolean = false;
  editarPrecio = false;
  @Input() loggedUser!: User;
  precioDolarBlueOriginal = 0;
  precioDolarBlue = 0;
  precioDolarBlueIngresado = 0;
  @Output() setPrecioBlue = new EventEmitter<Number>();
  dolarObservable$: Observable<number> = new Observable<number>();

  constructor(
    public funcionesUtiles: FuncionesUtilesService,
    private toastService: ToastService,
    private database: DataBaseService) {
    this.database.obtenerPorId(environment.TABLAS.cotizacion_dolar, 'dolarBlue').subscribe((res: any) => {
          this.precioDolarBlue = res.payload.data().price;
    });

  }


  ngOnInit(): void {
  }

  aplicarCambio() {
    // if (!this.precioDolarBlueIngresado || this.precioDolarBlueIngresado.toString().includes('e')) return;

    // if (this.precioDolarBlueIngresado < this.funcionesUtiles.precioOriginal) {
    //   // this.snackBar.open('ERROR, no podes ingresar un valor menor al real', 'Cerrar', { duration: 5000, panelClass: ['dangerSnackBar'] });
    //   this.toastService.simpleMessage('Error', 'no podes ingresar un valor menor al real', ToastColor.danger);
    // } else {
    this.precioDolarBlue = Number(this.precioDolarBlueIngresado);
    this.funcionesUtiles.setPriceDolar(Number(this.precioDolarBlueIngresado));
    this.toastService.simpleMessage('Exito', 'Se establecio el nuevo precio de seguridad', ToastColor.success);
    // this.snackBar.open('Se establecio el nuevo precio de seguridad', 'Cerrar', { duration: 5000, panelClass: ['successSnackBar'] });
    // }
  }
  // restablecerPrecioDolarBlue() {
  //   this.funcionesUtiles.setPriceDolar(this.funcionesUtiles.precioOriginal);
  //   this.precioDolarBlueIngresado = Number(this.precioDolarBlueOriginal);
  // }
}
