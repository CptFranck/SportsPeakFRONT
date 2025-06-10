import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../local-storage/local-storage.service";
import {User} from "../../../shared/model/dto/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {

  private readonly currentUserSubject = new BehaviorSubject<User | undefined>(undefined);

  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    let user: User | null = this.getSavedUser();
    if (user) this.currentUserSubject.next(user);
  }

  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    this.localStorageService.saveData("user", user);
  }

  removeCurrentUser() {
    this.currentUserSubject.next(undefined);
    this.localStorageService.removeData("user");
  }

  isStaff() {
    const user = this.currentUserSubject.value;
    if (user)
      return user.roles.some(role => role.name === "STAFF" || role.name === "ADMIN");
    return false;
  }

  isAdmin() {
    const user = this.currentUserSubject.value;
    if (user)
      return user.roles.some(role => role.name === "ADMIN");
    return false;
  }

  private getSavedUser(): User | null {
    return this.localStorageService.getData("user");
  }
}
