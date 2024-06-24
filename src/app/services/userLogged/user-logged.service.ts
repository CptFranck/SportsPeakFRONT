import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../localStorage/local-storage.service";
import {User} from "../../interface/dto/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    let user: User | null = this.getSavedUser();
    if (user) {
      this.currentUser.next(user);
    }
  }

  getCurrentUser() {
    return this.currentUser.value;
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
    let userJson: string = JSON.stringify(user);
    this.localStorageService.saveData("user", userJson);
  }

  removeCurrentUser() {
    this.currentUser.next(null);
    this.localStorageService.removeData("user");
  }

  private getSavedUser(): User | null {
    let userJson: string | null = this.localStorageService.getData("user");
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
}
