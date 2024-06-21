import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadoRepuesto, Glass, Ubicaciones } from 'src/app/clases/glass';
import { SelectorDeModelosCompatiblesComponent } from '../../selector-de-modelos-compatibles/selector-de-modelos-compatibles.component';
import { ModalController } from '@ionic/angular';
import { InfoCompartidaService } from 'src/app/services/info-compartida.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-form-alta-glass',
  templateUrl: './form-alta-glass.component.html',
  styleUrls: ['./form-alta-glass.component.scss'],
})
export class FormAltaGlassComponent implements OnInit {
  modoModificarGlass: boolean = false;
  glassSeleccionado!: Glass;

  marcas = this.infoCompartida.marcasTrabajadas;
  Ubicaciones = Ubicaciones;
  glassesCargados: Glass[] = []
  glassForm: FormGroup = new FormGroup({
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    marco: new FormControl(false, [Validators.required]),
    oca: new FormControl(true, [Validators.required]),
    touch: new FormControl(false, [Validators.required]),
    polarizado: new FormControl(false, [Validators.required]),
    curvo: new FormControl(false, [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
    stock: new FormControl(1, [Validators.required]),
    compatibilidad: new FormControl([], []),
    ubicacionRepuesto: new FormControl(Ubicaciones.LocalAvellaneda, [Validators.required]),
  })
  constructor(private modalController: ModalController,
    private infoCompartida: InfoCompartidaService,
    private dataBaseService: DataBaseService,
    private spinnerService: SpinnerService,
    private toastService: ToastService) { }


  ionViewWillEnter() {
    console.log(this.modoModificarGlass)
    console.log(this.glassSeleccionado)
    console.log(this.glassesCargados)
    if (this.modoModificarGlass) {
      this.glassForm.patchValue(this.glassSeleccionado);
    }
  }

  ngOnInit() { }

  darTodosLosPermisos(configuracion: any) {
    configuracion.permisos.forEach((permiso: any) => permiso.habilitado = true);
  }
  quitarTodosLosPermisos(configuracion: any) {
    configuracion.permisos.forEach((permiso: any) => permiso.habilitado = false);
  }


  async abrirSelectorDeModelos() {
    let modal = await this.modalController.create({
      component: SelectorDeModelosCompatiblesComponent,
      componentProps: {
        modelosSeleccionados: this.glassForm.controls['compatibilidad'].value,
        lista: this.glassesCargados.map(glass => {
          return {
            marca: glass.marca,
            modelo: glass.modelo,
            id: glass.id,
          }
        })
      }
    });

    modal.onDidDismiss().then((result) => {

      if (result.data) {
        switch (result.role) {
          case "seleccionTerminada":
            this.glassForm.controls['compatibilidad'].setValue([...result.data]);
            break;
        }
      }
      console.log(this.glassForm.value)
    })
    modal.present();

  }

  incrementStock() {
    let { stock } = this.glassForm.value;
    console.log(typeof stock)
    if (typeof stock !== 'number') {
      stock = 1;
    } else {
      stock = stock + 1;
    }
    console.log(typeof stock)
    this.glassForm.controls['stock'].setValue(stock);
  }

  decrementStock() {
    let { stock } = this.glassForm.value;
    if (stock === null) { this.glassForm.controls['stock'].setValue(0); }
    console.log(stock);
    if (stock && typeof stock === 'number' && stock > 0) {
      stock--;
      this.glassForm.controls['stock'].setValue(stock);
    }
  }

  onSubmit() {
    if (this.glassForm.valid) {
      // Realizar la lógica de guardar el formulario
      let nuevoGlass = this.glassForm.value as Glass;

      //Modificar compatible al modelo seleccionado como compatible
      this.dataBaseService.crear(environment.TABLAS.glasses, this.glassForm.value).then((res) => {
        console.log()
        nuevoGlass.id = res.id

        nuevoGlass.compatibilidad.forEach((glassCompatible: any) => {
          let glassExistente = this.glassesCargados.find(glassExistente => glassExistente.id == glassCompatible.id);
          console.log("ENCONTRADO ", glassExistente);
          if (glassExistente) {
            let esCompatible = glassExistente.compatibilidad.find(glassExistenteCompatibles => glassExistenteCompatibles.id == glassCompatible.id);
            if (esCompatible) {
              console.log('ya estaba como compatible')
            } else {
              console.log('aun no se marco, se debe actualizar y agregarlo.', glassExistente.id)
              glassExistente.compatibilidad.push({
                marca: nuevoGlass.marca,
                modelo: nuevoGlass.modelo,
                id: nuevoGlass.id,
              })
              this.dataBaseService.actualizar(environment.TABLAS.glasses, glassExistente, glassExistente.id)?.then(resp => {
                console.log(resp)
              })
            }
          }
        });
        this.toastService.simpleMessage('Exito', `${this.glassForm.value.modelo} ha sido agregado`, ToastColor.success);
        this.reiniciarFormulario();
      });
      console.log(this.glassesCargados);
      console.log(nuevoGlass);

      // 
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos correctamente.');
    }
  }

  reiniciarFormulario() {
    let formularioVacio =
    {
      marca: '',
      modelo: '',
      precio: '',
      marco: false,
      oca: true,
      touch: false,
      polarizado: false,
      curvo: false,
      estado: true,
      stock: 1,
      compatibilidad: [],
      ubicacionRepuesto: Ubicaciones.LocalAvellaneda
    }

    this.glassForm.patchValue(formularioVacio);
  }

  actualizarGlass() {
    let glassActualizado = { ...this.glassSeleccionado, ...this.glassForm.value };
    console.log(glassActualizado)
    this.spinnerService.showLoading("Actualizando glass");
    this.dataBaseService.actualizar(environment.TABLAS.glasses, glassActualizado, glassActualizado.id)?.then(() => {
      this.modalController.dismiss(glassActualizado,'actualizado');
    }).finally(() => {
      this.spinnerService.stopLoading();
    })
  }
}
