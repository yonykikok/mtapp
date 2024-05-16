import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NuevaFuncionalidadComponent } from './nueva-funcionalidad.component';

describe('NuevaFuncionalidadComponent', () => {
  let component: NuevaFuncionalidadComponent;
  let fixture: ComponentFixture<NuevaFuncionalidadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaFuncionalidadComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NuevaFuncionalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
