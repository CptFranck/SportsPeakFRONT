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

  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
    this.userService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    })
  }

  logout() {
    this.authService.logout();
  }
}
