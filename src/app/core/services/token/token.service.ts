import {Injectable} from '@angular/core';
import {AuthToken} from "../../../shared/model/dto/authToken";
import {Auth} from "../../../shared/model/dto/auth";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private authToken: AuthToken | null = null;

  constructor() {
    // Test
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
      accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBzcG9ydHNwZWFrLmNvbSIsImlhdCI6MTc0OTAzMDMyNiwiZXhwIjoxNzQ5MDMzOTI2fQ.56DYTr_aHJZfb8pEaywbHaaUaRveCpogo_-PNMRAZh0",
    }
    this.setAuthToken(auth);
  }

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
