import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MuscleCardComponent} from './muscle-card.component';
import {provideRouter} from "@angular/router";
import {MuscleService} from "../../../../core/services/muscle/muscle.service";
import {IllustrationService} from "../../../../core/services/illustration/illustration.service";
import {generateTestMuscle} from "../../../../utils/testFunctions";

describe('MuscleCardComponent', () => {
  let component: MuscleCardComponent;
  let fixture: ComponentFixture<MuscleCardComponent>;

  let mockMuscleService: jasmine.SpyObj<MuscleService> =
    jasmine.createSpyObj('MuscleService', ['allMuscle', 'loading']);

  let mockIllustrationService: jasmine.SpyObj<IllustrationService> =
    jasmine.createSpyObj('IllustrationService', ['getImageUrl']);
  mockIllustrationService.getImageUrl.and.returnValues("");

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuscleCardComponent],
      providers: [
        provideRouter([]),
        {provide: MuscleService, useValue: mockMuscleService},
        {provide: IllustrationService, useValue: mockIllustrationService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MuscleCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('muscle', generateTestMuscle());

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
