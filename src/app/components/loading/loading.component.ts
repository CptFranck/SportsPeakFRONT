import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-loading',
    imports: [
        NgIf
    ],
    templateUrl: './loading.component.html'
})
export class LoadingComponent {
  @Input() loading!: boolean;
}
