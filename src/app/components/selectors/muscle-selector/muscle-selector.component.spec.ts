import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleSelectorComponent} from './muscle-selector.component';
import {MuscleService} from "../../../core/services/muscle/muscle.service";
import {provideAnimations} from "@angular/platform-browser/animations";
import {of} from "rxjs";

describe('MuscleSelectorComponent', () => {
  let component: MuscleSelectorComponent;
  let fixture: ComponentFixture<MuscleSelectorComponent>;

  const mockMuscleService = {
    isLoading$: of(true),
    muscleList$: of([]),
    selectedMuscle$: of(undefined),
  };

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
