import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistorialCuentaClienteComponent } from './historial-cuenta-cliente.component';

describe('HistorialCuentaClienteComponent', () => {
  let component: HistorialCuentaClienteComponent;
  let fixture: ComponentFixture<HistorialCuentaClienteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCuentaClienteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialCuentaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
