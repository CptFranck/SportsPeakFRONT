import {Component, input} from '@angular/core';
import {TabOption} from "../../model/component/tab/tabOption";

@Component({
  selector: 'app-tab-header',
  templateUrl: './tab-header.component.html'
})
export class TabHeaderComponent {
  readonly tabId = input.required<string>();
  readonly tabOptions = input.required<TabOption[]>();
}
