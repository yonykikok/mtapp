import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemFueraDelSistemaModalComponent } from './item-fuera-del-sistema-modal.component';

describe('ItemFueraDelSistemaModalComponent', () => {
  let component: ItemFueraDelSistemaModalComponent;
  let fixture: ComponentFixture<ItemFueraDelSistemaModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFueraDelSistemaModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemFueraDelSistemaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
