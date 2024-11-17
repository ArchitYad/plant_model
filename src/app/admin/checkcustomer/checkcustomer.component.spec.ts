import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckcustomerComponent } from './checkcustomer.component';

describe('CheckcustomerComponent', () => {
  let component: CheckcustomerComponent;
  let fixture: ComponentFixture<CheckcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckcustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
