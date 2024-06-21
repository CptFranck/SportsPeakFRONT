import {Component, inject, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgForOf, NgIf} from "@angular/common";
import {UserService} from "../../services/user/user.service";
import {User} from "../../interface/dto/user";
import {NavBarLoginComponent} from "../nav-bar-element/nav-bar-login/nav-bar-login.component";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, NgIf, NgForOf, NavBarLoginComponent],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent implements OnInit {
  user: User | null = null;

  private userService: UserService = inject(UserService);

  ngOnInit() {
    this.userService.currentUser.subscribe((user: User | null) => {
      this.user = user;
    })
  }
}
