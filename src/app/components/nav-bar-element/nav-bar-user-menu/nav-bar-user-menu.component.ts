import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {UserLoggedService} from "../../../services/user-logged/user-logged.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav-bar-user-menu',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar-user-menu.component.html',
})
export class NavBarUserMenuComponent implements OnInit {
  user: User | undefined = undefined;
  isAdmin: boolean | undefined;
  navbarDropdownId: string = "NavBarUserMenu"

  private userService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userService.currentUser.subscribe((user: User | undefined) => {
      this.user = user;
      this.isAdmin = this.userService.isAdmin();
    })
  }
}
