import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user/user.service";
import {User} from "../../interface/dto/user";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgIf, NgForOf],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {
  user: User | null = null;
  isLogged: boolean = false;

  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(value => {
      this.isLogged = value
    });
    this.userService.currentUser.subscribe(value => {
      this.user = value
    })
  }

  logout() {
    this.authService.logout();
  }
}
