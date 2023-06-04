import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAgregarPagoDeudaComponent } from './form-agregar-pago-deuda.component';

describe('FormAgregarPagoDeudaComponent', () => {
  let component: FormAgregarPagoDeudaComponent;
  let fixture: ComponentFixture<FormAgregarPagoDeudaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgregarPagoDeudaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAgregarPagoDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
