import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {User} from "../../../interface/dto/user";
import {UserLoggedService} from "../../../core/services/user-logged/user-logged.service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-nav-bar-user-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-bar-user-menu.component.html'
})
export class NavBarUserMenuComponent implements OnInit, OnDestroy {
  user = signal<User | undefined>(undefined);
  isAdmin = signal<boolean | undefined>(undefined);
  navbarDropdownId: string = "NavBarUserMenu"

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userService: UserLoggedService = inject(UserLoggedService);

  ngOnInit() {
    this.userService.currentUser
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) => {
        this.user.set(user);
        this.isAdmin.set(this.userService.isAdmin());
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
