import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAltaProtectorPantallaComponent } from './form-alta-protector-pantalla.component';

describe('FormAltaProtectorPantallaComponent', () => {
  let component: FormAltaProtectorPantallaComponent;
  let fixture: ComponentFixture<FormAltaProtectorPantallaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAltaProtectorPantallaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAltaProtectorPantallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
