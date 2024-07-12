import {Component, Input} from '@angular/core';
import {SelectOption} from "../../interface/components/select/selectOption";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() value: string | undefined;
  @Input() options!: SelectOption[];
}
