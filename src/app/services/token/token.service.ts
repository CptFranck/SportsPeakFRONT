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

  getCurrentToken() {
    return this.authToken.value;
  }

  setCurrentToken(authToken: AuthToken) {
    this.authToken.next(authToken);
    let authTokenJson = JSON.stringify(authToken);
    this.localStorageService.saveData("authToken", authTokenJson);
  }

  removeCurrentToken() {
    this.authToken.next(null);
    this.localStorageService.removeData("authToken");
  }
}
