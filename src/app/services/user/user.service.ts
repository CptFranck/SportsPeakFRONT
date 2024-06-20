import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../localStorage/local-storage.service";
import {User} from "../../interface/dto/user";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    let userJson = this.localStorageService.getData("user");
    if (userJson) {
      let user = JSON.parse(userJson);
      this.currentUser.next(user);
    }
  }

  setCurrentUser(user: User) {
    this.currentUser.next(user);
    let userJson = JSON.stringify(user);
    this.localStorageService.saveData("user", userJson);
  }

  removeCurrentUser() {
    this.currentUser.next(null);
    this.localStorageService.removeData("user");
  }
}
