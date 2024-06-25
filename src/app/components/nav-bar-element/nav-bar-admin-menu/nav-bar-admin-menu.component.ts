import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {UserLoggedService} from "../../../services/userLogged/user-logged.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-nav-bar-admin-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav-bar-admin-menu.component.html',
})
export class NavBarAdminMenuComponent implements OnInit {
  user: User | null = null;

  private userService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    })
  }
}
