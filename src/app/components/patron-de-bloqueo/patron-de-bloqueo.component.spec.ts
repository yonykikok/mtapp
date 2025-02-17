import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatronDeBloqueoComponent } from './patron-de-bloqueo.component';

describe('PatronDeBloqueoComponent', () => {
  let component: PatronDeBloqueoComponent;
  let fixture: ComponentFixture<PatronDeBloqueoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronDeBloqueoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatronDeBloqueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
