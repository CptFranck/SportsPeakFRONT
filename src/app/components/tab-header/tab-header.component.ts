import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {tabOption} from "../../interface/components/tab/tabOption";

@Component({
  selector: 'app-tab-header',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tab-header.component.html',
})
export class TabHeaderComponent {
  @Input() tabId!: string;
  @Input() tabOptions!: tabOption[];
}
