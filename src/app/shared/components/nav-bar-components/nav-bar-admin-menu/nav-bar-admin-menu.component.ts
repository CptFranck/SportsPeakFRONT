import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {CurrentUserService} from "../../../../core/services/current-user/current-user.service";

@Component({
  selector: 'app-nav-bar-admin-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav-bar-admin-menu.component.html'
})
export class NavBarAdminMenuComponent implements OnInit, OnDestroy {
  isAdmin = signal<boolean>(false);
  navbarDropdownId: string = "NavBarAdminMenu";

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly currentUserService: CurrentUserService = inject(CurrentUserService);

  ngOnInit() {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.isAdmin.set(this.currentUserService.isAdmin()));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
