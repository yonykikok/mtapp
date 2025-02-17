import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTapasPage } from './lista-tapas.page';

describe('ListaTapasPage', () => {
  let component: ListaTapasPage;
  let fixture: ComponentFixture<ListaTapasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaTapasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
