import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-nav-bar-login',
  imports: [
    NgIf,
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
    this.authService.isAuthenticated
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLogged: boolean) => {
        this.isLogged = isLogged;
      });
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
