import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaGlassPage } from './lista-glass.page';

describe('ListaGlassPage', () => {
  let component: ListaGlassPage;
  let fixture: ComponentFixture<ListaGlassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaGlassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
