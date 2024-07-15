import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {HomeCardComponent} from "../../components/card/home-card/home-card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    HomeCardComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  protected readonly RouterLink = RouterLink;
}
