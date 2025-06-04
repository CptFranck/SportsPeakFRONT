import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetCardComponent} from './target-set-card.component';
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";
import {generateTestTargetSet} from "../../../../utils/testFunctions";

describe('TargetSetCardComponent', () => {
  let component: TargetSetCardComponent;
  let fixture: ComponentFixture<TargetSetCardComponent>;

  let mockTargetSetService: jasmine.SpyObj<TargetSetService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: TargetSetService, useValue: mockTargetSetService},
      ],
      imports: [TargetSetCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetCardComponent);
    component = fixture.componentInstance;

    component.targetSet = generateTestTargetSet();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
