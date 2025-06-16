import {Injectable} from '@angular/core';
import {AuthToken} from "../../../shared/model/dto/authToken";
import {Auth} from "../../../shared/model/dto/auth";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private authToken: AuthToken | null = null;

  setAuthToken(data: Auth) {
    this.authToken = this.createAuthToken(data);
  }

  getAuthToken() {
    return this.authToken;
  }

  removeAuthToken() {
    this.authToken = null;
  }

  isTokenValid(authToken: AuthToken | null): boolean {
    const currentTime = Date.now() / 1000;
    if (authToken !== null && authToken.expiration)
      return authToken.expiration > currentTime;
    return false;
  }

  private createAuthToken(data: Auth): AuthToken {
    const decodedToken: JwtPayload = jwtDecode(data.accessToken);
    return {
      tokenType: data.tokenType,
      accessToken: data.accessToken,
      expiration: decodedToken.exp
    };
  }
}
