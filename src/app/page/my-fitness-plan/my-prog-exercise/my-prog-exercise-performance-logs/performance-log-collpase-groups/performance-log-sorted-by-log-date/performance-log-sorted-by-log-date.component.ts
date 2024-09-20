import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {CollapseGroupItemComponent} from "../../../../../../components/collapse-group/collapse-group-item.component";
import {
  PerformanceLogsCardComponent
} from "../../../../../../components/card/performance-log/performance-logs-card/performance-logs-card.component";
import {CollapseBlockComponent} from "../../../../../../components/collapse-block/collapse-block.component";
import {DictionaryItem} from "../../../../../../interface/utils/dictionary-item";
import {PerformanceLog} from "../../../../../../interface/dto/performance-log";
import {FormIndicator} from "../../../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-performance-log-sorted-by-log-date',
  standalone: true,
  imports: [
    NgIf,
    CollapseGroupItemComponent,
    NgForOf,
    PerformanceLogsCardComponent,
    DatePipe
  ],
  templateUrl: './performance-log-sorted-by-log-date.component.html',
})
export class PerformanceLogSortedByLogDateComponent {
  @Input() formCollapseId!: string;
  @Input() accordionParentIdDate!: string;
  @Input() collapseBlock!: CollapseBlockComponent;
  @Input() performanceLogsSortByDate!: DictionaryItem<PerformanceLog[]>[];

  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
