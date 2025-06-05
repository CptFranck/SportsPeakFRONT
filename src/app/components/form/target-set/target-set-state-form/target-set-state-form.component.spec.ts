import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetStateFormComponent} from './target-set-state-form.component';
import {generateTestTargetSet} from "../../../../utils/testFunctions";
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";

describe('TargetSetStateFormComponent', () => {
  let component: TargetSetStateFormComponent;
  let fixture: ComponentFixture<TargetSetStateFormComponent>;

  let mockTargetSetService: jasmine.SpyObj<TargetSetService> =
    jasmine.createSpyObj('TargetSetService', ['modifyTargetSetState']);

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

    fixture.componentRef.setInput('targetSet', generateTestTargetSet())
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
