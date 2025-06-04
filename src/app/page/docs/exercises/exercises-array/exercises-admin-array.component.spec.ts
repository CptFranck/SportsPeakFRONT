import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExercisesAdminArrayComponent} from './exercises-admin-array.component';

describe('ExercisesAdminArrayComponent', () => {
  let component: ExercisesAdminArrayComponent;
  let fixture: ComponentFixture<ExercisesAdminArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisesAdminArrayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExercisesAdminArrayComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('modalId', 'Id');
    fixture.componentRef.setInput('exercises', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
