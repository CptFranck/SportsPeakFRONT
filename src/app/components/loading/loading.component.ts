import {Component, input} from '@angular/core';
import {NgIf} from "@angular/common";
import {collapseHeight} from "../../animation/collapseHeigh";

@Component({
  selector: 'app-loading',
  imports: [
    NgIf
  ],
  templateUrl: './loading.component.html',
  animations: [collapseHeight]
})
export class LoadingComponent {
  readonly loading = input.required<boolean>();
}
