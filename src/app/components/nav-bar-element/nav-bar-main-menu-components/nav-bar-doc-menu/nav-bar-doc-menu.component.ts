import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav-bar-doc-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar-doc-menu.component.html',
})
export class NavBarDocMenuComponent {
  navbarDropdownId: string = "NavBarDocMenu";
}
