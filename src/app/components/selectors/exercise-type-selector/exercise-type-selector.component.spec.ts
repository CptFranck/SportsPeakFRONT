import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTypeSelectorComponent } from './exercise-type-selector.component';

describe('ExerciseTypeSelectorComponent', () => {
  let component: ExerciseTypeSelectorComponent;
  let fixture: ComponentFixture<ExerciseTypeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciseTypeSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciseTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
