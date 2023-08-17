import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleTrabajoTercerizadoComponent } from './detalle-trabajo-tercerizado.component';

describe('DetalleTrabajoTercerizadoComponent', () => {
  let component: DetalleTrabajoTercerizadoComponent;
  let fixture: ComponentFixture<DetalleTrabajoTercerizadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTrabajoTercerizadoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleTrabajoTercerizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
