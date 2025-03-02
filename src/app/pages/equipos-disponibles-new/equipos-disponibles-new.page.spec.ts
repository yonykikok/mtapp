import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquiposDisponiblesNewPage } from './equipos-disponibles-new.page';

describe('EquiposDisponiblesNewPage', () => {
  let component: EquiposDisponiblesNewPage;
  let fixture: ComponentFixture<EquiposDisponiblesNewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EquiposDisponiblesNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
