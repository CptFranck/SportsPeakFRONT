import {AfterViewInit, Component, inject, Input, OnInit} from '@angular/core';
import {InputControlComponent} from "../../../../components/input-control/input-control.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {User} from "../../../../interface/dto/user";
import {Observable, Subscription} from "rxjs";
import {UserService} from "../../../../services/user/user.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user-name-form',
  standalone: true,
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user-name-form.component.html',
})
export class UserNameFormComponent implements OnInit, AfterViewInit {
  user: User | undefined;
  userForm: FormGroup | null = null;
  submitInvalidForm: boolean = false;
  eventsSubscription!: Subscription;

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
    const userFirstName: string = this.user?.firstName ? this.user?.firstName : "";
    const userLastName: string = this.user?.lastName ? this.user?.lastName : "";
    this.userForm = new FormGroup({
      firstName: new FormControl(
        userFirstName,
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)]),
      lastName: new FormControl(
        userLastName,
        [Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50)]),
    });

    if (this.user)
      this.userForm.addControl("id", new FormControl(this.user.id));
  }

  onSubmit() {
    if (!this.userForm) return;
    if (this.userForm.valid) {
      this.submitInvalidForm = false;
      this.userService.modifyUserIdentity(this.userForm);
      this.btnCloseRef.click();
    } else {
      this.submitInvalidForm = true;
    }
  }
}
