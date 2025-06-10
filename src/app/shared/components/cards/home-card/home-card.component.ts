import {Component, input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-horizontal-card',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './home-card.component.html'
})
export class HomeCardComponent {
  readonly title = input<string>("Card title");
  readonly srcImage = input<string>("...");
  readonly imgHeight = input<string>("250");
  readonly imgWidth = input<string>("250");
}
