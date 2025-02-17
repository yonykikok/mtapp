import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-patron-de-bloqueo',
  templateUrl: './patron-de-bloqueo.component.html',
  styleUrls: ['./patron-de-bloqueo.component.scss'],
})
export class PatronDeBloqueoComponent implements OnInit {


  @Input() soloLectura: boolean = true;
  @Input() patronPredefinido: number[] = [];
  @Output() patronCompletado = new EventEmitter<number[]>();
  @Output() patronValidado = new EventEmitter<boolean>();

  @ViewChild('patronCanvas', { static: true }) referenciaCanvas!: ElementRef;
  ctx!: CanvasRenderingContext2D;
  patron: number[] = [];
  puntos = Array.from({ length: 9 }, (_, i) => ({ x: 0, y: 0, id: i + 1 }));
  dibujando = false;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.inicializarCanvas();
      if (this.patronPredefinido.length > 0) {
        this.patron = [...this.patronPredefinido]; // Copia el patrón
        this.dibujarPatron(); // Dibujar el patrón inicial
      }
    }, 400);
  }
  ngOnInit() { }


  private inicializarCanvas() {
    const canvas = this.referenciaCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    this.establecerTamanoCanvas();
    this.dibujarCuadriculaPatron();
  }

  private establecerTamanoCanvas() {
    const canvas = this.referenciaCanvas.nativeElement;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.calcularPosicionesPuntos();
  }

  private calcularPosicionesPuntos() {
    const canvas = this.referenciaCanvas.nativeElement;
    const espacioX = canvas.width / 3;
    const espacioY = canvas.height / 3;

    this.puntos.forEach((punto, indice) => {
      punto.x = (indice % 3) * espacioX + espacioX / 2;
      punto.y = Math.floor(indice / 3) * espacioY + espacioY / 2;
    });
  }


  dibujarCuadriculaPatron() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.puntos.forEach(punto => {
      this.ctx.beginPath();

      // Verifica si es el punto inicial o final
      let textoIndicador = "";
      if (this.patron.length > 0 && punto.id === this.patron[0]) {
        this.ctx.fillStyle = '#28a745'; // Verde para el punto de inicio
        textoIndicador = "Inicio";
      } else if (this.patron.length > 0 && punto.id === this.patron[this.patron.length - 1]) {
        this.ctx.fillStyle = '#dc3545'; // Rojo para el punto final
        textoIndicador = "Fin";
      } else {
        this.ctx.fillStyle = '#bbb'; // Color normal
      }
      this.ctx.lineWidth = 1;

      // Dibuja el círculo
      this.ctx.arc(punto.x, punto.y, 20, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#000';
      this.ctx.stroke();
      this.ctx.closePath();

      // Escribe el número correspondiente en el centro del círculo
      this.ctx.font = "16px Arial";
      this.ctx.fillStyle = "#000"; // Color del número
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "middle";
      this.ctx.fillText(punto.id.toString(), punto.x, punto.y);

      // Agrega el texto "Inicio" o "Fin" si corresponde
      if (textoIndicador) {
        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#000"; // Texto en negro para buena visibilidad
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(textoIndicador, punto.x, punto.y - 30); // Ajusta la posición del texto
      }
    });
  }



  iniciarDibujo(event: TouchEvent) {
    this.dibujando = true;
    this.patron = [];
    this.manejarMovimientoTactil(event);
  }

  manejarMovimientoTactil(event: TouchEvent) {
    if (this.soloLectura) {
      return;
    }
    if (!this.dibujando) return;
    const toque = event.touches[0];
    const rect = this.referenciaCanvas.nativeElement.getBoundingClientRect();
    const x = toque.clientX - rect.left;
    const y = toque.clientY - rect.top;

    this.puntos.forEach(punto => {
      if (!this.patron.includes(punto.id) && Math.hypot(punto.x - x, punto.y - y) < 20) {
        this.patron.push(punto.id);
        this.dibujarPatron();
      }
    });
  }

  detenerDibujo() {
    this.dibujando = false;
    this.patronCompletado.emit(this.patron);
    this.patronPredefinido = [...this.patron]
  }


  dibujarPatron() {
    this.dibujarCuadriculaPatron();
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#007bff';
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';

    this.patron.forEach((id, indice) => {
      const punto = this.puntos.find(p => p.id === id)!;
      if (indice === 0) {
        this.ctx.moveTo(punto.x, punto.y);
      } else {
        this.ctx.lineTo(punto.x, punto.y);
      }
    });

    this.ctx.stroke();
    this.ctx.closePath();
  }

}
