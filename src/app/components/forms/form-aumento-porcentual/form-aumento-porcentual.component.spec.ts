import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormAumentoPorcentualComponent } from './form-aumento-porcentual.component';

describe('FormAumentoPorcentualComponent', () => {
  let component: FormAumentoPorcentualComponent;
  let fixture: ComponentFixture<FormAumentoPorcentualComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAumentoPorcentualComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormAumentoPorcentualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
