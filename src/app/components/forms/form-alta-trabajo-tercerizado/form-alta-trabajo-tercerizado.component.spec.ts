import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAltaTrabajoTercerizadoComponent } from './form-alta-trabajo-tercerizado.component';

describe('FormAltaTrabajoTercerizadoComponent', () => {
  let component: FormAltaTrabajoTercerizadoComponent;
  let fixture: ComponentFixture<FormAltaTrabajoTercerizadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAltaTrabajoTercerizadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAltaTrabajoTercerizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
