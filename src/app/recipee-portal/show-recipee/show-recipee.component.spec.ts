import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRecipeeComponent } from './show-recipee.component';

describe('ShowRecipeeComponent', () => {
  let component: ShowRecipeeComponent;
  let fixture: ComponentFixture<ShowRecipeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowRecipeeComponent]
    });
    fixture = TestBed.createComponent(ShowRecipeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
