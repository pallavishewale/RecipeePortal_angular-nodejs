import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeeComponent } from './add-recipee.component';

describe('AddRecipeeComponent', () => {
  let component: AddRecipeeComponent;
  let fixture: ComponentFixture<AddRecipeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecipeeComponent]
    });
    fixture = TestBed.createComponent(AddRecipeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
