import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisesArrayComponent } from './exercises-array.component';

describe('ExercisesArrayComponent', () => {
  let component: ExercisesArrayComponent;
  let fixture: ComponentFixture<ExercisesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesArrayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercisesArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
