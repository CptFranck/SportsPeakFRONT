import {Component, input, output} from '@angular/core';
import {
  PerformanceLogsCardComponent
} from "../../cards/performance-logs-card/performance-logs-card.component";
import {DictionaryItem} from "../../../model/common/dictionary-item";
import {PerformanceLog} from "../../../model/dto/performance-log";
import {CollapseBlockComponent} from "../../collapse-block/collapse-block.component";
import {FormIndicator} from "../../../model/common/form-indicator";
import {ifFirstShow, ifNotFirstCollapse} from "../../../../utils/accordion-function";

@Component({
  selector: 'app-performance-log-sorted-by-set',
  imports: [
    PerformanceLogsCardComponent
  ],
  templateUrl: './performance-log-sorted-by-set.component.html'
})
export class PerformanceLogSortedBySetComponent {
  readonly formCollapseId = input.required<string>();
  readonly accordionParentIdSet = input.required<string>();
  readonly collapseBlock = input.required<CollapseBlockComponent>();
  readonly performanceLogsSortedBySet = input.required<DictionaryItem<PerformanceLog[]>[]>();

  readonly actionPerformanceLog = output<FormIndicator>();

  readonly ifFirstShow = ifFirstShow;
  readonly ifNotFirstCollapse = ifNotFirstCollapse;

  setPerformanceLog($event: FormIndicator) {
    this.actionPerformanceLog.emit($event);
  }
}
