import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentasClientesPageRoutingModule } from './cuentas-clientes-routing.module';

import { CuentasClientesPage } from './cuentas-clientes.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeudaClienteComponent } from 'src/app/components/deuda-cliente/deuda-cliente.component';
import { VerificationCodeComponent } from 'src/app/components/verification-code/verification-code.component';
import { FormAgregarPagoDeudaComponent } from 'src/app/components/forms/form-agregar-pago-deuda/form-agregar-pago-deuda.component';
import { FormAgregarItemDeudaComponent } from 'src/app/components/forms/form-agregar-item-deuda/form-agregar-item-deuda.component';
import { FormDeudorComponent } from 'src/app/components/forms/form-deudor/form-deudor.component';
import { ClienteAcreedorComponent } from 'src/app/components/cliente-acreedor/cliente-acreedor.component';
import { FormAcreedorComponent } from 'src/app/components/forms/form-acreedor/form-acreedor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentasClientesPageRoutingModule,
    SharedModule
  ],
  declarations: [CuentasClientesPage,
    DeudaClienteComponent,
    VerificationCodeComponent,
    FormAgregarPagoDeudaComponent,
    FormAgregarItemDeudaComponent,
    FormDeudorComponent,
    ClienteAcreedorComponent, FormAcreedorComponent]
})
export class CuentasClientesModule { }
