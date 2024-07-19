import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevoFormDetalleVentaComponent } from './nuevo-form-detalle-venta.component';

describe('NuevoFormDetalleVentaComponent', () => {
  let component: NuevoFormDetalleVentaComponent;
  let fixture: ComponentFixture<NuevoFormDetalleVentaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoFormDetalleVentaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevoFormDetalleVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
