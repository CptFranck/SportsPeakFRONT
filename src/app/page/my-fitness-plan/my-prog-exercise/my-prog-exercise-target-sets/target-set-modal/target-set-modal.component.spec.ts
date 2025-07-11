import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetModalComponent} from './target-set-modal.component';
import {ActionType} from "../../../../../shared/model/enum/action-type";

describe('TargetSetModalComponent', () => {
  let component: TargetSetModalComponent;
  let fixture: ComponentFixture<TargetSetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetModalComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('targetSetModalId', 'Id');
    fixture.componentRef.setInput('targetSetModalTitle', 'title');
    fixture.componentRef.setInput('targetSet', undefined);
    fixture.componentRef.setInput('progExercise', undefined);
    fixture.componentRef.setInput('performanceLog', undefined);
    fixture.componentRef.setInput('action', ActionType.read);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
