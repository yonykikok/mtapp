import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-story-wrap',
  templateUrl: './story-wrap.component.html',
  styleUrls: ['./story-wrap.component.scss'],
})
export class StoryWrapComponent implements OnInit {
  fallasTipicas = ['Problemas de bateria?', 'Daño por agua?', 'Pantalla rota?', 'Problemas de carga?', 'Fallo de señal?'];
  customStyleAutoWrite = {
    fontSize: '2rem',
    fontWeight: '900',
    margin: '1rem',
    fontFamily: 'Roboto',
    color: '#ffa657',
  };
  constructor() { }

  ngOnInit() {}

}
