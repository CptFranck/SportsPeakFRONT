import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleDeleteFormComponent} from './muscle-delete-form.component';
import {MuscleService} from "../../../../services/muscle/muscle.service";

describe('DeleteMuscleComponent', () => {
  let component: MuscleDeleteFormComponent;
  let fixture: ComponentFixture<MuscleDeleteFormComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MuscleService, useValue: mockMuscleService}
      ],
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
