import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormDetallesFinancierosComponent } from './form-detalles-financieros.component';

describe('FormDetallesFinancierosComponent', () => {
  let component: FormDetallesFinancierosComponent;
  let fixture: ComponentFixture<FormDetallesFinancierosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDetallesFinancierosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormDetallesFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
