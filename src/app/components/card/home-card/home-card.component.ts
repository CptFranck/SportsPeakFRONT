import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-horizontal-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './home-card.component.html',
})
export class HomeCardComponent {
  @Input() title: string = "Card title";
  @Input() srcImage: string = "...";
  @Input() imgHeight: string = "250";
  @Input() imgWidth: string = "250";
}
