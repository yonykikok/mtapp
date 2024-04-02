import { Component, OnInit, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController, ViewDidEnter } from '@ionic/angular';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit, ViewDidEnter {
  loggedUser!: User;
  @ViewChild('svgTapa', { static: false }) svgTapaRef!: ElementRef;
  @ViewChild('svgBateria', { static: false }) svgBateriaRef!: ElementRef;
  @ViewChild('svgCamPincipal', { static: false }) svgCamPincipalRef!: ElementRef;
  @ViewChild('svgCamSecundaria', { static: false }) svgCamSecundariaRef!: ElementRef;
  @ViewChild('svgCubreLente', { static: false }) svgCubreLenteRef!: ElementRef;
  @ViewChild('svgFlexCarga', { static: false }) svgFlexCargaRef!: ElementRef;
  @ViewChild('svgPantalla', { static: false }) svgPantallaRef!: ElementRef;
  @ViewChild('svgPortaSim', { static: false }) svgPortaSimRef!: ElementRef;
  @ViewChild('svgMicroSd', { static: false }) svgMicroSdRef!: ElementRef;
  @ViewChild('svgMarco', { static: false }) svgMarcoRef!: ElementRef;
  @ViewChild('svgMidTapa', { static: false }) svgMidTapaRef!: ElementRef;
  @ViewChild('svgSombra', { static: false }) svgSombraRef!: ElementRef;

  constructor(
    private animationCtrl: AnimationController,
    private authService: AuthService,
    private database: DataBaseService,
    private router: Router) { }


  async ionViewDidEnter() {
    const svgCubreLente = this.animationCtrl.create()
      .addElement(this.svgCubreLenteRef.nativeElement)
      .fill('none')
      .duration(3000)
      .keyframes([
        { offset: 0, transform: `scale(0.15) translate(-500%, -500%)` },
        { offset: 0.5, transform: `scale(0.15) translate(-250%, -250%)` },
        { offset: 1, transform: `scale(0.15) translate(-210%, -114%)` }
      ]);
    const animacionSvgTapa = this.animationCtrl.create()
      .addElement(this.svgTapaRef.nativeElement)
      .fill('none')
      .duration(2500)
      .keyframes([
        { offset: 0, transform: `scale(1) translate(200%, 200%)`, opacity: '0.5' },
        { offset: 0.5, transform: `scale(1.5) translate(50%, 50%)`, opacity: '0.5' },
        { offset: 1, transform: `scale(1) translate(0px,0px)`, opacity: '1' }
      ]);


    const svgBateria = this.animationCtrl.create()
      .addElement(this.svgBateriaRef.nativeElement)
      .fill('none')
      .duration(2000)
      .keyframes([
        { offset: 0, transform: `scale(0.5) translate(-500%, -500%)` },
        { offset: 0.5, transform: `scale(0.5) translate(-250%, -250%)` },
        { offset: 1, transform: `scale(0.5) translate(-1%, -20%)` }
      ]);
    const svgCamPincipal = this.animationCtrl.create()
      .addElement(this.svgCamPincipalRef.nativeElement)
      .fill('none')
      .duration(1300)
      .keyframes([
        { offset: 0, transform: `scale(0.08) translate(-500%, -500%)` },
        { offset: 0.5, transform: `scale(0.08) translate(-250%, -250%)` },
        { offset: 1, transform: `scale(0.08) translate(-421%, -195%)` }
      ]);
    const svgCamSecundaria = this.animationCtrl.create()
      .addElement(this.svgCamSecundariaRef.nativeElement)
      .fill('none')
      .duration(1100)
      .keyframes([
        { offset: 0, transform: `scale(0.05) translate(-500%, -500%)` },
        { offset: 0.5, transform: `scale(0.05) translate(-250%, -250%)` },
        { offset: 1, transform: `scale(0.05) translate(-571%, -219%)` }
      ]);
    const svgFlexCarga = this.animationCtrl.create()
      .addElement(this.svgFlexCargaRef.nativeElement)
      .fill('none')
      .duration(900)
      .keyframes([
        { offset: 0, transform: `scale(0.457) translate(500%,500%)` },
        { offset: 0.5, transform: `scale(0.457) translate(250%,250%)` },
        { offset: 1, transform: `scale(0.457) translate(48%,42%)` }
      ]);
    const svgMicroSd = this.animationCtrl.create()
      .addElement(this.svgMicroSdRef.nativeElement)
      .fill('none')
      .duration(700)
      .keyframes([
        { offset: 0, transform: `scale(0.11) translate(-500%,500%)` },
        { offset: 0.5, transform: `scale(0.11) translate(-250%,250%)` },
        { offset: 1, transform: `scale(0.11) translate(-174%,28%)` },
      ]);
    const svgPortaSim = this.animationCtrl.create()
      .addElement(this.svgPortaSimRef.nativeElement)
      .fill('none')
      .duration(500)
      .keyframes([
        { offset: 0, transform: `scale(0.2) translate(-500%,500%)` },
        { offset: 0.5, transform: `scale(0.2) translate(-250%,250%)` },
        { offset: 1, transform: `scale(0.2) translate(-89%,4%)` }
      ]);


    svgBateria.play();
    svgCamPincipal.play();
    svgCamSecundaria.play();
    svgFlexCarga.play();
    svgMicroSd.play();
    svgPortaSim.play();
    animacionSvgTapa.play();
    await svgCubreLente.play();

    setTimeout(() => {
      this.getCurrentUser();

    }, 500);
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe((userRef: any) => {
      if (!userRef) {
        this.router.navigate(['/login'])
      }
      this.database.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res: any) => {
        let usuario: any = res.payload.data();
        usuario['uid'] = res.payload.id;

        this.loggedUser = {
          uid: usuario['uid'],
          email: usuario['email'],
          displayName: usuario['displayName'],
          emailVerified: usuario['emailVerified'],
          photoURL: usuario['photoURL'],
          role: usuario['role'],
          securityCode: usuario['securityCode']
        };
        if (this.loggedUser) {
          this.router.navigate(['/home'])
        } else {
          this.router.navigate(['/login'])
        }

      })
    })
  }
  ngOnInit(): void {
  }


}

