import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipeesComponent } from './my-recipees.component';

describe('MyRecipeesComponent', () => {
  let component: MyRecipeesComponent;
  let fixture: ComponentFixture<MyRecipeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRecipeesComponent]
    });
    fixture = TestBed.createComponent(MyRecipeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
