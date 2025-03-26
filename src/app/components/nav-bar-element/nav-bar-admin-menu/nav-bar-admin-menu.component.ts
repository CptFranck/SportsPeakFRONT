import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UserLoggedService} from "../../../services/user-logged/user-logged.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-nav-bar-admin-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './nav-bar-admin-menu.component.html'
})
export class NavBarAdminMenuComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  navbarDropdownId: string = "NavBarAdminMenu";

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userLoggedService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userLoggedService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.isAdmin = this.userLoggedService.isAdmin();
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
