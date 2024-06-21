import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-nav-bar-login',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './nav-bar-login.component.html',
})
export class NavBarLoginComponent implements OnInit {
  isLogged: boolean = false;

  private authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.authService.isAuthenticated.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
  }

  logout() {
    this.authService.logout();
  }
}
