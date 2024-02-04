import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormEquipoDisponibleComponent } from 'src/app/components/forms/form-equipo-disponible/form-equipo-disponible.component';
import { DataBaseService } from 'src/app/services/database.service';
import { EquipoDisponible } from 'src/app/services/info-compartida.service';
import { environment } from 'src/environments/environment';
// const equipos: EquipoDisponible[] = [
//   {
//     imei: "354001963001268",
//     imgUrlsRef: [
//       "equipos_vendidos/1706982391566-motorola-354001963001268-2",
//       "equipos_vendidos/1706982391566-motorola-354001963001268-0",
//       "equipos_vendidos/1706982391566-motorola-354001963001268-1"
//     ],
//     marca: "motorola",
//     images: [
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706982391566-motorola-354001963001268-2?alt=media&token=bfdbec07-3318-4dd5-8fdc-0cdaf7783dfd",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706982391566-motorola-354001963001268-0?alt=media&token=f8560a25-2e92-4bda-b7a2-fb7af51441d9",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706982391566-motorola-354001963001268-1?alt=media&token=ae6b33be-a955-45c0-bd6f-d706812bdff6"
//     ],
//     modelo: "g20",
//     fecha: 1706982391566,
//     precio: 69500,
//     accesorios: [
//       "film"
//     ],
//     id: "MKZpLhG74NR1xFAFG3Zb",
//     mostrarImagenes: false,
//     tiempoTranscurrido: 1
//   },
//   {
//     marca: "motorola",
//     modelo: "e5",
//     images: [
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706912433034?alt=media&token=e9fd3ba8-ea42-4570-befd-dee12c965a54",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706912433063?alt=media&token=406425f9-97e2-4f82-993a-dcf055cbd819",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706912433067?alt=media&token=16a474ae-553d-4f97-a24c-e9f827084187"
//     ],
//     precio: 40000,
//     imei: "355549093952593",
//     accesorios: [
//       ""
//     ],
//     fecha: 1706912433021,
//     id: "leYrP4EgpXg4S1DcCS2T",
//     mostrarImagenes: false,
//     tiempoTranscurrido: 2
//   },
//   {
//     modelo: "z play",
//     imei: "358196070325919",
//     fecha: 1706296678470,
//     images: [
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706296678520?alt=media&token=0cb461a7-0719-4dfb-b50e-2c12dc573a08",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706296678473?alt=media&token=24b570e0-c3da-4cb2-8d25-dab0cad46953",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706296678524?alt=media&token=7994fa34-52c6-426d-b660-3026902019b7",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706296678511?alt=media&token=822fef46-dd2e-48d5-9e0d-a084edb49e94"
//     ],
//     accesorios: [
//       "film"
//     ],
//     marca: "motorola",
//     precio: 48000,
//     id: "mt9RRvmAsNYwQZRNuMEv",
//     mostrarImagenes: false,
//     tiempoTranscurrido: 9
//   },
//   {
//     modelo: "a02",
//     marca: "samsung",
//     images: [
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706218149412?alt=media&token=788fe7d3-870b-4ec7-84ee-587c163d365a",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706218149407?alt=media&token=1144332c-05fe-424d-80f9-f898e5b0edc0",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706218149374?alt=media&token=14601bba-2f06-4c54-8f21-35d02352a585"
//     ],
//     imei: "351127334843816",
//     precio: 58000,
//     accesorios: [
//       "film"
//     ],
//     fecha: 1706218149372,
//     id: "SWSfkFQjzUfmVjXvKBgC",
//     mostrarImagenes: false,
//     tiempoTranscurrido: 10
//   },
//   {
//     modelo: "a03 core",
//     images: [
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706131188747?alt=media&token=b0e55416-1087-48e9-bcfc-55b0a89293f9",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706131188729?alt=media&token=916d3802-fa24-4743-a92c-599cb0a6975e",
//       "https://firebasestorage.googleapis.com/v0/b/multitask-web.appspot.com/o/equipos_vendidos%2F1706131188757?alt=media&token=6fd6f38b-4a35-4342-baa3-5dc3b32177a0"
//     ],
//     imei: "351517231288711",
//     marca: "samsung",
//     precio: 52000,
//     accesorios: [],
//     fecha: 1706131188728,
//     id: "h7yWrsQQSpRmoRHecpkp",
//     mostrarImagenes: false,
//     tiempoTranscurrido: 11
//   },
// ]
@Component({
  selector: 'app-equipos-disponibles',
  templateUrl: './equipos-disponibles.page.html',
  styleUrls: ['./equipos-disponibles.page.scss'],
})
export class EquiposDisponiblesPage implements OnInit {

  equipos!: EquipoDisponible[];
  constructor(private modalController: ModalController,
    private database: DataBaseService) { }

  ngOnInit() {
    this.database.obtenerTodos(environment.TABLAS.equipos_disponibles).subscribe(listRef => {
      this.equipos = listRef.map((equipoRef: any) => {
        let equipoDisponible = equipoRef.payload.doc.data() as EquipoDisponible;
        equipoDisponible['id'] = equipoRef.payload.doc.id;
        equipoDisponible['mostrarImagenes'] = false;

        return equipoDisponible;
      });
    });
  }
  async openDialog() {

    try {
      const modal = await this.modalController.create({
        component: FormEquipoDisponibleComponent,
        componentProps: {
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }
}
