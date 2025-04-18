import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User} from "../../interface/dto/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  currentUser = new BehaviorSubject<User | undefined>(undefined);

  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    let user: User | null = this.getSavedUser();
    if (user) this.currentUser.next(user);
  }

  getCurrentUser() {
    return this.currentUser.value;
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
    this.localStorageService.saveData("user", user);
  }

  removeCurrentUser() {
    this.currentUser.next(undefined);
    this.localStorageService.removeData("user");
  }

  isStaff() {
    const user = this.currentUser.value;
    if (user)
      return user.roles.some(role => role.name === "ROLE_STAFF" || role.name === "ROLE_ADMIN");
    return false;
  }

  isAdmin() {
    const user = this.currentUser.value;
    if (user)
      return user.roles.some(role => role.name === "ROLE_ADMIN");
    return false;
  }

  private getSavedUser(): User | null {
    return this.localStorageService.getData("user");
  }
}
