import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFitnessPlanComponent } from './my-fitness-plan.component';

describe('MyFitnessPlanComponent', () => {
  let component: MyFitnessPlanComponent;
  let fixture: ComponentFixture<MyFitnessPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFitnessPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyFitnessPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
