import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAgregarDescuentoProductoComponent } from './form-agregar-descuento-producto.component';

describe('FormAgregarDescuentoProductoComponent', () => {
  let component: FormAgregarDescuentoProductoComponent;
  let fixture: ComponentFixture<FormAgregarDescuentoProductoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgregarDescuentoProductoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAgregarDescuentoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
