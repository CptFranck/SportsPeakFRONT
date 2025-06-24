import {Injectable} from '@angular/core';
import {AuthToken} from "../../../shared/model/dto/authToken";
import {Auth} from "../../../shared/model/dto/auth";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private authToken: AuthToken | null = null;
  private expirationTimeout: ReturnType<typeof setTimeout> | undefined;
  private readonly isAuthTokenExpiredSubject = new BehaviorSubject<boolean>(true);

  get isAuthTokenExpired() {
    return this.isAuthTokenExpiredSubject.value;
  }

  get isAuthTokenExpired$() {
    return this.isAuthTokenExpiredSubject.asObservable();
  }

  getAuthToken() {
    return this.authToken;
  }

  setAuthToken(data: Auth) {
    this.authToken = this.createAuthToken(data);
    this.setTokenExpirationTimer();
  }

  private createAuthToken(data: Auth): AuthToken {
    const decodedToken: JwtPayload = jwtDecode(data.accessToken);
    return {
      tokenType: data.tokenType,
      accessToken: data.accessToken,
      expiration: decodedToken.exp
    };
  }

  private setTokenExpirationTimer(): void {
    if (!this.authToken || !this.authToken.expiration) return;

    const currentTime = Date.now() / 1000;
    const expiresInSec = this.authToken.expiration - currentTime;

    if (expiresInSec <= 0) {
      this.authToken = null;
      this.isAuthTokenExpiredSubject.next(true);
      return;
    }

    if (this.expirationTimeout) clearTimeout(this.expirationTimeout);
    this.isAuthTokenExpiredSubject.next(false);

    this.expirationTimeout = setTimeout(() => {
      this.authToken = null;
      this.isAuthTokenExpiredSubject.next(true);
    }, expiresInSec * 1000);
  }
}
