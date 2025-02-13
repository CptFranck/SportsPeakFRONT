import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User} from "../../interface/dto/user";
import {BehaviorSubject} from "rxjs";
import {Role} from "../../interface/dto/role";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  currentUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private roles: string[] = [];
  private readonly router: Router = inject(Router);
  private readonly localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    let user: User | undefined | null = this.getSavedUser();
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
    if (user) {
      this.currentUser.next(user);
      let userJson: string = JSON.stringify(user);
      this.localStorageService.saveData("user", userJson);
    } else {
      this.removeCurrentUser()
      this.router.navigate([''])
    }
  }

  removeCurrentUser() {
    this.roles = [];
    this.currentUser.next(undefined);
    this.localStorageService.removeData("user");
  }

  isStaff() {
    let isStaffOrHigher: boolean = false;
    if (this.roles.includes("ROLE_ADMIN"))
      isStaffOrHigher = true;
    if (this.roles.includes("ROLE_STAFF"))
      isStaffOrHigher = true;
    return isStaffOrHigher;
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
