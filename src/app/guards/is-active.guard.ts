import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class IsActiveGuard implements CanActivate {
  constructor(

    private router: Router,
    private authService: AuthService,
    public toastController: ToastController) { }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Necesita completar su información básica',
      duration: 4000,
      color: 'warning'
    });
    toast.present();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.currentUser.activo) {
      this.router.navigate(['/mi-cuenta']);
      this.presentToast();
    }
    return true;
  }

}
