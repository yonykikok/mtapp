import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquiposDisponiblesPage } from './equipos-disponibles.page';

describe('EquiposDisponiblesPage', () => {
  let component: EquiposDisponiblesPage;
  let fixture: ComponentFixture<EquiposDisponiblesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EquiposDisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
