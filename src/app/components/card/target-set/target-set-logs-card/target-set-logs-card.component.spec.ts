import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetLogsCardComponent} from './target-set-logs-card.component';
import {generateTestTargetSet} from "../../../../utils/testFunctions";

describe('TargetSetCardLogsComponent', () => {
  let component: TargetSetLogsCardComponent;
  let fixture: ComponentFixture<TargetSetLogsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetLogsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetLogsCardComponent);
    component = fixture.componentInstance;

    component.targetSet = generateTestTargetSet();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
