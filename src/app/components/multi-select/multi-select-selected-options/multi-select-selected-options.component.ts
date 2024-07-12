import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MultiSelectOptionSelected} from "../../../interface/components/multi-select/multiSelectOptionSelected";

@Component({
  selector: 'app-multi-select-selected-options',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './multi-select-selected-options.component.html',
  styleUrl: './multi-select-selected-options.component.css'
})
export class MultiSelectSelectedOptionsComponent {
  @Input() selectedOptions!: number[]
  @Input() displayedSelectedOptions!: MultiSelectOptionSelected[];

  @Output() onRemoveTag: EventEmitter<any> = new EventEmitter();

  onCLickRemoveTag($event: MouseEvent) {
    this.onRemoveTag.emit($event);
  }
}
