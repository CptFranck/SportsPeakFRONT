import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PerformanceLogSortedByLogDateComponent} from './performance-log-sorted-by-log-date.component';
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";

describe('PerformanceLogSortedByLogDateComponent', () => {
  let component: PerformanceLogSortedByLogDateComponent;
  let fixture: ComponentFixture<PerformanceLogSortedByLogDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceLogSortedByLogDateComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceLogSortedByLogDateComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('formCollapseId', 'Id');
    fixture.componentRef.setInput('accordionParentIdDate', 'IdBis');
    fixture.componentRef.setInput('collapseBlock', CollapseBlockComponent);
    fixture.componentRef.setInput('performanceLogsSortByDate', []);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
