import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {UsersManagementArrayComponent} from "../users-management-array/users-management-array.component";
import {UsersManagementModalComponent} from "../user-management-modal/users-management-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {User} from "../../../../interface/dto/user";
import {ActionType} from "../../../../interface/enum/action-type";
import {UserService} from "../../../../services/user/user.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {Subject, takeUntil} from "rxjs";
import {SearchBarComponent} from "../../../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-users',
  imports: [
    LoadingComponent,
    UsersManagementArrayComponent,
    UsersManagementModalComponent,
    SearchBarComponent
  ],
  templateUrl: './users-management.component.html'
})
export class UsersManagementComponent implements OnInit, OnDestroy {
  loading = signal<boolean>(true);
  displayedUsers = signal<User[]>([]);
  action = signal<ActionType>(ActionType.create);
  modalTitle = signal<string>("");
  user = signal<User | undefined>(undefined);

  readonly muscleModalId: string = "userModal";

  private searchInput = "";
  private users: User[] = [];

  private readonly unsubscribe$ = new Subject<void>();
  private readonly userService = inject(UserService);

  ngOnInit(): void {
    this.userService.users
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: User[]) => {
        this.users = users;
        this.updateDisplayedUsers();
      });
    this.userService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading.set(isLoading));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setUser(formIndicator: FormIndicator) {
    this.user.set(formIndicator.object);
    this.action.set(formIndicator.actionType);
    this.modalTitle.set(formIndicator.object.username);
  }

  searchUser(input: string) {
    this.searchInput = input;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    const localInput = this.searchInput.toLowerCase();
    if (this.searchInput === "") {
      this.displayedUsers.set(this.users);
      return;
    }
    const exercisesFiltered = this.filterUsers(localInput);
    this.displayedUsers.set(exercisesFiltered);
  }

  filterUsers(localInput: string) {

    return this.users.filter((user: User) => {
      return user.firstName.toLowerCase().includes(localInput) ||
        user.lastName.toLowerCase().includes(localInput) ||
        user.email.toLowerCase().includes(localInput) ||
        user.username.toLowerCase().includes(localInput);
    })
  }
}
