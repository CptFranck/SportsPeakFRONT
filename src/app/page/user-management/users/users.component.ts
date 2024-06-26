import {Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LoadingComponent} from "../../../components/loading/loading.component";
import {MuscleModalComponent} from "../../muscle/muscle-modal/muscle-modal.component";
import {MusclesArrayComponent} from "../../muscle/muscles-array/muscles-array.component";
import {ActionType} from "../../../enum/action-type";
import {FormIndicator} from "../../../interface/utils/form-indicator";
import {User} from "../../../interface/dto/user";
import {UserService} from "../../../services/user/user.service";
import {UsersArrayComponent} from "../users-array/users-array.component";
import {UserModalComponent} from "../user-modal/user-modal.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    LoadingComponent,
    MuscleModalComponent,
    MusclesArrayComponent,
    UsersArrayComponent,
    UserModalComponent
  ],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
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
