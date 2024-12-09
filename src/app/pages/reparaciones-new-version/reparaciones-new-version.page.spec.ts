import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReparacionesNewVersionPage } from './reparaciones-new-version.page';

describe('ReparacionesNewVersionPage', () => {
  let component: ReparacionesNewVersionPage;
  let fixture: ComponentFixture<ReparacionesNewVersionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReparacionesNewVersionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
