import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeudoresPageRoutingModule } from './deudores-routing.module';

import { DeudoresPage } from './deudores.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeudaClienteComponent } from 'src/app/components/deuda-cliente/deuda-cliente.component';
import { VerificationCodeComponent } from 'src/app/components/verification-code/verification-code.component';
import { FormAgregarPagoDeudaComponent } from 'src/app/components/forms/form-agregar-pago-deuda/form-agregar-pago-deuda.component';
import { FormAgregarItemDeudaComponent } from 'src/app/components/forms/form-agregar-item-deuda/form-agregar-item-deuda.component';
import { FormDeudorComponent } from 'src/app/components/forms/form-deudor/form-deudor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeudoresPageRoutingModule,
    SharedModule
  ],
  declarations: [DeudoresPage,
    DeudaClienteComponent,
    VerificationCodeComponent,
    FormAgregarPagoDeudaComponent,
    FormAgregarItemDeudaComponent,
  FormDeudorComponent]
})
export class DeudoresPageModule { }
