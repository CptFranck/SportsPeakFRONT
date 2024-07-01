import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-vertical-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './vertical-card.component.html',
})
export class VerticalCardComponent {
  @Input() title: string = "Card title";
  @Input() srcImage: string = "...";
}
