import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneradorDeCodigosDeBarraComponent } from './generador-de-codigos-de-barra.component';

describe('GeneradorDeCodigosDeBarraComponent', () => {
  let component: GeneradorDeCodigosDeBarraComponent;
  let fixture: ComponentFixture<GeneradorDeCodigosDeBarraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneradorDeCodigosDeBarraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneradorDeCodigosDeBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
