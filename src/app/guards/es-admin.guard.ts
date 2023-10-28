import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { ImportanciaRoles } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { ToastColor, ToastService } from '../services/toast.service';


@Injectable({
  providedIn: 'root'
})
export class EsAdminGuard implements CanActivate {//TODO:canactivate deprecado
  constructor(private authService: AuthService, private router: Router,
    readonly toastService: ToastService) {

  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user$.pipe(
      take(1),
      map((user) => user && (Number(ImportanciaRoles['ADMIN']) <= Number(ImportanciaRoles[user.role]))),
      tap(canEdit => {
        if (!canEdit) {
          this.toastService.simpleMessage('Acceso no permitido', `No tiene permisos para este sector`, ToastColor.danger);

          this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
            (event: any) => { this.router.navigate([event.url]); });//vuelvo a la ruta anterior.
        }
      })
    )
  }

}
