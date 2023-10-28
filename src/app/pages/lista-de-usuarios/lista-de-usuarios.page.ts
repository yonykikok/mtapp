import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataBaseService } from 'src/app/services/database.service';
import { FuncionesUtilesService } from 'src/app/services/funciones-utiles.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { ModalController } from '@ionic/angular';
import { DetalleUsuarioComponent } from 'src/app/components/views/detalle-usuario/detalle-usuario.component';

@Component({
  selector: 'app-lista-de-usuarios',
  templateUrl: './lista-de-usuarios.page.html',
  styleUrls: ['./lista-de-usuarios.page.scss'],
})
export class ListaDeUsuariosPage implements OnInit {

  camposSeleccionados = ['role', 'displayName'];

  usuariosAMostrar: User[] = [];
  loggedUser!: User;
  filterValue = '';
  mostrarFormModulo = true;
  usuarios: User[] = [];

  constructor(private dataBase: DataBaseService,
    // public dialog: MatDialog,
    // readonly snackBar: MatSnackBar,
    private modalController: ModalController,
    private funcionesUtiles: FuncionesUtilesService,
    private authService: AuthService) {
    this.getCurrentUser();
  }
  ngOnInit(): void {

    let lista = [];
    this.dataBase.obtenerTodos(environment.TABLAS.users).subscribe((docsUsersRef) => {
      if (docsUsersRef.length <= 0) return;

      lista = docsUsersRef.map(userDocRef => {
        let userInfo: any = userDocRef.payload.doc.data();
        userInfo['id'] = userDocRef.payload.doc.id;
        return userInfo;
      });

      lista = this.funcionesUtiles.ordenarUsuariosPorImportanciaDeRoles(lista)
      this.usuarios = [...lista];

      this.usuariosAMostrar = lista;
      //console.log(this.usuariosAMostrar)
    });
  }

  // ordenarListaPor(lista, role, nombre) {
  //   return lista.sort((usuarioA, usuarioB) => usuarioA[role].localeCompare(usuarioB[role]) || usuarioA[nombre] - usuarioB[nombre]);
  // }


  async seleccionar(usuario: any) {
    try {
      const modal = await this.modalController.create({
        component: DetalleUsuarioComponent,
        componentProps: {
          usuario: usuario
        },
      })

      modal.onDidDismiss().then((result: any) => {
        if (!result.data || !result.role) return;


      })
      return await modal.present();
    } catch (err) {
    }

  }




  applyFilter(event: Event) {

    this.usuariosAMostrar = this.usuariosAMostrar.filter((user: User) => {
      // Aplica tu lógica de filtrado aquí
      return user['nombre'].toLowerCase().includes(this.filterValue.trim().toLowerCase());
    });


    // this.usuariosAMostrar.filter = this.filterValue.trim().toLowerCase();
  }


  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(userRef => {
      if (!userRef) return;//TODO: informar que no se encotnro el afiliado

      this.dataBase.obtenerPorId(environment.TABLAS.users, userRef.uid).subscribe((res) => {
        let usuario:any = res.payload.data();
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
      })
    })
  }
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.usuariosAMostrar = this.usuarios.filter((u:any) => u.displayName?.toLowerCase().indexOf(query) > -1);

    if (query.length == 0) {
      this.usuariosAMostrar = [...this.usuarios];
      //console.log("entra")
    }
  }
  openDialog(): void {
    // const dialogRef = this.dialog.open(FormTactilComponent, {
    //   panelClass: 'minWidth360px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    // this.animal = result;
    // });
  }

}
