import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectorDeModelosCompatiblesComponent } from './selector-de-modelos-compatibles.component';

describe('SelectorDeModelosCompatiblesComponent', () => {
  let component: SelectorDeModelosCompatiblesComponent;
  let fixture: ComponentFixture<SelectorDeModelosCompatiblesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorDeModelosCompatiblesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorDeModelosCompatiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
