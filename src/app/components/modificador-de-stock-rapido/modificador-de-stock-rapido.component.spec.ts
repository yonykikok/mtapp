import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModificadorDeStockRapidoComponent } from './modificador-de-stock-rapido.component';

describe('ModificadorDeStockRapidoComponent', () => {
  let component: ModificadorDeStockRapidoComponent;
  let fixture: ComponentFixture<ModificadorDeStockRapidoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificadorDeStockRapidoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModificadorDeStockRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
