import {Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsersManagementArrayComponent} from "../users-management-array/users-management-array.component";
import {UsersManagementModalComponent} from "../user-management-modal/users-management-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../docs/muscles/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../../docs/muscles/muscles-array/muscles-array.component";
import {User} from "../../../../interface/dto/user";
import {ActionType} from "../../../../interface/enum/action-type";
import {UserService} from "../../../../services/user/user.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    LoadingComponent,
    MuscleModalComponent,
    MusclesArrayComponent,
    UsersManagementArrayComponent,
    UsersManagementModalComponent
  ],
  templateUrl: './users-management.component.html',
})
export class UsersManagementComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  users: User[] = [];
  user: User | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "userModal";
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userService.users
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: User[]) => this.users = users);
    this.userService.isLoading
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setUser(formIndicator: FormIndicator) {
    this.user = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.username;
  }
}
