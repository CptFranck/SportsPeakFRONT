import {Component, inject, OnInit} from '@angular/core';
import {UserLoggedService} from "../../../services/userLogged/user-logged.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-nav-bar-admin-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf,
    NgForOf
  ],
  templateUrl: './nav-bar-admin-menu.component.html',
})
export class NavBarAdminMenuComponent implements OnInit {
  isAdmin: boolean = false;
  navbarDropdownId: string = "NavBarAdminMenu"
  private userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userLoggedService.currentUser.subscribe(() => {
      this.isAdmin = this.userLoggedService.isAdmin();
    })
  }
}
