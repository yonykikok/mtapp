import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalleVentasDelDiaComponent } from './detalle-ventas-del-dia.component';

describe('DetalleVentasDelDiaComponent', () => {
  let component: DetalleVentasDelDiaComponent;
  let fixture: ComponentFixture<DetalleVentasDelDiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleVentasDelDiaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleVentasDelDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
