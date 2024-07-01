import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {HorizontalCardComponent} from "../../components/card/horizontal-card/horizontal-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    HorizontalCardComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
