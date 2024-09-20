import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {CollapseGroupItemComponent} from "../../../../../../components/collapse-group/collapse-group-item.component";
import {
  PerformanceLogsCardComponent
} from "../../../../../../components/card/performance-log/performance-logs-card/performance-logs-card.component";
import {DictionaryItem} from "../../../../../../interface/utils/dictionary-item";
import {PerformanceLog} from "../../../../../../interface/dto/performance-log";
import {CollapseBlockComponent} from "../../../../../../components/collapse-block/collapse-block.component";
import {FormIndicator} from "../../../../../../interface/utils/form-indicator";

@Component({
  selector: 'app-performance-log-sorted-by-set',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CollapseGroupItemComponent,
    PerformanceLogsCardComponent
  ],
  templateUrl: './performance-log-sorted-by-set.component.html',
})
export class PerformanceLogSortedBySetComponent {
  @Input() formCollapseId!: string;
  @Input() accordionParentIdSet!: string;
  @Input() collapseBlock!: CollapseBlockComponent;
  @Input() performanceLogsSortedBySet!: DictionaryItem<PerformanceLog[]>[];

  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
