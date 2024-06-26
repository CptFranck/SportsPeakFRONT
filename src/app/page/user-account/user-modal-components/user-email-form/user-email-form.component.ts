import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {User} from "../../../../interface/dto/user";
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {NgIf} from "@angular/common";
import {UserService} from "../../../../services/user/user.service";
import {
  PrivilegeSelectorComponent
} from "../../../../components/selectors/privilege-selector/privilege-selector.component";
import {UserSelectorComponent} from "../../../../components/selectors/user-selector/user-selector.component";

@Component({
  selector: 'app-user-email-form',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    PrivilegeSelectorComponent,
    ReactiveFormsModule,
    UserSelectorComponent
  ],
  templateUrl: './user-email-form.component.html',
})
export class UserEmailFormComponent implements OnInit, AfterViewInit {
  user: User | undefined;
  userForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

  @Input() isAdmin: boolean = false;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private userService: UserService = inject(UserService);

  @Input() set userInput(value: User | undefined) {
    this.user = value;
    this.initializeMuscleForm();
  }

  ngOnInit() {
    this.initializeMuscleForm()
  }

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  initializeMuscleForm() {
    this.userForm = new FormGroup({
      newEmail: new FormControl("",
        [Validators.required,
          Validators.email]),
      password: new FormControl(
        "",
        [Validators.required],
      ),
    });

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      this.userService.modifyUserEmail(this.userForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
