import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleDetailsComponent} from './muscle-details.component';
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {provideRouter} from "@angular/router";
import {IllustrationService} from "../../../../core/services/illustration/illustration.service";
import {BehaviorSubject} from "rxjs";
import {provideAnimations} from "@angular/platform-browser/animations";

describe('MuscleDetailsComponent', () => {
  let component: MuscleDetailsComponent;
  let fixture: ComponentFixture<MuscleDetailsComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['detailsMuscle', 'loading']);
  mockMuscleService.detailsMuscle.and.returnValues(new BehaviorSubject(undefined));
  mockMuscleService.loading.and.returnValues(new BehaviorSubject(true));

  let mockIllustrationService: jasmine.SpyObj<IllustrationService> =
    jasmine.createSpyObj('IllustrationService', ['getImageUrl']);
  mockIllustrationService.getImageUrl.and.returnValues("");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleDetailsComponent],
      providers: [
        provideAnimations(),
        provideRouter([]),
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: IllustrationService, useValue: mockIllustrationService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
