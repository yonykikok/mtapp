import { Component, OnInit } from '@angular/core';
// import { Producto } from '../../nueva-funcionalidad/nueva-funcionalidad.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataBaseService } from 'src/app/services/database.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { Producto } from 'src/app/pages/lista-productos/lista-productos.page';

@Component({
  selector: 'app-form-aumento-porcentual',
  templateUrl: './form-aumento-porcentual.component.html',
  styleUrls: ['./form-aumento-porcentual.component.scss'],
})
export class FormAumentoPorcentualComponent implements OnInit {
  productos!: Producto[];
  aumentoForm = new FormGroup({
    porcentajeDeAumento: new FormControl(null, [Validators.required]),
  })

  constructor(private database: DataBaseService,
    private alertService: AlertService,
    private modalController: ModalController
  ) { }

  ngOnInit() {

  }


  guardarCambios() {
    let { porcentajeDeAumento } = this.aumentoForm.value;
    
    if (porcentajeDeAumento && typeof porcentajeDeAumento == 'number') {
      this.modalController.dismiss(porcentajeDeAumento, 'aplicarAumento');
    }
  }
}
