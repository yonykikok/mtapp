import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-form-agregar-descuento-producto',
  templateUrl: './form-agregar-descuento-producto.component.html',
  styleUrls: ['./form-agregar-descuento-producto.component.scss'],
})
export class FormAgregarDescuentoProductoComponent implements OnInit {
  mostrarAlertDePerdida: boolean = false;
  producto!: Producto;
  productoEditable!: Producto;
  precioDolarBlue!: number;
  descuentoForm: FormGroup = new FormGroup(
    {
      tipo: new FormControl('porcentaje', [Validators.required]),
      cantidad: new FormControl(null, [Validators.required, Validators.min(0)]),
      fechaInicio: new FormControl(null, [Validators.required]),
      fechaFin: new FormControl(null, [Validators.required])
    },
    { validators: this.fechaFinPosteriorValidator() } // Llamamos a la función para obtener el validador
  );

  // Validador personalizado para asegurar que fechaFin sea posterior a fechaInicio
  fechaFinPosteriorValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup;
      const fechaInicio = formGroup.get('fechaInicio')?.value;
      const fechaFin = formGroup.get('fechaFin')?.value;

      return fechaInicio && fechaFin && fechaFin <= fechaInicio
        ? { fechaFinAnterior: true }
        : null;
    };
  }


  constructor(private toastService: ToastService,
    private funcionesUtiles:FuncionesUtilesService
  ) {
    const fechaInicio = new Date();
    const fechaFin = new Date();
    fechaFin.setDate(fechaInicio.getDate() + 15); // Añadir 15 días
    this.descuentoForm.patchValue({
      fechaInicio: this.formatDate(fechaInicio),
      fechaFin: this.formatDate(fechaFin)
    });
  }

  ngOnInit() {
    this.productoEditable=this.funcionesUtiles.clonarObjeto(this.producto);
    // Escuchar cambios en todo el formulario
    this.descuentoForm.valueChanges.subscribe((changes) => {
      console.log("Cambios en el formulario:", changes);
      this.productoEditable.descuento = this.descuentoForm.value;
      console.log(this.producto)
      // Aquí puedes realizar cualquier acción con los cambios
    });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  // Método para enviar el formulario y manejar la lógica de descuento
  onSubmit() {
    if (this.descuentoForm.valid) {
      const descuentoData = this.descuentoForm.value;
      console.log('Datos del descuento:', descuentoData);
      this.producto.descuento=descuentoData;
      // Aquí puedes llamar a un servicio para guardar el descuento en tu base de datos
    } else {
      console.log('Formulario no válido');
    }
  }


  // calcularPrecioConDescuento(producto: Producto): number {
  //   if (!producto.precio || !producto.descuento) return producto.precio || 0;
  
  //   const { descuento } = producto;
  //   const hoy = Date.now(); // Obtener la fecha actual en milisegundos
  
  //   // Asegurarse de que las fechas de inicio y fin existen
  //   if (!descuento.fechaInicio || !descuento.fechaFin) return producto.precio || 0;
  
  //   // Verificar si el descuento está dentro de la vigencia
  //   const fechaInicio = descuento.fechaInicio;
  //   const fechaFin = descuento.fechaFin;
  
  //   if (hoy < fechaInicio || hoy > fechaFin) {
  //     // Si el descuento no está vigente, devolver el precio original
  //     return producto.precio;
  //   }
  
  //   let precioFinal = producto.precio;
  
  //   // Aplicar el descuento si está vigente
  //   if (descuento.tipo === 'porcentaje') {
  //     precioFinal -= (producto.precio * descuento.cantidad) / 100;
  //   } else if (descuento.tipo === 'valor') {
  //     precioFinal -= descuento.cantidad;
  //   }
  
  //   // Calcular la ganancia con el descuento aplicado
  //   const costoTotal = producto.costo * this.precioDolarBlue;
  //   const gananciaConDescuento = precioFinal - costoTotal;
  
  //   // Verificar si el precio final está por debajo del costo
  //   if (gananciaConDescuento < 0) {
  //     this.mostrarAlertDePerdida = true;
  //     // alert('El descuento aplicado deja el precio final por debajo del costo. Esto generaría una pérdida.');
  //     // Retornamos el precio original si no queremos aplicar el descuento
  //     return producto.precio;
  //   } else {
  //     this.mostrarAlertDePerdida = false;
  //   }
  
  //   console.log(`Ganancia con descuento aplicado: ${gananciaConDescuento}`);
  //   return precioFinal;
  // }
  
  calcularPrecioConDescuento(producto: Producto): number {
    if (!producto.precio || !producto.descuento) return producto.precio || 0;

    const { descuento } = producto;
    const hoy = Date.now(); // Obtener la fecha actual en milisegundos

    // Asegurarse de que las fechas de inicio y fin existen
    if (!descuento.fechaInicio || !descuento.fechaFin) return producto.precio || 0;

    // Verificar si el descuento está dentro de la vigencia
    const fechaInicio = descuento.fechaInicio;
    const fechaFin = descuento.fechaFin;

    if (hoy < fechaInicio || hoy > fechaFin) {
        // Si el descuento no está vigente, devolver el precio original
        return producto.precio;
    }

    let precioFinal = producto.precio;

    // Aplicar el descuento si está vigente
    if (descuento.tipo === 'porcentaje') {
        precioFinal -= (producto.precio * descuento.cantidad) / 100;
    } else if (descuento.tipo === 'valor') {
        precioFinal -= descuento.cantidad;
    }

    // Calcular el costo total
    const costoTotal = producto.costo * this.precioDolarBlue;

    // Calcular el precio mínimo necesario para alcanzar el 30% de ganancia
    const precioMinimoConGanancia = costoTotal * 1.3;

    // Verificar si el precio final cumple con el mínimo de ganancia del 30%
    if (precioFinal < precioMinimoConGanancia) {
        this.mostrarAlertDePerdida = true;
        console.warn('El descuento aplicado no permite un margen de ganancia del 30%.');
        return producto.precio; // Retornar el precio original
    } else {
        this.mostrarAlertDePerdida = false;
    }

    // Calcular la ganancia con el descuento aplicado
    const gananciaConDescuento = precioFinal - costoTotal;
    console.log(`Ganancia con descuento aplicado: ${gananciaConDescuento}`);

    return precioFinal;
}

  
}
