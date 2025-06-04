import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetDeleteFormComponent} from './target-set-delete-form.component';
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";

describe('TargetSetDeleteFormComponent', () => {
  let component: TargetSetDeleteFormComponent;
  let fixture: ComponentFixture<TargetSetDeleteFormComponent>;

  let mockTargetSetService: jasmine.SpyObj<TargetSetService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: TargetSetService, useValue: mockTargetSetService},
      ],
      imports: [TargetSetDeleteFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
