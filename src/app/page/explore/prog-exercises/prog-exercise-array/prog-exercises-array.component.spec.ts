import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProgExercisesArrayComponent} from './prog-exercises-array.component';

describe('ProgExerciseArrayComponent', () => {
  let component: ProgExercisesArrayComponent;
  let fixture: ComponentFixture<ProgExercisesArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgExercisesArrayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgExercisesArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
