import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaFlexDeCargaPage } from './lista-flex-de-carga.page';

describe('ListaFlexDeCargaPage', () => {
  let component: ListaFlexDeCargaPage;
  let fixture: ComponentFixture<ListaFlexDeCargaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaFlexDeCargaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaFlexDeCargaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
