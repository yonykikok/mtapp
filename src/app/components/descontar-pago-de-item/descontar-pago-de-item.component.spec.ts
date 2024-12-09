import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DescontarPagoDeItemComponent } from './descontar-pago-de-item.component';

describe('DescontarPagoDeItemComponent', () => {
  let component: DescontarPagoDeItemComponent;
  let fixture: ComponentFixture<DescontarPagoDeItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DescontarPagoDeItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DescontarPagoDeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
