import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardNewVersionPage } from './dashboard-new-version.page';

describe('DashboardNewVersionPage', () => {
  let component: DashboardNewVersionPage;
  let fixture: ComponentFixture<DashboardNewVersionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardNewVersionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
