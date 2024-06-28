import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsersManagementArrayComponent} from "../users-management-array/users-management-array.component";
import {UsersManagementModalComponent} from "../user-management-modal/users-management-modal.component";
import {LoadingComponent} from "../../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../../muscle/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../../muscle/muscles-array/muscles-array.component";
import {User} from "../../../../interface/dto/user";
import {ActionType} from "../../../../enum/action-type";
import {UserService} from "../../../../services/user/user.service";
import {FormIndicator} from "../../../../interface/utils/form-indicator";

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
export class UsersManagementComponent implements OnInit {
  loading: boolean = true;
  users: User[] = [];
  user: User | undefined;
  action: ActionType = ActionType.create;
  modalTitle: string = "";
  muscleModalId: string = "userModal";
  @ViewChild("modalTemplate") modalTemplate!: TemplateRef<any>;

  private userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userService.users.subscribe((users: User[]) => this.users = users);
    this.userService.isLoading.subscribe((isLoading: boolean) => this.loading = isLoading);
  }

  setUser(formIndicator: FormIndicator) {
    this.user = formIndicator.object;
    this.action = formIndicator.actionType;
    this.modalTitle = formIndicator.object.username;
  }
}
