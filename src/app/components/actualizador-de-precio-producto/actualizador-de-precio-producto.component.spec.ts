import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActualizadorDePrecioProductoComponent } from './actualizador-de-precio-producto.component';

describe('ActualizadorDePrecioProductoComponent', () => {
  let component: ActualizadorDePrecioProductoComponent;
  let fixture: ComponentFixture<ActualizadorDePrecioProductoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizadorDePrecioProductoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizadorDePrecioProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
