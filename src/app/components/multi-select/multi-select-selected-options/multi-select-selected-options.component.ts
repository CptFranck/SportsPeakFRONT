import {Component, EventEmitter, input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MultiSelectOptionSelected} from "../../../interface/components/multi-select/multiSelectOptionSelected";

@Component({
  selector: 'app-multi-select-selected-options',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './multi-select-selected-options.component.html',
  styleUrl: './multi-select-selected-options.component.css'
})
export class MultiSelectSelectedOptionsComponent {
  readonly selectedOptions = input.required<number[]>();
  readonly displayedSelectedOptions = input.required<MultiSelectOptionSelected[]>();

  @Output() onRemoveTag = new EventEmitter();

  onCLickRemoveTag($event: MouseEvent) {
    this.onRemoveTag.emit($event);
  }
}
