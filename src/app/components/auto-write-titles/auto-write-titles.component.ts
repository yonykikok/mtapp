import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-auto-write-titles',
  templateUrl: './auto-write-titles.component.html',
  styleUrls: ['./auto-write-titles.component.scss'],
})
export class AutoWriteTitlesComponent implements OnInit {
  @Input() fontSize = '100%';

  texto = "";
  @Input() palabras = ['Multitask'];
  @Input() velocidad = 200;
  @Input() jsonCustomStyles: any = '';



  constructor() { }

  ngOnInit(): void {
    var indice = 0;
    var cantLetras = 0;
    var up = true;
    setInterval(() => {
      var word = this.palabras[indice];
      var largo = word.length;

      if (up) {
        this.texto = word.slice(0, cantLetras);
        cantLetras++
      };

      if (cantLetras === largo + 1) {
        up = false
      };

      if (!up) {
        this.texto = word.slice(0, cantLetras);
        cantLetras--
      }

      if (cantLetras === 0) {
        up = true
        indice++
      }

      if (indice === this.palabras.length) {
        indice = 0
      }

    }, this.velocidad);
  }

}
