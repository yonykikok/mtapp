import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { DataBaseService } from 'src/app/services/database.service';
import { roles } from 'src/app/services/info-compartida.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-control-de-horas-trabajadas',
  templateUrl: './control-de-horas-trabajadas.component.html',
  styleUrls: ['./control-de-horas-trabajadas.component.scss'],
})
export class ControlDeHorasTrabajadasComponent implements OnInit {
  empleados!: User[];
  constructor(private databaseService: DataBaseService) { }

  ngOnInit() {
    // this.databaseService.obtenerTodos(environment.TABLAS.users).subscribe((usersListRef) => {
    //   let users = usersListRef.map(res => res.payload.doc.data());
    //   let empleados = users.filter((user: any) => (user.role == roles.EMPLEADO || user.role == roles.ADMIN))
    //   console.log(empleados)
    // })
  }

}
