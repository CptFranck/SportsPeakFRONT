import {Injectable} from '@angular/core';
import {User} from "../../../shared/model/dto/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  private readonly currentUserSubject = new BehaviorSubject<User | undefined>(undefined);

  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
  }

  removeCurrentUser() {
    this.currentUserSubject.next(undefined);
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
}
