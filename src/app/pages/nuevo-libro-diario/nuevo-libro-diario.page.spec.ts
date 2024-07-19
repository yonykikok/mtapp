import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoLibroDiarioPage } from './nuevo-libro-diario.page';

describe('NuevoLibroDiarioPage', () => {
  let component: NuevoLibroDiarioPage;
  let fixture: ComponentFixture<NuevoLibroDiarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NuevoLibroDiarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
