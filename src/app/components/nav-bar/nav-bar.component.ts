import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthService} from "../../services/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {
  isLogged: boolean = false;
  authService: AuthService = inject(AuthService);

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(value => {
      this.isLogged = value
      console.log("isLogged", this.isLogged)
    });
  }

  logout() {
    this.authService.logout();
  }
}
