import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TargetSetLogsCardComponent} from './target-set-logs-card.component';
import {generateTestTargetSet} from "../../../../utils/testFunctions";
import {CollapseBlockComponent} from "../../collapse-block/collapse-block.component";

describe('TargetSetLogsCardComponent', () => {
  let component: TargetSetLogsCardComponent;
  let fixture: ComponentFixture<TargetSetLogsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetSetLogsCardComponent, CollapseBlockComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TargetSetLogsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('targetSet', generateTestTargetSet());
    fixture.componentRef.setInput('formCollapseId', "Id");
    fixture.componentRef.setInput('collapseBlockComponent', CollapseBlockComponent);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
