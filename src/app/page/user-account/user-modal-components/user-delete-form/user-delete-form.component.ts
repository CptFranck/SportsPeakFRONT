import {AfterViewInit, Component, inject, Input} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {User} from "../../../../interface/dto/user";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-user-delete-form',
  standalone: true,
  imports: [],
  templateUrl: './user-delete-form.component.html',
})
export class UserDeleteFormComponent implements AfterViewInit {
  eventsSubscription!: Subscription;

  @Input() user!: User | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEvents!: Observable<void> | undefined;

  private userService: UserService = inject(UserService);

  ngAfterViewInit() {
    if (this.submitEvents)
      this.eventsSubscription = this.submitEvents.subscribe(() => this.onSubmit());
  }

  onSubmit() {
    if (!this.user) return;
    this.userService.deleteUser(this.user);
    this.btnCloseRef.click();
  }
}
