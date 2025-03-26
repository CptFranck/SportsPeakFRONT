import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-horizontal-card',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './home-card.component.html'
})
export class HomeCardComponent {
  @Input() title: string = "Card title";
  @Input() srcImage: string = "...";
  @Input() imgHeight: string = "250";
  @Input() imgWidth: string = "250";
}
