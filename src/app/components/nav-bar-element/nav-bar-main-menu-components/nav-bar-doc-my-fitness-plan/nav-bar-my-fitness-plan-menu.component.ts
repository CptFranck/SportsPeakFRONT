import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-nav-bar-my-fitness-plan-menu',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './nav-bar-my-fitness-plan-menu.component.html'
})
export class NavBarMyFitnessPlanMenuComponent {
  navbarDropdownId: string = "NavBarMyFitnessPlanMenu";
}
