import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-detalles-financieros',
  templateUrl: './form-detalles-financieros.component.html',
  styleUrls: ['./form-detalles-financieros.component.scss'],
})
export class FormDetallesFinancierosComponent implements OnInit {
  producto: any;
  detallesFinancierosForm: FormGroup = new FormGroup({
    costo: new FormControl(null, [Validators.required, Validators.min(0)]),
    precio: new FormControl(null, [Validators.required, Validators.min(0)]),
    margen: new FormControl(null, [Validators.required, Validators.min(0)]),
    colocacion: new FormControl(null, [Validators.required, Validators.min(0)]),
  })
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if (this.producto.detallesFinancieros) {
      this.detallesFinancierosForm.patchValue({
        costo: this.producto.detallesFinancieros.costo,
        precio: this.producto.detallesFinancieros.precio,
        margen: this.producto.detallesFinancieros.margen,
        colocacion: this.producto.detallesFinancieros.colocacion
      });
    }

    this.detallesFinancierosForm.get('precio')?.disable();


    this.detallesFinancierosForm.get('costo')?.valueChanges.subscribe(() => {
      this.recalcularPrecio();
    });

    this.detallesFinancierosForm.get('margen')?.valueChanges.subscribe(() => {
      this.recalcularPrecio();
    });

    this.detallesFinancierosForm.get('colocacion')?.valueChanges.subscribe(() => {
      this.recalcularPrecio();
    });

  }

  recalcularPrecio() {
    const costo = this.detallesFinancierosForm.get('costo')?.value || 0;
    const margen = this.detallesFinancierosForm.get('margen')?.value || 0;
    const colocacion = this.detallesFinancierosForm.get('colocacion')?.value || 0;

    // Aquí defines cómo calcular el precio. Por ejemplo:
    const nuevoPrecio = costo + margen + colocacion;

    // Actualizar el control del precio
    this.detallesFinancierosForm.controls['precio']?.setValue(nuevoPrecio);
  }

  onSubmit() {
    console.log(this.detallesFinancierosForm.value)
    let { costo, margen, colocacion } = this.detallesFinancierosForm.value;
    this.producto.detallesFinancieros =
    {
      costo,
      margen,
      colocacion,
      precio: costo + margen + colocacion,
    }
    this.modalController.dismiss(this.producto, 'guardarCambios');

  }
}
