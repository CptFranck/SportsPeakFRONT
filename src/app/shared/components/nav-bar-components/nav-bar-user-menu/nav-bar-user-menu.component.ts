import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {User} from "../../../model/dto/user";
import {CurrentUserService} from "../../../../core/services/current-user/current-user.service";
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
  private readonly currentUserService: CurrentUserService = inject(CurrentUserService);

  ngOnInit() {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User | undefined) => {
        this.user.set(user);
        this.isAdmin.set(this.currentUserService.isAdmin());
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
