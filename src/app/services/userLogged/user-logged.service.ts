import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../localStorage/local-storage.service";
import {User} from "../../interface/dto/user";
import {BehaviorSubject} from "rxjs";
import {Role} from "../../interface/dto/role";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  currentUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private roles: string[] = [];
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    let user: User | null = this.getSavedUser();
    if (user) {
      this.currentUser.next(user);
    }
    this.currentUser.subscribe((user: User | undefined) => {
      if (user) {
        this.roles = user.roles.map((role: Role) => role.name);
      }
    })
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
    this.currentUser.next(undefined);
    this.localStorageService.removeData("user");
  }

  isAdmin() {
    return this.roles.includes("ROLE_ADMIN");
  }

  private getSavedUser(): User | null {
    let userJson: string | null = this.localStorageService.getData("user");
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }
}
