import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {
  NavBarExploreMenuComponent
} from "../nav-bar-main-menu-components/nav-bar-explore-menu/nav-bar-explore-menu.component";
import {NavBarDocMenuComponent} from "../nav-bar-main-menu-components/nav-bar-doc-menu/nav-bar-doc-menu.component";

@Component({
  selector: 'app-nav-bar-main-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NavBarExploreMenuComponent,
    NavBarDocMenuComponent
  ],
  templateUrl: './nav-bar-main-menu.component.html',
})
export class NavBarMainMenuComponent {

}
