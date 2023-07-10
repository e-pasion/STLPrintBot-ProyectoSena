import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSideComponent } from './navbar-side.component';

describe('NavbarSideComponent', () => {
  let component: NavbarSideComponent;
  let fixture: ComponentFixture<NavbarSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarSideComponent]
    });
    fixture = TestBed.createComponent(NavbarSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
