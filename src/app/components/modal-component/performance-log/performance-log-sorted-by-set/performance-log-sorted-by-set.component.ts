import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {
  PerformanceLogsCardComponent
} from "../../../card/performance-log/performance-logs-card/performance-logs-card.component";
import {DictionaryItem} from "../../../../interface/utils/dictionary-item";
import {PerformanceLog} from "../../../../interface/dto/performance-log";
import {CollapseBlockComponent} from "../../../collapse-block/collapse-block.component";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";

@Component({
  selector: 'app-performance-log-sorted-by-set',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    PerformanceLogsCardComponent,
    DatePipe
  ],
  templateUrl: './performance-log-sorted-by-set.component.html',
})
export class PerformanceLogSortedBySetComponent {
  @Input() formCollapseId!: string;
  @Input() accordionParentIdSet!: string;
  @Input() collapseBlock!: CollapseBlockComponent;
  @Input() performanceLogsSortedBySet!: DictionaryItem<PerformanceLog[]>[];

  @Output() actionPerformanceLog: EventEmitter<FormIndicator> = new EventEmitter<FormIndicator>();
  protected readonly ifFirstShow = ifFirstShow;
  protected readonly ifNotFirstCollapse = ifNotFirstCollapse;

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
