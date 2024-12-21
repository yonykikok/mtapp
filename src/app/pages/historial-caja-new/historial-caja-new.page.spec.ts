import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCajaNewPage } from './historial-caja-new.page';

describe('HistorialCajaNewPage', () => {
  let component: HistorialCajaNewPage;
  let fixture: ComponentFixture<HistorialCajaNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorialCajaNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
