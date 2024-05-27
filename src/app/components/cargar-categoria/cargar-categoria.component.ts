import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cargar-categoria',
  templateUrl: './cargar-categoria.component.html',
  styleUrls: ['./cargar-categoria.component.scss'],
})
export class CargarCategoriaComponent implements OnInit {

  categoriasProductos: any[] = [];
  categoria!: string;
  formCategoria = new FormGroup({
    categoria: new FormControl('', [Validators.required])
  })

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }
  guardar() {
    this.modalController.dismiss(this.formCategoria.controls.categoria.value, 'create');
  }
}
