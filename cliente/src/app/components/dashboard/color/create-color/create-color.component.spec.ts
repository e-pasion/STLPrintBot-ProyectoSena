import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColorComponent } from './create-color.component';

describe('CreateColorComponent', () => {
  let component: CreateColorComponent;
  let fixture: ComponentFixture<CreateColorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateColorComponent]
    });
    fixture = TestBed.createComponent(CreateColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
