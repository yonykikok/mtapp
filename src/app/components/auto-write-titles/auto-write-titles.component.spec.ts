import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutoWriteTitlesComponent } from './auto-write-titles.component';

describe('AutoWriteTitlesComponent', () => {
  let component: AutoWriteTitlesComponent;
  let fixture: ComponentFixture<AutoWriteTitlesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoWriteTitlesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutoWriteTitlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
