import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormActualizarItemLibroDiarioComponent } from './form-actualizar-item-libro-diario.component';

describe('FormActualizarItemLibroDiarioComponent', () => {
  let component: FormActualizarItemLibroDiarioComponent;
  let fixture: ComponentFixture<FormActualizarItemLibroDiarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormActualizarItemLibroDiarioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormActualizarItemLibroDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
