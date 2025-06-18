import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {AuthState} from "../../../model/enum/authState";

@Component({
  selector: 'app-nav-bar-login',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar-login.component.html'
})
export class NavBarLoginComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;

  private readonly unsubscribe$ = new Subject<void>();
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);


  ngOnInit() {
    this.authService.isAuthenticated$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLogged: AuthState) => this.isLogged = isLogged === AuthState.authenticated);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {
    this.authService.logout();
  }

  setRedirectUrlFromCurrentPage() {
    const currentUrl = this.router.url;
    this.authService.setRedirectUrl(currentUrl);
  }
}
