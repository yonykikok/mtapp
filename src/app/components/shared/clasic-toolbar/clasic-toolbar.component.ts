import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clasic-toolbar',
  templateUrl: './clasic-toolbar.component.html',
  styleUrls: ['./clasic-toolbar.component.scss'],
})
export class ClasicToolbarComponent implements OnInit {
  @Input() title;
  @Input() ruta;
  @Input() isModal = true;//agregar uso.
  @Output() atrasEvent = new EventEmitter<any>();
  constructor(private modalController: ModalController) { }

  ngOnInit() { }
  async emitirDismissEvent() {
    this.atrasEvent.emit();
    if(this.isModal){
      let modal = await this.modalController.getTop();
      if (modal) {
        modal.dismiss();
      }
    }
  }
}
