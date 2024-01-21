import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataBaseService } from './services/database.service';
import { environment } from 'src/environments/environment';
import { LibroDiario } from './clases/libro-diario';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userLogged;
  constructor(private authService: AuthService,
    private database: DataBaseService) {
    this.userLogged = this.authService.currentUser;
  }

  salir() {
    this.authService.currentUser = null;
  }
  generarArrayDeDias(desde: string, hasta: Date): any[] {
    const arrayDias = [];
    let fechaActual = new Date(desde);
    const fechaFin = new Date(hasta);

    while (fechaActual <= fechaFin) {
      const objetoDia = {
        fecha: fechaActual.getTime(),
        montoTotalNegativo: 0,
        ventas: [],
        montoInicial: 0,
        id: fechaActual.toISOString().split('T')[0],
        fechaString: fechaActual.toString(),
        montoTotalEfectivo: 0,
        cuadra: false,
        montoTotal: 0,
        montoTotalMercadoPago: 0,
        montoTotalTransferencia: 0
      };

      arrayDias.push(objetoDia);

      // Incrementa la fecha para el siguiente día
      fechaActual.setDate(fechaActual.getDate() + 1);
    }

    return arrayDias;
  }



  ngOnInit(): void {

    // Uso del método
    // const desde = "Fri Jul 01 2022 00:00:00 GMT-0300 (Argentina Standard Time)";
    // const hasta = new Date(); // Esto representará la fecha actual

    // const arrayDias = this.generarArrayDeDias(desde, hasta);
    // console.log(arrayDias);
    // let susb=this.database.obtenerTodos('ingresos').subscribe(res => {
    //   susb.unsubscribe();
    //   let dias = res.map(diaref => {
    //     let dia: LibroDiario = diaref.payload.doc.data() as LibroDiario;
    //     dia['id'] = diaref.payload.doc.id
    //     return dia;
    //   })

    //   let contador = 0;

    //   let diasNoCargados = arrayDias.filter(dia => {
    //     if (!dias.find(diaReal => diaReal.id === dia.id)) {
    //       return dia;
    //     }
    //   })

    //   diasNoCargados.forEach(dia => {
    //     this.database.crearConCustomId('ingresos', dia.id, dia);
    //   })


    //   console.log(diasNoCargados)
    // })

  }


  removerDiasDomingos() {
    this.database.getDiasSinVentas().then(res => {
      let diasSinVentas = res?.map(diaRef => {
        return diaRef.data();
      })


      let resultado = diasSinVentas?.filter((dia: any) => {
        const fecha = new Date(dia.fechaString);

        if (fecha.getDay() === 0) {
          console.log(`es domingo: `,)
          return dia;
        }
      })

      // Devuelve true si es domingo, false en caso contrario


      console.log(resultado); // Devolverá true si la fecha es un domingo

      let contador = 0;
      resultado?.forEach((dia: any) => {

        if (dia.ventas && dia.ventas.length <= 0) {
          contador++;
          console.log(contador);
          this.database.eliminar('ingresos', dia.id);
        }
      })
    })
  }
}
