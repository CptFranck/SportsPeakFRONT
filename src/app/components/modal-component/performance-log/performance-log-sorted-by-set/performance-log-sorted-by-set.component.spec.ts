import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceLogSortedBySetComponent} from './performance-log-sorted-by-set.component';
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";

describe('PerformanceLogSortedBySetComponent', () => {
  let component: PerformanceLogSortedBySetComponent;
  let fixture: ComponentFixture<PerformanceLogSortedBySetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogSortedBySetComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceLogSortedBySetComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('formCollapseId', 'Id');
    fixture.componentRef.setInput('accordionParentIdSet', 'IdBis');
    fixture.componentRef.setInput('collapseBlock', CollapseBlockComponent);
    fixture.componentRef.setInput('performanceLogsSortedBySet', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
