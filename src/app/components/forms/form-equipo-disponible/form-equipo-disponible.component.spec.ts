import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormEquipoDisponibleComponent } from './form-equipo-disponible.component';

describe('FormEquipoDisponibleComponent', () => {
  let component: FormEquipoDisponibleComponent;
  let fixture: ComponentFixture<FormEquipoDisponibleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEquipoDisponibleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormEquipoDisponibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
