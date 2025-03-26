import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {HomeCardComponent} from "../../components/card/home-card/home-card.component";

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    HomeCardComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  protected readonly RouterLink = RouterLink;
}
