import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormEspecificacionesEquipoComponent } from './form-especificaciones-equipo.component';

describe('FormEspecificacionesEquipoComponent', () => {
  let component: FormEspecificacionesEquipoComponent;
  let fixture: ComponentFixture<FormEspecificacionesEquipoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEspecificacionesEquipoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormEspecificacionesEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
