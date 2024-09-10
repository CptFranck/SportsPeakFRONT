import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {UserLoggedService} from "../../../services/user-logged/user-logged.service";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

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
export class NavBarUserMenuComponent implements OnInit, OnDestroy {
  user: User | undefined = undefined;
  isAdmin: boolean | undefined;
  navbarDropdownId: string = "NavBarUserMenu"

  private unsubscribe$: Subject<void> = new Subject<void>();
  private userService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) => {
        this.user = user;
        this.isAdmin = this.userService.isAdmin();
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
