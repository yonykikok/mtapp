import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideDeProductosPage } from './slide-de-productos.page';

describe('SlideDeProductosPage', () => {
  let component: SlideDeProductosPage;
  let fixture: ComponentFixture<SlideDeProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SlideDeProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
