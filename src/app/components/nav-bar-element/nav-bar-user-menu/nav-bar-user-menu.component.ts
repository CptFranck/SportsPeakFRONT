import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {UserLoggedService} from "../../../services/userLogged/user-logged.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-nav-bar-user-menu',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './nav-bar-user-menu.component.html',
})
export class NavBarUserMenuComponent implements OnInit {
  user: User | null = null;

  private userService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    })
  }
}
