import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExercisesComponent } from './select-exercises.component';

describe('SelectExercisesComponent', () => {
  let component: SelectExercisesComponent;
  let fixture: ComponentFixture<SelectExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExercisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
