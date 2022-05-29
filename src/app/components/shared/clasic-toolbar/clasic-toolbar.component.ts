import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-clasic-toolbar',
  templateUrl: './clasic-toolbar.component.html',
  styleUrls: ['./clasic-toolbar.component.scss'],
})
export class ClasicToolbarComponent implements OnInit {
  @Input() title;
  @Input() ruta;
  constructor(private modalController:ModalController) { }

  ngOnInit() { }

}
