import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataBaseService } from './services/database.service';
import { environment } from 'src/environments/environment';
import { LibroDiario } from './clases/libro-diario';
import { FuncionesUtilesService } from './services/funciones-utiles.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userLogged;
  constructor(private authService: AuthService,
    private database: DataBaseService,
    public funcionesUtiles: FuncionesUtilesService) {
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
    // this.agregarALaDBDiasNoCargados();
    this.getCurrentUser();
  }


  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.userLogged = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
      })
    })
  }

  agregarALaDBDiasNoCargados() {
    // Uso del método
    const desde = "Fri Jul 01 2022 00:00:00 GMT-0300 (Argentina Standard Time)";
    const hasta = new Date(); // Esto representará la fecha actual

    const arrayDias = this.generarArrayDeDias(desde, hasta);
    let susb = this.database.obtenerTodos('ingresos').subscribe(res => {
      susb.unsubscribe();
      let dias = res.map(diaref => {
        let dia: LibroDiario = diaref.payload.doc.data() as LibroDiario;
        dia['id'] = diaref.payload.doc.id
        return dia;
      })

      let contador = 0;

      let diasNoCargados = arrayDias.filter(dia => {
        if (!dias.find(diaReal => diaReal.id === dia.id)) {
          return dia;
        }
      })

      diasNoCargados.forEach(dia => {
        this.database.crearConCustomId('ingresos', dia.id, dia);
      })

    })
  }


  removerDiasDomingos() {
    this.database.getDiasSinVentas().then(res => {
      let diasSinVentas = res?.map(diaRef => {
        return diaRef.data();
      })


      let resultado = diasSinVentas?.filter((dia: any) => {
        const fecha = new Date(dia.fechaString);

        if (fecha.getDay() === 0) {
          return dia;
        }
      })

      // Devuelve true si es domingo, false en caso contrario



      let contador = 0;
      resultado?.forEach((dia: any) => {

        if (dia.ventas && dia.ventas.length <= 0) {
          contador++;
          this.database.eliminar('ingresos', dia.id);
        }
      })
    })
  }
}
