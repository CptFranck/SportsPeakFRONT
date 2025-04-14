import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {AuthToken} from "../../interface/dto/token";
import {Auth} from "../../interface/dto/auth";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  authToken: AuthToken | null = null;
  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    let token: AuthToken | null = this.getSavedToken();
    if (this.isTokenValid(token))
      this.authToken = token;
    else
      this.removeCurrentToken();
  }

  getCurrentToken() {
    return this.authToken;
  }

  setCurrentToken(data: Auth) {
    const authToken = this.createAuthToken(data);
    this.authToken = authToken;
    let authTokenJson = JSON.stringify(authToken);
    this.localStorageService.saveData("authToken", authTokenJson);
  }

  removeCurrentToken() {
    this.authToken = null;
    this.localStorageService.removeData("authToken");
  }

  isTokenValid(authToken: AuthToken | null): boolean {
    if (authToken !== null) {
      return new Date(authToken.expiration) > new Date();
    }
    return false;
  }

  private createAuthToken(data: Auth): AuthToken {
    return {
      tokenType: data.tokenType,
      accessToken: data.accessToken,
      expiration: new Date(data.expiration)
    };
  }

  private getSavedToken(): AuthToken | null {
    let authTokenJson: string | null = this.localStorageService.getData("authToken");
    if (authTokenJson)
      return JSON.parse(authTokenJson);
    return null;
  }
}
