import {Component, input} from '@angular/core';
import {collapseHeight} from "../../shared/animations/collapseHeigh";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  animations: [collapseHeight]
})
export class LoadingComponent {
  readonly isLoading = input.required<boolean>();
}
