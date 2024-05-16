import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-alta-producto',
  templateUrl: './form-alta-producto.component.html',
  styleUrls: ['./form-alta-producto.component.scss'],
})
export class FormAltaProductoComponent implements OnInit {
  productoForm = new FormGroup({
    producto: new FormControl('', []),
    marca: new FormControl('', []),
    color: new FormControl('', []),
    codigo: new FormControl('', []),
    cantidad: new FormControl('', []),
    precio: new FormControl('', [])
  })
  constructor() { }

  ngOnInit() { }
  guardarProducto() {

  }
}
