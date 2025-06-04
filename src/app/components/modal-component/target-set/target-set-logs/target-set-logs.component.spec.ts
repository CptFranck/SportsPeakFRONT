import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetLogsComponent} from './target-set-logs.component';

describe('TargetSetLogsComponent', () => {
  let component: TargetSetLogsComponent;
  let fixture: ComponentFixture<TargetSetLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetLogsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetLogsComponent);
    component = fixture.componentInstance

    fixture.componentRef.setInput('modalId', "Id");
    fixture.componentRef.setInput('targetSet', undefined);
    fixture.componentRef.setInput('progExercise', undefined);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
