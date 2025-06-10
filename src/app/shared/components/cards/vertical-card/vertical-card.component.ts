import {Component, input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-vertical-card',
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './vertical-card.component.html'
})
export class VerticalCardComponent {
  readonly title = input<string>("Card title");
  readonly srcImage = input<string>("...");
}
