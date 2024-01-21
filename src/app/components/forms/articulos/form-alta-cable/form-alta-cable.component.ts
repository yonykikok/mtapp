import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Articulo } from 'src/app/clases/articulo';
import { conexionAuricular } from 'src/app/interfaces/articulos/auricular';
import { compatibilidadCableUsb } from 'src/app/interfaces/articulos/cable';
import { tiposFundas } from 'src/app/interfaces/articulos/funda';
@Component({
  selector: 'app-form-alta-cable',
  templateUrl: './form-alta-cable.component.html',
  styleUrls: ['./form-alta-cable.component.scss'],
})
export class FormAltaCableComponent implements OnInit {


  @Input() articulo!: Articulo;
  compatibilidades: compatibilidadCableUsb[] = [
    compatibilidadCableUsb.v8,
    compatibilidadCableUsb.type_c,
    compatibilidadCableUsb.lightning,
    compatibilidadCableUsb.otros];

  articuloFormGroup = new FormGroup({
    marca: new FormControl("", []),
    compatibilidad: new FormControl('', []),
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



