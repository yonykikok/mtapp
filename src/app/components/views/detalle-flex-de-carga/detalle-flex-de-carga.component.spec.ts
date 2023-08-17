import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleFlexDeCargaComponent } from './detalle-flex-de-carga.component';

describe('DetalleFlexDeCargaComponent', () => {
  let component: DetalleFlexDeCargaComponent;
  let fixture: ComponentFixture<DetalleFlexDeCargaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFlexDeCargaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleFlexDeCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
