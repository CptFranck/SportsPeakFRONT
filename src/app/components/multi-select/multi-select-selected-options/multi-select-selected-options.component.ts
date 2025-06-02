import {Component, input, output} from '@angular/core';
import {MultiSelectOptionSelected} from "../../../interface/components/multi-select/multiSelectOptionSelected";

@Component({
  selector: 'app-multi-select-selected-options',
  templateUrl: './multi-select-selected-options.component.html',
  styleUrl: './multi-select-selected-options.component.css'
})
export class MultiSelectSelectedOptionsComponent {
  readonly selectedOptions = input.required<number[]>();
  readonly displayedSelectedOptions = input.required<MultiSelectOptionSelected[]>();

  readonly onRemoveTag = output<MouseEvent>();
  readonly onRemoveAllTag = output<void>();

  onCLickRemoveTag($event: MouseEvent) {
    this.onRemoveTag.emit($event);
  }

  onCLickRemoveAllTag() {
    this.onRemoveAllTag.emit();
  }
}
