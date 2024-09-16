import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleDeleteFormComponent} from './muscle-delete-form.component';

describe('DeleteMuscleComponent', () => {
  let component: MuscleDeleteFormComponent;
  let fixture: ComponentFixture<MuscleDeleteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
