import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleSelectorComponent} from './muscle-selector.component';
import {MuscleService} from "../../../core/services/muscle/muscle.service";
import {BehaviorSubject} from "rxjs";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MuscleSelectorComponent', () => {
  let component: MuscleSelectorComponent;
  let fixture: ComponentFixture<MuscleSelectorComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['allMuscle', 'loading']);
  mockMuscleService.allMuscle.and.returnValues(new BehaviorSubject([]));
  mockMuscleService.loading.and.returnValues(new BehaviorSubject(true));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideAnimations(),
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
