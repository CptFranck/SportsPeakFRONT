import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {UserService} from "../../../services/user/user.service";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-nav-bar-admin-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar-admin-menu.component.html',
})
export class NavBarAdminMenuComponent implements OnInit {
  user: User | null = null;

  private userService: UserService = inject(UserService);

  ngOnInit() {
    this.userService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    })
  }
}
