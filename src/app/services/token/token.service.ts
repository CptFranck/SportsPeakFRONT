import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {AuthToken} from "../../interface/dto/token";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private authToken: BehaviorSubject<AuthToken | null> = new BehaviorSubject<AuthToken | null>(null);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    let token: AuthToken | null = this.getSavedToken();
    if (token)
      if (!this.isTokenExpired(token))
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

  private isTokenExpired(authToken: AuthToken) {
    if (authToken) {
      const isExpired: boolean = new Date(authToken.expiration) < new Date();
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
