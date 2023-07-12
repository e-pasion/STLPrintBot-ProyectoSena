import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCartComponent } from './test-cart.component';

describe('TestCartComponent', () => {
  let component: TestCartComponent;
  let fixture: ComponentFixture<TestCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCartComponent]
    });
    fixture = TestBed.createComponent(TestCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
