import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAgregarItemDeudaComponent } from './form-agregar-item-deuda.component';

describe('FormAgregarItemDeudaComponent', () => {
  let component: FormAgregarItemDeudaComponent;
  let fixture: ComponentFixture<FormAgregarItemDeudaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAgregarItemDeudaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAgregarItemDeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
