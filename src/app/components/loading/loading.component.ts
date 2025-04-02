import {Component, input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-loading',
    imports: [
        NgIf
    ],
    templateUrl: './loading.component.html'
})
export class LoadingComponent {
  readonly loading = input.required<boolean>();
}
