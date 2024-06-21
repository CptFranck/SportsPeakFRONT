import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {NavBarLoginComponent} from "../nav-bar-element/nav-bar-login/nav-bar-login.component";
import {NavBarUserMenuComponent} from "../nav-bar-element/nav-bar-user-menu/nav-bar-user-menu.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgIf, NgForOf, NavBarLoginComponent, NavBarUserMenuComponent],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {

}
