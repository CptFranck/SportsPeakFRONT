import {Component, input} from '@angular/core';
import {collapseHeight} from "../../animation/collapseHeigh";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  animations: [collapseHeight]
})
export class LoadingComponent {
  readonly loading = input.required<boolean>();
}
