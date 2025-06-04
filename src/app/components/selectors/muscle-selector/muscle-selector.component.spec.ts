import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleSelectorComponent} from './muscle-selector.component';
import {MuscleService} from "../../../core/services/muscle/muscle.service";
import {Muscle} from "../../../shared/model/dto/muscle";
import {BehaviorSubject} from "rxjs";

describe('MuscleSelectorComponent', () => {
  let component: MuscleSelectorComponent;
  let fixture: ComponentFixture<MuscleSelectorComponent>;
  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['muscles', 'isLoading']);
  mockMuscleService.muscles = new BehaviorSubject<Muscle[]>([]);
  mockMuscleService.isLoading = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: MuscleService, useValue: mockMuscleService}
      ],
      imports: [MuscleSelectorComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
