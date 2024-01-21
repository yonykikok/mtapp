import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/clases/articulo';
import { conexionAuricular } from 'src/app/interfaces/articulos/auricular';
import { tiposFundas } from 'src/app/interfaces/articulos/funda';

@Component({
  selector: 'app-form-alta-funda',
  templateUrl: './form-alta-funda.component.html',
  styleUrls: ['./form-alta-funda.component.scss'],
})
export class FormAltaFundaComponent implements OnInit {

  @Input() articulo!: Articulo;
  tiposFundas: tiposFundas[] = [tiposFundas.silicona,
  tiposFundas.armor,
  tiposFundas.animada,
  tiposFundas.ejecutiva,
  tiposFundas.case];

  articuloFormGroup = new FormGroup({
    modelo: new FormControl('', [Validators.required]),
    marca: new FormControl("", [Validators.required]),
    resistenteGolpes: new FormControl(false, [Validators.required]),
    tipo: new FormControl('', []),
    imagen: new FormControl("",),
  });


  constructor(private modalController: ModalController) {

  }
  ngOnInit(): void {
    // this.articuloFormGroup.patchValue(this.articulo);
    console.log(this.articuloFormGroup.value)
  }

  guardarCargador() {
    if (this.articuloFormGroup.valid) {
      this.modalController.dismiss(this.articuloFormGroup.value, 'continuar');
      // Aquí puedes realizar la lógica para guardar el nuevo cargador en tu base de datos o en tu servicio.
      // Por ejemplo, puedes llamar a un servicio que maneje la lógica de almacenamiento.
    }
  }
}


