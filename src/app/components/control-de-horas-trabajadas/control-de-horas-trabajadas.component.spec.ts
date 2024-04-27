import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ControlDeHorasTrabajadasComponent } from './control-de-horas-trabajadas.component';

describe('ControlDeHorasTrabajadasComponent', () => {
  let component: ControlDeHorasTrabajadasComponent;
  let fixture: ComponentFixture<ControlDeHorasTrabajadasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlDeHorasTrabajadasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlDeHorasTrabajadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
