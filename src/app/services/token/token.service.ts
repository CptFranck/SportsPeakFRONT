import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "../localStorage/local-storage.service";
import {AuthToken} from "../../interface/dto/token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  authToken: BehaviorSubject<AuthToken | null> = new BehaviorSubject<AuthToken | null>(null);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    let token: AuthToken | null = this.getSavedToken();
    if (token)
      this.authToken.next(token);
  }

  getCurrentToken() {
    return this.authToken.value;
  }

  setCurrentToken(authToken: AuthToken) {
    this.authToken.next(authToken);
    let authTokenJson: string = JSON.stringify(authToken);
    this.localStorageService.saveData("authToken", authTokenJson);
  }

  removeCurrentToken() {
    this.authToken.next(null);
    this.localStorageService.removeData("authToken");
  }

  isTokenExpired() {
    if (this.authToken && this.authToken.value) {
      const expirationDate: Date = new Date(this.authToken.value.expiration)
      const isExpired: boolean = expirationDate < new Date();
      if (isExpired)
        return true
    }
    return false;
  }

  private getSavedToken(): AuthToken | null {
    let authTokenJson: string | null = this.localStorageService.getData("authToken")
    if (authTokenJson) {
      return JSON.parse(authTokenJson);
    }
    return null;
  }
}
