import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleEntityFormComponent} from './muscle-entity-form.component';

describe('MuscleFormComponent', () => {
  let component: MuscleEntityFormComponent;
  let fixture: ComponentFixture<MuscleEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
