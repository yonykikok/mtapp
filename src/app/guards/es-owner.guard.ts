import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastColor, ToastService } from '../services/toast.service';
import { ImportanciaRoles } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class EsOwnerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    readonly toastService: ToastService) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => user && (ImportanciaRoles['EMPLEADO'] <= ImportanciaRoles[user.role])),
      tap(canEdit => {
        if (!canEdit) {
          this.toastService.simpleMessage('Acceso no permitido', `No tiene permisos para este sector`, ToastColor.danger);

          this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
            (event: NavigationEnd) => { this.router.navigate([event.url]); });//vuelvo a la ruta anterior.
        }
        else {
        }
      })
    )
  }
}
