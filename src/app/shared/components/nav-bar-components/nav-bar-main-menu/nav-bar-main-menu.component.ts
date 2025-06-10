import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavBarExploreMenuComponent} from "../nav-bar-explore-menu/nav-bar-explore-menu.component";
import {NavBarDocMenuComponent} from "../nav-bar-doc-menu/nav-bar-doc-menu.component";
import {NavBarMyFitnessPlanMenuComponent} from "../nav-bar-doc-my-fitness-plan/nav-bar-my-fitness-plan-menu.component";

@Component({
  selector: 'app-nav-bar-main-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    NavBarExploreMenuComponent,
    NavBarDocMenuComponent,
    NavBarMyFitnessPlanMenuComponent
  ],
  templateUrl: './nav-bar-main-menu.component.html'
})
export class NavBarMainMenuComponent {

}
