import {ComponentFixture, TestBed} from '@angular/core/testing';

import {muscleDeleteFormComponent} from './muscle-delete-form.component';

describe('DeleteMuscleComponent', () => {
  let component: muscleDeleteFormComponent;
  let fixture: ComponentFixture<muscleDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [muscleDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(muscleDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
