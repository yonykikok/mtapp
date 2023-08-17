import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/clases/user';
import { AlertService } from 'src/app/services/alert.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { ToastColor, ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss'],
})
export class DetalleUsuarioComponent implements OnInit {

  usuario;
  verMasInfo = false;
  verTareas = false;
  mostrarFormAltaTarea = false;
  mostrarRole = true;
  roleSeleccionado = 'CLIENTE';
  roles: Roles[] = ['CLIENTE', 'ST', 'EMPLEADO', 'ADMIN', 'OWNER'];

  constructor(
    private database: DataBaseService,
    public funcionesUtiles: FuncionesUtilesService,
    private alertService: AlertService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void { }

  mostrarConfirmDialogRole() {
    this.alertService.alertConfirmacion('Confirmación', `Seguro cambiar de ${this.usuario.role} 🡆 ${this.roleSeleccionado}`, 'Si', () => {
      this.usuario.role = this.roleSeleccionado;
      this.database.actualizar(environment.TABLAS.users, this.usuario, this.usuario.id).then(() => {
        this.toastService.simpleMessage(`Exito`, `Se ha actualizado el rol a ${this.roleSeleccionado}`, ToastColor.success);
      }).catch(err => {
        this.toastService.simpleMessage(`Error`, `Hubo un error al cambiar el rol al usuario,  ${err}`, ToastColor.success);
      }).finally(() => {
        this.roleSeleccionado = null;
        this.mostrarRole = true;
      });
    });
  }
  mostrarConfirmDialog() {
    this.alertService.alertConfirmacion('Confirmación', `Esta seguro de ${this.usuario.blocked ? 'desbloquear' : 'bloquear'} a este usuario?`, 'Si', () => {
      this.usuario.blocked = this.usuario.blocked ? false : true;
      this.database.actualizar(environment.TABLAS.users, this.usuario, this.usuario.uid).then(() => {
        this.toastService.simpleMessage(`Exito`, `Se ha ${this.usuario.blocked ? 'bloqueado' : 'desbloqueado'} al usuario`, ToastColor.success);
      }).catch(err => {
        this.toastService.simpleMessage(`Error`, `Hubo un error al bloquear al usuario,  ${err}`, ToastColor.success);
      });
    });
  }

  // actualizarRoleDeUsuario(user, newRole) {
  //   user.role = newRole;
  //   this.database.actualizar(environment.TABLAS.users, user, user.id).then(() => {
  //     this.toastService.simpleMessage(`Exito`, `Se ha actualizado el rol a ${newRole}`, ToastColor.success);
  //   }).catch(err => {
  //     this.toastService.simpleMessage(`Error`, `Hubo un error al cambiar el rol al usuario,  ${err}`, ToastColor.success);
  //   }).finally(() => {
  //     this.roleSeleccionado = null;
  //     this.mostrarRole = true;
  //   });
  // }

  mostrarConfirmDialogEliminar() {
    this.alertService.alertConfirmacion('Confirmación', `Esta seguro de eliminar a ${this.usuario.displayName ? this.usuario.displayName : this.usuario.email}`, 'Si', () => {
      this.eliminarUsuario.bind(this, this.usuario);
    });
  }

  eliminarUsuario(user) {
    user.estado = 'ELIMINADO';
    this.database.actualizar(environment.TABLAS.users, user, user.id).then(() => {
      this.toastService.simpleMessage(`Exito`, `Se ha eliminado con exito al usuario`, ToastColor.success);
    }).catch(err => {
      this.toastService.simpleMessage(`Error`, `Hubo un error al eliminar al usuario,  ${err}`, ToastColor.success);
    });

  }
  verDetalleTarea(tarea) {
    console.log(tarea)
  }
}
