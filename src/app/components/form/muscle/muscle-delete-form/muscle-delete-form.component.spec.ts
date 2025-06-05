import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleDeleteFormComponent} from './muscle-delete-form.component';
import {MuscleService} from "../../../../core/services/muscle/muscle.service";

describe('MuscleDeleteFormComponent', () => {
  let component: MuscleDeleteFormComponent;
  let fixture: ComponentFixture<MuscleDeleteFormComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['deleteMuscle']);


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

    fixture.componentRef.setInput('muscle', undefined);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
