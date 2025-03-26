import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavBarLoginComponent} from "../nav-bar-element/nav-bar-login/nav-bar-login.component";
import {NavBarUserMenuComponent} from "../nav-bar-element/nav-bar-user-menu/nav-bar-user-menu.component";
import {
  NavBarLanguageSelectorComponent
} from "../nav-bar-element/nav-bar-language-selector/nav-bar-language-selector.component";
import {NavBarAdminMenuComponent} from "../nav-bar-element/nav-bar-admin-menu/nav-bar-admin-menu.component";
import {NavBarMainMenuComponent} from "../nav-bar-element/nav-bar-main-menu/nav-bar-main-menu.component";

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterModule,
    NavBarLoginComponent,
    NavBarUserMenuComponent,
    NavBarLanguageSelectorComponent,
    NavBarAdminMenuComponent,
    NavBarMainMenuComponent
  ],
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {
}
