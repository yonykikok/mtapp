import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clasic-toolbar',
  templateUrl: './clasic-toolbar.component.html',
  styleUrls: ['./clasic-toolbar.component.scss'],
})
export class ClasicToolbarComponent implements OnInit {
  @Input() mostrarOpciones: boolean = false;
  @Input() title: string = '';
  @Input() ruta: string = '';
  @Input() isModal = true;//agregar uso.
  @Output() atrasEvent = new EventEmitter<any>();
  @Output() opcionesClick = new EventEmitter<any>();
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  async emitirDismissEvent() {
    this.atrasEvent.emit();
    if (this.isModal) {
      let modal = await this.modalController.getTop();
      if (modal) {
        modal.dismiss();
      }
    }
  }
  async emitirOpcionesEvent() {
    this.opcionesClick.emit();
    if (this.isModal) {
      console.log("no hacemos nada por ahora.")
      let modal = await this.modalController.getTop();
      if (modal) {
        modal.dismiss();
      }
    }
  }
}
