import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataBaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authService: AuthService,
    public toastController: ToastController) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Debe iniciar sesión',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.currentUser) {
      this.router.navigate(['/login']);
      this.presentToast();
      return false;
    }
    return true;
  }

}
