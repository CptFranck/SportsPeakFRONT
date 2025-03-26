import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../../../interface/dto/user";
import {UserService} from "../../../../services/user/user.service";
import {ActionType} from "../../../../interface/enum/action-type";

@Component({
  selector: 'app-user-delete-form',
  templateUrl: './user-delete-form.component.html'
})
export class UserDeleteFormComponent implements OnInit, OnDestroy {
  @Input() user!: User | undefined;
  @Input() btnCloseRef!: HTMLButtonElement;
  @Input() submitEventActionType$!: Observable<ActionType> | undefined;

  private readonly unsubscribe$: Subject<void> = new Subject<void>();
  private readonly userService: UserService = inject(UserService);

  ngOnInit() {
    if (this.submitEventActionType$)
      this.submitEventActionType$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((actionType: ActionType) => {
          if (actionType === ActionType.delete)
            this.onSubmit();
        });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSubmit() {
    if (!this.user) return;
    console.log("not fully implemented")
    // this.userService.deleteUser(this.user);
    this.btnCloseRef.click();
  }
}
