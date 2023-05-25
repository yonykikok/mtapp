import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.component.html',
  styleUrls: ['./form-consulta.component.scss'],
})
export class FormConsultaComponent implements OnInit {

  formConsulta=new FormGroup({
    nombre:new FormControl('',[Validators.required]),
    apellido:new FormControl('',[Validators.required]),
    telefono:new FormControl('',[Validators.required]),
    consulta:new FormControl('',[Validators.required]),
  })
  constructor() { }

  ngOnInit() {}

}
