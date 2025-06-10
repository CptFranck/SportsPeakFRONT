import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetEntityFormComponent} from './target-set-entity-form.component';
import {TargetSetService} from "../../../../core/services/target-set/target-set.service";
import {ActionType} from "../../../../shared/model/enum/action-type";

describe('TargetSetEntityFormComponent', () => {
  let component: TargetSetEntityFormComponent;
  let fixture: ComponentFixture<TargetSetEntityFormComponent>;

  let mockTargetSetService: jasmine.SpyObj<TargetSetService> =
    jasmine.createSpyObj('TargetSetService',
      ['addTargetSet', 'modifyTargetSet', 'modifyTargetSetState', 'deleteTargetSet']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: TargetSetService, useValue: mockTargetSetService}
      ],
      imports: [TargetSetEntityFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetEntityFormComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('targetSet', undefined);
    fixture.componentRef.setInput('progExercise', undefined);
    fixture.componentRef.setInput('actionType', ActionType.read);
    fixture.componentRef.setInput('submitEventActionType$', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
