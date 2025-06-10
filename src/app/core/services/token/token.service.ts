import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {AuthToken} from "../../../shared/model/dto/token";
import {Auth} from "../../../shared/model/dto/auth";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  authToken: AuthToken | null = null;
  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    const testToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBzcG9ydHNwZWFrLmNvbSIsImlhdCI6MTc0OTAzMDMyNiwiZXhwIjoxNzQ5MDMzOTI2fQ.56DYTr_aHJZfb8pEaywbHaaUaRveCpogo_-PNMRAZh0";
    const auth: Auth = {
      user: {
        id: 4,
        email: "admin@sportspeak.com",
        firstName: "Admin",
        lastName: "Admin",
        roles: [{id: 4, name: "ADMIN", privileges: [],}],
        username: "Admin_"
      },
      tokenType: 'Bearer',
      token: testToken,
    }
    this.setCurrentToken(auth);
    // let token: AuthToken | null = this.getSavedToken();
    // if (this.isTokenValid(token))
    //   this.authToken = token;
    // else
    //   this.removeCurrentToken();
  }

  getCurrentToken() {
    return this.authToken;
  }

  setCurrentToken(data: Auth) {
    const authToken = this.createAuthToken(data);
    this.authToken = authToken;
    this.localStorageService.saveData("authToken", authToken);
  }

  removeCurrentToken() {
    this.authToken = null;
    this.localStorageService.removeData("authToken");
  }

  isTokenValid(authToken: AuthToken | null): boolean {
    const currentTime = Date.now() / 1000;
    if (authToken !== null && authToken.expiration)
      return authToken.expiration > currentTime;
    return false;
  }

  private createAuthToken(data: Auth): AuthToken {
    const decodedToken = jwtDecode(data.token);
    return {
      tokenType: data.tokenType,
      accessToken: data.token,
      expiration: decodedToken.exp
    };
  }

  private getSavedToken(): AuthToken | null {
    return this.localStorageService.getData("authToken");
  }
}
