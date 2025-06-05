import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ImageFormComponent} from './image-form.component';
import {IllustrationService} from "../../../core/services/illustration/illustration.service";
import {BehaviorSubject} from "rxjs";

describe('ImageFormComponent', () => {
  let component: ImageFormComponent;
  let fixture: ComponentFixture<ImageFormComponent>;

  let mockIllustrationService: jasmine.SpyObj<IllustrationService> =
    jasmine.createSpyObj('IllustrationService', ['getImageUrl', 'refreshData']);
  mockIllustrationService.getImageUrl.and.returnValues("");
  mockIllustrationService.refreshData.and.returnValues(new BehaviorSubject<string>(""));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageFormComponent],
      providers: [
        {provide: IllustrationService, useValue: mockIllustrationService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
