import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CargarFechaNacimientoComponent } from './cargar-fecha-nacimiento.component';

describe('CargarFechaNacimientoComponent', () => {
  let component: CargarFechaNacimientoComponent;
  let fixture: ComponentFixture<CargarFechaNacimientoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarFechaNacimientoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CargarFechaNacimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
