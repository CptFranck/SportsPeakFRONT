import {Component, input, output} from '@angular/core';
import {MultiSelectOptionSelected} from "../../../shared/model/component/multi-select/multiSelectOptionSelected";

@Component({
  selector: 'app-multi-select-selected-options',
  templateUrl: './multi-select-selected-options.component.html',
  styleUrl: './multi-select-selected-options.component.css'
})
export class MultiSelectSelectedOptionsComponent {
  readonly selectedOptions = input.required<number[]>();
  readonly displayedSelectedOptions = input.required<MultiSelectOptionSelected[]>();

  readonly onRemoveTag = output<number>();
  readonly onRemoveAllTag = output<void>();

  onCLickRemoveTag(selectedOption: number) {
    this.onRemoveTag.emit(selectedOption);
  }

  onCLickRemoveAllTag() {
    this.onRemoveAllTag.emit();
  }
}
