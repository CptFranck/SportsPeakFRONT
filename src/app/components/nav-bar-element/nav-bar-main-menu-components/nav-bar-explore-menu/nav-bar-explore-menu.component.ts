import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav-bar-explore-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar-explore-menu.component.html',
})
export class NavBarExploreMenuComponent {
  navbarDropdownId: string = "NavBarExploreMenu";
}
