import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetStateFormComponent} from './target-set-state-form.component';
import {TargetSetService} from "../../../../services/target-set/target-set.service";
import {generateTestTargetSet} from "../../../../utils/testFunctions";

describe('TargetSetStateFormComponent', () => {
  let component: TargetSetStateFormComponent;
  let fixture: ComponentFixture<TargetSetStateFormComponent>;

  let mockTargetSetService: jasmine.SpyObj<TargetSetService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: TargetSetService, useValue: mockTargetSetService},
      ],
      imports: [TargetSetStateFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetStateFormComponent);
    component = fixture.componentInstance;

    component.targetSet = generateTestTargetSet();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
