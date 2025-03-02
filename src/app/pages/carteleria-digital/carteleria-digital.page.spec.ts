import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarteleriaDigitalPage } from './carteleria-digital.page';

describe('CarteleriaDigitalPage', () => {
  let component: CarteleriaDigitalPage;
  let fixture: ComponentFixture<CarteleriaDigitalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CarteleriaDigitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
