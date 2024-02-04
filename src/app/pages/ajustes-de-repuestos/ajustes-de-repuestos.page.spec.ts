import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjustesDeRepuestosPage } from './ajustes-de-repuestos.page';

describe('AjustesDeRepuestosPage', () => {
  let component: AjustesDeRepuestosPage;
  let fixture: ComponentFixture<AjustesDeRepuestosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AjustesDeRepuestosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
